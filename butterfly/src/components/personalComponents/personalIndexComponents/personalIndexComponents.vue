<template>
	<div class="presonal-index">
		<div class="index-head flex">
			<div class="head-left">
				<div class="flex-item">昵　　称：
					{{userInfo.nickName?userInfo.nickName:(userInfo.name?userInfo.name:userInfo.phone)}}
				</div>
				<div class="flex-item">账　　号：{{userInfo.account?userInfo.account:'暂未设置'}}</div>
				<div class="flex-item flex-level">账号等级：
					<span class="level">{{userInfo.level}}</span>
					<span class="express">
						<span class="active-express" ref="activeExpress"></span>
						<span class="exp-num">{{expNum}}/1000</span>
					</span>
					</div>
				<div class="flex-item">性　　别：{{userInfo.gender?userInfo.gender:'暂未设置'}}</div>
				<div class="flex-item">出生年月：{{userInfo.birthday?userInfo.birthday:"暂未设置"}}</div>
				<div class="flex-item flex-service">
					增值服务：
					<router-link tag="span" class="vip" to="/personalindex" ></router-link>
					<router-link tag="span" class="bail" to="/personalindex"></router-link>
				</div>
				<div class="flex-item flex-link">
					<router-link tag="span" to="/PersonInfo">编辑个人信息>></router-link>
				</div>
			</div>
			<div class="head-right">
				<div class="head-img">
					<img v-if="!userInfo.avatar" src="../../../../static/images/default_avatar.png" alt="">
          <img v-if="userAvatar" :src="userAvatar" alt="">
				</div>
				<div class="head-certity flex">
					当前身份
					<span class="certity-box">{{userInfo.roleNameChinese?userInfo.roleNameChinese:'暂无身份'}}</span>
					<ul :class="['certity-info',{'showInfo':showCertityFlag}]">
						<li v-for="item in userInfo.role" v-if="userInfo.currentRole.id != item.id" @click="changeRole(item.id)">{{item.roleNameChinese}}</li>
            <li v-if="userInfo.role&&userInfo.role.length <= 1">暂无其他身份</li>
					</ul>
					<div class="certity-btn" @click="showCertity">
						更换
					</div>
				</div>
			</div>
		</div>
		<div class="index-content">
			<div class="flex-box flex">
				<div class="flex-item flex" v-for="item in contentData">
					<div class="flex-img" ></div>
					<div class="flex-text">
						<div class="flex-name">{{item.name}}</div>
						<div class="flex-center" v-if="item.centerText">
						{{item.centerText}}: <span>{{item.level}}</span>
					</div>
						<router-link tag="div" class="flex-router" :to="`${item.links}`">{{item.routerText}}</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {axiosReqGet,getToken,formatTime,saveReadToken} from '../../../assets/js/public.js'
	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'personalIndex',
		data(){
      return{
				userInfo:{},
				showCertityFlag:false,
				contentData:[
					{name:'账户安全',centerText:'安全级别',level:'低',routerText:'提高级别>>',links:'/Security'},
					{name:'我的钱包',centerText:'总资产',level:'￥0.00',routerText:'查看详情>>',links:'/walletIndex'},
					{name:'信誉分',centerText:'当前积分',level:'100分',routerText:'查看信誉明细>>',links:'/personalindex'},
					{name:'积分',centerText:'当前积分',level:'100分',routerText:'查看积分明细>>',links:'/personalindex'},
					{name:'常见问题',routerText:'查看玩转蝶儿飞>>',links:'/serviceAgreement'},
					{name:'联系客服',routerText:'联系客服>>',links:'/ContactService'}
				],
        expNum:null,
        userAvatar:null
			}
    },
    mounted:{
      ...mapGetters({
        avatorImgUrl:'avatorImgUrl'
      })
    },
		methods:{
			...mapActions({
				getToCurrentId:'getToCurrentId'
			}),
			getUserInfo(){
				let uri = 'user';
				let token = getToken();
				axiosReqGet(uri,this.userCallBackHandler,token)
			},
			userCallBackHandler(params){
				this.userInfo = params,
				this.userInfo.birthday = formatTime(this.userInfo.birthday,'.').split(' ')[0];
				this.userInfo.roleNameChinese = this.userInfo.currentRole.roleNameChinese;
				this.expNum = this.userInfo.experiencePoints % 1000;
        this.userInfo.level = parseInt(this.userInfo.experiencePoints / 1000)

        this.$refs.activeExpress.style.width = (this.expNum * 0.075) +"px"
        this.getToCurrentId(params.currentRole.id)
        this.userAvatar = this.userInfo.avatar+"?id="+Math.random();
			},
			//显示身份
			showCertity(){
				this.showCertityFlag = !this.showCertityFlag
			},
        //切换身份
      changeRole(param){

        let uri = 'token/change/?role_id='+param;
        let token = getToken();
        axiosReqGet(uri,this.userChangeRoleBackHandler,token)
      },
      userChangeRoleBackHandler(params){
        saveReadToken("",'-1');
        saveReadToken(params.token,'7');
        location.reload();
      }
		},

		mounted(){
			this.getUserInfo()
		}

	}
