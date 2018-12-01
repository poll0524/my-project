<template>
	<div class="amorous-container box-bottom">
		<div class="amorous-content box-maxWidth">
			<div class="amorous-title">
				<h3>快速查找资源</h3>
				<div class="amorous-small">
					用最快捷的方式，精准找到您需要的艺人/公司
				</div>
			</div>
			<div class="amorous-flexbox flex">
				<div class="amorous-flex">
					<div class="amorous-titlebox" data-index="0">
						<div class="amorous-name">行业找人</div>
						<div class="amorous-titleinfo">
							<div class="amorous-titleTxt"  :class="[activeIndex==index?'active':'']" v-for="(item,index) in amorousKinds" @click="infoContentTradeHandler(index)" v-if="index!=0">
								{{item.name}}
							</div>
						</div>
					</div>
					<div class="amorous-infomation showAmorous">
						<div class="auth-mask" v-if="companyKindsFlag" @click="authHandler('company')"></div>
						<div class="amorous-infoText">
							<ul class="flex" v-if="amorousKinds!=null">
								<li v-for="(item,index) in amorousKinds[activeIndex].childCity">
									<router-link :to="{path:'/company',query:{oneIdx:activeIndex,twoIdx:index}}">{{item.value}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="amorous-flex">
					<div class="amorous-titlebox"  data-index="1">
						<div class="amorous-name">才艺找人</div>
						<div class="amorous-titleinfo">
							<div class="amorous-titleTxt" :class="[skillsIndex==index?'active':'']" v-for="(item,index) in amorousSkills" @click="infoContentSkillHandler(index)" v-if="index!=0">
								{{item.name}}
							</div>
						</div>
					</div>
					<div class="amorous-infomation">
						<div class="auth-mask" v-if="skillsFlag"  @click="authHandler('actor')"></div>
						<div class="amorous-infoText">
							<ul class="flex" v-if="amorousKinds!=null">
								<li v-for="(item,index) in amorousSkills[skillsIndex].childCity">
									<router-link :to="{path:'/actor',query:{oneIdx:skillsIndex,twoIdx:index}}">{{item.value}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="toggleModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body">
				<p v-if="showType=='company'">此功能暂未开放（主办方身份专属）</p>
				<p v-if="showType=='actor'">您当前身份只能查看艺人列表，如需查看公司列表和需求大厅，请前往个人中心切换身份</p>
				<div class="auth-tips-bottom flex">
					<div class="auth-to-needs orange-bgColor" @click="toggleModal" v-if="showType=='actor'">
						<router-link tag="div" to="/personal">前往个人中心</router-link>
					</div>
					<div class="auth-to-needs" @click="toggleModal" v-if="showType=='actor'">
						<router-link tag="div" to="/needs">前往需求大厅</router-link>
					</div>
				</div>
			</div>
		</ModalItem>
	</div>
</template>

<script>
	import $ from 'jquery'
	import {mapGetters,mapActions} from "vuex";
	import classify from '../../assets/js/classify.js'
	import componyClassify from '../../assets/js/companyClassify.js'
	import ModalItem from '../publicModalComponents/publicModal'
	export default{
		name:'amorous',
		props:['reciveAuthFlag','reciveAuthType'],
		data(){
			return{
				infoData:[],
				activeIndex:1,
				showAmorous:0,
				skillsIndex:1,
				amorousKinds:null,
				amorousSkills:null,
				skillsFlag:true,
				companyKindsFlag:true,
				showModal:false,
				showType:''
			}
		},
		components:{
			ModalItem
		},
		computed:{
			...mapGetters({
				showAuthId:'showAuthId'
			})
		},
		methods:{
			infoContentTradeHandler(index){
				this.activeIndex = index;
			},
			infoContentSkillHandler(index){
				this.skillsIndex = index;
			},
			amorousHoverHandler(){
				$('.amorous-titlebox').hover(function(e){
					var index = e.currentTarget.dataset.index
					for(let i=0;i<$('.amorous-infomation').length;i++){
						$('.amorous-infomation').eq(i).removeClass('showAmorous')
					}
					$('.amorous-infomation').eq(index).addClass('showAmorous')
				})
			},
			authHandler(type){
				this.showType = type
				this.showModal = !this.showModal
			},
			toggleModal(){
				this.showModal =false
			},
		},
		mounted(){
			this.amorousHoverHandler()
			this.amorousKinds = componyClassify.classify;
			this.amorousSkills = classify.classify
			this.$nextTick(()=>{
				// let arr = ['03','04','05','06'];
				let arr = ['02']
				if(this.showAuthId==10 || this.showAuthId == 11 || this.showAuthId == '02' || !this.showAuthId){
					this.skillsFlag = false
				}else{
					this.skillsFlag = true
				}
				// else if(arr.indexOf(this.showAuthId)<0 || this.showAuthId!=10 || this.showAuthId != 11){
				// 	this.skillsFlag=false
				// 	// this.companyKindsFlag=false
				// }
			})
		},
		watch:{
			showAuthId(){
				let arr = ['02']
				if(this.showAuthId==10 || this.showAuthId == 11 || this.showAuthId == '02' || !this.showAuthId){
					this.skillsFlag = false
				}else{
					this.skillsFlag = true
				}
			}
		}
	}
</script>

<style  lang="less">
	.amorous-container{
		width: 100%;
		min-height: 690px;
		background: url(../../../static/images/quick_bg.jpg) center no-repeat;
		background-size: cover;
		padding: 30px 5px 0;
		ul,li{
			list-style: none;
			transition: 0.3s;
		}
		.auth-tips-bottom{
			justify-content: center;
			padding: 10px 0 0;
			&>div{
				padding: 5px 20px;
				border-radius: 3px;
				cursor: pointer;
				transition: 0.3s;
				div{
					color: #fff !important;
				}
			}
			.auth-to-needs{
				background: #999;
				margin-left: 10px;
				&:hover{
					background:#888;
				}
			}
			.orange-bgColor{
				background:#ec6538;
				&:hover{
					background:#cd562e;
				}
			}
		}
	}
	.amorous-content{
		.amorous-title{
			text-align: center;
			padding-bottom: 30px;
			h3{
				font-size: 36px;
			}
		}
		.amorous-flex{
			display: flex;
			overflow: hidden;
			height: 500px;
			&:nth-child(1){
				background: #ec6538;
			}
			&:nth-child(2){
				background: #000;
			}

		}
		.amorous-titlebox{
			width: 150px;
			color: #fff;
			padding: 15px 0;
			.amorous-name{
				width: 55px;
				font-size: 24px;
				font-weight: 700;
				margin:0 auto;
			}
			.amorous-titleinfo{
				padding:40px 0 0 30px;
				.amorous-titleTxt{
					height: 30px;
					line-height: 30px;
					cursor: pointer;
					padding-left: 10px;
					&:hover,&.active{
						background:#fff;
						color: #000;
					}
				}
			}
		}
		.amorous-infomation{
			background-color: #fff;
			width: 0px;
			overflow: hidden;
			white-space: nowrap;
			opacity: 0;
			transition: 0.8s;
			position: relative;
			.auth-mask{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.amorous-infoText{
				height: 100%;
				overflow: auto;
			}
			ul{
				padding: 40px;
				flex-wrap: wrap;
				li{
					padding: 10px 20px;
					&:hover{
						a{
							color:#ec6538;
						}
					}
				}
			}
			a{
				color: #546370;
				font-size: 12px;

			}
		}
		.showAmorous{
			width: 900px;
			white-space: normal;
			opacity: 1;
		}

	}
</style>
