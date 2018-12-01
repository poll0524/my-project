<template>
    <div class="register-container">
      <div class="login-logo" ref="logo">
        <router-link to="/Index"><img :src="logoImageUrl" alt=""></router-link>
      </div>
      <div class="register-box">
        <form action="">
          <p class="register-header">用户注册</p>
          <div>
            <input type="tel" class="register-phone" v-model="registerPhone" :class="[showPhoenMessage||showPhoenRegisterMessage?'borderErrColor':'']" @blur="phoneChange" placeholder="请输入手机号码" >
            <span class="errMessage" v-if="showPhoenMessage">请输入正确的手机号</span>
            <span class="errMessage" v-if="showPhoenRegisterMessage">该手机号已经注册</span>

          </div>
          <div>
            <input type="tel" class="register-code" v-model="registerCode" :class="[showCodeFlag?'borderErrColor':'']" @blur="phoneCodeChange" placeholder="请输入验证码">
            <a href="javascript:;" class="orange-color" v-show="codeShowBtn" @click="codeTimeBtn">获取验证码</a>
            <span class="errMessage" v-if="showCodeFlag">请输入6位验证码</span>
            <span v-show="!codeShowBtn" class="codeCount">重新获取({{codeCount}}s)</span>
          </div>
          <div>
            <div class="password-box">
              <input :type="[seePasswordFlag?'password':'text']"  class="register-password" v-model="registerPassword1" placeholder="请输入登录密码">
              <!--<span :class="[seePasswordFlag?'':'close-eye']"></span>-->
              <span class="errMessage" v-if="showPasswordMessage">请输入两次相同密码</span>
            </div>
            <div class="password-box">
              <input :type="[seePasswordFlag?'password':'text']" class="register-password" v-model="registerPassword2" placeholder="请再输入一次密码">
              <span :class="[seePasswordFlag?'open-eye eye':'close-eye eye']" @click="changeSeePasswordFlag"></span>
            </div>
            <!--<span class="errMessage">两次密码不一致</span>-->
          </div>
          <p class="protocolBox">
            <input type="checkbox" :checked="orchecked" @click="clickCheckbox">
            <router-link to="agreement" class="protocolText">同意《平台用户协议》</router-link>
          </p>
          <div class="register-btn">
            <button type="button" class="" @click="registerAcc">立即注册</button>
          </div>
        </form>
        <div class="goLoginBox">
          <a href="#/login" class="goLogin">已有账号？登录</a>
        </div>
      </div>
      <div class="login-filingNumber">
        <a class="login-filingNumber-to" href="http://www.miitbeian.gov.cn/" target="_blank">Copyright© 2018蝶儿飞 蜀ICP备16012455号-2</a>
      </div>
      <ModalItem
        :showModal="hintShowflag"
        @changheHintBoxShow="changeRegisterHintBox"
      >
        <div slot="body">
          {{hintShowText}}
        </div>
      </ModalItem>

    </div>
</template>

