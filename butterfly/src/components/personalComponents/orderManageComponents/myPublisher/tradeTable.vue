<template>
	<div class="trade-table">
		<table v-for="(item,idx) in tradeData">
			<tr>
				<td colspan="7">订单编号：{{item.id}}　　订单时间：{{item.updatetime}}</td>
			</tr>
			<tr class="trade-table-content"  v-if="item.orderControlType!='replace'">
				<td class="trade-namebox"><router-link tag="div" :to="{path:'/needInfo',query:{id:item.demand.id}}">{{item.demand.title}}</router-link></td>
				<td>{{item.demand.type}}</td>
				<td class="trade-name"><div>{{item.user.stageName}}</div></td>
				<td>
					￥{{item.price}}
				</td>
				<td>￥{{0}}</td>
				<td class="trade-state">{{item.stateText}}</td>
				<td class="trade-btnbox">
					<div class="trade-btns" v-if="item.stateType=='pay'" @click="tradeToPayHandler({type:'pay',auth_id:item.demand.publisher.id,d_order_id:item.id,related_u_id:item.user.id,related_d_id:item.demand.id})">-支付-</div>
					<div class="trade-btns" v-if="item.stateType=='cancelCoop'">-取消合作-</div>
					<div v-if="item.stateType=='cooper'">
						<div class="trade-btns" @click="tradeToPayHandler({type:'suerCoop',id:item.id,status:'complete',u_id:item.user.id})">-合作完成-</div>
						<div class="trade-btns" @click="tradeToPayHandler({type:'cancelcooperate',id:item.id,status:'cancel',u_id:item.user.id})">-取消合作-</div>
					</div>
					<div class="trade-btns" v-if="item.stateType=='comment'" @click="commentsToHandler({type:'company',id:item.id,user_id:item.user.id,title:item.demand.title})">-评价-</div>
					<div v-if="item.stateType=='cancelCoo'">
						<div class="trade-btns">-接受-</div>
						<div class="trade-btns">-联系客服-</div>
					</div>
					<div class="trade-btns" v-if="item.stateType=='contactServer'">-联系客服-</div>
				</td>
			</tr>
			<tr class="trade-table-content" v-for="idx in length" v-if="item.orderControlType=='replace'">
				<td class="trade-namebox"><div>{{item.orderName}}</div></td>
				<td>{{item.orderType}}</td>
				<td>{{item.cooperName}}</td>
				<td>￥{{item.cooperPrice}}</td>
				<td>￥{{item.serviceMoney}}</td>
				<td class="trade-state">{{item.orderState}}</td>
				<td class="trade-btnbox">
					<div class="trade-btns" v-if="item.orderControlType=='pay'">-支付-</div>
					<div v-if="item.orderControlType=='cooper'">
						<div class="trade-btns">-合作完成-</div>
						<div class="trade-btns">-取消合作-</div>
					</div>
					<div class="trade-btns" v-if="idx==1" @click="commentsToHandler">-评价-</div>
					<div v-if="idx==2">
						<div class="trade-btns">-确认替补-</div>
						<div class="trade-times">{{showCutDownMinutes}}分{{showCutDownSeconds}}秒-</div>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'tradeTabl',
		props:['tradeData'],
		data(){
			return{
				length:2
			}
		},
		computed:{
			...mapGetters({
				showCutDownMinutes:'showCutDownMinutes',
				showCutDownSeconds:'showCutDownSeconds'
			})
		},
		methods:{
			...mapActions({
				cutDownToHandler:'cutDownToHandler',
				commentsToHandler:'commentsToHandler',
				tradeToPayHandler:'tradeToPayHandler'
			})
		},
		mounted(){
			this.cutDownToHandler()
		}
	}
</script>

<style scoped lang="less">
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
				&:nth-child(1){
					width: 280px;
				}
				&:nth-child(2){
					width: 100px;
				}
				&:nth-child(3){
					width: 150px;
				}
				&:nth-child(4){
					width: 90px;
				}
				&:nth-child(5){
					width: 70px;
				}
				&:nth-child(6){
					width: 90px;
				}
				&:nth-child(7){
					width: 95px;
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
				&.trade-name{
					div{
						width: 150px;
						padding: 0 20px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>
