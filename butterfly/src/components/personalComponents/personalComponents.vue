<template>
	<div class="personal-container">
		<div class="box-maxWidth">
			<div class="personal-search">
				<SearchBox/>
			</div>
			<div class="person-contentbox flex">
				<SliderItem :sliderData="showsliderData"/>
				<div class="personal-content">
					<router-view/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const mjCertify = {
		'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'0',state:'待审核'},
		'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'1',state:'审核中'},
		'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'2',state:'审核通过'},
		'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'3',state:'审核被拒绝'}
	}
	import SearchBox from '../searchBoxComponents/searchBox'
	import SliderItem from './personalSlider'
	import {mapGetters,mapActions} from "vuex";
	import {axiosReqGet,getToken,formatTime,saveReadToken,getCurrentRole} from '../../assets/js/public.js'
	export default {
		name:'personal',
		data(){
			return{
				/*sliderData:[
					{
						name:'账户管理',
						children:[
							{name:'账户安全',type:0,routerLink:'/Security'},
							{name:'个人信息',type:0,routerLink:'/PersonInfo'},
							{name:'我的钱包',type:0,routerLink:'/Wallet'}
						]
					},
					{
						name:'订单管理',
						children:[
							{
								name:'我的发布',
								type:1,
								id:'o_1',
								children:[
									{name:'需求订单',routerLink:'/NeedsOrder'},
									{name:'交易订单',routerLink:'/TradeOrder'},
									{name:'订单交易记录',routerLink:'/OrderRecord'}
								]
							},
							{
								name:'我的报名',
								type:1,
								id:'o_2',
								children:[
									{name:'报名订单',routerLink:'/RegisterOrder'},
									// {name:'订单交易记录',routerLink:'/MyOrderRecord'}
								]
							},
							{name:'我的评价',type:0,routerLink:'/MyComment'}
						]
					},
					{
						name:'身份管理',
						children:[
							{
								name:'艺人',
								type:1,
								id:'s_0',
								children:[
									{name:'艺人申请',routerLink:'/ActorApply'},
									// {name:'艺人资料',routerLink:'/ActorEdit'},
									// {name:'艺人实名',routerLink:'/ActorRealname'},
									// {name:'艺人档期',routerLink:'/ActorSchedule'},
								]
							},
							{
								name:'艺人团队',
								type:1,
								id:'s_1',
								children:[
									{name:'团队申请',routerLink:'/TeamApply'},
									// {name:'团队资料',routerLink:'/TeamMaterial'},
									// {name:'团队实名',routerLink:'/TeamRealname'}
								]
							},
							{
								name:'经纪人',
								type:1,
								id:'s_2',
								children:[
					                {name:'经纪人申请',routerLink:'/BrokerApply'},
					                {name:'经纪人资料',routerLink:'/BrokerEdit'}
								]
							},
							{
								name:'主办方',
								type:1,
								id:'s_3',
								children:[
									{name:'个人申请',routerLink:'/sponsor'},
									{name:'个人资料',routerLink:'/sponsorEdit'},
									{name:'公司申请',routerLink:'/sponsorCompany'},
									{name:'公司资料',routerLink:'/sponsorCompanyEdit'}
								]
							},
							{
								name:'策划公司',
								type:1,
								id:'s_4',
								children:[
									{name:'策划公司申请',routerLink:'/CompanyApply'},
									// {name:'策划公司资料',routerLink:'/CompanyEdit'},
									// {name:'策划公司实名',routerLink:'/PlanCompanyApply'}
								]
							}
						]
					},
					{
						name:'增值服务',
						children:[
							{name:'VIP服务',type:0,routerLink:'/VipServer'},
							{name:'置顶服务',type:0,routerLink:'/TopServer'},
							{name:'保证金服务',type:0,routerLink:'/BailServer'},
							{name:'交易记录',type:0,routerLink:'/TransactionHistory'},
						]
					},
					{
						name:'客服服务',
						children:[
							{name:'联系客服',type:0,routerLink:'/ContactService'},
							{name:'帮助中心',type:0,routerLink:'/serviceAgreement'}
						]
					},
					{
						name:'我的消息',
						routerLink:'/NewsIdx'
					}
				],*/
				certify:'',
				checkCertify:['artist','group','company'],
			}
		},
		components:{
			SliderItem,
			SearchBox
		},
		computed:{
			...mapGetters({
				showAuthId:'showAuthId',
				showsliderData:'showsliderData'
			})
		},
		methods:{
			...mapActions({
				getToUserInfo:'getToUserInfo',
				getToCheckType:'getToCheckType'
			}),
			controlsSliders(){
				let arr = ['03','04','05','06'];
				this.showsliderData.forEach((item,i,key)=>{
					if(item.children){
						item.children.forEach((childItem,i)=>{
							if(this.showAuthId == '10' || this.showAuthId == '11'){
								if(childItem.id == 'o_2'){
									item.children.splice(i,1)
								}
							}else if(arr.indexOf(this.showAuthId)>=0){
								if(childItem.id == 'o_1'){
									item.children.splice(i,1)
								}
							}
						})
					}
				})
			},
			//获取身份
			getUserInfoHandler(){
				getCurrentRole((params)=>{
					let actorLinks =[
						{name:'艺人资料',routerLink:'/ActorEdit'},
						{name:'艺人实名',routerLink:'/ActorRealname'},
						{name:'艺人档期',routerLink:'/ActorSchedule'}
					]
					let groupLinks = [
						{name:'团队资料',routerLink:'/TeamMaterial'},
						{name:'团队实名',routerLink:'/TeamRealname'}
					]
					let companyLinks = [
						{name:'策划公司资料',routerLink:'/CompanyEdit'},
						{name:'策划公司实名',routerLink:'/PlanCompanyApply'}
					]
					if(params.certify){
						this.certify = params.certify.split(',')
						this.certify.forEach((item)=>{
							if(item == 'artist'){
								actorLinks.forEach((item)=>{
									this.showsliderData[2].children[0].children.push(item)
								})
							}
							if(item == 'group'){
								groupLinks.forEach((item)=>{
									this.showsliderData[2].children[1].children.push(item)
								})
							}
							if(item == 'company'){
								companyLinks.forEach((item)=>{
									this.showsliderData[2].children[4].children.push(item)
								})
							}
						})
					}

				},(err)=>{})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// this.sliderData = this.showsliderData;
				// console.log(this.sliderData)
				this.getToUserInfo();
				this.controlsSliders();
				this.getToCheckType();
				// this.getUserInfoHandler();
			})
     if(!getToken()){
       location.href = "#/login"
     }
		},
		watch:{
			showAuthId(){
				this.controlsSliders()
			},
			getToUserInfo(){
			}
		}
	}
</script>

<style lang="less">
	.personal-container{
		position: relative;
		padding-top: 100px;
		background: #f0f0f0;
		.box-maxWidth,.personal-search{
			position: relative;
			background: #fff;
		}
		.personal-search{
			margin:20px 0;
			height: 60px;
			.search-container{
				bottom:auto;
				top: 0;
				input{
					border:1px solid #ccc;
					height: 50px;
				}
				.search-btn{
					height: 50px;
					line-height: 50px;
				}
			}
		}

		/*neirong*/
		.personal-content{
			padding: 0 15px 25px;
			width: 950px;
			background: #fff;
		}
	}
</style>
