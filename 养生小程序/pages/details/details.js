// pages/details/details.js
var WxParse = require('../../wxParse/wxParse.js');
import { ajax } from "../../utils/api.js";
import { ArrFormatChange } from '../../utils/util.js' 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    detailsData:{
      // "id":"1",
      // "title":"95后女生下晚班滴滴打车被带至墓园？警方介入调查",
      // "date":"2018-06-19 19:20:48",
      // "intro":"我是文章简介我是文章简介我是文章简介我是文章简介我是文章简介我是文章简介我是文章简介我是文章简介我是文章简介",
      // "content": "<div>我是文章的内容<div/><img src='http://www.hdzxyey.com/UpFiles/Article/2015/9/25/thumb_2015092553280533.jpg' />",
    },
    sharePopFlag:false,
    pageStyle:'details',
    // 是否授权
    authorizePopFalg: false,
  //  是否是分享进来的
    isShare:false,
    // canvas的宽高
    canvasParams:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    that.setData({
      isShare: false
    })
    if(options.isShare == 1 ){
      that.setData({
        isShare: true
      })
    }
    // // 判断是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       that.setData({
    //         authorizePopFalg: true
    //       })
    //     }
    //   }
    // })

    let aid = options.id;
    if (options.q) {
      let q = decodeURIComponent(options.q);
      // 分享进来的显示会到首页按钮
      that.setData({
        isShare: true
      })
      if (q) {
        aid = q.replace(/\//g, ' ').split(' ')[4];
        // 做存储      
      }
    }
    
    ajax((res)=>{
      console.log(res)
      let data = ArrFormatChange([res.data],'createtime')
      // 赋值
      that.setData({
        "detailsData": data[0]
      });
      // html转换
      console.log(that.data.detailsData)
      if (that.data.detailsData.content){
        WxParse.wxParse('details_content', 'html', that.data.detailsData.content, that, 14)
      }
      wx.hideLoading();
    }, '/article/' + aid );

    

  },
  
