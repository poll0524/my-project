<template>
	<div class="nav-container">
		<div class="nav-content box-maxWidth flex">
			<router-link to="/index" tag="div" class="logo" >
				<img :src="logoImageUrl" alt="">
			</router-link>
			<div class="flex nav-tabbar">
				<div class="flex-item nav-tab">
					<router-link to="/Index" active-class>首页</router-link>
				</div>
				<div class="flex-item nav-tab" data-type="actor" @click="checkAuthorityHandler">
					<div class="certify-mask" v-if="showActorFlag"></div>
					<router-link to="/actor">艺人</router-link>
				</div>
				<div class="flex-item nav-tab" data-type="company" @click="checkAuthorityHandler">
					<div class="certify-mask" v-if="showCompanyFlag"></div>
					<router-link to="/company">策划公司</router-link>
				</div>
				<div class="flex-item nav-tab" data-type="needs" @click="checkAuthorityHandler">
					<div class="certify-mask" v-if="showNeedsFlag"></div>
					<router-link to="/needs">需求大厅</router-link>
				</div>
				<div class="flex-item nav-tab">
					<router-link to="/sucexm">成功案例</router-link>
				</div>
				<div class="flex-item nav-tab">
					<router-link to="/talk">蝶儿资讯</router-link>
				</div>
			</div>
			<div class="user-box flex" :class="[inforShow ? 'inforshow' : 'inforhide']">
				<router-link tag="div" to="/personalindex" class="user-info hand-shape flex">
					<div class="user-img">
              <img :src="userAvatar" v-if="userInfoData.avatar" alt="">
              <img src="../../../static/images/default_avatar.png" v-if="!userInfoData.avatar" alt="">
					</div>
					<div class="user-text orange-color">
						<div class="user-top flex">
              <span>{{userInfoData.nickName?userInfoData.nickName:
                      userInfoData.simpleName?userInfoData.simpleName:
                      userInfoData.stageName?userInfoData.stageName:
                      userInfoData.phone?userInfoData.phone:""}}
              </span>

							<!--<span class="icon vip"><img src="../../assets/img/userImg.jpg" alt=""></span>-->
							<!--<span class="icon bail"><img src="../../assets/img/userImg.jpg" alt=""></span>-->
              <span class="icon vip"><i>{{parseInt(this.userInfoData.experiencePoints / 1000)}}</i></span>
              <span class="icon bail"><i></i></span>
						</div>
						<div class="user-bototm">
							<span>{{userInfoData.currentRole?userInfoData.currentRole.roleNameChinese:""}}</span>
						</div>
					</div>
				</router-link>
				<router-link tag="div" to="/NewsIdx" class="news hand-shape">消息<i :class="[showNoHasReadArr.length > 0?'hasNews':'']"></i></router-link>
        <div @click="clearToken">
          <router-link class="esc" to="/login" >退出</router-link>
        </div>
			</div>
			<div class="user-box" :class="[inforShow ? 'inforhide' : 'inforshow']">
				<router-link to="/login" class="hover-underline">登录</router-link>/
				<router-link to="/register" class="hover-underline">注册</router-link>
			</div>
		</div>
		<modal-item
		:showModal="showModal"
		@changheHintBoxShow="toggleModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div class="auth-tips-content" slot="body">
				<span v-if="showSpanText=='actor'">
					您当前身份只能查看需求大厅，如需查看艺人列表，请前往个人中心切换身份
				</span>
				<span v-if="showSpanText=='company'&&certifyActorArr.indexOf(certifyId)>=0">
					您当前身份只能查看需求大厅，如需查看公司列表，请前往个人中心切换身份(主办方身份暂未开放)
				</span>
				<span v-if="showSpanText=='company'&&certifyId==10">
					您当前身份只能查看艺人列表，如需查看公司列表和需求大厅，请前往个人中心切换身份
				</span>
				<span v-if="showSpanText=='company'&&certifyId==11">
					您当前身份只能查看艺人列表和需求大厅，如需查看公司列表，请前往个人中心切换身份
				</span>
				<span v-if="showSpanText=='needs'&&certifyId=='10'">
					您当前身份未实名认证，请前往个人中心认证后查看需求详情
				</span>
			</div>
			<div class="auth-tips-bottom flex" slot="footer">
				<div class="auth-to-profile" @click="linkToChange" v-if="certifyId=='10'&&showSpanText=='company'">
					<router-link tag="div" to="/actor">前往艺人列表</router-link>
				</div>
				<div class="auth-to-needs" :class="[certifyId!='10'?'orange-bgColor':'']" @click="linkToChange" v-if="showSpanText!='needs'">
					<router-link tag="div" to="/personalindex">前往个人中心</router-link>
				</div>
				<div class="auth-to-needs" @click="linkToChange" v-if="showSpanText!='needs'">
					<router-link tag="div" to="/needs">前往需求大厅</router-link>
				</div>
				<div class="auth-to-profile" @click="linkToChange" v-if="certifyId=='10'&&showSpanText=='needs'">
					<router-link tag="div" :to="{path:realNameLink}">去认证</router-link>
				</div>
			</div>
		</modal-item>
	</div>
</template>

