<template>
	<div class="psw-container">
		<TitleItem
		titleName="设置/修改密码"/>
		<div class="password-container">
			<RemarkItem :remarkText="remarkText"/>
			<div class="password-content">
				<div class="psw-flex flex">
					<label for="">手机号</label>
					<div class="flex-item">
						<input type="tel" v-model="phoneNum" readonly @blur="showErrMessage">
            <span style="color: #f00;" v-if="showErrMessageFlag">请输入正确的手机号</span>
					</div>
				</div>
				<div class="psw-flex psw-code flex">
					<label for="">验证码</label>
					<div class="flex-item flex">
						<input type="tel" v-model="codeNum">
						<div v-show="show" class="flex-code" @click="getCode">获取验证码</div>
            <span v-show="!show" class="count">重新获取({{count}}s)</span>
					</div>
				</div>
				<div class="psw-flex flex-new flex">
					<label for="">设置新密码</label>
					<div class="flex-item">
						<input :type="eyeState?'text':'password'" v-model="password_new" placeholder="请输入6-16个字符,支持数字，字母">
					</div>
					<div class="psw-tips">
						如何设置高强度的密码？<i></i>
					</div>
					<div class="psw-tips-box">
						<span>6-16</span>字符，包括字母、数字密码不能包含<span>用户名</span>，不要使用<span>连续或重复</span>的数字/字符作为密码
					</div>
				</div>
				<div class="psw-flex flex">
					<label for="">确认新密码</label>
					<div class="flex-item">
						<input :type="eyeState?'text':'password'" v-model="password_new_again" placeholder="请再次输入您的新密码">
            <span :class="eyeState?'eye open-eye':'eye close-eye'" @click="changeEyeState"></span>
					</div>
				</div>
				<div class="psw-btn">
          <!--<a href="#/Security"><button >返回</button></a>-->
          <button @click="submitPassword">修改</button>
        </div>
			</div>
		</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="showModalHandler">
			<div :class='[successFalg?"success-tips":"error-tips"]' slot="body">
				{{popText}}
			</div>
		</ModalItem>
	</div>
</template>

<script>
  import {axiosReqGet,axiosReqMethods,getToken,base64_encode,regEX,getCurrentRole} from '../../../../assets/js/public'

  import md5 from 'js-md5'
	import RemarkItem from '../../remarkComponents'
	import TitleItem from '../../titleNameComponents'
	import ModalItem from '../../../publicModalComponents/publicModal'

	export default{
		name:'installPsw',
		data(){
			return{
				remarkText:'安全提醒：请妥善保管密码！蝶儿飞网工作人员不会以任何理由向您索取密码',
				showModal:false,
        show:true,
        phoneNum:null,
        count:null,
        codeNum:null,
        password_new:null,
        password_new_again:null,
        popText:'',
        successFalg:false,
        showErrMessageFlag:false,
        eyeState:false

			}
		},
		components:{
			RemarkItem,
			TitleItem,
			ModalItem
		},
		methods:{
			showModalHandler(param){
			  this.popText = param;
				this.showModal = !this.showModal
        setTimeout(()=> {
          this.showModal = false
        },2000)
			},
      showErrMessage(){
        if(!regEX(this.phoneNum).checkPhone){
          this.showErrMessageFlag = true;
        } else {
          this.showErrMessageFlag = false;
        }
      },
      //提交修改
      submitPassword(){
      	if(this.phoneNum == null || !regEX(this.phoneNum).checkPhone){
      		this.showModalHandler('请输入正确的手机号')
      		return
      	}
      	if(this.codeNum == null || this.codeNum.length<6){
      		this.showModalHandler('请输入正确的验证码')
      		return;
      	}
      	if(!this.password_new|| !this.password_new_again ||this.password_new.length > 12 || this.password_new.length < 6){
      		this.showModalHandler('请输入6-12位密码')
      		return
      	}
      	if(this.password_new != this.password_new_again){
      		this.showModalHandler('您输入的密码不一致')
      		return
      	}

        let uri = 'user/password';
        if(regEX(this.phoneNum).checkPhone){
          let uri = 'user/password';
          const bodyValueObj = {
            phone:this.phoneNum,
            code:this.codeNum,
            password_new:md5(this.password_new?this.password_new:''),
            password_new_again:md5(this.password_new_again?this.password_new_again:"")
          };
          let bodyValue = base64_encode(JSON.stringify(bodyValueObj));
          var that = this;
          axiosReqMethods(uri,
            function(param) {
              if(param){
                that.showModalHandler('密码修改成功！');
                that.successFalg = true;
                setTimeout(()=> {
                  location.href='#/Security'
                },1999)
              }
            },
            function (param) {
              if(param && param.response && param.response.data){
                that.showModalHandler(param.response.data.message)
              }
            },null,bodyValue,"PUT")

        }else {
          this.showModalHandler('请输入正确的手机号');
          setTimeout(()=> {
            this.showModal = false
          },2000)
        }

      },
      //获取验证码
      getCode(){
        if(regEX(this.phoneNum).checkPhone){
            let uri = 'sms?phone='+this.phoneNum;
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
            this.showModalHandler(param.response.data.message)
            })
        }else {
          this.showModalHandler("请输入正确的手机号")
        }
      },
      //是否查看密码
      changeEyeState(){
        this.eyeState = !this.eyeState
      },
      getCurrentRoleSuc(params){
			  this.phoneNum = params.phone
      }
    },
    mounted(){
      getCurrentRole(this.getCurrentRoleSuc,function () {});
    }
	}
