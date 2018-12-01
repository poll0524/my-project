<template>
	<div :class="['apply-container',{active:showModal}]">

		<!-- 第一步 -->
		<div class="apply-inp-container flex">
			<div class="apply-inp-content">
				<!-- 姓名 -->
				<div class="flex-inpbox flex">
					<label for="">姓　　名</label>
					<div :class="['flex-inp',{borderColor:warningFlag}]">
						<input type="text"
							v-model="firstData.name"
							placeholder="请输入您的真实姓名,2-15个汉字"
							@change="checkedName">
						<span class="tips-text" v-if="warningFlag">只支持2-15个汉字</span>
					</div>
				</div>
				<!-- 艺名 -->
				<div class="flex-inpbox flex">
					<label for="">艺　　名</label>
					<div class="flex-inp">
						<input type="text" v-model="firstData.stage_name" placeholder="请慎重填写,艺名将作为您的平台展示名">
					</div>
				</div>
				<!-- 才艺 -->
				<div class="flex-inpbox flex-skill flex">
					<label for="">选择才艺</label>
					<div class="flex-skillbox">
						<div class="flex-inp">
							<ul class="flex">
								<li v-for="(item,idx) in showChooseData">
									<span>{{item}}</span>
									<span class="del-skill" @click="delToSkill({type:'singleActor',idx})">×</span>
								</li>
							</ul>
						</div>
						<div class="flex-inp" @click="showToModalHandler('singleActor')">
							<input type="text" readonly placeholder="请选择技能">
							<span class="color-arrow inp-arrow"></span>
						</div>

					</div>
				</div>
				<!-- 性别 -->
				<div class="flex-inpbox flex">
					<div class="flex-small-inpbox flex">
						<label for="">性　　别</label>
						<div class="flex-inp">
							<select name="" id="" v-model="firstData.gender">
								<option value="男" selected>男</option>
								<option value="女">女</option>
							</select>
							<span class="color-arrow inp-arrow"></span>
						</div>
					</div>
					<div class="flex-small-inpbox flex">
						<label for="">身　　高</label>
						<div class="flex-inp">
							<input type="text" maxlength="3" v-model="firstData.height" @change="checkedNumber"><span class="text-arrow color-arrow">CM</span>
						</div>
					</div>
				</div>
				<div class="flex-inpbox flex">
					<div class="flex-small-inpbox flex">
						<label for="">体　　重</label>
						<div class="flex-inp">
							<input type="text" maxlength="3" v-model="firstData.weight" @change="checkedNumber"><span class="text-arrow color-arrow">Kg</span>
						</div>
					</div>
					<div class="flex-small-inpbox flex">
						<label for="">出生日期</label>
						<div class="flex-inp">
							<Datepicker
							:language="languages.zh"
							:disabledDates="disabledDates"
							format="yyyy-MM-dd"
							v-model="firstData.birthday"
							/>
							<span class="color-arrow inp-arrow"></span>
						</div>
					</div>
				</div>
				<!-- 所在城市 -->
				<div class="flex-inpbox flex-city flex">
					<label for="">所在城市</label>
					<div class="flex-inp">
						<v-distpicker
						v-if="actorInfoData"
						 @selected="onSelected"
						 :province="selectAddr.province"
						 :city="selectAddr.city"
						 :area="selectAddr.area"></v-distpicker>
						<v-distpicker v-if="!actorInfoData" @selected="onSelected"></v-distpicker>
						<span class="color-arrow inp-arrow"></span>
						<span class="color-arrow inp-arrow"></span>
						<span class="color-arrow inp-arrow"></span>
					</div>
				</div>
				<!-- 毕业院校 -->
				<div class="flex-inpbox flex">
					<label for="">毕业院校</label>
					<div class="flex-inp">
						<input type="text" v-model="firstData.college" placeholder="请填写高中及以上的院校(没有填无)">
					</div>
				</div>
				<!-- 报价 -->
				<div class="flex-inpbox flex-money flex">
					<label for="">报　　价</label>
					<div class="flex-inp">
						<input type="text"
							v-model="firstData.salary"
							value="0"
							maxlength="8"
							@change="checkedNumber"><span class="text-arrow color-arrow">元/场</span>
					</div>
				</div>
				<!-- 个人简介 -->
				<div class="flex-inpbox flex-desc flex">
					<label for="">个人简介</label>
					<div class="flex-inp text-control">
						<textarea v-model="firstData.intro" maxlength="250" placeholder="请输入一段话介绍自己,方便需求方快速了解你"></textarea>
						<span>{{firstData.intro.length}}/250</span>
					</div>
				</div>
			</div>
		</div>
		<div class="apply-btn flex">
			<div @click="nextStepHandler">
				<button>下一步</button>
				<!-- <router-link :to="{path:'/ActorTwoStep',query:{id:1}}" tag="button">下一步</router-link> -->
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
						<li v-for="(item,idx) in showChooseData">
							<span>{{item}}</span>
							<span class="del-skill" @click="delToSkill({type:'singleActor',idx})">×</span>
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
				<!-- <button @click="cancelToChooseSkill">取消</button> -->
			</div>
		</ModalItem>
		<div class="first-tips">
			<ModalItem
			v-if="showModal"
			:showModal="showModal"
			@changheHintBoxShow="toggleModal"
			>
				<div slot="body" class="apply-tips"><i></i>请确定所填内容完整</div>
			</ModalItem>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	import {mapGetters,mapActions} from "vuex";
	import {regEX} from '../../../assets/js/public.js';
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";

	import LinkageItem from '../../linkageComponents/linkageComponents'
	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'apply',
		props:['actorInfoData'],
		data(){
			return{
				languages:lang,
				showModal:false,
				disabledDates:{
					// to: new Date(2018, 1, 5),
					from: new Date()
				},
				firstData:{
					skills:'',
					name:'',
					salary:'',
					gender:'男',
					stage_name:'',
					college:'',
					birthday:new Date(),
					hometown:'',
					height:'',
					intro:'',
					weight:''
				},
				warningFlag:false,
				selectAddr:{
					province:'',
					city:'',
					area:''
				}
			}
		},
		computed:{
			...mapGetters({
				showSkillsData:'showSkillsData',
				showSkillIndex:'showSkillIndex',
				showSkillModal:'showSkillModal',
				showChooseData:'showChooseData',
			})
		},
		components:{
			Datepicker,
			LinkageItem,
			ModalItem
		},
		methods:{
			...mapActions({
				stepsToChange:'stepsToChange',
				showToModalHandler:'showToModalHandler',
				skillToChange:'skillToChange',
				skillInfoToChange:'skillInfoToChange',
				delToSkill:'delToSkill',
				cancelToChooseSkill:'cancelToChooseSkill',
				sureToChooseSkill:'sureToChooseSkill',
				skillsToDataHandler:'skillsToDataHandler'
			}),
			onSelected(data) {
		      let temp = '';
		      if(data.province.value == '台湾省'){
		      	temp = data.province.value
		      }else if(data.province.value == '省' || data.city.value=='市' || data.area.value=='区'){
		      	temp = ''
		      }else{
		     	 temp = data.province.value + ',' + data.city.value + ',' + data.area.value
		      }
		      this.firstData.hometown = temp
		    },
			skillChange(){
				this.showModal = !this.showModal
			},
			//验证名字
			checkedName(){
				/*if(!regEX(this.firstData.name).checkChinese){
					this.warningFlag = true
					return;
				}else{
					this.warningFlag = false
				}*/
			},
			//验证报价,身高体重
			checkedNumber(){
				if(!regEX(Number(this.firstData.height)).checkNumber){
					this.firstData.height='';
					return;
				}
				if(!regEX(Number(this.firstData.weight)).checkNumber){
					this.firstData.weight='';
					return;
				}
				if(!regEX(Number(this.firstData.salary)).checkNumber || Number(this.firstData.salary)<=0){
					this.firstData.salary='';
					return;
				}
			},
			nextStepHandler(){
				let temp = [];
				this.showChooseData.forEach((item)=>{
					temp.push(item)
				})
				this.firstData.skills = temp.join(',')
				for(let key in this.firstData){
					if(this.firstData[key]==''){
						this.showModal = true
						setTimeout(()=>{
							this.showModal = false
						},2000)
						return;
					}
				}
				//验证
				if(!regEX(this.firstData.name).checkChinese){
					this.warningFlag = true
					return;
				}
				this.stepsToChange({data:this.firstData,idx:1,type:'actor'})
			},
			toggleModal(){
				this.showModal = false;
			}
		},
		mounted(){
			if(this.actorInfoData){
				this.firstData = this.actorInfoData
				this.firstData.stage_name = this.actorInfoData.stageName
				this.firstData.skills = this.actorInfoData.skills.split(',');
				this.firstData.hometown = this.actorInfoData.hometown.split(',');
				this.firstData.intro = this.actorInfoData.introduction;
				this.selectAddr = {
					province:this.firstData.hometown[0],
					city:this.firstData.hometown[1],
					area:this.firstData.hometown[2]
				}
				this.skillsToDataHandler({data:this.firstData.skills,type:'actor'})
			}
		}
	}
