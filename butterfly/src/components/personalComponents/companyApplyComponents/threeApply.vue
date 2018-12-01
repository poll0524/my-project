<template>
	<div class="apply-albumvideo">
		<div class="apply-album apply-av">
			<ExpTitle :titleData="titleData"/>
			<UploadImg roleType="album"  applyType="company"/>
			<div class="bottom-tips">
				<ExpTip :titleData="tipsData"/>
			</div>
		</div>
		<div class="apply-video apply-av">
			<ExpTitle :titleData="videoData"/>
			<UploadVideo  applyType="company"/>
			<div class="bottom-tips">
				<ExpTip :titleData="videoTips"/>
			</div>
		</div>
		<div class="apply-album-btn flex">
			<div @click="stepsToChange({idx:1})">
				<button class="prev-btn">上一步</button>
				<!-- <router-link tag="button" class="prev-btn" :to="{path:'/ActorTwoStep',query:{id:1}}">上一步</router-link> -->
			</div>
			<button class="apply-submit" @click="submitApplyHandler">提交申请</button>
		</div>
		<ModalItem
		v-if="showToModal"
		:showModal="showToModal"
		>
		<div slot="header">资料提交成功，请耐心等待审核。</div>
		<div slot="body">
			审核通过后，再申请实名认证将提高您的接单量
			<!-- <span @click="clearTimeHandler">
				<router-link to="/PlanCompanyApply" class="go-realname" tag="span">前往实名认证</router-link>
			</span> -->
		</div>
		<div slot="footer">
			<router-link class="modal-jump" tag="button" to="/CompanyEdit">跳过({{times}})</router-link>
		</div>
		</ModalItem>
		<ModalItem
			v-if="imgLengthFlag"
			:showModal="imgLengthFlag">
			<div slot="body" class="img-tips"><i></i>生活照至少三张,生活视频必须上传</div>
		</ModalItem>
		<ModalItem
			v-if="ApplyToVideoFlag"
			:showModal="ApplyToVideoFlag">
			<div slot="body" class="img-tips"><i></i>请上传小于50M的视频</div>
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
	    2.有演出经历需传，有代表性的一次演出的演出背景照*1 展示现场人数照*1 上台演出照*1，及在演出经历出填写详细的演出经历;
	    3.相册第一张将作为封面图，请谨慎选择相片上传。`
				},
				videoTips:{
					smallTitle:'请上传一段30秒左右的自我介绍，视频为MP4格式，大小50M以内，视频上传成功后，不能播放请过几分钟再试'
				},
				videoData:{name:'视频'},
				times:5,
				imgLengthFlag:false,
				timer:null
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
				showCompanyVideoUrl:'showCompanyVideoUrl',
				showToModal:'showToModal',
				showCompanyImgUrl:'showCompanyImgUrl',
				ApplyToVideoFlag:'ApplyToVideoFlag'
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
				 this.timer = setInterval(()=>{
					this.times--;
					if(this.times<=0){
						clearInterval(this.timer)
						this.times = 0;
						window.location.href="#/CompanyEdit"
					}
				},1000)
			},
			submitApplyHandler(){
				if(this.showCompanyImgUrl.length<3 || this.showCompanyVideoUrl==''){
					this.imgLengthFlag = true
					setTimeout(()=>{
						this.imgLengthFlag = false
					},2000)
					return
				}
				this.submitToApply('company');
				this.timesChange()
			},
			clearTimeHandler(){
				clearInterval(this.timer)
			}
		},
		mounted(){
		},
	}
</script>

<style lang="less">
	.img-tips{
		text-align: center;
		i{
			display: inline-block;
			width: 35px;
			height: 35px;
			background: url('../../../../static/images/icons.png') no-repeat;
			background-position: -175px -204px;
			vertical-align: middle;
			margin-right: 10px;
		}
	}
	.go-realname{
		text-decoration: underline;
		cursor: pointer;
	}
</style>
