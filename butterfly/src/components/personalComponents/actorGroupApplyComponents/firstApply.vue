<template>
	<div class="apply-container">
		<!-- 第一步 -->
		<div class="apply-inp-container flex">
			<div class="apply-inp-content">
				<!-- 团队名称 -->
				<div class="flex-inpbox flex">
					<label for="">团队名称</label>
					<div class="flex-inp">
						<input type="text" placeholder="请输入您的真实姓名,2-15个汉字">
					</div>
				</div>
				<!-- 才艺 -->
				<div class="flex-inpbox flex-skill flex">
					<label for="">才　　艺</label>
					<div class="flex-skillbox">
						<div class="flex-inp">
							<ul class="flex">
								<li v-for="(item,idx) in showMemberHeadSkillData">
									<span>{{item.value}}</span>
									<span class="del-skill" @click="delToSkill({type:'groupHead',idx})">×</span>
								</li>
							</ul>
						</div>
						<div class="flex-inp" @click="showToModalHandler('groupHead')">
							<input type="text" readonly placeholder="请选择技能">
							<span class="color-arrow inp-arrow"></span>
						</div>

					</div>
				</div>
				<!-- 团长姓名 -->
				<div class="flex-inpbox flex">
					<label for="">团长姓名</label>
					<div class="flex-inp">
						<input type="text" placeholder="请输入团长姓名">
					</div>
				</div>
				<!-- 团队人数 -->
				<div class="flex-inpbox flex">
					<div class="flex-small-inpbox flex">
						<label for="">团队人数</label>
						<div class="flex-inp">
							<input type="text"><span class="text-arrow color-arrow">人</span>
						</div>
					</div>
				</div>
				<!-- 所在城市 -->
				<div class="flex-inpbox flex-city flex">
					<label for="">所在城市</label>
					<div class="flex-inp">
						<v-distpicker @selected="onSelected"></v-distpicker>
						<span class="addr-span color-arrow inp-arrow"></span>
						<span class="addr-span color-arrow inp-arrow"></span>
						<span class="addr-span color-arrow inp-arrow"></span>
					</div>
				</div>
				<!-- 毕业院校 -->
				<div class="flex-inpbox flex">
					<label for="">毕业院校</label>
					<div class="flex-inp">
						<input type="text" placeholder="请填写高中及以上的院校(没有填无)">
					</div>
				</div>
				<!-- 报价 -->
				<div class="flex-inpbox flex-money flex">
					<label for="">报　　价</label>
					<div class="flex-inp">
						<input type="text" value="0"><span class="text-arrow color-arrow">元/场</span>
					</div>
				</div>
				<!-- 团队简介 -->
				<div class="flex-inpbox flex-desc flex">
					<label for="">团队简介</label>
					<div class="flex-inp">
						<textarea placeholder="请输入一段话介绍团队，方便需求方快速了解团队"></textarea>
						<span class="max_length">0/250</span>
					</div>
				</div>
			</div>
			<div class="apply-add-content">
				<AddTab name="团队成员" addType="group"/>
				<MemberItem/>
			</div>
		</div>
		<div class="apply-btn flex">
			<div @click="nextToHandler">
				<button>下一步</button>
				<!-- <router-link :to="{path:'/TeamTwoStep',query:{id:1}}" tag="button">下一步</router-link> -->
			</div>
		</div>
		<ModalItem
			v-if="showSkillModal"
			:showModal="showSkillModal"
			@changheHintBoxShow="cancelToChooseSkill"
			>
			<div slot="header" class="skill-title flex">
				<h3>选择才艺</h3>
				<span>(最多只能选择五项)</span>
			</div>
			<div class="skillsBox">
				<div class="skills-tips">
					<ul class="flex">
						<li v-for="(item,idx) in showMemberHeadSkillData" v-if="shwoReciveType=='groupHead'">
							<span>{{item.value}}</span>
							<span class="del-skill" @click="delToSkill({type:'groupHead',idx})">×</span>
						</li>
						<li v-for="(item,idx) in showMemberBodyData[showMemberActiveIdx]" v-if="shwoReciveType=='groupMember'">
							<span>{{item.value}}</span>
							<span class="del-skill" @click="delToSkill({type:'groupMember',idx})">×</span>
						</li>
					</ul>
				</div>
				<div class="skills-content flex">
					<div class="skills-slide">
						<ul>
							<li
							v-for="(item,idx) in showSkillsData"
							v-if="idx!=0"
							@click="skillToChange({item,idx})">{{item.name}}</li>
						</ul>
					</div>
					<div class="skills-infobox">
						<ul class="flex">
							<li
							v-for="(item,idx) in showSkillsData[showSkillIndex].childCity"
							@click="skillInfoToChange(idx)">{{item.value}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="skill-btn flex" slot="footer">
				<button @click="sureToChooseSkill">确定</button>
				<button @click="cancelToChooseSkill">取消</button>
			</div>
		</ModalItem>
	</div>
</template>
<script>
	import $ from 'jquery';
	import {mapGetters,mapActions} from "vuex";
	import address from '../../../assets/js/address.js'

	import LinkageItem from '../../linkageComponents/linkageComponents'
	import ModalItem from '../../publicModalComponents/publicModal'
	import AddTab from '../../publishNeedsComponents/publishAddTab'
	import MemberItem from './addGroupMemberContent'

	export default{
		name:'apply',
		data(){
			return{
			}
		},
		computed:{
			...mapGetters({
				showSkillsData:'showSkillsData',
				showSkillIndex:'showSkillIndex',
				showSkillModal:'showSkillModal',
				showMemberHeadSkillData:'showMemberHeadSkillData',
				shwoReciveType:'shwoReciveType',
				showMemberBodyData:'showMemberBodyData',
				showMemberActiveIdx:'showMemberActiveIdx',
			})
		},
		components:{
			LinkageItem,
			ModalItem,
			MemberItem,
			AddTab
		},
		methods:{
			...mapActions({
				stepsToChange:'stepsToChange',
				showToModalHandler:'showToModalHandler',
				skillToChange:'skillToChange',
				skillInfoToChange:'skillInfoToChange',
				delToSkill:'delToSkill',
				cancelToChooseSkill:'cancelToChooseSkill',
				sureToChooseSkill:'sureToChooseSkill'
			}),
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)

		    },
			skillChange(){
				this.showModal = !this.showModal
			},
			nextToHandler(){
				this.stepsToChange({type:'group',idx:1})
			}
		},
		mounted(){
			this.addressData = address.address
			this.propsFlag = !this.propsFlag

		}
	}
