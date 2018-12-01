<template>
	<div class="condition-content">
		<FilterNav 
		:navData="navData"
		:filterData="filterData"
		:kindsType="kindsType"/>
		<FilterImg
		:filterImgData="filterImgData"
		:kindsType="kindsType"/>
		<PageItem :kindsType="kindsType" :filterData="filterData"/>
	</div>
</template>
<script>
	import PageItem from '../paginations/pagination'
	import FilterNav from './filterNavComponents'
	import FilterImg from './filterImgTextComponent'
	export default{
		name:'condiContent',
		props:{
			"filterImgData":{
				type:Array
			},
			'navData':{
				type:Array
			},
			'kindsType':{
				type:String
			},
			'filterData':{
				type:Object
			}
		},
		data(){
			return{
				
			}
		},
		components:{
			PageItem,
			FilterNav,
			FilterImg
		}
	}
</script>
<style scoped lang="less">
	.condition-content{
		position: relative;
		padding: 10px 0 50px;
		min-height: 20vh;
		background: #fafafa;
	}
</style>