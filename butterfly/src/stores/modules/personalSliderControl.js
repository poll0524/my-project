import {axiosReqPost,getToken,base64_encode,getCurrentRole} from '../../assets/js/public.js'

const mjCertify = {
	'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'0',state:'审核中...'},
	'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'0',state:'审核中...'},
	'MJ_CERIIFY_EXAMINE_RESULT_TYPE_PASS':{value:'2',state:'审核通过'},
	'MJ_CERIIFY_EXAMINE_RESULT_TYPE_REJECT':{value:'3',state:'审核被拒绝'}
}

const state = {
	sliderDatas:[
    {
      name:'个人首页',
      children:[
        {name:'个人首页',type:0,routerLink:'/personalIndex'}
        ]
    },
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
						{name:'艺人申请',show:false,routerLink:'/ActorApply'},
						{name:'艺人资料',show:false,routerLink:'/ActorEdit'},
						{name:'艺人实名',show:false,routerLink:'/ActorRealname'},
						{name:'艺人档期',show:false,routerLink:'/ActorSchedule'},
					]
				},
				/*{
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
				},*/
				{
					name:'策划公司',
					type:1,
					id:'s_4',
					children:[
						{name:'策划公司申请',show:false,routerLink:'/CompanyApply'},
						{name:'策划公司资料',show:false,routerLink:'/CompanyEdit'},
						{name:'策划公司实名',show:false,routerLink:'/PlanCompanyApply'}
					]
				}
			]
		},
		// {
		// 	name:'增值服务',
		// 	children:[
		// 		{name:'VIP服务',type:0,routerLink:'/VipServer'},
		// 		{name:'置顶服务',type:0,routerLink:'/TopServer'},
		// 		{name:'保证金服务',type:0,routerLink:'/BailServer'},
		// 		{name:'交易记录',type:0,routerLink:'/TransactionHistory'},
		// 	]
		// },
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
	],
	checkActorFlag:'',
	checkCompanyFlag:'',
	checkActorMsg:'',
	checkCompanyMsg:'',
}

const getters = {
	showsliderData:state=>state.sliderDatas,
	showCheckActorFlag:state=>state.checkActorFlag,
	showCheckCompanyFlag:state=>state.checkCompanyFlag,
	showCheckActorMsg:state=>state.checkActorMsg,
	showCheckCompanyMsg:state=>state.checkCompanyMsg
}

const actions = {
	getToCheckType({commit}){
		commit('getCheckType')
	}
}

const mutations = {
	getCheckType(state){
		getCurrentRole((params)=>{
			let actorLinks =[
				{name:'艺人申请',routerLink:'/ActorApply'},
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
			// if(!params.certifies){
				state.sliderDatas[3].children[0].children[0].show = true;
				state.sliderDatas[3].children[1].children[0].show =true;
			// }
			if(params.certifies){
				params.certifies.forEach((item)=>{
					if(item.certifyType == 'artist'){
						state.sliderDatas[3].children[0].children[0].show = false;
						state.sliderDatas[3].children[0].children[1].show = true;
						for(let key in mjCertify){
							if(key == item.result){
								state.checkActorMsg = mjCertify[key].state
								state.checkActorFlag = mjCertify[key].value
							}
						}
						if(item.result == 'MJ_CERIIFY_EXAMINE_RESULT_TYPE_PASS'){
							state.sliderDatas[3].children[0].children[2].show = true;
							state.sliderDatas[3].children[0].children[3].show = true;
						}
					}
					if(item.certifyType == 'planningCompany'){
						state.sliderDatas[3].children[1].children[0].show = false;
						state.sliderDatas[3].children[1].children[1].show = true;
						for(let key in mjCertify){
							if(key == item.result){
								state.checkCompanyMsg = mjCertify[key].state
								state.checkCompanyFlag = mjCertify[key].value
								console.log()
							}
						}
						if(item.result == 'MJ_CERIIFY_EXAMINE_RESULT_TYPE_PASS'){
							state.sliderDatas[3].children[1].children[2].show = true;
						}
					}
				})
			}

		},(err)=>{})
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
