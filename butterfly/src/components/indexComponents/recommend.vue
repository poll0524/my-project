<template>
	<div class="recom-container box-bottom">
		<div class="recom-content flex">
			<div class="recom-conter flex">
				<div class="auth-mask" v-if="!showMask" @click="checkAuthHandler('recommendActor')"></div>
				<div class="recom-left" v-if="showFlag&&recommendActorData.length>0">
					<a :href="recommendActorData[0].link"></a>
					<img :src="recommendActorData[0].imageUrl" alt="">
					<!--<div class="recom-imgtext">-->
						<!--<div class="recom-imgtitle">范冰冰</div>-->
						<!--<div class="recom-skills">明星</div>-->
					<!--</div>-->
				</div>

				<div class="recom-center-left flex">
					<div class="recom-imgbox flex" v-if="showFlag&&recommendActorData.length>0">
						<div class="recom-imginfo" v-for="(item,index) in recommendActorData" v-if="index>0&&index<5">
							<a :href="item.link"></a>
							<img :src="item.imageUrl" alt="">
							<!--<div class="recom-imgtext">-->
								<!--<div class="recom-imgtitle">范冰冰</div>-->
								<!--<div class="recom-skills">明星</div>-->
							<!--</div>-->
						</div>
					</div>

					<div class="recom-title">
						<div class="recom-title-text">
							<h3>为您推荐</h3>
							<p>用最便捷的方式</p>
							<p>精准找到您需要的艺人/公司</p>
						</div>
					</div>
				</div>

				<div class="recom-center-right">
					<div class="recom-imgbox flex" v-if="showFlag&&recommendActorData.length>0">
						<div class="recom-imginfo" v-for="(item,index) in recommendActorData" v-if="index>=5">
							<a :href="item.link"></a>
							<img :src="item.imageUrl" alt="">
							<div class="recom-imgtext">
								<div class="recom-imgtitle">范冰冰</div>
								<div class="recom-skills">明星</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="recom-right flex">
				<div class="auth-mask" @click="checkAuthHandler('recommendCompany')"></div>
				<div class="recom-company recom-imgbox flex">
						<div class="recom-imginfo company-logo" v-for="item in recommendCompanyData">
							<a :href="item.link"></a>
							<img :src="item.imageUrl" alt="">
							<div class="recom-imgtext">
								<div class="recom-imgtitle">范冰冰</div>
								<div class="recom-skills">明星</div>
							</div>
						</div>
				</div>
			</div>
		</div>

		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="closeToAuthModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" class="auth-box" v-if="authTypes=='noLogin'">
				<p>您当前还未登陆，不能查看艺人详情</p>
				<div class="auth-btns">
					<router-link to="/login" tag="button">前往登录</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="authTypes=='recommendCompany'">
				<p>此功能暂未开放</p>
			</div>
			<div slot="body" class="auth-box" v-if="authTypes=='noAuth'">
				<p>您当前身份不能查看艺人详情，请前往个人中心申请/切换主办方或策划公司身份</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="authTypes=='cantPublish'">
				<p>您当前身份不能发布需求，请前往个人中心申请/切换主办方或策划公司身份</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
					<router-link to="/needs" tag="button">前往需求大厅</router-link>
				</div>
			</div>
		</ModalItem>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";
	import ModalItem from '../publicModalComponents/publicModal'

	export default{
		name:'recommend',
		props:{
			'bannerImgData':{
				type:Array
			}
		},
		data(){
			return{
				leftImgUrl:'../../../static/images/rec_01.jpg',
				centerLeftImgData:[
					'../../../static/images/pic_02.jpg',
					'../../../static/images/pic_02.jpg',
					'../../../static/images/pic_02.jpg',
					'../../../static/images/pic_02.jpg',
				],
				centerRightImgData:[
					'../../../static/images/pic_03.jpg',
					'../../../static/images/rec_04.jpg',
					'../../../static/images/pic_05.jpg',
					'../../../static/images/pic_06.jpg',
				],
				rightImgData:[
					'../../../static/images/pic_07.jpg',
					'../../../static/images/pic_08.jpg',
					'../../../static/images/pic_09.jpg',
					'../../../static/images/pic_10.jpg',
					'../../../static/images/pic_07.jpg',
					'../../../static/images/pic_08.jpg',
					'../../../static/images/pic_09.jpg',
					'../../../static/images/pic_10.jpg',
					'../../../static/images/pic_07.jpg',

				],
				recommendActorData:[],
				recommendCompanyData:[],
				showFlag:false,
				showMask:false,
				showModal:false,
				authTypes:'',
				authActor:['02','03','04','05','06'],
				authCompany:['08','09','11']
			}
		},
		components:{
			ModalItem
		},
		computed:{
			...mapGetters({
				showAuthId:"showAuthId"
			})
		},
		methods:{
			checkAuthHandler(type){

					this.showModal = true;
				if(type == 'recommendCompany'){
					this.authTypes = 'recommendCompany'
				}
				if(type == 'recommendActor'){
					this.authTypes = 'recommendActor'
					if(!this.showAuthId){
						this.authTypes = 'noLogin'
					}
					if(this.authActor.indexOf(this.showAuthId)>=0){
						this.authTypes = 'noAuth'
					}
				}
			},

			closeToAuthModal(){
				this.showModal = false;
			}
		},
		mounted(){
			for(let i=0;i<this.bannerImgData.length;i++){
				if(this.bannerImgData[i].displayType=="MJ_ADVERTISEMENT_TYPE_HOMEPAGE_RECOMENTED_LITTLE_ARTIST"){
					this.recommendActorData.push(this.bannerImgData[i])
				}
				if(this.bannerImgData[i].displayType=="MJ_ADVERTISEMENT_TYPE_HOMEPAGE_RECOMENTED_LITTLE_COMPANY"){
					this.recommendCompanyData.push(this.bannerImgData[i])
				}
			}
			this.showFlag = true
			this.$nextTick(()=>{
				if(this.authCompany.indexOf(this.showAuthId)>=0){
					this.showMask = true;
				}
			})
		},
		watch:{

		}
	}
