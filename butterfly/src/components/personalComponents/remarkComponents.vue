<template>
	<div class="remark-box">
		<i></i>
		{{remarkText}}
	</div>
</template>

<script>
	export default{
		name:'remark',
		props:{
			'remarkText':{
				type:String
			}
		}
	}
</script>

<style scoped lang="less">
	.remark-box{
		font-size: 12px;
		color: #999;
		padding:10px 0;
		i{
			display: inline-block;
			vertical-align: bottom;
			width: 13px;
			height: 13px;
			border-radius: 50%;
			overflow: hidden;
			background: url(../../../static/images/icons.png) no-repeat;
			background-position: -219px -213px;
		}
	}
</style>
