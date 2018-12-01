<template>
  <div class="forgetPassword-container">
    <div class="login-logo" ref="logo">
      <router-link to="/Index"><img :src="logoImageUrl" alt=""></router-link>
    </div>
    <div class="forgetPassword-box">
      <form action="">
        <p class="forgetPassword-header">重设登录密码</p>
        <div>
          <input type="tel" class="forgetPassword-phone" v-model="forgetPasswordPhone" :class="[showMessage?'borderErrColor':'']" @blur="phoneChange" placeholder="请输入手机号码" >
          <span class="errMessage" v-if="showMessage">请输入正确的手机号</span>
        </div>
        <div>
          <input type="tel" maxlength="6" class="forgetPassword-code" v-model="forgetPasswordCode" :class="[showCodeFlag?'borderErrColor':'']" @blur="phoneCodeChange" placeholder="请输入验证码">
          <a href="javascript:;" class="orange-color" v-show="codeShowBtn" @click="codeTimeBtn">获取验证码</a>
          <!--<span class="errMessage" v-if="showCodeFlag">请输入6位验证码</span>-->
          <span v-show="!codeShowBtn" class="codeCount">重新获取({{codeCount}}s)</span>
        </div>
        <div>
          <div class="password-box">
            <input :type="[seePasswordFlag?'password':'text']" class="forgetPassword-password" v-model="forgetPasswordPassword1" placeholder="请输入登录密码">
          </div>
           <div class="password-box">
             <input :type="[seePasswordFlag?'password':'text']" class="forgetPassword-password" v-model="forgetPasswordPassword2" placeholder="请再输入一次密码">
             <span :class="[seePasswordFlag?'open-eye':'close-eye']" @click="changeSeePasswordFlag"></span>
           </div>
          <!--<span class="errMessage">两次密码不一致</span>-->
        </div>
        <div class="forgetPassword-btn">
          <button type="button" class="" @click="suerChange">确认修改</button>
        </div>
      </form>
      <div class="goLoginBox">
       <a href="#/login" class="goLogin">返回登录</a>
      </div>
    </div>
    <ModalItem
      :showModal="errModal.forgetPswErrModalFlag"
      @changheHintBoxShow="changheHintBoxShow"
    >
      <div slot="body">
        {{showErrText}}
      </div>

    </ModalItem>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
  import ModalItem from '../../components/publicModalComponents/publicModal'
  import {axiosReqGet,axiosReqMethods,getToken,base64_encode,regEX,verifyPhoneNum,getPublicConfigData} from '../../assets/js/public'
  import md5 from 'js-md5'
  export default {
    name: "forgetPassword",
    components:{ModalItem},
    data(){
      return{
        forgetPasswordPhone:'',
        forgetPasswordCode:'',
        forgetPasswordPassword1:'',
        forgetPasswordPassword2:'',
        showMessage:false,
        showCodeFlag:false,
        codeShowBtn: true,
        codeCount: '',
        codeTimer: null,
        showErrText:null,
        seePasswordFlag:true,
        logoImageUrl:''
      }
    },
    computed:{
      ...mapGetters({
        errModal:'errModal',

      })
    },
    methods:{
      phoneChange(){
        if(!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.forgetPasswordPhone)){
          this.showMessage = true;
          return
        } else {
          this.showMessage = false;
        }
      },
      phoneCodeChange(){
        if(this.forgetPasswordCode.length != 6){
          this.forgetPasswordCode = "";
          this.showCodeFlag = true
        }else {
          this.showCodeFlag = false
        }
      },

      //验证手机是否注册
      codeTimeBtn(){
        if(!regEX(this.forgetPasswordPhone).checkPhone){
          this.changheHintBoxShow("请输入正确的手机号");
          return
        }
        verifyPhoneNum(this.forgetPasswordPhone,this.verifySucFun,this.verifyErrFun)
      },
      verifySucFun(params){
        this.changheHintBoxShow('该手机号没有注册过账号')
        this.forgetPasswordPhone = null;
      },
      verifyErrFun(params){
        if(!regEX(this.forgetPasswordPhone).checkPhone){
          this.changheHintBoxShow("请输入正确的手机号");
          return
        }

        let uri = 'sms?phone='+this.forgetPasswordPhone;
        axiosReqGet(uri,(param)=> {
          if(param.timestamp){
            this.changheHintBoxShow('您的上一个验证码还未过期')
          }else {
            const TIME_COUNT = 60;
            if (!this.codeTimer) {
              this.codeCount = TIME_COUNT;
              this.codeShowBtn = false;
              this.codeTimer = setInterval(() => {
                if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
                  this.codeCount--;
                } else {
                  this.codeShowBtn = true;
                  clearInterval(this.codeTimer);
                  this.codeTimer = null;
                }
              }, 1000)
            }
          }
        },null,(params)=> {
          this.changheHintBoxShow(params.response.data.message)
        });


      },

      suerChange(){
        if(this.forgetPasswordPassword1 && this.forgetPasswordPassword2 && this.forgetPasswordPassword1!= this.forgetPasswordPassword2){
          this.changheHintBoxShow('请两次输入相同的密码！')
          return
        }

        let uri = 'user/password';
        const bodyValueObj = {
          phone:this.forgetPasswordPhone,
          code:this.forgetPasswordCode,
          password_new:md5(this.forgetPasswordPassword1),
          password_new_again:md5(this.forgetPasswordPassword2)
        };


        let bodyValue = base64_encode(JSON.stringify(bodyValueObj));
        var that = this;
        axiosReqMethods(uri,
          function(param) {if(param){

            that.changheHintBoxShow('密码已修改，请重新登录');
            setTimeout(()=> {
              location.href='#/login'
            },2000)

          }
          },
          function (param) {
            if(param && param.response && param.response.data){
              that.changheHintBoxShow(param.response.data.message)
            }
          },null,bodyValue,"PUT")
      },

      changheHintBoxShow(errText){
        this.errModal.forgetPswErrModalFlag = !this.errModal.forgetPswErrModalFlag;
        this.showErrText = errText;
        setTimeout(()=> {
          this.errModal.forgetPswErrModalFlag = false;
        },2000)
      },
      // 查看密码
      changeSeePasswordFlag(){
        this.seePasswordFlag = !this.seePasswordFlag;
      }
    },
    mounted(){
      //获取网站的logo地址
      getPublicConfigData('system_config_logo_main',(params)=>{
        this.logoImageUrl = params.data
      },null,(params)=>{

      })
    }
  }