</script>

<style lang="less">
	.apply-container{
		padding: 0 20px 30px 20px;
		.apply-inp-container{
			padding:30px 0;
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
				}
				&.flex-skill{
					label{
						align-self: flex-start;
						flex-shrink: 0;
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
					.flex-inp{
						span.addr-span{
							height: 100%;
							width: 40px;
							&:nth-child(2){
								right: 67.6%;
							}
							&:nth-child(3){
								right: 34%;
							}
						}
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
		/*成员增加*/
		.apply-add-content{
			width: 100%;
			.publish-addTab{
				border-bottom: 1px solid #999;
				width: 100%;
				ul{
					li{
						width: 150px;
						height: 40px;
						line-height: 40px;
						position: relative;
						text-align: center;
						color: #fff;
						background: #999;
						margin-right: 5px;
						.close-tab{
							position: absolute;
							display: block;
							top: 0;
							right: 0;
							width: 20px;
							height: 20px;
							cursor: pointer;
							line-height: 20px;
							opacity: 0.7;
							&:hover{
								opacity:1;
							}
						}
						&:first-child{
							span{
								display: none;
							}
						}
						&.active{
							background: #ec6538;
						}
					}
				}
				.add-btn{
					width: 40px;
					height: 40px;
					font-size: 30px;
					font-weight: 700;
					background: #ec6538;
					color: #fff;
					text-align: center;
					cursor: pointer;
					transition: 0.3s;
					&:hover{
						background:#cd562e;
					}
				}
			}
		}
	}
</style>
