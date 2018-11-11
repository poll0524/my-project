/*	UniqueDialog v2.01
 弹出窗口控件(窗框为弹出层，内部为iframe)

 1. 该对象每个页面始终只有一个，且位于top window。但本js文件可以多次的、多处（各iframe）的导入，不会冲突。

 2. 因为弹窗显示的内容放在iframe中，所以必须是“独立页面”。

 3. 使用方法：(可以在不关闭前一个窗口的情况下打开其它内容。但无法同时打开2个窗口)
 - 打开窗口：
 top.UniqueDialog_2.open({
 kind:"screen",
 width:400,
 height:300,
 title:"弹窗",
 url:"/abc/def.jsp",
 afterHide:func
 });
 还有更多可选参数，请参看open函数上方的说明。

 - 关闭窗口：
 top.UniqueDialog_2.hide();
 top.UniqueDialog_2.cancel();（弹窗右上角的关闭按钮也调用cancel方法）
 上2种关闭方式的唯一区别是：
 调用 top.UniqueDialog_2.status() 会返回对应的 "hided"/"canceled" 标识。

 4. 可以用 top.UniqueDialog_2.setZindex 方法改变弹窗的 z-index(默认为1000)。

 5. 建议只用 top.UniqueDialog_2.tmp对象（而不是全局对象）来传递数据或函数。
 如果有多个iframe页面切换，可能会出现“不能执行已释放的Script代码”错误，在适当的时候（open前，或iframe unload时）
 调用top.UniqueDialog_2.clearTMP() 清除tmp里的数据，可解决该问题。

 6. 在窗口已经显示的状态下，top.UniqueDialog_2.resize(width, height, left, top)可以重置窗口的尺寸与位置。

 author:	江奕浩
 company: 杭州吾儿网
 website: http://www.520wawa.com/
 since:	2012-04-10
 */


