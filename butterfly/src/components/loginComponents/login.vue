<template>
	<div class="login-container">
    <div class="login-logo" ref="logo">
      <router-link to="/Index"><img :src="logoImageUrl" alt=""></router-link>
    </div>
    <div class="login-out-box">
      <h1>欢迎登录蝶儿飞会员</h1>
      <h3>品牌就此蝶变，梦想从此绽放</h3>
      <div class="login-box">
        <div class="login-header">
          <div class="login-title right-border"
               v-bind:class="[activeIndex==0?'active':'']" @click="activeIndex=0">
            快速登录
          </div>
          <div class="login-title"
               v-bind:class="[activeIndex==1?'active':'']" @click="activeIndex=1">
            账号密码登录</div>
        </div>
        <div class="login-content">
          <transition name="fade" mode="out-in">
            <v-quick
              v-if="activeIndex==0"
              @quickPhoneChange='quickPhoneChange'
              @getLoginClode="getLoginClode"
              @loginSubmit="loginSubmit"/>
            <v-slow
              v-if="activeIndex==1"
              @quickPhoneChange='quickPhoneChange'
              @getLoginClode="getLoginClode"
              @loginSubmit="loginSubmit"/>
          </transition>
          <div class="login-btn">
            <button @click="loginSubmit">立即登录</button>
          </div>
          <div class="register-text">
            <a href="#/forgetPassword" v-show="activeIndex==1" class="forget-password orange-color">忘记密码</a>
            <a href="#/register" class="orange-color register-new">注册新用户</a>
          </div>
          <div class="login-third">
            <div class="thrid-title">第三方登录</div>
            <div class="thrid-links">
              <a class="login-wx" @click="wxLogin" href="javascript:;"></a>
              <a class="login-wb" @click="wbLogin" href="javascript:;"></a>
	      <a class="login-qq"  href="javascript:;"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-filingNumber">
      <a class="login-filingNumber-to" href="http://www.miitbeian.gov.cn/">Copyright© 2018蝶儿飞 蜀ICP备16012455号-2</a>
    </div>
    <ModalItem
    :showModal="showLoginModal"
    @changheHintBoxShow="changeLoginHintBoxShow"
    >
      <div v-if="!wxLoginFlag" slot="body">
        {{loginErrText}}
      </div>
      <div v-if="wxLoginFlag" slot="body">
        <iframe :src="iframeUrl" />
      </div>
    </ModalItem>
    <ModalItem
      :showModal="loginFlag"
    >
      <div slot="body">登录且绑定成功</div>
    </ModalItem>
    <!--<div class="weibo">-->
      <!--<ModalItem-->
        <!--:showModal="showLoginModal"-->
        <!--@changheHintBoxShow="changeLoginHintBoxShow"-->
      <!--&gt;-->
        <!--<div v-if="wxLoginFlag" slot="body">-->
          <!--<iframe :src="iframeUrl" />-->
        <!--</div>-->
      <!--</ModalItem>-->
    <!--</div>-->
	</div>
</template>

