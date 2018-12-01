import {axiosReqPost,getToken,base64_encode,axiosReqGet,getCurrentRole,formatTime,jsonString} from '../../assets/js/public.js'

const companyTypeText = {
	"MJ_COMPANY_TYPE_PERFORMANCE_CO":{text:"演出公司",value:0},
	"MJ_COMPANY_TYPE_ADVERTISING_CO":{text:"广告公司",value:2},
	"MJ_COMPANY_TYPE_PUBLIC_RELATIONS_CO":{text:"公关公司",value:1},
	"MJ_COMPANY_TYPE_WEDDING_CO":{text:"婚庆礼仪公司",value:3}
}

const state = {
	personalInfoFlag:false,
	showExpModal:false,
	uploadImgFlag:false,
	videoFlag:false,
	contentFlag:false,
	// performData:[
	// 	{
	// 		performance_date:new Date(),
	// 		role:'我是演出内容',
	// 		image_url:['../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg']
	// 	},
	// 	{
	// 		performance_date:new Date(),
	// 		role:'我是演出内容',
	// 		image_url:['../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg']
	// 	}
	// ],
	// winData:[
	// 	{
	// 		date:new Date(),
	// 		role:'我是获奖内容',
	// 		image_url:['../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg']
	// 	},
	// 	{
	// 		date:new Date(),
	// 		role:'我是获奖内容',
	// 		image_url:['../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg','../../../../static/images/rec_04.jpg']
	// 	}
	// ],
	// albumArr:[
	// 	{imgUrl:'../../../../static/images/rec_04.jpg',checked:true},
	// 	{imgUrl:'../../../../static/images/rec_04.jpg',checked:false},
	// 	{imgUrl:'../../../../static/images/rec_04.jpg',checked:false},
	// 	{imgUrl:'../../../../static/images/rec_04.jpg',checked:false},
	// 	{imgUrl:'../../../../static/images/rec_04.jpg',checked:false},
	// ],
	// videoUrl:'../../../../static/images/rec_04.jpg',
	showData:{
		data:[]
	},
	memberInfoData:[1,2,3],
	showEditBox:null,
	showMemberFlag:false,
	addExp:'',
	actorEditData:{},
	companyEditData:{},
	companyAlbum:[],
	actorAlbum:[],
	companyTypeValue:''
}

const getters = {
	showPerInfoFlag:state=>state.personalInfoFlag,
	showToExpModal:state=>state.showExpModal,
	showUploadImgFlag:state=>state.uploadImgFlag,
	showVideoFlag:state=>state.videoFlag,
	showPerformData:state=>state.performData,
	showWinData:state=>state.winData,
	showAlbumArr:state=>state.albumArr,
	showVideoUrl:state=>state.videoUrl,
	showToData:state=>state.showData,
	showMemberInfoData:state=>state.memberInfoData,
	showToEditBox:state=>state.showEditBox,
	showTomember:state=>state.showMemberFlag,
	//艺人资料
	showActorEditData:state=>state.actorEditData,
	//公司资料
	showCompanyEditData:state=>state.companyEditData,
	//编辑资料未填写完成
	showContentFlag:state=>state.contentFlag
}

const actions = {
	editToPersonalHandler({commit},blockType){
		commit('editPersonalHandler',blockType)
	},
	cancelToEditHandler({commit},type){
		commit('cancelEditHandler',type)
	},
	saveToEditHandler({commit},type){
		commit('saveEditHandler',type)
	},
	deletToExpHandler({commit},value){
		commit('deletExpHandler',value)
	},
	addExpToHandler({commit},blockType){
		commit('addExpHandler',blockType)
	},
	editToMember({commit},idx){
		commit('editMember',idx)
	},
	deletToMember({commit},idx){
		commit('deletMember',idx)
	},
	addToMember({commit}){
		commit('addMemberHandler')
	},
	initToFlagHandler({commit}){
		commit('initFlagHandler')
	},
	getToDataHandler({commit},tpye){
		commit('getDataHandler',tpye)
	},
	reciveToAlbumHandler({commit},params){
		commit('reciveAlbumHandler',params)
	},
	changeToReplace({commit},type){
		commit('changeReplace',type)
	},
	changeToCompanyType({commit},value){
		commit('changeCompanyType',value)
	}
}

