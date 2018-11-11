/*!	Marquee v1.12 吾儿网<http://www.520wawa.com>
 跑马灯

 可以是横向移动，或纵向移动。

 默认移动速度为30毫秒，可通过 setSpeed() 设置新值。

 此方法与呈现分离，只要求结构对应，不影响css的变动。

 调用方式：
 new Marquee(div1, content1, content2);
 div1, content1, content2 参数应是 DOM 对象。

 author: 浙大灵通.江奕浩
 */


// container	外部包围的div(未测试其它容器)，必需设 overflow:hidden; 并手工控制好 width, height
// content		一个包含了要显示信息的容器，可以是table, div等。被container所包含。
// contentCopy	一个空的，与content相同的容器。其位置应紧跟在content之后并被container所包含。
//				如果是横向移动，contentCopy 必须与 content 并列；否则应为上下排列。
// vertical		省略为横向移动，给 true 则纵向移动
var Marquee = function(container, content, contentCopy, vertical)
{
    var marquee_vertical = false;			// false 水平移动 / true 垂直移动
    if ((typeof(vertical) != "undefined") && (vertical != null)) {
        marquee_vertical = !!vertical;
    }

    var marquee_speed = 30;
    var marquee_interval = null;
    var marquee_contentSize = marquee_getSize(content);
    if (document.all){
        window.attachEvent("onload", marquee_onload);
    } else {
        window.addEventListener("load", marquee_onload, false);
    }

    // 返回offsetWidth / offsetHeight
    function marquee_getSize(obj)
    {
        return (marquee_vertical ? obj.offsetHeight : obj.offsetWidth);
    };

    // 返回 scrollLeft / scrollTop
    function marquee_getScroll(obj)
    {
        return (marquee_vertical ? obj.scrollTop : obj.scrollLeft);
    };

    // 设置 scrollLeft / scrollTop
    function marquee_setScroll(obj, value)
    {
        if (marquee_vertical) {
            obj.scrollTop = value;
        } else {
            obj.scrollLeft = value;
        }
    };

    function marquee_clearInterval()
    {
        if (marquee_interval != null) {
            clearInterval(marquee_interval);
            marquee_interval = null;
        }
    };

    function marquee_onload()
    {
        setTimeout(function() {
                if (marquee_contentSize > marquee_getSize(container)) {
                    var nodes = content.childNodes;
                    for (var i = 0; i < nodes.length; i++){
                        contentCopy.appendChild(nodes[i].cloneNode(true));
                    }

                    container.onmouseover = function(){
                        marquee_clearInterval();
                    };

                    container.onmouseout = function(){
                        marquee_clearInterval();
                        marquee_interval = setInterval(marquee_moving, marquee_speed);
                    };

                    marquee_interval = setInterval(marquee_moving, marquee_speed);
                }
            },
            1000);
    };

    function marquee_moving()
    {
        var pos = marquee_getScroll(container);
        if (pos >= marquee_contentSize){
            marquee_setScroll(container, pos - marquee_contentSize);
        } else {
            marquee_setScroll(container, pos + 1);
        }
    };

    this.setSpeed = function(speed)
    {
        marquee_speed = speed;
    };
};