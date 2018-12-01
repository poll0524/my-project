<template>
	<div class="condition-container">
		<div class="condition-header flex">
			<SearchItem/>
			<div class="condition-btns" @click="checkToCertify">
				<div class="auth-mask" v-if="!showClickFlag"></div>
				<router-link to="/publishNeeds">发布需求</router-link>
			</div>
		</div>
		<div class="condition-filter-box" v-if="changeFlag">
			<!-- 艺人分类 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorClassify"
			:activeIndex="classifyIdx"
			@fileterElemChange="classifyChange"/>
			<!-- 艺人性别 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorSex"
			:activeIndex="sexIdx"
			@fileterElemChange="sexChange"/>
			<!-- 艺人才艺 -->
			<div class="condition-list flex">
				<div class="condition-list-name">
					艺人才艺
				</div>
				<div class="condition-list-select">
					<LinkageItem
					:selectData="selectData"
					:linkAgeIdx="skillsIdx"
					:reciveOneIndex="reciveOneIndex"
					:reciveTwoIndex="reciveTwoIndex"
					type="classify"
					v-if="propsFlag"
					@parentChange="skillsChange"/>
				</div>
			</div>
			<!-- 艺人年龄 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorAge"
			:activeIndex="ageIdx"
			@fileterElemChange="ageChange"/>
			<!-- 常驻城市 -->
			<div class="condition-list flex">
				<div class="condition-list-name">
					常驻城市
				</div>
				<div class="condition-list-select condition-addr">
					<v-distpicker @selected="onSelected"></v-distpicker>
					<i></i>
					<i></i>
					<i></i>
					<span class="color-arrow inp-arrow"></span>
					<span class="color-arrow inp-arrow"></span>
					<span class="color-arrow inp-arrow"></span>
				</div>
			</div>
			<!-- 艺人报价 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorPrice"
			:activeIndex="priceIdx"
			@fileterElemChange="priceChange"/>
			<!--艺人档期 -->
			<div class="flex choose-date">
				<FilterElem
				v-if="propsFlag"
				:fileterElemData="reciveFilterData.actorTimes"
				:activeIndex="timesIdx"
				@fileterElemChange="timesChange"/>
				<div class="date-box flex">
					<span class="date-span actor-date-span">开始日期</span>
					<Datepicker :language="languages.zh" v-model="startDate" format="yyyy-MM-dd" @selected="dateChange('start')"/>
				</div>
				<div class="date-box flex">
					<span class="date-span actor-date-span">结束日期</span>
					<Datepicker :language="languages.zh" v-model="endDate" format="yyyy-MM-dd" @selected="dateChange('end')"/>
				</div>
			</div>
			<!-- 艺人认证 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorCertify"
			:activeIndex="certifyIdx"
			@fileterElemChange="certifyChange"/>
			<!-- 平台信誉分 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.actorCredit"
			:activeIndex="creditIdx"
			@fileterElemChange="creditChange"/>



		</div>
		<ModalItem
			v-if="showAuthFlag"
			:showModal="showAuthFlag"
			@changheHintBoxShow="closeToAuthModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='noLogin'">
				<p>您当前身份不能发布需求，请登录后前往个人中心申请/切换主办方或策划公司身份！</p>
				<div class="auth-btns">
					<router-link to="/login" tag="button">前往登录</router-link>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="shwoAuthType=='regularMember'">
				<p>您当前身份不能发布需求，请前往个人中心申请/切换主办方或策划公司身份</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
		</ModalItem>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";

	import SearchItem from '../searchBoxComponents/searchBox'
	import LinkageItem from '../linkageComponents/linkageComponents'
	import FilterElem from '../filterComponents/filterElemComponents'
	import ModalItem from '../publicModalComponents/publicModal'

	import classify from '../../assets/js/classify.js'
	import address from '../../assets/js/address.js'
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";

	import {axiosReqGet,getToken,base64_encode,formatTime} from '../../assets/js/public.js'


	export default{
		name:'fliterCondi',
		props:{
			'filerListData':{
				type:Object
			},
			'getFilterData':{
				type:Function
			}
		},
		data(){
			return{
				selectData:[],
				addressData:[],
				propsFlag:false,
				reciveFilterData:{},
				changeFlag:false,
				classifyIdx:0,
				sexIdx:0,
				skillsIdx:0,
				ageIdx:0,
				cityIdx:0,
				priceIdx:0,
				timesIdx:0,
				certifyIdx:0,
				creditIdx:0,
				childFilterData:{},
				startDate:new Date(),
				endDate:new Date(),
				languages: lang,
				reciveOneIndex:0,
				reciveTwoIndex:0,
				startFlag:true,
				endFlag:false
			}
		},
		components:{
			SearchItem,
			LinkageItem,
			FilterElem,
			Datepicker,
			ModalItem
		},
		computed:{
			...mapGetters({
				showAuthFlag:'showAuthFlag',
				shwoAuthType:'shwoAuthType',
				showClickFlag:'showClickFlag'
			})
		},
		methods:{
			...mapActions({
				getToUserInfo:'getToUserInfo',
				closeToAuthModal:'closeToAuthModal',
				checkToCertify:'checkToCertify'
			}),
			//筛选
			filterDataHandler(index,data,typeParam){

				if(index!=0){
					this.childFilterData[typeParam] = data.children[index][typeParam]
				}else{
					delete this.childFilterData[typeParam]
				}
				this.$emit('getFilterData',this.childFilterData)
			},
			// 艺人类型
			classifyChange(index){
				this.classifyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorClassify,'category')
			},
			// 艺人性别
			sexChange(index){
				this.sexIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorSex,'gender')
			},
			// 艺人才艺
			skillsChange(value){
				var paramsData = value
				if(paramsData.value=="" || paramsData.value == '请选择'){
					delete this.childFilterData.skills
				}else{
					this.childFilterData.skills = paramsData.value;
				}
				this.$emit('getFilterData',this.childFilterData)
			},
			//艺人年级
			ageChange(index){
				this.ageIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorAge,'age')
			},
			// 艺人价格
			priceChange(index){
				this.priceIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorPrice,'price')
			},
			//常驻城市
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
		      let addr = '';
		      if(data.province.value == '台湾省'){
		      	addr = '台湾省'
		      }else{
		      	addr = data.province.value + ',' + data.city.value + ',' + data.area.value;
		      }
		      if(data.province.code){
		      	this.childFilterData.hometown = addr
		      }else{
		      	this.childFilterData = {}
		      }
			  this.$emit('getFilterData',this.childFilterData)

		    },
			//艺人档期
			timesChange(index){
				this.timesIdx = index
				this.getDateTime(index)
				// this.filterDataHandler(index,this.reciveFilterData.actorTimes,'price')
			},
			getDateTime(idx){
				var date = new Date();
				let day = null;
				if(idx == '1'){
					day = 1;
				}else if(idx == '2'){
					day = 3;
				}else if(idx == '3'){
					day = 7
				}else if(idx == '4'){
					day == '14'
				}
				var time = date.getTime() - 1000*60*60*24*day;
				this.childFilterData.date = time+','+new Date().valueOf() ;
				this.$emit('getFilterData',this.childFilterData)
			},
			dateChange(type){

				if(type == 'start'){
					this.startFlag = true;
				}
				if(type == 'end'){
					this.endFlag = true
				}
				if(this.startFlag&&this.endFlag){
					this.childFilterData.date = new Date(this.startDate).valueOf()+','+ new Date(this.endDate).valueOf();
					this.$emit('getFilterData',this.childFilterData)
				}
			},
			//艺人实名
			certifyChange(index){
				this.certifyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorCertify,'certify')
			},
			//艺人信誉积分
			creditChange(index){
				this.creditIdx = index
				this.filterDataHandler(index,this.reciveFilterData.actorCredit,'credit')
			},
		},
		mounted(){
			this.selectData = classify.classify
			this.addressData = address.address
			this.propsFlag = true;
			this.reciveFilterData = this.filerListData;
			this.reciveOneIndex = Number(this.$route.query.oneIdx)
			this.reciveTwoIndex = Number(this.$route.query.twoIdx)

			this.closeToAuthModal();
			this.$nextTick(()=>{
				this.getToUserInfo()
			})
		},
		watch:{
			reciveFilterData(){
				this.changeFlag=!this.changeFlag
			}
		}
	}
