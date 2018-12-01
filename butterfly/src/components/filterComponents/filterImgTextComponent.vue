<template>
	<div class="filter-imgbox">
    <div v-if="showLoad" class="loadEffect">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div v-if="showNoData" class="noMessage">暂无数据</div>
		<div class="filter-imgflex flex" v-if="kindsType!='needs'">
			<div class="filter-imglist" v-for="item in filterImgData" :key="item.id" @click="lookActorInfo">
				<div class="link-mask" v-if="showWarn"></div>
				<router-link tag="div" :to="{path:routerLink,query:{id:item.id}}">
					<div class="filter-img">
						<img :src="item.imgUrl" alt="">
					</div>
					<div class="filter-text">
						<div class="filter-head flex">
							<div class="filter-name">
								<span class="filter-nametext">{{item.sameName}}</span>
								<span class="level" v-if="kindsType=='actor'">{{parseInt(item.experiencePoints / 1000)}}</span>
							</div>
							<div class="filter-price" v-if="kindsType=='actor'&&certifyId&&certifyId!='02'">￥{{item.samePrice}}</div>
							<div class="filter-price" v-if="kindsType=='actor'&&(certifyId=='02'||!certifyId)">￥******</div>
						</div>
						<div class="filter-property">{{item.property}}</div>
					</div>
					<div class="filter-icon">
						<div class="fliter-vip"></div>
						<div class="filter-recomm">荐</div>
					</div>
				</router-link>
			</div>
		</div>
		<div class="filter-needs-list" v-if="kindsType=='needs'">
			<div class="filter-auth"  @click="lookActorInfo">
				<div class="link-mask" v-if="showWarn"></div>
				<router-link tag="div" class="filter-needs-item" :to="{path:'/needInfo',query:{id:item.id}}"
				v-for="(item,index) in filterImgData" :key="item.id">
					<!-- <div class="icon-top"></div> -->
					<div class="filter-needs-box flex">
						<div class="filter-needs-top flex flex-space">
							<div class="needs-name">{{item.title}}</div>
							<div class="needs-persons"><span>￥{{item.budget}}</span>/人</div>
						</div>
						<div class="filter-needs-center">{{item.type}}*{{item.number}}名</div>
						<div class="filter-needs-bottom flex flex-space">
							<div class="needs-sureperson">已确定{{item.cooperatedNumber}}(人/公司)/共需{{item.number}}(人/公司)</div>
							<div class="needs-date">{{item.deadtime}}截止报名</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		<modal-item
		:showModal="showModal"
		@changheHintBoxShow="lookActorInfo">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" v-if="showContentType=='noLogin'" class="auth-box">
				<p v-if="kindsType=='actor'">您当前身份不能查看艺人详情，请登录后前往个人中心申请、切换主办方或策划公司身份</p>
				<p v-if="kindsType=='company'">您当前身份不能查看公司详情，请登录后前往个人中心申请、切换主办方或艺人身份</p>
				<p v-if="kindsType=='needs'">您当前的身份不能查看需求详情，请登录后前往个人中心申请/切换艺人或策划公司身份</p>
				<div class="auth-btns">
					<router-link to="/login" tag="button">前往登录</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="showContentType=='regularMember'">
				<p v-if="kindsType=='actor'">您当前身份不能查看艺人详情，请前往个人中心 切换或申请身份</p>
				<p v-if="kindsType=='company'">您当前身份不能查看公司详情，请前往个人中心申请/切换主办方身份</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="showContentType=='noReal'">
				<p>您当前身份未实名认证，请前往个人中心申请身份实名认证后/切换已实名身份查看需求详情</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
		</modal-item>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import {getCurrentRole} from '../../assets/js/public.js'

	import ModalItem from '../publicModalComponents/publicModal'

	export default{
		name:'filterImgbox',
		props:{
			'filterImgData':{
				type:Array
			},
			'kindsType':{
				type:String
			}
		},
		components:{
			'modal-item':ModalItem
		},
		data(){
			return{
				routerLink:'',
				showWarn:true,
				showModal:false,//禁止点击层
				certifyArr:['02'],
				certifyId:'',
				showContentType:'',
				realNameArr:['04','11'],
        loadingFlag:true
			}
		},
    computed:{
      ...mapGetters({
        showLoad:'showLoad',
        showNoData:'showNoData'
      })
    },
		methods:{
			provePersonCertify(){
				getCurrentRole(this.callBackHandler,(err)=>{})
			},
			callBackHandler(params){
				this.certifyId = params.currentRole.id;
				if(this.realNameArr.indexOf(this.certifyId)>=0){
					this.showWarn = false
				}
			},
			lookActorInfo(){
				if(!this.certifyId){
					this.showModal=!this.showModal
					this.showContentType = 'noLogin'
					return
				}else if(this.certifyArr.indexOf(this.certifyId)>=0&&this.kindsType!='needs'){
					this.showModal=!this.showModal
					this.showContentType = 'regularMember'
				}else if(this.realNameArr.indexOf(this.certifyId)<0){
					this.showModal=!this.showModal
					this.showContentType = 'noReal'
				}

			},
		},
		mounted(){
			if(this.kindsType=='actor'){
				this.routerLink="/actorInfo"
			}
			if(this.kindsType=='company'){
				this.routerLink="/companyInfo"
			}
			this.provePersonCertify()
		},
	}
