import {axiosReqPost,getToken,base64_encode,axiosReqGet} from '../../assets/js/public.js'
const companyTypeText = {
	"MJ_COMPANY_TYPE_PERFORMANCE_CO":{text:"演出公司",value:0},
	"MJ_COMPANY_TYPE_ADVERTISING_CO":{text:"广告公司",value:2},
	"MJ_COMPANY_TYPE_PUBLIC_RELATIONS_CO":{text:"公关公司",value:1},
	"MJ_COMPANY_TYPE_WEDDING_CO":{text:"婚庆礼仪公司",value:3}
}

const state = {
	performLength:1,
	showIndex:0,
	winLength:1,
	imgUrl:[],
	companyImgUrl:[],
	groupImgUrl:[],
	stepActiveIndex:0,
	videoUrl:'',
	temVideoUrl:'',
	companyVideoUrl:'',
	groupVideoUrl:'',
	replace:{
		actor:{
			performReplace:null,
			winReplace:null
		},
		company:{
			performReplace:null,
			winReplace:null
		},
		group:{
			performReplace:null,
			winReplace:null
		}
	},
	performData:[
		// {image_urls:[],performance_date:new Date(),role:'',representative:false}
	],
	winData:[
		// {image_urls:[],award_date:new Date(),role:'',representative:false}
	],
	companyPerformData:[
		// {image_urls:[],performance_date:new Date(),role:'',representative:false}
	],
	companyWinData:[
		// {image_urls:[],award_date:new Date(),role:'',representative:false}
	],
	groupPerformData:[
		// {image_urls:[],performance_date:new Date(),role:'',representative:false}
	],
	groupWinData:[
		// {image_urls:[],award_date:new Date(),role:'',representative:false}
	],
	showModal:false,
	roleType:'',
	actorData:{},//艺人基本信息
	commentsData:{
		level:'0',
		id:'',
		anonymous:true,
		user_id:'',
		comment:'',
		receiver_name:'',
		demand_name:'',
		images:[]
	},
	companyData:{//公司申请信息
	},
	//被评价用户信息
	commentedPersonData:{},
	//评价成功
	commentFlag:false,
	//视频大小提示flag
	ApplyVideoFlag:false
}

const getters = {
	showPerformIndex:state=>{
		console.log(state.showIndex)
		return state.showIndex
	},
	showPerformLength:state=>state.performLength,
	showWinLength:state=>state.winLength,
	showImgUrl:state=>state.imgUrl,
	showCompanyImgUrl:state=>state.companyImgUrl,
	showGroupImgUrl:state=>state.groupImgUrl,
	showvideoUrl:state=>state.videoUrl,
	showstepActiveIndex:state=>state.stepActiveIndex,
	showperformData:state=>state.performData,
	showwinData:state=>state.winData,
	showToModal:state=>state.showModal,
	showReplace:state=>state.replace,
	showCompanyPerformData:state=>state.companyPerformData,
	showCompanyWinData:state=>state.companyWinData,
	showCompanyVideoUrl:state=>state.companyVideoUrl,
	showGroupPerformData:state=>state.groupPerformData,
	showGroupWinData:state=>state.groupWinData,
	showGroupVideoUrl:state=>state.groupVideoUrl,
	showCommentsData:state=>state.commentsData,
	showCompanyData:state=>state.companyData,
	showCommentedPersonData:state=>state.commentedPersonData,
	showCommentFlag:state=>state.commentFlag,
	//视频地址
	temToVideoUrl:state=>state.temVideoUrl,
	ApplyToVideoFlag:state=>state.ApplyVideoFlag
}