(function(){
    var _uniqueDialog = top["UniqueDialog_2"];
    if ((typeof(_uniqueDialog) == "undefined") || (_uniqueDialog == null))
    {
        /* 生成_uniqueDialog对象 */
        _uniqueDialog = new function()
        {
            var _reg_uri = /^((http:\/\/)|(https:\/\/)|\/)/i;

            var _cssManager = {
                vmlCSS:null,		/* vml的css style */
                borderCssList:[],	/* href可能会自动变化（增加host等），另存为css_path来保证唯一性 */
                currIndex:-1
            };

            var _backDiv = null;			/* 全屏幕背景屏蔽层 */
            var _backTable = null;			/* 主容器 */
            var _titleContainer = null;	/* 标题容器 */
            var _titleLabel = null;		/* 标题文本 */
            var _closeButton = null;		/* 关闭按钮 */
            var _iframeObj = null;			/* 内部iframe */

            var _windowStyle = "screen";
            var _moveX = 0;
            var _moveY = 0;
            var _moving = false;
            var _adjustX = 0;
            var _adjustY = 0;
            var _leftName = null;
            var _topName = null;

            var _selectHideList = new Array();
            var _selectVisible = "auto";

            var _zIndex = 1000;
            var _srcUrl = "about:blank";
            var _currentStatus = "hided";
            var _resetState = true;

            var _uniqueEvents = {};
            var _tmp = {};

            /* 本js的url位置，用于补全绝对路径 */
            var _jsPath;
            if (window.ActiveXObject && !document.documentMode){
                _jsPath = document.scripts[document.scripts.length - 1].getAttribute("src", 4);
            } else {
                _jsPath = document.scripts[document.scripts.length - 1].src;
            }
            _jsPath = _jsPath.substring(0, 1 + _jsPath.lastIndexOf("/"));


            function positionTo(scrollLeft, scrollTop){
                switch (_windowStyle){
                    case "screen":
                        _backDiv.style.left = scrollLeft + "px";
                        _backDiv.style.top = scrollTop + "px";
                        _backTable.style.left = (_adjustX - (-scrollLeft)) + "px";
                        _backTable.style.top = (_adjustY - (-scrollTop)) + "px";
                        break;
                    case "followWindow":
                    case "fixedFollow":
                        _backTable.style.left = (_adjustX - (-scrollLeft)) + "px";
                        _backTable.style.top = (_adjustY - (-scrollTop)) + "px";
                        break;
                    case "nailWindow":
                    case "fixedNail":
                        _backTable.style.left = _adjustX + "px";
                        _backTable.style.top = _adjustY + "px";
                        break;
                }
            }

            /* 重置 screen, followWindow, fixedFollow 状态的窗口位置 */
            function scrollNow(){
                var doc = top.document;
                if (document.compatMode == "BackCompat") {
                    positionTo(doc.body.scrollLeft, doc.body.scrollTop);
                } else {																	/* document.compatMode == "CSS1Compat" */
                    positionTo((doc.documentElement.scrollLeft == 0 ? doc.body.scrollLeft : doc.documentElement.scrollLeft),
                        (doc.documentElement.scrollTop == 0 ? doc.body.scrollTop : doc.documentElement.scrollTop));
                }
            }

            function getWindowStatus(){
                var result = { scrollLeft:0, scrollTop:0, scrollWidth:0, scrollHeight:0, clientWidth:0, clientHeight:0 };
                var doc = top.document;
                if (document.compatMode == "BackCompat") {
                    result.scrollLeft = doc.body.scrollLeft;
                    result.scrollTop = doc.body.scrollTop;
                    result.clientWidth = doc.body.clientWidth;
                    result.clientHeight = doc.body.clientHeight;
                } else {																	/* document.compatMode == "CSS1Compat" */
                    result.scrollLeft = (doc.documentElement.scrollLeft == 0 ? doc.body.scrollLeft : doc.documentElement.scrollLeft);
                    result.scrollTop = (doc.documentElement.scrollTop == 0 ? doc.body.scrollTop : doc.documentElement.scrollTop);
                    result.clientWidth = doc.documentElement.clientWidth;
                    result.clientHeight = doc.documentElement.clientHeight;
                }
                result.scrollWidth = Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth);
                result.scrollHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
                return result;
            }

            /* 返回半值，且为整数 */
            function halfOfValue(value){
                return parseInt(Math.round(0.5 * value), 10);
            }

            function computeAdjustX(windowInfo, x){
                switch (x){
                    case "left":
                        _adjustX = 0;
                        _leftName = "left";
                        break;
                    case "center":
                        _adjustX = ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail") ? windowInfo.scrollWidth : windowInfo.clientWidth) - _backTable.offsetWidth;
                        _adjustX = (_adjustX > 0 ? halfOfValue(_adjustX) : 0);
                        _leftName = "center";
                        break;
                    case "right":
                        _adjustX = ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail") ? windowInfo.scrollWidth : windowInfo.clientWidth) - _backTable.offsetWidth;
                        if (_adjustX < 0){ _adjustX = 0; }
                        _leftName = "right";
                        break;
                    default:
                        _adjustX = parseInt(x);
                        _leftName = null;
                        break;
                }
                if ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail")){
                    _leftName = null;
                }
            }

            function computeAdjustY(windowInfo, y){
                switch (y){
                    case "top":
                        _adjustY = 0;
                        _topName = "top";
                        break;
                    case "center":
                        _adjustY = ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail") ? windowInfo.scrollHeight : windowInfo.clientHeight) - _backTable.offsetHeight;
                        _adjustY = (_adjustY > 0 ? halfOfValue(_adjustY) : 0);
                        _topName = "center";
                        break;
                    case "bottom":
                        _adjustY = ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail") ? windowInfo.scrollHeight : windowInfo.clientHeight) - _backTable.offsetHeight;
                        if (_adjustY < 0){ _adjustY = 0; }
                        _topName = "bottom";
                        break;
                    default:
                        _adjustY = parseInt(y);
                        _topName = null;
                        break;
                }
                if ((_windowStyle == "nailWindow") || (_windowStyle == "fixedNail")){
                    _topName = null;
                }
            }

            /* 浏览器resize时，自动调整弹窗的位置 */
            function resizeNow(x, y){
                var windowInfo = getWindowStatus();
                if (_windowStyle == "screen"){
                    _backDiv.style.width = windowInfo.clientWidth + "px";
                    _backDiv.style.height = windowInfo.clientHeight + "px";
                    if (!!window.ActiveXObject && !document.getElementsByClassName){	/* IE6, 7, 8需要 */
                        registerRadius(_backDiv);
                    }

                    _adjustX = windowInfo.clientWidth - _backTable.offsetWidth;
                    _adjustX = (_adjustX > 0 ? halfOfValue(_adjustX) : 0);

                    _adjustY = windowInfo.clientHeight - _backTable.offsetHeight;
                    _adjustY = (_adjustY > 0 ? halfOfValue(_adjustY) : 0);
                } else {
                    /* 事件触发时 x, y 为"undefined"
                     * resize触发时，x, y == null为不变
                     * open时 x, y 必然有值
                     */
                    if ((typeof(x) == "undefined") || (x == null)){
                        if (_leftName != null){
                            computeAdjustX(windowInfo, _leftName);
                        }
                    } else {
                        computeAdjustX(windowInfo, x);
                    }

                    if ((typeof(y) == "undefined") || (y == null)){
                        if (_topName != null){
                            computeAdjustY(windowInfo, _topName);
                        }
                    } else {
                        computeAdjustY(windowInfo, y);
                    }
                }
                positionTo(windowInfo.scrollLeft, windowInfo.scrollTop);
            }

            function mouseMoving(evt){
                if (_moving){
                    var theEvent = (top.event ? top.event : evt);
                    if (theEvent.button == (!!window.ActiveXObject ? 1 : 0)) {
                        _adjustX += theEvent.screenX - _moveX;
                        _adjustY += theEvent.screenY - _moveY;
                        _moveX = theEvent.screenX;
                        _moveY = theEvent.screenY;
                        _leftName = null;
                        _topName = null;
                        scrollNow();
                    }
                }
            }

            function mouseUping(){
                _moving = false;
            }

            function setEvents(container, add, name, func){
                if (add){
                    if (!!window.ActiveXObject){
                        container.attachEvent("on" + name, func);
                    } else {
                        container.addEventListener(name, func, false);
                    }
                } else {
                    if (!!window.ActiveXObject){
                        container.detachEvent("on" + name, func);
                    } else {
                        container.removeEventListener(name, func, false);
                    }
                }
            }

            /* 设置或取消鼠标移动事件挂钩 */
            function setMouseEvent(add){
                if ((_windowStyle == "followWindow") || (_windowStyle == "nailWindow")){
                    setEvents(top.document, add, "mousemove", mouseMoving);
                    setEvents(top.document, add, "mouseup", mouseUping);
                }
            }

            /* 为避免事件参数的干扰，做一次转接 */
            function onResizeEvent(){
                resizeNow();
            }

            /* 设置或取消窗口scroll/resize事件挂钩 */
            function setWindowEvent(add){
                switch (_windowStyle){
                    case "nailWindow":
                    case "fixedNail":
                        setEvents(top, add, "resize", onResizeEvent);
                        break;
                    default:
                        setEvents(top, add, "resize", onResizeEvent);
                        setEvents(top, add, "scroll", scrollNow);
                        break;
                }
            }

            function hiding(cancel){
                if ((_backDiv != null) && (_currentStatus == "showing")){
                    _moving = false;
                    setMouseEvent(false);
                    setWindowEvent(false);
                    _titleLabel.style.width = "auto";
                    _backTable.style.display = "none";
                    _backDiv.style.display = "none";

                    showSelectTag();
                    _windowStyle = "screen";
                    _moveX = 0;
                    _moveY = 0;
                    _adjustX = 0;
                    _adjustY = 0;
                    _leftName = null;
                    _topName = null;

                    runCallback("beforeHide");
                    if (_resetState && (_srcUrl != "about:blank")){
                        _srcUrl = "about:blank";
                        _iframeObj.src = _srcUrl;
                    }
                    _resetState = true;
                    _currentStatus = (cancel == "cancel" ? "canceled" : "hided");
                    runCallback("afterHide");

                    for (var v in _uniqueEvents){
                        delete _uniqueEvents[v];
                    }
                }
            }

            /* beforeOpen	afterOpen	beforeHide	afterHide */
            function runCallback(name){
                var f = _uniqueEvents[name];
                if ((typeof(f) != "undefined") && (f != null)){
                    f();
                }
            }

            /* 自动产生圆角，及兼容透明 */
            function registerRadius(source){
                if (source.currentStyle["display"] == "none"){ return; }

                if (!top.document.namespaces.v){
                    top.document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                }
                if (_cssManager.vmlCss == null){
                    _cssManager.vmlCss = top.document.createStyleSheet();
                    _cssManager.vmlCss.addRule("v\\:shape", "behavior:url(#default#VML);display:inline-block");
                    _cssManager.vmlCss.addRule("v\\:path", "behavior:url(#default#VML)");
                    _cssManager.vmlCss.addRule("v\\:fill", "behavior:url(#default#VML)");
                    _cssManager.vmlCss.addRule("v\\:stroke", "behavior:url(#default#VML)");
                }

                function createShape(width, height, radius, backgroundColor, borderColor, borderWidth, opacity){
                    var shapeObj = top.document.createElement("v:shape");
                    shapeObj.className = "lingtong_vml_radius_shape";
                    shapeObj.setAttribute("coordorigin", "0 0");
                    shapeObj.setAttribute("coordsize", width + " " + height);

                    var strokeObj = top.document.createElement("v:stroke");
                    shapeObj.appendChild(strokeObj);
                    strokeObj.setAttribute("opacity", 0.68 * opacity);
                    if (borderWidth > 0){
                        strokeObj.setAttribute("weight", borderWidth + "px");
                        strokeObj.setAttribute("color", borderColor);
                    } else {
                        strokeObj.setAttribute("weight", "1px");
                        strokeObj.setAttribute("color", backgroundColor);
                    }

                    var fillObj = top.document.createElement("v:fill");
                    shapeObj.appendChild(fillObj);
                    if (!!backgroundColor){
                        fillObj.setAttribute("color", backgroundColor);
                    }
                    if (opacity < 1){
                        fillObj.setAttribute("opacity", opacity);
                    }

                    shapeObj.style.cssText = "position:absolute; z-index:-1; left:0px; top:0px; width:" + width + "px; height:" + height + "px;";

                    var corner_0 = 0;
                    var corner_1 = 0;
                    var corner_2 = 0;
                    var corner_3 = 0;
                    var list = radius.split(" ");
                    var index = 0;
                    for (var i = 0; i < list.length; i++){
                        if (list[i] != ""){
                            eval("corner_" + index + " = " + parseInt(list[i]));
                            index++;
                        }
                    }
                    switch (index){
                        case 1:
                            corner_1 = corner_0;
                            corner_2 = corner_0;
                            corner_3 = corner_0;
                            break;
                        case 2:
                            corner_2 = corner_0;
                            corner_3 = corner_1;
                            break;
                        case 3:
                            corner_3 = corner_1;
                            break;
                    }
                    var adjust = Math.floor(0.5 * Math.min(width, height));
                    corner_0 = Math.min(adjust, corner_0);
                    corner_1 = Math.min(adjust, corner_1);
                    corner_2 = Math.min(adjust, corner_2);
                    corner_3 = Math.min(adjust, corner_3);

                    width--;
                    height--;
                    var pathObj = top.document.createElement("v:path");
                    shapeObj.appendChild(pathObj);
                    pathObj.setAttribute("v", "");
                    pathObj.v += (corner_0 > 0 ? ("m 0," + corner_0 + " c 0," + corner_0 + " 0,0 " + corner_0 + ",0") : "m 0,0");
                    pathObj.v += " l " + (corner_1 > 0 ? ((width - corner_1) + ",0 c " + (width - corner_1) + ",0 " + width + ",0 " + width + "," + corner_1) : (width + ",0"));
                    pathObj.v += " l " + (corner_2 > 0 ? (width + "," + (height - corner_2) + " c " + width + "," + (height - corner_2) + " " + width + "," + height + " " + (width - corner_2) + "," + height) : (width + "," + height));
                    pathObj.v += " l " + (corner_3 > 0 ? (corner_3 + "," + height + " c " + corner_3 + "," + height + " 0," + height + " 0," + (height - corner_3)) : ("0," + height));
                    pathObj.v += " xe";

                    return shapeObj;
                }

                function draw(element){
                    var currentStyle_backgroundColor = null;
                    var currentStyle_borderColor;
                    var currentStyle_borderWidth;

                    for (var i = 0; i < element.childNodes.length; i++){
                        var tmp = element.childNodes[i];
                        if (tmp.className == "lingtong_vml_radius_shape"){
                            element.removeChild(tmp);
                            currentStyle_backgroundColor = element.getAttribute("currentStyle_backgroundColor");
                            currentStyle_borderColor = element.getAttribute("currentStyle_borderColor");
                            currentStyle_borderWidth = element.getAttribute("currentStyle_borderWidth");
                            break;
                        }
                    }
                    if (currentStyle_backgroundColor == null){
                        currentStyle_backgroundColor = element.currentStyle.backgroundColor;
                        currentStyle_borderColor = element.currentStyle.borderColor;
                        currentStyle_borderWidth = parseInt(element.currentStyle.borderWidth) || 0;
                        element.style.background = "transparent";
                        element.style.border = 0;

                        element.setAttribute("currentStyle_backgroundColor", currentStyle_backgroundColor);
                        element.setAttribute("currentStyle_borderColor", currentStyle_borderColor);
                        element.setAttribute("currentStyle_borderWidth", currentStyle_borderWidth);
                    }

                    if (!element.style.position){
                        element.style.position = "relative";
                    }

                    element.insertBefore(createShape(element.offsetWidth, element.offsetHeight, element.currentStyle["border-radius"],
                            currentStyle_backgroundColor, currentStyle_borderColor,
                            currentStyle_borderWidth, parseFloat(element.currentStyle.opacity || 1)),
                            element.childNodes.length > 0 ? element.childNodes[0] : null);
                }

                draw(source);

                /* 此应用没有额外的尺寸变化
                 source.attachEvent("onresize", function(){
                 draw(window.event.srcElement);
                 });
                 */
            }

            function getCurrentStyle(obj){
                return (window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle);
            }

            function initialize(){
                var doc = top.document;
                _backDiv = doc.createElement("div");
                _backDiv.className = "UniqueDialog_2_backMask";
                _backDiv.style.cssText = "display:none; position:absolute; padding:0; margin:0; border:0; outline:0; z-index:" + _zIndex;
                doc.body.insertBefore(_backDiv, (doc.body.childNodes.length > 0 ? doc.body.childNodes[0] : null));

                _backTable = doc.createElement("table");
                _backTable.border = 0;
                _backTable.cellSpacing = 0;
                _backTable.cellPadding = 0;
                _backTable.style.cssText = "display:none; position:absolute; padding:0; margin:0; border:0; outline:0; vertical-align:baseline; z-index:" + (_zIndex + 1);
                doc.body.insertBefore(_backTable, _backDiv);

                var tbody = doc.createElement("tbody");
                _backTable.appendChild(tbody);

                var row = tbody.insertRow(0);
                row.insertCell(0).className = "UniqueDialog_2_table_leftTop";
                var cell = row.insertCell(1);
                cell.className = "UniqueDialog_2_table_border";
                cell.setAttribute("width", 10);
                row.insertCell(2).className = "UniqueDialog_2_table_rightTop";

                row = tbody.insertRow(1);
                row.setAttribute("height", 0);
                row.insertCell(0).className = "UniqueDialog_2_table_border";
                cell = row.insertCell(1);
                _titleContainer = doc.createElement("div");
                _titleContainer.className = "UniqueDialog_2_titleContainer";
                cell.appendChild(_titleContainer);

                _titleLabel = doc.createElement("span");
                _titleLabel.className = "UniqueDialog_2_titleText";
                _titleContainer.appendChild(_titleLabel);

                _titleContainer.onmousedown = _titleLabel.onmousedown = function(evt){
                    if ((_windowStyle == "followWindow") || (_windowStyle == "nailWindow")){
                        var theEvent = (top.event ? top.event : evt);
                        _moveX = theEvent.screenX;
                        _moveY = theEvent.screenY;
                        _moving = true;
                    }
                };

                _closeButton = doc.createElement("span");
                _closeButton.className = "UniqueDialog_2_closeButton";
                _closeButton.title = "关闭";
                _titleContainer.appendChild(_closeButton);
                _closeButton.onmousedown = function(){
                    hiding("cancel");
                }
                _closeButton.onmouseover = function(){
                    var obj = getCurrentStyle(_closeButton);
                    if (!!obj.lineHeight && (parseInt(obj.lineHeight) > 0)){
                        _closeButton.style.backgroundPosition = "left -" + obj.lineHeight;
                    }
                };
                _closeButton.onmouseout = function(){
                    var obj = getCurrentStyle(_closeButton);
                    if (!!obj.lineHeight && (parseInt(obj.lineHeight) > 0)){
                        _closeButton.style.backgroundPosition = "left top";
                    }
                };
                row.insertCell(2).className = "UniqueDialog_2_table_border";

                row = tbody.insertRow(2);
                row.setAttribute("height", 10);
                row.insertCell(0).className = "UniqueDialog_2_table_border";
                cell = row.insertCell(1);
                cell.setAttribute("width", 10);
                cell.className = "UniqueDialog_2_table_iFrame";
                _iframeObj = doc.createElement("iframe");
                _iframeObj.frameBorder = 0;
                _iframeObj.allowTransparency = true;
                _iframeObj.scrolling = "no";
                _iframeObj.width = 10;
                _iframeObj.height = 10;
                cell.appendChild(_iframeObj);
                row.insertCell(2).className = "UniqueDialog_2_table_border";

                row = tbody.insertRow(3);
                row.insertCell(0).className = "UniqueDialog_2_table_leftBottom";
                row.insertCell(1).className = "UniqueDialog_2_table_border";
                row.insertCell(2).className = "UniqueDialog_2_table_rightBottom";
            }

            function resizeWindow(width, height, x, y){
                if (_titleLabel.offsetLeft + _titleLabel.offsetWidth + _closeButton.offsetWidth > width){
                    _titleLabel.style.width = (width - _titleContainer.offsetWidth - _titleLabel.offsetLeft + _closeButton.offsetLeft) + "px";
                } else {
                    _titleLabel.style.width = "auto";
                }
                _iframeObj.width = width;
                _iframeObj.height = height;

                if (!!window.ActiveXObject && !document.getElementsByClassName){
                    registerRadius(_backTable.rows[0].cells[0]);
                    registerRadius(_backTable.rows[0].cells[1]);
                    registerRadius(_backTable.rows[0].cells[2]);
                    if (_backTable.rows[1].style.display != "none"){
                        registerRadius(_backTable.rows[1].cells[0]);
                        registerRadius(_backTable.rows[1].cells[2]);
                    }
                    registerRadius(_backTable.rows[2].cells[0]);
                    registerRadius(_backTable.rows[2].cells[2]);
                    registerRadius(_backTable.rows[3].cells[0]);
                    registerRadius(_backTable.rows[3].cells[1]);
                    registerRadius(_backTable.rows[3].cells[2]);
                }

                resizeNow(x, y);
            }

            /* 递归使用hideElementRecursive，以确保frame里的对象也被处理 */
            function hideSelectTag(element){
                hideElementRecursive(element.document);
                var frameList = element.frames;
                for (var i = 0; i < frameList.length; i++) {
                    if (frameList[i] != _iframeObj.contentWindow) {
                        hideSelectTag(frameList[i]);
                    }
                }
            }

            /* 隐藏底层元素，避免浮动在层div上，配合hideSelectTag使用 */
            function hideElementRecursive(doc){
                var elements = doc.all.tags("SELECT");
                var obj;
                for(var i = 0; i < elements.length; i++) {
                    obj = elements[i];
                    if ((typeof(obj.style.visibility) == "undefined") || (obj.style.visibility != "hidden")) {
                        obj.style.visibility = "hidden";
                        _selectHideList.push(obj);
                    }
                }
            }

            /* 恢复显示隐藏的select */
            function showSelectTag(){
                for(var i = 0; i < _selectHideList.length; i++) {
                    _selectHideList[i].style.visibility = "";
                }
                _selectHideList.length = 0;
                _selectVisible = "auto";
            }

            /* 生成/激活新css，关闭其它的 */
            function adjustCss(cssPath){
                if (cssPath != null){
                    if (!_reg_uri.test(cssPath)){
                        cssPath = _jsPath + cssPath;
                    }
                    if ((_cssManager.currIndex > -1) && (_cssManager.borderCssList[_cssManager.currIndex].css_path == cssPath)){
                        return false;
                    }
                } else {
                    if (_cssManager.currIndex > -1){
                        return false;
                    } else {
                        cssPath = _jsPath + "inside/green.css";
                    }
                }

                var cssObj;
                for (var i = 0; i < _cssManager.borderCssList.length; i++){
                    cssObj = _cssManager.borderCssList[i];
                    if (cssObj.css_path == cssPath){
                        cssPath = null;
                        _cssManager.currIndex = i;
                        cssObj.css_obj.disabled = false;
                    } else {
                        cssObj.css_obj.disabled = true;
                    }
                }

                if (cssPath != null){
                    var doc = top.document;

                    if (!!window.ActiveXObject && !window.setImmediate){
                        cssObj = doc.createStyleSheet(cssPath);
                    } else {
                        cssObj = doc.createElement("link");
                        cssObj.type = "text/css";
                        cssObj.rel = "stylesheet";
                        cssObj.href = cssPath;
                        doc.getElementsByTagName("head")[0].appendChild(cssObj);
                    }
                    _cssManager.currIndex = _cssManager.borderCssList.length;
                    _cssManager.borderCssList.push({ css_obj:cssObj, css_path:cssPath });
                }
                return true;
            }

            function opening(params){
                if (_iframeObj == null){
                    initialize();
                }

                var srcUrl = "about:blank";
                var x = 0;
                var y = 0;
                var width = 400;
                var height = 300;
                var title = "";
                for (var p in params){
                    switch (p){
                        case "kind":
                            _windowStyle = params[p];
                            break;
                        case "left":
                            x = params[p];
                            break;
                        case "top":
                            y = params[p];
                            break;
                        case "width":
                            width = params[p];
                            break;
                        case "height":
                            height = params[p];
                            break;
                        case "title":
                            title = params[p];
                            break;
                        case "url":
                            srcUrl = params[p];
                            break;
                        case "unflash":
                            _resetState = !params[p];
                            break;
                        case "beforeOpen":
                        case "afterOpen":
                        case "beforeHide":
                        case "afterHide":
                            _uniqueEvents[p] = params[p];
                            break;
                        case "hideSelect":
                            _selectVisible = params[p];
                            break;
                    }
                }

                runCallback("beforeOpen");
                if ((_srcUrl != "about:blank") && (_resetState || (_srcUrl != srcUrl))){
                    _srcUrl = "about:blank";
                    _iframeObj.src = _srcUrl;
                }

                _backTable.style.zIndex = _zIndex + 1;
                _backTable.style.display = "";
                _titleLabel.innerHTML = title;
                switch (_windowStyle){
                    case "screen":
                        _backDiv.style.zIndex = _zIndex;
                        _backDiv.style.display = "block";

                        _titleContainer.style.cursor = _titleLabel.style.cursor = "default";
                        _backTable.rows[1].style.cssText = _backTable.rows[2].cells[1].style.cssText = "";
                        break;
                    case "followWindow":
                    case "nailWindow":
                        _backDiv.style.display = "none";

                        _titleContainer.style.cursor = _titleLabel.style.cursor = "move";
                        _backTable.rows[1].style.cssText = _backTable.rows[2].cells[1].style.cssText = "";
                        break;
                    case "fixedFollow":
                    case "fixedNail":
                        _backDiv.style.display = "none";

                        _backTable.rows[1].style.cssText = "display:none;";
                        _backTable.rows[2].cells[1].style.cssText = "border:0";
                        break;
                }
                resizeWindow(width, height, x, y);

                if (_resetState || (_srcUrl != srcUrl)){
                    _srcUrl = srcUrl;
                    _iframeObj.src = _srcUrl;
                }
                if (window.ActiveXObject && !document.documentMode){
                    switch (_windowStyle){
                        case "screen":
                            if (_selectVisible != "showAlways"){
                                hideSelectTag(top);
                            }
                            break;
                        default:
                            if (_selectVisible == "hidden"){
                                hideSelectTag(top);
                            }
                            break;
                    }
                }
                setWindowEvent(true);
                setMouseEvent(true);
                _backTable.focus();
                _iframeObj.contentWindow.focus();
                _currentStatus = "showing";
                runCallback("afterOpen");
            }

            /** 打开/显示弹窗。
             *
             * 参数params必须是一个对象，其key/value为自由组合的参数。目前有效的组合系列为：
             *
             *	窗口属性系列：
             *		☆ kind			其值可有：
             *			- screen			满屏显示（可设置标题），页面的其它部分将无法操作。“用于强制用户完成弹窗内操作的场合”
             *			- followWindow		可用鼠标移动的窗口（可设置标题），并且随着滚动条自动滚动。
             *								“用于确保用户能看见弹窗，还允许移动的场合。其left:"left"、"center...等描述将局限于当前可视区域”
             *			- nailWindow		可用鼠标移动的窗口（可设置标题），但不会自动滚动。“用于把弹窗固定在某处，但允许手工移动的场合”
             *			- fixedFollow		随着滚动条自动滚动的窗口（无标题），但不能用鼠标移动。
             *								“用于确保用户能看见弹窗，但无法手工移动的场合。其left:"left"、"center...等描述将局限于当前可视区域”
             *			- fixedNail			位置固定不变的窗口（无标题），也不能用鼠标移动。“用于把弹窗固定在某处的场合”
             *
             *		☆ cssPath		指定此次弹出要用哪种皮肤效果（默认为 inside/green.css），每次弹出可以有不同效果。
             *							1. 如果cssPath以（"/" 或 http）开头，则必须是全局有效的绝对路径。
             *							2. 如果开头没有"/"，则假设是以本 UniqueDialog_2.js 的目录为“根”的相对路径。
             *		☆ width		内部iframe的窗口宽度，纯数字（单位为像素）
             *		☆ height		内部iframe的窗口高度，纯数字（单位为像素）
             *		☆ left			省略或null为不变，kind = "screen"时无效。
             *							纯数字（单位为像素）时位置固定（followWindow，fixedFollow仍旧随滚动条滚动）。
             *							字符串"left"、"center"、"right"时，随着浏览器窗口尺寸改变而自动改变位置。
             *		☆ top			省略或null为不变，kind = "screen"时无效。
             *							纯数字（单位为像素）时位置固定（followWindow，fixedFollow仍旧随滚动条滚动）。
             *							字符串"top"、"center"、"bottom"时，随着浏览器窗口尺寸改变而自动改变位置。
             *		☆ title		弹窗的标题。kind = "fixedFollow / fixedNail"时无效
             *
             *	内部iframe页面系列：
             *		☆ url			值为内部页面的路径
             *		☆ unflash		弹窗隐藏后iframe内的页面默认被清除。如果想保留该页面以提高性能，可设此参数为true。
             *
             *	回调函数系列：
             *	  可以同时注册多种事件。但同种事件只能注册一个回调函数（必须提供函数对象，不能是字符串），后注册的会冲掉前面的。
             *	  另外，窗口关闭后已注册的函数会自动清除。目前有效的事件（key为事件名，回调函数赋给value）有：
             *		☆ beforeOpen	显示弹窗前，会调用该函数
             *		☆ afterOpen	弹窗显示完成后，会调用该函数
             *		☆ beforeHide	隐藏弹窗前，会调用该函数
             *		☆ afterHide	弹窗隐藏后，会调用该函数
             *
             *	特殊系列：
             *		☆ hideSelect	为了修补IE6/7的bug，有时需要隐藏外部页面的select标签。其值可为：
             *			- auto			自动（默认值，并且窗口隐藏时总是重置为auto）
             *								在IE6/7里，kind = "showScreen"时会自动隐藏select
             *			- hidden		只要在IE6/7里，总是隐藏select标签
             *			- showAlways	无论什么状况，从不隐藏select标签
             */
            this.open = function(params){
                hiding("cancel");

                var changed = adjustCss(params.cssPath || null);
                if (!!window.ActiveXObject && !document.setImmediate){
                    setTimeout(function(){ opening(params); }, (changed ? 300 : 50));			/* 修补 IE Bug */
                } else {
                    opening(params);
                }
            };

            /* 正常隐藏窗口。之后调用top.UniqueDialog_2.status() 将返回 "hided" */
            this.hide = function(){
                hiding("");
            };

            /* 强制隐藏窗口。之后调用top.UniqueDialog_2.status() 将返回 "canceled" */
            this.cancel = function(){
                hiding("cancel");
            };

            /* 本对象用于在iframe页面切换之时保存及传递变量/函数；或其它需要传递信息的场合 */
            this.tmp = _tmp;

            /* 如果出现“不能执行已释放的Script代码”错误，可在适当的时候调用本函数清除 tmp 里的数据 */
            this.clearTMP = function(){
                for (var v in _tmp){
                    delete _tmp[v];
                }
            };

            /* 改变弹出窗口的 z-index 值。默认为1000 */
            this.setZindex = function(zIndex){
                _zIndex = zIndex;
                if (_backDiv != null){
                    _backTable.style.zIndex = _zIndex + 1;
                    _backDiv.style.zIndex = _zIndex;
                }
            };

            /** 弹窗目前的状况：
             *
             *		showing		处于显示状态
             *		hided		未显示（正常关闭）
             *		canceled	未显示（之前被强制关闭了）
             */
            this.status = function(){
                return _currentStatus;
            };

            /** 在窗口已经显示的状态下，重置窗口的尺寸与位置（可从内部iframe页面内调用）
             *
             *  width	内部iframe的窗口宽度，纯数字（单位为像素）。给null则不变。
             *  height	内部iframe的窗口高度，纯数字（单位为像素）。给null则不变。
             *  left	省略或null为不变，kind = "screen"时无效。
             *				纯数字（单位为像素）时位置固定（followWindow，fixedFollow仍旧随滚动条滚动）。
             *				字符串"left"、"center"、"right"时，随着浏览器窗口尺寸改变而自动改变位置。
             *  top		省略或null为不变，kind = "screen"时无效。
             *				纯数字（单位为像素）时位置固定（followWindow，fixedFollow仍旧随滚动条滚动）。
             *				字符串"top"、"center"、"bottom"时，随着浏览器窗口尺寸改变而自动改变位置。
             */
            this.resize = function(width, height, left, top){
                if ((_currentStatus == "showing") && (typeof(width) != "undefined")){
                    resizeWindow((width == null ? _iframeObj.width : width),
                        ((typeof(height) == "undefined") || (height == null) ? _iframeObj.height : height),
                        (typeof(left) == "undefined" ? null : left),
                        (typeof(top) == "undefined" ? null : top));
                }
            };
        };

        /* 保存在顶层窗口，整页面共享 */
        top["UniqueDialog_2"] = _uniqueDialog;
    }
})();