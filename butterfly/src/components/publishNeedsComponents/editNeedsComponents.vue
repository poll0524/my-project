<template>
	<div class="edit-needs">
		<div class="box-maxWidth">
			<div class="publish-head flex">
				<div class="pulish-title">
					<span>演出简介</span>
				</div>
				<div class="pulish-inpbox publish-head-inpbox">
					<div class="flex publish-name">
						<label for=""><span>*</span>演出名称</label>
						<div class="pulish-inp">
							<input type="text" v-model="showEditNeedsData.title" placeholder="请输入演出名称">
						</div>
					</div>
					<div class="flex publish-desc">
						<label for=""><span>*</span>演出简介</label>
						<div class="pulish-inp">
							<textarea v-model="showEditNeedsData.introduce"  placeholder="请输入演出简介"></textarea>
						</div>
					</div>
					<div class="flex publish-date">
						<label for=""><span>*</span>演出时间</label>
						<div class="pulish-inp">
							<Datepicker :language="languages.zh" v-model="showEditNeedsData.date" format="yyyy-MM-dd"/>
							<span class="inp-arrow"></span>
						</div>
					</div>
					<div class="flex publish-addr">
						<label for=""><span>*</span>演出地点</label>
						<div class="pulish-inp">
							<div class="pulish-inp-addr">
								<v-distpicker
								 @selected="onSelected"
								 v-if="showEditNeedsData.hometown"
								 :province="selectAddr.province"
								 :city="selectAddr.city"
								 :area="selectAddr.area"></v-distpicker>
								<span class="color-arrow inp-arrow"></span>
								<span class="color-arrow inp-arrow"></span>
								<span class="color-arrow inp-arrow"></span>
							</div>
							<div class="pulish-addinfo">
								<textarea
								v-model="showEditNeedsData.addressInfo"
								placeholder="请输入详细地址"
								maxlength="250" @keyup="checkedAddrInfo"></textarea>
								<span v-if="showEditNeedsData.addressInfo">{{addLen}}/250</span>
							</div>
						</div>
					</div>
					<div class="flex publish-lineup">
						<label for=""><span>*</span>演出阵容</label>
						<div class="pulish-inp">
							<input type="text" v-model="showEditNeedsData.lineup" placeholder="请输入演出阵容">
						</div>
					</div>
					<div class="flex publish-phone">
						<label for=""><span>*</span>演出手机</label>
						<div class="pulish-inp">
							<input type="text"
							v-model="showEditNeedsData.phone"
							placeholder="请输入手机号码"
							:class="[showWarn?'warnBorder':'']"
							@change="checkPhone">
						</div>
					</div>
				</div>
			</div>
			<div class="publish-body flex">
				<div class="pulish-title">
					<span>需求详情</span>
				</div>
				<div class="publish-needsinfo-box">
					<div class="flex">
						<label><span>*</span>选择分类</label>
						<div class="publish-inp">
							<input type="radio" checked>找艺人
						</div>
					</div>
					<div class="flex">
						<label><span>*</span>需求类型</label>
						<div class="publish-inp">
							<LinkageItem
							:selectData="selectData"
							type="classify"
							v-if="propsFlag"
							:reciveOneIndex="showDefaultSkills.reciveOneIndex"
							:reciveTwoIndex="showDefaultSkills.reciveTwoIndex"
							@parentChange="skillChangeHandler"/>
						</div>
					</div>
					<div class="flex">
						<label><span>*</span>预　　算</label>
						<div class="publish-inp publish-budget">
							<input type="text" value="0" v-model="showEditNeedsData.budget"> 元
						</div>
					</div>
					<div class="flex">
						<label><span>*</span>需求数量</label>
						<div class="publish-inp publish-maxLimit">
							<input type="number" v-model="showEditNeedsData.number"> 个
						</div>
					</div>
					<div class="flex">
						<label><span>*</span>报名数量限制</label>
						<div class="publish-inp publish-maxLimit">
							<input type="number" v-model="showEditNeedsData.max_limit"> 个
						</div>
					</div>
					<div class="flex">
						<label><span>*</span>报名截止日期</label>
						<div class="publish-inp publish-deadLine">
							<Datepicker
							:language="languages.zh"
							format="yyyy-MM-dd"
							v-model="showEditNeedsData.deadline"/>
							<span class="inp-arrow"></span>
						</div>
					</div>
					<div class="flex publish-supplyInfo">
						<label>补充信息</label>
						<div class="publish-inp">
							<textarea placeholder="请输入补充信息" v-model="showEditNeedsData.supplement"></textarea>
						</div>
					</div>
				</div>
				<div class="publish-submit flex">
					<button @click="saveChange">保存修改</button>
				</div>
			</div>
		</div>
		<ModalItem
			v-if="showNeedsModalFlag"
			:showModal="showNeedsModalFlag"
			@changheHintBoxShow="needsToModalHandler"
		>
			<div class="needs-modal-content" slot="body">
				<div v-if="showNeedsContentType=='addrType'">请选择正确的地址</div>
				<div v-if="showNeedsContentType=='dateType'">截止日期应该在演出日期之前</div>
				<div v-if="showNeedsContentType=='budgetType'">预算至少大于50的整数</div>
				<div v-if="showNeedsContentType=='maxLimit'">需求量应该小于最大限制数量</div>
				<div v-if="showNeedsContentType=='content'">请确定输入的内容是否完整</div>
				<div v-if="showNeedsContentType=='success'">您的需求发布已修改成功，工作人员将尽快审核，请耐心等待！</div>
			</div>
			<div
			v-if="showNeedsContentType=='success'"
			slot="footer"
			class="publish-submit flex"
			@click="needsToModalHandler">
				<router-link to="/NeedsOrder" tag="button">确定</router-link>
			</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import classify from '../../assets/js/classify.js'

	import HeadItem from './publishNeedsHead'
	import NeedsInfo from './publishNeedsInfo'
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";
	import LinkageItem from '../linkageComponents/linkageComponents'
	import ModalItem from '../publicModalComponents/publicModal'

	import {regEX} from '../../assets/js/public.js'

	export default{
		name:'editNeeds',
		data(){
			return{
				languages: lang,
				showWarn:false,
				selectData:[],
				propsFlag:false,
				addLen:0,
				selectAddr:{}
			}
		},
		components:{
			HeadItem,
			NeedsInfo,
			Datepicker,
			LinkageItem,
			ModalItem
		},
		computed:{
			...mapGetters({
				showEditNeedsData:'showEditNeedsData',
				showDefaultSkills:'showDefaultSkills',
				showNeedsContentType:'showNeedsContentType',
				showNeedsModalFlag:'showNeedsModalFlag'
			})
		},
		methods:{
			...mapActions({
				getToEditNeedsData:'getToEditNeedsData',
				addressToChange:'addressToChange',
				skillsToChange:'skillsToChange',
				saveToChangeNeeds:'saveToChangeNeeds',
				needsToModalHandler:'needsToModalHandler'
			}),
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
		       let addr = data.province.value+','+ data.city.value+','+ data.area.value
		      this.addressToChange({type:'editNeeds',addr})
		    },
		    checkPhone(){
				if(!regEX(this.showEditNeedsData.phone).checkPhone){
					this.showWarn = true
				}else{
					this.showWarn = false
				}
			},
			skillChangeHandler(value){
				value.editType = 'editNeeds';
				this.skillsToChange(value)

			},
			checkedAddrInfo(){
				this.addLen = this.showEditNeedsData.addressInfo.length

			},
			saveChange(){
				this.saveToChangeNeeds()
			}
		},
		mounted(){
			this.getToEditNeedsData(this.$route.query.id);
			this.selectData = classify.classify
			this.propsFlag = true
		},
		watch:{
			showEditNeedsData(){
				this.addLen = this.showEditNeedsData.addressInfo.length
				this.selectAddr = {
					province:this.showEditNeedsData.hometown.province,
					city:this.showEditNeedsData.hometown.city,
					area:this.showEditNeedsData.hometown.area
				}
			},
			selectAddr(){

			}
		}
	}