</script>

<style lang="less">
  .forgetPassword-container{
    position: relative;
    height: 100vh;
    min-height: 720px;
    overflow: hidden;
    background: url(../../../static/images/login_bg.jpg) center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-logo{
      position: absolute;
      left: 100px;
      top: 20px;
    }
    .forgetPassword-box{
      position: absolute;
      padding: 20px 50px;
      right: 300px;
      width: 420px;
      color: rgba(255,255,255,0.8);
      border-radius: 3px;
      background-color: rgba(0,0,0,.4);
      div{
        position: relative;
        .errMessage{
          position: absolute;
        }
      }
      .protocolBox{
        margin: 20px 0;
        text-align: center;
        input{
          vertical-align: middle;
        }
        .protocolText{
          display: inline;
          color: #fff;
          font-size: 12px;
        }
      }
      .forgetPassword-btn{
        margin-top: 30px;
        button{
          width: 320px;
          height: 40px;
          border: none;
          color: #fff;
          letter-spacing: 4px;
          cursor: pointer;
          background-color: #ec6538;
          display: block;
          &:focus{
            outline: none;
          }
          &:active{
            background-color: #cd562e;
          }
        }
      }
      .forgetPassword-header{
        margin-top: 20px;
        letter-spacing: 10px;
        font-size: 18px;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #FFF;
      }
      .forgetPassword-phone,.forgetPassword-code,.forgetPassword-password{
        width: 320px;
        height: 40px;
        margin-top: 30px;
        font-size: 16px;
        background-color: transparent;
        border-radius: 6px;
        outline: none;
        border: 1px solid #ccc;
        color: rgba(255,255,255,0.8);
        text-indent: 24px;
      }
      .borderErrColor{
        border-color: #ed2b30;
      }
      a{
        display: inline-block;
        width: 100px;
        text-align: right;
        cursor: pointer;
        font-size: 14px;
        vertical-align: bottom;
        &:hover{
          text-decoration: underline;
        }
      }
      .forgetPassword-code{
        width: 210px;

      }
    }
    .goLoginBox{
      margin-top: 20px;
      font-size: 14px;
      text-align: right;
      .goLogin{
        color: #ec6538;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .modal-mask .modal-wrapper{
      .modal-container{
        width: 200px;
      }
      .closeModal{
        display: none;
      }
    }


    .password-box{
      position: revert;
      span{
        position: absolute;
        right: 10px;
        top: 40px;
        display: inline-block;
        width: 20px;
        height: 20px;
        z-index: 2;
        cursor: pointer;
      }
      .close-eye{
        background-image: url("../../assets/img/eyes_close.png");
      }
      .open-eye{
        background-image: url("../../assets/img/eyes.png");
      }
    }
    .errMessage{
      color:#f00;
    }
  }

</style>
