<template>
	<div class="apply-albumvideo">
		<div class="apply-album apply-av">
			<ExpTitle :titleData="titleData"/>
			<UploadImg roleType="album" applyType="group"/>
			<div class="bottom-tips">
				<ExpTip :titleData="tipsData"/>
			</div>
		</div>
		<div class="apply-video apply-av">
			<ExpTitle :titleData="videoData"/>
			<UploadVideo  applyType="group"/>
			<div class="bottom-tips">
				<ExpTip :titleData="videoTips"/>
			</div>
		</div>
		<div class="apply-album-btn flex">
			<div @click="stepsToChange({idx:1})">
				<button class="prev-btn">上一步</button>
				<!-- <router-link tag="button" class="prev-btn" :to="{path:'/ActorTwoStep',query:{id:1}}">上一步</router-link> -->
			</div>
			<button class="apply-submit" @click="submitToApply">提交申请</button>
		</div>
		<ModalItem
		v-if="showToModal"
		:showModal="showToModal"
		>
		<div slot="header">资料提交成功，请耐心等待</div>
		<div slot="body">
			是否实名认证，申请实名认证将提高您的接单量
			<router-link to="/realName">前往实名认证</router-link>
		</div>
		<div slot="footer">
			<router-link class="modal-jump" tag="button" to="/TeamMaterial">跳过({{times}})</router-link>
		</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import ExpTitle from '../publicApplyComponents/expTitleComponents'
	import UploadImg from '../publicApplyComponents/uploadImg'
	import ExpTip from '../publicApplyComponents/expTips'
	import UploadVideo from '../publicApplyComponents/uploadVideo'

	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'applyAlbum',
		data(){
			return{
				titleData:{name:'相册'},
				tipsData:{
					smallTitle:`1.无演出经历需传 素颜照*1 生活中*1 淡妆照*1;
	    2.有演出经历需传，有代表性的一次演出的演出背景照*1 展示现场人数照*1 上台演出照*1，及在演出经历出填写详细的演出经历。`
				},
				videoTips:{
					smallTitle:'请上传一段30秒左右的自我介绍，视频上传成功后，不能播放请过几分钟再试'
				},
				videoData:{name:'视频'},
				times:5
			}
		},
		components:{
			ExpTitle,
			UploadImg,
			ExpTip,
			ModalItem,
			UploadVideo

		},
		computed:{
			...mapGetters({
				showvideoUrl:'showvideoUrl',
				showToModal:'showToModal'
			})
		},
		methods:{
			...mapActions({
				uploadToVideo:'uploadToVideo',
				deletToVideo:'deletToVideo',
				stepsToChange:'stepsToChange',
				submitToApply:'submitToApply'
			}),
			timesChange(){
				var timer = setInterval(()=>{
					this.times--;
					if(this.times<=0){
						clearInterval(timer)
						this.times = 0;
					}
				},1000)
			}
		},
		mounted(){
			this.timesChange()
		},
	}
</script>

<style lang="less">

</style>
