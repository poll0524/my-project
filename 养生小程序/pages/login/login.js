//index.js
//获取应用实例
const app = getApp()
import {ajax} from '../../utils/api.js'
Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
    } 
    // else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //       wx.navigateTo({
    //         url: '/pages/index/index',
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    wx.getUserInfo({
      success:res=>{
        // app.globalData.userInfo = res.userInfo;
        // app.globalData.encryptedData = res.encryptedData;
        // app.globalData.iv = res.iv;

        // console.log(res);
        // console.log(app.globalData)
      
        // ajax(res=>{
        //   console.log(res);

        //   wx.setStorage({
        //     key: "open_id",
        //     data: res.data.open_id
        //   })
        //   wx.setStorage({
        //     key: "token",
        //     data: res.data.token
        //   })
        //   wx.redirectTo({
        //     url: '/pages/index/index',
        //   })
        // },'/user/login?jsCode='+encodeURI(app.globalData.code) + '&encryptedData=' + encodeURI(app.globalData.encryptedData) + '&iv=' + encodeURI(app.globalData.iv))
      }
    })



    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
