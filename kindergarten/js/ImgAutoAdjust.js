/*	ImgAutoAdjust v1.2 吾儿网<http://www.520wawa.com>
 根据高、宽、或高/宽比调整图片的大小

 使用方法：
 1. 在头部引入：<script type="text/javascript" src="ImgAutoAdjust.js"></script>
 2. 在每个要调整的图片后面压入数据。要求后端提供该图片的原始宽度、原始高度、及原高/原宽(最后的参数只为保持向前兼容，可省略)。
 例：
 <script type="text/javascript" language="javascript">
 ImgAutoAdjust.append(document.getElementById("imgNeedAdjust1"), 157, 80, 0.5);
 </script>
 3. 在secondAppend中，可以复制append里的图片，但必须一一对应。
 <script type="text/javascript" language="javascript">
 ImgAutoAdjust.secondAppend(document.getElementById("imgNeedAdjust1")， document.getElementById("imgCopy1"));
 </script>

 要求：
 必须在图片的标签属性中设定width, height的原始值，同时在 css 中设定width, height的期望值。

 注意：每个页面有且只有一个 ImgAutoAdjust 对象。

 author:	江奕浩
 company: 吾儿网
 website: http://www.520wawa.com/
 since:	2012-06-07
 */

if ((typeof(ImgAutoAdjust) == "undefined") || (ImgAutoAdjust == null)) {
    ImgAutoAdjust = new function()
    {
        var iaa_resetImgList = new Array();
        var iaa_secondResetImgList = null;

        if (document.all){
            window.attachEvent("onload", iaa_onload);
        } else {
            window.addEventListener("load", iaa_onload, false);
        }

        function iaa_onload()
        {
            var w, h, imgSource, secondDiv;
            for (var i = 0; i < iaa_resetImgList.length; i++){
                imgSource = iaa_resetImgList[i];
                secondDiv = (iaa_secondResetImgList == null ? null : iaa_secondResetImgList[i]);
                if ((imgSource.adjustWidth > 0) && (imgSource.adjustHeight > 0)){
                    if (imgSource.adjustHeight < imgSource.height){
                        if (imgSource.adjustWidth < imgSource.width){
                            imgSource.width = imgSource.adjustWidth;
                            imgSource.style.width = imgSource.adjustWidth + "px";
                            imgSource.height = imgSource.adjustHeight;
                            imgSource.style.height = imgSource.adjustHeight + "px";
                        } else {
                            h = imgSource.adjustHeight * (imgSource.width / imgSource.adjustWidth);
                            imgSource.height = h;
                            imgSource.style.height = h + "px";
                        }
                    } else if (imgSource.adjustWidth < imgSource.width){
                        w = imgSource.adjustWidth * (imgSource.height / imgSource.adjustHeight);
                        imgSource.width = w;
                        imgSource.style.width = w + "px";
                    } else {
                        w = imgSource.width / imgSource.adjustWidth;
                        h = imgSource.height / imgSource.adjustHeight;
                        if (w < h){
                            w = imgSource.adjustHeight * w;
                            imgSource.height = w;
                            imgSource.style.height = w + "px";
                        } else {
                            h = imgSource.adjustWidth * h;
                            imgSource.width = h;
                            imgSource.style.width = h + "px";
                        }
                    }
                } else if (imgSource.adjustHW > 0) {
                    /* hw = height / width */
                    if (imgSource.adjustHW > imgSource.height / imgSource.width){
                        w = imgSource.height / imgSource.adjustHW;
                        imgSource.width = w;
                        imgSource.style.width = w + "px";
                    } else {
                        h = imgSource.width * imgSource.adjustHW;
                        imgSource.height = h;
                        imgSource.style.height = h + "px";
                    }
                }

                if (secondDiv != null){
                    while(secondDiv.hasChildNodes()){
                        secondDiv.removeChild(secondDiv.firstChild);
                    }
                    secondDiv.appendChild(imgSource.cloneNode(false));
                    iaa_secondResetImgList[i] = null;
                }
                iaa_resetImgList[i] = null;
            }
            iaa_resetImgList.length = 0;
            iaa_resetImgList = null;
            if (iaa_secondResetImgList != null){
                iaa_secondResetImgList.length = 0;
                iaa_secondResetImgList = null;
            }
        };

        /* imgSource	图片对象(dom对象)
         * width		图片原始宽度
         * height		图片原始高度
         * hw			只为保持向前兼容，可省略。图片原始高度/图片原始宽度
         */
        this.append = function(imgSource, width, height, hw)
        {
            imgSource.adjustWidth = width;
            imgSource.adjustHeight = height;
            if ((typeof(hw) == "undefined") || (hw == null)) {
                hw = 0;
            }
            imgSource.adjustHW = hw;
            iaa_resetImgList.push(imgSource);
        };

        /* imgSource		需被复制的图片对象
         * secondImgSource	接收图片对象的容器
         */
        this.secondAppend = function(imgSource, secondImgSource)
        {
            if (iaa_secondResetImgList == null){
                iaa_secondResetImgList = new Array();
            }
            secondImgSource.appendChild(imgSource.cloneNode(false));
            iaa_secondResetImgList.push(secondImgSource);
        };
    };
}