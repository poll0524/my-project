<template>
	<div class="apply-video-flie flex">
		<div class="video-box" v-if="reciveVideoUrl!=''">
			<video :src="reciveVideoUrl" controls></video>
			<!-- <video :src="item.path" controls  v-if="item.type=='video'" v-for="item in videoUrl"></video> -->
			<div class="delete-video">
				<span @click="deletToVideo({applyType,videoUrl})">×</span>
			</div>
		</div>
		<div class="add-video" v-if="reciveVideoUrl==''">
			<input type="file" accept="audio/mp4,video/mp4" @change="uploadToVideo({$event,applyType,videoUrl})">
			+
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		name:'publicVideo',
		props:['applyType','videoUrl'],
		data(){
			return{
				reciveVideoUrl:''
			}
		},
		computed:{
			...mapGetters({
				showvideoUrl:'showvideoUrl',
				showCompanyVideoUrl:'showCompanyVideoUrl',
				showGroupVideoUrl:'showGroupVideoUrl',
				temToVideoUrl:'temToVideoUrl'
			})
		},
		methods:{
			...mapActions({
				uploadToVideo:'uploadToVideo',
				deletToVideo:'deletToVideo',
				reciveToAlbumHandler:'reciveToAlbumHandler'
			}),
		},
		mounted(){

			if(this.videoUrl){
				this.videoUrl.forEach((item)=>{
					if(item.type == 'video'){
						this.reciveVideoUrl = item.path
					}
				})
				// this.reciveVideoUrl = this.videoUrl;
			}else{
				this.reciveVideoUrl = this.temToVideoUrl
			}

			/*if(this.applyType == 'actor'){
				this.reciveVideoUrl = this.showvideoUrl
			}else if(this.applyType == 'company'){
				this.reciveVideoUrl = this.showCompanyVideoUrl
			}else if(this.applyType == 'group'){
				this.reciveVideoUrl = this.showGroupVideoUrl
			}*/
		},
		watch:{
			/*showCompanyVideoUrl(){
				this.reciveVideoUrl = this.showCompanyVideoUrl
			},
			showvideoUrl(){
				this.reciveVideoUrl = this.showvideoUrl
			},
			showGroupVideoUrl(){
				this.reciveVideoUrl = this.showGroupVideoUrl
			},*/
			temToVideoUrl(){
				this.reciveVideoUrl = this.temToVideoUrl
			},
			videoUrl(){

				this.videoUrl.forEach((item)=>{
					if(item.type == 'video'){
						this.reciveVideoUrl = item.path
					}else if(!item.type){
						this.reciveVideoUrl = item
					}else{
						this.reciveVideoUrl = ''
					}
				})
				this.reciveToAlbumHandler({urls:this.videoUrl,applyType:this.applyType})
			}
		}
	}
</script>
<style lang="less">
	.apply-video-flie{
		position: relative;
		padding-left: 20px;
		.video-box{
			position: relative;
			width: 400px;
			height: 200px;
			overflow: hidden;
			margin-right: 20px;
			video{
				object-fit: fill;
				width: 100%;
				height: 100%;
			}
			.delete-video{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 20px;
				background: rgba(255,255,255,0.7);
				font-size: 20px;
				font-weight: 700;
				text-align: right;
				line-height: 20px;
				transition:0.3s;
				&:hover{
					span{
						opacity:1;
					}
				}
				span{
					display: inline-block;
					width: 20px;
					height: 100%;
					opacity: 0.7;
					cursor:pointer;
				}
			}
		}
		.add-video{
			width: 200px;
			height: 200px;
			border:2px dashed #999;
			text-align: center;
			line-height: 196px;
			font-weight: 700;
			font-size: 50px;
			position: relative;
			color:#999;
			input[type=file]{
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
				left: 0;
				top: 0;
			}
		}
	}
</style>
