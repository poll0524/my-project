<template>
	<div class="foot-container">
		<div class="foot-content box-maxWidth">
			<div class="foot-top flex">
				<div class="foot-box foot-two flex">
					<div class="foot-left">
						<div>
							<a :href="item.link" v-for="item in linkData_0">
								<span>{{item.title}}</span>
							</a>
						</div>
					</div>
					<div class="foot-right">
						<div>
							<a :href="item.link" v-for="item in linkData_1">
								<span>{{item.title}}</span>
							</a>
						</div>
					</div>
				</div>
				<div class="foot-box flex foot-box-flex">
					<div>
						<a :href="item.link" v-for="item in linkData_2">
							<span>{{item.title}}</span>
						</a>
					</div>
				</div>
				<div class="foot-box flex foot-box-flex">
					<div>
						<a :href="item.link" v-for="item in linkData_3">
							<span>{{item.title}}</span>
						</a>
					</div>
				</div>
				<div class="foot-box">
					<div class="foot-wechart flex">
						<div class="foot-img">
							<img :src="weChartQrCodeImageUrl" alt="">
						</div>
						<div class="foot-text">
							<p>微信扫描</p>
							<p>添加关注</p>
							<p>账号：A迈嘉网络</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="foot-bottom">
			<div class="box-maxWidth">
				<div class="flex foot-flex">
					 <!--<div class="foot-logo">-->
						<!--<img src="../../assets/logo.png" alt="img">-->
					<!--</div>-->
					<div class="foot-copy">

            <a class="login-filingNumber-to" href="http://www.miitbeian.gov.cn/" target="_blank">Copyright© 2018蝶儿飞 蜀ICP备16012455号-2</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import {getPublicConfigData} from '../../assets/js/public'
	export default{
		name:'foot',
		data(){
			return{
				linkData_0:[
					// {name:'关于我们',url:'www.baidu.com'},
					// {name:'帮助中心',url:'www.baidu.com'},
					// {name:'诚聘英才',url:'www.baidu.com'},
					// {name:'法律申明',url:'www.baidu.com'},
				],
				linkData_1:[
					// {name:'需求方',url:'www.baidu.com'},
					// {name:'发布规则',url:'www.baidu.com'},
					// {name:'邀请规则',url:'www.baidu.com'},
					// {name:'服务保障',url:'www.baidu.com'},
				],
				linkData_2:[
					// {name:'资源方',url:'www.baidu.com'},
					// {name:'申请规则',url:'www.baidu.com'},
					// {name:'交易规则',url:'www.baidu.com'},
				],
				linkData_3:[
					// {name:'我有话说',url:'www.baidu.com'},
					// {name:'意见反馈',url:'www.baidu.com'},
					// {name:'我要投诉',url:'www.baidu.com'},
					// {name:'客服热线',url:'www.baidu.com'},
				],
        weChartQrCodeImageUrl:''
			}
		},
    mounted(){
      //获取网站的logo地址
      getPublicConfigData('system_config_weixin_code_main',(params)=>{
        this.weChartQrCodeImageUrl = params.data
      },null,(params)=>{

      })
      //获取底部导航的菜单栏数据
      getPublicConfigData('system_footerNav',(params)=>{
        let footerNavArrData = JSON.parse(params.data);
        this.linkData_0 = footerNavArrData[0]
        this.linkData_1 = footerNavArrData[1]
        this.linkData_2 = footerNavArrData[2]
        this.linkData_3 = footerNavArrData[3]

      },null,(params)=>{

      })
    }
	}
</script>

<style scoped lang="less">
	.foot-container{
		background: #1b1b1b;
		&,a{
			color: rgba(255,255,255,0.7);
		}
		.foot-content{
			padding: 15px 0;
			.foot-top{
				justify-content: space-between;
			}
			.foot-box{
				border-right: 1px solid rgba(255,255,255,0.1);
				text-align: left;
				width: 270px;
				padding: 30px 0;
				&.foot-box-flex{
					justify-content: center;
				}
				&:first-child{
					width:400px;
					justify-content: space-around;
				}
				&:last-child{
					border-right:0;
				}
				a{
					display: block;
					transition: 0.3s;
					&:hover{
						color:#fff;
						span{
							border-bottom: 1px solid #fff;
						}
					}
				}
				.foot-wechart{
					justify-content: center;
					text-align: left;
					align-items: center;
					.foot-img{
						width: 72px;
						height: 72px;

						margin-right: 15px;
					}
				}
			}
		}
		.foot-bottom{
			border-top: 1px solid rgba(255,255,255,0.7);
			padding:10px 0;
			.foot-flex{
				justify-content: center;
				align-items: center;
			}
			.foot-copy{
				text-align: center;
			}
		}
    .login-filingNumber-to{
      color: #999;
    }
	}
</style>
