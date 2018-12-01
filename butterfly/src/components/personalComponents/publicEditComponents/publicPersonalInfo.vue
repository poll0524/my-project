<template>
	<div class="personal-infomation">
		<div class="info-head flex">
			<span class="name">{{headName}}</span>
			<span class="edit" @click="editToPersonalHandler(blockType)">编辑</span>
		</div>
		<div class="personal-infobox">
			<slot name='content'></slot>
		</div>
	</div>
</template>
 
 <script>

 	import {mapGetters,mapActions} from "vuex";

 	export default{
 		name:'personalInfo',
 		props:{
 			'headName':{
 				type:String
 			},
 			'blockType':{
 				type:String
 			}
 		},
 		data(){
 			return{

 			}
 		},
 		methods:{
			...mapActions({
				editToPersonalHandler:'editToPersonalHandler'
			})
		}
 	}
 </script>

 <style lang="less">
	.personal-infomation{
		.info-head{
			justify-content: space-between;
			padding:0 20px 20px;
			color: #ec6538;
			font-weight: 700;
			.edit{
				font-weight: normal;
				color: #0018ff;
				cursor: pointer;
				&:hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>