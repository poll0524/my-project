<template>
	<div class="news-btnbox flex">
		<div class="all-check">
			<input type="checkbox" v-model="showToCheck.checked" @change="allToCheck"> 全选
		</div>
		<div class="flex flex-item">
			<div class="flex-btn" @click="deletToChooseNews">删除选中</div>
			<div class="flex-btn" @click="allNewsToReadedHandler">全部标记为已读</div>
			<div class="flex-btn" @click="deletToAllReadedNewsHandler">删除全部已读</div>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'newsBtn',
		data(){
			return{

			}
		},
		computed:{
			...mapGetters({
				showToCheck:'showToCheck',
				showNewsListData:'showNewsListData'
			})
		},
		methods:{
			...mapActions({
				allToCheck:'allToCheck',
				allNewsToReadedHandler:'allNewsToReadedHandler',
				deletToAllReadedNewsHandler:'deletToAllReadedNewsHandler',
				deletToChooseNews:'deletToChooseNews'
			})
		}
	}
</script>
<style scoped lang="less">
	.news-btnbox{
		padding: 20px 40px;
		align-items: center;
		input[type=checkbox]{
			vertical-align: middle;
		}
		.all-check{
			margin-right: 95px;
		}
		.flex-item{
			flex:1;
			justify-content: flex-start;
			align-items: center;
			.flex-btn{
				border: 1px solid #999;
				width: 150px;
				height: 30px;
				border-radius: 3px;
				text-align: center;
				line-height: 28px;
				transition: 0.3s;
				cursor: pointer;
				margin-right: 20px;
				&:hover{
					color:#ec6538;
					border-color: #ec6538;
				}
			}
		}
	}
</style>