</script>

<style scoped lang="less">
	.presonal-index{
		font-size: 14px;
		.index-head{
			box-shadow: 0 0 2px #ccc;
			justify-content: center;
			padding: 20px 0;
			.head-left{
				padding-right: 100px;
				line-height: 40px;
				.flex-item.flex-link{
					span{
						display: block;
						transition: 0.3s;
						cursor: pointer;
						&:hover{
							text-decoration:underline;
							color: #ec6538;
						}
					}
				}
				.flex-service{
					span{
						display: inline-block;
						width: 20px;
						height: 20px;
						vertical-align: middle;
					}
          .vip{
            background-image: url('../../../../static/images/icons.png');
            background-position: -44px -160px;
            background-color: #ec6538;
            border-radius: 50%;
            width: 25px;
            height: 25px;
          }
          .bail{
            background-image: url('../../../../static/images/bail.png');
            background-repeat: no-repeat;
            background-position: center;
          }
				}
				.flex-level{
					span{
						display: inline-block;
						vertical-align: middle;
						color: #fff;
						&.level{
							background: url(../../../../static/images/icons.png) no-repeat;
							background-position: -187px -161px;
							width: 30px;
							height: 30px;
							line-height: 30px;
							text-align: center;
						}
						&.express{
							width: 75px;
							font-size: 12px;
							position: relative;
							background: #999;
							border-radius: 10px;
							height: 15px;
							line-height: 15px;
							text-align: center;
							overflow: hidden;
							.active-express{
								position: absolute;
								height: 100%;
								width: 20px;
								background: #ec6538;
								left: 0;
								top: 0;
								border-radius: 10px;
								z-index: 0;
							}
							.exp-num{
								position: relative;
								z-index: 1;
							}
						}
					}
				}
			}
			.head-right{
				.head-img{
					width: 130px;
					height: 130px;
					overflow: hidden;
					border-radius: 50%;
					margin:0 auto;
				}
				.head-certity{
					position: relative;
					font-size: 14px;
					align-items: center;
					padding:20px 0;
					.certity-box{
						border:1px solid #ec6538;
						color: #ec6538;
						border-radius: 10px;
						height: 30px;
						line-height: 28px;
						padding:0 15px;
						font-size: 16px;
						margin:0 15px;
					}
					.certity-btn{
						font-size: 14px;
						cursor:pointer;
						&:hover{
							text-decoration:underline;
						}
					}
					.certity-info{
						position: absolute;
						top: 50px;
						left: 88%;
						border:1px solid #ec6538;
						font-size: 14px;
						height: 0;
						overflow: hidden;
						transition: 0.3s;
						border-color: transparent;
						&.showInfo{
							height: auto;
							border-color: #ec6538;
						}
						li{
							border-bottom: 1px solid #ec6538;
							line-height: 25px;
							padding:0 10px;
							white-space: nowrap;
							transition: 0.3s;
							cursor: pointer;
							&:last-child{
								border-bottom:0;
							}
							&:hover{
								color: #fff;
								background:#ec6538;
							}
						}
					}
				}
			}
		}
		/*链接*/
		.index-content{
			margin-top: 20px;
			box-shadow: 0 0 2px #ccc;
			padding: 80px 20px;
			.flex-box{
				flex-wrap: wrap;
				justify-content: center;
				.flex-item {
					width: 50%;
					overflow: hidden;
					justify-content: center;
					align-items: center;
					margin-bottom: 80px;
					.flex-img{
						width: 80px;
						height: 80px;
						border-radius: 50%;
						background:#000 url(../../../../static/images/icons.png) no-repeat;
						margin-right: 15px;
					}
					&:nth-child(1){
						.flex-img{
							background-position: -9px -258px;
						}
					}
					&:nth-child(2){
						.flex-img{
							background-position: -117px -258px;
						}
					}
					&:nth-child(3){
						.flex-img{
							background-position: -219px -258px;
						}
					}
					&:nth-child(4){
						.flex-img{
							background-position: -10px -354px;
						}
					}
					&:nth-child(5){
						.flex-img{
							background-position: -116px -355px;
						}
					}
					&:nth-child(6){
						.flex-img{
							background-position: -219px -361px;
						}
					}
					.flex-text{
						width: 130px;
						text-align: left;
						font-size: 14px;
						line-height: 22px;
						.flex-name{
							font-size: 16px;
						}
						.flex-center{
							span{
								color: #ec6538;
							}
						}
						.flex-router{
							cursor: pointer;
							transition: 0.3s;
							&:hover{
								color:#ec6538;
							}
						}
					}
				}
			}
		}
	}
</style>
