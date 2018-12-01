<template>
	<div>
		<nav-item></nav-item>
		<router-view/>

    <!--固定悬浮导航-->
    <div class="fixedMenu">
      <router-link to="" tag="div"v-if="!whetherSignInFlag">
        <i @click="signIn" class="iconfont icon-rili"></i>
        <p @click="signIn">签到</p>
      </router-link>
      <div v-if="whetherSignInFlag">
        <i class="iconfont icon-rili"></i>
        <p>已签到</p>
      </div>
      <router-link to="" tag="div" style="color: #ec6538">
        <i class="iconfont icon-weixin" @click="seeWechart"></i>
        <p @click="seeWechart">公众号</p>
        <div class="wxgzhQrcode" v-if="wechartShow"></div>
      </router-link>
      <a href="http://wpa.qq.com/msgrd?v=3&uin=2682882217&site=qq&menu=yes" target="_blank">
        <div style="color: #ec6538">
          <i class="iconfont icon-service"></i>
          <p>客服</p>
        </div>
      </a>
      <router-link to="http://wpa.qq.com/msgrd?v=3&uin=2682882217&site=qq&menu=yes" tag="div" style="color: #ec6538">
        <i class="iconfont icon-fankui"></i>
        <p>反馈</p>
      </router-link>
      <router-link @click="goPageTop" to="" tag="div">
        <i  @click="goPageTop" class="iconfont icon-fanhuidingbu"></i>
        <p @click="goPageTop">TOP</p>
      </router-link>
    </div>
		<!-- 底部导航 -->
		<foot-item/>
    <!--公共的错误弹框-->
	</div>
</template>
<script>

	import NavLink from '../navLinksComponents/navLinks'
	import FootItem from '../footComponents/footComponents'
  import {mapGetters,mapActions} from "vuex";
	import {getToken,axiosReqGet,axiosReqPost} from '../../assets/js/public'

  export default{
		name:'homePage',
		data(){
			return{
        fixedMenuData:[
          {fontClass:'',text:'',toUrl:''}
        ],
        whetherSignInFlag:false,
        wechartShow:false
			}
		},
		components:{
			'nav-item':NavLink,
			'foot-item':FootItem
		},
    methods:{
		//  回到顶部
      goPageTop(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
    //  是否签到
      whetherSignIn(){
        let uri = 'sign';
        let token = getToken();
        axiosReqGet(uri,(params)=>{
          this.whetherSignInFlag = params.message;
        },token,(params)=> {
        })
      },
    //  签到
      signIn(){
        let uri = 'sign';
        let token = getToken();
        let bodyValue = '';
        axiosReqPost(uri,(params)=>{
          this.whetherSignInFlag = true;
        },token,bodyValue,null,(params)=> {
          // console.log(params.response.data.message);
        })
      },
    //  微信公众号二维码
      seeWechart(){
        this.wechartShow = !this.wechartShow;
      },

    //  未读消息
      ...mapActions({
        noHasReadArrHandler:'noHasReadArrHandler',
        getToAllNewsHandler:'getToAllNewsHandler',
      })
    },
    mounted(){
		  this.noHasReadArrHandler();
		  this.whetherSignIn();
      this.goPageTop();
    },
    destroyed(){
    }
	}
</script>

<style scoped lang="less">

  .fixedMenu{
    position: fixed;
    z-index: 999;
    bottom: 100px;
    right: 20px;
    div{
      width: 50px;
      height:55px;
      background-color: #fff;
      box-shadow: 1px 1px 1px #ccc;
      text-align: center;
      padding: 5px 0 0;
      transition: 0.3s;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover{
        background-color: #ec6538;
        color: #fff!important;
      }
      i{
        font-size: 30px;
      }
      p{
        font-size: 12px;
      }
    }
    .wxgzhQrcode{
      position: absolute;
      right: 50px;
      width: 100px;
      height: 100px;
      top: 60px;
      background-size: 100%;
      background-image: url("../../../static/images/wechart.jpg");
    }
  }

</style>

