<template>
	<div class="control-btn flex">
		<button @click="saveToEditHandler({type,applyType,albumArr:albumArr})">保存</button>
		<button @click="cancelToEditHandler({type,applyType})">取消</button>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'controBtn',
		props:['type','applyType','albumArr'],
		data(){
			return{

			}
		},
		methods:{
			...mapActions({
				cancelToEditHandler:'cancelToEditHandler',
				saveToEditHandler:'saveToEditHandler'
			})
		}
	}
</script>

<style scoped lang="less">
	.control-btn{
		justify-content: center;
		align-items: center;
		button{
			width: 100px;
			height: 30px;
			border-radius: 3px;
			color:#fff;
			border: none;
			transition: 0.3s;
			cursor: pointer;
			&:first-child{
				background:#ec6538;
				margin-right: 10px;
				&:hover{
					background:#cd562e;
				}
			}
			&:last-child{
				background: #999;
				&:hover{
					background:#848383;
				}
			}
		}
	}
</style>