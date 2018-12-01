<template>
	<div class="name-box flex">
		<div class="name-text">{{nameTxt}}</div>
	</div>
</template>

<script>
	export default{
		name:'nameBox',
		props:['nameTxt']
	}
</script>

<style scoped lang="less">
	.name-box{
		justify-content: center;
		align-items: center;
		padding: 20px 0;
		.name-text{
			border-bottom: 2px solid #546380;
			font-weight: 700;
			font-size: 18px;
			padding: 0 5px;
		}
	}
</style>