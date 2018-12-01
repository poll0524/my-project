<template>
	<div class="apply-exp-container">
		<div class="apply-exp-box">
			<ExpTitle :titleData="performTitle"/>
			<AddExp 
			:labelTxt="performTxt"
			:formLength="showPerformLength"
			roleType="perform"
			applyType="group"/>
			<div class="addexp-btn" @click="addToPerform({type:'perform',applyType:'group'})"></div>
		</div>
		<div class="apply-exp-box">
			<ExpTitle :titleData="winTitle"/>
			<AddExp 
			:labelTxt="winTxt"
			:formLength="showWinLength"
			roleType="win"
			applyType="group"/>
			<div class="addexp-btn"  @click="addToPerform({type:'win',applyType:'group'})"></div>
		</div>
		<div class="apply-steps-btn flex">
			<div @click="stepsToChange({idx:0})">
				<button class="prev-btn">上一步</button>
				<!-- <router-link tag="button" class="prev-btn" to="/TeamFirstStep">上一步</router-link> -->
			</div>
			<div @click="nextToHandler">
				<button class="next-btn">下一步</button>
				<!-- <router-link tag="button" class="next-btn" :to="{path:'/TeamThreeStep',query:{id:2}}">下一步</router-link> -->
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";

	import ExpTitle from '../publicApplyComponents/expTitleComponents'
	import AddExp from '../publicApplyComponents/addOneExpComponents'

	export default{
		name:'twoApply',
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
			}
		},
		components:{
			ExpTitle,
			AddExp
		},
		computed:{
			...mapGetters({
				showPerformLength:'showPerformLength',
				showWinLength:'showWinLength'
			})
		},
		methods:{
			...mapActions({
				addToPerform:'addToPerform',
				stepsToChange:'stepsToChange'
			}),
			nextToHandler(){

				this.stepsToChange({idx:2,type:'group'})
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less">
	.apply-exp-container{
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