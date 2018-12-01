<template>
	<div class="changePhone-box">
		<TitleItem
		titleName="绑定手机"/>
		<div class="phone-container">
			<StepsItem :stepsTextData="stepsTextData"/>
			<div class="phone-content flex">
				<div class="phone-first" v-if="stepActiveIndex==0">
					<div class="phone-border flex">
						<div class="phone-inpbox">
							<div class="phone-inp-title">请输入您的手机号：</div>
							<div class="phone-inp-flex flex">
								<label for="">原手机号</label>
								<div class="inp">
									<input type="tel" maxlength="11" readonly v-model="oldPhone" @change="oldPhoneErrShow" placeholder="只支持中国地区手机号">
                  <span class="errText" v-if="oldPhoneErrShowFlag">请输入正确的手机号</span>
								</div>
							</div>
							<div class="phone-inp-flex flex">
								<label for="">验证码</label>
								<div class="inp inp-code flex">
									<input type="text" maxlength="6" v-model="oldCode" placeholder="请输入验证码">
                  <div v-show="show" class="phone-code" @click="getCode(oldPhone)">获取验证码</div>
                  <span v-show="!show" class="count">重新获取({{count}}s)</span>
								</div>
							</div>
						</div>
						<div class="phone-btn">
              <a href="#/Security"><button @click="nextStepHandler">返回</button></a>
							<button @click="nextStepHandler">下一步</button>
						</div>
					</div>
					<div class="phone-tips">
						<div class="phone-tips-title">
							手机绑定成功后，您可以享有以下服务：
						</div>
						<ul class="phone-tips-text">
							<li v-for="(item,idx) in tipsData">{{idx+1}}.{{item}}</li>
						</ul>
					</div>
				</div>
				<div class="phone-two" v-if="stepActiveIndex==1">
					<div class="phone-border flex">
						<div class="phone-title-tips">请您查收手机短信，并将验证码填写到下面完成绑定，此服务免费。</div>
						<div class="phone-inpbox">
							<div class="phone-inp-title">请输入您的手机号：</div>
							<div class="phone-inp-flex flex">
								<label for="">新手机号码</label>
								<div class="inp">
									<input type="tel" maxlength="11" v-model="newPhone" @change="newPhoneErrShow" placeholder="只支持中国地区手机号">
                  <span class="errText" v-if="newPhoneErrShowFlag">请输入正确的手机号</span>

								</div>
							</div>
							<div class="phone-inp-flex flex">
								<label for="">验证码</label>
								<div class="inp inp-code flex">
									<input type="text" v-model="newCode" maxlength="6" placeholder="请输入验证码">
									<div v-show="show" class="phone-code" @click="getCode(newPhone)">获取验证码</div>
                  <span v-show="!show" class="count">重新获取({{count}}s)</span>
                  <span class="checkPop" @click="checkPop" v-if="checkPopFalg"></span>
								</div>
							</div>
						</div>
						<div class="phone-btn">
							<button @click="submitChange">提交绑定</button>
						</div>
					</div>
					<div class="phone-tips">
						<div class="phone-tips-title">
							如果您没有收到验证码短信
						</div>
						<ul class="phone-tips-text">
							<li>1.短信到达需要1-2分钟，若您长时间未收到确认短信，建议您重发验证码</li>
							<li>2.如果您的手机号码填写有误或者一直无法完成绑定，建议您<span>更换手机号码</span></li>
						</ul>
					</div>
				</div>
				<div class="phone-three" v-if="stepActiveIndex==2">
					<div class="phone-last">
						<div class="phone-img">
							<img src="../../../../../static/images/bind.png" alt="">
						</div>
						<div class="phone-bindtxt">
							<p>手机号：{{newPhone}}</p>
							<p><span>绑定成功</span><router-link to="/Security" tag="span" class="back">返回</router-link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
    <ModalItem
    :showModal="showModal"
    @changheHintBoxShow="changheHintBoxShow"
    >
      <div slot="body">
        {{hintModalText}}
      </div>
    </ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import {regEX,axiosReqGet,getToken,base64_encode,axiosReqMethods} from '../../../../assets/js/public'

	import TitleItem from '../../titleNameComponents'
	import StepsItem from '../../publicApplyComponents/applySteps'

  import ModalItem from '../../../publicModalComponents/publicModal'

  import {verifyPhoneNum,getCurrentRole} from '../../../../assets/js/public'
	export default{
		name:'installPhone',
		data(){
			return{
				stepsTextData:['填写原手机号','填写新手机号','绑定成功'],
				tipsData:[
					'手机号码登录：可直接使用“手机号码”登录到蝶儿飞网',
					'重要事件提醒：可及时收到短信提醒',
					'手机找回密码：通过手机短信快速找回登录密码等操作',
					'账号保护：在您进行登录及修改密码等敏感操作时，未经您授权的操作将不被允许'
				],
				stepActiveIndex:0,
        show:true,
        count:null,
        oldPhone:null,
        newPhone:null,
        oldCode:null,
        newCode:null,
        timer: null,
        showModal:false,
        hintModalText:null,
        oldPhoneErrShowFlag:false,//原手机号错误标志
        newPhoneErrShowFlag:false,//xin手机号错误标志
        checkPopFalg:true

			}
		},
		components:{
			StepsItem,
			TitleItem,
      ModalItem
		},
		methods:{
		  //验证原手机号
      oldPhoneErrShow(){
        if(!regEX(this.oldPhone).checkPhone){
          this.oldPhoneErrShowFlag = true;
        }else {
          this.oldPhoneErrShowFlag = false;
        }
      },
      //验证新手机号
      newPhoneErrShow(){
        if(!regEX(this.newPhone).checkPhone){
          this.newPhoneErrShowFlag = true;
        }else {
          this.newPhoneErrShowFlag = false;

          verifyPhoneNum(this.newPhone,(params)=>{
            this.checkPopFalg = false; //获取验证码的蒙层
          },(params)=>{
            this.changheHintBoxShow('该手机号已经注册，请更换其他的手机号');
            this.checkPopFalg = true;
          })

        }
      },

			nextStepHandler(){
        // if(!regEX(this.oldPhone).checkPhone){
        //   this.changheHintBoxShow("请输入正确的手机号")
        //   return
        // }
			  const that = this;
			  if(this.oldCode && this.oldCode.length ===6){
          let uri = 'user/verify/phone?phone='+this.oldPhone+'&code='+this.oldCode;
          let token = getToken()
          axiosReqGet(uri,function (param) {
            if(param.result == true){
              that.changeStepActiveIndex()
              that.show = true
            } else {
              that.changheHintBoxShow("手机或验证码不正确，请输入当前登录的手机号")
            }
          },token,(params)=>{
            // console.dir(params.response.data.message)
            that.changheHintBoxShow(params.response.data.message)
          })
        }else {
          that.changheHintBoxShow('请输入6位验证码！')
        }
			},

      changeStepActiveIndex(){
        this.stepActiveIndex = 1;
        this.$store.dispatch('stepsToChange',this.stepActiveIndex)
      },

			submitChange(){
        if(!regEX(this.newPhone).checkPhone){
          this.changheHintBoxShow('请输入正确的手机号');
          return
        }
        if(this.newCode && this.newCode.length != 6){
          this.changheHintBoxShow('请输入6位数验证码');
          return
        }
			  let uri = 'user/phone';
			  let token = getToken();
			  const that = this;
			  const bodyValueObj ={
			    phone_old : this.oldPhone,
          phone_new : this.newPhone,
          code      : this.newCode,
        }
        let bodyValue = base64_encode(encodeURIComponent(JSON.stringify(bodyValueObj)));
        axiosReqMethods(uri,(param)=>{
          if(param){
            this.stepActiveIndex=2;
            this.$store.dispatch('stepsToChange',this.stepActiveIndex)
          }
        },(param)=>{
          // this.changheHintBoxShow(param.response.data.message)
          this.changheHintBoxShow("更换失败，请检查手机号与验证码是否正确");
        },token,bodyValue,'PUT');
			},

      //  获取验证码
      getCode(value){

        if(regEX(value).checkPhone === true){
          let uri = 'sms?phone='+value;
          axiosReqGet(uri,(param)=> {
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
          },null,(param)=>{
            this.changheHintBoxShow(param.response.data.message)
          })
        }else {
          this.changheHintBoxShow('请输入正确的手机号')
        }
      },

      changheHintBoxShow(hintText){
			  this.showModal = !this.showModal;
        this.hintModalText = hintText;
      },
      getCurrentRoleSuc(params){
        this.oldPhone = params.phone;
      },
      checkPop(){
        // this.changheHintBoxShow('该手机号已经注册，请更换其他的手机号');
      }
		},
    mounted(){
      getCurrentRole(this.getCurrentRoleSuc,function () {});
    }
	}
