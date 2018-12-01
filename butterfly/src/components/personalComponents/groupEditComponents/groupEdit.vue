<template>
	<div class="team-edit">
		<TitleName titleName="团队资料"/>
		<div class="team-editcontent">
			<!-- 个人基本信息 -->
			<PublicPerson headName="团队信息" blockType="info" v-if="!showPerInfoFlag">
				<div slot='content' class="flex-content flex">
					<div class="flex-item flex-col">
						<label for="">团队名称</label>
						<span>花儿乐队</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">才　　艺</label>
						<span>街舞、巴蜀笑星、模特秀、民族舞、机械舞、爵士舞</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">团长姓名</label>
						<span>倾国倾城</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">团队人数</label>
						<span>5人</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">所在城市</label>
						<span>四川省成都市高新区益州大道北段333号</span>
					</div>
					<div class="flex-item flex-col">
						<label for="">报　　价</label>
						<span>5000元</span>
					</div>
					
					<div class="flex-item flex-col">
						<label for="">个人简介</label>
						<span class="flex-desc">这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介。</span>
					</div>
				</div>
			</PublicPerson>
			<div class="team-edit-infomation">
				<PersonalInfo v-if="showPerInfoFlag"/>
				<ControlBtn v-if="showPerInfoFlag" type="info"/>
			</div>
			<div class="team-edit-member">
				<div class="info-head flex">
					<span class="name">团队信息</span>
					<span class="edit" @click="addToMember">新增</span>
				</div>
				<div class="team-add-member apply-inp-container" v-if="showTomember">
					<MemberInfo/>
					<ControlBtn type="addMember"/>
				</div>
				<EditMember>
					<div class="apply-inp-container">
						<MemberInfo/>
					</div>
				</EditMember>
			</div>
			<!-- 演出经历 -->
			<PublicPerform 
			:headName="expName"
			:contentName="contentName"
			:contentData="showPerformData"
			expType="perform"></PublicPerform>
			<!-- 获奖经历 -->
			<PublicPerform 
			:headName="winName"
			:contentName="winContentName"
			:contentData="showWinData"
			expType="win"></PublicPerform>
			<!-- 相册 -->
			<PublicAlbum
			headName="相册"
			:albumData="showAlbumArr"/>
			<!-- 视频 -->
			<PublicVideo
			headName="视频"
			:videoUrl="showVideoUrl"/>
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

	import PersonalInfo from '../actorGroupApplyComponents/firstApply'
	import MemberInfo from '../actorGroupApplyComponents/addGroupMemberContent'
	import EditMember from './editMember'

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
			}
		},
		components:{
			TitleName,
			PublicPerson,
			PublicPerform,
			PublicAlbum,
			PublicVideo,
			PersonalInfo,
			MemberInfo,
			ControlBtn,
			EditMember
		},
		computed:{
			...mapGetters({
				showPerInfoFlag:'showPerInfoFlag',
				showPerformData:'showPerformData',
				showWinData:'showWinData',
				showAlbumArr:'showAlbumArr',
				showVideoUrl:'showVideoUrl',
				showTomember:'showTomember'
			})
		},
		methods:{
			...mapActions({
				addToMember:'addToMember',
				initToFlagHandler:'initToFlagHandler'
			})
		},
		mounted(){
			this.initToFlagHandler()
		}
	}
</script>

