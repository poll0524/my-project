<template>
	<div class="upload-box">
		<div class="upload-imgbox flex">
			<div class="upload-img" v-for="(item,idx) in imgUrl">
				<img :src="item.path?item.path:item" alt="img加载失败">
				<div class="del-img">
					<span @click="deletToImg({roleType,activeIndex,idx,applyType,imgUrlArr})">×</span>
				</div>
			</div>
			<div class="upload-btn" v-if="showBtn">
				<input type="file" accept="image/jpeg,image/png" @change="changeToImg({$event,roleType,activeIndex,applyType,imgUrlArr})">
				+
			</div>
		</div>

	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'uploadImg',
		props:['roleType','activeIndex',"applyType",'imgUrlArr'],
		data(){
			return{
				imgUrl:[],
				showBtn:true
			}
		},
		computed:{
			...mapGetters({
				showImgUrl:'showImgUrl',
				showperformData:'showperformData',
				showwinData:'showwinData',
				showCompanyPerformData:'showCompanyPerformData',
				showCompanyWinData:'showCompanyWinData',
				showCompanyImgUrl:'showCompanyImgUrl',
				showCommentsData:'showCommentsData',
				showGroupPerformData:'showGroupPerformData',
				showGroupWinData:'showGroupWinData',
				showGroupImgUrl:'showGroupImgUrl',
			})
		},
		methods:{
			...mapActions({
				changeToImg:'changeToImg',
				deletToImg:'deletToImg',
				reciveToAlbumHandler:'reciveToAlbumHandler'
			}),
		},
		mounted(){

			if(this.imgUrlArr){
				this.imgUrl = this.imgUrlArr
			}else if(this.roleType == 'perform'){
				if(this.applyType=='actor'){
					if(this.imgUrlArr){
						this.imgUrl = this.imgUrlArr
					}else{
						this.imgUrl = this.showperformData[this.activeIndex].image_urls
					}
				}else if(this.applyType=='company'){
					this.imgUrl = this.showCompanyPerformData[this.activeIndex].image_urls
				}else if(this.applyType=='group'){
					this.imgUrl = this.showGroupPerformData[this.activeIndex].image_urls
				}
			}else if(this.roleType == 'win'){
				if(this.applyType=='actor'){
					if(this.imgUrlArr){
						this.imgUrl = this.imgUrlArr
					}else{
						this.imgUrl = this.showwinData[this.activeIndex].image_urls
					}
				}else if(this.applyType=='company'){
					this.imgUrl = this.showCompanyWinData[this.activeIndex].image_urls
				}else if(this.applyType=='group'){
					this.imgUrl = this.showGroupWinData[this.activeIndex].image_urls
				}
			}else if(this.roleType == 'album'){
				if(this.applyType=='actor'){
					if(this.imgUrlArr){
						this.imgUrl = this.imgUrlArr
					}else{
						this.imgUrl = this.showImgUrl
					}
				}else if(this.applyType == 'company'){
					this.imgUrl = this.showCompanyImgUrl
				}else if(this.applyType == 'group'){
					this.imgUrl = this.showGroupImgUrl
				}
			}else if(this.roleType=='commentAlbum'){
				this.imgUrl = this.showCommentsData.images
			}
		},
		watch:{
			imgUrl(){
				if(this.imgUrl.length>=5){
					this.showBtn = false
				}else{
					this.showBtn = true
				}
				if(this.roleType == 'album'){
					this.reciveToAlbumHandler({urls:this.imgUrl,applyType:this.applyType})
				}

			},
		}
	}
</script>

<style lang="less">
	.upload-imgbox{
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 470px;
		padding-left: 20px;
		.upload-img{
			width: 32.3%;
			height: 170px;
			margin-right: 1%;
			margin-bottom: 10px;
			position: relative;
			overflow: hidden;
			.del-img{
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;
				height: 20px;
				background: rgba(255,255,255,0.5);
				text-align: right;
				line-height: 20px;
				font-size: 20px;
				font-weight: 700;
				cursor: pointer;
				transition: 0.3s;
				&:hover{
					background:rgba(255,255,255,1);
				}
				span{
					display: inline-block;
					width: 20px;
					height: 20px;
					text-align: center;
				}
			}

		}
		.upload-btn{
			position: relative;
			width: 32.3%;
			height: 170px;
			line-height: 166px;
			font-size: 50px;
			color:#999;
			font-weight: 700;
			text-align: center;
			border:2px dashed #999;
			cursor: pointer;
			overflow: hidden;
			input[type=file]{
				position: absolute !important;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: transparent;
				height: 100% !important;
				opacity: 0;
			}
		}
	}
</style>