<script>

  	import {axiosReqGet,getToken,getCurrentRole,getPublicConfigData} from '../../assets/js/public.js'
  	import ModalItem from '../publicModalComponents/publicModal'

    import {mapGetters,mapActions} from "vuex";

	export default{
		name:'navlinks',
		data(){
			return{
				inforShow:false,
				userInfoData:{},
				showModal:false,
				certifyActorArr:['03','04','05','06'],//艺人身份
				certifyCompanyArr:['10','11'],//策划公司主办方
				certifyId:'',
				showActorFlag:true,
				showCompanyFlag:true,
				showNeedsFlag:true,
				showSpanText:'',
				userAvatar:null,
				realNameLink:'',
        logoImageUrl:'',
      }
		},
		components:{
			'modal-item':ModalItem
		},
    methods:{
    	//权限
    	checkAuthorityHandler(e){
    		getCurrentRole(this.authorityCallBack,(err)=>{});
    		//显示文本
		    var roleType=e.currentTarget.dataset.type
		    this.showSpanText = roleType;
	        if(this.certifyActorArr.indexOf(this.certifyId)>=0&&roleType!='needs'){
	        	this.showModal = !this.showModal
	        }
	        if(this.certifyCompanyArr.indexOf(this.certifyId)>=0&&roleType=='company'){
	        	this.showModal = !this.showModal

	        }
    	},
    	//权限回调
    	authorityCallBack(params){

	        this.certifyId = params.currentRole.id;
	        if(this.certifyId == '03'){
	        	this.realNameLink = '/ActorRealname'
	        }
	        if(this.certifyId == '10'){
	        	this.realNameLink = '/PlanCompanyApply'
	        }
    	},
	    callBackHandler(res){
	        if(res){
	          this.inforShow = true;
	          this.userInfoData = res;
	          this.userAvatar=res.avatar+"?id="+Math.random();
	        }
	        this.certifyId = res.currentRole.id;
	        if(this.certifyActorArr.indexOf(this.certifyId)>=0 || this.certifyCompanyArr.indexOf(this.certifyId)>=0){
	        	this.showNeedsFlag = false
	        }
	        if(this.certifyId=='10' || this.certifyId=='11'){
	        	this.showActorFlag = false;
	        }
	        if(this.certifyId == '02'){
	        	this.showNeedsFlag = false;
	        	this.showActorFlag = false;
	        	this.showCompanyFlag = false;
	        }

	    },
	    getUserInfo(){
	        const token = getToken();
	        const url = "user";
	        axiosReqGet(url,this.callBackHandler,token,(err)=>{
	        	this.showNeedsFlag = false;
	        	this.showActorFlag = false;
	        	this.showCompanyFlag = false;
	        });
	    },
	    toggleModal(){
	      	this.showModal = !this.showModal
	    },
	    //页面跳转
	    linkToChange(){
	    	this.showModal = !this.showModal
	    },
      //清除
      clearToken(){
        document.cookie = 'token= '+''+ ';expires= -1';
        setTimeout(()=>{
        	location.reload()
        },10)
      },

    },
    computed:{
      ...mapGetters({
        showNoHasReadArr:'showNoHasReadArr',
        avatorImgUrl:'avatorImgUrl'
      })
    },
    mounted(){
	      this.getUserInfo();
        //获取网站的logo地址
        getPublicConfigData('system_config_logo_main',(params)=>{
          this.logoImageUrl = params.data
        },null,(params)=>{

        })
	    }

	}

</script>
<style scoped lang="less">
	.nav-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background: #000;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 111;
		.nav-content{
			justify-content: space-between;
			align-items: center;
			color: #fff;
		}
		.nav-tabbar{
			flex: 1;
			justify-content: flex-end;
			font-size: 18px;
			.nav-tab{
				padding: 0 25px;
				position: relative;
				cursor: pointer;
				.certify-mask{
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					background: transparent;
					z-index: 11;
				}
				a{
					color: #fff;
					opacity: 0.9;
				}
				&:hover a{
					color:#ec6538;
				}
			}
		}
		.user-box{
			padding: 0 5px 0 25px;
			a{
				color: #ec6538;
			}
			.user-img{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
			}
			.user-text{
				padding-left: 10px;
				.user-top{
					align-items: center;
					span{
						display: inline-block;
					}
					.icon{
						width: 25px;
						height: 25px;
						overflow: hidden;
						margin-left: 5px;
            i{
              font-family: '微软雅黑';
              font-style: normal;
              display: inline-block;
              width: 100%;
              height: 100%;
              color: #fff;
              line-height: 25px;
              text-align: center;
              background-image: url('../../../static/images/icons.png');
            }
					}
          .vip{
            i{
              background-position: -6px -160px;
            }
          }
          .bail{
            i{
              background-position: -44px -160px;
              background-color: #ef3a18;
              border-radius: 50%;
            }
          }
				}
			}
			.news,.esc{
				position: relative;
				padding-left: 5px;
        color: #ec6538;
				.hasNews{
					display: block;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: red;
					position: absolute;
					top: -5px;
					right: -5px;
				}
			}
			.news:hover,.esc:hover{
				text-decoration: underline;
			}
			.user-bototm{
				span{
					display: inline-block;
					border:1px solid #ec6538;
					border-radius: 25px;
					padding: 0 10px;
					font-size: 12px;
					margin-top: 5px;
					height: 18px;
					line-height: 17px;
				}
			}
		}
    .inforshow{
      display: flex;
    }
    .inforhide{
      display: none;
    }
	}
	.hover-underline:hover{
		text-decoration: underline;
		transition: 0.3s;
		color: #fff !important;
	}
	/*弹窗*/
	.auth-tips-title{
		text-align: left;
		font-size: 16px;
		img{
			width: 30px;
			height: 30px;
			vertical-align: bottom;
			margin-right: 10px;
		}
	}
	.auth-tips-content{
		text-indent: 24px;
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
		.auth-to-profile{
			background: #ec6538;
			&:hover{
				background:#cd562e;
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

</style>
