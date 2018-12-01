
import {axiosReqPost,getToken,base64_encode,axiosReqGet,axiosReqMethods,formatTime} from '../../assets/js/public'

const state = {
	newsListData:[],
	newsInfoDate:{
		plainText:'',
		invoiceObj:{},
		rejectObj:{},
		inviteobj:{}
	},
	allCheck:{checked:false},
	infoFlag:false,
	noHasReadArr:[],
	showNewsInfoDate:false,
	newsModalFlag:false,
	modalMsg:''
}

const getters = {
	showToCheck:state=>state.allCheck,
	showNewsListData:state=>state.newsListData,
	showinfoFlag:state=>state.infoFlag,
	showNewsInfoDate:state =>state.newsInfoDate,
	showNewsInfoDateFlag:state =>state.showNewsInfoDate,
	showNoHasReadArr:state => state.noHasReadArr,
	showNewsModalFlag:state=>state.newsModalFlag,
	showModalMsg:state=>state.modalMsg
}

const actions = {
	allToCheck({commit}){
		commit('allCheckHandler')
	},
	singleToCheck({commit}){
		commit('singleCheckHandler')
	},
	seeToInfomation({commit},id){
		commit('seeInfomation',id)
	},
	newsToBackHandler({commit}){
		commit('newsBackHandler')
	},
	getToAllNewsHandler({commit}){
		commit('getAllNewsHandler')
	},
	allNewsToReadedHandler({commit}){
		commit('allNewsReadedHandler')
	},
	deletToAllReadedNewsHandler({commit}){
		commit('deletAllReadedNewsHandler')
	},
	deletToChooseNews({commit}){
		commit('deletChooseNews')
	},
  noHasReadArrHandler({commit}){
	  commit('noHasReadArrPush')
  }
}

const mutations = {
	//全选
	allCheckHandler(state){
		state.newsListData.forEach((item,i)=>{
			if(state.allCheck.checked){
				item.checked = true
			}else{
				item.checked = false
			}
		})
	},
	//单个选
	singleCheckHandler(state){
		state.newsListData.forEach((item,i)=>{
			if(!item.checked){
				state.allCheck.checked = false;
			}
		})
	},

	//查看详情
	seeInfomation(state,id){
		state.infoFlag = true
		let uri = 'message/'+id
		let token = getToken();
		axiosReqGet(uri,function(params){
      console.log(params)
      state.newsInfoDate = params
      if(params.content.indexOf('&reject_message@')!=-1){
        state.newsInfoDate.plainText = params.content.replace('&reject_message@','拒绝原因：');
        state.newsInfoDate.plainText = state.newsInfoDate.plainText.replace('@','具体是：')
      }
      else if(params.content.indexOf('@')!=-1){

        state.newsInfoDate.plainText = params.content.split('@')[0];
        state.newsInfoDate.invoiceObj = JSON.parse(params.content.split('@')[1]);
      }else {
        var  content = {};
        try{
          content = JSON.parse(params.content);
          state.newsInfoDate.inviteobj = JSON.parse(params.content);
        }
        catch(e) {
          state.newsInfoDate.plainText = params.content.replace('&reject_message','')
        }

      }

		},token)
	},

	//返回
	newsBackHandler(state){
		state.infoFlag = false
	},


	//获取消息列表
	getAllNewsHandler(state){
		let uri = 'message?platform=PC';
		let token = getToken();
		let that = this;
		axiosReqGet(uri,function(params){
      state.newsListData = params;
      // let newsListDataObj={id:params[i].id,checked:false,hasRead:!params[i].hasRead,newsTitle:params[i].title,newsText:'周杰伦来成都双流演唱会闹笑话了',date:formatTime(params[i].createtime,'-')};
      state.newsListData.forEach((item,i)=>{
        // item.checked = false;
        item.date = formatTime(item.createtime,'-')
      })

      that.commit('noHasReadArrPush');
		},token)
	},

	newsModalHandler(state){
		state.newsModalFlag = !state.newsModalFlag
		setTimeout(()=>{
			state.newsModalFlag = !state.newsModalFlag
		},2000)
	},

	//全部标记为已读
	allNewsReadedHandler(state){
		let uri = 'message/all';
		let token = getToken();
		let bodyValue = '';
		let that = this;
		axiosReqMethods(uri,function(params){
			console.log(params)
			state.modalMsg = params.message
			that.commit('newsModalHandler')
			that.commit('getAllNewsHandler');
		},(err)=>{
			state.modalMsg = err.response.data.message
			that.commit('newsModalHandler')
			console.dir(err)
		},token,null,'PUT')

	},
	//删除全部已读
	deletAllReadedNewsHandler(state){
		let that = this;
		let uri = 'message/all';
		let token = getToken();
		let bodyValue = '';
		axiosReqMethods(uri,function(params){
			console.log(params)
			state.modalMsg = params.message
			that.commit('newsModalHandler')
			that.commit('getAllNewsHandler');
		},(err)=>{
			that.commit('newsModalHandler')
			state.modalMsg = err.response.data.message
			console.dir(err)
		},token,null,'DELETE')
	},

  //未读条数
  noHasReadArrPush(state){
    state.noHasReadArr = [];
    state.newsListData.forEach((item,i)=>{
      if(item.hasRead == false){
        console.log(item);
        state.noHasReadArr.push(item);
      }
    })

  },
	//删除选中
	deletChooseNews(state){
		let arrId=[];
		state.newsListData.forEach((item,i)=>{
			if(item.checked){
			  arrId.push(item.id)
			}
		})
    	console.log(arrId);
		let uri = 'message/?ids='+arrId.toString();
		let token = getToken();
		let that = this;
		axiosReqMethods(uri,function(params){
			console.log(params)
      		state.modalMsg = params.message
			that.commit('newsModalHandler')
      		that.commit('getAllNewsHandler');


		},function (params) {
		  console.log(params)
    },token,null,'DELETE')
	},


}

export default{
	state,
	getters,
	actions,
	mutations
}
