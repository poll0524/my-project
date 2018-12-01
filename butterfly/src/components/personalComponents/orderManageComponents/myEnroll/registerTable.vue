<template>
	<div class="trade-table">
		<table v-for="(item,idx) in tradeData">
			<tr>
				<td colspan="7">{{item.createtime}}　　订单编号：{{item.relatedDemandId}}</td>
			</tr>
			<tr class="trade-table-content"  v-if="item.stateType!='replace'">
				<td class="trade-namebox"><router-link :to="{path:'/needInfo',query:{id:item.relatedDemandId}}">{{item.title}}</router-link></td>
				<td>{{item.type}}</td>
				<td>￥{{item.price}}</td>
				<td>￥{{item.cooperateMoneySingle}}</td>
        		<td>{{item.date}}</td>
				<td class="trade-state">{{item.stateText}}</td>
				<td class="trade-btnbox">
					<div v-if="item.stateType=='successRes'">
						<div class="trade-btns" @click="reciveOrRefuseHandler({type:'reciveInvite',demandId:item.id})">-确认商谈-</div>
						<div class="trade-btns" @click="reciveOrRefuseHandler({type:'refuseInvite',demandId:item.id})">-拒绝商谈-</div>
					</div>
					<div v-if="item.stateType=='cooRes'">
						<div class="trade-btns" @click="reciveOrRefuseHandler({type:'reciveCooper',demandId:item.relatedDemandId,price:item.cooperateMoneySingle})">-接受合作-</div>
						<div class="trade-btns" @click="reciveOrRefuseHandler({type:'refuseCooper',demandId:item.relatedDemandId,price:item.cooperateMoneySingle})">-拒绝合作-</div>
					</div>
					<!-- <div class="trade-btns" v-if="item.stateType=='cancelCoo'" @click="reciveOrRefuseHandler({type:'cancelCoo'})">-取消合作-</div> -->
					<div class="trade-btns" v-if="item.stateType=='cooComplete'" @click="commentsToHandler({type:'actor',user_id:item.publisherId,id:item.id,title:item.title})">-评价-</div>
				</td>
			</tr>
			<tr class="trade-table-content" v-if="item.stateType=='replace'">
				<td class="trade-namebox"><div>{{item.orderName}}</div></td>
				<td>{{item.orderType}}</td>
				<td>{{item.cooperName}}</td>
				<td>￥{{item.cooperPrice}}</td>
				<td>￥{{item.serviceMoney}}</td>
				<td class="trade-state">{{item.orderState}}</td>
				<td class="trade-btnbox">
					<div class="trade-btns">-确认替补-</div>
					<div class="trade-times">{{showCutDownMinutes}}分{{showCutDownSeconds}}秒</div>
				</td>
			</tr>
		</table>
		<ModalItem
		v-if="showToModal"
		:showModal="showToModal"
		@changheHintBoxShow="closeToCommentsHandler">
			<CommentInp/>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import ModalItem from '../../../publicModalComponents/publicModal'

	import CommentInp from '../../commentsInp'

	export default{
		name:'tradeTabl',
		props:['tradeData'],
		data(){
			return{
				length:2
			}
		},
		components:{
			ModalItem,
			CommentInp
		},
		computed:{
			...mapGetters({
				showCutDownMinutes:'showCutDownMinutes',
				showCutDownSeconds:'showCutDownSeconds',
				showToModal:'showToModal'
			})
		},
		methods:{
			...mapActions({
				cutDownToHandler:'cutDownToHandler',
				commentsToHandler:'commentsToHandler',
				closeToCommentsHandler:'closeToCommentsHandler',
				reciveOrRefuseHandler:'reciveOrRefuseHandler'
			})
		},
		mounted(){
			this.cutDownToHandler()

		}
	}
</script>

<style lang="less">
	.trade-table{
		table{
			width: 100%;
			border-collapse: collapse;
			border: 1px solid #999;
			margin-bottom: 20px;
			tr{
				border-bottom: 1px solid #999;
			}
			tr:first-child{
				line-height:40px;
				td{
					padding-left: 20px;
					color: #999;
				}
			}
		}
		.trade-table-content{
			td{
				text-align: center;
				height: 105px;
				border:1px solid #999;
				padding: 0 10px;
				&:nth-child(1){
					width: 280px;
				}
				&:nth-child(2){
					width: 100px;
				}
				&:nth-child(5){
					width: 150px;
				}
				&:nth-child(4){
					width: 90px;
				}
				&:nth-child(3){
					width: 70px;
				}
				&:nth-child(6){
					width: 90px;
				}
				&:nth-child(7){
					width: 90px;
				}
				&:nth-child(8){
					width: 90px;
				}
				&.trade-btnbox{
					.trade-btns{
						cursor: pointer;
						&:hover{
							text-decoration:underline;
							color: #ec6538;
						}
					}
					.trade-times{
						font-size: 12px;
					}
				}
				&.trade-state{
					color: #ec6538;
				}
				&.trade-namebox{
					div{
						width: 250px;
						padding: 0 20px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
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
