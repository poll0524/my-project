<template>
	<div class="actor-container">
		<div class="box-maxWidth">
			<!-- banner图 -->
			<BannerItem
			:bannerImg="bannerImg"/>
			<!-- 筛选条件 -->
			<ConItem
			:filerListData="filerListData"
			@getFilterData="getFilterData"/>
			<ContentItem
			:filterData="filterData"
			:filterImgData="showInfodata"
			:navData="navData"
			kindsType="needs"/>
		</div>
	</div>
</template>
<script>

	import ConItem from './needsConditionComponents'
	import BannerItem from '../filterComponents/filterBannerComponents'
	import ContentItem from '../filterComponents/filterContentComponents'

	import {axiosReqGet,getToken,base64_encode,formatTime} from '../../assets/js/public.js'
	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'needs',
		data(){
			return{
				filerListData:{
					needsPrice:{
						name:'预　　算',
						children:[
							{name:'全部'},
							{name:'50-99元',budget:'50,99'},
							{name:'100-199元',budget:'100,199'},
							{name:'200-299元',budget:'200,299'},
							{name:'300-499元',budget:'300,499'},
							{name:'500-999元',budget:'501,999'},
							{name:'1000-1499元',budget:'1000,1499'},
							{name:'1500-1999元',budget:'1500,1999'},
							{name:'2000-5000元',budget:'2000,5000'},
							{name:'5000元以上',budget:'5000,100000000'},
						]
					},
					needsTimes:{
						name:'演出时间',
						children:[
							{name:'全部'},
							{name:'最近一天',},
							{name:'最近三天',},
							{name:'最近一周',},
							{name:'最近两周',}
						]
					},
					needsCertify:{
						name:'认证状态',
						children:[
							{name:'全部'},
							{name:'实名认证',certify:'1'},
							{name:'未实名认证',certify:'0'},
						]
					},
					needsCredit:{
						name:'平台信誉分',
						children:[
							{name:'全部'},
							{name:'80-99',credit:'80,99'},
							{name:'100-149',credit:'100,149'},
							{name:'150-299',credit:'150,299'},
							{name:'300-700',credit:'300,700'},
							{name:'700以上',credit:'701,10000'}
						]
					}
				},
				filterneedsData:[],
				navData:[
					{id:0,text:'默认',status:'createtime'},
					{id:1,text:'剩余时间',status:'deadline'},
					{id:2,text:'需求人数',status:'number'},
					{id:3,text:'价格',status:'budget'},
				],
				bannerImg:[],
				filterData:{},
			}
		},
		components:{
			ConItem,
			BannerItem,
			ContentItem
		},
		computed:{
			...mapGetters({
				showInfodata:'showInfodata'
			})
		},
		methods:{
			...mapActions({
				currentToPageHandler:'currentToPageHandler'
			}),
			getFilterData(value){
				this.filterData = value
				// this.getActorData(this.filterData)
				this.currentToPageHandler({type:'needs',id:0,value:this.filterData});
			},
			//获取公司
			getActorData(value){
				var sift = JSON.stringify(value);
    				sift = base64_encode(encodeURI(sift));
				var uri='';
				var token = getToken();
				if(!value){
					uri = 'demand?role=02,08,09&sift=&sort=';
				}else{
					uri = 'demand?role=02,08,09&sift='+sift;
				}
				axiosReqGet(uri,this.getCallBack,token)
			},
			//回调函数
			getCallBack(params){
				if(params.content.length>0){
					for(let i=0;i<params.content.length;i++){
						params.content[i].deadtime = formatTime(params.content[i].deadline,'.')
					}
				}
				this.filterneedsData = params.content
			},
      //获取需求筛选列表的banner图
      getDemandBanner(){
        let uri = 'ad';
        let that = this;
        axiosReqGet(uri,function (param) {
          that.bannerImg = [];
          param.forEach((item) => {
            if(item.displayType === "MJ_ADVERTISEMENT_TYPE_DEMAND_LIST_PAGE_BANNER"){
              //  判断banner显示时间
              if(item.show_start_time<new Date().valueOf()<item.show_end_time){
                that.bannerImg.push(item);
              }

            }

          })

        },null);
      }
		},
		mounted(){
			// this.getActorData()
			this.$nextTick(()=>{
				// this.getActorData()
				this.currentToPageHandler({type:'needs',id:0,value:{}});
				this.getDemandBanner();
			})
		}
	}
</script>
<style scoped lang="less">
	.actor-container{
		min-height: 80vh;
		padding-top: 100px;
	}
</style>
