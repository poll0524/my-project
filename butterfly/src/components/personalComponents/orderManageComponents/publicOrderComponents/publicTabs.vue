<template>
	<div class="tab-container">
		<ul class="flex">
			<li v-for="(item,idx) in tabData" 
				v-if="type=='allIdx'"
				:class="[{'active':showOrderTabIdx==idx}]"
				@click="tabToChange({type,idx})">{{item}}</li>
			<li v-for="(item,idx) in tabData" 
				v-if="type=='applyIdx'"
				:class="[{'active':showApplyIdx==idx}]"
				@click="tabToChange({type,idx})">{{item}}</li>
			<li v-for="(item,idx) in tabData" 
				v-if="type=='contactIdx'"
				:class="[{'active':showContactIdx==idx}]"
				@click="tabToChange({type,idx})">{{item}}</li>
				<li v-for="(item,idx) in tabData" 
				v-if="type=='comment'"
				:class="[{'active':showCommentIdx==idx}]"
				@click="tabToChange({type,idx})">{{item}}</li>
		</ul>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'TabChange',
		props:['tabData','type'],
		data(){
			return{
			}
		},
		computed:{
			...mapGetters({
				showOrderTabIdx:'showOrderTabIdx',
				showApplyIdx:'showApplyIdx',
				showContactIdx:'showContactIdx',
				showCommentIdx:'showCommentIdx'
			})
		},
		methods:{
			...mapActions({
				tabToChange:'tabToChange'
			})
		},
		mounted(){
		},
	}
</script>

<style scoped lang="less">
	.tab-container{
		padding: 10px 0;
		ul{
			border-bottom: 1px solid #999;
			li{
				padding: 0 20px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				background: #999;
				color: #fff;
				margin-right: 5px;
				cursor: pointer;
				transition: 0.3s;
				&:hover,&.active{
					background: #ec6538;
				}
			}
		}
	}
</style>