const actions = {
	addToPerform({commit},type){
		commit('addPerform',type)
	},
	deletToExp({commit},value){
		commit('deletExp',value)
	},
	changeToImg({commit},fileObj){
		commit('changeImg',fileObj)
	},
	deletToImg({commit},idx){
		commit('deletImg',idx)
	},
	uploadToVideo({commit},e){
		commit('uploadVideo',e)
	},
	deletToVideo({commit},type){
		commit('deletVideo',type)
	},
	stepsToChange({commit},stepId){
		commit('stepsChange',stepId)
	},
	submitToApply({commit},type){
		commit('submitApply',type)
	},
	initToSteps({commit}){
		commit('initSteps')
	},
	commentsToHandler({commit},data){
		commit('commentsHandler',data)
	},
	closeToCommentsHandler({commit}){
		commit('closeCommentsHandler',)
	},
	sendsToCommentHandler({commit}){
		commit('sendsCommentHandler',)
	}
}

const mutations = {
	//增加演出经历
	addPerform(state,params){
		if(params.type=="perform"){
			if(params.applyType=='actor'){
				state.performData.push({
					image_urls:[],performance_date:new Date(),role:'',representative:false
				})
			}else if(params.applyType=='company'){
				state.companyPerformData.push({
					image_urls:[],performance_date:new Date(),role:'',representative:false
				})
			}else if(params.applyType=='group'){
				state.groupPerformData.push({
					image_urls:[],performance_date:new Date(),role:'',representative:false
				})
			}
		}else if(params.type=='win'){
			if(params.applyType=='actor'){
				state.winData.push({
					image_urls:[],award_date:new Date(),role:'',representative:false
				})
			}else if(params.applyType=='company'){
				state.companyWinData.push({
					image_urls:[],award_date:new Date(),role:'',representative:false
				})
			}else if(params.applyType=='group'){
				state.groupWinData.push({
					image_urls:[],award_date:new Date(),role:'',representative:false
				})
			}
		}
	},
	//删除单个经历
	deletExp(state,value){
		if(value.roleType=='perform'){
			if(value.applyType=='actor'){
				state.performData.splice(value.idx,1)
			}else if(value.applyType=='company'){
				state.companyPerformData.splice(value.idx,1)
			}else if(value.applyType=='group'){
				state.groupPerformData.splice(value.idx,1)
			}
		}else if(value.roleType=='win'){
			if(value.applyType=='actor'){
				state.winData.splice(value.idx,1)
			}else if(value.applyType=='company'){
				state.companyWinData.splice(value.idx,1)
			}else if(value.applyType=='group'){
				state.groupWinData.splice(value.idx,1)
			}
		}
	},
	//上传图片
	changeImg(state,fileObj){
		console.log(fileObj)
		var e = fileObj.$event;
		var file = e.currentTarget.files[0];
		var reader = new FileReader();
			reader.readAsDataURL(file);
		let formFile = new FormData();
			formFile.append('file', file);
		var item = [];
		var apply_type = '';
			if(fileObj.applyType=='actor'){
				apply_type = 'artist'
			}else if(fileObj.applyType == 'company'){
				apply_type = 'company'
			}else if(fileObj.applyType == 'group'){
				apply_type = 'group'
			}
			if(fileObj.roleType=='perform'){
				item = [apply_type,2,formFile,fileObj.roleType,fileObj.activeIndex,fileObj.applyType,fileObj.imgUrlArr]
			}else if(fileObj.roleType == 'win'){
				item = [apply_type,3,formFile,fileObj.roleType,fileObj.activeIndex,fileObj.applyType,fileObj.imgUrlArr]
			}else if(fileObj.roleType == 'album'){
				item = [apply_type,1,formFile,fileObj.roleType,fileObj.applyType,fileObj.imgUrlArr]
			}else if(fileObj.roleType == 'commentAlbum'){
				item = [apply_type,1,formFile,fileObj.roleType,fileObj.applyType]
			}

			this.commit('uploadImgHandler',item)

	},
	//上传图片HANdler
	uploadImgHandler(state,item){
		console.log(item)
		let uri = 'resource/image?apply_type='+item[0]+'&resource_type='+item[1];
		let token = getToken();
		axiosReqPost(uri,function(params){
			console.log(params)
			if(item[3] == 'perform'){
				if(item[5]=='actor'){
					if(item[6]){
						item[6].push(params.image_url)
					}else{
						console.log(state.performData)
						state.performData[item[4]].image_urls.push(params.image_url)
					}
				}else if(item[5]=='company'){
					if(item[6]){
						item[6].push(params.image_url)
					}else{
						state.companyPerformData[item[4]].image_urls.push(params.image_url)
					}
				}else if(item[5]=='group'){
					state.groupPerformData[item[4]].image_urls.push(params.image_url)
				}
			}else if(item[3] == 'win'){
				if(item[5]=='actor'){
					if(item[6]){
						item[6].push(params.image_url)
					}else{
						state.winData[item[4]].image_urls.push(params.image_url)
					}
				}else if(item[5]=='company'){
					if(item[6]){
						item[6].push(params.image_url)
					}else{
						state.companyWinData[item[4]].image_urls.push(params.image_url)
					}
				}else if(item[5]=='group'){
					state.groupWinData[item[6]].image_urls.push(params.image_url)
				}
			}else if(item[3] == 'album'){
				if(item[4]=='actor'){
					if(item[5]){
						console.log(item[5])
						item[5].push(params.image_url)
					}else{
						state.imgUrl.push(params.image_url)
					}
				}else if(item[4]=='company'){
					if(item[5]){
						console.log(item[5])
						item[5].push(params.image_url)
					}else{
						state.companyImgUrl.push(params.image_url)
					}
					console.log('company')
				}else if(item[4]=='group'){
					console.log('group')
					state.groupImgUrl.push(params.image_url)
				}
			}else if(item[3] == 'commentAlbum'){
				state.commentsData.images.push(params.image_url)
				console.log(state.commentsData)
			}
		},token,item[2],'multipart/form-data')

	},
	//删除单个图片
	deletImg(state,value){
		console.log(value)
		if(value.roleType == 'perform'){
			if(value.applyType == 'actor'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.performData[value.activeIndex].image_urls.splice(value.idx,1)
				}
			}else if(value.applyType == 'company'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.companyPerformData[value.activeIndex].image_urls.splice(value.idx,1)
				}
			}else if(value.applyType == 'group'){
				state.groupPerformData[value.activeIndex].image_urls.splice(value.idx,1)
			}
		}else if(value.roleType == 'win'){
			if(value.applyType == 'actor'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.winData[value.activeIndex].image_urls.splice(value.idx,1)
				}
			}else if(value.applyType == 'company'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.companyWinData[value.activeIndex].image_urls.splice(value.idx,1)
				}
			}else if(value.applyType == 'group'){
				state.groupWinData[value.activeIndex].image_urls.splice(value.idx,1)
			}
		}else if(value.roleType == 'album'){
			if(value.applyType == 'actor'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.imgUrl.splice(value.idx,1)
				}
			}else if(value.applyType == 'company'){
				if(value.imgUrlArr){
					value.imgUrlArr.splice(value.idx,1);
				}else{
					state.companyImgUrl.splice(value.idx,1)
				}
			}else if(value.applyType == 'group'){
				state.groupImgUrl.splice(value.idx,1)
			}
		}else if(value.roleType == 'commentAlbum'){
			state.commentsData.images.splice(value.idx,1)
		}
	},
	//上传视频
	uploadVideo(state,params){
		console.log(params)
		var e = params.$event;
		var file = e.currentTarget.files[0];
		let videoSize = Number(file.size)/(1024*1024);
		if(videoSize>50){
			state.ApplyVideoFlag = true
			setTimeout(()=>{
				state.ApplyVideoFlag = false
			},2000)
			return
		}
		var url = URL.createObjectURL(file);
		state.temVideoUrl = url;
		// if(params.applyType == 'actor'){
		// 	state.videoUrl = url
		// }else if(params.applyType == 'company'){
		// 	state.companyVideoUrl = url
		// }else if(params.applyType == 'group'){
		// 	state.groupVideoUrl = url
		// }
		let formFile = new FormData();
			formFile.append('file',file);
		let uri = 'resource/video?apply_type=artist';
		let token = getToken();
		axiosReqPost(uri,function(videoData){
			if(params.applyType == 'actor'){
				state.videoUrl = videoData.video_url
				if(typeof(params.videoUrl) == 'object'){
					params.videoUrl.push(videoData.video_url)
				}
				// state.imgUrl.push(videoData.video_url)
			}else if(params.applyType == 'company'){
				state.companyVideoUrl = videoData.video_url
				if(typeof(params.videoUrl) == 'object'){
					params.videoUrl.push(videoData.video_url)
				}
				// state.companyImgUrl.push(videoData.video_url)
			}else if(params.applyType == 'group'){
				// state.groupImgUrl.push(videoData.video_url)
			}
			console.log(videoData)
		},token,formFile,null,function(err){console.log(err)})
	},
	//删除视频
	deletVideo(state,params){
		console.log(params)
		state.temVideoUrl = '';
		if(params.applyType=='actor'){
			state.videoUrl = '';
			if(typeof(params.videoUrl) == 'object'){
				params.videoUrl.forEach((item,i)=>{
					if(item.type == 'video'){
						params.videoUrl.splice(i,1)
					}
				})
			}
		}else if(params.applyType == 'company'){
			state.companyVideoUrl= ''
			if(typeof(params.videoUrl) == 'object'){
				params.videoUrl.forEach((item,i)=>{
					if(item.type == 'video'){
						params.videoUrl.splice(i,1)
					}
				})
			}
		}else if(params.applyType == 'group'){
			state.groupVideoUrl= ''
		}
	},
	//步骤样式
	stepsChange(state,params){
		state.stepActiveIndex = params.idx;
		state.roleType = params.type;
		// console.log(params)
		if(params.type=='actor'){
			for(let key in params.data){
				state.actorData[key] = params.data[key]
			}
			this.commit('initReplace',
				{
					performData:state.performData,
					winData:state.winData,
					replace:state.replace.actor
				})
		}else if(params.type == 'company'){
			for(let key in params.data){
				state.companyData[key] = params.data[key]
				console.log(state.companyData)
			}
			this.commit('initReplace',
				{
					performData:state.companyPerformData,
					winData:state.companyWinData,
					replace:state.replace.company
				})
		}else if(params.type == 'group'){
			this.commit('initReplace',
				{
					performData:state.groupPerformData,
					winData:state.groupWinData,
					replace:state.replace.group
				})
			console.log(state.groupPerformData,state.groupWinData)
		}else if(params.type == 'sponsor'){

    }
	},
	//设为代表
	initReplace(state,params){
		//演出经历
		for(let i=0;i<params.performData.length;i++){
			if(params.replace.performReplace==i){
				params.performData[i].representative = true
			}else{
				params.performData[i].representative = false
			}
		}
		//获奖经历
		for(let i=0;i<params.winData.length;i++){
			if(params.replace.winReplace==i){
				params.winData[i].representative = true
			}else{
				params.winData[i].representative = false
			}
		}
	},
	//提交申请
	submitApply(state,type){
		// state.showModal = true
		console.log(type)
		if(type == 'actor'){
			let str='';
			let actorAlbum = state.imgUrl
			// state.imgUrl.push(state.videoUrl)
			if(state.performData.length>=1){
				state.performData.forEach((item,i)=>{
					if(typeof(item.image_urls)=='object'){
						item.image_urls = item.image_urls.join(',')
					}
					item.performance_date = new Date(item.performance_date).valueOf();
					str+=JSON.stringify(item)+';'
				})
				state.actorData.performance = str.replace(/;$/,'');
			}
			let winStr = '';
			if(state.winData.length>=1){
				state.winData.forEach((item,i)=>{
					if(typeof(item.image_urls)=='object'){
						item.image_urls = item.image_urls.join(',')
					}
					item.award_date = new Date(item.award_date).valueOf()
					winStr+=JSON.stringify(item)+';'
				})
				state.actorData.award = winStr.replace(/;$/,'');
			}
			state.actorData.birthday = new Date(state.actorData.birthday).valueOf();
			state.actorData.album = actorAlbum.join(',')+','+state.videoUrl;
			this.commit('transformData',{data:state.actorData,type:'actor'})
		}else if(type == 'company'){
			//公司申请
			let str = '';
			let companyAlbum = state.companyImgUrl;
			// companyAlbum.push(state.companyVideoUrl)
			// state.companyImgUrl.push(state.companyVideoUrl)
			if(state.companyPerformData.length>=1){
				state.companyPerformData.forEach((item,i)=>{
					if(typeof(item.image_urls)=='object'){
						item.image_urls = item.image_urls.join(',')
					}
					item.performance_date = new Date(item.performance_date).valueOf();
					str+=JSON.stringify(item)+';'
				})
				state.companyData.performance = str.replace(/;$/,'');
			}
			let winStr = '';
			if(state.companyWinData.length>=1){
				state.companyWinData.forEach((item,i)=>{
					if(typeof(item.image_urls)=='object'){
						item.image_urls = item.image_urls.join(',')
					}
					item.award_date = new Date(item.award_date).valueOf()
					winStr+=JSON.stringify(item)+';'
				})
				state.companyData.award = winStr.replace(/;$/,'');
			}
			state.companyData.album = companyAlbum.join(',') + ','+state.companyVideoUrl;
			this.commit('transformData',{data:state.companyData,type:'company'})
		}
	},
	//申请数据提交
	transformData(state,data){
		let demands = base64_encode(encodeURIComponent(JSON.stringify(data.data)));
		let uri = '';
		let token = getToken();
		if(data.type == 'actor'){
			uri = 'certify/artist';
			axiosReqPost(uri,function(params){
				console.log(params)
				state.showModal = true
			},token,demands)
		}else if(data.type == 'company'){
			uri = 'certify/broker_company';
			axiosReqPost(uri,function(params){
				console.log(params)
				state.showModal = true
			},token,demands)
		}
		setTimeout(()=>{
			state.showModal = false
			state.temVideoUrl = '';
		},5000)
	},
	//初始化步骤
	initSteps(state){
		state.stepActiveIndex = 0;
		state.showModal = false;
		state.ApplyVideoFlag = false;
	},
	//评价
	commentsHandler(state,data){
		console.log(data)
		state.showModal = true;
		let url = ''
		if(data.type == 'company'){
			url="certify/artist/"
			state.commentsData.category = 'require'
		}else if(data.type == 'actor'){
			url="certify/broker_company/"
			state.commentsData.category = 'coop'
		}
		state.commentsData.id=data.id;
		state.commentsData.user_id = data.user_id;
		state.commentsData.demand_name = data.title;
		this.commit('getActorInfo',{uri:url,id:data.user_id})
		console.log(state.commentsData)
	},
	//获取艺人or公司信息
	getActorInfo(state,data){
		let uri = data.uri+data.id;
		let token = getToken();
		axiosReqGet(uri,(params)=>{
			console.log(params)
			state.commentsData.receiver_name = params.stageName?params.stageName:params.simpleName
			if(params.companyType){
				for(let key in companyTypeText){
					if(key == params.companyType){
						params.companyTypeText = companyTypeText[key].text
					}
				}
			}
			state.commentedPersonData = params
		},token)
	},
	//关闭/取消评价
	closeCommentsHandler(state){
		state.showModal = false;
		console.log(state.commentsData)
		state.commentsData={
			level:'0',
			id:'',
			anonymous:true,
			user_id:'',
			comment:'',
			images:[]
		}
	},
	//发表评论
	sendsCommentHandler(state){
		console.log(state.commentsData);
		let uri = 'comment';
		let token = getToken();
		state.commentsData.images = state.commentsData.images.join(',');
		let demands = base64_encode(encodeURIComponent(JSON.stringify(state.commentsData)));
		axiosReqPost(uri,(params)=>{
			console.log(params)
			state.commentFlag = true
			setTimeout(()=>{
			state.commentFlag = false;
			state.showModal = false;
			state.commentsData={
				level:'0',
				id:'',
				anonymous:true,
				user_id:'',
				comment:'',
				images:[]
			}

			},2000)
		},token,demands,null,(err)=>{})
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}
