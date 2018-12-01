<template>
	<div class="comment-info">
		<div class="comment-text-name">评价内容:</div>
		<div class="comment-text">
			{{commentInfoData.commentConent}}
		</div>
		<ImgItem :commentImgData="commentInfoData.commentImg"/>
	</div>
</template>

<script>

	import ImgItem from './commentImg'

	export default{
		name:'commentInfo',
		props:['commentInfoData'],
		data(){
			return{

			}
		},
		components:{
			ImgItem
		}
	}
</script>

<style scoped lang="less">
	.comment-info{
		padding: 10px 0;
		.comment-text{
			font-size: 12px;
			line-height: 20px;
			text-indent: 24px;
			padding: 5px 0;
		}
	}
</style>
