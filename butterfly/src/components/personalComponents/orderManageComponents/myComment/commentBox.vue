<template>
	<div class="comment-box">
		<TitleItem titleName="我的评价"/>
		<TabsItem :tabData="tabData" type="comment"/>
		<div class="comment-content">
			<ReciveItem v-if="showCommentIdx==0" type="reciveComment"/>
			<SendItem v-if="showCommentIdx==1" type="sendComment"/>
			<NotItem v-if="showCommentIdx==2" type="notComment"/>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleItem from '../../titleNameComponents'
	import TabsItem from '../publicOrderComponents/publicTabs'
	import SendItem from './sendComment'
	import ReciveItem from './reciveComment'
	import NotItem  from './notComment'

	export default{
		name:'myComment',
		data(){
			return{
				tabData:['收到的评价','发出的评价','待评价']
			}
		},
		components:{
			TitleItem,
			TabsItem,
			SendItem,
			ReciveItem,
			NotItem
		},
		computed:{
			...mapGetters({
				showCommentIdx:'showCommentIdx'
			})
		}
	}
</script>

<style scoped lang="less">
	.comment-content{
		padding:0 20px;
	}
</style>