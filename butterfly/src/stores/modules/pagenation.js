import {axiosReqPost,getToken,base64_encode,axiosReqGet,formatTime} from '../../assets/js/public.js'

const state = {
	infoData:[],
	filterValue:{},
	totalPages:1,
	reciveKinds:{},
  searchData:{
    searchContent:null,//搜索的数据
  },
  loadingFlag:true,
  hasNoDataFlag:false
}

const getters = {
	showInfodata:state=>state.infoData,
	showTotalPages:state=>state.totalPages,
  showSearchData : state => state.searchData,
  showLoad:state=>state.loadingFlag,
  showNoData:state=>state.hasNoDataFlag
}

const actions = {
	currentToPageHandler({commit},data){
		commit('currentPageHandler',data)
	},
	reciveToKindsHandler({commit},data){
		commit('reciveKindsHandler',data)
	},
  //搜索后保存搜索内容
  publicSearchHandler({commit},searchData){
    commit('publicSearch',searchData)
  }
}

const mutations = {
	currentPageHandler(state,data){
    state.loadingFlag = true;
    state.hasNoDataFlag = false;
		state.infoData = [];
		let url = '';
		//
		// let uri = 'user/artist?sift=&sort=createTime,DESC&page='+data.id
		let token = getToken();
		let page = Number(data.id)-1<0?0:Number(data.id)-1;
		let temObj = {};
		let statusTime = '';
		if(data.type == 'actor' || data.type == 'company'){
			statusTime = 'createTime';
		}else{
			statusTime = 'createtime'
		}
		let status = data.status?data.status:statusTime;
		let sortDirection = data.sortDirection?data.sortDirection:'DESC';
		let sorts = status+','+sortDirection
		if(JSON.stringify(data.value) == '{}'){
			temObj = state.reciveKinds
		}else{
			temObj = {};
		}
		for(let key in temObj){
			data.value[key] = temObj[key]
		}
		if(data.type == 'actor'){
			if(JSON.stringify(data.value) == '{}'){
				url = 'user/artist?sift=&sort='+sorts+'&page='+page
			}else if(JSON.stringify(data.value) != '{}'){
				let shifValue = base64_encode(encodeURIComponent(JSON.stringify(data.value)));
				url = 'user/artist?sift='+shifValue+'&sort='+sorts+'&page='+page
			}
		}else if(data.type == 'company'){
			if(JSON.stringify(data.value) == '{}'){
				url = 'user/company?sift=&sort='+sorts+'&page='+page
			}else if(JSON.stringify(data.value) != '{}'){
				let shifValue = base64_encode(encodeURIComponent(JSON.stringify(data.value)));
				url = 'user/company?sift='+shifValue+'&sort='+sorts+'&page='+page
			}
		}else if(data.type == 'needs'){
			if(JSON.stringify(data.value) == '{}'){
				url = 'demand?role=02,08,09,10,11&sift=&sort='+sorts+'&page='+page
			}else if(JSON.stringify(data.value) != '{}'){
				let shifValue = base64_encode(encodeURIComponent(JSON.stringify(data.value)));
				url = 'demand?role=02,08,09,10,11&sift='+shifValue+'&sort='+sorts+'&page='+page
			}
		}else if(data.type == 'search'){
	      	url = 'search?query='+data.value.value+'&size='+sorts+'&from='+page
    }else if(data.type == 'needsOrder'){
   			url = 'demand/list?page='+page
    }else if(data.type == 'tradeOrder' || data.type == 'notComment'){
   			url = 'd_order?page='+page
    }else if(data.type == 'orderRecord'){
   			url = 'trade?category=product_category_demand&page='+page
    }else if(data.type == 'reciveComment'){
   			url = 'comment/received?page='+page
    }else if(data.type == 'sendComment'){
   			url ='comment/published?page='+page
    }else if(data.type == 'actorRegister'){
   			url = 'entry?page='+page
    }
    else if(data.type == 'case'){
      // state.totalPages = data.value.totalPage
       url = 'article/list?category_id='+data.value.id;
    }


		axiosReqGet(url,(params)=>{
      state.loadingFlag = false;
		  if(params.content instanceof Array){
        state.infoData = params.content
        state.infoData.forEach((item)=>{
          if(data.type == 'actor'){
            item.property = item.skills || item.skillsGroup
            item.sameName = item.stageName || item.groupName
            item.samePrice = item.priceGroup || item.price
            item.imgUrl = item.coverArtist
          }
          else if(data.type == 'company'){
            item.property = item.companyProperty
            item.sameName = item.simpleName
            item.imgUrl=item.coverPlanningCompany
          }
          else if(data.type == 'needs'){
            item.deadtime = formatTime(item.deadline,'.')
          }
          else if(data.type == 'search'){
            console.log(params)
            // if(param.hits){
            //   commit('publicSearch',param.hits.hits)
            // }
          }
        })
        state.totalPages = params.totalPages
      }else if(params.data.content instanceof Array){
        state.infoData = params.data.content

        console.log(params.data)

        if(data.type == 'case'){
          state.infoData.forEach((item) =>{
            item.createtime = formatTime(item.createtime,'-').split(' ')[0];
          })
        }
        state.totalPages = params.data.totalPages
      }
      state.hasNoDataFlag = (params.content.length==0 || params.data.content.length == 0) ? true : false;
		},token)
	},

	reciveKindsHandler(state,data){
		console.log(data)
		state.reciveKinds = data
	},

  //搜索
  publicSearch(state,searchData){
    state.searchData = searchData;
    state.searchData.searchContent.forEach((item)=>{
      if(item._source.createtime){
        item._source.date =formatTime(item._source.date,'-').split(' ')[0];
      }
      for(let key in item.highlight){
        item._source[key] = item.highlight[key][0];
      }
    })
    console.log(state.searchData.searchContent)
  }
}

export default{
	state,
	getters,
	actions,
	mutations
}
