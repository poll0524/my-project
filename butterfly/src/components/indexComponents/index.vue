<template>
	<div class="container">
		<div class="banner-box box-bottom" v-if="dataFlag">
			<swiper :options="swiperOption" ref="mySwiper">
			    <!-- slides -->
			    <swiper-slide class="slide-1"
                        v-for="(item,index) in bannerImgData" :key="index"
                        v-if="item.displayType=='MJ_ADVERTISEMENT_TYPE_HOMEPAGE_BANNER'
                        && Number(item.show_start_time) < Number(new Date().valueOf()) && Number(new Date().valueOf())< Number(item.show_end_time)">
			    	<a :href="item.link">
              <img :src="item.imageUrl" alt="img" >
			    	</a>
			    </swiper-slide>
			    <!-- Optional controls -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
			<div class="box-maxWidth banner-tipsContent">
				<!--<div class="banner-tips">-->
					<!--<h3>蝶儿飞会员</h3>-->
					<!--<div class="banner-tipstxt">成为蝶儿飞会员，开启星享之旅，会员等级越高，特权越多</div>-->
				<!--</div>-->
				<search-item/>
			</div>
		</div>
		<!-- 快速发布 -->
		<rel-item/>
		<!-- 为您推荐 -->
		<recommend-item
		:bannerImgData="bannerImgData"
		v-if="dataFlag"/>
		<!-- 快速查询 -->
		<amorous-item/>
		<!-- 了解蝶儿飞 -->
		<under-item
		v-if="dataFlag"
		/>
		<!-- 发布需求 -->
		<div class="publish-box" @click="checkToCertify">
			<div class="auth-mask" v-if="!showClickFlag"></div>
			<router-link class="publish-btn" tag="div" to="/publishNeeds">发布需求</router-link>
		</div>
		<ModalItem
		v-if="showAuthFlag"
		:showModal="showAuthFlag"
		@changheHintBoxShow="closeToAuthModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='noLogin'">
				<p>您当前身份不能发布需求，请登录后前往个人中心申请/切换主办方或策划公司身份！</p>
				<div class="auth-btns">
					<router-link to="/login" tag="button">前往登录</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='recommendCompany'">
				<p>此功能暂未开放</p>
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='regularMember'">
				<p>您当前身份不能发布需求，请前往个人中心申请/切换主办方或策划公司身份</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='cantPublish'">
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
	import $ from 'jquery'
	import {mapGetters,mapActions} from "vuex";

	import SearchItem from '../searchBoxComponents/searchBox'
	import AmorousItem from '../amorousComponents/amorousComponents'
	import QuickRelease from './quickRelease'
	import Recommentd from './recommend'
	import UnderItem from './understandFly'
	import ModalItem from '../publicModalComponents/publicModal'

	import {axiosReqGet,getToken,getPublicConfigData} from '../../assets/js/public.js'
	export default{
		name:'Index',
		data(){
			return{
				swiperOption:{
			        effect: 'fade',
			        autoplay:true,
			        pagination: {
			           el: '.swiper-pagination',
			           clickable: true
			        },
				},
				bannerImgData:[],
				dataFlag:false,
				newsData:{},
				successData:{content:[]},
				showBottomFlag:false,
        homePageBanner:null,
			}
		},
		components:{
			'search-item':SearchItem,
			'amorous-item':AmorousItem,
			'rel-item':QuickRelease,
			'recommend-item':Recommentd,
			'under-item':UnderItem,
			ModalItem
		},
		computed:{
			...mapGetters({
				showAuthFlag:'showAuthFlag',
				shwoAuthType:'shwoAuthType',
				showClickFlag:'showClickFlag'
			})
		},
		methods:{
			...mapActions({
				getToUserInfo:'getToUserInfo',
				closeToAuthModal:'closeToAuthModal',
				checkToCertify:'checkToCertify',
        getAllListData:'getAllListData'
			}),

			//获取banner图
			getBannerUrl(){
				let uri = 'ad';
				let token = getToken();
				axiosReqGet(uri,this.callBackBannerHandler,token)
			},

			//请求banner回调函数
			callBackBannerHandler(params){
				this.dataFlag = !this.dataFlag;
				this.bannerImgData = params;
			},

		// 	//获取行业资讯列表
		// 	getNewsUrl(newsListId){
		// 		// let uri = 'news';
      //   //接受后台配置数据
      //   let url = 'article/list?category_id='+newsListId;
		// 		let token = getToken();
		// 		axiosReqGet(url,this.callBackNewsHandler,token)
		// 	},
      //
		// 	//获取行业资讯回调函数
		// 	callBackNewsHandler(params){
		// 		this.dataFlag = true;
		// 		this.newsData = params;
		// 	},
      //
      //
		// 	//获取成功案例
		// 	getSuccessExamples(caseListId){
      //   let url = 'article/list?category_id='+caseListId;
		// 		let token = getToken();
		// 		axiosReqGet(url,this.callBackSuccessHandler,token)
		// 	},
		// 	//获取成功案例回调函数
		// 	callBackSuccessHandler(params){
		// 		this.dataFlag = true;
      //   params.data.content.forEach((item) => {
      //     if(JSON.parse(item.category)[0] =="1529849112548"){
      //       this.successData.content.push(item)
      //     }
      //   })
      //   // for(let i in params.data.content){
      //   //   if(params.data.content[i].category =="1529849112548"){
      //   //     // console.log(params[i])
      //   //     this.successData.content.push(params.content[i]);
      //   //   }
      //   // }
      //
		// 	},
		// 	handleScroll () {
		// 	  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		// 	  if(scrollTop>150){
		// 	  	this.showBottomFlag=true
		// 	  }else{
		// 	  	this.showBottomFlag=false
		// 	  }
		// 	},
      //
      //
      // // 获取公司新闻列表
      // getCompanyNewsUrl(newsListId){
      //   // let uri = 'news';
      //   //接受后台配置数据
      //   let url = 'article/list?category_id='+newsListId;
      //   let token = getToken();
      //   axiosReqGet(url,this.callBackCompanyNewsHandler,token)
      // },
      //
      // //获取行业资讯回调函数
      // callBackCompanyNewsHandler(params){
      //   this.dataFlag = true;
      //   this.newsData = params;
      // },

		},
		mounted(){
			this.getBannerUrl();
      this.getAllListData();
			this.closeToAuthModal();
			// window.addEventListener('scroll', this.handleScroll)
			this.$nextTick(()=>{this.getToUserInfo()})
		}

	}
