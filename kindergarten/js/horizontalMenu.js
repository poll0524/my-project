/**
 * Created by Stone on 2015/6/3.
 */

// 应该在jQuery( document ).ready 或 window.onload 里使用。
// 用法：
// 		new horizontalMenu(1, $("#menuContainer"));
//
// style			目前有2种：
//						值为 1：风格1
//				 			 2：风格2
// menuContainer	菜单的顶层框，须包装成jQuery对象（菜单div结构有既定要求，请参考html页面）
var horizontalMenu = function(style, menuContainer)
{
    var mainMenuContainer = menuContainer.children( ".mainMenuContainer" );
    var subMenuContainer = menuContainer.children( ".subMenuContainer" );

    function backgroundExchange(m1, m2)
    {
        if (m1 == m2){ return; }

        var exchanging = function(key){
            var ex1 = m1.css(key);
            if ((typeof(ex1) == "undefined") || (ex1 == null)){
                ex1 = "";
            }
            var ex2 = m2.css(key);
            if ((typeof(ex2) == "undefined") || (ex2 == null)){
                ex2 = "";
            }
            if ((ex1 != "") || (ex2 != "")){
                if (ex1 != ex2){
                    m1.css(key, ex2);
                    m2.css(key, ex1);
                    return true;
                }
            }
            return false;
        };
        var changed = false;
        if (exchanging("background-color")){ changed = true; }
        if (exchanging("background-image")){ changed = true; }
        if (exchanging("background-repeat")){ changed = true; }
        if (exchanging("background-position")){ changed = true; }
        if (exchanging("background-position-x")){ changed = true; }
        if (exchanging("background-position-y")){ changed = true; }
        if (exchanging("background-attachment")){ changed = true; }
        if (exchanging("background-size")){ changed = true; }
        if (exchanging("background-clip")){ changed = true; }
        if (exchanging("background-origin")){ changed = true; }
        if (!changed){ exchanging("background"); }
    }

    function hiddenRight()
    {
        mainMenuContainer.children( ".mainMenu" ).each(function(i, element){
            element.className = element.className.replace(" activated", "");
        });
        subMenuContainer.children( ".subMenu" ).hide();
    }

    var resetSubmenuFunc = function(index, mainMenu, kind){
        mainMenu.setAttribute("submenu_adjust_kind", kind);
        var subMenu = subMenuContainer.children( "#subMenu" + index );
        if (subMenu.length > 0){
            // 强制设定子菜单的宽度，否则回头会失效
            subMenu.width(subMenu.width() + subMenu.children("a,span").length + 3);

            var left = mainMenuContainer[0].offsetLeft + mainMenu.offsetLeft + mainMenu.offsetWidth / 2
                - subMenu.width() / 2 - subMenuContainer[0].offsetLeft;
            if (closeLeft){
                if (left + subMenu.width() > subMenuContainer[0].offsetWidth){
                    left = subMenuContainer[0].offsetWidth - subMenu.width();
                }
                if (left < 0){ left = 0; }
            } else {
                if (left < 0){ left = 0; }
                if (left + subMenu.width() > subMenuContainer[0].offsetWidth){
                    left = subMenuContainer[0].offsetWidth - subMenu.width();
                }
            }
            subMenu.css("left", left);
        }
    };

    var mWidth = 0;
    mainMenuContainer.children("a,span").each(function(index, element){
        mWidth++;
        if (!!element.offsetWidth){
            mWidth += element.offsetWidth;
        }
    });
    // 强制设定主菜单的宽度
    mainMenuContainer.width(mWidth);
    var closeLeft = (mainMenuContainer[0].offsetLeft + mainMenuContainer[0].offsetWidth / 2) < (menuContainer[0].offsetWidth / 2);

    switch (parseInt(style))
    {
        case 1:			// 风格1
            mainMenuContainer.children("a").each(function(index, element){
                resetSubmenuFunc(index, element, "need");
            });
            menuContainer.mouseleave(function(){
                hiddenRight();
            });
            break;
        case 2:			// 风格2
            mainMenuContainer.children("a").each(function(index, element){
                resetSubmenuFunc(index, element, "noNeed");
            });
//			menuContainer.mouseleave(function(){
//				mainMenuContainer.children( ".mainMenu" ).each(function(i, element){
//					element.className = element.className.replace(" activated", "");
//				});
//			});
            subMenuContainer.children("#subMenu0").show();
            break;
    }

    mainMenuContainer.children(".mainMenu").each(function(index, mainMenu){
        $(mainMenu).mouseenter(function() {
            var subMenu = subMenuContainer.children( "#subMenu" + index );
            if (subMenu.length == 0){
                hiddenRight();
            } else if (subMenu.is(":hidden")){
                hiddenRight();
                mainMenu.className += " activated";
                subMenu.show();

                if (mainMenu.getAttribute("submenu_adjust_kind") == "need"){
                    mainMenu.setAttribute("submenu_adjust_kind", "ok");

                    var spanNumber = subMenu.children("span").length;
                    var adjust = 0;
                    if (!(spanNumber % 2 == 0)){
                        adjust = subMenu.width() / (spanNumber + 1) / 2;
                    }
                    if (adjust > 0){
                        var l = subMenu.css("left");
                        l = l.substring(0, l.length - 2);
                        if (subMenu[0].offsetLeft + subMenu.width() / 2 < subMenuContainer[0].offsetWidth / 2){
                            subMenu.css("left", parseInt(l) + adjust);
                        } else {
                            subMenu.css("left", parseInt(l) - adjust);
                        }
                    }

                    var theLeft = mainMenu.offsetLeft + mainMenuContainer[0].offsetLeft - subMenu[0].offsetLeft;
                    var target = null;
                    subMenu.children("span, .subMenuRight").each(function(i, segment){
                        if (segment.offsetLeft > theLeft){
                            if (target == null){
                                target = segment;
                            } else {
                                if (target.offsetLeft + (segment.offsetLeft - target.offsetLeft) / 2 < mainMenu.offsetWidth + theLeft){
                                    target = segment;
                                }
                                return false;
                            }
                        }
                    });
                    if (target != null){
                        backgroundExchange(subMenu.children( ".subMenuLast" ), $(target).prev("a"));
                    }
                }
            }
        });
    });

};