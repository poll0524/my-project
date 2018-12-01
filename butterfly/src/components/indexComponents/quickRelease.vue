<template>
	<div class="issue-container box-bottom">
		<div class="issue-content box-maxWidth flex">
			<div class="issue-titlebox">
				<div class="issue-title">快速发布需求</div>
				<div class="issue-small">
					 在这里您可以快速的发布您的需求，让满足您需求的艺人/公司，迅速的与您达成合作。
				</div>
			</div>
			<div class="issue-formbox">
				<form action="">
					<div class="issue-inp">
						<label for="">选择您的需求类型</label>
						<div class="issue-selectbox issue-left">
							<div class="issue-select">
								<select name="" id="" v-model="selectTitle" @change="selectTitleChange()">
									<option value="" disabled=>请选择</option>
									<option :value="index" v-for="(item,index) in classifyData">{{item.name}}</option>
								</select>
								<span class="arrow"></span>
							</div>
							<div class="issue-select">
								<select name="" id="" v-model="selectContent" @change="selectContentChange" v-if="classifyData!=null">
									<option value="" disabled=>请选择</option>
									<option :value="index" v-for="(item,index) in classifyData[selectTitle].childCity">{{item.value}}</option>
								</select>
								<span class="arrow"></span>
							</div>
						</div>
					</div>
					<div class="issue-inp issue-num">
						<label for="">数量</label>
						<input type="text" v-model="quickReleaseData.number" @change="regEXNumberHandler">人
					</div>
					<div class="issue-inp issue-supply">
						<label for="">补充详细信息(选填)</label>
						<div class="issue-textarea issue-left">
							<textarea v-model="quickReleaseData.suppliment"></textarea>
						</div>
					</div>
					<div class="issue-inp">
						<label for="">联系方式</label>
						<input type="tel" maxlength="11" class="issue-phone" v-model="quickReleaseData.phone" @change.paste="regEXPhone">
						<span class="show-warn" v-show="showWarn">该手机号不能快速发布需求</span>
						<input type="text" maxlength="6" class="issue-code" v-model="quickReleaseData.code">
						<div class="code-text">
							<span @click="getCode"  v-if="!showTime">获取验证码</span>
							<span v-if="showTime">重新获取({{count}})</span>
						</div>
					</div>
					<div class="issue-btn">
						<button @click="publishQuickNeeds">快速发布需求</button>
					</div>
				</form>
			</div>
		</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="toggleModal">
			<div slot="body" :class="['quickTips','flex',{'active':successFlag}]">
				<i></i>
				<p v-if="categoryFlag">请确定内容是否输入完成</p>
				<p v-if="!publishFlag">该手机号不能发布</p>
				<p v-if="showMessageFlag">{{showMessage}}</p>
				<p v-if="phoneFlag">请输入正确的手机号</p>
				<p v-if="successFlag ">
					尊敬的用户，您的需求已经发布，请前往登录 进入个人中心 完善此订单
				</p>
				<p v-if="successHasFlag">
					尊敬的用户，您的需求已经发布，请用发布需求的手机号登录，完善需求
				</p>
				<p v-if="samePhoneFlag">尊敬的用户，您的需求已经发布，请前往个人中心完善此订单！</p>
			</div>
			<div slot="footer" class="login-btn"
			v-if="successHasFlag || successFlag" @click="toggleModal">
				<router-link tag="button" to="/Login">前往登录</router-link>
			</div>
			<div slot="footer" class="login-btn"
			v-if="samePhoneFlag" @click="toggleModal">
				<router-link tag="button" to="/NeedsOrder">前往个人中心</router-link>
			</div>
		</ModalItem>
	</div>
