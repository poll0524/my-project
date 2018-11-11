// pages/search/search.js
import { ajax } from "../../utils/api.js"
import { ArrFormatChange } from "../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      
    ],
    article_hotwords:[],
    pageQuery:{
      page:0,
      size:10
    },
    btnShowFlag:false,
    showResultFlag:false,
    inputValue:'',
    authorizePopFalg: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax( (res)=>{
      if(res.status == '000000'){
        console.log(res);
        this.setData({
          article_hotwords:JSON.parse(res.data)
        })
      }
    },'/config?field=article_hotwords')
  },
  // input框输入值
  searchInput(e){
    if (e.detail.value != "") {
      this.setData({
        btnShowFlag : true
      })
      
    }else{
      this.setData({
        btnShowFlag: false
      })
    }
    this.setData({
      inputValue: e.detail.value,
    })

    
  },
  hotwordsHandle(e){
    let that = this;
    console.log(e)
    let value = e.currentTarget.dataset.value;
    that.getArticleList(value)
    that.setData({
      showResultFlag:true
    })
  },
  // 点击搜索
  searchHandle(e){
    
    let that = this;
    // let open_id = null;
    // let token = null;
    // console.log(e)
    // let formId = e.detail.formId;
    // if (formId == 'the formId is a mock one') {
    //   return;
    // }
    // wx.getStorage({
    //   key: 'open_id',
    //   success(res) {
    //     open_id = res.data
    //     wx.getStorage({
    //       key: 'token',
    //       success(res) {
    //         token = res.data
    //         wx.request({
    //           url: 'https://api.maxbutterfly.com/api/healthHeadlines/v1/' + 'message/formId',
    //           header: {
    //             "Authorization": "Bearer " + token
    //           },
    //           data: {
    //             formId: formId,
    //             receiverOpenId: open_id,
    //             idType: 'formId',
    //             type: '搜索页面按钮'
    //           },
    //           method: 'PUT',
    //           success(res) {

    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    
    let value = that.data.inputValue;
    
    that.getArticleList( value);
    that.setData({
      showResultFlag: true,
    })
  },
  // 获取列表数据
  getArticleList(value) {
    let that = this;
    let searchValue = { 'title': { '$regex': '.*' + value + '.*' } }
    wx.showLoading({
      title: '加载中',
    })
    ajax((res) => {
      console.log(res);
      // if (res.data.content.length < 10){
      //   let pageObj = { page: pageQuery.page-1,size:10};
      //   that.setData({
      //     pageQuery:pageObj
      //   })
      // }
      // 转换时间戳
      let data = ArrFormatChange(res.data.content, 'createtime');

      let allDataList = that.data.listData.concat(res.data.content);
      that.setData({
        "listData": res.data.content
      })
      wx.hideLoading();
    }, '/article/pageList', 'post', searchValue,)
  },
  // 点击列表
  clickList(e) {
    
    let that = this;
    // 判断是否授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            authorizePopFalg: true
          })
        } else {
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
        }
      }
    })
  },
  // 回到首页
  goBackIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
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
    // let that = this;
    // console.log(that.data.pageQuery)

    // that.setData({
    //   pageQuery: { page: that.data.pageQuery.page + 1, size: 10 },
    // })

    // that.getArticleList(that.data.pageQuery)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})