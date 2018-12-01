<template>
	<div class="condition-list flex">
		<div class="condition-list-name">
			{{fileterElemData.name}}
		</div>
		<ul class="flex">
			<li :class="[activeIndex==index?'active':'']" 
			v-for="(item,index) in fileterElemData.children"
			@click="childFilterElemChange(index)">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'fileterElem',
		props:['fileterElemData','fileterElemChange','activeIndex'],
		data(){
			return{

			}
		},
		methods:{
			childFilterElemChange(index){
				this.$emit('fileterElemChange',index)
			}
		}
	}
</script>

<style scoped lang="less">
	.condition-list{
		padding: 5px 0;
		align-items: center;
		.condition-list-name{
			font-size: 16px;
			color: #fff;
			padding-right: 30px;
			align-self: flex-start;
			white-space: nowrap;
		}
		&:last-child .condition-list-name{
			padding-right:14px;
		}
		& ul{
			align-items: center;
			flex-wrap: wrap;
			li{
				padding: 0 5px;
				cursor: pointer;
				transition: 0.3s;
				border:1px solid transparent;
				line-height: 25px;
				margin-right: 10px;
				margin-bottom: 5px;
			}
			li.active,
			li:hover{
				color: #fff;
				border:1px solid #ec6538;
			}
		}
	}
</style>