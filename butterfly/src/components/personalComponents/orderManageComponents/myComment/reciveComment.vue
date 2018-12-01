<template>
	<div class="recive-comment">
		<div v-for="item in showCommentData.reciveData">
			<div class="recive-head">
				<div class="recive-name">{{item.anonymous?'匿名':'合作方：'+item.receiverName}}</div>
				<div class="recive-state">他/她对我的合作表示: <span>{{item.state}}</span></div>
			</div>
			<CommentInfo :commentInfoData="item"/>
			<div class="date">{{item.date}}</div>
		</div>
		<div class="have-nocomment" v-if="showCommentData.reciveData.length==0">暂无评价</div>
		<pageItem :kindsType="type"/>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import CommentInfo from './commentInfo'
	import pageItem from '../../../paginations/pagination'

	export default{
		name:'reciveComment',
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
        getToCommentDataHandler:'getToCommentDataHandler'
      })
    },
    mounted(){
		  this.getToCommentDataHandler();
    },
	}
</script>

<style lang="less">
	.recive-comment{
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
		.recive-head{
			line-height: 25px;
			.recive-state{
				span{
					color: #ec6538;
				}
			}
		}
	}
</style>
