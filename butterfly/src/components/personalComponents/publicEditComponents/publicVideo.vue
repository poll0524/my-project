<template>
	<div class="exp-video-container">
		<div class="exp-video-box">
			<div class="info-head flex">
				<span class="name">{{headName}}</span>
				<!-- <span class="edit" @click="editToPersonalHandler('video')">编辑</span> -->
			</div>
			<div class="exp-video-content">
				<div class="exp-video-flex flex" v-for="item in videoUrl">
					<video :src="item.path" controls v-if="item.type=='video'&&item.path!=''"></video>
				</div>
			</div>
			<div class="exp-video-tips">
				<ExpTip :titleData="titleData"/>
			</div>
		</div>
		<div class="bottom-tips flex">
			<i></i>
			完善资料，让需求方更了解您!
		</div>
		<ModalItem
		v-if="showVideoFlag"
		:showModal="showVideoFlag"
		@changheHintBoxShow="cancelToEditHandler({type:'video'})">
			<div slot="body">
				<UploadVideo :videoUrl="videoUrl" reciveType="actorVideo" :applyType="applyType"/>
			</div>
			<div slot="footer">
				<ControlBtn v-if="showVideoFlag" type="video" :applyType="applyType"/>
			</div>
		</ModalItem>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import ExpTip from '../publicApplyComponents/expTips'
	import ModalItem from '../../publicModalComponents/publicModal'
	import UploadVideo from '../publicApplyComponents/uploadVideo'
	import ControlBtn from './publicControBtns'

	export default {
		name:'expVideo',
		props:['headName','videoUrl','applyType'],
		data(){
			return{
				titleData:{
					smallTitle:'请上传一段30秒左右的自我介绍，视频上传成功后，不能播放请过几分钟再试。'
				},
				reciveVideoUrl:''
			}
		},
		components:{
			ExpTip,
			ModalItem,
			UploadVideo,
			ControlBtn
		},
		computed:{
			...mapGetters({
				showVideoFlag:'showVideoFlag'
			})
		},
		methods:{
			...mapActions({
				editToPersonalHandler:'editToPersonalHandler',
				cancelToEditHandler:'cancelToEditHandler',
			}),
		},
		mounted(){
			this.videoUrl.forEach((item)=>{
				if(item.type == 'video'){
					this.reciveVideoUrl = item.path
				}
			})
		}
	}
</script>

<style scoped lang="less">
	.exp-video-container{
		padding: 20px 0;
		.exp-video-box{
			border-bottom: 2px dashed #999;
			padding-bottom: 20px;
		}
		.info-head{
			justify-content: space-between;
			padding:0 20px 20px;
			color: #ec6538;
			font-weight: 700;
			.edit{
				font-weight: normal;
				color: #0018ff;
				cursor: pointer;
				&:hover{
					text-decoration:underline;
				}
			}
		}
		.exp-video-content{
			padding: 20px 0;
			.exp-video-flex{
				justify-content: center;
				align-items: center;
				video{
					max-width: 400px;
					max-height: 400px;
				}
			}
		}
		.exp-video-tips{
			position: relative;
			min-height: 50px;
			.exp-tips{
				left: 0;
			}
		}
		.bottom-tips{
			justify-content: center;
			align-items: center;
			padding:20px 0;
			color: #999;
			i{
				display: block;
				width: 31px;
				height: 31px;
				background:url(../../../../static/images/icons.png) no-repeat;
				background-position: -230px -160px;
				margin-right: 10px;
			}
		}
	}
</style>