<script>
	import quickLogin from './quicklyLogin'
	import slowlyLogin from './slowlyLogin'
  import $ from 'jquery'
  import {axiosReqGet,saveReadToken,regEX,getPublicConfigData,axiosWxReqGet} from '../../assets/js/public.js'
  import md5 from  'js-md5'

  import ModalItem from '../publicModalComponents/publicModal'

	export default{
		name:'login',
		data()
    {
			return{
				activeIndex:0,
				loginData:{
					accountNumber:null,
					password:null
				},
        showLoginModal:false,
        loginErrText:null,
        registerFlag:false,
        logoImageUrl:'',
        wxLoginFlag:false,
        iframeUrl:null,
        wxCode:null,
        wbCode:null,
        loginFlag:false

			}
		},
		components:{
			'v-quick':quickLogin,
			'v-slow':slowlyLogin,
      'ModalItem':ModalItem
		},
		methods:{
			quickPhoneChange(value){
				this.loginData.accountNumber = value;
				if(this.activeIndex == 1){
          this.validatePhoneRegister(value)
        }
			},

			getLoginClode(value){
				this.loginData.password = value;
			},

      // 点击登录
      loginSubmit(){
        // this.validatePhoneRegister(this.loginData.accountNumber);

			  if(this.activeIndex == 1 && this.registerFlag == true){
          this.changeLoginHintBoxShow('该手机号没有注册！请注册后登录')
          return
        }else {
          let grant_type= "";
          let password = "";

          if(!regEX(this.loginData.accountNumber).checkPhone){
            this.changeLoginHintBoxShow('请输入正确的手机号！')
            return
          }
          let union_id = sessionStorage.getItem('union_id');
          let union_id_param = union_id?'&union_id='+union_id:'';


          let uid = sessionStorage.getItem('uid');
          let uid_param = uid?'&uid='+uid:'';
          // if(!password){
          //   this.changeLoginHintBoxShow('请输入密码！')
          //   return
          // }
          this.activeIndex === 0?(grant_type = "code",password=this.loginData.password):(grant_type = "password",password=md5(this.loginData.password));
          var url = "token?phone=" + this.loginData.accountNumber + "&"+grant_type+"=" + password + "&grant_type="+grant_type + union_id_param + uid_param;
          axiosReqGet(url,this.sucFunc,null,this.errFunc);
        }
      },

      //验证手机是否注册
      validatePhoneRegister(value){
        let uri = 'sms/'+value;
        axiosReqGet(uri,(params)=>{
          this.registerFlag = true;
        },null,(params)=>{
          this.registerFlag = false;
        })
      },
      //登录成功
      sucFunc(data){
        if(data){
          if(sessionStorage.getItem('union_id') || sessionStorage.getItem('uid')){
            sessionStorage.setItem('union_id','')
            sessionStorage.setItem('uid','')
            this.loginFlag = true;
          }
          saveReadToken(data.token,7);
          setTimeout(()=>{
            this.loginFlag = false;
            location.href="#/index"
          },2000)

        }
      },
      //登录失败
      errFunc(params){
        // console.log(params.response.data.message);
        this.changeLoginHintBoxShow(params.response.data.message);
      },
      changeLoginHintBoxShow(errText){
        this.loginErrText = errText;
        this.wxLoginFlag = false;
        this.showLoginModal = !this.showLoginModal
      },

        //微信登录
      wxLogin(){
        this.showLoginModal = true;
        this.wxLoginFlag = true;
        const url = 'wx/v1/login_url'
        axiosWxReqGet(url,(params)=>{
          console.log(params)
          this.iframeUrl = params.data
        },null,(err)=>{

        })
      },
      //微博登录
      wbLogin(){
        // this.showLoginModal = true;
        // this.wxLoginFlag = true;
        const url = 'weibo/v1/login_url'
        axiosWxReqGet(url,(params)=>{
          location.href = params.data
        },null,(err)=>{

        })
      },

//      getQuery(name) {
//        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//        let r = window.location.search.substr(1).match(reg);
//        if (r != null) {
//          return decodeURI(r[2]);
//        } else {
//          return "";
//        }
//      },
      //  检测用户是否第三方登录
      checkCode(){
        let login_type = this.$route.query.login_type;
			  this.wxCode = (login_type == 'wx')?this.$route.query.code:null
        this.wbCode = (login_type == 'wb')?this.$route.query.code:null

        if(this.wxCode){
          const url = "wx/v1/login?&code="+this.wxCode;
          axiosWxReqGet(url,(params)=>{
            if(params.statusCode == '001002'){
              this.changeLoginHintBoxShow('当前微信号没有绑定蝶儿飞账号，请先使用手机号登录或注册，成功后下次可以直接使用微信登录')
              sessionStorage.setItem('union_id',params.data.union_id)
            }if(params.statusCode == '000001'){
              location.href="#/login"
            }
            if(params.statusCode == "000000"){
              saveReadToken(params.data.token,7);
              location.href="#/index"
            }
          },null,()=>{
          })
        }

        if(this.wbCode){
          const url = "weibo/v1/login?&code="+this.wbCode;
          axiosWxReqGet(url,(params)=>{
            console.log(params.data)
            if(params.statusCode == '001002'){
              this.changeLoginHintBoxShow('当前微博号没有绑定蝶儿飞账号，请先使用手机号登录或注册，成功后下次可以直接使用微博登录')
              sessionStorage.setItem('uid',params.data.uid)
            }if(params.statusCode == '000001'){
              console.log("111")
              location.href="#/login"
            }
            if(params.statusCode == "000000"){
              saveReadToken(params.data.token,7);
              location.href="#/index"
            }
          },null,()=>{
          })
        }
      }

		},
    mounted(){
		  this.checkCode();
      //获取网站的logo地址
      getPublicConfigData('system_config_logo_main',(params)=>{
        this.logoImageUrl = params.data
      },null,(params)=>{

      })
    },
    watch:{
      // 如果路由有变化，会再次执行该方法
      "$route"(){
        location.reload();
      },
    }
	}
