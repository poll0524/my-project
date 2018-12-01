<template>
	<div class="not-commentbox">
		<table>
			<tr>
				<td v-for="item in tableHead">{{item}}</td>
			</tr>
			<tr v-for="(item,idx) in showCommentData.waitCommentData">
				<td>{{item.createTime}}</td>
				<td class="title"><div>{{item.title}}</div></td>
				<td>{{item.orderNum}}</td>
				<td>{{item.coopName}}</td>
				<td>￥{{item.price}}</td>
				<td class="btn"><div @click="commentsToHandler({type:commentType,id:item.demand_id,user_id:item.user_id,title:item.title})">评价</div></td>
			</tr>
			<tr v-if="showCommentData.waitCommentData.length==0">
				<td colspan="7">暂无待评价</td>
			</tr>
		</table>
		<pageItem :kindsType="type"/>
		<ModalItem
		v-if="showToModal"
		:showModal="showToModal"
		@changheHintBoxShow="closeToCommentsHandler">
			<div slot="body">
				<CommentItem/>
			</div>
		</ModalItem>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";
	import ModalItem from '../../../publicModalComponents/publicModal'
	import CommentItem from '../../commentsInp'
	import pageItem from '../../../paginations/pagination'

	export default{
		name:'notComment',
		props:['type'],
		data(){
			return{
				tableHead:['时间','需求名称','订单编号','合作方','合作金额','交易操作'],
				tableData:[
					// {date:'2018.05.12',title:'周杰伦盐城会',orderNum:'54564546464646',cooperson:'唐晓灿',price:'5000'},
					// {date:'2018.05.12',title:'周杰伦盐城会',orderNum:'54564546464646',cooperson:'唐晓灿',price:'5000'},
					// {date:'2018.05.12',title:'周杰伦盐城会',orderNum:'54564546464646',cooperson:'唐晓灿',price:'5000'},
				],
				actorArr:['03','04','05','06'],
				companyArr:['10','11'],
				commentType:''
			}
		},
		components:{
			ModalItem,
			CommentItem,
			pageItem
		},
		computed:{
			...mapGetters({
				showToModal:'showToModal',
				showCommentData:'showCommentData',
				showAuthId:'showAuthId'
			})
		},
		methods:{
			...mapActions({
				commentsToHandler:'commentsToHandler',
				closeToCommentsHandler:'closeToCommentsHandler',
        		waitToCommentDataHandler:'waitToCommentDataHandler'
			})
		},
		mounted(){
			this.$nextTick(()=>{
		 		this.waitToCommentDataHandler();
		 		if(this.actorArr.indexOf(this.showAuthId)>=0){
		 			this.commentType = 'actor'
		 		}
		 		if(this.companyArr.indexOf(this.showAuthId)>=0){
		 			this.commentType = 'company'
		 		}
			})
    	},
    	watch:{
    		showToModal(){
    			this.waitToCommentDataHandler();
    		}
    	}
	}
</script>
<style lang="less">
	.not-commentbox{
		table{
			width: 100%;
			border-collapse: collapse;
			text-align: center;
			tr:first-child{
				background:#191b2e;
				color: #fff;
				line-height: 40px;
			}
			tr:not(:first-child){
				line-height: 80px;
				td{
					border:1px solid #999;
					&.title{
						div{
							max-width: 200px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin:0 auto;
						}
					}
					&.btn{
						div{
							width: 50px;
							height: 30px;
							border-radius: 3px;
							border:1px solid #999;
							line-height: 30px;
							margin:0 auto;
							cursor: pointer;
							background: linear-gradient(#fbfbfb, #dedede);
							&:hover{
								box-shadow:0 0 2px #999;
							}
						}
					}
				}
			}
		}
		.modal-mask{
			.modal-container{
				max-width: 700px;
			}
		}
	}
</style>
