<template>
	<div class="table-container">
		<table>
			<tr>
				<td v-for="item in tableTitle">{{item}}</td>
			</tr>
			<tr v-for="item in tableData">
				<td>{{item.createtime}}</td>
				<td>{{item.outTradeNumber}}</td>
				<td>{{item.tradeNo}}</td>
				<td>{{item.subject}}</td>
				<td>￥{{item.totalAmount}}</td>
				<td>
					<div v-if="item.tradeStatus=='TRADE_SUCCESS'">{{item.tradeText}}</div>
					<div class="goon-pay" v-if="item.tradeStatus!='TRADE_SUCCESS'" @click="linksHandler(item)">{{item.tradeText}}</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default{
		name:'tableRecord',
		props:['tableTitle','tableData'],
		data(){
			return{
				url:'https://api.maxbutterfly.com/api/star/v1/trade/product/10',
				// url:'http://192.168.3.91:8888/api/star/v1/trade/product/10',
			}
		},
		methods:{
			linksHandler(item){

				let uri = this.url+'?out_trade_no='+item.outTradeNumber+'&auth_id='+item.userId+'&d_order_id='+item.demandOrderId+'&related_u_id='+item.relateUserId+'&related_d_id='+item.relatedDemandId
				window.open(uri)
			}
		}
	}
</script>

<style scoped lang="less">
	.table-container{
		table{
			width: 100%;
			text-align: center;
			border-collapse: collapse;
			line-height: 40px;
			border:1px solid #999;
			tr{
				border-bottom: 1px solid #999;
				&:first-child{
					background:#191b2e;
					border: 1px solid #191b2e;
					color: #fff;
				}
				&:not(:first-child){
					td{
						border:1px solid #999;
					}
				}
			}
			.goon-pay{
				cursor: pointer;
				&:hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>
