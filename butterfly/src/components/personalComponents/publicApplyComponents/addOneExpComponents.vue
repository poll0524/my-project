<template>
	<div class="addexp-formbox">
		<div class="addexp-form flex" v-for="(item,idx) in reciveData">
			<span class="delete-icon" @click="deletToExp({roleType,idx,applyType})">×</span>
			<div>
				<div class="flex-box flex-date flex">
					<label for="">{{labelTxt.date}}</label>
					<div class="flex-inp" v-if="item.performance_date">
						<Datepicker
						:disabledDates="disabledDates"
						:language="languages.zh"
						format="yyyy-MM-dd"
						v-model="item.performance_date"
						/>
						<span class="color-arrow inp-arrow"></span>
					</div>
					<div class="flex-inp" v-if="item.award_date">
						<Datepicker
						:disabledDates="disabledDates"
						:language="languages.zh"
						format="yyyy-MM-dd"
						v-model="item.award_date"
						/>
						<span class="color-arrow inp-arrow"></span>
					</div>
				</div>
				<div class="flex-box flex-desc flex">
					<label for="">{{labelTxt.content}}</label>
					<div class="flex-inp text-control">
						<textarea v-if="roleType=='perform'" placeholder="请输入演出内容" maxlength="250" v-model="item.role"></textarea>
						<textarea v-if="roleType=='win'" placeholder="请输入获奖内容" maxlength="250" v-model="item.role"></textarea>
						<span>{{item.role.length}}/250</span>
					</div>
				</div>
				<div class="flex-box flex">
					<label for="">上传照片</label>
					<div class="flex-inp">
						<UploadImg
						:roleType="roleType"
						:activeIndex="idx"
						:imgUrlArr="item.imageUrls"
						:applyType="applyType"/>
					</div>
				</div>
			</div>
			<div class="addexp-delegate flex">
				<!-- <input type="radio" name="perform" @change="checkReplace('perform')" :value="idx" v-model="reciveReplace.performReplace" v-if="roleType=='perform'">
				<input type="radio" name="win"  @change="checkReplace('win')" :value="idx" v-model="reciveReplace.winReplace" v-if="roleType=='win'"> <span v-if="roleType=='perform'">设为代表作</span> -->
				<ExpTip :titleData="titleData"/>
			</div>
		</div>
	</div>
</template>

<script>

	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";
	import {mapGetters,mapActions} from "vuex";

	import UploadImg from './uploadImg'
	import ExpTip from './expTips'

	export default{
		name:'addExp',
		props:['labelTxt','roleType','showToData','applyType'],
		data(){
			return{
				languages:lang,
				propsFlag:false,
				titleData:{
					smallTitle:'相册必须上传3-5张照片'
				},
				reciveData:[],
				reciveReplace:{},
				disabledDates:{
					// to: new Date(2018, 1, 5),
					from: new Date()
				},
			}
		},
		components:{
			Datepicker,
			UploadImg,
			ExpTip
		},
		computed:{
			...mapGetters({
				showPerformLength:'showPerformLength',
				showperformData:'showperformData',
				showwinData:'showwinData',
				showReplace:'showReplace',
				showCompanyPerformData:'showCompanyPerformData',
				showCompanyWinData:'showCompanyWinData',
				showGroupPerformData:'showGroupPerformData',
				showGroupWinData:'showGroupWinData'
			})
		},
		methods:{
			...mapActions({
				deletToExp:'deletToExp',
				changeToReplace:'changeToReplace'
			}),
			checkReplace(type){
				if(this.showToData&&this.showToData.data.length>0){
					this.changeToReplace()
				}
			}
		},
		mounted(){

			if(this.showToData&&this.showToData.data.length>0){
				this.reciveData = this.showToData.data
			}else if(this.roleType == 'perform'){
				if(this.applyType=='actor'){
					this.reciveData = this.showperformData
				}else if(this.applyType=='company'){
					this.reciveData = this.showCompanyPerformData
				}else if(this.applyType=='group'){
					this.reciveData = this.showGroupPerformData
				}
			}else if(this.roleType == 'win'){
				if(this.applyType=='actor'){
					this.reciveData = this.showwinData
				}else if(this.applyType=='company'){
					this.reciveData = this.showCompanyWinData
				}else if(this.applyType=='group'){
					this.reciveData = this.showGroupWinData
				}
			}

			if(this.applyType=='actor'){
				this.reciveReplace = this.showReplace.actor
			}else if(this.applyType=='company'){
				this.reciveReplace = this.showReplace.company
			}else if(this.applyType=='group'){
				this.reciveReplace = this.showReplace.group
			}






		},
		destroyed(){
			this.changeToReplace();
		},
		watch:{

		}
	}
</script>

<style  lang="less">
	.addexp-formbox{
		.addexp-form{
			position: relative;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			padding: 30px 0;
			box-shadow: 0 1px 2px #999;
			margin-bottom: 20px;
			&:last-child{
				margin-bottom:0;
			}
			.flex-box{
				align-items: center;
				margin-bottom: 30px;
				&.flex-date{
					label{
						align-self: center;
					}
				}
				label{
					margin-right: 20px;
					align-self: flex-start;
				}
				input,textarea{
					border-radius: 3px;
					border:1px solid #999;
					color:#546370;
					outline: none;
				}
				input{
					height: 40px;
					padding-left: 5px;
				}
				textarea{
					width: 470px;
					resize: none;
					height: 150px;
					overflow: auto;
					padding: 5px;
				}
				.flex-inp{
					position: relative;
					input{
						position: relative;
						z-index: 1;
						background: transparent;
					}
					.inp-arrow{
						width: 40px;
						height: 100%;
					}
				}
				&.flex-desc{
					label{
						align-self: flex-start;
					}
				}
			}
			.delete-icon{
				position: absolute;
				right: 5px;
				top: 5px;
				font-size: 20px;
				font-weight: 700;
				cursor: pointer;
				opacity: 0.7;
				transition: 0.3s;
				&:hover{
					opacity:1;
				}
			}
			.addexp-delegate{
				position: relative;
				align-items: center;
				input{
					margin-right: 5px;
					width: 15px;
					height: 15px;
				}
			}
		}
	}
</style>
