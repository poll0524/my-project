import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/indexComponents/index'

import HomePage from '@/components/homePageComponents/homePageComponents'

import Login from '@/components/loginComponents/login'
import Register from '@/components/registerComponents/register'
import ForgetPassword from '@/components/forgetPasswordComponents/forgetPassword'

import Case from '@/components/caseComponents/case'
import CaseContent from '@/components/caseComponents/caseContent'

import News from '@/components/newsComponents/news'
import NewsContent from '@/components/newsComponents/newsContent'
//规则中心
import Agreements from '@/components/agreementsComponents/agreement'
import ServiceAgreement from '../components/agreementsComponents/serviceAgreement'

// 艺人
import Actor from '@/components/actorComponents/actorComponents'
import SingleActor from '@/components/singleActorComponents/singleActor'
//公司
import Company from '@/components/companyComponents/companyComponents'
import SingleCompany from '@/components/singleCompanyComponents/singleCompany'

// 需求
import Needs from '@/components/needsComponents/needsComponents'
import SingleNeed from '@/components/singleNeedComponents/singleNeed'
import PublishNeeds from '@/components/publishNeedsComponents/publishNeedsComponents'
//需求修改
import EditNeeds from '@/components/publishNeedsComponents/editNeedsComponents'

//个人中心
import Personal from '@/components/personalComponents/personalComponents'
import PersonalIndex from '@/components/personalComponents/personalIndexComponents/personalIndexComponents'

//主办方
import Sponsor from '@/components/personalComponents/sponsorComponents/sponsor'
import SponsorEdit from '@/components/personalComponents/sponsorComponents/sponsorEdit'
import SponsorCompany from '@/components/personalComponents/sponsorCompanyComponents/sponsorCompany'
import SponsorCompanyEdit from '@/components/personalComponents/sponsorCompanyComponents/sponsorCompanyEdit'



//艺人申请
import ActorApply from '@/components/personalComponents/actorApplyComponents/actorApplyComponents'
import ActorFirstStep from '@/components/personalComponents/actorApplyComponents/firstApply'
import ActorTwoStep from '@/components/personalComponents/actorApplyComponents/twoApply'
import ActorThreeStep from '@/components/personalComponents/actorApplyComponents/threeApply'
import ActorSchedule from '@/components/personalComponents/actorApplyComponents/actorSchedule'
import ActorRealname from '@/components/personalComponents/actorApplyComponents/actorRealname'

//艺人资料
import ActorEdit from '@/components/personalComponents/actorEditComponents/actorEdit'

// 公司申请
import CompanyApply from '@/components/personalComponents/companyApplyComponents/companyApplyComponents'
import CompanyFirstStep from '@/components/personalComponents/companyApplyComponents/firstApply'
import CompanyTwoStep from '@/components/personalComponents/companyApplyComponents/twoApply'
import CompanyThreeStep from '@/components/personalComponents/companyApplyComponents/threeApply'
import CompanyRealname from '@/components/personalComponents/companyApplyComponents/companyRealname'

//公司资料
import CompanyEdit from '@/components/personalComponents/companyEditComponents/companyEdit'

// 艺人团队
import TeamApply from '@/components/personalComponents/actorGroupApplyComponents/actorGroupApplyComponents'
import TeamFirstStep from '@/components/personalComponents/actorGroupApplyComponents/firstApply'
import TeamTwoStep from '@/components/personalComponents/actorGroupApplyComponents/twoApply'
import TeamThreeStep from '@/components/personalComponents/actorGroupApplyComponents/threeApply'
import TeamRealname from '@/components/personalComponents/actorGroupApplyComponents/actorGroupRealname'
// 团队资料
 import TeamMaterial from '@/components/personalComponents/groupEditComponents/groupEdit'