</template>
<script>

	import classify from '../../assets/js/classify.js'
	import {formatNumber,regEX,axiosReqGet,getToken,axiosReqPost,base64_encode,getCurrentRole} from '../../assets/js/public.js'

	import ModalItem from '../publicModalComponents/publicModal'

	export default{
		name:'quickRelease',
		data(){
			return{
				classifyData:null,
				timer:null,
				selectTitle:0,
				selectContent:0,
				count:60,
				showTime:false,
				showWarn:false,
				showModal:false,
				categoryFlag:false,
				phoneFlag:false,
				quickReleaseData:{
					type:'',
					number:'',
					suppliment:'',
					phone:'',
					code:''
				},
				publishFlag:true,
				successFlag:false,//没有身份
				successHasFlag:false,//手机号不相同
				samePhoneFlag:false,//有手机号
				showMessage:'',
				showMessageFlag:false
			}
		},
		components:{
			ModalItem
		},
		methods:{
			selectTitleChange(){
				this.quickReleaseData.type = this.classifyData[this.selectTitle].childCity[this.selectContent].value
			},
			selectContentChange(){
				this.quickReleaseData.type = this.classifyData[this.selectTitle].childCity[this.selectContent].value

			},
			//倒计时
			getCode(){
				if(!regEX(this.quickReleaseData.phone).checkPhone){
					this.toggleModal()
					this.phoneFlag = true;
					return;
				}
		          const TIME_COUNT = 60;
		            this.count = TIME_COUNT;
		            this.showTime = true;
		            this.timer = setInterval(() => {
		              if (this.count > 0 && this.count <= TIME_COUNT) {
		                this.count--;
		              } else {
		                this.showTime = false;
		                clearInterval(this.timer);
		                this.timer = null;
		              }
		              this.count = this.count<10?'0'+this.count:this.count
		            }, 1000)
		          let uri = 'sms?phone='+this.quickReleaseData.phone;
		          axiosReqGet(uri,function (param) {

		          },null)
		      },
			//验证手机号
			regEXPhone(){
				if(!regEX(this.quickReleaseData.phone).checkPhone){
					this.toggleModal()
					this.phoneFlag = true;
					return;
				}
				let uri = 'draft/verify/'+this.quickReleaseData.phone;
				let _this = this;
				axiosReqGet(uri,function(params){
					_this.showWarn = !params.result
					_this.publishFlag = params.result;

				},null)
			},
			//验证数量
			regEXNumberHandler(){
				if(!regEX(this.quickReleaseData.number).checkNumber){
					this.quickReleaseData.number = '';
				}
			},
			publishQuickNeeds(e){
				e.preventDefault();
				for(let key in this.quickReleaseData){
					if(key != 'suppliment'&&this.quickReleaseData[key]==''){
						this.toggleModal()
						this.categoryFlag = true
						return
					}
				}
				if(!regEX(this.quickReleaseData.phone).checkPhone){
					this.toggleModal()
					this.phoneFlag = true;
					return;
				}


				if(this.publishFlag){
					//可以发布需求
					this.pulisherNeedsHandler()
				}else{
					this.showModal = !this.showModal
					this.quickReleaseData.phone = '';
				}

			},
			//发布需求
			pulisherNeedsHandler(){
				let _this = this;
				let uri = 'draft';
				let demands = base64_encode(encodeURIComponent(JSON.stringify(this.quickReleaseData)))

				axiosReqPost(uri,function(params){
					_this.checkCertifyHandler()

				},null,demands,null,function(err){


						_this.toggleModal()
						_this.showMessage = err.response.data.message
						_this.showMessageFlag = true
				})
			},
			//判断身份
			checkCertifyHandler(){
				let token = getToken();
				let _this = this;
				if(!token){

					this.successFlag = true
					_this.toggleModal()
				}else{
					getCurrentRole(function(params){
						_this.toggleModal()

						if(_this.quickReleaseData.phone == params.phone){
							_this.samePhoneFlag=true
						}else{
							_this.successHasFlag = true
						}
						_this.quickReleaseData = {
							type:'',
							number:'',
							suppliment:'',
							phone:'',
							code:''
						}
					},(err)=>{

					})
				}
			},
			toggleModal(){
				this.showModal = !this.showModal
				this.categoryFlag = false;
				this.showMessageFlag = false;
				this.phoneFlag = false;
				this.publishFlag = true;
				this.samePhoneFlag=false;
				this.successHasFlag = false;

			},
		},
		mounted(){
			this.classifyData = classify.classify

		},
		watch:{
			classifyData(){
				this.classifyData = classify.classify
			}
		}
	}
