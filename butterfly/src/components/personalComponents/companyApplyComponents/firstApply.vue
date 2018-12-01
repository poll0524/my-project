<template>
	<div class="apply-company-first flex">
		<div class="apply-first-content">
			<div class="apply-company-flex flex">
				<label for="">公司全称</label>
				<div class="apply-company-flexitem">
					<input type="text" placeholder="请输入公司全称" v-model="companyData.full_name">
				</div>
			</div>
			<div class="apply-company-flex flex">
				<label for="">公司简称</label>
				<div class="apply-company-flexitem">
					<input type="text" placeholder="请输入公司简称" v-model="companyData.simple_name">
				</div>
			</div>
			<div class="apply-company-flexbox flex">
				<div class="apply-company-flex flex">
					<label for="">企业属性</label>
					<div class="apply-company-flexitem">
						<select name="" id="" v-model="companyData.type">
							<option value="" disabled>请选择</option>
							<option value="国有企业">国有企业</option>
							<option value="集体所有制">集体所有制</option>
							<option value="私营企业">私营企业</option>
							<option value="股份制企业">股份制企业</option>
							<option value="有限合作企业">有限合作企业</option>
							<option value="联营企业">联营企业</option>
							<option value="外商投资企业">外商投资企业</option>
							<option value="个人独资企业">个人独资企业</option>
							<option value="港、澳、台">港、澳、台</option>
							<option value="股份合作企业">股份合作企业</option>
						</select>
						<span class="color-arrow inp-arrow"></span>
					</div>
				</div>
				<div class="apply-company-flex flex">
					<label for="">企业类型</label>
					<div class="apply-company-flexitem">
						<select name="" id="" v-if="!showSelect" v-model="companyData.company_type">
							<option value="" disabled selected>请选择</option>
							<option value="0">演出公司</option>
							<option value="1">公关公司</option>
							<option value="2">广告公司</option>
							<option value="3">婚庆礼仪公司</option>
						</select>
						<select name="" id="" @change="companyTypeChange" v-if="showSelect" v-model="companyData.company_type.value">
							<option value="" disabled selected>请选择</option>
							<option value="0">演出公司</option>
							<option value="1">公关公司</option>
							<option value="2">广告公司</option>
							<option value="3">婚庆礼仪公司</option>
						</select>
						<span class="color-arrow inp-arrow"></span>
					</div>
				</div>
			</div>
			<div class="apply-company-flexbox flex">
				<div class="apply-company-flex flex">
					<label for="">从业年限</label>
					<div class="apply-company-flexitem">
						<input type="text" maxlength="8" value="0" v-model="companyData.life" @change="checkNumber">
						<span class="text-arrow color-arrow">年</span>
					</div>
				</div>
				<div class="apply-company-flex flex">
					<label for="">人数规模</label>
					<div class="apply-company-flexitem">
						<input type="text" maxlength="8" value="0" v-model="companyData.number" @change="checkNumber">
						<span class="text-arrow color-arrow">人</span>
					</div>
				</div>
			</div>
			<div class="apply-company-flex apply-addr flex">
				<label for="">所在城市</label>
				<div class="apply-company-flexitem">
					<v-distpicker
						v-if="companyInfoData"
						 @selected="onSelected"
						 :province="selectAddr.province"
						 :city="selectAddr.city"
						 :area="selectAddr.area"></v-distpicker>
					<v-distpicker v-if="!companyInfoData" @selected="onSelected"></v-distpicker>
					<span class="color-arrow inp-arrow"></span>
					<span class="color-arrow inp-arrow"></span>
					<span class="color-arrow inp-arrow"></span>
				</div>
			</div>
			<div class="apply-company-flex flex">
				<label for="">营业执照注册码</label>
				<div class="apply-company-flexitem">
					<input type="text" placeholder="统一社会信用代码" v-model="companyData.license_num" @change="checkNumber">
				</div>
			</div>
			<div class="apply-company-flex flex">
				<label for="">营业执照地址</label>
				<div class="apply-company-flexitem">
					<input type="text" placeholder="请输入地址" v-model="companyData.license_address">
				</div>
			</div>
			<div class="apply-company-flex flex-intro flex">
				<label for="">企业简介</label>
				<div class="apply-company-flexitem text-control">
					<textarea placeholder="请输入公司简介" maxlength="250" v-model="companyData.intro"></textarea>
					<span>{{companyData.intro.length}}/250</span>
				</div>
			</div>
			<div class="apply-company-btns flex" @click="nextToTwoHandler">
				<button>下一步</button>
				<!-- <router-link tag="button" to="/CompanyTwoStep">下一步</router-link> -->
			</div>
		</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal">
			<div slot="body" class="warning-tips flex"><i></i>请确保所有项都填写完整</div>
		</ModalItem>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import {regEX} from '../../../assets/js/public.js';

	import LinkageItem from '../../linkageComponents/linkageComponents'
	import address from '../../../assets/js/address.js'
	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'companyFirst',
		props:['companyInfoData'],
		data(){
			return{
				showModal:false,
				showSelect:false,
				companyData:{//公司申请信息
					type:'',
					simple_name:'',
					full_name:'',
					life:'',
					number:'',
					hometown:'',
					license_num:'',
					license_address:'',
					intro:'',
					company_type:''
				},
				selectAddr:{
					province:'',
					city:'',
					area:''
				}
			}
		},
		components:{
			LinkageItem,
			ModalItem
		},
		computed:{
			...mapGetters({
				showCompanyData:'showCompanyData'
			})
		},
		methods:{
			...mapActions({
				stepsToChange:'stepsToChange',
				changeToCompanyType:'changeToCompanyType'
			}),
			onSelected(data) {
				if(data.province.value == '台湾省'){
		      		this.companyData.hometown=data.province.value
				}else if(data.province.value == '省' || data.city.value=='市' || data.area.value=='区'){
					this.companyData.hometown = ''
				}else{
		      		this.companyData.hometown=data.province.value+','+data.city.value+','+data.area.value
				}
		    },
		    //验证数字
		    checkNumber(){
		    	if(!regEX(Number(this.companyData.life)).checkNumber){
					this.companyData.life='';
					return;
				}
				if(!regEX(Number(this.companyData.number)).checkNumber){
					this.companyData.number='';
					return;
				}
				if(!/^[0-9a-zA-Z]+$/.test(this.companyData.license_num)){
					this.companyData.license_num='';
					return;
				}
		    },
		    //公司类型改变
		    companyTypeChange(){
		    	this.changeToCompanyType(this.companyData.company_type.value)
		    },
		    nextToTwoHandler(){
		    	for(let key in this.companyData){
		    		if(this.companyData[key] == ''){
		    			this.showModal = !this.showModal
		    			setTimeout(()=>{
		    				this.showModal = false
		    			},3000)
		    			return;
		    		}
		    	}
		    	this.stepsToChange({data:this.companyData,type:'company',idx:1})
		    }
		},
		mounted(){
			if(this.companyInfoData){
				this.companyData = this.companyInfoData
				this.companyData.full_name = this.companyInfoData.fullName;
				this.companyData.simple_name = this.companyInfoData.simpleName;
				this.companyData.company_type = this.companyInfoData.companyType;
				this.companyData.license_address = this.companyInfoData.liceseAddress;
				this.companyData.license_num = this.companyInfoData.licenseNumber;
				this.companyData.intro = this.companyInfoData.introduction;
				this.companyData.hometown = this.companyData.hometown.split(',')
				this.selectAddr = {
					province:this.companyData.hometown[0],
					city:this.companyData.hometown[1],
					area:this.companyData.hometown[2]
				}
				this.showSelect = true
			}
		}
	}
