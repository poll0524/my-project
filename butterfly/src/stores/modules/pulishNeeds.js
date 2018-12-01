import {axiosReqPost,getToken,base64_encode,regEX,axiosReqGet,formatTime,axiosReqMethods,axiosReqDelete,getCurrentRole} from '../../assets/js/public.js'
import Vue from 'vue'

const classify = require('../../assets/js/classify.js')

const state={
	tabLength:1,
	memberLength:1,
	memberActiveIdx:0,
	activeIndex:0,
	defaultSkills:{
		reciveOneIndex:null,
		reciveTwoIndex:null
	},
	formHeadData:{
		title:'',
		introduce:'',
		addressInfo:'',
		lineup:'',
		phone:'',
		address:'',
		date:new Date(),
	},
	formDataList:[
		{
			categories:'02',
			type:'',
			budget:'',
			number:'',
			max_limit:'',
			deadline:new Date(),
			supplement:'',
		}
	],
	memberHeadData:{},
	memberData:[{type:0}],
	delFlag:false,
	needsModalFlag:false,
	contentType:'',
	draftFlag:false,
	editNeedsData:{},
	editNeedsId:null

}

const getters={
	showActiveIndex:state=>{
		console.log(state.activeIndex)
		return state.activeIndex
	},
	showFormHeadData:state=>{
		return state.formHeadData
	},
	showTabLength:state=>state.tabLength,
	showMemberActiveIdx:state=>state.memberActiveIdx,
	showMemberLength:state=>state.memberLength,
	showFormDataList:state=>state.formDataList,
	showMemberData:state=>state.memberData,
	showMemberHeadData:state=>state.memberHeadData,
	showNeedsModalFlag:state=>state.needsModalFlag,
	showNeedsContentType:state=>state.contentType,
	showDraftFlag:state=>state.draftFlag,
	showDefaultSkills:state=>state.defaultSkills,
	showEditNeedsData:state=>state.editNeedsData
}

const actions={
	addToNeedsInfo({commit},type){
		commit('addNeedsInfo',type)
	},
	delToNeedsInfo({commit},value){
		commit('delNeedsInfo',value)
	},
	tabTochange({commit},value){
		commit('tabChange',value)
	},
	skillsToChange({commit},value){
		commit('skillsChange',value)
	},
	addressToChange({commit},value){
		commit('addressChange',value)
	},
	publishToNeeds({commit}){
		commit('publishNeeds')
	},
	needsToModalHandler({commit}){
		commit('needsModalHandler')
	},
	getToDraftHandler({commit}){
		commit('getDraftHandler')
	},
	initToFormData({commit}){
		commit('initFormData')
	},
	getToEditNeedsData({commit},id){
		commit('getEditNeedsData',id)
	},
	saveToChangeNeeds({commit}){
		commit('saveChangeNeeds')
	},
	getToCurrentUserInfo({commit}){
		commit('getCurrentUserInfo')
	}
}

