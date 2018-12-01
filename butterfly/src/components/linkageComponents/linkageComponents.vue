<template>
	<!-- 选择框联动 -->
	<div class="select-container flex" v-if="showOption">
		<div class="select-one" v-if="reciveSelectData.length>0">
			<select name="" id="" v-model="selectOneIndex" @change="selectChange">
				<option :value="index" v-for="(item,index) in reciveSelectData">{{item.name}}</option>
			</select>
			<span class="inp-arrow"></span>
		</div>
		<div class="select-two" v-if="reciveSelectData[selectOneIndex].childCity&&reciveSelectData[selectOneIndex].childCity.length>1">
			<select name="" id="" v-model="selectTwoIndex" @change="twoSelectChange">
				<option :value="index" v-for="(item,index) in reciveSelectData[selectOneIndex].childCity">{{item.value}}</option>
			</select>
			<span class="inp-arrow"></span>
		</div>
		<!-- <div class="select-two" v-if="reciveSelectData[selectOneIndex].childCity.length>0&&reciveSelectData[selectOneIndex].childCity[selectTwoIndex].childCity&&reciveSelectData[selectOneIndex].childCity[selectTwoIndex].childCity.length>0">
			<select name="" id="" v-model="selectThreeIndex" @change="threeSelectChange">
				<option :value="index" v-for="(item,index) in reciveSelectData[selectOneIndex].childCity[selectTwoIndex].childCity">{{item.value}}</option>
			</select>
			<span class="inp-arrow"></span>
		</div> -->
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		name:'selectBox',
		props:{
			'selectData':{
				type:Array
			},
			'linkAgeIdx':{
				type:Number
			},
			'type':{
				type:String
			},
			'parentChange':{
				type:Function
			},
			'reciveOneIndex':{
				type:Number,
				default:0
			},
			'reciveTwoIndex':{
				type:Number,
				default:0
			},
			'reciveThreeIndex':{
				type:Number
			}
		},
		data(){
			return{
				reciveSelectData:[],
				selectOneIndex:0,
				selectTwoIndex:0,
				selectThreeIndex:0,
				showOption:false,
				roleType:'',
			}
		},
		methods:{
			...mapActions({
				reciveToKindsHandler:'reciveToKindsHandler'
			}),
			selectChange(){
				if(this.roleType=='classify' || this.roleType=='company'){
					var value='';
					this.selectTwoIndex=0;
					if(this.reciveSelectData[this.selectOneIndex].childCity.length>0){
						value = this.reciveSelectData[this.selectOneIndex].childCity[this.selectTwoIndex].value
					}
					this.$emit('parentChange',{type:this.roleType,value:value})
				}
			},
			twoSelectChange(){
				if(this.roleType=='classify' || this.roleType=='company'){
					var value = this.reciveSelectData[this.selectOneIndex].childCity[this.selectTwoIndex].value
					this.$emit('parentChange',{type:this.roleType,value:value})
				}
			},
		},
		mounted(){
			let kinds = '';
			this.reciveSelectData = this.selectData;
			this.showOption = true;
			this.roleType = this.type;
			if(this.reciveOneIndex){
				this.selectOneIndex=this.reciveOneIndex
			}
			if(this.reciveTwoIndex){
				this.selectTwoIndex = this.reciveTwoIndex
				kinds = this.reciveSelectData[this.reciveOneIndex].childCity[this.reciveTwoIndex];
				if(this.roleType == 'classify'){
					this.reciveToKindsHandler({skills:kinds.value})
				}else if(this.roleType == 'company'){
					this.reciveToKindsHandler({skills:kinds.value})
				}
			}
			if(JSON.stringify(this.$route.query)=='{}'){
				this.reciveToKindsHandler()
			}
		},
		watch:{

			reciveOneIndex(){
				this.selectOneIndex=this.reciveOneIndex
			},
			reciveTwoIndex(){
				this.selectTwoIndex=this.reciveTwoIndex
			}
		}
	}
</script>

<style lang="less">
	.select-container{
		&>div{
			margin-right: 10px;
			position: relative;
			background: #fff;
		}
		select{
			position: relative;
			height: 25px;
			appearance:none;
			color: #546370;
			padding: 0 30px 0 5px;
			background: transparent;
			z-index: 1;
			border:none;
			outline: none;
			min-width: 100px;
		}
	}
</style>