/** 
* WxParse.wxParse(bindName , type, data, target,imagePadding) 
* 1.bindName绑定的数据名(必填) 
* 2.type可以为html或者md(必填) 
* 3.data为传入的具体数据(必填) 
* 4.target为Page对象,一般为this(必填) 
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
*/  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  // 点击弹框中的授权按钮
  getUserInfo(e) {
    let that = this;

    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.encryptedData = e.detail.encryptedData;
      app.globalData.iv = e.detail.iv;

      ajax(res => {
      
        wx.getStorage({
          key: 'open_id',
          success: function(resp) {
    
          },
          fail:function(resp){
            wx.setStorage({
              key: "open_id",
              data: res.data.open_id
            })
          }
        })
        wx.getStorage({
          key: 'token',
          success: function (resp) {},
          fail: function (resp) {
            wx.setStorage({
              key: "token",
              data: res.data.token
            })
          }
        })
       
        
        that.setData({
          authorizePopFalg: false
        })
      }, '/user/login?jsCode=' + encodeURI(app.globalData.code) + '&encryptedData=' + encodeURI(e.detail.encryptedData) + '&iv=' + encodeURI(e.detail.iv))
    }

  },
  goBackIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  sharePengyouQuan(){
    let that = this;
    that.drawPhoto();
    console.log(that);
    that.setData({
      sharePopFlag:true,
      pageStyle:'details overHide'
    })
    
  },
  /**
   * 画图
   * */ 
  drawPhoto(){
    let that = this;
    // 设置字体内容，以及在画布上的位置
    let title = that.data.detailsData.title.length > 50 ? that.data.detailsData.title.substr(0, 50) + ' ...' : that.data.detailsData.title;
    // let title = '我是文章简介1我是文章简介2我是文章简介3我是文章简介4我是文章简介5我是文章简介6我是文章简介7我是文章简介8我是文章简介9我是文章简介7我是文章简介8我是文章简介9';
    let author = that.data.detailsData.author;
    let date = that.data.detailsData.createtime;
    let intro = that.data.detailsData.intro.length > 62 ? that.data.detailsData.intro.substr(0, 62) + ' ...' : that.data.detailsData.intro;
    let imageUrl = that.data.detailsData.thumb[0] ? that.data.detailsData.thumb[0].url:'https://icon.maxbutterfly.com/507513087060664320.jpg';
    let content = that.data.detailsData.content;

    wx.getImageInfo({
      src: imageUrl,
      success(res){
        console.log(res);
        var ctx = wx.createCanvasContext('sharePengYouQuan');
        wx.getSystemInfo({
          success: function (sysRes) {
           
            console.log(sysRes.windowHeight)
            console.log(sysRes.windowWidth)
            let rpx = sysRes.windowWidth / 375;
            console.log(rpx)
            let canvasParams = { width: sysRes.windowWidth * 0.76 * rpx, height: sysRes.windowHeight * 0.70 * rpx, rpx:sysRes.windowWidth / 375}
            that.setData({ 
              canvasParams: canvasParams
              })  
            ctx.setFillStyle('#fff');

            ctx.fillRect(0, 0, 285 * rpx, 410 * rpx);
            // 设置填充颜色
            ctx.fillStyle = "#000";

            // 标题
            ctx.setFontSize(16 * rpx);
            let canvasTop = 30;
            ctx.fillText(title.substr(0, 17), 10 * rpx, canvasTop * rpx);
            if (18 < title.length < 36) {
              canvasTop += 20
              ctx.fillText(title.substr(17, 17), 10 * rpx, canvasTop * rpx);
            }
            if (title.length > 36) {

              canvasTop += 20
              ctx.fillText(title.substr(34, 17), 10 * rpx, canvasTop * rpx);
            }

            // 作者信息 时间
            ctx.setFontSize(12 * rpx);
            ctx.setFillStyle('#ccc');
            canvasTop += 30
            ctx.fillText(author + ' ' + date, 10 * rpx, canvasTop * rpx);

            ctx.setFontSize(12 * rpx);
            ctx.setFillStyle('#000');
            canvasTop += 30
            // 简介
            ctx.fillText(intro.substr(0, 22), 10 * rpx, canvasTop * rpx);

            if (22 < intro.length < 44) {
              canvasTop += 20;
              ctx.fillText(intro.substr(22, 22), 10 * rpx, canvasTop * rpx);
            }
            if (intro.length > 44) {
              canvasTop += 20;
              ctx.fillText(intro.substr(44, 22), 10 * rpx, canvasTop * rpx);
            }
            // 二维码
            ajax((resp) => {
              wx.getImageInfo({
                src: resp.data,
                success(result) {
                  canvasTop += 10;
                  ctx.drawImage(result.path, 195 * rpx, canvasTop * rpx, 75 * rpx, 75 * rpx)
                  canvasTop += 20;

                  // 全文多少字
                  ctx.setFontSize(12 * rpx);
                  ctx.setFillStyle('#ccc');
                  canvasTop += 20;
                  ctx.fillText('全文 ' + content.length + ' 字', 10 * rpx, canvasTop * rpx);
                  // 长按提示
                  ctx.setFillStyle('#000');
                  ctx.setFontSize(14 * rpx);
                  canvasTop += 20;
                  ctx.fillText('长按扫码阅读', 10 * rpx, canvasTop * rpx);
                  // 第一张图
                  canvasTop += 20;
                  ctx.drawImage(res.path, 10 * rpx, canvasTop * rpx, 265 * rpx, 160 * rpx);
                  console.log(canvasTop * rpx);

                  ctx.draw();
                }
              })
            }, '/file/QrCode?width=200&height=200&content=http://jumper_xiao.maxplus.xyz/healthHeadlines/' + that.data.detailsData.aid, )

          },
        })
        
       
        
      }

    })


    
   
  },

  // 隐藏弹框
  hideSharePop(){
    this.setData({
      sharePopFlag:false
    })
  },
  // 下载图片
  downLoadPhoto(){
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'sharePengYouQuan',
      fileType: 'jpg',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(){
            wx.showToast({
              title: '已保存到相册'
            })
          },
          fail(err) {
            if (err.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
              wx.openSetting({
                success(data) {
                  if (data.authSetting['scope.writePhotosAlbum']) {
                    wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success(res) {
                        wx.showToast({
                          title: '已保存到相册'
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '授权失败，无法保存图片到相册',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            }
          }
        })
      }
    }, that)
    
  },
  // 保存图片
  savePhoto(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            
          })
        }
      }
    }),
    that.downLoadPhoto();
    
  },



  empty(){

  },
  touchMove(){

  },
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let that = this;
    return {
      title: that.data.detailsData.title.length > 31 ? that.data.detailsData.title.substr(0, 31) + '...' : that.data.detailsData.title,
      desc: that.data.detailsData.intro.length > 18 ? that.data.detailsData.intro.substr(0, 18) + '...' : that.data.detailsData.intro,
      path: '/pages/details/details?id=' + that.data.detailsData.aid + '&isShare=1',
      imageUrl: that.data.detailsData.thumb.length > 0?that.data.detailsData.thumb[0].url:''
    }
    
  }
})