</script>
<style scoped lang="less">
	.container{
		width: 100%;
	}
	.banner-box{
		padding-top: 100px;
		height: 85vh;
		overflow: hidden;
		min-width: 1200px;
		position: relative;
		.swiper-container{
			height: 100%;
			.swiper-pagination-bullet{
				width: 10px !important;
				height: 10px !important;
			}
		}
		.banner-tipsContent{
			position: absolute;
			left: 50%;
			top: 0;
			height: 100%;
			margin-left: -600px;
		}
		.banner-tips{
			position: absolute;
			top: 160px;
			left: 0;
			background-color: rgba(0,0,0,0.7);
			padding: 50px 45px;
			color: #fff;
			line-height: 30px;
			z-index: 11;
			text-align: center;
			border-radius: 3px;
			.banner-tipstxt{
				opacity: 0.7;
			}
		}
	}
	.publish-box{
		position: fixed;
		/*width: 200px;*/
		overflow: hidden;
		right: 0;
		bottom: 50px;
		height: 50px;
		background: rgba(0,0,0,0);
		z-index: 999;
		.publish-btn{
			border-radius: 3px;
			background: #ec6538;
			color: #fff;
			padding: 10px 20px;
			font-size: 16px;
			cursor: pointer;
			transition: 0.3s;
			&:hover{
				background:#cd562e;
			}
		}
		.auth-mask{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 11;
		}
	}
	.publish-fade-enter-active, .publish-fade-leave-active {
	  transition:all 0.3s ease;
	}
	.publish-fade-enter, .publish-fade-leave-to {
	  /*bottom: -100px;*/
	  opacity: 0;
	}
	/*权限弹窗*/
	.auth-box{
		p{
			line-height: 25px;
			text-indent: 24px;
		}
		.auth-btns{
			text-align: center;
			padding:20px 0 0;
			button{
				padding: 5px 25px;
				color: #fff;
				border: none;
				border-radius: 3px;
				background:#ec6538;
				cursor: pointer;
				transition: 0.3s;
				&:hover{
					background:#cd562e;
				}
			}
		}
	}
</style>