const mutations = {
	//获取数据
	getDataHandler(state,type){
		console.log(type)
		this.commit('getEditDataHandler',type)
	},
	getEditDataHandler(state,type){
		let uri = '';
		let token = getToken();
		// let cardId = '';
		getCurrentRole(function(params){
			// cardId = params.id;
			if(type == 'actor'){
				uri = 'certify/artist'
			}else if(type == 'company'){
				uri = 'certify/broker_company'
			}
			axiosReqGet(uri,function(params){
				console.log(params)
				if(params.artistAwardExperiences){
					params.artistAwardExperiences.forEach((item)=>{
						item.date = formatTime(item.awardDate,'.').split(' ')[0];
						item.imageUrls = item.imageUrl.split(',');
						item.image_urls = item.imageUrls;
						item.award_date = item.date;
					})
				}
				if(params.artistPerformanceExperiences){
					params.artistPerformanceExperiences.forEach((item)=>{
						item.date = formatTime(item.performanceDate,'.').split(' ')[0];
						item.performance_date = item.date;
						item.imageUrls = item.imageUrl.split(',');
						item.image_urls = item.imageUrls;
					})
				}
				if(type == 'actor'){
					params.birthday = formatTime(params.birthday,'.').split(' ')[0];
					state.actorEditData = params
				}else if(type == 'company'){
					state.companyEditData = params
					for(let key in companyTypeText){
						if(key == state.companyEditData.companyType){
							state.companyEditData.companyType = companyTypeText[key]
						}
					}
					console.log(state.companyEditData)
				}
			},token)
		})
	},
	//编辑
	editPersonalHandler(state,blockType){
		console.log(blockType)
		if(blockType=='info'&&typeof(blockType)=='string'){
			state.personalInfoFlag = !state.personalInfoFlag
		}else if(typeof(blockType)=='object'){
			state.showExpModal = !state.showExpModal
			if(blockType.type=='perform'){
				if(blockType.applyType == 'actor'){
					state.showData={
						data:[state.actorEditData.artistPerformanceExperiences[blockType.idx]],
						txt:{
							date:'演出时间',
							content:'演出内容'
						},
						type:'perform'
					}
				}else if(blockType.applyType == 'company'){
					state.showData={
						data:[state.companyEditData.artistPerformanceExperiences[blockType.idx]],
						txt:{
							date:'演出时间',
							content:'演出内容'
						},
						type:'perform'
					}
				}
			}else if(blockType.type=='win'){
				if(blockType.applyType == 'actor'){
					state.showData={
						data:[state.actorEditData.artistAwardExperiences[blockType.idx]],
						txt:{
							date:'获奖时间',
							content:'获奖内容'
						},
						type:'win'
					}
				}else if(blockType.applyType == 'company'){
					state.showData={
						data:[state.companyEditData.artistAwardExperiences[blockType.idx]],
						txt:{
							date:'获奖时间',
							content:'获奖内容'
						},
						type:'win'
					}
				}
			}
		}else if(blockType=='ablum'&&typeof(blockType)=='string'){
			state.uploadImgFlag = !state.uploadImgFlag
		}else if(blockType=='video'&&typeof(blockType)=='string'){
			state.videoFlag = !state.videoFlag
		}
	},
	//新增
	addExpHandler(state,blockType){
		state.showExpModal = !state.showExpModal
		console.log(state.actorEditData,blockType)
		state.addExp = blockType.addType
		if(blockType.expType=='perform'){
			state.showData={
				data:[{
					performance_date:new Date(),
					date:formatTime(new Date(),'.').split(' ')[0],
					role:'',
					image_urls:[],
					imageUrls:[],
					representative:false
				}
				],
				txt:{
					date:'演出时间',
					content:'演出内容'
				},
				type:'perform'
			}
		}else if(blockType.expType=='win'){
			state.showData={
				data:[{
					award_date:new Date(),
					date:new Date(),
					role:'',
					image_urls:[],
					imageUrls:[],
					representative:false
				}
				],
				txt:{
					date:'获奖时间',
					content:'获奖内容'
				},
				type:'win'
			}
		}
	},
	addsingleExp(state,params){
		if(params.type == 'perform'){
			if(params.applyType == 'actor'){
				if(!state.actorEditData.artistPerformanceExperiences){
					state.actorEditData.artistPerformanceExperiences = []
				}
				state.actorEditData.artistPerformanceExperiences.push(state.showData.data[0])
			}else if(params.applyType == 'company'){
				if(!state.companyEditData.artistPerformanceExperiences){
					state.companyEditData.artistPerformanceExperiences = []
				}
				state.companyEditData.artistPerformanceExperiences.push(state.showData.data[0])
			}
		}else if(params.type == 'win'){
			if(params.applyType == 'actor'){
				if(!state.actorEditData.artistAwardExperiences){
					state.actorEditData.artistAwardExperiences = []
				}
				state.actorEditData.artistAwardExperiences.push(state.showData.data[0])
			}else if(params.applyType == 'company'){
				if(!state.companyEditData.artistAwardExperiences){
					state.companyEditData.artistAwardExperiences = []
				}
				state.companyEditData.artistAwardExperiences.push(state.showData.data[0])
			}
		}
	},
	//取消修改
	cancelEditHandler(state,params){
		console.log(params)
		if(params.type=='info'){
			state.actorEditData.skills = state.actorEditData.skills.join(',')
			state.personalInfoFlag = !state.personalInfoFlag
		}else if(params.type == 'companyinfo'){
			state.personalInfoFlag = !state.personalInfoFlag
		}else if(params.type=='ablum'){
			state.uploadImgFlag = !state.uploadImgFlag
		}else if(params.type=='video'){
			state.videoFlag = !state.videoFlag
		}else if(params.type=='memberInfo'){
			state.showEditBox=null
		}else if(params.type=='addMember'){
			state.showMemberFlag = !state.showMemberFlag
		}else{
			state.showExpModal = false
		}
		this.commit('getDataHandler',params.applyType)
	},
	//接受修改的相册
	reciveAlbumHandler(state,params){

		console.log(params)
		let tempImg = []
		params.urls.forEach((item)=>{
			if(item.type){
				tempImg.push(item.path)
			}else{
				tempImg.push(item)
			}
		})
		if(params.applyType == 'company'){
			state.companyAlbum = tempImg
		}else if(params.applyType == 'actor'){
			state.actorAlbum = tempImg
		}
	},
	//内容不完整提示
	contentTipsHandler(state){
		state.contentFlag = true;
		setTimeout(()=>{
			state.contentFlag = false
		},2000)
	},
	//设为代表
	changeReplace(state,params){
		if(state.showData.data.length>0){
			state.showData.data[0].representative = !state.showData.data[0].representative
		}
	},
	//公司类型修改
	changeCompanyType(state,value){
		// state.companyEditData.company_type.value = value;
		state.companyTypeValue = value
	},
	//保存修改
	saveEditHandler(state,type){
		console.log(type)
		let token = getToken()
		if(type.type=='info'){//修改艺人基本信息
			console.log(state.actorEditData)
			if(state.actorEditData.hometown.split(',')[0] == '台湾省'){
				state.actorEditData.hometown = '台湾省'
			}
			let strData = {
				skills:state.actorEditData.skills.join(','),
				name:state.actorEditData.name,
				salary:state.actorEditData.salary,
				gender:state.actorEditData.gender,
				stage_name:state.actorEditData.stage_name,
				college:state.actorEditData.college,
				birthday:new Date(state.actorEditData.birthday).valueOf(),
				hometown:state.actorEditData.hometown,
				height:state.actorEditData.height,
				intro:state.actorEditData.intro,
				weight:state.actorEditData.weight
			}
			state.actorEditData.skills = state.actorEditData.skills.join(',')
			state.actorEditData.birthday = new Date(state.actorEditData.birthday).valueOf();
			let demands  = base64_encode(encodeURIComponent(JSON.stringify(strData)))
			// return
			let uri = 'certify/artist';
			axiosReqPost(uri,function(params){
				window.location.reload();
				state.personalInfoFlag = !state.personalInfoFlag
				state.actorEditData.birthday = formatTime(state.actorEditData.birthday,'.').split(' ')[0];
			},token,demands)
		}else if(type.applyType == 'actor'){//修改艺人表演经历
			if(type.type == 'perform'){
				let str = '';
				if(state.addExp == 'addexp'){
					this.commit('addsingleExp',{type:'perform',applyType:'actor'})
					state.addExp = '';
				}
				state.actorEditData.artistPerformanceExperiences.forEach((item)=>{
					if(state.showData.data[0].representative){
						item.representative = false;
					}
					item.date = formatTime(item.performance_date,'.').split(' ')[0];
					item.performance_date = new Date(item.performance_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({performance:str.replace(/;$/,'')})))
				if(state.showData.data[0].imageUrls.length<3 || state.showData.data[0].role == ''){
					this.commit('contentTipsHandler')
					return
				}
				this.commit('editExpHandler',{uri:'certify/artist',demands,type:'exp'})
			}else if(type.type == 'win'){
				let str = '';
				if(state.addExp == 'addexp'){
					this.commit('addsingleExp',{type:'win',applyType:'actor'})
				}
				state.actorEditData.artistAwardExperiences.forEach((item)=>{
					if(state.showData.data[0].representative){
						item.representative = false;
					}
					item.date = formatTime(item.award_date,'.').split(' ')[0];
					item.award_date = new Date(item.award_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({award:str.replace(/;$/,'')})))
				if(state.showData.data[0].imageUrls.length<3 || state.showData.data[0].role == ''){
					this.commit('contentTipsHandler')
					return
				}
				this.commit('editExpHandler',{uri:'certify/artist',demands,type:'exp'})
			}else if(type.type=='ablum'  || type.type=='video'){//修改相册
				let str = '';
				let albumImg = [];
				let albumVideo = '';
				state.actorEditData.album.forEach((item,i)=>{
					if(item.type&&item.type == 'photo'){
						albumImg.push(item.path)
					}else if(item.type&&item.type == 'video'){
						albumVideo = item.path
					}
				})
				if(state.actorAlbum.length<3){
					this.commit('contentTipsHandler')
					return
				}
				albumImg = state.actorAlbum;
				if(albumVideo!=''){
					albumImg.push(albumVideo);
				}
				state.actorEditData.album = albumImg ;
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({album:state.actorEditData.album.join(',')})))
				if(type.type=='ablum'){
					this.commit('editExpHandler',{uri:'certify/artist',demands,type:'album',applyType:'actor'})
				}else if(type.type=='video'){
					this.commit('editExpHandler',{uri:'certify/artist',demands,type:'video',applyType:'actor'})
				}
			}
		}else if(type.type=='companyinfo'){
			// for(let key in companyTypeText){
			// 	if(companyTypeText[key].value == state.companyTypeValue){
			// 		state.companyEditData.company_type = companyTypeText[key].value
			// 	}
			// }
			if(state.companyTypeValue == ''){
				state.companyEditData.company_type = state.companyEditData.company_type.value
			}else{
				state.companyEditData.company_type = state.companyTypeValue;
			}
			if(state.companyEditData.hometown.split(',')[0] == '台湾省'){
				state.companyEditData.hometown = '台湾省'
			}
			console.log(state.companyEditData);
			let strData = {
					type:state.companyEditData.type,
					simple_name:state.companyEditData.simple_name,
					full_name:state.companyEditData.full_name,
					life:state.companyEditData.life,
					number:state.companyEditData.number,
					hometown:state.companyEditData.hometown,
					license_num:state.companyEditData.license_num,
					license_address:state.companyEditData.license_address,
					intro:state.companyEditData.intro,
					company_type:state.companyEditData.company_type
			};
			// return
			let demands  = base64_encode(encodeURIComponent(JSON.stringify(strData)))
			let uri = 'certify/broker_company';
			axiosReqPost(uri,function(params){
				for(let key in companyTypeText){
					if(companyTypeText[key].value == state.companyEditData.companyType.value){
						state.companyEditData.company_type = companyTypeText[key]
						state.companyEditData.companyType = companyTypeText[key]
					}
				}
				state.personalInfoFlag = !state.personalInfoFlag
				window.location.reload();
			},token,demands)
		}else if(type.applyType == 'company'){
			if(type.type == 'perform'){
				let str = '';
				if(state.addExp == 'addexp'){
					this.commit('addsingleExp',{type:'perform',applyType:'company'})
					console.log(state.companyEditData.artistPerformanceExperiences)
					state.addExp = '';
				}
				state.companyEditData.artistPerformanceExperiences.forEach((item)=>{
					if(state.showData.data[0].representative){
						item.representative = false;
					}
					item.date = formatTime(item.performance_date,'.').split(' ')[0];
					item.performance_date = new Date(item.performance_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				if(state.showData.data[0].imageUrls.length<3 || state.showData.data[0].role == ''){
					this.commit('contentTipsHandler')
					return
				}
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({performance:str.replace(/;$/,'')})))
				// let uri = 'certify/artist';
				// axiosReqPost(uri,function(params){
				// 	state.showExpModal = !state.showExpModal
				// },token,demands)
				this.commit('editExpHandler',{uri:'certify/broker_company',demands,type:'exp'})
			}else if(type.type == 'win'){
				let str = '';
				if(state.addExp == 'addexp'){
					this.commit('addsingleExp',{type:'win',applyType:'company'})
				}
				state.companyEditData.artistAwardExperiences.forEach((item)=>{
					if(state.showData.data[0].representative){
						item.representative = false;
					}
					item.date = formatTime(item.award_date,'.').split(' ')[0];
					item.award_date = new Date(item.award_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				if(state.showData.data[0].imageUrls.length<3 || state.showData.data[0].role == ''){
					this.commit('contentTipsHandler')
					return
				}
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({award:str.replace(/;$/,'')})))
				this.commit('editExpHandler',{uri:'certify/broker_company',demands,type:'exp'})
			}else if(type.type=='ablum' || type.type=='video'){//修改相册
				// state.uploadImgFlag = !state.uploadImgFlag
				let str = '';
				let albumImg = [];
				let albumVideo = '';
				state.companyEditData.album.forEach((item,i)=>{
					console.log(item)
					if(item.type&&item.type == 'photo'){
						albumImg.push(item.path)
					}else if(item.type&&item.type == 'video'){
						albumVideo = item.path
					}
				})
				if(state.companyAlbum.length<3){
					this.commit('contentTipsHandler')
					return
				}
				albumImg = state.companyAlbum;
				if(albumVideo !=''){
					albumImg.push(albumVideo);
				}
				state.companyEditData.album = albumImg ;
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({album:state.companyEditData.album.join(',')})))
				if(type.type=='ablum'){
					this.commit('editExpHandler',{uri:'certify/broker_company',demands,type:'album',applyType:'company'})
				}else if(type.type=='video'){
					this.commit('editExpHandler',{uri:'certify/broker_company',demands,type:'video',applyType:'company'})
				}
			}
			/*else if(type.type=='video'){
				console.log(state.companyEditData.album)
			}*/
		}else if(type.type=='video'){
			// state.videoFlag = !state.videoFlag
		}else if(type.type=='memberInfo'){
			state.showEditBox=null
		}else if(type.type=='addMember'){
			state.showMemberFlag = !state.showMemberFlag
		}else{
			state.showExpModal = !state.showExpModal
		}
	},
	//经历编辑
	editExpHandler(state,item){
		let uri = item.uri;
		let token = getToken();
		let _this = this;
		axiosReqPost(uri,function(params){
			window.location.reload();
			if(item.type == 'exp'){
				state.showExpModal = !state.showExpModal
			}else if(item.type == 'album'){
				state.uploadImgFlag = !state.uploadImgFlag
				_this.commit('getDataHandler',item.applyType)
			}else if(item.type == 'video'){
				state.videoFlag = !state.videoFlag
				_this.commit('getDataHandler',item.applyType)
			}
		},token,item.demands)
	},
	//删除单个经历
	deletExpHandler(state,value){
		console.log(value)
		if(value.type=="perform"){
			if(value.applyType == 'actor'){
				// state.performData.splice(value.idx,1)
				let str ='';
				state.actorEditData.artistPerformanceExperiences.splice(value.idx,1);
				state.actorEditData.artistPerformanceExperiences.forEach((item)=>{
					item.date = formatTime(item.performance_date,'.').split(' ')[0];
					item.performance_date = new Date(item.performance_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({performance:str.replace(/;$/,'')})))
				this.commit('editExpHandler',{uri:'certify/artist',demands})

			}else if(value.applyType == 'company'){
				let str = '';
				state.companyEditData.artistPerformanceExperiences.splice(value.idx,1)
				state.companyEditData.artistPerformanceExperiences.forEach((item)=>{
					item.date = formatTime(item.performance_date,'.').split(' ')[0];
					item.performance_date = new Date(item.performance_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({performance:str.replace(/;$/,'')})))
				this.commit('editExpHandler',{uri:'certify/broker_company',demands})
			}
		}else if(value.type=='win'){
			if(value.applyType == 'actor'){
				let str = '';
				// state.performData.splice(value.idx,1)
				state.actorEditData.artistAwardExperiences.splice(value.idx,1);
				state.actorEditData.artistAwardExperiences.forEach((item)=>{
					item.date = formatTime(item.award_date,'.').split(' ')[0];
					item.award_date = new Date(item.award_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({award:str.replace(/;$/,'')})))
				this.commit('editExpHandler',{uri:'certify/artist',demands})
			}else if(value.applyType == 'company'){
				let str = '';
				state.companyEditData.artistAwardExperiences.splice(value.idx,1)
				state.companyEditData.artistAwardExperiences.forEach((item)=>{
					item.date = formatTime(item.award_date,'.').split(' ')[0];
					item.award_date = new Date(item.award_date).valueOf();
					item.image_urls = item.imageUrls.join(',');
					str += JSON.stringify(item) +';'
				})
				let demands  = base64_encode(encodeURIComponent(JSON.stringify({award:str.replace(/;$/,'')})))
				this.commit('editExpHandler',{uri:'certify/broker_company',demands})
			}
		}
	},
	//删除经历publichandler
	publicDeletExpHandler(state,params){
		//type,applyType,data

	},
	//删除单个成员
	deletMember(state,idx){
		state.memberInfoData.splice(idx,1)
	},
	//编辑单个成员
	editMember(state,idx){
		state.showEditBox= idx;
	},
	//新增成员
	addMemberHandler(state){
		state.showMemberFlag = !state.showMemberFlag
	},
	//初始化
	initFlagHandler(state){
		state.personalInfoFlag=false;
		state.showExpModal=false;
		state.uploadImgFlag=false;
		state.videoFlag=false;
	},
}

export default{
	state,
	getters,
	actions,
	mutations
}
