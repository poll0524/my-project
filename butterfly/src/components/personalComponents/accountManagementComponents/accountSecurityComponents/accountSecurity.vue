<template>
	<div>
		<TitleItem
		titleName="账户安全"/>
		<div class="security-content">

			<div class="security-head">
				<div class="security-progress flex">
					<span>安全级别:</span>
					<div class="progress-box flex">
						<div class="progress-gray">
							<div class="progress-active" :style="{width:persentNum+'%'}"></div>
						</div>
						<div class="progress-persont">{{persentNum}}%</div>
					</div>
				</div>
				<div class="progress-tips">
					为了更好地保护您的账户安全，建议您通过以下方式提高安全级别
				</div>
			</div>
			<div class="security-body">
				<div class="security-flex flex" v-for="(item,idx) in securityData">
					<div class="flex-icon flex">
						<i></i>
						{{item.title}}
					</div>
					<div class="flex-body flex">
						<div class="flex-text">{{item.text}}</div>
						<router-link v-if="idx!=3" tag="div" :to="`${item.routerLink}`" class="flex-btn">{{item.btnText}}</router-link>
						<div class="flex-btnicon" v-if="idx==3">
						</div>
						<div class="flex-tips" v-if="idx==3">
							当前只作为实名认证状态<br/>如需实名认证请到身份管理处进行身份实名认证
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import TitleItem from '../../titleNameComponents'
  import {axiosReqGet,getToken,getCurrentRole} from '../../../../assets/js/public'
	export default{
		name:'security',
		data(){
			return{
				persentNum:0,
				securityData:[
					{title:'密码登录',text:'建议您定期更改密码以保护账户安全',btnText:'设置',routerLink:'/InitPsw',id:'1'},
					{title:'手机绑定',text:'已绑定手机号码：1364553****(可使用该手机号码登录,并接收重要通知)',btnText:'修改',routerLink:'/InitPhone',id:'2'},
					{title:'邮箱绑定',text:'未绑定邮箱(可使用邮箱登录，并接收重要提醒)',btnText:'立即绑定',routerLink:'/InitEmail',id:'3'},
					{title:'身份认证',text:'未实名认证',id:'4'},
				]
			}
		},
		components:{
			TitleItem
		},
    methods:{
		  sucFun(param){
        this.persentNum = param.level * 100;
        for(let item in this.securityData){
          if(this.securityData[item].id === '1'){
            param.password?this.securityData[item].btnText = '修改':this.securityData[item].btnText = '设置'
          }
          if(this.securityData[item].id === '2'){
            param.phone?this.securityData[item].btnText = '修改绑定':this.securityData[item].btnText = '绑定手机'
          }
          if(this.securityData[item].id === '3'){
            param.email?this.securityData[item].btnText = '修改绑定':this.securityData[item].btnText = '绑定邮箱'
          }
          if(this.securityData[item].id === '4'){

            param.certify?this.securityData[item].text = '已实名认证':this.securityData[item].text = '未实名认证'
          }
        }
        // param.password
      },
		  getAccountSecurityData(){
        let uri = 'user/security';
        let token = getToken();
        axiosReqGet(uri,this.sucFun,token)
      },
      getCurrentRoleSucFun(params){
        this.securityData.forEach((item)=>{
          if(item.id == '3' && params.email){
            item.text= '已绑定邮箱，绑定邮箱为：'+params.email;
          }
          if(item.id == '2'){
            item.text= '已绑定手机号码：'+params.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')+'(可使用该手机号码登录,并接收重要通知)';
          }
        })
      },
      getCurrentRoleErrFun(params){
      },
      getUserInfo(){
        getCurrentRole(this.getCurrentRoleSucFun,this.getCurrentRoleErrFun);
      }
    },
		mounted(){
      this.getAccountSecurityData();
      this.getUserInfo()
    }
	}
</script>

<style scoped lang="less">
	.security-content{
		padding: 20px 70px;
		.security-head{
			padding: 20px 0;
			.progress-box{
				align-items: center;
				.progress-gray{
					margin: 0 10px;
					width: 650px;
					height: 10px;
					position: relative;
					background: #ccc;
					overflow: hidden;
					.progress-active{
						height: 100%;
						width: 0;
						background: #ec6538;
						transition: 0.3s;
					}
				}
			}
			.progress-tips{
				padding: 10px 0;
				font-size: 12px;
				color: #999;
			}
		}
		.security-body{
			.security-flex{
				position: relative;
				align-items: center;
				margin-bottom: 20px;
				border-bottom: 1px solid #ccc;
				padding: 0 0 10px;
				.flex-icon{
					align-items: center;
					border-right: 1px solid #ccc;
					padding:0  20px;
					i{
						width: 23px;
						height: 23px;
						background: url(../../../../../static/images/icons.png) no-repeat;
						background-position: -227px -113px;
						margin-right: 10px;
					}
				}
				&:nth-child(2){
					.flex-icon{
						i{
							background-position: -262px -113px;
						}
					}
				}
				.flex-body{
					padding: 0 0 0 20px;
					font-size: 12px;
					color: #999;
					flex: 1;
					justify-content: space-between;
					align-items: center;
					.flex-btn{
						width: 80px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						background: #ec6538;
						color: #fff;
						font-size: 14px;
						cursor: pointer;
						transition: 0.3s;
						&:hover{
							background:#cd562e;
						}
					}
					.flex-btnicon{
						width: 35px;
						height: 35px;
						background: url(../../../../../static/images/icons.png) no-repeat;
						background-position: -272px -158px;
						margin-right: 25px;
						cursor: pointer;
					}
					.flex-btnicon:hover + .flex-tips{
						opacity: 1;
					}
					.flex-tips{
						position: absolute;
						right: 0;
						bottom: -100px;
						background: #fff;
						width: 300px;
						height: 90px;
						border:1px solid #ec6538;
						padding: 15px 30px;
						border-radius: 3px;
						line-height: 20px;
						font-size: 14px;
						color:#546370;
						opacity: 0;
						transition: 0.3s;
						&::after{
							display:block;
							content: '';
							width: 15px;
							height:15px;
							background: #fff;
							border-top: 1px solid #ec6538;
							border-right: 1px solid #ec6538;
							transform: rotate(-45deg);
							position: absolute;
							right: 38px;
    						top: -9px;
						}
					}
				}
			}
		}
	}
</style>
