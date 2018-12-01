<template>
	<div class="filter-nav">
		<ul class="flex filter-navBox">
			<li
			:class="[activeIndex==index?'active':'']"
			v-for="(item,index) in navData"
			:data-id="item.id"
			@click="chooseNavtap(item)">{{item.text}}</li>
		</ul>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";

	export default {
		name:'filterNav',
		props:{
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
				activeIndex:null,
				sortDesc:false
			}
		},
		methods:{
			...mapActions({
				currentToPageHandler:'currentToPageHandler'
			}),
			chooseNavtap(item){
				this.sortDesc = !this.sortDesc;
				let sortDirection = this.sortDesc?'ASC':'DESC';
				if(this.activeIndex != item.id){
					this.activeIndex = item.id;
				}else{
					this.activeIndex=null
				}
				this.currentToPageHandler({type:this.kindsType,status:item.status,sortDirection:sortDirection,id:0,value:this.filterData})
			}
		}

	}
</script>

<style scoped lang="less">
	.filter-nav{
		height: 30px;
		background: #191b2e;
		line-height: 30px;
		margin: 10px 0;
		color: #fff;
		.filter-navBox{
			justify-content: space-around;
			li{
				cursor: pointer;
				position: relative;
				padding: 0 10px;
				&::after{
					display:block;
					content: '';
					width: 5px;
					height: 5px;
					border-right: 2px solid #fff;
					border-bottom: 2px solid #fff;
					transform: rotate(45deg);
					position: absolute;
					top:10px;
					right:0;
				}
				&.active::after{
					transform: rotate(225deg);
				}
			}
		}
	}
</style>
