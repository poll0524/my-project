<template>
	<div class="login-inpbox">
		<div class="login-inp">
			<input type="text" placeholder="请输入手机号码" v-model="phone" :class="[showMessage?'borderErrColor':'']" @change="phoneChange" @keyup.delete="phoneChange">
      <span class="errMessage" v-if="showMessage">手机号不正确</span>
		</div>
		<div class="login-inp login-code orange-color">
			<input type="text" placeholder="请输入验证码" maxlength="6" v-model="phoneCode" @keyup.enter="enterLoginSubmit" @change="phoneCodeChange">
      <span class="errMessage" v-if="showCodeFlag">请输入正确的验证码</span>
			<a href="javascript:;" class="orange-color" v-show="show" @click="getCode" >获取验证码</a>
      <span v-show="!show" class="count">重新获取({{count}}s)</span>
		</div>
    <ModalItem
      :showModal="showModal"
      @changheHintBoxShow="changheHintBoxShow"
    >
      <div slot="body">
        {{showModalErrText}}
      </div>
    </ModalItem>
	</div>
</template>
<script>
  import {axiosReqGet,regEX} from '../../assets/js/public'
  import ModalItem from '../publicModalComponents/publicModal'
	export default{
		name:'quickLogin',
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
				phone:'',
				phoneCode:'',
        showMessage:false,
        showCodeFlag:false,
        show: true,
        count: '',
        timer: null,
        showModal:false,
        showModalErrText:null
			}
		},
		methods:{
			phoneChange(){
        if(!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.phone)){
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
        this.$emit('quickPhoneChange',this.phone)
			},
			phoneCodeChange(){
			  if(this.phoneCode.length < 6){
          this.showCodeFlag = true;
        }else {
          this.showCodeFlag = false;
        }
        this.$emit('getLoginClode',this.phoneCode)
			},
      enterLoginSubmit(){
			  this.$emit('loginSubmit')
      },

      getCode(){
        if(!regEX(this.phone).checkPhone){
            this.showMessage = true;
            return
        }
        let uri = 'sms?phone='+this.phone;
        axiosReqGet(uri,(param)=>{
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          },null,(params)=>{
          this.changheHintBoxShow(params.response.data.message)
        })
      },

      changheHintBoxShow(errtext){
        this.showModalErrText = errtext;
        this.showModal = !this.showModal;
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
      .borderErrColor{
        border-color: #ed2b30;
      }
      .errMessage{
        position: absolute;
        color: #ed2b30;
        top:46px;
        left: 0;
      }
      .count{
        display: inline-block;
        font-size: 14px;
        text-align: right;
        vertical-align: bottom;
      }

    }
    .login-code{
      input{
        width: 200px;
        font-size: 16px;
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

    }

  }

</style>
