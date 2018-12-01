import {axiosReqGet,getToken,formatTime,getPublicConfigData} from '../../assets/js/public.js'



const state = {
  // searchData:{ //移至分页
  //   searchContent:null,
  // },

  //个人信息头像
  avatorUrl:'',

  //错误弹框
  errModalData:{
    forgetPswErrModalFlag:false,
    forgetPswErrModalText:"",
  },

  //首页下面的新闻资讯等
  allDataList:{
    newsListData:null,
    successExaData:null,
    companyNewsListData:null
  }


  //
}

const getters = {
  avatorImgUrl : state => state.avatorUrl,
  // showSearchData : state => state.searchData,
  errModal : state => state.errModalData,
  showAllDataList :stats => state.allDataList

}

const actions ={

  //绑定上传头像地址
  bindAvatorUrl({commit},value){
    commit('bindAvatorUrlHandler',value)
  },

  // //搜索后保存搜索内容
  // publicSearchHandler({commit},searchData){
  //   commit('publicSearch',searchData)
  // }

  //通过相应id的获取列表
  getAllListData({commit},value){
    commit('getAllListDataHandler')
  }
}


const mutations = {

  bindAvatorUrlHandler(state,value){
    state.avatorUrl = value+"?id="+Math.random();

  },

  //获取列表
  getAllListDataHandler(state){

    //获取网站的资讯列表的id地址
    getPublicConfigData('system_config_trade_news_article_category_id',(elem)=>{
      let url = 'article/list?category_id='+elem.data;
      let token = getToken();
      axiosReqGet(url,(params)=>{
        console.log(params)
        state.allDataList.newsListData = params.data.content;
        state.allDataList.newsListData.forEach((item) =>{
          item.date = formatTime(item.createtime,'-').split(' ')[0]
        })
      },token)
    },null,(ele)=>{
      console.log(ele)
    })

    //获取网站的成功案例列表的id地址
    getPublicConfigData('system_config_success_article_category_id',(elem)=>{
      let url = 'article/list?category_id='+elem.data;
      let token = getToken();
      axiosReqGet(url,(params)=>{
        console.log(params)
        state.allDataList.successExaData = params.data.content;
        state.allDataList.successExaData.forEach((item) =>{
          item.date = formatTime(item.createtime,'-').split(' ')[0]
        })
      },token)
    },null,(ele)=>{
      console.log(ele)
    })

    //获取公司新闻列表的id地址
    getPublicConfigData('system_config_company_news_article_category_id',(elem)=>{
      let url = 'article/list?category_id='+elem.data;
      let token = getToken();
      axiosReqGet(url,(params)=>{
        console.log(params)
        state.allDataList.companyNewsListData = params.data.content;
        state.allDataList.companyNewsListData.forEach((item) =>{
          item.date = formatTime(item.createtime,'-').split(' ')[0]
        })
      },token)
    },null,(ele)=>{
      console.log(ele)
    })

  }

  // publicSearch(state,searchData){
  //   state.searchData = searchData;
  //   state.searchData.searchContent.forEach((item)=>{
  //     if(item._source.createtime){
  //       item._source.date =formatTime(item._source.date,'-').split(' ')[0];
  //     }
  //    for(let key in item.highlight){
  //      item._source[key] = item.highlight[key][0];
  //    }
  //   })
  //   console.log(state.searchData.searchContent)
  // }
}

export default{
  state,
  getters,
  actions,
  mutations
}
