<template>
	<div class="publish-head flex">
		<div class="pulish-title">
			<span>演出简介</span>
		</div>
		<div class="pulish-inpbox publish-head-inpbox">
			<div class="flex publish-name">
				<label for=""><span>*</span>演出名称</label>
				<div class="pulish-inp">
					<input type="text" maxlength="50" v-model="formHeadData.title" placeholder="请输入演出名称">
				</div>
			</div>
			<div class="flex publish-desc">
				<label for=""><span>*</span>演出简介</label>
				<div class="pulish-inp text-control">
					<textarea v-model="formHeadData.introduce" maxlength="250"  placeholder="请输入演出简介"></textarea>
					<span>{{formHeadData.introduce.length}}/250</span>
				</div>
			</div>
			<div class="flex publish-date">
				<label for=""><span>*</span>演出时间</label>
				<div class="pulish-inp">
					<Datepicker :language="languages.zh" v-model="formHeadData.date" :disabledDates="disabledDates" format="yyyy-MM-dd"/>
					<span class="inp-arrow"></span>
				</div>
			</div>
			<div class="flex publish-addr">
				<label for=""><span>*</span>演出地点</label>
				<div class="pulish-inp">
					<div class="pulish-inp-addr">
						<v-distpicker @selected="onSelected"></v-distpicker>
						<span class="color-arrow inp-arrow"></span>
						<span class="color-arrow inp-arrow"></span>
						<span class="color-arrow inp-arrow"></span>
					</div>
					<div class="pulish-addinfo">
						<textarea 
						v-model="formHeadData.addressInfo"  
						placeholder="请输入详细地址"
						maxlength="250"></textarea>
						<span>{{formHeadData.addressInfo.length}}/250</span>
					</div>
				</div>
			</div>
			<div class="flex publish-lineup">
				<label for=""><span>*</span>演出阵容</label>
				<div class="pulish-inp">
					<input type="text" v-model="formHeadData.lineup" placeholder="请输入演出阵容">
				</div>
			</div>
			<div class="flex publish-phone">
				<label for=""><span>*</span>联系方式</label>
				<div class="pulish-inp">
					<input type="text" 
					v-model="formHeadData.phone" 
					placeholder="请输入手机号码"
					:class="[showWarn?'warnBorder':'']"
					readonly 
					@change="checkPhone">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";
	import address from '../../assets/js/address.js'

	import LinkageItem from '../linkageComponents/linkageComponents'

	import {regEX} from '../../assets/js/public.js'

	export default{
		name:'pulishHead',
		props:['formHeadData'],
		data(){
			return{
				addressData:[],
				cityIdx:0,
				propsFlag:false,
				languages: lang,
				addinfoLength:0,
				showWarn:false,
				disabledDates:{
					to: new Date(),
					// from: new Date()
				},
			}
		},
		components:{
			Datepicker,
			LinkageItem
		},
		computed:{
			/*formHeadData(){
				return this.$store.getters.showFormHeadData
			}*/
		},
		methods:{
			...mapActions({
				addressToChange:'addressToChange'
			}),
			checkPhone(){
				if(!regEX(this.formHeadData.phone).checkPhone){
					this.showWarn = !this.showWarn
				}
			},
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
		      let addr = data.province.value+','+ data.city.value+','+ data.area.value
		      this.addressToChange({type:'needs',addr})
		    },
		},
		mounted(){
			this.addressData = address.address;
			this.propsFlag = true
		}
	}
</script>
<style lang="less">
	.publish-head{
		.text-control span{
			right: 210px;
    		bottom: 10px;
		}
	}
</style>