//经纪人
import Broker from '@/components/personalComponents/brokerComponents/broker'
import BrokerEdit from '@/components/personalComponents/brokerComponents/brokerEdit'
// import BrokerFirst from '@/components/personalComponents/brokerComponents/brokerFirstStep'
// import BrokerSecond from '@/components/personalComponents/brokerComponents/brokerSecond'

 // 账户管理
 import SecurityIdx from '@/components/personalComponents/accountManagementComponents/accountSecurityComponents/accountSecurityIndex'
 import Security from '@/components/personalComponents/accountManagementComponents/accountSecurityComponents/accountSecurity'
 import InitPsw from '@/components/personalComponents/accountManagementComponents/accountSecurityComponents/installPassword'
 import InitPhone from '@/components/personalComponents/accountManagementComponents/accountSecurityComponents/installPhone'
 import InitEmail from '@/components/personalComponents/accountManagementComponents/accountSecurityComponents/installEmail'

//我的钱包
  import Wallet from '@/components/personalComponents/accountManagementComponents/walletComponents/wallet'
//个人信息
 import BasicInfo from '@/components/personalComponents/accountManagementComponents/basicInfoComponents/basicInfo'

//消息中心
import NewsIdx from '@/components/personalComponents/newsComponents/newsComponents'

//我的发布
import NeedsOrder from "@/components/personalComponents/orderManageComponents/myPublisher/needsOrderComponents"
import TradeOrder from "@/components/personalComponents/orderManageComponents/myPublisher/tradeOrderComponents"
import OrderRecord from "@/components/personalComponents/orderManageComponents/myPublisher/orderRecordComponents"

//我的报名
import RegisterOrder from "@/components/personalComponents/orderManageComponents/myEnroll/RegistrationOrderComponents"
import MyOrderRecord from "@/components/personalComponents/orderManageComponents/myEnroll/myOrderRecordComponents"

//我的评价
import MyComment from '@/components/personalComponents/orderManageComponents/myComment/commentBox'

import SearchPage from '@/components/searchBoxComponents/searchPage'

//联系客服
import ContactService from '@/components/personalComponents/contactServiceComponents/contactService'


Vue.use(Router)

