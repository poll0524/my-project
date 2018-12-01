git<template>
	<div class="apply-two-company">
		<div class="apply-two-content">
			<div class="apply-company-perform">
				<ExpTitle :titleData="performTitle"/>
				<AddExp 
				:labelTxt="performTxt"
				:formLength="showPerformLength"
				roleType="perform"
				applyType='company'/>
				<div class="addexp-btn" @click="addToPerform({type:'perform',applyType:'company'})"></div>
			</div>
			<div class="apply-company-win">
				<ExpTitle :titleData="winTitle"/>
				<AddExp 
				:labelTxt="winTxt"
				:formLength="showWinLength"
				roleType="win"
				applyType='company'/>
				<div class="addexp-btn"  @click="addToPerform({type:'win',applyType:'company'})"></div>
			</div>
		</div>
			<div class="apply-steps-btn flex">
				<div @click="stepsToChange({idx:0})">
					<button class="prev-btn">上一步</button>
					<!-- <router-link tag="button" class="prev-btn" to="/CompanyFirstStep">上一步</router-link> -->
				</div>
				<div @click="nextToThreeHandler">
					<button class="next-btn">下一步</button>
					<!-- <router-link tag="button" class="next-btn" :to="{path:'/CompanyThreeStep',query:{id:2}}">下一步</router-link> -->
				</div>
			</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="toggleModal"
		>
			<div slot="body" class="apply-tips"><i></i>请确定所填内容完整</div>
		</ModalItem>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";

	import ExpTitle from '../publicApplyComponents/expTitleComponents'
	import AddExp from '../publicApplyComponents/addOneExpComponents'
	import ModalItem from '../../publicModalComponents/publicModal'
	export default{
		name:'companyTwo',
		data(){
			return{
				performTitle:{
					name:'演出经历',
					smallTitle:'无演出经历则不填写'
				},
				performTxt:{
					date:'演出时间',
					content:'演出内容'
				},
				winTitle:{
					name:'获奖经历',
					smallTitle:'无获奖经历则不填写'
				},
				winTxt:{
					date:'获奖时间',
					content:'获奖内容'
				},
				showModal:false
			}
		},
		components:{
			ExpTitle,
			AddExp,
			ModalItem
		},
		computed:{
			...mapGetters({
				showPerformLength:'showPerformLength',
				showWinLength:'showWinLength',
				showCompanyPerformData:'showCompanyPerformData',
				showCompanyWinData:'showCompanyWinData'
			})
		},
		methods:{
			...mapActions({
				addToPerform:'addToPerform',
				stepsToChange:'stepsToChange'
			}),
			nextToThreeHandler(){
				if(this.showCompanyPerformData.length >0 || this.showCompanyWinData.length > 0){
					this.showCompanyPerformData.forEach((item,i)=>{
						if(item.image_urls.length<3 || item.role == ''){
							this.showModal = true;
							return
						}
					})
					this.showCompanyWinData.forEach((item,i)=>{
						if(item.image_urls.length<3 || item.role == ''){
							this.showModal = true;
							return
						}
					})
				}
				if(!this.showModal){
					this.stepsToChange({type:'company',idx:2})
				}
			},
			toggleModal(){
				this.showModal = false;
			}
		},
	}
</script>

<style lang="less">
	.apply-two-company{
		padding: 20px 40px;
		.apply-two-content{
			padding: 20px 0;
		}
		.apply-steps-btn{
			padding: 20px 0;
			justify-content: center;
			button{
				width: 150px;
				height: 40px;
				color:#fff;
				border-radius: 3px;
				border:none;
				cursor: pointer;
				transition: 0.3s;
				&.prev-btn{
					background: #191b2e;
					margin-right: 10px;
					&:hover{
						background:#000;
					}
				}
				&.next-btn{
					background: #ec6538;
					&:hover{
						background:#cd562e;
					}
				}
			}
		}
	}
</style>