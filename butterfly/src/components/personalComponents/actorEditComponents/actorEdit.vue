<template>
	<div class="actor-edit">
		<div class="check-mask" v-if="showCheckActorFlag==0"></div>
		<TitleName :titleName="titleName"/>
		<div class="actor-editcontent">
			<div class="check-state">{{showCheckActorMsg}}</div>
			<div class="refuseCom flex" v-if="showActorEditData.examineComment"><i></i>拒绝原因：<span>{{showActorEditData.examineComment}}</span></div>
			<!-- 个人基本信息 -->
			<PublicPerson :headName="headName" blockType="info" v-if="!showPerInfoFlag">
				<div slot='content' class="flex-content flex">
					<div class="flex-box flex">
						<div class="flex-item">
							<label for="">姓　　名</label>
							<span>{{showActorEditData.name}}</span>
						</div>
						<div class="flex-item">
							<label for="">艺　　名</label>
							<span>{{showActorEditData.stageName}}</span>
						</div>
					</div>
					<div class="flex-box flex">
						<div class="flex-item">
							<label for="">才　　艺</label>
							<span>{{showActorEditData.skills}}</span>
						</div>
						<div class="flex-item">
							<label for="">身　　高</label>
							<span>{{showActorEditData.height}}cm</span>
						</div>
					</div>
					<div class="flex-box flex">
						<div class="flex-item">
							<label for="">性　　别</label>
							<span>{{showActorEditData.gender}}</span>
						</div>
						<div class="flex-item">
							<label for="">出生年月</label>
							<span>{{showActorEditData.birthday}}</span>
						</div>
					</div>
					<div class="flex-item flex-col">
						<label for="">体　　重</label>
						<span>{{showActorEditData.weight}}kg</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">所在城市</label>
						<span>{{showActorEditData.hometown}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">毕业院校</label>
						<span>{{showActorEditData.college}}</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">报　　价</label>
						<span>{{showActorEditData.salary}}元</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">个人简介</label>
						<span class="flex-desc">{{showActorEditData.introduction}}</span>
					</div>
				</div>
			</PublicPerson>
			<div class="actor-edit-infomation">
				<PersonalInfo v-if="showPerInfoFlag"
				:actorInfoData="showActorEditData"/>
				<ControlBtn v-if="showPerInfoFlag" type="info"/>
			</div>
			<!-- 演出经历 -->
			<PublicPerform
			:headName="expName"
			:contentName="contentName"
			:contentData="showActorEditData.artistPerformanceExperiences"
			expType="perform"
			applyType="actor"></PublicPerform>
			<!-- 获奖经历 -->
			<PublicPerform
			:headName="winName"
			:contentName="winContentName"
			:contentData="showActorEditData.artistAwardExperiences"
			expType="win"
			applyType="actor"></PublicPerform>
			<!-- 相册 -->
			<PublicAlbum
			v-if="ablumFlag"
			headName="相册"
			:albumData="showActorEditData.album"
			applyType="actor"/>
			<!-- 视频 -->
			<PublicVideo
			v-if="ablumFlag"
			headName="视频"
			:videoUrl="showActorEditData.album"
			applyType="actor"/>
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
	import ControlBtn from '../publicEditComponents/publicControBtns'

	import PersonalInfo from '../actorApplyComponents/firstApply'
	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'actorEdit',
		data(){
			return{
				titleName:'艺人资料',
				headName:'艺人信息',
				expName:'演出经历',
				contentName:'演出内容',
				winName:'获奖经历',
				winContentName:'获奖内容',
				ablumFlag:false
			}
		},
		components:{
			TitleName,
			PublicPerson,
			PublicPerform,
			PublicAlbum,
			PublicVideo,
			PersonalInfo,
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
				showActorEditData:'showActorEditData',
				showContentFlag:'showContentFlag',
				showCheckActorMsg:'showCheckActorMsg',
				showCheckActorFlag:'showCheckActorFlag'
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
			this.initToFlagHandler()
			this.getToDataHandler('actor')
			this.getToCheckType();
		},
		watch:{
			showActorEditData(){
				this.ablumFlag = true
			},
		}
	}
</script>

<style lang="less">
	.actor-edit{
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
		.actor-editcontent{
			position: relative;
			padding: 20px 40px;
			.flex-content{
				flex-direction: column;
				border-bottom: 2px dashed #999;
				padding: 0 40px;
				.flex-box,.flex-col{
					margin-bottom: 20px;
				}
				label{
					margin-right: 20px;
					width: 60px;
					overflow: hidden;
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
		.actor-edit-infomation{
			.apply-btn {
				display: none;
			}
		}
	}
</style>
