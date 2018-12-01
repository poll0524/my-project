<template>
	<div class="under-container box-bottom">
		<div class="under-content box-maxWidth">
			<div class="under-title">
				<h3>了解蝶儿飞</h3>
				<div class="under-small">
					找专业人做专业事
				</div>
			</div>
			<div class="under-listcontent flex">
				<div class="under-listbox" v-for="(item,index) in listTitle">
					<div class="under-listTitle">{{item.title}}
            <router-link class="more-list" :to="`${item.link}`">{{item.more}}</router-link>
          </div>
					<div class="under-listInfo" v-if='index==0'>
						<router-link :to="{path:'/newsContent',query:{id:item.id}}" class="flex" v-if="showAllDataList.companyNewsListData" v-for="item in showAllDataList.companyNewsListData" :key="item.id">
							<span class="under-listText">{{JSON.parse(item.tags)[0]}}{{item.title}}</span>
							<span class="under-listDate">{{item.date}}</span>
						</router-link>
					</div>
					<div class="under-listInfo" v-if='index==1'>
						<router-link :to="{path:'/newsContent',query:{id:item.id}}" class="flex" v-if="showAllDataList.newsListData" v-for="item in showAllDataList.newsListData"  :key="item.id">
							<span class="under-listText">{{JSON.parse(item.tags)[0]}}{{item.title}}</span>
							<span class="under-listDate">{{item.date}}</span>
						</router-link>
					</div>
					<div class="under-listInfo" v-if="index==2">
						<router-link :to="{path:'/caseContent',query:{id:item.id}}" class="flex" v-if="showAllDataList.successExaData" v-for="item in showAllDataList.successExaData"  :key="item.id">
							<span class="under-listText">{{item.title}}</span>
							<span class="under-listDate">{{item.date}}</span>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
	import {formatTime} from "../../assets/js/public.js"
	export default{
		name:'under',
		data(){
			return{
				listTitle:[
		          {title:'公司新闻',more:'更多',link:'/news'},
		          {title:'行业资讯',more:'更多',link:'/talk'},
		          {title:'成功案例',more:'更多',link:'/sucexm'},
		        ],
				listData:[
					// {name:'我是标题我是标题我是标题',date:'2018.3.20'},
				],
				newsListData:null,
				successExaData:null,
        companyNewsListData:null
			}
		},
    computed:{
    ...mapGetters({
      showAllDataList:'showAllDataList'
      })
    },
		methods:{
			formatTimeData(arr){
				if(arr&&arr.length>0){
					for(let i=0;i<arr.length;i++){
						arr[i].date = formatTime(arr[i].createtime,'-').split(' ')[0]
					}
				}
				return arr;
			}
		},
		mounted(){

		},

	}
</script>
<style scoped lang="less">
	.under-container{
		background: #f2f2f2;
		position: relative;
		padding: 30px 0;
		&::after{
			display:block;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 150px;
			width: 100%;
			background-color: #333;
		}
		.under-title{
			position: relative;
			z-index: 1;
			color: rgba(255,255,255,0.7);
			text-align: center;
			font-size: 18px;
			h3{
				font-size: 36px;
				color: #fff;
				border-bottom: 2px solid #fff;
				display: inline-block;
			}
		}
		.under-listcontent{
			position: relative;
			z-index: 1;
			.under-listbox{
				width: 32.3%;
        height: 300px;
				margin-right: 2%;
				background-color: #fff;
				padding: 20px 15px;
				font-size: 12px;
				overflow: auto;
				&:last-child{
					margin-right:0;
				}
				.under-listTitle{
					font-size: 18px;
					border-left: 3px solid #ec6538;
					padding-left: 10px;
          .more-list{
            font-size: 12px;
            color: #ec6538;
            float: right;
          }
				}
				.under-listInfo{
					padding-top: 20px;
					a{
						color: #546370;
						align-items: center;
						transition: 0.3s;
						height: 25px;
						line-height: 25px;
						justify-content: space-between;
						&:hover{
							color:#ec6538;
							border-bottom: 1px solid #ec6538;
						}
						.under-listText{
							width: 80%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
</style>