</script>

<style lang="less">
	.edit-needs{
		padding: 100px 0 100px;
		font-size: 16px;
		.pulish-title{
			font-size: 24px;
			font-weight: 700;
			padding:20px 0;
			span{
				display: inline-block;
				border-bottom: 2px solid #546370;
			}
		}
		textarea,input,select{
			border:1px solid #999 !important;
			border-radius: 3px;
			font-size: 14px;
			color: #546370;
			height: 40px;
		}
		input{
			width: 400px;
			padding-left: 10px;
		}
		textarea{
			resize: none;
			width: 400px;
			height: 150px;
			padding:10px;
		}
		label{
			width: 130px;
			text-align: right;
			margin-right: 40px;
			span{
				color: #ec6538;
				margin-right: 5px;
			}
		}
		select{
			height: 40px !important;
			padding-right: 40px!important;
		}
		.warnBorder{
			border:1px solid red !important;
		}
		.inp-arrow{
			height: 100%;
			width: 40px;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
		.publish-head,.publish-body{
			flex-direction: column;
			align-items: center;
		}
		.publish-head{
			.pulish-inpbox{
				.flex{
					align-items: center;
					margin-bottom: 20px;
					position: relative;
				}
				.pulish-inp{
					position: relative;
					width: 600px;
				}
				.publish-date{
					input{
						width: 200px;
						position: relative;
						z-index: 1;
						background: transparent;
					}
					.inp-arrow{
						left: 160px;
						right: auto;
					}
				}
				.publish-addr,.publish-desc{
					align-items: flex-start;
				}
				.publish-addr{
					label{
						margin-top: 10px;
					}
					.pulish-inp-addr{
						position: relative;
						margin-bottom: 10px;
						select{
							width: 195px;
							position: relative;
							z-index: 1;
							background: transparent;
							appearance:none;
						}
						span.inp-arrow{
							&:nth-child(2){
								right: 67.6%;
							}
							&:nth-child(3){
								right: 34.4%;
							}
							&:nth-child(4){
								right: 1%;
							}
						}
					}
				}
				.pulish-addinfo{
					position: relative;
					span{
						position: absolute;
						right: 205px;
						bottom: 5px;
					}
				}
			}
		}
		/*需求详情*/
		.publish-needsinfo-box{
			&>.flex{
				margin-bottom: 30px;
				align-items: center;
				&.publish-supplyInfo{
					label{
						align-self: flex-start;
					}
				}
				input[type=radio]{
					width: 20px;
					height: 20px;
					vertical-align: bottom;
					margin-right:4px;
				}
				.publish-budget,.publish-maxLimit{
					input{
						width: 150px;
						text-align: center;
					}
				}
				.publish-deadLine{
					position: relative;
					input{
						width: 200px;
						z-index: 11;
						position: relative;
						background: transparent;
					}
				}
			}
		}
		/*发布按钮*/
		.publish-submit{
			justify-content: center;
			align-items: center;
			padding:20px 0;
			button{
				width: 150px;
				height: 40px;
				color: #fff;
				background: #ec6538;
				border-radius: 3px;
				cursor: pointer;
				border:none;
				transition: 0.3s;
				outline: none;
				&:hover{
					background:#cd562e;
				}
			}
		}
	}

</style>
