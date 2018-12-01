<template>
	<div class="commentsinp-box">
		<div class="comments-head flex">
			<div class="comments-person">
				<div class="comments-img">
					<img :src="showCommentedPersonData.coverArtist?showCommentedPersonData.coverArtist:(showCommentedPersonData.coverPlanningCompany?showCommentedPersonData.coverPlanningCompany:defaultImg)" alt="">
				</div>
				<div class="comments-person-info">
					<div class="name">{{showCommentedPersonData.stageName?showCommentedPersonData.stageName:showCommentedPersonData.simpleName}}</div>
					<div class="skills">{{showCommentedPersonData.skills?showCommentedPersonData.skills:showCommentedPersonData.companyTypeText}}</div>
				</div>
			</div>
			<div class="comments-inp">
				<div class="comments-raido flex">
					<div class="radio-inp">
						<input type="radio" name="comment" value="2" v-model="showCommentsData.level">满意
					</div>
					<div class="radio-inp">
						<input type="radio" name="comment" value="1" v-model="showCommentsData.level">一般
					</div>
					<div class="radio-inp">
						<input type="radio" name="comment" value="0" v-model="showCommentsData.level">不满意
					</div>
				</div>
				<div class="comments-area">
					<textarea placeholder="请输入评论详情" v-model="showCommentsData.comment"></textarea>
				</div>
			</div>
		</div>
		<div class="comments-imgbox">
			<div class="img-title">上传合作照片</div>
			<UploadImg roleType="commentAlbum" applyType="comment"/>
		</div>
		<div class="comments-anonymous">
			<input type="checkbox" v-model="showCommentsData.anonymous">匿名
		</div>
		<div class="comments-btn flex">
			<div class="comments-send" @click='sendsToCommentHandler'>发表评论</div>
			<div class="comments-cancel" @click="closeToCommentsHandler">取消</div>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import UploadImg from './publicApplyComponents/uploadImg'

	export default{
		name:'commentInp',
		data(){
			return{
				defaultImg:'https://icon.maxbutterfly.com/static/icon/placeholder_list.png'
			}
		},
		components:{
			UploadImg
		},
		computed:{
			...mapGetters({
				showCommentsData:'showCommentsData',
				showCommentedPersonData:'showCommentedPersonData'
			})
		},
		methods:{
			...mapActions({
				sendsToCommentHandler:'sendsToCommentHandler',
				closeToCommentsHandler:'closeToCommentsHandler'
			})
		}
	}
</script>

<style lang="less">
	.commentsinp-box{
		.comments-head{
			padding: 0 20px 20px;
			border-bottom: 1px dashed #999;
			justify-content: center;
			.comments-person{
				margin-right: 20px;
				.comments-img{
					width: 125px;
					height: 160px;
					overflow: hidden;
					background: pink;
				}
				.comments-person-info{
					line-height: 20px;
					padding: 5px;
					.skills{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 150px;
					}
				}
			}
			.comments-inp{
				textarea{
					resize: none;
					width:400px;
					height: 150px;
					border-radius: 3px;
					border:1px solid #999;
					padding: 10px;
				}
				input[type=radio]{
					vertical-align: middle;
				}
				.comments-raido {
					justify-content: space-between;
					padding-bottom: 20px;
				}
			}
		}
		.comments-imgbox{
			padding: 20px 0;
			.img-title{
				text-align: center;
				font-size: 16px;
				padding-bottom:20px;
			}
			.upload-imgbox{
				width: 100%;
			}
		}
		.comments-anonymous{
			text-align: right;
			padding:20px 40px;
			input[type="checkbox"]{
				width: 15px;
				height: 15px;
				vertical-align: middle;
				margin-right: 10px;
			}
		}
		.comments-btn{
			justify-content: center;
			div{
				width: 90px;
				height: 30px;
				border-radius: 3px;
				transition: 0.3s;
				cursor: pointer;
				text-align: center;
				line-height: 30px;
				&.comments-send{
					background: #ec6538;
					margin-right: 20px;
					&:hover{
						background:#cd562e;
					}
				}
				&.comments-cancel{
					background: #999;
					&:hover{
						background:#888;
					}
				}
			}
		}
	}

</style>
