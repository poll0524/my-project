var lowerRight_Div =function(floatWidth,floatHeight,floatUrl,key,dNum)
{
	var float_div_obj = null;//浮动层
	var inner_float_div_obj = null;
	var iframe_float_div_obj = null;
	var close_float_div_obj = null;
	
	var activityUrl = null;
	var iframeWidth = null;
	var iframeHeight = null;
	var cookieKey = "";
	var myDate = new Date();
	var noticeDate = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate(); //当前日期myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate()
	
	//var float_div_obj_width = null;
	//var float_div_obj_height = null;
	var contentPageWidth = document.body.clientWidth;
	var contentPageHeight = document.body.clientHeight;
	var float_div_obj_right = 0;
	var float_div_obj_bottom = 0;
	var float_div_obj_speed = 10;
	var float_div_obj_flag_x = true;
	var float_div_obj_flag_y = true;
	
	var isie6 = window.XMLHttpRequest?false:true;
	
	//间隔的天数
	var dayNum = 1;
	
	function startFloat()
	{
		cookieKey = key;
		dayNum = dNum;
		var flag = false;//是否打开浮动框
		var cookiedate=getCookie(cookieKey);

		if(cookiedate == "")
		{
			 flag = true;
		}
		else if(daysBetween(cookiedate,noticeDate) > dayNum)
		{
			 flag = true;
		}
		
		if(flag)
		{
			setIframeWidth(floatWidth);
			setIframeHeight(floatHeight);
			setActivityUrl(floatUrl);
			initDiv();
		}
	};
	
	//初始化层
	function initDiv()
	{	
	 	float_div_obj = document.createElement("div");
	 	if(isie6){
	 	    float_div_obj.style.position = "absolute";
	 	    window.onscroll = function(){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				float_div_obj.style.left= document.documentElement.clientWidth - float_div_obj.offsetWidth+'px';
				float_div_obj.style.top = document.documentElement.clientHeight-float_div_obj.offsetHeight +scrollTop +'px';
	        }
	 	}else{
	 	    float_div_obj.style.position = "fixed";
	 	}
 	    float_div_obj.style.zIndex  = "100";
		float_div_obj.style.right = float_div_obj_right + "px";
		float_div_obj.style.bottom = float_div_obj_bottom + "px";
		float_div_obj.visibility = "visible";
		float_div_obj.style.width = iframeWidth;
 	    
 	    inner_float_div_obj = document.createElement("div");
 	    if(isie6){
 	        inner_float_div_obj.style.position = "absolute";
 	    }else{
 	        inner_float_div_obj.style.position = "fixed";
 	    }
		inner_float_div_obj.style.zIndex = "100";
		inner_float_div_obj.style.fontSize = "14px";
		inner_float_div_obj.style.fontWeight = "bold";
		inner_float_div_obj.style.right = "2px";
		inner_float_div_obj.align = "right";
		inner_float_div_obj.style.width = iframeWidth;
		
		close_float_div_obj = document.createElement("a");
		close_float_div_obj.style.textDecoration = "underline";
		close_float_div_obj.style.color = "red";
		close_float_div_obj.style.cursor = "pointer";
		close_float_div_obj.innerHTML = "关闭";
		
		iframe_float_div_obj = document.createElement("iframe");
		iframe_float_div_obj.frameBorder = "0";
		iframe_float_div_obj.scrolling = "no";
		iframe_float_div_obj.allowTransparency = true;
		iframe_float_div_obj.src = activityUrl;
		iframe_float_div_obj.width = iframeWidth;
		iframe_float_div_obj.height = iframeHeight;
		
		inner_float_div_obj.appendChild(close_float_div_obj);
		float_div_obj.appendChild(inner_float_div_obj);
		float_div_obj.appendChild(iframe_float_div_obj);
		document.body.appendChild(float_div_obj);
			
		setEvent(true);
	};
	
	//设置iframe的width
	function setIframeWidth(divWidth)
	{
		iframeWidth = divWidth;
	};
	
	//设置iframe的height
	function setIframeHeight(divHeight)
	{
		iframeHeight = divHeight;
	};
	
	//设置iframe的url
	function setActivityUrl(url)
	{
		activityUrl = url;
	};
	
	
	var closeDiv = function()
	{
		float_div_obj.style.display = "none";
		//clearInterval(intervalTimer); 
		setCookie(cookieKey,noticeDate);
	};
	
	function getCookie(Name) 
	{
     	var search = Name + "=";
     	var returnvalue = "";
     	if (document.cookie.length > 0) 
			{
           offset = document.cookie.indexOf(search);
           if (offset != -1) 
		   			{      
                 offset += search.length;
                 end = document.cookie.indexOf(";", offset);
                 if (end == -1)
                       end = document.cookie.length;
                 returnvalue=unescape(document.cookie.substring(offset,end));
           	}
     	}
     	return returnvalue;
	 };

	 function setCookie(name,value)
	 {
	 		var argv=setCookie.arguments;
		 	var argc=setCookie.arguments.length;
		 //var expires=(2<argc)?argv[2]:null;
		 	var path=(3<argc)?argv[3]:null;
		 	var domain=(4<argc)?argv[4]:null;
		 	var secure=(5<argc)?argv[5]:false;
			var expires = new Date();
			expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
		 
		 	document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?""
		 									:("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
		};
	
	//求两个日期的天数差
	function daysBetween(DateOne,DateTwo)  
	{   
		var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
		var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
		var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
		
		var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
		var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
		var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
	   
		var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
		
		return Math.abs(cha);  
	};
	
	//重新得到contentPageWidth 和 contentPageHeight
	function reGetWidthAndHeight()
	{
		contentPageWidth = document.body.clientWidth;
		contentPageHeight = document.body.clientHeight;
	};	
	
	// div event function
	function setEvent(add)
	{
		if (add)
		{
			if (document.all){
				window.attachEvent("onresize", reGetWidthAndHeight);
				close_float_div_obj.attachEvent("onclick", closeDiv);
			} else {
				window.addEventListener("resize", reGetWidthAndHeight, false);
				close_float_div_obj.addEventListener("click", closeDiv, false);
			}
		} else {
			if (document.all){
				window.detachEvent("onresize", reGetWidthAndHeight);
				close_float_div_obj.detachEvent("onclick", closeDiv);
			} else {
				window.removeEventListener("resize", reGetWidthAndHeight, false);
				close_float_div_obj.removeEventListener("click", closeDiv, false);
			}
		}
	};
	//启动浮动框
	startFloat();
};
//实例化
new lowerRight_Div("184px","324px","/chatInput/index.html","float_ad3",1);