</script>
<style scoped lang="less">
	*{
		transition: 0.3s;
	}
	.recom-content{
		height: 550px;
		overflow: hidden;
		min-width: 1200px;
		a{
			display: block;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 2;
		}
		&>div{
			position: relative;
			.auth-mask{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 12;
			}
		}
		.recom-left{
			width: 360px;
			overflow: hidden;
			position: relative;
			&:hover{
				img{
					transform:scale(1.1);
				}
				.recom-imgtext{
					bottom:0;
				}
			}
		}
		.recom-imgtext{
			position: absolute;
			bottom:-100px;
			left: 0;
			background-color: rgba(0,0,0,0.7);
			width: 100%;
			line-height: 20px;
			padding: 5px 15px;
			color: #fff;
			.recom-skills{
				font-size: 12px;
			}
		}
		.recom-imgbox{
			flex-wrap: wrap;
			.recom-imginfo{
				width: 50%;
				position: relative;
				height: 170px;
				overflow: hidden;
				&:nth-child(1),&:nth-child(4){
					height: 200px;
					overflow: hidden;
				}
				&:nth-child(4){
					margin-top: -30px;
				}

				&:hover{
					.recom-imgtext{
						bottom: 0;
						z-index: 1;
					}
					img{
						transform: scale(1.1);
					}
				}
			}
		}
		.recom-conter{
			width: 1200px;
			.recom-center-left{
				width: 365px;
				flex-direction: column;
				.recom-title{
					flex: 1;
					background: #333;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					h3{
						font-size: 36px;
						padding-bottom: 15px;
					}
				}
			}
			.recom-center-right{
				flex: 1;
				.recom-imginfo{
					height: 250px;
					&:nth-child(1),&:nth-child(4){
						height: 300px;
						overflow: hidden;
					}
					&:nth-child(4){
						margin-top: -50px;
					}
				}
			}
		}
		.recom-right{
			flex: 1;
			padding: 0 10px;
			.recom-company{
				.recom-imginfo{
					width: 32.6%;
					margin-right: 1%;
					height: 184px;
					margin-top: 0;
					&.company-logo:nth-child(3n){
						margin-right: 0;
					}
				}
			}
		}
	}
	@media screen and(max-width: 1680px) and (min-width: 1550px){
		.recom-content{
			height: 500px;
			.recom-left{
				width: 300px;
			}
		}
		.recom-content .recom-conter{
			width: 1000px;
			.recom-center-right{
				.recom-imginfo{
					height: 230px;
					&:nth-child(1),&:nth-child(4){
						height: 270px;
						overflow: hidden;
					}
					&:nth-child(4){
						margin-top: -40px;
					}
				}
			}
		}
	}
	@media screen and(max-width: 1455px) and (min-width: 1355px){
		.recom-content{
			height: 400px;
			.recom-left{
				width: 250px;
			}
			.recom-right{
				.recom-company{
					.recom-imginfo{
						height: 134px;
					}
				}
			}
		}
		.recom-content .recom-conter{
			width: 900px;
			.recom-imgbox{
				.recom-imginfo{
					height: 120px;
					&:nth-child(1),&:nth-child(4){
						height: 150px;
						overflow: hidden;
					}
					&:nth-child(4){
						margin-top: -30px;
					}
				}
			}
			.recom-center-right{
				.recom-imginfo{
					height: 180px;
					&:nth-child(1),&:nth-child(4){
						height: 220px;
						overflow: hidden;
					}
					&:nth-child(4){
						margin-top: -40px;
					}
				}
			}

		}
	}
	/*@media screen and(max-width: 1440px) {
		.recom-right {
			display: none;
		}
		.recom-content .recom-conter{
			flex: 1;
			.recom-center-left{
				width: 450px;
			}
		}
	}*/
</style>