</script>

<style lang="less">
	.apply-container{
		padding: 0 20px 30px 20px;
		.apply-inp-container{
			padding:30px 0;
			justify-content: center;
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
					position: relative;
					white-space: nowrap;
					&::after{
						display:block;
						content: "*";
						position: absolute;
						left: -10px;
						top: 0;
						color: #ec6538;
						font-weight: 700;
					}
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
						&:nth-child(2){
							right: 67.4%;
						}
						&:nth-child(3){
							right: 33.8%;
						}
					}
				}
				&.flex-desc{
					label{
						align-self: flex-start;
					}
				}
				.flex-inp{
					position: relative;
					&.borderColor{
						input{
							border-color: #ec6538;
						}
					}
					.tips-text{
						position: absolute;
						right: 10px;
						top: 10px;
						color: #ec6538;
						font-size: 12px;
					}
					input,select{
						padding-right: 40px;
						position: relative;
						z-index: 1;
						background: transparent;
						appearance:none;
						font-size: 14px;
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
				/*&:last-child{
					background: #999;
					&:hover{
						background:#848383;
					}
				}*/
			}
		}
		.first-tips{
			text-align: center;
			.modal-container{
				width: 500px;
				padding: 10px 0;
			}
			.closeModal{
				display: none;
			}
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
		/* &.active{
			.modal-container{
				width: 500px;
				padding: 10px 0;
				.closeModal{
					display: none;
				}
				.apply-tips{
					text-align: center !important;
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
			}
		} */
	}
</style>