</script>

<style lang="less">
	.issue-container{
		width: 100%;
		min-height: 635px;
		background:url(../../../static/images/issue_bg.jpg) center no-repeat;
		background-size: cover;
		color: #fff;
		padding: 25px 0;
		.modal-container{
			/*padding: 10px 0;*/
			/*max-width: 250px;*/
			/*.closeModal{
				display: none;
			}*/
			.quickTips{
				justify-content: center;
				align-items: center;
				i{
					display: inline-block;
					width: 35px;
					height: 35px;
					background: url(../../../static/images/icons.png) no-repeat;
					background-position: -175px -203px;
					margin-right: 10px;
				}
				&.active{
					i{
						background-position: -136px -203px;
					}
				}
			}
			.login-btn{
				text-align: center;
				button{
					height: 40px;
					width: 150px;
					background: #ec6538;
					border:none;
					color: #fff;
					border-radius: 3px;
					cursor: pointer;
					outline: none;
					transition: 0.2s;
					&:active{
						background:#cd562e;
						color: #fff;
					}
				}
			}
		}
		.issue-content{
			flex-direction: column;
			align-items: center;
		}
		.issue-titlebox{
			text-align: center;
			line-height: 30px;
			.issue-title{
				font-size: 24px;
				font-weight: 700;
			}
		}
		.issue-formbox{
			padding: 20px 0;
			color: rgba(255,255,255,0.8);
			form{
				width: 550px;
			}
			.issue-left{
				padding-left: 69px;
			}
			label{
				display: inline-block;
				margin: 0px 10px 10px 0;
				&:before{
					display:inline-block;
					content: '*';
					color:#ec6538;
				}
			}
			.issue-inp{
				margin-bottom: 20px;
				position: relative;
				&.issue-supply{
					label:before{
						content:'';
					}
				}
				.issue-phone{
					margin-left: -5px;
				}
				.show-warn{
					position: absolute;
					bottom: -25px;
					left: 70px;
					color: #ec6538;
				}
				.issue-code{
					width: 95px;
				}
				.code-text{
					display: inline-block;
					vertical-align: bottom;
					color: #ec6538;
					cursor: pointer;
					& span:nth-child(1):hover{
						text-decoration:underline;
					}
				}
			}
			.issue-num{
				input{
					width: 100px;
					text-align: center;
					margin-left: 21px;
					margin-right: 5px;
				}
			}
			.issue-selectbox{
				.issue-select{
					display: inline-block;
					position: relative;
					background:#fff;
					select{
						width: 200px;
						appearance:none;
						position: relative;
						z-index: 1;
						background: transparent;
						option{
							padding-top:10px;
							padding-bottom: 10px;
							min-height: 50px !important;
						}
					}
					.arrow{
						position: absolute;
						width: 40px;
						height: 100%;
						background: #ec6538;
						top: 0;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						&::after{
							display:block;
							content: '';
							width: 10px;
							height: 10px;
							border-right: 2px solid #fff;
							border-bottom: 2px solid #fff;
							transform: rotate(45deg);
							margin-top: -5px;
						}
					}
				}
			}
			input,select,textarea{
				height: 40px;
				padding: 0 10px;
				font-size: 14px;
				color: #546370;
			}
			textarea{
				resize: none;
				width: 400px;
				padding: 10px;
				height: 100px;
				overflow: auto;
			}
			.issue-btn{
				text-align: center;
				padding-top: 45px;
				button{
					height: 65px;
					width: 240px;
					background: transparent;
					border:1px solid #ec6538;
					color: #ec6538;
					font-size: 18px;
					border-radius: 3px;
					cursor: pointer;
					outline: none;
					transition: 0.2s;
					&:active{
						background-color:#ec6538;
						color: #fff;
					}
				}
			}
		}

	}
</style>
