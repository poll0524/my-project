// pages/index/index.js

import { ajax } from "../../utils/api.js";
import { formatTime, ArrFormatChange} from "../../utils/util.js"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedIndex: -1,
    classflyData:[
      // { id: 0,value: '新闻', lable: '新闻' },
      // { id: 1,value: '推荐', lable: '推荐' },
      // { id: 2,value: '资讯', lable: '资讯' },
      // { id: 3,value: '报告', lable: '报告' },
      // { id: 4,value: '养生', lable: '养生' },
      // { id: 5,value: '今日', lable: '今日' },
      // { id: 6,value: '头条', lable: '头条' },
      // { id: 7,value: '安排', lable:'安排'},
    ],

    listData:[
      // {
      //   aid:1,
      //   title:'习近平回信勉励广大民营企业家 心无旁骛创新创造 踏踏实实办好企业',
      //   author:'我是作者',
      //   date:'2018-08-08',
      //   thumb: []
      // },
    ],
    totalElements: 0,
    pageQuery: {
      page: 0,
      size: 10,
    },
    authorizePopFalg:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    
    that.getCategory();
    that.getArticleList(that.data.pageQuery, {});
    
  },
  // 点击弹框中的授权按钮
  getUserInfo(e){
    let that = this;
   
    if (e.detail.errMsg == "getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.encryptedData = e.detail.encryptedData;
      app.globalData.iv = e.detail.iv;
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
      console.log(app.globalData.code)
      ajax(res => {
        console.log(res);
        wx.getStorage({
          key: 'open_id',
          success: function (resp) {

          },
          fail: function (resp) {
            wx.setStorage({
              key: "open_id",
              data: res.data.open_id
            })
          }
        })
        wx.setStorage({
          key: "token",
          data: res.data.token
        })
        
        that.setData({
          authorizePopFalg: false
        })

      }, '/user/login?jsCode=' + encodeURI(app.globalData.code) + '&encryptedData=' + encodeURI(e.detail.encryptedData) + '&iv=' + encodeURI(e.detail.iv))
    }
    
  },
  // 导航点击
  selectedIndex(e){
    let that = this;
    console.log(e);
    let index = e.currentTarget.dataset.index
    that.setData({
      selectedIndex: index,
      listData:[]
    })
    that.getArticleList(that.data.pageQuery, { 'category':that.data.classflyData[index]});
  },
  // 点击全部
  getAllArticle(){
    this.setData({
      selectedIndex: -1,
      listData: []
    })
    this.getArticleList({page:0,size:10},{});
  },
  //验证登录是否过期
  checksession: function (e) {
    let that =this;
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        let open_id = "";
          let token = "";
          let formId = e.detail.formId;
          if (formId == 'the formId is a mock one') {
            return;
          }
          wx.getStorage({
            key: 'open_id',
            success(res) {
              open_id = res.data
              wx.getStorage({
                key: 'token',
                success(res) {
                  token = res.data
                  wx.request({
                    url: 'https://api.maxbutterfly.com/api/healthHeadlines/v1/' + 'message/formId',
                    header: {
                      "Authorization": "Bearer " + token
                    },
                    data: {
                      formId: formId,
                      receiverOpenId: open_id,
                      idType: 'formId',
                      type: '新闻列表按钮'
                    },
                    method: 'PUT',
                    success(res) {

                    }
                  })
                }
              })
            }
          })

          wx.navigateTo({
            url: '/pages/details/details?id=' + e.currentTarget.id,
          })
        
      },
      fail: function (res) {
        console.log(res, '登录过期了')
        that.setData({
          authorizePopFalg: true
        })
      }
    })
  },
  // 点击列表
  clickList(e) {
    let that = this;
    console.log(1111)

    // 判断是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       that.setData({
    //         authorizePopFalg: true
    //       })
    //     }else{
        
    //       // let open_id = "";
    //       // let token = "";
    //       // let formId = e.detail.formId;
    //       // if (formId == 'the formId is a mock one') {
    //       //   return;
    //       // }
    //       // wx.getStorage({
    //       //   key: 'open_id',
    //       //   success(res) {
    //       //     open_id = res.data
    //       //     wx.getStorage({
    //       //       key: 'token',
    //       //       success(res) {
    //       //         token = res.data
    //       //         wx.request({
    //       //           url: 'https://api.maxbutterfly.com/api/healthHeadlines/v1/' + 'message/formId',
    //       //           header: {
    //       //             "Authorization": "Bearer " + token
    //       //           },
    //       //           data: {
    //       //             formId: formId,
    //       //             receiverOpenId: open_id,
    //       //             idType: 'formId',
    //       //             type: '新闻列表按钮'
    //       //           },
    //       //           method: 'PUT',
    //       //           success(res) {

    //       //           }
    //       //         })
    //       //       }
    //       //     })
    //       //   }
    //       // })

    //       wx.navigateTo({
    //         url: '/pages/details/details?id=' + e.currentTarget.id,
    //       })
    //     }
    //   }
    // })
  },
  // 首页回到首页
  goBackIndex(){
    this.setData({
      authorizePopFalg: false
    })
  },
  // 获取列表数据
  getArticleList(pageQuery,sort){
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    ajax((res) => {
      console.log(pageQuery);
      
      // if (res.data.content.length < 10) {
      //   let pageStr = "pageQuery.page"
      //   that.setData({
      //     [pageStr]: pageQuery.page - 1
      //   })
      // }
      // 转换时间戳
      let data = ArrFormatChange(res.data.content,'createtime');

      let allDataList = that.data.listData.concat(data);
      // allDataList[3].createtime = formatTime(allDataList[3].createtime, 'Y/M/D h:m:s')
      that.setData({
        "listData": allDataList,
        "totalElements": res.data.totalElements
      })
      wx.hideLoading();
    }, '/article/pageList?page=' + pageQuery.page + '&size=' + pageQuery.size + '&sort=createtime,DESC', 'post', sort  )
  },
  // 获取分类列表
  getCategory(){
    let that = this;
    ajax( (res)=>{
      console.log((res.data));
      let nav = JSON.parse(res.data)
      that.setData({
        classflyData: nav
      })
    },'/config?field=category')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
    let that = this;
    let pageStr = "pageQuery.page"
    
    // totalElements
    if (that.data.totalElements / (that.data.pageQuery.page + 1) > 10){
      wx.showLoading({
        title: '加载中',
      })
      that.setData({
        [pageStr]: that.data.pageQuery.page + 1,
      })
      that.getArticleList(that.data.pageQuery)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})