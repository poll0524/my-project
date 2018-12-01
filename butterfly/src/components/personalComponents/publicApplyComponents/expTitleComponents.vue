<template>
	<div class="apply-exp-title flex">
		<div class="exp-title flex">
			<span class="exp-name">{{titleData.name}}</span>
			<ExpTips :titleData="titleData"/>
		</div>
	</div>
</template>

<script>

	import ExpTips from './expTips'

	export default{
		name:'expTitle',
		props:{
			'titleData':{
				type:Object
			}
		},
		components:{
			ExpTips
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="less">
	.apply-exp-title{
		justify-content: center;
		align-items: center;
		padding:25px 0;
		.exp-title{
			position: relative;
			font-size: 12px;
			color: #999;
			.exp-name{
				font-size: 18px;
				color: #546370;
				font-weight: 700;
				border-bottom: 2px solid #546370;
			}
		}
	}
</style>