</script>

<style lang="less">
	.psw-container{
		.password-content{
			padding: 20px 160px;
			.psw-flex{
				margin-bottom: 20px;
				align-items: center;
				position: relative;
				label{
					width: 80px;
					margin-right: 20px;
					flex-shrink: 0;
				}
				input{
					height: 40px;
					width: 300px;
					border-radius: 3px;
					border:1px solid #999;
					padding-left: 5px;
				}
				.flex-item{
          position: relative;
					flex:1;
          .eye{
            position: absolute;
            right: 210px;
            top: 10px;
            display: inline-block;
            width: 20px;
            height: 20px;
            z-index: 2;
            cursor: pointer;
            filter: contrast(0);
          }
          .close-eye{
            background-image: url("../../../../assets/img/eyes_close.png");
          }
          .open-eye{
            background-image: url("../../../../assets/img/eyes.png");
          }
				}
				.psw-tips{
					position: relative;
					color: #0018ff;
					margin-left: 20px;
					cursor: pointer;
					i{
						display: inline-block;
						width: 20px;
						height: 20px;
						background: url(../../../../../static/images/icons.png) no-repeat;
						background-position: -227px -85px;
						vertical-align: middle;
					}
				}
				.psw-tips:hover+.psw-tips-box{
					opacity: 1;
				}
				.psw-tips-box{
					position: absolute;
					color: #546370;
					background: #fff;
					border:1px solid #ec6538;
					border-radius: 3px;
					padding: 15px;
					width: 300px;
					line-height: 20px;
					top: 45px;
	    			right: -120px;
					transition: 0.3s;
					opacity: 0;
					span{
						color: #ec6538;
					}
					&::after{
						display: block;
						position: absolute;
						content: '';
						width: 15px;
						height: 15px;
						border-top: 1px solid #ec6538;
						border-right: 1px solid #ec6538;
						background: #fff;
						transform: rotate(-45deg);
						left: 40px;
						top: -9px;
					}
				}
				&.psw-code{
					.flex-item{
						align-items: flex-end;
						input{
							width: 150px;
						}
						.flex-code{
							margin-left: 20px;
							color: #ec6538;
							cursor: pointer;
							&:hover{
								text-decoration:underline;
							}
						}
					}
				}
				&.flex-new{
					.flex-item{
						flex:none;
					}
				}

			}
			.psw-btn{
				/*text-align: center;*/
        margin-left: 100px;
				padding: 20px 0;
				button{
						width: 150px;
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
		}
		.modal-container{
			width: 250px;
			padding: 20px 0;
      text-align: center;
		}

		.success-tips{
			text-align: center;
			font-size: 14px;
			i{
				display: inline-block;
				width: 30px;
				height: 30px;
				background: url(../../../../../static/images/icons.png) no-repeat;
				background-position: -138px -202px;
				vertical-align: text-bottom;
			}
		}
    .ModalBtn{
      text-align: center;
      button{
        background-color: #ec6538;
        color: #fff;
        border: none;
        outline: none;
        height: 40px;
        width: 100px;
        cursor: pointer;
        &:hover{
          background-color: #cd562e;
        }
      }
    }
    .count{
      display: inline-block;
      font-size: 14px;
      margin-left: 20px;
      text-align: right;
      vertical-align: bottom;
    }
    .closeModal{
      display: none;
    }
	}
</style>
