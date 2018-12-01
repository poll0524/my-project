<template>
	<div class="company-edit-container">
		<div class="check-mask" v-if="showCheckCompanyFlag==0"></div>
		<TitleName titleName="策划公司资料"/>
		<div class="company-edit-content">
			<div class="check-state">{{showCheckCompanyMsg}}</div>
			<div class="refuseCom flex" v-if="showCompanyEditData.examineComment"><i></i>拒绝原因：<span>{{showCompanyEditData.examineComment}}</span></div>
			<!-- 公司基本信息 -->
			<PublicPerson headName="公司信息" blockType="info" v-if="!showPerInfoFlag">
				<div slot='content' class="flex-content flex">
					<div class="flex-item flex-col">
						<label for="">公司全称</label>
						<span>{{showCompanyEditData.fullName}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">公司简称</label>
						<span>{{showCompanyEditData.simpleName}}</span>
					</div>
					<div class="flex-box flex">
						<div class="flex-item">
							<label for="">企业属性</label>
							<span>{{showCompanyEditData.type}}</span>
						</div>
						<div class="flex-item">
							<label for="">企业类型</label>
							<span v-if="showCompanyEditData.companyType">{{showCompanyEditData.companyType.text}}</span>
						</div>
					</div>
					<div class="flex-box flex">
						<div class="flex-item">
							<label for="">从业年限</label>
							<span>{{showCompanyEditData.life}}年</span>
						</div>
						<div class="flex-item">
							<label for="">人数规模</label>
							<span>{{showCompanyEditData.number}}人</span>
						</div>
					</div>
					<div class="flex-item flex-col">
						<label for="">所在城市</label>
						<span>{{showCompanyEditData.hometown}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">营业执照注册码</label>
						<span>{{showCompanyEditData.licenseNumber}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">营业执照地址</label>
						<span>{{showCompanyEditData.liceseAddress}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">企业简介</label>
						<span class="flex-desc">{{showCompanyEditData.introduction}}</span>
					</div>
				</div>
			</PublicPerson>
			<div class="company-edit-box">
				<FirstItem v-if="showPerInfoFlag" :companyInfoData="showCompanyEditData"/>
				<ControlBtn v-if="showPerInfoFlag" type="companyinfo" applyType="company"/>
			</div>
			<!-- 公司演出经历 -->
			<PublicPerform
			headName="演出经历"
			contentName="演出内容"
			:contentData="showCompanyEditData.artistPerformanceExperiences"
			expType="perform"
			applyType="company"></PublicPerform>
			<!-- 获奖经历 -->
			<PublicPerform
			headName="获奖经历"
			contentName="获奖内容"
			:contentData="showCompanyEditData.artistAwardExperiences"
			expType="win"
			applyType="company"></PublicPerform>
			<!-- 相册 -->
			<PublicAlbum
			headName="相册"
			v-if="getDataFlag"
			applyType="company"
			:albumData="showCompanyEditData.album"/>
			<!-- 视频 -->
			<PublicVideo
			headName="视频"
			v-if="getDataFlag"
			applyType="company"
			:videoUrl="showCompanyEditData.album"/>

		</div>
		<div class="content-tipes">
			<ModalItem
			v-if="showContentFlag"
			:showModal="showContentFlag">
				<div slot="header" class="content-tips-head"><i></i>温馨提示</div>
				<div slot="body" class="content-tips-modal">
					<p>请确认内容是否输入完整</p>
				</div>
			</ModalItem>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleName from '../titleNameComponents'
	import PublicPerson from '../publicEditComponents/publicPersonalInfo'
	import PublicPerform from '../publicEditComponents/publicPersonalExp'
	import PublicAlbum from '../publicEditComponents/publicAlbum'
	import PublicVideo from '../publicEditComponents/publicVideo'
	import FirstItem from '../companyApplyComponents/firstApply'
	import ModalItem from '../../publicModalComponents/publicModal'

	import ControlBtn from '../publicEditComponents/publicControBtns'

	export default{
		name:'editCompany',
		data(){
			return{
				getDataFlag:false
			}
		},
		components:{
			TitleName,
			PublicPerson,
			FirstItem,
			PublicPerform,
			PublicAlbum,
			PublicVideo,
			ControlBtn,
			ModalItem
		},
		computed:{
			...mapGetters({
				showPerInfoFlag:'showPerInfoFlag',
				// showPerformData:'showPerformData',
				// showWinData:'showWinData',
				// showAlbumArr:'showAlbumArr',
				// showVideoUrl:'showVideoUrl',
				showCompanyEditData:'showCompanyEditData',
				showContentFlag:'showContentFlag',
				showCheckCompanyFlag:'showCheckCompanyFlag',
				showCheckCompanyMsg:'showCheckCompanyMsg'
			})
		},
		methods:{
			...mapActions({
				initToFlagHandler:'initToFlagHandler',
				getToDataHandler:'getToDataHandler',
				getToCheckType:'getToCheckType'
			})
		},
		mounted(){
			this.initToFlagHandler();
			this.$nextTick(()=>{
				this.getToCheckType();
				this.getToDataHandler('company');
			})
		},
		watch:{
			showCompanyEditData(){

				this.getDataFlag = true
			}
		}
	}
</script>

<style lang="less">
	.company-edit-container{
		position: relative;
		.check-state{
			position: absolute;
		    right: -17px;
		    top: -12px;
		    z-index: 13;
		    font-size: 20px;
		    font-weight: 700;
		    color: #ec6538;
		    padding: 5px 10px;
		    border: 1px solid #ec6538;
		    transform: rotate(45deg);
		    background: #fff;
		}
		.check-mask{
			position: absolute;
			left: 0;
			top:0;
			bottom: 0;
			right: 0;
			z-index: 12;
		}
		.content-tipes{
			.closeModal{
				display: none;
			}
		}
		.content-tips-head{
			i{
				display: inline-block;
				width: 35px;
				height: 35px;
				background: url(../../../../static/images/icons.png) no-repeat;
				vertical-align: middle;
				background-position: -174px -203px;
				margin-right: 10px;
			}
		}
		.content-tips-modal{
			text-align: center;
		}
		.refuseCom{
			align-items: center;
			font-size: 18px;
			padding-bottom: 10px;
			border-bottom: 1px dashed #999;
			margin-bottom: 10px;
			i{
				display: inline-block;
				width: 35px;
				height: 35px;
				background: url(../../../../static/images/icons.png) no-repeat;
				vertical-align: middle;
				background-position: -174px -203px;
				margin-right: 10px;
			}
			span{
				color: #ec6538;
				font-weight: 700;
			}
		}
	}

	.company-edit-content{
		padding: 20px 40px;
		position: relative;

		.flex-content{
			flex-direction: column;
			border-bottom: 2px dashed #999;
			padding: 0 40px;
			.flex-box,.flex-col{
				margin-bottom: 20px;
			}
			label{
				margin-right: 40px;
				width: 100px;
				overflow: hidden;
				text-align: right;
			}
			.flex-box{
				justify-content: space-between;
				align-items: center;
			}
			.flex-item{
				display: flex;
				justify-content: flex-start;
				span{
					min-width: 100px;
				}
				.flex-desc{
					flex:1;

				}
			}
		}
		.apply-company-btns{
			display: none;
		}
	}

</style>
