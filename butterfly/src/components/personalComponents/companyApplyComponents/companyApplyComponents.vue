<template>
	<div class="actor-apply-container">
		<TitleItem
		:titleName="titleName"/>
		<RemarkItem
		:remarkText="remarkText"/>
		<StepItem 
		:stepsTextData="stepsTextData"/>
		<!-- <router-view/> -->
		<FirstItem v-if="showstepActiveIndex==0"/>
		<TwoItem v-if="showstepActiveIndex==1"/>
		<ThreeItem v-if="showstepActiveIndex==2"/>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleItem from '../titleNameComponents'
	import StepItem from '../publicApplyComponents/applySteps'
	import RemarkItem from '../remarkComponents'
	import FirstItem from './firstApply'
	import TwoItem from './twoApply'
	import ThreeItem from './threeApply'

	export default{
		name:'actorApply',
		data(){
			return{
				stepsTextData:['公司信息填写','公司经历填写','相册/视频上传','待审核'],
				remarkText:'请仔细填写艺人信息、艺人经历、按要求上传照片，方便需求方更直观的了解您，提高您的接单量。',
				titleName:'策划公司申请'
			}
		},
		components:{
			StepItem,
			RemarkItem,
			TitleItem,
			FirstItem,
			TwoItem,
			ThreeItem
		},
		computed:{
			...mapGetters({
				showstepActiveIndex:'showstepActiveIndex'
			})
		},
		methods:{
			...mapActions({
				initToSteps:'initToSteps'
			})
		},
		mounted(){
			this.initToSteps()
		}
	}
</script>

<style scoped lang="less">

</style>