<style lang="less">
	.team-edit{
		.team-editcontent{
			padding: 20px;
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
			.apply-add-content{
				display: none;
			}
		}
		.team-edit-infomation{
			.apply-btn {
				display: none;
			}
		}
		.team-add-member{
			padding-bottom: 20px;
		}
		.team-edit-member{
			padding: 20px;
			border-bottom: 2px dashed #999;
			.apply-inp-container{
				justify-content: center;
				flex-direction: column;
				align-items: center;
				.apply-inp-content{
					width: 560px;
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
				.flex-inpbox{
					align-items: center;
					margin-bottom: 30px;
					flex:1;
					label{
						margin-right: 20px;
						flex-shrink: 0;
					}
					&.flex-skill{
						label{
							align-self: flex-start;
						}
						input{
							width: 130px;
						}
						ul{
							flex-wrap: wrap;
							li{
								border:1px solid #ec6538;
								height: 30px;
								line-height: 30px;
								padding:0 15px;
								margin-right: 10px;
								margin-bottom: 10px;
								padding-right:0;
								cursor: pointer;
								transition: 0.3s;
								&:hover{
									background:#ec6538;
									color:#fff;
								}
								.del-skill{
									display: inline-block;
									text-align: center;
									width: 30px;
									height: 100%;
								}
							}
						}
						.flex-inp{
							flex:1;
						}
						.flex-inp:last-child{
							width: 130px;
							overflow: hidden;
						}
					}
					&.flex-money{
						input{
							width: 130px;
							text-align: center;
						}
					}
					&.flex-city{
						select{
							max-width: 150px;
							padding-right: 40px;
						}
						.inp-arrow{
							height: 100%;
							width: 40px;
						}
					}
					&.flex-desc{
						.flex-inp{
							.max_length{
								position: absolute;
								right: 10px;
								bottom:10px;
							}
						}
					}
					.flex-inp{
						position: relative;
						input,select{
							padding-right: 40px;
							position: relative;
							z-index: 1;
							background: transparent;
							appearance:none;
						}
						.color-arrow{
							width: 40px;
							height: 40px;
							line-height: 40px;
							position: absolute;
							top: 0;
							right: 0;
							background: #ec6538;
							color:#fff;
							text-align: center;
							&.inp-arrow{
								line-height: 0;
							}
						}
					}
				}
				.flex-small-inpbox{
					align-items: center;
					&:first-child{
						margin-right:20px;
					}
					label{
						margin-right: 20px;
					}
					input,select{
						width: 185px;
					}
				}
			}
			.apply-btn{
				justify-content: center;
				button{
					width: 150px;
					height: 40px;
					text-align: center;
					color:#fff;
					background: #ec6538;
					transition: 0.3s;
					border-radius: 3px;
					border:none;
					cursor: pointer;
					&:hover{
						background:#cd562e;
					}
				}
			}
			.modal-container{
				max-width: 700px;
			}
			.skillsBox{
				height:400px;
				overflow: hidden;
				padding:5px;
				.skills-infobox,.skills-tips{
					ul{
						flex-wrap: wrap;
						li{
							border:1px solid #ec6538;
							height: 30px;
							line-height: 30px;
							margin-right: 10px;
							margin-bottom: 20px;
							padding:0 15px;
							transition: 0.3s;
							&:hover{
								background:#fff;
								color:#ec6538;
							}
						}
					}
				}
				.skills-tips{
					ul{
						li{
							position: relative;
							padding-right:0;
							cursor: pointer;
							span.del-skill{
								display: inline-block;
								width: 30px;
								height: 100%;
								text-align: center;
							}
						}
					}
				}
				.skills-content{
					height: 300px;
					overflow: hidden;
					li{
						cursor: pointer;
					}
					.skills-slide{
						width: 100px;
						height: 100%;
						overflow: auto;
						li{
							height: 30px;
							line-height: 30px;
							transition: 0.3s;
							text-align: right;
							padding-right:20px;
							&:hover{
								background:#fff;
								color:#ec6538;
							}
						}
					}
					.skills-infobox{
						height: 100%;
						overflow: auto;
						flex:1;
						padding-left: 20px;
						padding-bottom: 20px;
					}
				}
			}
			.skill-title{
				align-items: center;
				h3{
					padding-right: 10px;
				}
				span{
					font-size: 12px;
					color:#ec6538;
				}
			}
			.skill-btn{
				justify-content: center;
				align-items: center;
				button{
					width: 100px;
					height: 30px;
					border-radius: 3px;
					color:#fff;
					border: none;
					transition: 0.3s;
					cursor: pointer;
					&:first-child{
						background:#ec6538;
						margin-right: 10px;
						&:hover{
							background:#cd562e;
						}
					}
					&:last-child{
						background: #999;
						&:hover{
							background:#848383;
						}
					}
				}
			}
			.info-head{
				justify-content: space-between;
				padding:0 20px 20px;
				color: #ec6538;
				font-weight: 700;
				.edit{
					font-weight: normal;
					color: #0018ff;
					cursor: pointer;
					&:hover{
						text-decoration:underline;
					}
				}
			}
		}
	}
</style>