</script>

<style lang="less">
  .changePhone-box{
    .phone-container{
      padding: 0 40px;
      .phone-content{
        justify-content: center;
        padding: 20px 0;
        .phone-first,.phone-two{
          flex:1;
        }
        .phone-inp-title{
          font-weight: 700;
          padding-bottom: 20px;
        }
        .phone-inp-flex{
          position: relative;
          align-items: center;
          margin-bottom: 20px;
          label{
            text-align: right;
            margin-right: 20px;
            width: 80px;
          }
          input{
            height: 40px;
            border-radius: 3px;
            border: 1px solid #999;
            padding-left: 5px;
            width: 300px;
          }
          .inp-code{
            flex:1;
            align-items: flex-end;
            input{
              width: 150px;
            }
            .phone-code{
              color:#ec6538;
              padding-left: 20px;
              cursor: pointer;
              &:hover{
                text-decoration:underline;
              }
            }
          }
          .errText{
            position: absolute;
            left: 100px;
            color: #f00;
          }
          .checkPop{
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 40px;
            right: 50px;
            top: 0;
          }
        }
        .phone-btn{
          text-align: center;
          button{
            width: 100px;
            height: 40px;
            border:none;
            background: #ec6538;
            color:#fff;
            cursor: pointer;
            transition: 0.3s;
            &:hover{
              background:#cd562e;
            }
          }
        }
        .phone-border{
          border-bottom: 2px dashed #999;
          padding-bottom: 20px;
          flex-direction: column;
          align-items: center;
          .phone-title-tips{
            padding-bottom: 20px;
            align-self: flex-start;
            padding-left: 20px;
          }
        }

      }
      .phone-tips{
        padding: 20px;
        .phone-tips-title{
          font-weight: 700;
          padding-bottom: 10px;
        }
        .phone-tips-text{
          color:#999;
          padding-left: 20px;
          line-height: 25px;
          span{
            color: #0018ff;
          }
        }
      }
      .phone-three{
        padding-top: 50px;
        .phone-bindtxt{
          color: #ec6538;
          padding: 20px 0;
          line-height: 25px;
          text-align: center;
          p:last-child{
            span:last-child{
              margin-left:25px;
              color: #546370;
              cursor: pointer;
              &:hover{
                text-decoration:underline;
              }
            }
          }
        }
      }
    }
    .modal-container{
      width: 200px;
    }
    .steps-container{
      .flex-box .flex-item .flex-num {
        background-color: #ec6538!important;
      }
    }

  }

</style>