</script>
<style lang="less">
	.date-box{
		align-items: center;
		position: relative;
		height: 30px;
		background-color: #fff;
		align-self: center;
		input{
			height: 30px;
			text-align: center;
			font-size: 14px;
			color: #546370;
			border:none;
			outline: none;
			background-color: transparent;
			position: relative;
			z-index: 11;
			padding-right: 100px;
		}
		span.actor-date-span{
			position: absolute;
		}
	}
	.condition-addr{
		position: relative;
		select{
			height: 25px!important;
			font-size: 12px;
			line-height: 25px!important;
			padding: 0 25px 0 5px!important;
			border-radius: 0px;
			width: 150px;
			border:0px solid #999;
			position: relative;
			z-index: 11;
			background: transparent!important;
			appearance:none;
		}
		&>i{
			display: block;
			position: absolute;
			width: 150px;
			height: 25px;
			background: #fff;
			top: 0;
			right: 0;
			&:nth-child(2){
				right: 67%;
			}
			&:nth-child(3){
				right: 33.5%;
			}
		}
		span{
			&:nth-child(5){
				right: 67%;
			}
			&:nth-child(6){
				right: 33.5%;
			}
		}
	}
	/*权限弹窗*/
	.auth-box{
		p{
			line-height: 25px;
			text-indent: 24px;
		}
		.auth-btns{
			text-align: center;
			padding:20px 0 0;
			button{
				padding: 5px 25px;
				color: #fff;
				border: none;
				border-radius: 3px;
				background:#ec6538;
				cursor: pointer;
				transition: 0.3s;
				&:hover{
					background:#cd562e;
				}
			}
		}
	}
</style>
