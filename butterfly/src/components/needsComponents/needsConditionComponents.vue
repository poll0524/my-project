<template>
	<div class="condition-container">
		<div class="condition-header flex">
			<SearchItem/>
		</div>
		<div class="condition-filter-box" v-if="changeFlag">
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
			<!-- 预算 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.needsPrice"
			:activeIndex="moneyIdx"
			@fileterElemChange="moneyChange"/>
			<!-- 演出时间 -->
			<div class="flex">
				<FilterElem
				v-if="propsFlag"
				:fileterElemData="reciveFilterData.needsTimes"
				:activeIndex="timesIdx"
				@fileterElemChange="timesChange"/>
				<div class="date-box needs-date-box flex">
					<span class="date-span needs-date-span">开始日期</span>
					<Datepicker :language="languages.zh" :disabledDates="disabledDates" v-model="startDate" format="yyyy-MM-dd" @selected="dateChange('start')"/>
					<span class="date-span needs-date-span">结束日期</span>
					<Datepicker :language="languages.zh" v-model="endDate" format="yyyy-MM-dd" @selected="dateChange('end')"/>
				</div>
			</div>
			<!-- 需求认证 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.needsCertify"
			:activeIndex="certifyIdx"
			@fileterElemChange="certifyChange"/>
			<!-- 平台信誉分 -->
			<FilterElem
			v-if="propsFlag"
			:fileterElemData="reciveFilterData.needsCredit"
			:activeIndex="creditIdx"
			@fileterElemChange="creditChange"/>



		</div>
	</div>
</template>
<script>
	import SearchItem from '../searchBoxComponents/searchBox'
	import LinkageItem from '../linkageComponents/linkageComponents'
	import FilterElem from '../filterComponents/filterElemComponents'

	import classify from '../../assets/js/classify.js'
	import address from '../../assets/js/address.js'

	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";

	export default{
		name:'needsCondi',
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
				moneyIdx:0,
				timesIdx:0,
				cityIdx:0,
				certifyIdx:0,
				creditIdx:0,
				childFilterData:{},
				startDate:new Date(),
				endDate:new Date(),
				startFlag:true,
				endFlag:false,
				languages: lang,
				disabledDates:{
					ranges: [{
				      from: new Date(2017, 11, 25),
				      to: new Date(2017, 11, 30)
				    }, {
				      from: new Date(2018, 1, 12),
				      to: new Date(2018, 2, 25)
				    }]
				}

			}
		},
		components:{
			SearchItem,
			LinkageItem,
			FilterElem,
			Datepicker
		},
		methods:{
			//筛选
			filterDataHandler(index,data,typeParam){
				if(index!=0){
					this.childFilterData[typeParam] = data.children[index][typeParam]
				}else{
					delete this.childFilterData[typeParam]
				}
				this.$emit('getFilterData',this.childFilterData)
			},
			// 演出时间
			timesChange(index){
				this.timesIdx = index
				this.getDateTime(index)
				// this.filterDataHandler(index,this.reciveFilterData.companyClassify,'type')
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
				if(idx !=0){
					this.childFilterData.date = time+','+new Date().valueOf();
				}else{
					this.childFilterData = {}
				}
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
			//预算
			moneyChange(index){
				this.moneyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.needsPrice,'budget')
			},
			//常驻城市
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
		      // let addr = data.province.value+','+data.city.value+','+data.area.value
		      let addr = '';
		      if(data.province.value == '台湾省'){
		      	addr = '台湾省'
		      }else{
		      	addr = data.province.value + ',' + data.city.value + ',' + data.area.value;
		      }
		      if(data.province.code){
		      	this.childFilterData.location = addr
		      }else{
		      	this.childFilterData = {}
		      }
			  this.$emit('getFilterData',this.childFilterData)
		    },
			//公司认证
			certifyChange(index){
				this.certifyIdx = index
				this.filterDataHandler(index,this.reciveFilterData.needsCertify,'certify')
			},
			//信誉积分
			creditChange(index){
				this.creditIdx = index
				this.filterDataHandler(index,this.reciveFilterData.needsCredit,'credit')
			},

		},
		mounted(){
			this.selectData = classify.classify
			this.addressData = address.address
			this.propsFlag = true;
			this.reciveFilterData = this.filerListData;
		},
		watch:{
			reciveFilterData(){
				this.changeFlag=!this.changeFlag
			}
		}
	}
</script>
<style lang="less">
	.needs-date-box{
		align-items: center;
		position: relative;
		align-self: center;
		background: transparent;
		.vdp-datepicker{
			background: #fff;
		}
		input{
			height: 30px;
			outline: none;
			border:none;
			text-align: center;
			font-size: 14px;
			color: #546370;
			padding-right: 0 !important;
		}
		span.date-span{
			position: static;
		}
	}
		.condition-addr{
			position: relative;
			select{
				height: 25px!important;
				font-size: 12px;
				line-height: 25px!important;
				padding: 0 25px 0 0!important;
				border-radius: 0px;
				width: 150px;
				border:1px solid #999;
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