</script>

<style lang="less">
	.apply-company-first{
		justify-content: center;
		padding: 30px 20px;
		.apply-first-content{
			width: 620px;
			overflow: hidden;
			label{
				margin-right: 20px;
				width: 110px;
				text-align: right;
				position: relative;
				&::before{
					display:inline-block;
					content:'*';
					color: #ec6538;
					font-weight: 700;
				}
			}
			textarea,input,select{
				width: 470px;
				border-radius: 3px;
				border:1px solid #999;
				outline: none;
			}
			input,select{
				height: 40px;
				color: #546370;
				padding-left: 10px;
			}
			textarea{
				resize: none;
				height: 130px;
				overflow: auto;
				padding:5px;
			}
			.apply-company-flexbox,.apply-addr{
				input,select{
					width: 150px;
					position: relative;
					background: transparent;
					z-index: 1;
					appearance:none;
				}
				input{
					/*padding-left: 50px;*/
				}
				select{
					padding-right: 40px;
					max-width: 170px;
				}
			}
			.apply-addr{
				.apply-company-flexitem{
					position: relative;
					span.inp-arrow{
						&:nth-child(2){
							right: 67.4%;
						}
						&:nth-child(3){
							right: 33.8%;
						}
					}
				}
			}
			.apply-company-flexbox{
				.apply-company-flex{
					position: relative;
				}
				.apply-company-flex:first-child{
					margin-right: 50px;
				}


			}
			.apply-company-flex{
				margin-bottom: 30px;
				align-items:center;
				&.flex-intro{
					label{
						align-self: flex-start;
					}
				}
				.apply-company-flexitem{
					span{
						height: 100%;
						width: 40px;
						&.text-arrow{
							display: block;
							position: absolute;
							top: 0;
							right: 0;
							text-align: center;
							line-height: 40px;
							background: #ec6538;
							color:#fff;
						}
					}
				}
			}
			.apply-company-btns{
				justify-content: center;
				align-items: center;
				padding:20px 0;
				button{
					width: 150px;
					height: 40px;
					background: #ec6538;
					color:#fff;
					border-radius: 3px;
					border:none;
					cursor: pointer;
					transition: 0.3s;
					&:hover{
						background:#cd562e;
					}
				}
			}
		}
		.warning-tips{
			justify-content: center;
			align-items: center;
			i{
				width: 35px;
				height: 35px;
				background:url(../../../../static/images/icons.png)no-repeat;
				background-position: -175px -203px;
				margin-right: 10px;
			}
		}
		.closeModal{
			display: none;
		}
	}
</style>
