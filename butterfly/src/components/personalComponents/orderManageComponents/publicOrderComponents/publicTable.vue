<template>
	<div class="table-container">
		<table>
			<tr class="table-head">
				<td v-for="item in tableTitle">{{item}}</td>
			</tr>
			<tr v-for="(item,idx) in tableData" class="tabler-content" v-if="tableData!=''">
				<td :colspan="tableTitle.length">
					<table>
						<tr>
							<td
							:colspan="tableTitle.length"
							class="flex-head"
							v-if="type=='needsOrder'">
								<div class="flex">
									<span>
										{{item.createtime}}　　需求编号：{{item.id}}
									</span>
									<span class="top">置顶</span>
								</div>
							</td>
						</tr>
						<tr class="flex-info">
							<td class="needs-name">
								<div v-if="type!='needsOrder'&&infoType!='needsInfo'">{{item.title?item.title:'暂无'}}</div>
								<router-link
								tag="div"
								:to="{path:'needInfo',query:{id:item.id}}"
								class="needs-name needs-name-link"
								v-if="type=='needsOrder'||infoType=='needsInfo'"
								>{{item.title}}</router-link>
								<div
								class="needs-link"
								v-if="type=='needsOrder'&&infoType!='needsInfo'"
								@click="seeToInfo(item.id)">查看详情>></div>
							</td>
							<td>{{item.type}}</td>
							<td>￥{{item.budget?item.budget:'暂无'}}</td>
							<td>￥{{0}}</td>
							<td>￥{{0}}</td>
							<td>{{item.stateText?item.stateText:'待完善'}}</td>
							<td>
								<div class="compelete-needs">
									<div class="auth-mask" @click="checkToCertify({type:'compeleteNeeds'})" v-if="!showClickFlag"></div>
									<router-link
									tag="div"
									class="control-btn"
									to="/publishNeeds?type=compelete" v-if="!item.state">-完善需求-</router-link>
								</div>
								<div class="control-btn"  v-if="item.state==1">-审核中-</div>
								<!-- <div class="control-btn"  v-if="item.state==2">-报名中-</div> -->
								<div class="control-btn"  v-if="item.state==2" @click="overToEnter({id:item.id,infoType})">-结束报名-</div>
								<div class="control-btn"  v-if="item.state==3">-报名已结束-</div>
								<router-link
								tag="div"
								class="control-btn"
								:to="{path:'/EditNeeds',query:{id:item.id}}" v-if="item.state==7">-修改需求-</router-link>
								<div class="control-btn" v-if="item.state==7 || !item.state" @click="deletToNeeds({type:reciveType,id:item.id})">-删除需求-</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<pageItem
			:kindsType="reciveType" v-if="reciveType=='needsOrder'&&infoType!='needsInfo'"/>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import {axiosReqGet,axiosReqPost,getToken} from "../../../../assets/js/public"
	import pageItem from '../../../paginations/pagination'

	export default{
		name:'publicTable',
		props:['tableData','tableTitle','type','infoType'],
		data(){
			return{
				reciveType:''
			}
		},
		components:{
			pageItem
		},
	    computed:{
	      ...mapGetters({
	        // achieveAllOrder:'achieveAllOrder'
	        showClickFlag:'showClickFlag'
	      })
	    },
		methods:{
			...mapActions({
				seeToInfo:'seeToInfo',
        		achieveToAllOrder:'achieveToAllOrder',
        		deletToNeeds:'deletToNeeds',
        		overToEnter:'overToEnter',
        		checkToCertify:'checkToCertify'
			}),
		},
		mounted(){
	      //所有通过的需求
	      this.achieveToAllOrder('allNeeds');
			  //草稿
	      this.achieveToAllOrder('draft');
	    },
	    watch:{
	    	tableData(){
	    		// console.log(this.tableData)
	    		this.reciveType = this.type
	    	},
	    }
	}
</script>
<style scoped lang="less">
	.table-container{
		table{
			width: 100%;
			border-collapse: collapse;
			border-spacing: none;
			.table-head{
				background: #191b2e;
				color: #fff;
				text-align: center;
				line-height: 30px;
				border: 1px solid #191b2e;
				td{
					white-space: nowrap;
					border-right: 1px solid #191b2e;
					&:first-child{
						width:300px;
					}
					&:nth-child(2){
						width: 120px;
					}
					&:nth-child(3){
						width: 100px;
					}
					&:nth-child(4){
						width: 115px;
					}
					&:nth-child(5){
						width: 90px;
					}
					&:nth-child(6){
						width: 90px;
					}
				}
			}
			.tabler-content{
				border:1px solid #999;
				.control-btn,.needs-link{
					cursor: pointer;
					transition: 0.3s;
					&:hover{
						color:#ec6538;
					}
				}
				td.flex-head{
					border-bottom: 1px solid #999;
					line-height: 40px;
					padding: 0 25px;
					.flex{
						justify-content: space-between;
						.top{
							display: block;
							cursor: pointer;
							color: #ec6538;
							&:hover{
								text-decoration:underline;
							}
						}
					}
				}
				.flex-info{
					.needs-name-link{
						transition: 0.3s;
						cursor: pointer;
						&:hover{
							color:#ec6538;
						}
					}
					td{
						border-right: 1px solid #999;
						text-align: center;
						line-height: 25px;
						padding: 20px 0;
						&:first-child{
							width:300px;
							div{
								width: 300px;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								padding: 0 20px;
								&.needs-link{
									text-align: right;
								}
							}
						}
						&:nth-child(2){
							width: 120px;
						}
						&:nth-child(3){
							width: 100px;
						}
						&:nth-child(4){
							width: 115px;
						}
						&:nth-child(5){
							width: 90px;
						}
						&:nth-child(6){
							width: 90px;
						}
					}
				}
			}
		}
		.compelete-needs{
			position: relative;
			.auth-mask{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
			}
		}
	}
</style>
