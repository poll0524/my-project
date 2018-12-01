<template>
	<div class="send-comment">
		<div v-for="item in showCommentData.sendData">
			<div class="send-head">
				<div class="send-namebox">
					<div class="send-name">需求名称：{{item.demandName}}</div>
					<div class="send-cooName">合作方：{{item.receiverName}}</div>
				</div>
				<div class="send-state">我的满意度 <span>{{item.state}}</span></div>
			</div>
			<CommentInfo :commentInfoData="item"/>
			<div class="date">{{item.date}}</div>
		</div>
		<div class="have-nocomment" v-if="showCommentData.sendData.length==0">暂无评价</div>
		<pageItem :kindsType="type"/>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import CommentInfo from './commentInfo'
	import pageItem from '../../../paginations/pagination'
	export default{
		name:'sendComment',
		props:['type'],
		data(){
			return{

			}
		},
		components:{
			CommentInfo,
			pageItem
		},
		computed:{
			...mapGetters({
				showCommentData:'showCommentData'
			})
		},
	    methods:{
	      ...mapActions({
	        sendToCommentDataHandler:'sendToCommentDataHandler'
	      })
	    },
	    mounted(){
			this.sendToCommentDataHandler();
	    }
	}
</script>

<style lang="less">
	.send-comment{
		&>div{
			border-bottom: 1px dashed #999;
			margin-bottom: 20px;
			.date{
				position: absolute;
				right: 5px;
				bottom: 5px;
			}
			&.pages-box{
				border-bottom: 0;
			}
		}
		.have-nocomment{
			padding:40px;
			text-align: center;
		}
		.send-head{
			line-height: 25px;
			.send-state{
				span{
					color: #ec6538;
				}
			}
		}
	}
</style>
