<template>
	<div class="exp-tips">
		<i></i>{{titleData.smallTitle}}
	</div>
</template>

<script>
	export default{
		name:'twoApply',
		props:{
			'titleData':{
				type:Object
			}
		},
		data(){
			return{

			}
		}
	}
</script>

<style lang="less">
	.exp-tips{
		position: absolute;
		left: 100%;
		min-width: 200px;
		bottom: 0;
		padding-left: 20px;
		white-space: nowrap;

		i{
			display: inline-block;
			/*vertical-align: middle;*/
			width: 13px;
			height: 13px;
			background: url(../../../../static/images/icons.png) no-repeat;
			background-position: -219px -213px;
		}
	}
</style>