const mutations={
	//获取用户信息
	getCurrentUserInfo(state){
		getCurrentRole((params)=>{
			console.log(params)
			state.formHeadData.phone = params.phone
		},(err)=>{})
	},
	//获取编辑数据
	getEditNeedsData(state,id){
		state.editNeedsId = id;
		let uri="demand/"+id;
		let token = getToken();
		axiosReqGet(uri,function(params){
			state.editNeedsData = params
			let addr = state.editNeedsData.location.split(' ')
			state.editNeedsData.addressInfo = addr[1];
			let hometown = addr[0].split(',')
			state.editNeedsData.hometown={
				province:hometown[0],
				city:hometown[1],
				area:hometown[2]
			}
			state.editNeedsData.max_limit = state.editNeedsData.maxLimit
			state.editNeedsData.deadline = formatTime(state.editNeedsData.deadline,'-').split(' ')[0];
			state.editNeedsData.date = formatTime(state.editNeedsData.date,'-').split(' ')[0];
			state.editNeedsData.lineup=state.editNeedsData.lineUp
			classify.classify.forEach((item,i)=>{
				item.childCity.forEach((chidItem,j)=>{
					if(chidItem.value == state.editNeedsData.type){
						state.defaultSkills.reciveOneIndex = i;
						state.defaultSkills.reciveTwoIndex = j
					}
				})
			})
			console.log(state.editNeedsData,state.defaultSkills)
		},token)
	},
	//获取草稿
	getDraftHandler(state){
		let url = '/draft';
		let token = getToken();
		console.log(classify)
	      axiosReqGet(url,function (params) {
	      	state.formHeadData.phone = params.phone
	      	state.formDataList[0].supplement = params.suppliment
	      	state.formDataList[0].type = params.type
	      	classify.classify.forEach((item,i)=>{
				item.childCity.forEach((chidItem,j)=>{
					if(chidItem.value == state.formDataList[0].type){
						state.defaultSkills.reciveOneIndex = i;
						state.defaultSkills.reciveTwoIndex = j
					}
				})
			})
	      	state.draftFlag = true
	      	console.log(state.defaultSkills)
	        console.log(params)
	      },token)
	},
	//新增需求
	addNeedsInfo(state,type){
		if(type=='needs'){
			state.tabLength++
			state.activeIndex=state.tabLength-1
			state.formDataList.push({
				categories:'02',
				type:'',
				budget:'',
				number:'',
				max_limit:'',
				deadline:new Date(),
				supplement:'',
			})
		}else if(type=='group'){
			state.memberLength++
			state.memberActiveIdx = state.memberLength-1
			state.memberData.push({type:state.memberActiveIdx})
		}
		state.delFlag=false
	},
	//删除单个需求
	delNeedsInfo(state,value){
		if(value.addType=='needs'){
			state.tabLength--;
			state.activeIndex=state.tabLength-1;
			state.formDataList.splice(value.index,1)
		}else if(value.addType=='group'){
			state.memberLength--
			state.memberActiveIdx = state.memberLength-1
			state.memberData.splice(value.index,1)
		}
	},
	//tab切换
	tabChange(state,value){
		if(value.addType=='needs'){
			state.activeIndex=value.index;
		}else if(value.addType == 'group'){
			state.memberActiveIdx = value.index
			console.log(state.memberActiveIdx)
		}
	},
	//技能切换
	skillsChange(state,value){
		console.log(value)
		if(value.editType){
			state.editNeedsData.type = value.value
		}else{
			state.formDataList[state.activeIndex].type=value.value
		}

	},
	//发布需求
	publishNeeds(){
		var demends='',
		    demendsObj={};
		    if(state.formHeadData.address.split(',')[0] == '省' || state.formHeadData.address == ''){
		    	state.needsModalFlag = true;
	    		state.contentType = 'addrType'
	    		return;
		    }
		    if(state.formHeadData.address.split(',')[0] == '台湾省'){
		    	state.formHeadData.address = '台湾省'
		    }
		    for(let key in state.formHeadData){
		    	demendsObj[key]=state.formHeadData[key]
		    }
		    demendsObj['address']=demendsObj['address']+' '+demendsObj['addressInfo']
		    demendsObj['date'] = new Date(demendsObj['date']).valueOf()
		    delete demendsObj.addressInfo
		    for(let i=0;i<state.formDataList.length;i++){
		    	state.formDataList[i].deadline=new Date(state.formDataList[i].deadline).valueOf();
		    	for(let key in demendsObj){
		    		state.formDataList[i][key]=demendsObj[key]
		    	}
		    }
		    for(let i=0;i<state.formDataList.length;i++){
		    	if(Number(state.formDataList[i].deadline)>Number(demendsObj['date'])){
		    		state.needsModalFlag = true;
		    		state.contentType = 'dateType'
		    		return;
		    	}
		    	if(!regEX(state.formDataList[i].budget).checkBudget){
		    		state.needsModalFlag = true;
					state.contentType = 'budgetType'
					return;
				}
				if(!regEX(state.formDataList[i].number).checkNumber || !regEX(state.formDataList[i].max_limit).checkNumber || Number(state.formDataList[i].number)==0 || Number(state.formDataList[i].max_limit) == 0){
					state.needsModalFlag = true;
					state.contentType = 'rightNumber'
					return
				}
				if(Number(state.formDataList[i].number)>Number(state.formDataList[i].max_limit)){
					state.needsModalFlag = true;
					state.contentType = 'maxLimit'
					return;
				}
		    	for(let key in state.formDataList[i]){
		    		if(state.formDataList[i][key]==''&& key !='supplement'){
		    			state.needsModalFlag = true;
		    			state.contentType = 'content'
		    			return;
		    		}
		    	}
		    	demends+=JSON.stringify(state.formDataList[i])+';'
		    }
		    demends=JSON.stringify({demands:demends.replace(/;$/,'')})
		var jsonDemends = base64_encode(encodeURIComponent(demends))
		// console.log(jsonDemends)
		var uri='demand',
			token=getToken();
			axiosReqPost(uri,
				function(params){
					// alert(params.message)
					if(params.message){
						state.needsModalFlag = true;
						state.contentType = 'success'
					}
				}, token, jsonDemends)

	},
	//保存修改
	saveChangeNeeds(state){
		// console.log(state.editNeedsData)
		var demends='';
		console.log(state.editNeedsData.hometown)
		if(typeof(state.editNeedsData.hometown) == 'object'){
			state.editNeedsData.hometown = state.editNeedsData.hometown.province +','+state.editNeedsData.hometown.city+','+state.editNeedsData.hometown.area
		}else if(typeof(state.editNeedsData.hometown) == 'string'){
			let hometown = state.editNeedsData.hometown.split(',')[0];
				if( hometown == '省' || hometown == ''){
			    	state.needsModalFlag = true;
		    		state.contentType = 'addrType'
		    		return;
			    }
			    if( hometown == '台湾省'){
			    	state.editNeedsData.hometown = '台湾省'
			    }
			
		}
	    	if(Number(state.editNeedsData.deadline)>Number(state.editNeedsData.date)){
	    		state.needsModalFlag = true;
	    		state.contentType = 'dateType'
	    		return;
	    	}
	    	if(!regEX(state.editNeedsData.budget).checkBudget){
	    		state.needsModalFlag = true;
				state.contentType = 'budgetType'
				return;
			}
			if(Number(state.editNeedsData.number)>Number(state.editNeedsData.max_limit)){
				state.needsModalFlag = true;
				state.contentType = 'maxLimit'
				return;
			}
	    	for(let key in state.editNeedsData){
	    		if(typeof(state.editNeedsData[key])=='string'&&state.editNeedsData[key]==''&& key !='supplement'){
	    			state.needsModalFlag = true;
	    			state.contentType = 'content'
	    			return;
	    		}
	    	}
	    	delete state.editNeedsData.state;
	    	state.editNeedsData.categories = state.editNeedsData.categories.id
	    	state.editNeedsData.deadline = new Date(state.editNeedsData.deadline).valueOf();
	    	state.editNeedsData.date = new Date(state.editNeedsData.date).valueOf();
	    	state.editNeedsData.address = state.editNeedsData.hometown+' '+state.editNeedsData.addressInfo
	    	console.log(state.editNeedsData)
		    demends=JSON.stringify({demands:JSON.stringify(state.editNeedsData)})
		var jsonDemends = base64_encode(encodeURIComponent(demends))
		// console.log(jsonDemends)
		var uri='demand/'+state.editNeedsId,
			token=getToken();
			axiosReqMethods(uri,
				function(params){
					// alert(params.message)
					if(params.message){
						state.needsModalFlag = true;
						state.contentType = 'success'
					}
				},function(err){},token, jsonDemends,'PUT')
	},
	//地址切换
	addressChange(state,value){
		if(value.type == 'needs'){
			state.formHeadData.address=value.addr
		}else if(value.type == 'editNeeds'){
			state.editNeedsData.hometown = value.addr
		}
		console.log(state.editNeedsData)
	},
	//弹窗显示隐藏
	needsModalHandler(state){
		state.needsModalFlag = false
	},
	//初始化
	initFormData(state){
		state.formHeadData={
			title:'',
			introduce:'',
			addressInfo:'',
			lineup:'',
			phone:'',
			address:'',
			date:new Date(),
		}
		state.formDataList=[
			{
				categories:'02',
				type:'',
				budget:'',
				number:'',
				max_limit:'',
				deadline:new Date(),
				supplement:'',
			}
		]
		state.tabLength=1
		state.activeIndex=0
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}