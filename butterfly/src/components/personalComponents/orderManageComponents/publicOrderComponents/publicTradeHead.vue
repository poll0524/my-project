<template>
	<div class="trade-head">
		<ul class="flex">
			<li v-for="item in tradeHead">{{item}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'tradeHead',
		props:['tradeHead'],
	}
</script>

<style lang="less">
	.trade-head{
		padding-bottom: 5px;
		ul{
			background: #191b2e;
			color: #fff;
			li{
				height: 30px;
				line-height: 30px;
				text-align: center;
				flex-shrink: 0;
				&:nth-child(1){
					width: 280px;
				}
				&:nth-child(2){
					width: 100px;
				}
				&:nth-child(3){
					width: 75px;
				}
				&:nth-child(4){
					width: 95px;
				}
				&:nth-child(5){
					width: 140px;
				}
				&:nth-child(6){
					width: 95px;
				}
				&:nth-child(7){
					width: 95px;
				}
			}
		}
	}
</style>