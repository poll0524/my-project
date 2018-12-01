<template>
	<div class="title-name">
		<span>{{titleName}}</span>
	</div>
</template>

<script>
	export default{
		name:'titleName',
		props:{
			'titleName':{
				type:String
			}
		}
	}
</script>

<style scoped lang="less">
	.title-name{
		font-size: 14px;
		border-bottom: 1px solid #999;
		padding:5px 0;
		span{
			border-left: 2px solid #ec6538;
			padding-left: 5px;
		}
	}
</style>