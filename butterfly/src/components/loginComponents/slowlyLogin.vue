<template>
	<div class="login-inpbox">
		<div class="login-inp">
			<input type="text" placeholder="请输入手机号码" v-model="accountNumber" @change="phoneChange" @blur="verifyPhone">
      <span class="errtext" v-if="phoneErrFlag">请输入正确的手机号</span>
		</div>
		<div class="login-inp login-psw orange-color">
			<input :type="showPassword?'password':'text'" placeholder="请输入密码" @keyup.enter="enterLoginSubmit" v-model="password" @change="phoneCodeChange">
      <span class="see-password-box see" :class="showPassword?'see':'no-see'" @click="lookPassword"></span>
		</div>
    <ModalItem
    :showModal="slowlyLoginModalFlag"
    @changheHintBoxShow="slowlyLoginModalShow"
    >
    <div slot="body">
      {{slowlyLoginErrText}}
    </div>
    </ModalItem>
	</div>
</template>

<script>
  import {regEX} from '../../assets/js/public'
  import ModalItem from '../publicModalComponents/publicModal'
	export default{
		name:'slowlyLogin',
    components:{
      ModalItem
    },
		props:{
			'quickPhoneChange':{
				type:Function
			},
			'getLoginClode':{
				type:Function
			},
      'loginSubmit':{
			  type:Function
      }
		},
		data(){
			return{
				accountNumber:'',
				password:'',
        showPassword:true,
        slowlyLoginModalFlag:false,
        slowlyLoginErrText:null,
        phoneErrFlag:false,
			}
		},
		methods:{
			phoneChange(){
				this.$emit('quickPhoneChange',this.accountNumber)

			},
			phoneCodeChange(){
				this.$emit('getLoginClode',this.password)
			},
      enterLoginSubmit(){
			  this.$emit('loginSubmit')
      },
      lookPassword(){
			  this.showPassword = !this.showPassword
      },
      verifyPhone(){
        if(!regEX(this.accountNumber).checkPhone){
          this.phoneErrFlag = true
        }else {
          this.phoneErrFlag = false
        }
      },
      slowlyLoginModalShow(errText){
			  this.slowlyLoginErrText = errText;
        this.slowlyLoginModalFlag = !this.slowlyLoginModalFlag;
      }
		}
	}
</script>

<style scoped lang="less">
  *{
    transition: 0.3s;
  }
  .login-inpbox{
    .login-inp{
      position: relative;
      margin: 15px 0 35px;
      input{
        width: 300px;
        height: 40px;
        font-size: 16px;
        background-color: transparent;
        border-radius: 6px;
        outline: none;
        border: 1px solid #ccc;
        color: rgba(255,255,255,0.8);
        text-indent: 24px;
        &:hover{
          border-color: #fff;
        }
        &:focus{
          border-color: #ec6538;
        }
      }
    }
    .login-psw{
      position: relative;
      .see-password-box{
        position: absolute;
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        top:10px;
        right: 30px;
      }
      .see{
        background-image: url("../../assets/img/eyes.png");
      }
      .no-see{
        background-image: url("../../assets/img/eyes_close.png");
      }
    }
    .errtext{
      color: #f00;
      position: absolute;
      left: 0;
      top: 40px;
    }
  }
</style>
