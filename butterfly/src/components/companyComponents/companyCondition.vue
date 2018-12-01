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
			<!-- 公司属性 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.companyClassify"
			:activeIndex="classifyIdx"
			@fileterElemChange="classifyChange"/>
			<!-- 公司类型 -->
			<div class="condition-list flex">
				<div class="condition-list-name">
					公司类型
				</div>
				<div class="condition-list-select">
					<LinkageItem
					:selectData="companyData"
					:linkAgeIdx="typeIdx"
					type="company"
					v-if="propsFlag"
					:reciveOneIndex="reciveOneIndex"
					:reciveTwoIndex="reciveTwoIndex"
					@parentChange="companyChange"/>
				</div>
			</div>
			<!-- 公司年限 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.companyAge"
			:activeIndex="ageIdx"
			@fileterElemChange="ageChange"/>
			<!-- 公司人数 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.companyPerson"
			:activeIndex="personIdx"
			@fileterElemChange="personChange"/>
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
			<!-- 艺人认证 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.companyCertify"
			:activeIndex="certifyIdx"
			@fileterElemChange="certifyChange"/>
			<!-- 平台信誉分 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.companyCredit"
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
	import companyClassify from '../../assets/js/companyClassify.js'
	import address from '../../assets/js/address.js'

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
				companyData:[],
				propsFlag:false,
				reciveFilterData:{},
				changeFlag:false,
				classifyIdx:0,
				ageIdx:0,
				personIdx:0,
				cityIdx:0,
				certifyIdx:0,
				creditIdx:0,
				typeIdx:0,
				childFilterData:{},
				reciveOneIndex:0,
				reciveTwoIndex:0

			}
		},
		components:{
			SearchItem,
			LinkageItem,
			FilterElem,
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
			// 公司属性
			classifyChange(index){
				this.classifyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.companyClassify,'type')
			},
			//公司类型
			companyChange(value){
				var paramsData = value
				if(paramsData.value=="" || paramsData.value == '请选择'){
					delete this.childFilterData.type
				}else{
					this.childFilterData.type = paramsData.value;
				}
				this.$emit('getFilterData',this.childFilterData)
			},
			// 公司年限
			ageChange(index){
				this.ageIdx = index
				this.filterDataHandler(index,this.reciveFilterData.companyAge,'life')
			},
			//公司人数
			personChange(index){
				this.personIdx = index
				this.filterDataHandler(index,this.reciveFilterData.companyPerson,'number')
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
			//公司认证
			certifyChange(index){
				this.certifyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.companyCertify,'certify')
			},
			//信誉积分
			creditChange(index){
				this.creditIdx = index
				this.filterDataHandler(index,this.reciveFilterData.companyCredit,'credit')
			},
		},
		mounted(){
			this.selectData = classify.classify
			this.addressData = address.address
			this.companyData = companyClassify.classify
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
</style>