</script>

<style scoped lang="less">
	.link-mask{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: transparent;
		z-index: 11;
		cursor: pointer;
	}
	.filter-imgflex{
		justify-content: flex-start;
		flex-wrap: wrap;
		position: relative;
		.filter-imglist{
			position: relative;
			flex-basis: 19.2%;
			margin-right: 1%;
			margin-bottom: 20px;
			background: #fff;
			cursor: pointer;
			overflow: hidden;
			&:nth-child(5n){
				margin-right: 0;
			}
			.filter-img {
				overflow: hidden;
				height: 250px;
				width: 100%;
				img{
					transition: 0.3s;
				}
			}
			&:hover{
				.filter-img img{
					transform: scale(1.1);
				}
			}
			.filter-text{
				padding: 10px;
				.filter-head{
					justify-content: space-between;
					align-items: center;
					padding-bottom: 5px;
					.filter-nametext{
						max-width: 100px;
						display: inline-block;
						vertical-align: middle;
					}
					.filter-price{
						font-size: 12px;
						color: #ec6358;
					}
				}
				.filter-property{
					width: 100%;
				}
				.filter-property,.filter-nametext{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

				}
			}
		}
	}
	.level{
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../../../static/images/icons.png)no-repeat;
		background-position: -9px -163px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    vertical-align: middle;
	}
	.filter-icon{
		position: absolute;
		right: 10px;
		top: 10px;
		&>div{
			width: 25px;
			height: 25px;
			margin-bottom: 10px;
			border-radius: 50%;
			line-height: 25px;
			text-align: center;
			color: #fff;
		}
		.fliter-vip{
			background:#ef3a18 url(../../../static/images/icons.png)no-repeat;
			background-position: -43px -159px;
		}
		.filter-recomm{
			background: #ff9800;
		}
	}
	/*xuqiu*/
	.filter-auth{
		position: relative;
	}
	.filter-needs-list{
		font-size: 12px;
		padding: 0 5px;
		.filter-needs-item{
			position: relative;
			padding: 10px 20px;
			background: #fff;
			border-radius: 3px;
			box-shadow: 0 1px 4px rgba(0,0,0,0.5);
			margin-bottom: 20px;
			cursor: pointer;
			transition: 0.3s;
			&:hover{
				box-shadow:0 1px 4px rgba(0,0,0,0.8);
			}
			.icon-top{
				position: absolute;
				left: 20px;
				top: 10px;
				width: 25px;
				height: 25px;
				border-radius: 50%;
				overflow: hidden;
				background:#ff0099 url(../../../static/images/icons.png)no-repeat;
				background-position: -147px -161px;
			}
			.filter-needs-box{
				flex-direction: column;
				padding:0 30px;
				&>div{
					padding-bottom: 10px;
				}
				.needs-name,.needs-persons{
					font-size: 14px;
				}
				.flex-space{
					justify-content: space-between;
					align-items: center;
				}
				.needs-persons span{
					color: #ec6538;
					font-weight: 700;
				}
			}
		}
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

  /*加载中*/
  .loadEffect{
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top:100px;
  }
  .loadEffect span{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ec6538;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }
  @-webkit-keyframes load{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0.2;
    }
  }
  .loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.13s;
  }
  .loadEffect span:nth-child(2){
    left: 14px;
    top: 14px;
    -webkit-animation-delay:0.26s;
  }
  .loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -8px;
    -webkit-animation-delay:0.39s;
  }
  .loadEffect span:nth-child(4){
    top: 14px;
    right:14px;
    -webkit-animation-delay:0.52s;
  }
  .loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.65s;
  }
  .loadEffect span:nth-child(6){
    right: 14px;
    bottom:14px;
    -webkit-animation-delay:0.78s;
  }
  .loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    -webkit-animation-delay:0.91s;
  }
  .loadEffect span:nth-child(8){
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay:1.04s;
  }
  /*无数据*/
  .noMessage{
    text-align: center;
    font-size: 48px;
    padding: 60px 0;
  }
</style>
