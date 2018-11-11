(function() {
    //*****************************************************************************************************/
    // 图像队列对象 开始
    //*****************************************************************************************************/

    //图片队列对象
    var picQueue = new function() {
        //定义一个数组用于保存顺序队列的图片
        this.slideQueue;
        //保存数组的默认长度
        this.default_size = 100;
        //保存数组的长度
        this.capacity;
        //指针
        this.front = 0;
        this.rear = 0;
        this.showFront = 0;
        this.showRear = 5;
        //滑动的方向
        this.direction = "down";

        //以默认的数组长度创建空顺序队列
        this.initQueue = function() {
            this.showFront = 0;
            this.showRear = 5;
            this.capacity = this.default_size;
            this.slideQueue = new Array(this.capacity);
        };

        //获取顺序队列的大小
        this.length = function() {
            return this.rear - this.front;
        };

        //判断顺序队列是否为空队列
        this.empty = function() {
            return this.rear == this.front;
        };

        //插入队列
        this.add = function(obj) {
            if (this.rear > this.capacity - 1) {
                alert("队列已满！");
                return;
            }

            this.slideQueue[this.rear++] = obj;
        };

        //移除队列
        this.remove = function() {
            if (this.empty()) {
                alert("空队列，无法删除！");
                return;
            }
            var oldValue = this.slideQueue[rear];
            this.slideQueue[this.rear++] = null;
            return oldValue;
        };

        this.removeAll = function() {
            while (!this.empty()) {
                this.slideQueue[this.rear--] = null;
            }
        };

        //返回队列的顶元素，但不删除队列顶元素
        this.getTopPic = function() {
            if (this.empty()) {
                alert("队列为空！");
                return;
            }
            return this.slideQueue[front];
        };

        //得到指定下标的元素
        this.getPic = function(index) {
            if (this.empty()) {
                alert("队列为空！");
                return;
            }

            if (index > this.length() - 1 || index < 0) {
                alert("下标异常！");
                return;
            }

            return this.slideQueue[index];
        };

        //滑动
        this.slidePic = function() {
            if (this.direction == "down") {
                this.showFront = this.showRear;

                this.showRear += 5;

            } else if (this.direction == "up") {
                this.showRear = this.showFront;
                this.showFront -= 5;
            }
        };
    };

    //*****************************************************************************************************/
    // 图像队列对象 结束
    //*****************************************************************************************************/

    //*****************************************************************************************************/
    // ajax对象 开始
    //*****************************************************************************************************/

    //ajax对象
    var picAjax = new function() {
        this.url;

        var xmlhttp;

        //返回一个xmlhttp
        function ajax_createXmlhttp() {
            var xmlhttp = null;

            if (window.XMLHttpRequest) {//遵守Dom2规范的
                xmlhttp = new XMLHttpRequest();
            } else {//ie浏览器
                var msxml = new Array('MSXML2.XMLHTTP.6.0',
                    'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
                    'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',
                    'Microsoft.XMLHTTP');
                for ( var i = 0; i < msxml.length; i++) {
                    try {
                        xmlhttp = new ActiveXObject(msxml[i]);
                        activexType = i;
                        break;
                    } catch (e) {
                    }
                }
            }

            if (xmlhttp == null) {
                window.alert("Your broswer not support XMLHttpRequest!");
            }
            return xmlhttp;
        }
        ;

        //提交请求
        this.ajax_submitPostReq = function(paramUrl, cbfunc) {

            //创建xmlhttp
            xmlhttp = ajax_createXmlhttp();
            var url = paramUrl;
            setUrl(url);
            picAjax.callbackFunc = cbfunc;
            xmlhttp.open("post", getUrl(), true);
            xmlhttp.onreadystatechange = processResponse;
            xmlhttp.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");
            xmlhttp.send(null);

        };
        //onreadystatechange的回调方法
        function processResponse() {
            if (xmlhttp.readyState == 4) { // Complete
                if (xmlhttp.status == 200) { // OK response
                    var returnHtml = null;
                    returnHtml = xmlhttp.responseText;

                    picAjax.callbackFunc(returnHtml);

                } else {
                    alert("Problem: " + xmlhttp.statusText);
                }
            }

        }
        ;

        function setUrl(url) {
            this.url = url;

            var myDate = new Date();
            var time = myDate.toLocaleTimeString();
            if (this.url.indexOf('?') > 0) {

                this.url += '&datetime=' + time;
            } else {
                this.url += '?datetime=' + time;
            }
        }
        ;

        function getUrl() {
            return this.url;
        }
        ;
    };

    //*****************************************************************************************************/
    // ajax对象 结束
    //*****************************************************************************************************/

    //*****************************************************************************************************/
    // 播放器对象 开始
    //*****************************************************************************************************/

    //播放器对象
    img_player = new function() {

        // it's IE?
        var isIE = false;
        //用setAttribute()方法设置class属性时，ie6,7要用classname，而ie8，9要用class，其它非ie浏览器，也是用class，所以这里ie8,9设置为false
        if (navigator.appName == "Microsoft Internet Explorer"
            && navigator.appVersion.match(/7./i) == "7.") {
            isIE = true;
        } else if (navigator.appName == "Microsoft Internet Explorer"
            && navigator.appVersion.match(/8./i) == "8.") {
            isIE = false;
        } else if (navigator.appName == "Microsoft Internet Explorer"
            && navigator.appVersion.match(/9./i) == "9.") {
            isIE = false;
        } else if (navigator.appName == "Microsoft Internet Explorer") {
            isIE = true;
        } else {//不是IE的任何一种版本
            isIE = false;
        }

        var projectPath;
        var outerObject = null;//外部的插件

        /************************************** 窗体变量 start ***/
        var pageWidth;
        var pageHeight;
        var winWidth;
        var winHeight;
        var scrollX;
        var scrollY;
        /************************************** 窗体变量 end ***/

        /************************************** 右边滚动图片变量 start ***/
        //播放器右边滚动图片
        var picArray;
        //右边滚动图片的显示数目
        var slidePicNum = 5;
        //当前展示的图片，默认第一张
        var currentPic = 0;
        var currentPicTotal = 0;
        //图片队列的第一张图片位置
        var startNum;
        //图片队列末尾图片的位置
        var endNum;
        //图片的总数
        var picTotalNum;
        //总共要加载的图片总数
        var loadPicTotalNum;
        //显示图片的区域
        var strSlidePosition = "slide_window_";
        //是否加载完图片
        var isLoadPic = false;
        //由于加载图片数量的限制，回导致，查询出来的图片总数，与加载的数量的不一致。这个变量为了保存，下标的相差值
        var oldShowFront;
        /*************************************** 右边滚动图片变量 end ***/

        //图像队列的对象
        var imgQueue;

        //定时器
        var intervalTimer = null;
        var timeoutTimer = null;
        //单位毫秒
        var intervalTime = 3000;
        var timeoutTime = 5000;

        /**************************************** 图片相关属性 start ***/
        var picTitle = new Array();
        var picDate = new Array();
        var picTime = new Array();
        var picWidths = new Array();
        var picHeights = new Array();
        var picStrContent = new Array();//图片的描述
        var picStrContentAll = new Array();//描述大于70字符
        var picFromType = new Array();//图片来源：默认为0来自pc，为1来自微信

        var picIds = new Array();
        var picHWs = new Array();
        var amListId = new Array();//相册集数组--相册的ID
        var amListValue = new Array();//相册集数组--相册的value

        //相册集序号 默认为0（默认加载第一个相册集）
        var albumListId = 0;
        var isAlbumList = false;//要不要显示相册集下拉列表框
        var imgId;
        var columnId;//相册Id

        //是否显示图片的评论列表
        var isShowComment = false;//默认不显示

        //加载时，左侧图片不存在时
        var leftPicNull;
        //加载时，右侧图片不存在时
        var rightPicNull;

        //上一相册集的图片按钮
        var preAlbumListPic;
        //下一相册集的图片按钮
        var nextAlbumListPic;

        //自动播放：暂停按钮的图片
        var pauseBtnPic;
        var startBtnPic;
        /**************************************** 图片相关属性 end ***/

        /**************************************** ajax相关变量 start ***/
        //取图片模式：1-初次取图；2-向左取图；3-向右取图
        var type = 1;
        //提交Action方法的地址
        var actionUrl;
        var ajaxMainPath;
        //图片路径集合
        var pathList = new Array();
        var elelist;
        //相册下拉列表框的长度
        var albumLength;
        //ajax对象
        var imageAjax;
        /**************************************** ajax相关变量 end ***/

            //**************************************************************************************/
            //公开的接口         开始
            //*************************************************************************************/
            //播放器界面初始化
        this.startPlay = function(url) {
            //加载时，左侧图片不存在时
            leftPicNull = projectPath + "/picShow/images/nopicture.gif";
            //加载时，右侧图片不存在时
            rightPicNull = projectPath + "/picShow/images/null.gif";

            //上一相册集的图片按钮
            preAlbumListPic = projectPath + "/picShow/images/pic_up.gif";
            //下一相册集的图片按钮
            nextAlbumListPic = projectPath + "/picShow/images/pic_down.gif";

            //自动播放：暂停按钮的图片
            pauseBtnPic = projectPath + "/picShow/images/btn_stop.gif";
            startBtnPic = projectPath + "/picShow/images/btn_play4.gif";

            wechatPic = projectPath + "/picShow/images/mobile.gif";

            //当点击关闭按钮时，只是把div隐藏了，在页面不刷新的情况下，让隐藏的div，显示出来
            if (document.getElementById("bgDiv")) {

                if(isAlbumList)
                {
                    for(var i = 0; i < amListId.length; i++)
                    {
                        if(amListId[i] == url.split("&")[0].split("=")[1])
                        {
                            albumListId = i;
                            break;
                        }
                    }
                }

                pageWidth = getPageSize().pageWidth;
                pageHeight = getPageSize().pageHeight;
                var bgObject = document.getElementById("bgDiv");
                bgObject.style.display = "";
                bgObject.style.width = pageWidth + "px";
                bgObject.style.height = pageHeight + "px";

                document.getElementById("imgPlayerDiv").style.display = "";
                document.getElementById("albumlistsel").selectedIndex = albumListId;
                changeWindowScrollSize();//重置位置
            } else {
                uiInit();
                changeWindowScrollSize();//重置位置
                if (isAlbumList) {
                    document.getElementById("albumlistsel").style.display = "";

                    //相册集加载
                    for ( var i = 0; i < amListId.length; i++) {
                        document.getElementById("albumlistsel").options
                            .add(new Option(amListValue[i], amListId[i]));
                    }
                    document.getElementById("albumlistsel").selectedIndex = albumListId;
                    albumLength = document.getElementById("albumlistsel").options.length;
                    addEvent(document.getElementById("albumlistsel"), "change",
                        changeAlbum);
                } else {
                    document.getElementById("albumlistsel").style.display = "none";
                }
                addEvent(document.getElementById("previousBtn"), "click",
                    previousBtn);
                addEvent(document.getElementById("nextBtn"), "click", nextBtn);
                addEvent(document.getElementById("previousGroupBtn"), "click",
                    previousGroupBtn);
                addEvent(document.getElementById("nextGroupBtn"), "click",
                    nextGroupBtn);
                //addEvent(document.getElementById("albumlistsel"),"change",changeAlbum);
                addEvent(document.getElementById("closeWindowBtn"), "click",
                    closePlayWindow);
                addEvent(document.getElementById("closeBtn"), "click",
                    closePlayWindow);
                addEvent(document.getElementById("autoPlayBtn"), "click",
                    autoPlayBtn);
                addEvent(document.getElementById("mytitleLink"), "click",
                    showBigPic);
                addEvent(document.getElementById("picMs"), "mouseout",
                    divBlur);
                addEvent(document.getElementById("picMs"), "mouseover",
                    divFocus);

                //增加评论的点击事件
                if(isShowComment)
                {
                    addEvent(document.getElementById("commentBtn"), "click",
                        commentlist);
                }
                //窗体事件
                addEvent(window, "resize", changeWindowSize);
                addEvent(window, "scroll", changeWindowScrollSize);
            }

            imgQueue = picQueue;
            imgQueue.initQueue();

            imageAjax = picAjax;

            //url处理 '/schoolxp/diyschool/album.slt?clusterId=<%=columnId%>&playId=${info.id }&type=1'
            ajaxMainPath = url.split("?")[0];

            actionUrl = url;
            getPicListByAlbumList(actionUrl);
        };

        //相册集加载(现有的Ajax对象没有用队列结构写，所以，相册集，与图片集合，不能一起发送请求。因此，让相册集，通过jsp中读取数据)(key--相册ID，value--相册名)
        this.setAlbumList = function(i,key, value,mrId) {
            albumListId = mrId;
            isAlbumList = true;//显示相册集下拉列表框
            amListId[i] = key;
            amListValue[i] = value;
        };
        //isComment只有两种值true or false 标志是否显示图片的评论列表
        this.setIsShowComment = function(isComment)
        {
            /*if(arguments.length == 0)
             {
             isShowComment = false;
             }
             else
             {
             isShowComment = isComment;
             }*/
            if(typeof(isComment) == 'undefined' || isComment == null)
            {
                isComment = false;
            } else {
                isShowComment = isComment;
            }
        };

        //设置路径
        this.setProjectPath = function(path) {
            projectPath = path;
        };
        //设置外部的插件
        this.setOuterObject = function(obj) {
            outerObject = obj;
        };
        //**************************************************************************************/
        //公开的接口         结束
        //*************************************************************************************/

        //*****************************************************************************************************/
        // ajax处理部分 开始
        //*****************************************************************************************************/

        //根据相册集获取对应的照片
        function getPicListByAlbumList(url) {
            imageAjax.ajax_submitPostReq(url, postSlideShowArray);
        }
        ;

        /** 相册播放列表处理*/
        function postSlideShowArray(text) {
            if (text != "error") {

                //-------------------------------解析返回的字符串--start----------------------------------------------
                //格式为：图片的标题，创建日期，图片路径，图片宽度，图片高度,图片ID,高宽比;       picTitle;picDate;picTime;albumListId;

                elelist = text.split(";");
                type = elelist[0];//取图模式
                columnId = elelist[1];//栏目ID
                imgId = elelist[2];//图片ID
                startNum = elelist[3];//队列的开始图片
                currentPicTotal = Number(elelist[4]);//当前图片的位置
                endNum = elelist[5];//队列的末尾图片位置
                loadPicTotalNum = elelist[6];//总的图片数
                currentPic = Number(elelist[7]);//数组中当前的图片的位置

                //result格式为：图片的标题，创建日期，人气，图片路径,图片ID，图片宽度，图片高度,高宽比,图片描述--有格式的,图片描述--无格式的;
                var j = 0;
                if(elelist[8] != null && elelist[8] != '' && typeof(elelist[8]) != 'undefined')
                {
                    for ( var i = 8; i < elelist.length; i++) {
                        var pictureList = elelist[i];
                        picTitle[j] = pictureList.split(",")[0];
                        picDate[j] = pictureList.split(",")[1];
                        picTime[j] = pictureList.split(",")[2];
                        pathList[j] = pictureList.split(",")[3];
                        picIds[j] = pictureList.split(",")[4];
                        picWidths[j] = pictureList.split(",")[5];
                        picHeights[j] = pictureList.split(",")[6];
                        picHWs[j] = pictureList.split(",")[7];
                        picStrContent[j] = pictureList.split(",")[8];//div里显示
                        picStrContentAll[j] = pictureList.split(",")[9];//title中显示
                        picFromType[j] = pictureList.split(",")[10];
                        j++;
                    }
                }
                else
                {
                    picTitle[0] = "";
                    picDate[0] = "";
                    picTime[0] = "";
                    picStrContent[0] = "";
                    picStrContentAll[0] = "";
                    pathList[0] = rightPicNull;
                    loadPicTotalNum = 1;
                    picFromType[0] = 0;
                }

                //-------------------------------根据当前图片的位置设置imgQueue.showFront、imgQueue.showRear的值--start----------------------------------------------
                var flag = true;
                var flagNum = 5;
                while (flag) {
                    if ((currentPicTotal + 1) <= flagNum) {
                        imgQueue.showRear = flagNum;
                        imgQueue.showFront = imgQueue.showRear - 5;

                        flag = false;
                    }
                    flagNum = flagNum + 5;
                }
                flag = true;
                flagNum = 5;
                while (flag) {
                    if ((currentPic + 1) <= flagNum) {
                        oldShowFront = imgQueue.showRear - flagNum;
                        flag = false;
                    }
                    flagNum = flagNum + 5;
                }
                //-------------------------------根据当前图片的位置设置imgQueue.showFront、imgQueue.showRear的值--end---------------------

                //-------------------------------解析返回的字符串--end----------------------------------------------

                imgQueue.removeAll();

                if ((loadPicTotalNum - (elelist.length - 8)) > 0) {
                    picTotalNum = elelist.length - 8;
                    isLoadPic = true;
                } else {
                    picTotalNum = loadPicTotalNum;

                }
                for ( var i = 0; i < picTotalNum; i++) {
                    //把数据添加到队列中(把图片的路径转换为缩略图的路径)
                    imgQueue.add(getBreImg(pathList[i]));
                }

                var position = 0;
                for ( var i = imgQueue.showFront; i < (imgQueue.showRear > picTotalNum ? imgQueue.showRear
                    : picTotalNum); i++) {
                    var j = i - oldShowFront;
                    //总的图片不是5的整数倍
                    if (imgQueue.showRear - loadPicTotalNum > 0) {
                        if (i >= loadPicTotalNum) {
                            if(document.getElementById(strSlidePosition+ position).firstChild != null)
                            {
                                document.getElementById(strSlidePosition + position)
                                    .removeChild(document.getElementById(strSlidePosition+ position).firstChild);
                                position++;
                            }
                            continue;
                        }

                        var slideShowPid = document.getElementById(strSlidePosition + position);
                        if (slideShowPid) {
                            slideShowPid.innerHTML = "<img src='"
                                + imgQueue.slideQueue[j]
                                + " ' width='100' height='75' id='img" + i
                                + "'/>";
                            addEvent(document.getElementById("img" + i), "click", showLeftPic);
                            addEvent(slideShowPid, "mouseover", changeMouseOverCss);
                            addEvent(slideShowPid, "mouseout", changeMouseOutCss);
                        }

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("img" + i);
                        imgSource.adjustWidth = picWidths[j];
                        imgSource.adjustHeight = picHeights[j];
                        if ((typeof (picHWs[j]) == "undefined") || (picHWs[j] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[j];
                        }
                        ChangeImageSize(imgSource);

                        if (i == currentPicTotal) {
                            currentPic = j;
                            document.getElementById("ss_img_par").firstChild.setAttribute("src", pathList[currentPic]);
                            document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                            //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                            //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                            var imgSource = document.getElementById("ss_img");
                            imgSource.width = 450;
                            imgSource.height = 450;
                            imgSource.adjustWidth = picWidths[j];
                            imgSource.adjustHeight = picHeights[j];
                            if ((typeof (picHWs[j]) == "undefined") || (picHWs[j] == null)) {
                                imgSource.adjustHW = 0;
                            } else {
                                imgSource.adjustHW = picHWs[j];
                            }
                            ChangeImageSize(imgSource);

                            document.getElementById("mytitleLink").innerHTML = picTitle[j];

                            if(isShowComment)
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[j] + " | 人气(" + picTime[j] + ")";
                            }
                            else
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[j] ;
                            }
                            if(picFromType[currentPic] == "0"){
                                document.getElementById("mypage").innerHTML = (i + 1)+ " / " + loadPicTotalNum;
                            } else if(picFromType[currentPic] == "1"){
                                document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (i + 1) + " / " + loadPicTotalNum;
                            }
                            document.getElementById("picMs").innerText = picStrContent[j] == "null" ? "" : picStrContent[j];
                        }
                        position++;
                        continue;
                    }
                    var slideShowPid = document.getElementById(strSlidePosition + position);
                    if (slideShowPid) {
                        slideShowPid.innerHTML = "<img src='" + imgQueue.slideQueue[j] + " ' width='100' height='75' id='img" + i + "'/>";

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("img" + i);
                        imgSource.adjustWidth = picWidths[j];
                        imgSource.adjustHeight = picHeights[j];
                        if ((typeof (picHWs[j]) == "undefined") || (picHWs[j] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[j];
                        }
                        ChangeImageSize(imgSource);

                        addEvent(document.getElementById("img" + i), "click",
                            showLeftPic);
                        addEvent(slideShowPid, "mouseover", changeMouseOverCss);
                        addEvent(slideShowPid, "mouseout", changeMouseOutCss);
                    }
                    if (i == currentPicTotal) {
                        currentPic = j;
                        document.getElementById("ss_img_par").firstChild.setAttribute("src", pathList[currentPic]);
                        document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("ss_img");
                        imgSource.width = 450;
                        imgSource.height = 450;
                        imgSource.adjustWidth = picWidths[j];
                        imgSource.adjustHeight = picHeights[j];
                        if ((typeof (picHWs[j]) == "undefined") || (picHWs[j] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[j];
                        }
                        ChangeImageSize(imgSource);

                        document.getElementById("mytitleLink").innerHTML = picTitle[j];
                        if(isShowComment)
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[j] + " | 人气(" + picTime[j] + ")";
                        }
                        else
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[j] ;
                        }
                        if(picFromType[currentPic] == "0"){
                            document.getElementById("mypage").innerHTML = (i + 1) + " / " + loadPicTotalNum;
                        } else if(picFromType[currentPic] == "1"){
                            document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (i + 1) + " / " + loadPicTotalNum;
                        }
                        document.getElementById("picMs").innerText = picStrContent[j] == "null" ? "" : picStrContent[j];
                    }
                    position++;
                }

            }
        }
        ;

        //*****************************************************************************************************/
        // ajax处理部分 结束
        //*****************************************************************************************************/

        //**************************************************************************************/
        //以下是响应事件的方法          开始
        //*************************************************************************************/
        //改变窗口滚动时的位置
        function changeWindowScrollSize() {
            pageWidth = getPageSize().pageWidth;
            pageHeight = getPageSize().pageHeight;
            winWidth = getPageSize().winWidth;
            winHeight = getPageSize().winHeight;

            scrollX = getPageScroll().x;
            scrollY = getPageScroll().y;

            var bgObject = document.getElementById("bgDiv");
            bgObject.style.width = pageWidth + "px";
            bgObject.style.height = pageHeight + "px";

            var imgPlayerObject = document.getElementById("imgPlayerDiv");
            imgPlayerObject.style.top = (winHeight - parseInt(imgPlayerObject.style.height)) / 2 + scrollY + "px";
            imgPlayerObject.style.left = (winWidth - parseInt(imgPlayerObject.style.width)) / 2 + scrollX + "px";

        }
        ;

        //窗口大小改变时调用的方法
        function changeWindowSize() {
            pageWidth = getPageSize().pageWidth;
            pageHeight = getPageSize().pageHeight;
            winWidth = getPageSize().winWidth;
            winHeight = getPageSize().winHeight;

            var bgObject = document.getElementById("bgDiv");
            var imgPlayerObject = document.getElementById("imgPlayerDiv");

            bgObject.style.width = pageWidth + "px";
            bgObject.style.height = pageHeight + "px";

            imgPlayerObject.style.top = (winHeight - parseInt(imgPlayerObject.style.height)) / 2 + "px";
            imgPlayerObject.style.left = (winWidth - parseInt(imgPlayerObject.style.width)) / 2 + "px";
        }
        ;

        //改变下拉列表框的事件
        function changeAlbum() {
            var oldAlbumListId = albumListId;
            albumListId = document.getElementById("albumlistsel").selectedIndex;
            columnId = document.getElementById("albumlistsel").options[albumListId].value;
            //调用Ajax的方法，获取相册集对应的图片集合(/album.slt?action=getSlideShowArray&classId=0)
            ///schoolxp/diyschool/album.slt?clusterId=<%=albumId %>&playId=<%=pic.getId()%>&type=1  projectPath
            var oldClusterId = actionUrl.substring(actionUrl.indexOf("=")+1,actionUrl.indexOf("&"));
            var newActionUrl = actionUrl.replace(oldClusterId,columnId);
            getPicListByAlbumList(newActionUrl);
        }
        ;

        //改变滑动图片框的样式
        function changeMouseOverCss(event) {

            //ie下有window.event对象，而火狐中是没有的，必须在方法中传一个event对象
            var event = event || window.event;
            //event对象下ie有srcElement属性，火狐下是target属性
            var obj = event.srcElement ? event.srcElement : event.target;

            for ( var i = 0; i < 5; i++) {
                var slideShowPid = document.getElementById(strSlidePosition + i);
                if (slideShowPid.firstChild) {
                    slideShowPid.firstChild.className = "pic_boder2";
                }
            }

            //防止单元格的样式变为“pic_boder3”
            if (obj.tagName.toLowerCase() == "img") {
                obj.className = "pic_boder3";
            }
        }
        ;

        function changeMouseOutCss(event) {

            //ie下有window.event对象，而火狐中是没有的，必须在方法中传一个event对象
            var event = event || window.event;
            //event对象下ie有srcElement属性，火狐下是target属性
            var obj = event.srcElement ? event.srcElement : event.target;

            for ( var i = 0; i < 5; i++) {
                var slideShowPid = document.getElementById(strSlidePosition + i);
                if (slideShowPid.firstChild) {
                    slideShowPid.firstChild.className = "pic_boder2";
                }
            }

            //防止单元格的样式变为“pic_boder2”
            if (obj.tagName.toLowerCase() == "img") {
                obj.className = "pic_boder2";
            }
        }
        ;

        //点击右边图片，在左边显示对应的图片
        function showLeftPic(event) {
            //ie下有window.event对象，而火狐中是没有的，必须在方法中传一个event对象
            var event = event || window.event;
            //event对象下ie有srcElement属性，火狐下是target属性
            var obj = event.srcElement ? event.srcElement : event.target;
            var picId = obj.id.substring(3);

            currentPic = Number(picId) - oldShowFront;
            currentPicTotal = Number(picId);
            document.getElementById("ss_img_par").firstChild.setAttribute("src", pathList[currentPic]);
            document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

            //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
            //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
            var imgSource = document.getElementById("ss_img");
            imgSource.width = 450;
            imgSource.height = 450;
            imgSource.adjustWidth = picWidths[currentPic];
            imgSource.adjustHeight = picHeights[currentPic];
            if ((typeof (picHWs[currentPic]) == "undefined") || (picHWs[currentPic] == null)) {
                imgSource.adjustHW = 0;
            } else {
                imgSource.adjustHW = picHWs[currentPic];
            }

            ChangeImageSize(imgSource);

            document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
            if(isShowComment)
            {
                document.getElementById("myuptime").innerHTML = "上传时间："
                    + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
            }
            else
            {
                document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[currentPic] ;
            }
            if(picFromType[currentPic] == "0"){
                document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                    + " / " + loadPicTotalNum;
            } else if(picFromType[currentPic] == "1"){
                document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                    + " / " + loadPicTotalNum;
            }
            document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
        }
        ;

        //自动播放图片
        function autoPlayBtn() {

            //btn_stop.gif images/btn_play.gif substring
            //按钮背景图片的切换

            var imgSrc = document.getElementById("autoPlayBtn").src
                .substring(Number(document.getElementById("autoPlayBtn").src.lastIndexOf("/")) + 1);
            if (imgSrc == "btn_play4.gif") {

                var n;
                if (imgQueue.showRear - loadPicTotalNum < 5
                    && imgQueue.showRear - loadPicTotalNum > 0) {
                    n = loadPicTotalNum - imgQueue.showFront;
                } else {
                    n = 5;
                }

                //删除按钮中的点击事件
                for ( var i = 0; i < n; i++) {
                    var slideShowPid = document.getElementById(strSlidePosition
                        + i);
                }
                document.getElementById("autoPlayBtn").src = pauseBtnPic;
                startIntervalTimer();
            } else if (imgSrc == "btn_stop.gif") {

                var n;
                if (imgQueue.showRear - loadPicTotalNum > 0
                    && imgQueue.showRear - loadPicTotalNum < 5) {
                    n = loadPicTotalNum - imgQueue.showFront;
                } else {
                    n = 5;
                }

                //添加按钮中的点击事件
                for ( var i = 0; i < n; i++) {
                    var slideShowPid = document.getElementById(strSlidePosition
                        + i);
                }

                document.getElementById("autoPlayBtn").src = startBtnPic;
                destroyIntervalTimer();
            }

        }
        ;

        //上一张按钮点击事件
        function previousBtn() {
            imgQueue.direction = "up";
            if (currentPicTotal == imgQueue.front
                && imgQueue.showFront == imgQueue.front) {
                alert("已经是第一张了！");
            } else if (currentPic == 0 && currentPicTotal != 0 && isLoadPic) {
                getPicListByAlbumList(ajaxMainPath + "?clusterId=" + columnId
                    + "&playId=" + picIds[currentPic] + "&type=3");
            } else if (imgQueue.showFront == currentPicTotal)//到上一组图片
            {
                imgQueue.slidePic();
                var position = 0;

                for ( var i = imgQueue.showFront; i < imgQueue.showRear; i++) {
                    var j = i - oldShowFront;
                    var slideShowPid = document.getElementById(strSlidePosition
                        + position);
                    slideShowPid.innerHTML = "<img src='" + imgQueue.slideQueue[j]
                        + " ' width='90' height='75' id='img" + i + "'/>";
                    addEvent(document.getElementById("img" + i), "click", showLeftPic);
                    //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                    //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                    var imgSource = document.getElementById("img" + i);
                    imgSource.adjustWidth = picWidths[j];
                    imgSource.adjustHeight = picHeights[j];
                    if ((typeof (picHWs[j]) == "undefined") || (picHWs[j] == null)) {
                        imgSource.adjustHW = 0;
                    } else {
                        imgSource.adjustHW = picHWs[j];
                    }
                    ChangeImageSize(imgSource);

                    if (position == 4) {
                        document.getElementById("img" + i).className = "pic_boder3";

                        currentPic = j;
                        currentPicTotal = i;

                        document.getElementById("ss_img_par").firstChild.setAttribute("src", pathList[currentPic]);
                        document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("ss_img");
                        imgSource.width = 450;
                        imgSource.height = 450;
                        imgSource.adjustWidth = picWidths[currentPic];
                        imgSource.adjustHeight = picHeights[currentPic];
                        if ((typeof (picHWs[currentPic]) == "undefined") || (picHWs[currentPic] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[currentPic];
                        }
                        ChangeImageSize(imgSource);

                        document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                        if(isShowComment)
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                        }
                        else
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] ;
                        }
                        if(picFromType[currentPic] == "0"){
                            document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        } else if(picFromType[currentPic] == "1"){
                            document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"'>onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        }
                        document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
                    }
                    position++;
                }

            } else {//上一张图片
                document.getElementById("img" + (currentPicTotal)).className = "pic_boder2";
                document.getElementById("img" + (currentPicTotal - 1)).className = "pic_boder3";

                currentPic = currentPic - 1;
                currentPicTotal = currentPicTotal - 1;

                document.getElementById("ss_img_par").firstChild.setAttribute(
                    "src", pathList[currentPic]);
                document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                var imgSource = document.getElementById("ss_img");
                imgSource.width = 450;
                imgSource.height = 450;
                imgSource.adjustWidth = picWidths[currentPic];
                imgSource.adjustHeight = picHeights[currentPic];
                if ((typeof (picHWs[currentPic]) == "undefined")
                    || (picHWs[currentPic] == null)) {
                    imgSource.adjustHW = 0;
                } else {
                    imgSource.adjustHW = picHWs[currentPic];
                }
                ChangeImageSize(imgSource);

                document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                if(isShowComment)
                {
                    document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                }
                else
                {
                    document.getElementById("myuptime").innerHTML = "上传时间：" + picDate[currentPic] ;
                }
                if(picFromType[currentPic] == "0"){
                    document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                        + " / " + loadPicTotalNum;
                } else if(picFromType[currentPic] == "1"){
                    document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                        + " / " + loadPicTotalNum;
                }
                document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
            }
        }
        ;

        //上一组按钮的点击事件
        function previousGroupBtn() {
            imgQueue.direction = "up";
            if (imgQueue.showFront == imgQueue.front) {
                alert("已经是第一组了！");
            } else if (currentPic <= 4 && isLoadPic) {
                getPicListByAlbumList(ajaxMainPath + "?clusterId=" + columnId
                    + "&playId=" + picIds[currentPic] + "&type=5");
            } else//到上一组图片
            {
                imgQueue.slidePic();
                var position = 0;

                for ( var i = imgQueue.showFront; i < imgQueue.showRear; i++) {
                    var j = i - oldShowFront;
                    var slideShowPid = document.getElementById(strSlidePosition
                        + position);
                    slideShowPid.innerHTML = "<img src='"
                        + imgQueue.slideQueue[j]
                        + " ' width='90' height='75' id='img" + i + "'/>";
                    addEvent(document.getElementById("img" + i), "click",
                        showLeftPic);
                    //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                    //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                    var imgSource = document.getElementById("img" + i);
                    imgSource.adjustWidth = picWidths[j];
                    imgSource.adjustHeight = picHeights[j];
                    if ((typeof (picHWs[j]) == "undefined")
                        || (picHWs[j] == null)) {
                        imgSource.adjustHW = 0;
                    } else {
                        imgSource.adjustHW = picHWs[j];
                    }
                    ChangeImageSize(imgSource);

                    if (position == 0) {
                        document.getElementById("img" + i).className = "pic_boder3";

                        currentPic = j;
                        currentPicTotal = i;

                        document.getElementById("ss_img_par").firstChild
                            .setAttribute("src", pathList[currentPic]);
                        document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("ss_img");
                        imgSource.width = 450;
                        imgSource.height = 450;
                        imgSource.adjustWidth = picWidths[currentPic];
                        imgSource.adjustHeight = picHeights[currentPic];
                        if ((typeof (picHWs[currentPic]) == "undefined")
                            || (picHWs[currentPic] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[currentPic];
                        }
                        ChangeImageSize(imgSource);

                        document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                        if(isShowComment)
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                        }
                        else
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] ;
                        }
                        if(picFromType[currentPic] == "0"){
                            document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        } else if(picFromType[currentPic] == "1"){
                            document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        }
                        document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
                    }
                    position++;
                }

            }
        }
        ;

        //下一张按钮点击事件
        function nextBtn() {
            imgQueue.direction = "down";
            if (loadPicTotalNum == (currentPicTotal + 1)) {
                alert("已经是最后一张了！");
                if ((typeof (intervalTimer) != "undefined")
                    && (intervalTimer != null)) {
                    autoPlayBtn();
                }
            } else if (picTotalNum == (currentPic + 1) && isLoadPic) {
                getPicListByAlbumList(ajaxMainPath + "?clusterId=" + columnId
                    + "&playId=" + picIds[currentPic] + "&type=2");
            } else if (imgQueue.showRear == (currentPicTotal + 1))//到下一组图片
            {
                imgQueue.slidePic();
                var position = 0;

                for ( var i = imgQueue.showFront; i < imgQueue.showRear; i++) {
                    var j = i - oldShowFront;
                    //总的图片不是5的整数倍
                    if (imgQueue.showRear - loadPicTotalNum > 0) {
                        if (i >= loadPicTotalNum) {
                            document
                                .getElementById(strSlidePosition + position)
                                .removeChild(
                                document
                                    .getElementById(strSlidePosition
                                        + position).firstChild);
                            position++;
                            continue;
                        }

                        var slideShowPid = document
                            .getElementById(strSlidePosition + position);
                        slideShowPid.innerHTML = "<img src='"
                            + imgQueue.slideQueue[j]
                            + " ' width='90' height='75' id='img" + i
                            + "'/>";
                        addEvent(document.getElementById("img" + i), "click",
                            showLeftPic);
                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("img" + i);
                        imgSource.adjustWidth = picWidths[j];
                        imgSource.adjustHeight = picHeights[j];
                        if ((typeof (picHWs[j]) == "undefined")
                            || (picHWs[j] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[j];
                        }
                        ChangeImageSize(imgSource);

                        if (position == 0) {
                            document.getElementById("img" + i).className = "pic_boder3";

                            currentPic = j;
                            currentPicTotal = i;

                            document.getElementById("ss_img_par").firstChild
                                .setAttribute("src", pathList[j]);
                            document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                            //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                            //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                            var imgSource = document.getElementById("ss_img");
                            imgSource.width = 450;
                            imgSource.height = 450;
                            imgSource.adjustWidth = picWidths[j];
                            imgSource.adjustHeight = picHeights[j];
                            if ((typeof (picHWs[j]) == "undefined")
                                || (picHWs[j] == null)) {
                                imgSource.adjustHW = 0;
                            } else {
                                imgSource.adjustHW = picHWs[j];
                            }
                            ChangeImageSize(imgSource);

                            document.getElementById("mytitleLink").innerHTML = picTitle[j];
                            if(isShowComment)
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间："
                                    + picDate[j] + " | 人气(" + picTime[j] + ")";
                            }
                            else
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间："
                                    + picDate[j] ;
                            }
                            if(picFromType[currentPic] == "0"){
                                document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                    + " / " + loadPicTotalNum;
                            } else if(picFromType[currentPic] == "1"){
                                document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                    + " / " + loadPicTotalNum;
                            }
                            document.getElementById("picMs").innerText = picStrContent[j] == "null" ? "" : picStrContent[j];
                        }
                        position++;
                        continue;
                    }

                    var slideShowPid = document.getElementById(strSlidePosition
                        + position);
                    slideShowPid.innerHTML = "<img src='"
                        + imgQueue.slideQueue[j]
                        + " ' width='90' height='75' id='img" + i + "'/>";
                    addEvent(document.getElementById("img" + i), "click",
                        showLeftPic);
                    //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                    //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                    var imgSource = document.getElementById("img" + i);
                    imgSource.adjustWidth = picWidths[j];
                    imgSource.adjustHeight = picHeights[j];
                    if ((typeof (picHWs[j]) == "undefined")
                        || (picHWs[j] == null)) {
                        imgSource.adjustHW = 0;
                    } else {
                        imgSource.adjustHW = picHWs[j];
                    }
                    ChangeImageSize(imgSource);

                    if (position == 0) {
                        document.getElementById("img" + i).className = "pic_boder3";

                        currentPic = j;
                        currentPicTotal = i;

                        document.getElementById("ss_img_par").firstChild
                            .setAttribute("src", pathList[currentPic]);
                        document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("ss_img");
                        imgSource.width = 450;
                        imgSource.height = 450;
                        imgSource.adjustWidth = picWidths[currentPic];
                        imgSource.adjustHeight = picHeights[currentPic];
                        if ((typeof (picHWs[currentPic]) == "undefined")
                            || (picHWs[currentPic] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[currentPic];
                        }
                        ChangeImageSize(imgSource);
                        document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                        if(isShowComment)
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                        }
                        else
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] ;
                        }
                        if(picFromType[currentPic] == "0"){
                            document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        } else if(picFromType[currentPic] == "1"){
                            document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        }
                        document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
                    }
                    position++;
                }

            } else {//下一张图片
                document.getElementById("img" + (currentPicTotal)).className = "pic_boder2";
                document.getElementById("img" + (currentPicTotal + 1)).className = "pic_boder3";
                currentPic = currentPic + 1;
                currentPicTotal = currentPicTotal + 1;

                document.getElementById("ss_img_par").firstChild.setAttribute(
                    "src", pathList[currentPic]);
                document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                var imgSource = document.getElementById("ss_img");
                imgSource.width = 450;
                imgSource.height = 450;
                imgSource.adjustWidth = picWidths[currentPic];
                imgSource.adjustHeight = picHeights[currentPic];
                if ((typeof (picHWs[currentPic]) == "undefined")
                    || (picHWs[currentPic] == null)) {
                    imgSource.adjustHW = 0;
                } else {
                    imgSource.adjustHW = picHWs[currentPic];
                }
                ChangeImageSize(imgSource);

                document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                if(isShowComment)
                {
                    document.getElementById("myuptime").innerHTML = "上传时间："
                        + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                }
                else
                {
                    document.getElementById("myuptime").innerHTML = "上传时间："
                        + picDate[currentPic] ;
                }
                if(picFromType[currentPic] == "0"){
                    document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                        + " / " + loadPicTotalNum;
                } else if(picFromType[currentPic] == "1"){
                    document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                        + " / " + loadPicTotalNum;
                }

                document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];

            }

        }
        ;

        //下一组按钮点击事件
        function nextGroupBtn() {
            //loadPicTotalNum == (currentPicTotal + 1) picTotalNum == (currentPic + 1)
            imgQueue.direction = "down";

            if (imgQueue.showRear == loadPicTotalNum
                || imgQueue.showRear > loadPicTotalNum) {
                alert("已经是最后一组了！");
            } else if (imgQueue.showRear == (picTotalNum + oldShowFront)
                && isLoadPic) {
                getPicListByAlbumList(ajaxMainPath + "?clusterId=" + columnId
                    + "&playId=" + picIds[currentPic] + "&type=4");
            } else//到下一组图片
            {
                imgQueue.slidePic();
                var position = 0;

                for ( var i = imgQueue.showFront; i < imgQueue.showRear; i++) {
                    var j = i - oldShowFront;
                    //总的图片不是5的整数倍
                    if (imgQueue.showRear - loadPicTotalNum > 0) {
                        if (i >= loadPicTotalNum) {
                            document
                                .getElementById(strSlidePosition + position)
                                .removeChild(
                                document
                                    .getElementById(strSlidePosition
                                        + position).firstChild);
                            position++;
                            continue;
                        }

                        var slideShowPid = document
                            .getElementById(strSlidePosition + position);
                        slideShowPid.innerHTML = "<img src='"
                            + imgQueue.slideQueue[j]
                            + " ' width='90' height='75' id='img" + i
                            + "'/>";
                        addEvent(document.getElementById("img" + i), "click",
                            showLeftPic);
                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("img" + i);
                        imgSource.adjustWidth = picWidths[j];
                        imgSource.adjustHeight = picHeights[j];
                        if ((typeof (picHWs[j]) == "undefined")
                            || (picHWs[j] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[j];
                        }
                        ChangeImageSize(imgSource);

                        if (position == 0) {
                            document.getElementById("img" + i).className = "pic_boder3";

                            currentPic = j;
                            currentPicTotal = i;

                            document.getElementById("ss_img_par").firstChild
                                .setAttribute("src", pathList[j]);
                            document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                            //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                            //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                            var imgSource = document.getElementById("ss_img");
                            imgSource.width = 450;
                            imgSource.height = 450;
                            imgSource.adjustWidth = picWidths[j];
                            imgSource.adjustHeight = picHeights[j];
                            if ((typeof (picHWs[j]) == "undefined")
                                || (picHWs[j] == null)) {
                                imgSource.adjustHW = 0;
                            } else {
                                imgSource.adjustHW = picHWs[j];
                            }
                            ChangeImageSize(imgSource);

                            document.getElementById("mytitleLink").innerHTML = picTitle[j];
                            if(isShowComment)
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间："
                                    + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                            }
                            else
                            {
                                document.getElementById("myuptime").innerHTML = "上传时间："
                                    + picDate[currentPic] ;
                            }
                            if(picFromType[currentPic] == "0"){
                                document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                    + " / " + loadPicTotalNum;
                            } else if(picFromType[currentPic] == "1"){
                                document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                    + " / " + loadPicTotalNum;
                            }
                            document.getElementById("picMs").innerText = picStrContent[j] == "null" ? "" : picStrContent[j];
                        }
                        position++;
                        continue;
                    }

                    var slideShowPid = document.getElementById(strSlidePosition
                        + position);
                    slideShowPid.innerHTML = "<img src='"
                        + imgQueue.slideQueue[j]
                        + " ' width='90' height='75' id='img" + i + "'/>";
                    addEvent(document.getElementById("img" + i), "click",
                        showLeftPic);
                    //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                    //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                    var imgSource = document.getElementById("img" + i);
                    imgSource.adjustWidth = picWidths[j];
                    imgSource.adjustHeight = picHeights[j];
                    if ((typeof (picHWs[j]) == "undefined")
                        || (picHWs[j] == null)) {
                        imgSource.adjustHW = 0;
                    } else {
                        imgSource.adjustHW = picHWs[j];
                    }
                    ChangeImageSize(imgSource);

                    if (position == 0) {
                        document.getElementById("img" + i).className = "pic_boder3";

                        currentPic = j;
                        currentPicTotal = i;

                        document.getElementById("ss_img_par").firstChild
                            .setAttribute("src", pathList[currentPic]);
                        document.getElementById("ss_img_par").firstChild.title = picStrContentAll[currentPic] == "null" ? "" : picStrContentAll[currentPic];

                        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
                        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
                        var imgSource = document.getElementById("ss_img");
                        imgSource.width = 450;
                        imgSource.height = 450;
                        imgSource.adjustWidth = picWidths[currentPic];
                        imgSource.adjustHeight = picHeights[currentPic];
                        if ((typeof (picHWs[currentPic]) == "undefined")
                            || (picHWs[currentPic] == null)) {
                            imgSource.adjustHW = 0;
                        } else {
                            imgSource.adjustHW = picHWs[currentPic];
                        }
                        ChangeImageSize(imgSource);
                        //currentPicTotal = currentPicTotal + 1;
                        document.getElementById("mytitleLink").innerHTML = picTitle[currentPic];
                        if(isShowComment)
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] + " | 人气(" + picTime[currentPic] + ")";
                        }
                        else
                        {
                            document.getElementById("myuptime").innerHTML = "上传时间："
                                + picDate[currentPic] ;
                        }
                        if(picFromType[currentPic] == "0"){
                            document.getElementById("mypage").innerHTML = (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        } else if(picFromType[currentPic] == "1"){
                            document.getElementById("mypage").innerHTML = "<a class='hdiv' id='hdiv' style='display:none' onMouseout='hideDIV(\"hdiv\")' href='http://vip.520wawa.com/chatInput/explain.html' target='_blank'></a><img class='wechat' src='" + wechatPic +"' onMouseover='showDIV(\"hdiv\")'>" + (currentPicTotal + 1)
                                + " / " + loadPicTotalNum;
                        }
                        document.getElementById("picMs").innerText = picStrContent[currentPic] == "null" ? "" : picStrContent[currentPic];
                    }
                    position++;
                }

            }
        }
        ;

        //关闭播放器窗口
        function closePlayWindow() {
            if(outerObject != null){ outerObject.hide(); }
            document.getElementById("bgDiv").style.display = "none";
            document.getElementById("imgPlayerDiv").style.display = "none";
        }
        ;

        //点击左边图片时，显示大图
        function showBigPic() {
            window.open(pathList[currentPic]);
        }
        ;

        function divFocus()
        {
            document.getElementById("picMs").style.border = "solid 1px #CCC";
        };
        function divBlur()
        {
            document.getElementById("picMs").style.border = "";
        };

        //**************************************************************************************/
        //按钮事件          结束
        //*************************************************************************************/

        //**************************************************************************************/
        //公用方法         开始
        //*************************************************************************************/

        //判断有没有下一个相册或者上一个相册(暂时不考虑)
        function isPreviousOrNextAlbum(cId)
        {
            var p = false;//默认没有上一个相册
            var n = false;//默认没有下一个相册
            var currentAlbumIndex;//当前相册在相册集合中的下标

            //找到当前相册在相册集合中的位置
            for(var i = 0; i < amListId.length; i++)
            {
                if(amListId[i] == cId)
                {
                    currentAlbumIndex = i;
                }
            }

            //判断有没有上一个相册
            if(currentAlbumIndex - 1 >= 0)
            {
                p = true;
            }
            else
            {
                p = false;
            }

            //判断有没有下一个相册
            if(currentAlbumIndex + 1 <= amListId.length - 1)
            {
                n = true;
            }
            else
            {
                n = false;
            }

            return {
                p : p,
                n : n
            };
        };

        //**************************************************/
        // getPageScroll() - returns the x,y page scroll value
        //**************************************************/
        function getPageScroll() {
            var x, y;
            if (window.pageYOffset) {
                // all except IE
                y = window.pageYOffset;
                x = window.pageXOffset;
            } else if (document.documentElement
                && document.documentElement.scrollTop) {
                // Explorer 6 Strict
                y = document.documentElement.scrollTop;
                x = document.documentElement.scrollLeft;
            } else if (document.body) {
                // all other Explorers
                y = document.body.scrollTop;
                x = document.body.scrollLeft;
            }
            return {
                x : x,
                y : y
            };
        }
        ;

        //*******************************************************************************/
        // getPageSize() - Returns array with page width, height and window width, height
        // Core code from - quirksmode.org, Edit for Firefox by pHaez
        //*******************************************************************************/
        function getPageSize() {

            var scrW, scrH;
            if (window.innerHeight && window.scrollMaxY) {
                // Mozilla
                scrW = window.innerWidth + window.scrollMaxX;
                scrH = window.innerHeight + window.scrollMaxY;
            } else if ((document.body.scrollHeight > document.body.offsetHeight)
                || (document.body.scrollWidth > document.body.offsetWidth)) {
                // all but IE Mac
                scrW = document.body.scrollWidth;
                scrH = document.body.scrollHeight;
            } else if (document.body) {
                // IE Mac
                scrW = document.body.offsetWidth;
                scrH = document.body.offsetHeight;
            }

            var winW, winH;
            if (window.innerHeight) {
                // all except IE
                winW = window.innerWidth;
                winH = window.innerHeight;
            } else if (document.documentElement
                && document.documentElement.clientHeight) {
                // IE 6 Strict Mode
                winW = document.documentElement.clientWidth;
                winH = document.documentElement.clientHeight;
            } else if (document.body) {
                // other
                winW = document.body.clientWidth;
                winH = document.body.clientHeight;
            }

            // for small pages with total size less then the viewport
            var pageW = (scrW < winW) ? winW : scrW;
            var pageH = (scrH < winH) ? winH : scrH;
            return {
                pageWidth : pageW,
                pageHeight : pageH,
                winWidth : winW,
                winHeight : winH
            };
        }
        ;

        //获取缩略图
        function getBreImg(path) {
            if (path != 'undefined' && path != '') {
                var i = path.lastIndexOf(".");
                if (i > 0) {
                    return path.substring(0, i)
                        + path.substring(i).replace(".", "_BRE.");
                }
            }
            return rightPicNull;
        }
        ;

        //调整图片的大小（参数imgSource，必须要有属性adjustWidth--原始宽度，adjustHeight--原始高度，
        //						adjustHW--只为保持向前兼容，可省略。图片原始高度/图片原始宽度）
        function ChangeImageSize(imgSource) {
            var w;
            var h;
            if ((imgSource.adjustWidth > 0) && (imgSource.adjustHeight > 0)) {
                if (imgSource.adjustHeight < imgSource.height) {

                    if (imgSource.adjustWidth < imgSource.width) {
                        imgSource.width = imgSource.adjustWidth;
                        imgSource.height = imgSource.adjustHeight;

                    } else {
                        h = imgSource.adjustHeight
                            * (imgSource.width / imgSource.adjustWidth);
                        imgSource.height = h;
                    }
                } else if (imgSource.adjustWidth < imgSource.width) {
                    w = imgSource.adjustWidth
                        * (imgSource.height / imgSource.adjustHeight);
                    imgSource.width = w;
                } else {
                    w = imgSource.width / imgSource.adjustWidth;
                    h = imgSource.height / imgSource.adjustHeight;
                    if (w < h) {
                        w = imgSource.adjustHeight * w;
                        imgSource.height = w;
                    } else {
                        h = imgSource.adjustWidth * h;
                        imgSource.width = h;
                    }
                }
            } else if (imgSource.adjustHW > 0) { // hw = height / width;
                if (imgSource.adjustHW > imgSource.height / imgSource.width) {
                    w = imgSource.height / imgSource.adjustHW;
                    imgSource.width = w;
                } else {
                    h = imgSource.width * imgSource.adjustHW;
                    imgSource.height = h;
                }
            }

        }
        ;

        //点击出现弹出层
        function commentlist(){

            var imgPlayerObject = document.getElementById("imgPlayerDiv");
            var imLeft = parseInt(imgPlayerObject.style.left);

            outerObject.set_zIndex(5000);
            outerObject.showWindow('/schoolxp/services/classShow/circleAlbum.do?action=getNewCommentList&type=1&mainId=' + picIds[currentPic], true, imLeft, 'center',725, 570, '查看和发表评论');
        }

        //界面的初始化
        function uiInit() {
            pageWidth = getPageSize().pageWidth;
            pageHeight = getPageSize().pageHeight;
            winWidth = getPageSize().winWidth;
            winHeight = getPageSize().winHeight;
            scrollY = getPageScroll().y;
            scrollX = getPageScroll().x;

            var bgObject = document.createElement("div");
            bgObject.setAttribute("id", "bgDiv");
            //添加style属性，IE下用setAttribute()方法是有问题的，设置的Style属性无效。
            bgObject.style.position = "absolute";
            bgObject.style.backgroundColor = "#000000";
            //滤镜IE下只能用下面的方式写才能有效。
            bgObject.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity = 30)";
            bgObject.style.opacity = "0.3";
            bgObject.style.zIndex = "1000";//设置层次
            bgObject.style.top = "0px";
            bgObject.style.left = "0px";
            bgObject.style.width = pageWidth + "px";
            bgObject.style.height = pageHeight + "px";
            document.body.appendChild(bgObject);

            var imgPlayerObject = document.createElement("div");
            imgPlayerObject.setAttribute("id", "imgPlayerDiv");
            imgPlayerObject.setAttribute("name", "imgPlayerDiv");
            imgPlayerObject.setAttribute("align", "center");

            imgPlayerObject.style.position = "absolute";
            imgPlayerObject.style.width = "970px";
            imgPlayerObject.style.height = "600px";
            imgPlayerObject.style.zIndex = "4000";

            imgPlayerObject.style.top = (winHeight - parseInt(imgPlayerObject.style.height)) / 2 + scrollY + "px";
            imgPlayerObject.style.left = (winWidth - parseInt(imgPlayerObject.style.width)) / 2 + scrollX + "px";
            document.body.appendChild(imgPlayerObject);

            var albumDivObject = document.createElement("div");
            albumDivObject.setAttribute("id", "album");
            imgPlayerObject.appendChild(albumDivObject);

            var leftDivObject = document.createElement("div");
            leftDivObject.setAttribute("id", "imp_left");
            albumDivObject.appendChild(leftDivObject);

            /* -------------------------------------------blank--div------start------------------------------------------- */
            var blankObject = document.createElement("div");
            blankObject.setAttribute("id", "imp_blank");
            leftDivObject.appendChild(blankObject);

            var btnRightObject = document.createElement("div");
            btnRightObject.setAttribute("id", "imp_btn_right");
            blankObject.appendChild(btnRightObject);

            var btnRightSpanObject = document.createElement("span");
            btnRightObject.appendChild(btnRightSpanObject);

            var btnRightAObject = document.createElement("a");
            btnRightAObject.setAttribute("href", "#");
            btnRightAObject.setAttribute("title", "下一张");
            btnRightSpanObject.appendChild(btnRightAObject);

            var btnRightImgObject = document.createElement("img");
            btnRightImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_right.gif");
            btnRightImgObject.setAttribute("border", "0");
            btnRightImgObject.setAttribute("id", "nextBtn");
            btnRightAObject.appendChild(btnRightImgObject);

            var btnLeftObject = document.createElement("div");
            btnLeftObject.setAttribute("id", "imp_btn_left");
            blankObject.appendChild(btnLeftObject);

            var btnLeftSpanObject = document.createElement("span");
            btnLeftObject.appendChild(btnLeftSpanObject);

            var btnLeftAObject = document.createElement("a");
            btnLeftAObject.setAttribute("href", "#");
            btnLeftAObject.setAttribute("title", "上一张");
            btnLeftSpanObject.appendChild(btnLeftAObject);

            var btnLeftImgObject = document.createElement("img");
            btnLeftImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_left.gif");
            btnLeftImgObject.setAttribute("border", "0");
            btnLeftImgObject.setAttribute("id", "previousBtn");
            btnLeftAObject.appendChild(btnLeftImgObject);

            var btnUpObject = document.createElement("div");
            btnUpObject.setAttribute("id", "imp_btn_up");
            blankObject.appendChild(btnUpObject);

            var btnUpSpanObject = document.createElement("span");
            btnUpObject.appendChild(btnUpSpanObject);

            var btnUpAObject = document.createElement("a");
            btnUpAObject.setAttribute("href", "#");
            btnUpAObject.setAttribute("title", "上一组");
            btnUpSpanObject.appendChild(btnUpAObject);

            var btnUpImgObject = document.createElement("img");
            btnUpImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_up.gif");
            btnUpImgObject.setAttribute("border", "0");
            btnUpImgObject.setAttribute("id", "previousGroupBtn");
            btnUpAObject.appendChild(btnUpImgObject);

            var btnDownObject = document.createElement("div");
            btnDownObject.setAttribute("id", "imp_btn_down");
            blankObject.appendChild(btnDownObject);

            var btnDownSpanObject = document.createElement("span");
            btnDownObject.appendChild(btnDownSpanObject);

            var btnDownAObject = document.createElement("a");
            btnDownAObject.setAttribute("href", "#");
            btnDownAObject.setAttribute("title", "下一组");
            btnDownSpanObject.appendChild(btnDownAObject);

            var btnDownImgObject = document.createElement("img");
            btnDownImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_down.gif");
            btnDownImgObject.setAttribute("border", "0");
            btnDownImgObject.setAttribute("id", "nextGroupBtn");
            btnDownAObject.appendChild(btnDownImgObject);

            var pageObject = document.createElement("div");
            pageObject.setAttribute("id", "imp_page");
            blankObject.appendChild(pageObject);

            var pageSelectObject = document.createElement("select");
            pageSelectObject.setAttribute("id", "albumlistsel");
            pageSelectObject.setAttribute("size", "1");
            pageObject.appendChild(pageSelectObject);

            var btnCloseObject = document.createElement("div");
            btnCloseObject.setAttribute("id", "imp_btn_close");
            blankObject.appendChild(btnCloseObject);

            var btnCloseImgObject = document.createElement("img");
            btnCloseImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_close2.gif");
            btnCloseImgObject.setAttribute("id", "closeWindowBtn");
            //ie下这种方式设置style属性无效
            //btnCloseImgObject.setAttribute("style","cursor:pointer");
            btnCloseImgObject.style.cursor = "pointer";
            btnCloseObject.appendChild(btnCloseImgObject);

            var photoShowObject = document.createElement("div");
            photoShowObject.setAttribute("id", "imp_photo_show");
            blankObject.appendChild(photoShowObject);

            var btnPhotoShowTableObject = document.createElement("table");
            btnPhotoShowTableObject.setAttribute("width", "100%");
            btnPhotoShowTableObject.setAttribute("border", "0");
            btnPhotoShowTableObject.setAttribute("cellspacing", "0");
            btnPhotoShowTableObject.setAttribute("align", "center");
            photoShowObject.appendChild(btnPhotoShowTableObject);

            var btnPhotoShowTableTbodyObject = document.createElement("tbody");
            btnPhotoShowTableObject.appendChild(btnPhotoShowTableTbodyObject);

            for ( var i = 0; i < 5; i++) {
                var btnPhotoShowTableTrObject = document.createElement("tr");
                btnPhotoShowTableTbodyObject
                    .appendChild(btnPhotoShowTableTrObject);

                var btnPhotoShowTableTdObject = document.createElement("td");
                btnPhotoShowTableTdObject.setAttribute("id", "slide_window_"
                    + i);
                btnPhotoShowTableTdObject.setAttribute("align", "center");
                btnPhotoShowTableTrObject
                    .appendChild(btnPhotoShowTableTdObject);
            }
            /* --------------------------------------blank--div--end---------------------------------------------------- */

            /* --------------------------------------top--div--start---------------------------------------------------- */
            var topObject = document.createElement("div");
            topObject.setAttribute("id", "imp_top");
            leftDivObject.appendChild(topObject);

            var titleObject = document.createElement("span");
            titleObject.setAttribute("id", "mytitle");
            titleObject.setAttribute((isIE ? 'className' : 'class'), "pictitle");
            topObject.appendChild(titleObject);

            var superLinkObject = document.createElement("a");
            superLinkObject.setAttribute("id", "mytitleLink");
            superLinkObject.style.cursor = "pointer";
            titleObject.appendChild(superLinkObject);

            var upTimeObject = document.createElement("span");
            upTimeObject.setAttribute("id", "myuptime");
            topObject.appendChild(upTimeObject);

            var listObject = document.createElement("span");
            listObject.setAttribute("id", "mypage");
            listObject.setAttribute((isIE ? 'className' : 'class'), "list");
            topObject.appendChild(listObject);
            /* --------------------------------------top--div--end---------------------------------------------------- */

            /* --------------------------------------mid--div--start-------------------------------------------------- */
            var midObject = document.createElement("div");
            midObject.setAttribute("id", "imp_mid");
            leftDivObject.appendChild(midObject);

            var btnMidTableObject = document.createElement("table");
            btnMidTableObject.setAttribute("width", "100%");
            btnMidTableObject.setAttribute("border", "0");
            btnMidTableObject.setAttribute("cellspacing", "0");
            btnMidTableObject.setAttribute("cellpadding", "0");
            btnMidTableObject.setAttribute("height", "458");
            //btnMidTableObject.style.float = "left";
            btnMidTableObject.setAttribute("style", "float:left");
            midObject.appendChild(btnMidTableObject);

            var btnMidTableTbodyObject = document.createElement("tbody");
            btnMidTableObject.appendChild(btnMidTableTbodyObject);

            var btnMidTableTrObject = document.createElement("tr");
            btnMidTableTbodyObject.appendChild(btnMidTableTrObject);

            var btnMidTableTdObject = document.createElement("td");
            btnMidTableTdObject.setAttribute("align", "center");
            btnMidTableTdObject.setAttribute("id", "middleTd");
            btnMidTableTdObject.style.verticalAlign = "middle";
            btnMidTableTrObject.appendChild(btnMidTableTdObject);

            var btnMidTableAObject = document.createElement("a");
            btnMidTableAObject.setAttribute("id", "ss_img_par");
            btnMidTableTdObject.appendChild(btnMidTableAObject);

            var btnMidTableImgObject = document.createElement("img");
            btnMidTableImgObject.setAttribute("id", "ss_img");
            btnMidTableImgObject.setAttribute("src", projectPath
                + "/picShow/images/loading.gif");
            btnMidTableImgObject.setAttribute("border", "0");
            btnMidTableImgObject.setAttribute((isIE ? 'className' : 'class'),
                "pic_boder");
            btnMidTableImgObject.style.cursor = "pointer";
            btnMidTableAObject.appendChild(btnMidTableImgObject);

            /* --------------------------------------mid--div--end---------------------------------------------------- */

            /* --------------------------------------bottom--div--start-------------------------------------------------- */
            var bottomObject = document.createElement("div");
            bottomObject.setAttribute("id", "imp_bottom");
            leftDivObject.appendChild(bottomObject);

            //显示图片描述
            var isShowDivImgObject = document.createElement("div");
            isShowDivImgObject.setAttribute("id","picMs");
            isShowDivImgObject.setAttribute((isIE ? 'className' : 'class'), "showPicMs");
            bottomObject.appendChild(isShowDivImgObject);

            var btnObject = document.createElement("span");
            //ie下设置class属性时，ie不认识class这个名字，只认识className
            btnObject.setAttribute((isIE ? 'className' : 'class'), "btn");
            bottomObject.appendChild(btnObject);

            //如果需要显示评论列表 isShowComment=true 否则 isShowComment=false
            if(isShowComment)
            {
                //增加评论按钮btn_comment.gif
                var btnCommentObject = document.createElement("img");
                btnCommentObject.setAttribute("id", "commentBtn");
                btnCommentObject.setAttribute("src", projectPath
                    + "/picShow/images/btn_plList4.gif");
                btnCommentObject.setAttribute("title", "查看和发表评论");
                btnCommentObject.setAttribute("border", "0");
                btnCommentObject.style.cursor = "pointer";
                btnObject.appendChild(btnCommentObject);
            }

            var btnImgObject = document.createElement("img");
            btnImgObject.setAttribute("id", "autoPlayBtn");
            btnImgObject.setAttribute("src", projectPath
                + "/picShow/images/btn_play4.gif");
            btnImgObject.setAttribute("title", "自动播放");
            btnImgObject.setAttribute("border", "0");
            //ie下这种方式设置style无效
            btnImgObject.style.cursor = "pointer";
            btnObject.appendChild(btnImgObject);

            var btnImgCloseObject = document.createElement("img");
            btnImgCloseObject.setAttribute("id", "closeBtn");
            btnImgCloseObject.setAttribute("src", projectPath
                + "/picShow/images/btn_close4.gif");
            btnImgCloseObject.setAttribute("title", "关闭");
            btnImgCloseObject.setAttribute("border", "0");
            //ie下这种方式设置style无效
            btnImgCloseObject.style.cursor = "pointer";
            btnObject.appendChild(btnImgCloseObject);
            /* --------------------------------------bottom--div--end---------------------------------------------------- */

            /* --------------------------------------right--div--start-------------------------------------------------- */
            var rightDivObject = document.createElement("div");
            rightDivObject.setAttribute("id", "imp_right");
            albumDivObject.appendChild(rightDivObject);

            /* --------------------------------------right--div--end---------------------------------------------------- */
        }
        ;

        //开始定时器
        function startIntervalTimer() {
            intervalTimer = setInterval(nextBtn, intervalTime);
        }
        ;

        this.startTimeoutTimer = function() {
            timeoutTimer = setTimeout(this.initialize, timeoutTime);
        };

        //关闭定时器
        function destroyIntervalTimer() {
            clearInterval(intervalTimer);
            intervalTimer = null;
        }
        ;

        function destroyTimeoutTimer() {
            clearTimeout(timeoutTimer);
        }
        ;

        //增加事件
        function addEvent(node, type, listener) {
            if (node.addEventListener) {
                //w3c的方法
                node.addEventListener(type, listener, false);
                return true;
            } else if (node.attachEvent) {
                //MSIE的方法
                node['e' + type + listener] = listener;
                node[type + listener] = function() {
                    node['e' + type + listener](window.event);
                }
                node.attachEvent('on' + type, node[type + listener]);
                return true;
            }
            //若两种方法都不具备，则返回false
            return false;
        }
        ;
        //删除事件
        function removeEvent(node, type, listener) {

            if (node.removeEventListener) {
                //w3c的方法
                node.removeEventListener(type, listener, false);
                return true;
            } else if (node.detachEvent) {
                //MSIE的方法
                node.detachEvent('on' + type, node[type + listener]);
                node[type + listener] = null;
                return true;
            }
            return false;
        }
        ;

        //**************************************************************************************/
        //公用方法         结束
        //*************************************************************************************/

    };
    //*****************************************************************************************************/
    // 播放器对象 结束
    //*****************************************************************************************************/

})();