import {axiosReqPost,getToken,base64_encode} from '../../assets/js/public.js'
import classify from '../../assets/js/classify.js'

const skillsClassify = classify.classify


const state = {
	skillsData:skillsClassify,
	skillIndex:1,
	showModal:false,
	chooseSkillData:[],
	skillDataChildren:skillsClassify[1],
	reciveType:'',
	memberHeadSkillData:[],
	memberBodyData:{0:[],1:[],2:[],3:[],4:[]},
	memberBodyIdx:0,
	tempArr:[]
}

const getters = {
	showSkillsData:state=>state.skillsData,
	showChooseData:state=>state.chooseSkillData,
	showMemberHeadSkillData:state=>state.memberHeadSkillData,
	showMemberBodyData:state=>state.memberBodyData,
	showSkillIndex:state=>state.skillIndex,
	showSkillModal:state=>state.showModal,
	shwoReciveType:state=>state.reciveType
}

const actions = {
	showToModalHandler({commit},type){
		commit('showModalHandler',type)
	},
	skillToChange({commit},value){
		commit('skillsChangeHandler',value)
	},
	skillInfoToChange({commit},idx){
		commit('skillInfoHandler',idx)
	},
	delToSkill({commit},idx){
		commit('delSkill',idx)
	},
	cancelToChooseSkill({commit}){
		commit('cancelChooseSkill')
	},
	sureToChooseSkill({commit}){
		commit('sureChooseSkill')
	},
	skillsToDataHandler({commit},data){
		commit('skillsDataHandler',data)
	}
}

const mutations = {
	//接受参数
	skillsDataHandler(state,data){
		if(data.type == 'actor'){
			state.chooseSkillData = data.data
		}
	},
	//modal显示
	showModalHandler(state,type){
		state.showModal = !state.showModal
		console.log(type)
		if(typeof(type) == 'string'){
			state.reciveType = type;
		}else{
			state.reciveType = type.type
			state.memberBodyIdx = type.idx
		}
	},
	//一级选择
	skillsChangeHandler(state,value){
		state.skillIndex = value.idx;
		state.skillDataChildren = value.item
	},
	//二级选择
	skillInfoHandler(state,idx){
		if(state.reciveType == 'singleActor'){
			if(state.chooseSkillData.length<5&&state.chooseSkillData.indexOf(state.skillDataChildren.childCity[idx].value)<0){
				state.chooseSkillData.push(state.skillDataChildren.childCity[idx].value)
				console.log(state.chooseSkillData)
			}
		}else if(state.reciveType == 'groupHead'){
			if(state.memberHeadSkillData.length<5&&state.memberHeadSkillData.indexOf(state.skillDataChildren.childCity[idx])<0){
				state.memberHeadSkillData.push(state.skillDataChildren.childCity[idx])
			}
		}else if(state.reciveType == 'groupMember'){
			if(state.memberBodyData[state.memberBodyIdx].length<5&&state.memberBodyData[state.memberBodyIdx].indexOf(state.skillDataChildren.childCity[idx])<0){
				state.memberBodyData[state.memberBodyIdx].push(state.skillDataChildren.childCity[idx])
			}
		}
	},
	//删除选中
	delSkill(state,params){
		if(params.type == 'singleActor'){
			console.log(state.chooseSkillData)
			state.chooseSkillData.splice(params.idx,1)
		}else if(params.type == 'groupHead'){
			state.memberHeadSkillData.splice(params.idx,1)
		}else if(params.type == 'groupMember'){
			if(params.delIdx !='undefined'){
				state.memberBodyData[params.delIdx].splice(params.idx,1)
			}else{
				state.memberBodyData[state.memberBodyIdx].splice(params.idx,1)
			}
		}
	},
	//取消选择
	cancelChooseSkill(state){
		state.showModal = false;
		state.tempArr=[]
		// if(state.reciveType == 'singleActor'){
		// 	state.chooseSkillData= [];
		// }else if(state.reciveType == 'groupHead'){
		// 	state.memberHeadSkillData= [];
		// }else if(state.reciveType == 'groupMember'){
		// 	state.memberBodyData[state.memberBodyIdx]= [];
		// }
	},
	//确定选择
	sureChooseSkill(state){
		state.showModal = false;
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