export default new Router({

  routes: [
	{
	  	path: '/',
	    name: 'HomePage',
	    component: HomePage,
	    redirect:'/Index',
	    children:[
	        {
		      path: '/Index',
		      name: 'Index',
		      component: Index
		    },
		    {
		    	path: '/actor',
			    name: 'Actor',
			    component: Actor
		    },
        {
          path: '/actorinfo',
          name: 'singleActor',
          component: SingleActor
        },
        {
          path: '/sucexm',
          name: 'Case',
          component: Case
        },
        {
          path:'/caseContent',
          name:'CaseContent',
          component:CaseContent
        },{
          path: '/talk',
          name: 'news',
          component: News
        },
        {
          path: '/newsContent',
          name: 'newsContent',
          component: NewsContent
        },
		    {
		    	path: '/company',
			    name: 'company',
			    component: Company
		    },
        {
          path:'/companyInfo',
          name:'companyInfo',
          component:SingleCompany
        },
        {
          path: '/needs',
          name: 'needs',
          component: Needs
        },
        {
          path: '/needInfo',
          name: 'singleNeed',
          component: SingleNeed
        },
        {
          path: '/publishNeeds',
          name: 'publishNeeds',
          component: PublishNeeds
        },
        {
          path: '/EditNeeds',
          name: 'EditNeeds',
          component: EditNeeds
        },
        {
          path:'/agreement',
          name:'agreement',
          component:Agreements,
          redirect:'/serviceAgreement',
          children:[
            {
              path:'/serviceAgreement',
              name:'serviceAgreement',
              component:ServiceAgreement,
            }
          ]
        },
        {
          path:'/personal',
          name:'personal',
          component:Personal,
          redirect:'/personalIndex',
          children:[
            {
              path:'/personalIndex',
              name:'personalIndex',
              component:PersonalIndex,
            },
            {
              path:'/ActorApply',
              name:'ActorApply',
              component:ActorApply,
            },
            {
              path:'/ActorRealname',
              name:'ActorRealname',
              component:ActorRealname,
            },
            {
              path:'/ActorEdit',
              name:'ActorEdit',
              component:ActorEdit,
            },
            {
              path:'/BrokerApply',
              name:'Broker',
              component:Broker,
            },
            {
              path:'/BrokerEdit',
              name:'BrokerEdit',
              component:BrokerEdit,
            },
            {
              path:'/sponsorEdit',
              name:'SponsorEdit',
              component:SponsorEdit,
            },
            {
              path:'/sponsor',
              name:'Sponsor',
              component:Sponsor,
            },
            {
              path:'/sponsorCompanyEdit',
              name:'SponsorCompanyEdit',
              component:SponsorCompanyEdit,
            },
            {
              path:'/sponsorCompany',
              name:'sponsorCompany',
              component:SponsorCompany
                     ,
            },
            {
              path:'/ActorSchedule',
              name:'ctorSchedule',
              component:ActorSchedule
			      },
            {
              path:'/CompanyApply',
              name:'CompanyApply',
              component:CompanyApply,
            },
            {
              path:'/PlanCompanyApply',
              name:'CompanyRealname',
              component:CompanyRealname,
            },
            {
              path:'/CompanyEdit',
              name:'CompanyEdit',
              component:CompanyEdit,
            },
            {
              path:'/TeamApply',
              name:'TeamApply',
              component:TeamApply,
              redirect:'/TeamFirstStep',
              children:[
                {
                  path:'/TeamFirstStep',
                  name:'TeamFirstStep',
                  component:TeamFirstStep,
                },
                {
                  path:'/TeamTwoStep',
                  name:'TeamTwoStep',
                  component:TeamTwoStep,
                },
                {
                  path:'/TeamThreeStep',
                  name:'TeamThreeStep',
                  component:TeamThreeStep,
                }
              ]
            },
            {
              path:'/TeamRealname',
              name:'TeamRealname',
              component:TeamRealname,
            },
            {
              path:'/TeamMaterial',
              name:'TeamMaterial',
              component:TeamMaterial,
            },
            {
              path:'/Security',
              name:'SecurityIdx',
              component:SecurityIdx,
              children:[
                {
                  path:'/Security',
                  name:'Security',
                  component:Security,
                },
                {
                  path:'/InitPsw',
                  name:'InitPsw',
                  component:InitPsw,
                },
                {
                  path:'/InitPhone',
                  name:'InitPhone',
                  component:InitPhone,
                },
                {
                  path:'/InitEmail',
                  name:'InitEmail',
                  component:InitEmail,
                }
              ]
            },
            {
              path:'/NewsIdx',
              name:'NewsIdx',
              component:NewsIdx
            },
            {
              path:'/Wallet',
              name:'Wallet',
              component:Wallet,
              redirect:'/walletIndex',
              children:[
                {
                  path:'/walletIndex',
                  name:'walletIndex',
                  // component:walletIndex
                }
			        ]
            },
            {
              path:'/PersonInfo',
              name:'BasicInfo',
              component:BasicInfo
            },
            {
              path:'/NeedsOrder',
              name:'NeedsOrder',
              component:NeedsOrder
            },
            {
              path:'/TradeOrder',
              name:'TradeOrder',
              component:TradeOrder
            },
            {
              path:'/OrderRecord',
              name:'OrderRecord',
              component:OrderRecord
            },
            {
              path:'/RegisterOrder',
              name:'RegisterOrder',
              component:RegisterOrder
            },
            {
              path:'/MyOrderRecord',
              name:'MyOrderRecord',
              component:MyOrderRecord
            },
            {
              path:'/MyComment',
              name:'MyComment',
              component:MyComment
            },
            {
              path:'/ContactService',
              name:'contactService',
              component:ContactService
            }
          ]
        },
        {
          path:'/searchPage',
          name:'searchPage',
          component:SearchPage
        }
	    ]
	},
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/forgetPassword',
      name:'ForgetPassword',
      component:ForgetPassword
    }
  ],
  scrollBehavior (to, from, savedPosition) {
   return { x: 0, y: 0 }
  }
})
