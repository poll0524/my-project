import {axiosReqPost,getToken,base64_encode,getCurrentRole} from '../../assets/js/public.js'

//普通会员
const regularMember = ['02'];
//actor
const actorArr = ['03','04','05','06'];
//company
const companyArr = ['10','11'];
//经纪人
const brokerArr = ['07'];
//主办方
const sponsor = ['08','09'];
//能完善需求
const canPubNeeds = ['08','09','11']

const state = {
	authFlag:false,
	authType:'',
	authId:null,
	canClickFlag:false,
	certify:'',
	inviteContentType:''
}

const getters = {
	showAuthFlag:state=>state.authFlag,
	shwoAuthType:state=>state.authType,
	showClickFlag:state=>state.canClickFlag,
	showAuthId:state=>state.authId,
	showInviteContentType:state=>state.inviteContentType
}

const actions = {
	getToUserInfo({commit}){
		commit('getUserInfo')
	},
	closeToAuthModal({commit}){
		commit('closeAuthModal')
	},
	checkToCertify({commit},type){
		commit('checkCertify',type)
	},
	getToCurrentId({commit},id){
		commit('getCurrentId',id)
	}
}

const mutations = {
	//获取用户身份
	getUserInfo(state){
		getCurrentRole((params)=>{
			// console.log(params)
			state.authId = params.currentRole.id
			if(regularMember.indexOf(state.authId)>=0){
			state.authType = 'regularMember'
			return;
		}
		//能否发布需求布尔值canClickFlag
		if(actorArr.indexOf(state.authId)>=0 || sponsor.indexOf(state.authId)>=0){
			// state.canClickFlag = true
			state.authType = 'cantPublish'
		}
		if(companyArr.indexOf(state.authId)>=0 || canPubNeeds.indexOf(state.authId)>=0){
			state.canClickFlag = true
		}
		},(err)=>{
			if(!state.authId){
				state.authType = 'noLogin'
			}
		})
	},
	checkCertify(state,type){
		console.log(type)
		if(type){
			state.inviteContentType = type.type
		}
		if(!state.authId){
			state.authFlag = true;
			return
		}
		if(regularMember.indexOf(state.authId)>=0){
			state.authFlag = true;
			return;
		}
		//能否发布需求布尔值canClickFlag
		if(actorArr.indexOf(state.authId)>=0 || sponsor.indexOf(state.authId)>=0){
			state.authFlag = true;
			return
		}
		if(state.authId == '10'){
			state.authFlag = true;
			return;
		}

		if(canPubNeeds.indexOf(state.authId)<0){
			state.authFlag = true;
			return;
		}

	},
	//关闭modal
	closeAuthModal(state){
		state.authFlag = false
		state.canClickFlag = false
	},
	//获取当前身份ID
	getCurrentId(state,id){
		console.log(id)
		state.authId = id
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
