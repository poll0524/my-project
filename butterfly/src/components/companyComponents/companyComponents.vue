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
			kindsType="company"/>
		</div>
	</div>
</template>
<script>

	import ConItem from './companyCondition'
	import BannerItem from '../filterComponents/filterBannerComponents'
	import ContentItem from '../filterComponents/filterContentComponents'

	import {axiosReqGet,getToken,base64_encode} from '../../assets/js/public.js'
	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'company',
		data(){
			return{
				filerListData:{
					companyClassify:{
						name:'企业属性',
						children:[
							{name:'全部'},
							{name:'国有企业',type:'国有企业'},
							{name:'集体所有制',type:'集体所有制'},
							{name:'私营企业',type:'私营企业'},
							{name:'股份制企业',type:'股份制企业'},
							{name:'有限合作企业',type:'有限合作企业'},
							{name:'联营企业',type:'联营企业'},
							{name:'外商投资企业',type:'外商投资企业'},
							{name:'个人独资企业',type:'个人独资企业'},
							{name:'港、澳、台',type:'港、澳、台'},
							{name:'股份合作企业',type:'股份合作企业'},
						]
					},
					companyAge:{
						name:'从业年限',
						children:[
							{name:'全部'},
							{name:'10年',life:'0,10'},
							{name:'20年',life:'11,20'},
							{name:'30年',life:'21,30'},
							{name:'40年',life:'31,40'},
							{name:'40年以上',life:'40,100'},
						]
					},
					companyPerson:{
						name:'人数规模',
						children:[
							{name:'全部'},
							{name:'50人以下',number:'0,49'},
							{name:'50-100人',number:'50,100'},
							{name:'101-500人',number:'101,500'},
							{name:'500-10000人',number:'500,10000'},
						]
					},
					companyCertify:{
						name:'认证状态',
						children:[
							{name:'全部'},
							{name:'实名认证',certify:'1'},
							{name:'未实名认证',certify:'0'},
						]
					},
					companyCredit:{
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
					{id:1,text:'信誉分',status:'brokerCompanyNumber'},
					{id:2,text:'公司年限',status:'brokerCompanyLife'}
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
				this.currentToPageHandler({type:'company',id:0,value:this.filterData});
				// this.getActorData(this.filterData)
			},
			//获取公司
			getActorData(value){
				var sift = JSON.stringify(value);
    				sift = base64_encode(encodeURI(sift));
				var uri='';
				var token = getToken();
				if(!value){
					uri = 'user/company?sift=';
				}else{
					uri = 'user/company?sift='+sift;
				}
				axiosReqGet(uri,this.getCallBack,null)
			},
			//回调函数
			getCallBack(params){
				this.filterImgData = params.content
				if(params){
					for(let i=0;i<this.filterImgData.length;i++){
						this.filterImgData[i].property = this.filterImgData[i].companyProperty
						this.filterImgData[i].sameName = this.filterImgData[i].simpleName
						this.filterImgData[i].imgUrl=this.filterImgData[i].coverPlanningCompany
					}
				}
			},
      //获取公司筛选列表的banner图
      getActorBanner(){
        let uri = 'ad';
        let that = this;
        axiosReqGet(uri,function (param) {
          that.bannerImg = [];
          param.forEach((item) => {
            if(item.displayType === "MJ_ADVERTISEMENT_TYPE_PLANNING_COMPANY_LIST_PAGE_BANNER"){
              that.bannerImg.push(item);

            }
          })

        },null);
      }
		},
		mounted(){
			// this.getActorData()
      this.getActorBanner();
			this.$nextTick(()=>{
				// this.getActorData()
				this.currentToPageHandler({type:'company',id:0,value:{}});
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
