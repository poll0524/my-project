import {axiosReqPost,axiosReqGet,getToken,base64_encode,axiosReqDelete,axiosReqMethods,formatTime,regEX,getCurrentRole} from '../../assets/js/public.js'
const stateObj = {
	0:'待完善需求',
	1:'等待审核',
	2:'等待报名',
	3:'报名结束',
	4:'合作完成',
	5:'合作评价',
	7:'审核未通过',
	8:'报名已过期'
}
//艺人状态
const actorDemandEntryStatus={
	'MJ_DEMAND_ENTRY_STATUS_ENTERED':{text:'已报名',type:''},
  	'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_INVITED':{text:'邀请商谈中',type:'successRes'},
  	'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_ACCEPT':{text:'已接受商谈',type:'reciveChat'},
  	'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_REJECT':{text:'已拒绝商谈邀请',type:'refuseChat'},
  	'MJ_DEMAND_ENTRY_STATUS_IGNORED':{text:'已被忽略',type:'ignoreChart'},
  	'MJ_DEMAND_ENTRY_STATUS_INTERVIEWED':{text:'商谈已完成',type:'chatComplete'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_INVITED':{text:'已商谈/待确认合作',type:'cooRes'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_ACCEPT':{text:'已接受合作邀请',type:'cancelCoo'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_REJECT':{text:'已拒绝合作邀请',type:'refuseCoo'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_REJECT_INITIATIVE':{text:'合作被拒绝',type:'refuseCooed'},
  	'MJ_DEMAND_ENTRY_STATUS_MONEY_TRUSTEESHIP':{text:'劳务费托管中',type:'cancelCoo'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_COMPLETE':{text:'合作完成',type:'cooComplete'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_CANCEL_ING':{text:'取消合作中',type:'cancelCooing'},
  	'MJ_DEMAND_ENTRY_STATUS_COOPERATE_FAILURE':{text:'合作失败',type:'cooFail'},
  	'MJ_DEMAND_ENTRY_STATUS_ARTIST_COMMENT':{text:'已评价',type:'alreadyComment'}
}
//公司状态
const companyDemandEntryStatus = {
	'MJ_DEMAND_ORDER_STATE_WAIT_PAY':{text:'等待支付',type:'pay'},//去付款
	'MJ_DEMAND_ORDER_STATE_PAID_DOWN_PAYMENT':{text:'已付款',type:'cancelCoop'},//付款后，可取消合作
	'MJ_DEMAND_ORDER_STATE_MONEY_TRUSTEESHIP':{text:'资金托管中',type:'cooper'},//可合作完成，可取消合作
	'MJ_DEMAND_ORDER_STATE_CANCELED':{text:'取消合作',type:''},//合作已经取消
	'MJ_DEMAND_ORDER_STATE_CANCEL_ING':{text:'取消合作中',type:'cancelCoo'},//取消合作中
	'MJ_DEMAND_ORDER_STATE_COMPLETE':{text:'合作完成',type:'comment'},//合作完成，带评价
	'MJ_DEMAND_ORDER_STATE_COMPANY_COMMENT':{text:'已评价',type:''},//已评价
	'MJ_DEMAND_ORDER_STATE_BREAK_CONTRACT':{text:'毁约',type:'contactServer'},//毁约中，联系客服
}

const state = {
	orderTabIdx:0,
	applyIdx:0,
	contactIdx:0,
	commentIdx:0,
	infoFlag:false,
	modalFlog:false,
	allNeedsData:{
		needsOrderData:[],
		noOverOrderData:[],
		noPassOrderData:[]
	},
	needsInfoData:[],
	modalContentType:'',
	cutDownMinutes:null,
	cutDownSeconds:null,
	cutDownTime:1800,

	//邀请商谈data
	invitActorData:{
		inviteTime:new Date(),
		inviteAddr:'',
		inviteTelNum:'',
		inviteOther:'',
		inviteAddrInfo:''
	},
	inviteSuccessFlag:false,
	inviteContentFlag:false,
	noRealNameFlag:false,
	idBox:{
		userId:'',
		demandId:''
	},
	//邀请合作data
	inviteCooperData:{
		price:'',
		type:0,
		category:'',
		title:'',
		title_type:'',
		tax_number:"",
		content:'',
		comment:'',
		receiver_name:'',
		receiver_phone:'',
		receiver_address:'',
		need_invoice:0
	},
	inviteMessage:'',
	//我的报名
	enrollData:[],
	//邀约商谈
	inviteChatFlag:false,
	tipsType:'',
	enrollDemand_id:'',
	refuseCooperTips:{},
	tradeData:[],
	//订单状态modal
	tradeModalFlag:false,
	tradeModalType:'',
	payData:{},
	//订单交易记录
	tradeRecordData:[],
  //评价
  commentData:{
    reciveData:[],
    sendData:[],
    waitCommentData:[]
  },
  inviteTimeControl:''


}

const getters = {
	showOrderTabIdx:state=>state.orderTabIdx,
	showApplyIdx:state=>state.applyIdx,
	showContactIdx:state=>state.contactIdx,
	showCommentIdx:state=>state.commentIdx,
	showOrderModal:state=>state.modalFlog,
	showAllNeedsData:state=>state.allNeedsData,
	showInfoFlag:state=>state.infoFlag,
	showNeedsInfo:state=>state.needsInfoData,
	showModalContentType:state=>state.modalContentType,
	showCutDownMinutes:state=>state.cutDownMinutes,
	showCutDownSeconds:state=>state.cutDownSeconds,
	showCommentData:state=>state.commentData, //评价的内容
	showInvitActorData:state=>state.invitActorData,//邀请商谈资料
	showInviteSuccessFlag:state=>state.inviteSuccessFlag,//邀请成功弹窗
	showInviteContentFlag:state=>state.inviteContentFlag,//邀请商谈内容不完整提示
	showNoRealNameFlag:state=>state.noRealNameFlag,//未实名认证，提示实名
	showInviteCooperData:state=>state.inviteCooperData,//邀请合作资料
	showInviteMessage:state=>state.inviteMessage,
	showeEnrollData:state=>state.enrollData,//我的报名,
	showInviteChatFlag:state=>state.inviteChatFlag,
	showTipsType:state=>state.tipsType,
	showTradeData:state=>state.tradeData,//交易订单
	showTradeModalFlag:state=>state.tradeModalFlag,
	showTradeModalType:state=>state.tradeModalType,
	showTradeRecordData:state=>state.tradeRecordData,
	showInviteTimeControl:state=>state.inviteTimeControl
}

const actions = {
	tabToChange({commit},params){
		commit('tabChangeHandler',params)
	},
	seeToInfo({commit},idx){
		commit('seeNeedsInfoHandler',idx)
	},
	inviteOrCoop({commit},type){
		commit('inviteOrCoopHandler',type)
	},
	initToFlag({commit}){
		commit('initFlag')
	},
	cutDownToHandler({commit}){
		commit('cutDownHandler')
	},
    achieveToAllOrder({commit},param){
      commit('achieveAllOrder',param)
    },
    deletToNeeds({commit},params){
    	commit('deletNeeds',params)
    },
    overToEnter({commit},params){
    	commit('overEnter',params)
    },
    inviteToBackHandler({commit}){
    	commit('inviteBackHandler')
    },
    inviteToSendHandler({commit}){
    	commit('inviteSendHandler')
    },
    sendToCooperHandler({commit}){
    	commit('sendCooperHandler')
    },
    getToMyEnrollInfor({commit}){
    	commit('getMyEnrollInfor')
    },
    reciveOrRefuseHandler({commit},params){
    	commit('reciveOrRefuseHandler',params)
    },
    closeToTipsModalHandler({commit}){
    	commit('closeTipsModalHandler')
    },
    refuseToChatHandler({commit},data){
    	commit('refuseChatHandler',data)
    },
    getToTradeHandler({commit}){
    	commit('getTradeHandler')
    },
    tradeToPayHandler({commit},data){
    	commit('tradePayHandler',data)
    },
    goToPayHandler({commit},data){
    	commit('goPayHandler',data)
    },
    closeToTradeModal({commit}){
    	commit('closeTradeModal')
    },
    suerToCooper({commit}){
    	commit('suerCooper')
    },
    cancelToCooper({commit}){
    	commit('cancelCooper')
    },
    getToTradeRecordHandler({commit},tpye){
    	commit('getTradeRecordHandler',tpye)
    },
    getToCommentDataHandler({commit}){
	  commit('getCommentDataHandler')
    },
    sendToCommentDataHandler({commit}){
      commit('sendCommentDataHandler')
    },
    waitToCommentDataHandler({commit}){
	    commit('watiCommentDataHandler')
    }
}

const mutations = {
	tabChangeHandler(state,params){
		if(params.type=='allIdx'){
			state.orderTabIdx = params.idx
		}else if(params.type=='applyIdx'){
			state.applyIdx = params.idx
		}else if(params.type=='contactIdx'){
			state.contactIdx = params.idx
		}else if(params.type == 'comment'){
			state.commentIdx = params.idx
		}
	},
	seeNeedsInfoHandler(state,id){
		let uri = 'demand/'+id;
		let token = getToken();
		axiosReqGet(uri,function(params){
		state.infoFlag = true;
			// console.log(params)
			state.needsInfoData=[]
			for(let key in stateObj){
				if(params.state == key){
					params.stateText = stateObj[key]
				}
			}
			params.date = formatTime(params.date,'.').split(' ')[0];
			params.createtime = formatTime(params.createtime,'.').split(' ')[0];
			state.needsInfoData.push(params)
		},token)
		// state.needsInfoData.push()
	},
	initFlag(state){
		state.infoFlag = false
		state.needsInfoData=[]
	},
	//邀请/确定合作
	inviteOrCoopHandler(state,params){
		console.log(params)
		state.idBox = {
			userId:params.userID,
			demandId:params.demandId
		}
		state.modalFlog = !state.modalFlog
		state.modalContentType = params.type
		// if(params.type == 'ignore' || params.type == 'refuseCooper'){
		// 	setTimeout(()=>{
		// 		state.modalFlog = false
		// 	},3000)
		// }
		if(params.type == 'ignore' || params.type == 'refuseCooper'){
			this.commit('ignoreHandler',state.idBox)

		}
	},
	//忽略
	ignoreHandler(state,data){
		// entry?u_id="+u_id+"&d_id="+d_id
		let uri = 'entry?u_id='+data.userId+'&d_id='+data.demandId
		let token = getToken();
		let _this = this;
		axiosReqDelete(uri,function(params){
			console.log(params)
			_this.commit('seeNeedsInfoHandler',data.demandId)
			setTimeout(()=>{
				state.modalFlog = false
			},2000)
		},token)
	},
	//拒绝合作

	//倒计时
	cutDownHandler(state){
		var time = setInterval(()=>{
			state.cutDownTime--;
			state.cutDownMinutes = parseInt(state.cutDownTime/60);
			state.cutDownSeconds = parseInt(state.cutDownTime%60);
			state.cutDownMinutes = state.cutDownMinutes<10? '0'+ state.cutDownMinutes:state.cutDownMinutes
			state.cutDownSeconds = state.cutDownSeconds<10? '0'+ state.cutDownSeconds:state.cutDownSeconds
			if(state.cutDownTime==0){
				clearInterval(time)
			}
		},1000)
	},
 	 //获取审核通过的需求
	achieveAllOrder(state,param){
		state.orderTabIdx = 0;
	  	// state.allNeedsData.needsOrderData=[];
	  	// state.allNeedsData.noPassOrderData=[];
	  	// state.allNeedsData.noOverOrderData=[];
	  	// console.log(state.allNeedsData.needsOrderData)
	    let token = getToken();
		  if(param == 'allNeeds'){
	      let url = 'demand/list';
	      axiosReqGet(url,function (params) {
	      	// state.allNeedsData = params.content
		  	state.allNeedsData.needsOrderData=[];
	  		state.allNeedsData.noPassOrderData=[];
	      	let content  = params.content
	      	content.forEach((item)=>{
	      		for(let key in stateObj){
	      			if(key == item.state){
	      				item.stateText = stateObj[key]
	      			}
	      		}
	      		item.createtime = formatTime(item.createtime,'.').split(' ')[0];
	      		if(item.state !=7){
	      			state.allNeedsData.needsOrderData.push(item)
	      		}else{
	      			state.allNeedsData.noPassOrderData.push(item)
	      		}

	      	})
	        // console.log(content)
	      },token)
	    }else if(param == 'draft'){
	      let url = '/draft';
	      axiosReqGet(url,function (param) {
	    	state.allNeedsData.noOverOrderData=[];
	 		state.allNeedsData.noOverOrderData.push(param)
	        // console.log(param)
	      },token)
	    }

	},
	//删除未通过，草稿需求
	deletNeeds(state,params){
		console.log(params)
		let uriType = params.type == 'draft'?params.type:'allNeeds'
		let uri = '';
		let token = getToken();
		if(params.type == 'refuse'){
			uri = 'demand/'+params.id
		}else if(params.type == 'draft'){
			uri = 'draft/'+params.id
		}
		let _this = this;
		axiosReqDelete(uri,function(params){
			console.log(params)
			_this.commit('achieveAllOrder',uriType)
		},token)
	},
	//结束报名
	overEnter(state,params){
		console.log(params)
		let id = params.id;
		let type = params.infoType;
		let _this = this;
		let uri ="demand/"+params.id;
		let toekn  = getToken();
		let demends = base64_encode(encodeURIComponent(JSON.stringify({demands:JSON.stringify({state:'3'})})))
		axiosReqMethods(uri,function(params){
			console.log(params)
			if(type == 'needsInfo'){
				_this.commit('seeNeedsInfoHandler',id)
			}else{
				_this.commit('achieveAllOrder','allNeeds')
			}
		},function(err){},toekn,demends,'PUT')
	},
	//邀请弹窗返回
	inviteBackHandler(state){
		state.modalFlog = !state.modalFlog
		state.invitActorData = {
			inviteTime:new Date(),
			inviteAddr:'',
			inviteTelNum:'',
			inviteOther:'',
			inviteAddrInfo:''
		}
		state.inviteCooperData = {
			price:'',
			type:'0',
			category:'',
			title:'',
			title_type:'',
			tax_number:"",
			content:'',
			comment:'',
			receiver_name:'',
			receiver_phone:'',
			receiver_address:'',
			need_invoice:0
		}
	},
	//发送邀请
	inviteSendHandler(state){

		if(Number(new Date(state.needsInfoData[0].date).valueOf()) < Number(new Date(state.invitActorData.inviteTime).valueOf())){
			state.inviteContentFlag = true;
			state.inviteTimeControl = '商谈时间应该在演出日期之前'+ formatTime(new Date(state.needsInfoData[0].date).valueOf(),'-').split(' ')[0];
			setTimeout(()=>{
				state.inviteContentFlag = false
			},2000)
			return
		}else{
			state.inviteTimeControl = ''
		}
		state.invitActorData.inviteAddr = state.invitActorData.inviteAddr+' '+state.invitActorData.inviteAddrInfo;
		state.invitActorData.inviteTime = formatTime(new Date(state.invitActorData.inviteTime).valueOf(),'-');
		// console.log(state.invitActorData)
		for(let key in state.invitActorData){
			if(state.invitActorData[key] == ''&& key != 'inviteOther'){
				state.inviteContentFlag = true;
				setTimeout(()=>{
					state.inviteContentFlag = false
				},2000)
				return
			}
		}
		var bodyValueObj = {
			'demand_id':state.idBox.demandId,
			'user_id':state.idBox.userId,
			'content':state.invitActorData
		}
		let uri = 'entry/interview/invite';
		let demands = base64_encode(encodeURIComponent(JSON.stringify(bodyValueObj)));
		this.commit('invitHandler',{uri,demands,demandId:state.idBox.demandId})
	},
	//发送合作邀请
	sendCooperHandler(state){
		console.log(state.inviteCooperData)
		let demands={
			'u_id':state.idBox.userId,
			'd_id':state.idBox.demandId
		};

		demands.price = state.inviteCooperData.price;
		if(state.inviteCooperData.need_invoice == 0){
			demands.need_invoice = false
		}
		if(state.inviteCooperData.need_invoice == 1){
			demands.need_invoice = true
			demands.invoice = JSON.stringify(state.inviteCooperData)
		}

		let bodyValueObj = base64_encode(encodeURIComponent(JSON.stringify(demands)))
		let uri = 'entry/cooperation';
		this.commit('invitHandler',{uri,demands:bodyValueObj,demandId:state.idBox.demandId})
		console.log(demands)
	},
	//邀约函数
	invitHandler(state,data){
		let token = getToken();
		let _this =this;
		axiosReqPost(data.uri,function(params){
			console.log(params)
			state.inviteSuccessFlag = true;
			setTimeout(()=>{
			 	state.modalFlog = false;
			 	state.inviteSuccessFlag = false;
				state.invitActorData = {
					inviteTime:new Date(),
					inviteAddr:'',
					inviteTelNum:'',
					inviteOther:'',
					inviteAddrInfo:''
				}
				state.inviteCooperData = {
					price:'',
					type:0,
					category:'',
					title:'',
					title_type:'',
					tax_number:"",
					content:'',
					comment:'',
					receiver_name:'',
					receiver_phone:'',
					receiver_address:'',
					need_invoice:0
				}
			},2000)
			_this.commit('seeNeedsInfoHandler',data.demandId)
		},token,data.demands,null,function(err){
			state.inviteMessage = err.response.data.message
			state.noRealNameFlag = true
			setTimeout(()=>{
			 	state.noRealNameFlag = false;
			},2000)
		})
	},
	//获取交易订单
	getTradeHandler(state){
		//MJ_DEMAND_ORDER_STATE_WAIT_PAY
		//MJ_DEMAND_ORDER_STATE_COMPLETE
		let uri = 'd_order';
		let token = getToken();
		axiosReqGet(uri,function(params){
			console.log(params)
			state.commentData.waitCommentData = [];
			params.content.forEach((item)=>{
				item.updatetime = formatTime(item.updatetime,'-')
				item.createTime = formatTime(item.createtime,'-')
				for(let key in companyDemandEntryStatus){
					if(item.state == key){
						item.stateText = companyDemandEntryStatus[key].text;
						item.stateType = companyDemandEntryStatus[key].type;
					}
				}
				if(item.state == 'MJ_DEMAND_ORDER_STATE_COMPLETE'){
					state.commentData.waitCommentData.push({
						user_id:item.user.id,
						demand_id:item.id,
						createTime:item.createTime,
						title:item.demand.title,
						orderNum:item.ownerId,
						price:item.price,
						coopName:item.user.stageName,
						title:item.demand.title
					})
				}
			})
			state.tradeData = params.content
			console.log(params.content)
		},token)
	},
	//订单弹窗
	tradePayHandler(state,valueObj){
		state.tradeModalFlag = true
		console.log(valueObj)
		state.payData ={};
		if(valueObj.type == 'pay'){
			state.tradeModalType = 'pay';
			state.payData={
				auth_id:valueObj.auth_id,
				d_order_id:valueObj.d_order_id,
				related_d_id:valueObj.related_d_id,
				related_u_id:valueObj.related_u_id
			}
		}
		if(valueObj.type == 'suerCoop' || valueObj.type == 'cancelcooperate'){
			state.payData={
				status:valueObj.status,
				u_id:valueObj.u_id,
				id:valueObj.id
			}
		}
		if(valueObj.type == 'suerCoop'){
			state.tradeModalType = 'suerCoop';
		}
		if(valueObj.type == 'cancelcooperate'){
			state.tradeModalType = 'cancelcooperate';
		}
		console.log(state.tradeModalType)
	},
	//去支付
	goPayHandler(state,valueObj){
		state.tradeModalType = 'goPay'
		// window.open("http://192.168.3.91:8888/api/star/v1/trade/product/10?auth_id="+state.payData.auth_id+'&d_order_id='+state.payData.d_order_id+'&related_u_id='+state.payData.related_u_id+'&related_d_id='+state.payData.related_d_id)
		window.open("https://api.maxbutterfly.com/api/star/v1/trade/product/10?auth_id="+state.payData.auth_id+'&d_order_id='+state.payData.d_order_id+'&related_u_id='+state.payData.related_u_id+'&related_d_id='+state.payData.related_d_id)
	},
	//确认合作or 取消
	suerCooper(state){
		// state.tradeModalType = 'goPay'
		let uri='d_order/'+state.payData.id+'?status='+state.payData.status+'&u_id='+state.payData.u_id;
		let token = getToken();
		let _this = this;
		axiosReqMethods(uri,function(params){
			state.inviteChatFlag = true;
			setTimeout(()=>{
				state.inviteChatFlag = false;
				state.tradeModalFlag = false;
			},2000)
			_this.commit('getTradeHandler')
		},function(err){},token,null,'PUT')
	},
	//取消合作
	cancelCooper(state){

	},
	//取消，弹窗消失
	closeTradeModal(state){
		state.tradeModalFlag = false
	},
	/**
	 * 艺人订单
	 */
  //  获取报名的订单需求
  getMyEnrollInfor(){
      let uri = 'entry';
      let token = getToken();
      axiosReqGet(uri,function(params){
        console.log(params)
      	state.commentData.waitCommentData = [];
        params.content.forEach((item)=>{
          item.createtime = formatTime(item.createtime,'-')
          item.date = formatTime(item.date,'-')
          for(let key in actorDemandEntryStatus){
            if(item.demandEntryStatus == key){
              item.stateText = actorDemandEntryStatus[key].text
              item.stateType = actorDemandEntryStatus[key].type
            }
          }
          //MJ_DEMAND_ORDER_STATE_WAIT_PAY
          ///MJ_DEMAND_ENTRY_STATUS_COOPERATE_COMPLETE
          if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_COOPERATE_COMPLETE'){
          	state.commentData.waitCommentData.push({
				user_id:item.publisherId,
				demand_id:item.id,
				createTime:item.createtime,
				title:item.title,
				orderNum:item.relatedDemandId,
				price:item.price,
				coopName:item.relatedDemandId,

			})
          }
        })
        state.enrollData = params.content
      },token)
  },
  //关闭弹窗
  closeTipsModalHandler(state){
  state.inviteChatFlag = false;
},
  //接受商谈or 合作
  reciveOrRefuseHandler(state,params){
    console.log(params.price)
    state.inviteChatFlag = true;
    state.tipsType = params.type
    state.enrollDemand_id = params.demandId;
    let uri = '';
    if(params.type == 'reciveInvite'){
      uri = 'entry/interview/reply?reply=true'+'&de_id='+params.demandId;
      this.commit('reciveOrRefuseMethods',{uri})
    }
    if(params.type == 'reciveCooper'){
      uri = 'entry/cooperation/reply';
      let data= {
        'd_id':params.demandId,
        'reply':true,
        'amount':params.price
      }
      data = base64_encode(encodeURIComponent(JSON.stringify(data)))
      this.commit('reciveOrRefuseMethods',{uri,data,type:'reciveCooper'})
    }
    if(params.type == 'refuseCooper'){
       state.refuseCooperTips = {
        'd_id':params.demandId,
      'reply':false,
      'amount':params.price
      }
    }
    if(params.type == 'cancelCoo'){
      state.inviteChatFlag = true;
      setTimeout(()=>{
        state.inviteChatFlag = false;
      },2000)
    }

  },
  //拒绝商谈or 合作
  refuseChatHandler(state,valueObj){
    console.log(valueObj.data)
    valueObj.data = valueObj.data==''?null:valueObj.data;
    if(valueObj.type == 'refuseChat'){
      let uri = 'entry/interview/reply?reply=false'+'&de_id='+state.enrollDemand_id;
      var data = base64_encode(encodeURIComponent(JSON.stringify({reject_reason:valueObj.data})))
      this.commit('reciveOrRefuseMethods',{uri,data})
    }
    if(valueObj.type == 'refuseCooper'){
      let uri = 'entry/cooperation/reply';
      state.refuseCooperTips.reject_reason = valueObj.data
      var data = base64_encode(encodeURIComponent(JSON.stringify(state.refuseCooperTips)))
      this.commit('reciveOrRefuseMethods',{uri,data})
    }
  },
  //接受或者拒绝商谈的函数请求
  reciveOrRefuseMethods(state,dataValue){
    let data = dataValue.data?dataValue.data:null
    let token = getToken();
    let _this = this;
    axiosReqPost(dataValue.uri,function(params){
      console.log(params)
        setTimeout(()=>{
          state.inviteChatFlag = false
        },2000)
      _this.commit('getMyEnrollInfor')
    },token,data,null,function(err){})
  },
  //获取订单交易记录
  getTradeRecordHandler(state,type){
    	let category = '';
    	if(type == 'company'){
    		category = 'product_category_demand'
    	}
    	let userId = '';
    	let userFlag = false
    	let uri = 'trade?category='+category;
    	let token = getToken();
    	getCurrentRole((params)=>{
    		userId = params.id
	    	axiosReqGet(uri,(params)=>{
	    		console.log(params)
	    		state.tradeRecordData = params.content
	    		state.tradeRecordData.forEach((item)=>{
	    			item.createtime = formatTime(new Date(item.createTime).valueOf(),'-')
	    			if(item.tradeStatus == 'TRADE_SUCCESS'){
	    				item.tradeText="支付成功"
	    			}else{
	    				item.tradeText="继续支付"
	    			}
	    			item.userId = userId
	    		})
	    	},token)
    	})
    },

  /**
   * 评价显示
   * */
  //收到的评价
  getCommentDataHandler(state){

    let uri = 'comment/received';
    let token = getToken();
    axiosReqGet(uri,function (params) {
      console.log(params);
      let commentLevel = {
        'MJ_USER_COMMENT_LEVEL_BAD':'不满意',
        'MJ_USER_COMMENT_LEVEL_GOOD':'满意',
        'MJ_USER_COMMENT_LEVEL_MIDDLE':'一般'
      }
      state.commentData.reciveData = params.content;
      state.commentData.reciveData.forEach((item) =>{
        item.date = formatTime(item.createtime,'-').split(' ')[0];
        item.commentImg = item.imageUrls?item.imageUrls.split(','):"";
        item.state = commentLevel[item.commentLevel];
        item.commentConent = item.commentDetails?item.commentDetails:'无';
        console.log(commentLevel[item.commentLevel])
      })
    },token)
  },
  //发出的评价
  sendCommentDataHandler(state){

    let uri = 'comment/published';
    let token = getToken();
    let commentLevel = {
      MJ_USER_COMMENT_LEVEL_BAD:'不满意',
      MJ_USER_COMMENT_LEVEL_GOOD:'满意',
      MJ_USER_COMMENT_LEVEL_MIDDLE:'一般'
    }
    axiosReqGet(uri,function (params) {
      state.commentData.sendData = params.content;
      state.commentData.sendData.forEach((item) =>{
        item.date = formatTime(item.createtime,'-').split(' ')[0];
        item.commentImg = item.imageUrls?item.imageUrls.split(','):"";
        item.state = commentLevel[item.commentLevel];
        item.commentConent = item.commentDetails?item.commentDetails:'无';

      })
      console.log(params);
    },token)
  },
  // 待评价
  watiCommentDataHandler(state){
  	let artistArr = ['03','04','05','06'];
  	let companyArr = ['10','11']
  	getCurrentRole((params)=>{
  		if(artistArr.indexOf(params.currentRole.id)>=0){
  			this.commit('getMyEnrollInfor')
  		}
  		if(companyArr.indexOf(params.currentRole.id)>=0){
  			this.commit('getTradeHandler')
  		}
  	},(err)=>{})
    console.log("待评价")
  }

}

export default{
	state,
	getters,
	actions,
	mutations
}
