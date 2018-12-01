<template>
	<div class="needs-record-container">
		<TitleItem titleName="订单交易记录"/>
		<div class="needs-record-content">
			<RecordItem
			:tableTitle="tableTitle"
			:tableData="showTradeRecordData"/>

		</div>
		<pageItem kindsType="orderRecord"/>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import TitleItem from '../../titleNameComponents'
	import RecordItem from '../publicOrderComponents/publicOrderRecord'
	import pageItem from '../../../paginations/pagination'

	export default{
		name:'orderRecord',
		data(){
			return{
				tableTitle:['订单日期','交易订单编号','支付宝编号','物品名称','物品金额','支付状态'],
			}
		},
		components:{
			TitleItem,
			RecordItem,
			pageItem
		},
		computed:{
			...mapGetters({
				showTradeRecordData:'showTradeRecordData'
			})
		},
		methods:{
			...mapActions({
				getToTradeRecordHandler:'getToTradeRecordHandler'
			})
		},
		mounted(){
			this.$nextTick(()=>{
				this.getToTradeRecordHandler('company')
			})
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