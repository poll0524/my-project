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
			kindsType="actor"/>
		</div>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";

	import ConItem from './filterConditionComponents'
	import BannerItem from '../filterComponents/filterBannerComponents'
	import ContentItem from '../filterComponents/filterContentComponents'

	import {axiosReqGet,getToken,base64_encode} from '../../assets/js/public.js'

	export default{
		name:'actor',
		data(){
			return{
				filerListData:{
					actorClassify:{
						name:'艺人分类',
						children:[
							{name:'全部'},
							{name:'个人',category:'single'},
							{name:'团体',category:'group'},
						]
					},
					actorSex:{
						name:'艺人性别',
						children:[
							{name:'全部'},
							{name:'男',gender:'男'},
							{name:'女',gender:'女'},
						]
					},
					actorAge:{
						name:'艺人年龄',
						children:[
							{name:'全部'},
							{name:'12岁以下',age:'0,12'},
							{name:'13-18岁',age:'13,18'},
							{name:'19-22岁',age:'19,22'},
							{name:'23-30岁',age:'23,30'},
							{name:'31-40岁',age:'31,40'},
							{name:'40岁以上',age:'40,100'},
						]
					},
					actorPrice:{
						name:'艺人报价',
						children:[
							{name:'全部'},
							{name:'50-99元',price:'50,99'},
							{name:'100-199元',price:'100,199'},
							{name:'200-299元',price:'200,299'},
							{name:'300-499元',price:'300,499'},
							{name:'500-999元',price:'501,999'},
							{name:'1000-1499元',price:'1000,1499'},
							{name:'1500-1999元',price:'1500,1999'},
							{name:'2000-5000元',price:'2000,5000'},
							{name:'5000元以上',price:'5000,100000000'},
						]
					},
					actorTimes:{
						name:'艺人档期',
						children:[
							{name:'全部'},
							{name:'最近一天',},
							{name:'最近三天',},
							{name:'最近一周',},
							{name:'最近两周',}
						]
					},
					actorCertify:{
						name:'艺人认证',
						children:[
							{name:'全部'},
							{name:'实名认证',certify:'1'},
							{name:'未实名认证',certify:'0'},
						]
					},
					actorCredit:{
						name:'平台信誉分',
						children:[
							{name:'全部'},
							{name:'80-99',credit:'80,99'},
							{name:'100-149',credit:'100,149'},
							{name:'150-299',credit:'150,299'},
							{name:'300-700',credit:'300,700'},
							{name:'700以上',credit:'700,10000'}
						]
					}
				},
				filterImgData:[],
				navData:[
					{id:0,text:'默认',status:'createTime'},
					{id:1,text:'信誉分',status:'creditScore'},
					{id:2,text:'年龄',status:'birthday'},
					{id:3,text:'报价',status:'price'},
				],
				bannerImg:[],
				filterData:{},
				pageFlag:false
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
				this.currentToPageHandler({type:'actor',id:0,value:this.filterData});
				// this.getActorData(this.filterData)
			},
			//获取艺人
			getActorData(value){
				var sift = JSON.stringify(value);
    				sift = base64_encode(encodeURI(sift));
				var uri='';
				var token = getToken();
				if(!value){
					uri = 'user/artist?sift=';
				}else{
					uri = 'user/artist?sift='+sift;
				}
				axiosReqGet(uri,this.getCallBack,null)
			},
			//回调函数
			getCallBack(params){
				this.filterImgData = params.content
				this.totalPages = params.totalPages
				for(let i=0;i<this.filterImgData.length;i++){
					this.filterImgData[i].property = this.filterImgData[i].skills || this.filterImgData[i].skillsGroup
					this.filterImgData[i].sameName = this.filterImgData[i].stageName || this.filterImgData[i].groupName
					this.filterImgData[i].samePrice = this.filterImgData[i].priceGroup || this.filterImgData[i].price
					this.filterImgData[i].imgUrl= this.filterImgData[i].coverArtist
				}
				this.pageFlag = true
			},

      //获取艺人筛选列表的banner图
      getActorBanner(){
			  let uri = 'ad';
        let that = this;
        axiosReqGet(uri,function (param) {
          that.bannerImg = [];
          param.forEach((item) => {
            if(item.displayType === "MJ_ADVERTISEMENT_TYPE_ARTIST_LIST_PAGE_BANNER"){
              that.bannerImg.push(item);

            }
          })

        },null);
      }
		},
		mounted(){
			this.$nextTick(()=>{
				// this.getActorData()
				this.currentToPageHandler({type:'actor',id:0,value:{}});
			});
			this.getActorBanner();
		}
	}
</script>
<style scoped lang="less">
	.actor-container{
		min-height: 80vh;
		padding-top: 100px;
	}
</style>