</script>

<style lang="less">
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .3s ease;
	}
	.fade-enter, .fade-leave-to
	/* .component-fade-leave-active for below version 2.1.8 */ {
	  opacity: 0;
	}

	.login-container{
    .active{
      color: #ec6538;
    }
		position: relative;
    /*min-height: 500px;*/
		height: 100vh;
    overflow: hidden;
    min-height: 720px;
		background: url(../../../static/images/login_bg.jpg) center no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		.orange-color{
			color: #ec6538;
		}
		.register-text a:hover{
			text-decoration: underline;

		}
    .login-out-box{
      position: absolute;
      right: 300px;
      h1,h3{
        color: rgba(255,255,255,0.8);
        letter-spacing: 5px;
        height: 50px;
        font-weight: normal;
        text-align: center;
      }
    }
		.login-box{
			background: rgba(0,0,0,0.7);
			color: rgba(255,255,255,0.8);
			border-radius: 3px;
			padding: 20px 50px;
			.login-header{
				display: flex;
        padding: 15px 0 15px;
        border-bottom: 1px solid rgba(255,255,255,0.8);
        .login-title{
          width: 160px;
          text-align: center;
          letter-spacing: 2px;
          font-size: 18px;
         &:hover{
           cursor: pointer;
           color: #ec6538;
         }
        }
        .right-border{
          border-right: 1px solid rgba(255,255,255,0.8);
        }
			}
      .login-content{
        width: 310px;
        padding-top: 20px;
      }
		}
    .login-logo{
      position: absolute;
      left: 100px;
      top: 20px;
    }
    .login-btn{
      button{
        width: 310px;
        height: 40px;
        font-size: 16px;
        background-color: #ec6538;
        border: none;
        color: #fff;
        letter-spacing: 5px;
        border-radius: 6px;
        cursor: pointer;
        &:focus{
          outline: none;
        }
        &:active{
          background-color: #cd562e;
        }
      }
    }
    .register-text{
      .forget-password{
        margin-top: 25px;
        font-size: 14px;
        float: left;
        color: #e5e5e5;
      }
      .register-new{
        float: right;
      }
      &:after{
        content: "";
        display: block;
        clear: both;
      }
      .orange-color{
        display: inline-block;
        margin-top: 25px;
        font-size: 14px;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .login-third{
      width:240px;
      height: 126px;
      margin: 20px auto 0;
      position: relative;
      border-top: 1px solid #FFF;
      .thrid-title{
        position: absolute;
        top: -10px;
        left: 68px;
        padding: 0 10px;
        background-color: rgba(6,5,5,1);
      }
      .thrid-links{
        margin-top: 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
          display: block;
          height: 60px;
          width: 60px;
        }
        .login-qq{
          background-image: url('../../../static/images/icons.png');
          background-position: -8px -4px;
          &:hover{
            background-position: -8px -85px;
          }
        }
        .login-wb{
          background-image: url('../../../static/images/icons.png');
          background-position: -86px -4px;
          &:hover{
            background-position: -86px -85px;
          }
        }
        .login-wx{
          background-image: url('../../../static/images/icons.png');
          background-position: -162px -4px;
          &:hover{
            background-position: -162px -85px;
          }
        }
      }

    }
    .login-filingNumber{
      position: absolute;
      bottom: 50px;
      .login-filingNumber-to{
        color: #999;
      }
    }
    .modal-mask .modal-wrapper .modal-container{

      max-width: 370px;
    }
    .weibo{
      .modal-mask .modal-wrapper .modal-container{
        max-width: 660px;
      }
      iframe{
        height: 430px;
        width: 600px;
        background-color: #fff;
      }
    }

    iframe{
      height: 430px;
      min-width: 304px;
      background-color: #fff;
    }
	}
</style>