<script>
  import {axiosReqGet,base64_encode,axiosReqPost,verifyPhoneNum,regEX,getPublicConfigData} from '../../assets/js/public'
  import ModalItem from '../publicModalComponents/publicModal'
  import md5 from  'js-md5'
    export default {
      name: "register",
      components:{
        ModalItem
      },
      data(){
        return{
          registerPhone:null,
          registerCode:'',
          orchecked:true,
          registerPassword1:'',
          registerPassword2:'',
          showPhoenMessage:false,
          showPhoenRegisterMessage:false,
          showPasswordMessage:false,
          showCodeFlag:false,
          codeShowBtn: true,
          codeCount: '',
          codeTimer: null,
          seePasswordFlag:true,
          hintShowflag:false,
          hintShowText:null,
          logoImageUrl:'',

        }
      },
      methods:{
        phoneChange(){
          if(!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.registerPhone)){
            this.showPhoenMessage = true;
            this.showPhoenRegisterMessage = false;
            return
          } else {
            this.showPhoenMessage = false;
            this.showPhoenRegisterMessage = false;
          }
        },
        phoneCodeChange(){
          if(this.registerCode.length != 6){
            this.registerCode = "";
            this.showCodeFlag = true
          }else {
            this.showCodeFlag = false
          }
        },
        //点击后去验证码验证
        codeTimeBtn(){
          if(!regEX(this.registerPhone).checkPhone){
              this.showPhoenMessage = true;
              this.showPhoenRegisterMessage = false;
              return
          }
          verifyPhoneNum(this.registerPhone,this.verifySucFun,this.verifyErrFun)

        },
        verifySucFun(){
          let uri = 'sms?phone='+this.registerPhone;
          axiosReqGet(uri,(param)=>{
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
          },null)
        },

        verifyErrFun(params){
          // console.log(params.response.data.messahege)
          this.showPhoenRegisterMessage = true;
          return
        },

        clickCheckbox(){
          this.orchecked = !this.orchecked
        },

        registerAcc(){
          if(!regEX(this.registerPhone).checkPhone){
            this.changeRegisterHintBox('请输入正确的手机号')
            this.showPhoenMessage = false;
            return
          }
          if(this.registerPassword1 && this.registerPassword2
            && this.registerPassword1 == this.registerPassword2){
            this.showPasswordMessage = false;
          }else {
            this.showPasswordMessage = true;
            return
          }
          if(this.registerCode.length != 6){
            this.showCodeFlag = true
            return
          }

          if(this.orchecked){


            let uri = 'user';
            let bodyValueObj = {
                phone:this.registerPhone,
                code:this.registerCode,
                password:md5(this.registerPassword1),
                roles:'02'
              };

            let union_id = sessionStorage.getItem('union_id');
            let uid = sessionStorage.getItem('uid');
            if(union_id){
              bodyValueObj.union_id=union_id
            }
            if(uid){
              bodyValueObj.uid=uid
            }

              let bodyValue = base64_encode(JSON.stringify(bodyValueObj));
              axiosReqPost(uri,(param)=> {
                if(sessionStorage.getItem('union_id')){
                  // sessionStorage.setItem('union_id','');
                  this.changeRegisterHintBox('注册成功且微信绑定成功')
                }else {
                  this.changeRegisterHintBox('注册成功，即将自动前往登录页登录')
                }
                setTimeout(()=> {
                  location.href = '#/login';
                },1990)
              },null,bodyValue,null,(param)=> {

                this.changeRegisterHintBox(param.response.data.message)
              })
          }else {
            this.changeRegisterHintBox('请勾选同意平台协议')
          }
        },
        changeSeePasswordFlag(){
          this.seePasswordFlag = !this.seePasswordFlag;
        },
      //改变弹框样式
        changeRegisterHintBox(errtext){
          this.hintShowText = errtext;
          this.hintShowflag = !this.hintShowflag;
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
    .register-container{
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
      .register-box{
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
            color: #f00;
            left: 0px;
            bottom: -20px;
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
        .register-btn{
          button{
            width: 320px;
            height: 40px;
            border: none;
            color: #fff;
            font-size: 18px;
            letter-spacing: 4px;
            background-color: #ec6538;
            cursor: pointer;
            &:focus{
              outline: none;
            }
            &:active{
              background-color: #cd562e;
            }
          }
        }
        .register-header{
          margin-top: 20px;
          letter-spacing: 10px;
          font-size: 20px;
          text-align: center;
          height: 40px;
          border-bottom: 1px solid #FFF;
        }
        .register-phone,.register-code,.register-password{
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
        .register-code{
          width: 215px;

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
      .login-filingNumber{
        position: absolute;
        bottom: 50px;
        .login-filingNumber-to{
          color: #999;
        }
      }
      .password-box{
        position: revert;
        .eye{
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
      .modal-container{
        max-width: 200px;
      }
    }

</style>
