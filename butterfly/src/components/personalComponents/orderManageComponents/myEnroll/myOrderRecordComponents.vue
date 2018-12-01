<template>
	<div class="needs-record-container">
		<TitleItem titleName="订单交易记录"/>
		<div class="needs-record-content">
			<RecordItem
			:tableTitle="tableTitle"
			:tableData="tableData"/>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleItem from '../../titleNameComponents'
	import RecordItem from '../publicOrderComponents/publicOrderRecord'
	export default{
		name:'orderRecord',
		data(){
			return{
				tableTitle:['订单日期','交易订单编号','支付宝编号','物品名称','物品金额','支付状态'],
				tableData:[
					{date:'2118.05.17',orderNum:'1554455665565',payNum:'5555555544412541144',name:'双鱼主持',price:'5200',payType:'已支付'},
					{date:'2118.05.17',orderNum:'1554455665565',payNum:'5555555544412541144',name:'双鱼主持',price:'5200',payType:'已支付'},
				]
			}
		},
		components:{
			TitleItem,
			RecordItem
		},
		computed:{
			
		}
	}
</script>

<style scoped lang="less">
	.needs-record-container{
		.needs-record-content{
			padding: 20px;
			
		}
	}
</style>