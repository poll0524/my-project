<template>
	<div class="publish-needsinfo">
		<!--  -->
		<div class="publish-needsinfo-box" v-show="showIndex==index" v-for="(item,index) in showFormDataList">
				<div class="flex">
					<label><span>*</span>选择分类</label>
					<div class="publish-inp">
						<input type="radio" checked>找艺人
					</div>
				</div>
				<div class="flex">
					<label><span>*</span>需求类型</label>
					<div class="publish-inp">
						<LinkageItem
						:selectData="selectData"
						type="classify"
						v-if="propsFlag"
						:data-idx='index'
						:reciveOneIndex="reciveOneIndex"
						:reciveTwoIndex="reciveTwoIndex"
						@parentChange="skillsToChange"/>
					</div>
				</div>
				<div class="flex">
					<label><span>*</span>预　　算</label>
					<div class="publish-inp publish-budget">
						<input type="text" value="0" maxlength="8" v-model="item.budget" @change="needsBudget"> 元
					</div>
				</div>
				<div class="flex">
					<label><span>*</span>需求数量</label>
					<div class="publish-inp publish-maxLimit">
						<input type="number" v-model="item.number" maxlength="8" @change="needsNumber"> 个
					</div>
				</div>
				<div class="flex">
					<label><span>*</span>报名数量限制</label>
					<div class="publish-inp publish-maxLimit">
						<input type="number" v-model="item.max_limit" maxlength="8" @change="needsMaxLimit"> 个
					</div>
				</div>
				<div class="flex">
					<label><span>*</span>报名截止日期</label>
					<div class="publish-inp publish-deadLine">
						<Datepicker
						:language="languages.zh"
						:disabledDates="disabledDates"
						format="yyyy-MM-dd"
						v-model="item.deadline"/>
						<span class="inp-arrow"></span>
					</div>
				</div>
				<div class="flex publish-supplyInfo">
					<label>补充信息</label>
					<div class="publish-inp text-control">
						<textarea placeholder="请输入补充信息" maxlength="250" v-model="item.supplement"></textarea>
						<span>{{item.supplement.length}}/250</span>
					</div>
				</div>
		</div>
	</div>
</template>
<script>
	import classify from '../../assets/js/classify.js'
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";
	import {mapGetters,mapActions} from "vuex";
	import {regEX} from '../../assets/js/public.js'

	import LinkageItem from '../linkageComponents/linkageComponents'

	export default{
		name:'needsInfo',
		props:['showFormDataList'],
		data(){
			return{
				selectData:[],
				skillsIdx:0,
				propsFlag:false,
				languages:lang,
				showIndex:0,
				reciveOneIndex:null,
				reciveTwoIndex:null,
				disabledDates:{
					to: new Date(),
					// from: new Date()
				},
			}
		},
		computed:{
			...mapGetters({
				showActiveIndex:'showActiveIndex',
				// showFormDataList:'showFormDataList',
				showDraftFlag:'showDraftFlag',
				showDefaultSkills:'showDefaultSkills'
			})
		},
		components:{
			LinkageItem,
			Datepicker
		},
		methods:{
			...mapActions({
				skillsToChange:'skillsToChange',
				initToFormData:'initToFormData'
			}),
			needsBudget(){
				// if(!regEX(this.showFormDataList[this.showIndex].budget).checkBudget){
				// 	alert('预算至少大于50的整数')
				// 	return;
				// }
			},
			needsNumber(){
			},
			needsMaxLimit(){
				// if(Number(this.showFormDataList[this.showIndex].number)>Number(this.showFormDataList[this.showIndex].max_limit)){
				// 	alert('需求量应该小于最大限制数量')
				// 	return;
				// }
			},
		},
		mounted(){
			this.selectData = classify.classify
			this.showIndex = this.showActiveIndex
			this.propsFlag = true
			this.initToFormData();

		},
		watch:{
			showActiveIndex(){
				this.showIndex = this.showActiveIndex
			},
			showFormDataList(){
				this.showIndex = this.showFormDataList.length-1;
				if(this.showDraftFlag){
					this.reciveOneIndex = this.showDefaultSkills.reciveOneIndex;
					this.reciveTwoIndex = this.showDefaultSkills.reciveTwoIndex;

				}
			},
			showDraftFlag(){
				this.reciveOneIndex = this.showDefaultSkills.reciveOneIndex;
				this.reciveTwoIndex = this.showDefaultSkills.reciveTwoIndex;

			},
		}
	}
</script>
<style lang="less">
	.publish-needsinfo{
		.text-control span{
			right: 10px;
		}
	}
</style>
