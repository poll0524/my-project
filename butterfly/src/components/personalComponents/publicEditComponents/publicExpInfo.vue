<template>
	<div class="exp-infobox">
		<div class="exp-boxborder" v-for="(item,idx) in contentData">
			<div class="edit-btnbox">
				<span class="exp-delete" @click="deletToExpHandler({type,idx,applyType})">删除</span>
				<span class="exp-edit" @click="editToPersonalHandler({type,idx,applyType})">编辑</span>
			</div>
			<div class="exp-flexbox flex">
				<div class="flex-item flex">
					<label for="">{{contentName}}</label>
					<span>{{item.role}}</span>
				</div>
			</div>
			<div class="exp-flexbox flex">
				<div class="flex-item flex">
					<label for="">时　　间</label>
					<span>{{item.date}}</span>
				</div>
			</div>
			<div class="exp-flexbox">
				<div class="flex-item flex">
					<label for="">上传照片</label>
					<div class="info-fleximg flex">
						<div class="flex-img" v-for="(childItem,childIdx) in item.imageUrls">
							<img :src="childItem" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";



	export default{
		name:'expInfo',
		props:['contentName','contentData','type','applyType'],
		data(){
			return{
				}
		},
		methods:{
			...mapActions({
				deletToExpHandler:'deletToExpHandler',
				editToPersonalHandler:'editToPersonalHandler'
			})
		},
		mounted(){
		}

	}
</script>

<style scoped lang="less">
	.exp-boxborder{
		box-shadow: 0 0px 5px #999;
		margin-bottom: 20px;
		border-radius: 3px;
		padding: 20px;
		.exp-flexbox{
			justify-content: space-between;
			align-items: center;
			.flex-item{
				margin-bottom: 20px;
				&>span{
					flex: 1;
				}
				label{
					margin-right: 20px;
					width: 60px;
					align-self: flex-start;
					overflow: hidden;
				}
				.info-fleximg{
					flex: 1;
					justify-content: flex-start;
					flex-wrap: nowrap;
					.flex-img{
						width: 20%;
						margin-right: 1%;
						height: 200px;
						overflow: hidden;
						img{
							transition: 0.3s;
						}
						&:hover{
							img{
								transform: scale(1.1);
							}
						}
					}
				}
			}
		}
		.edit-btnbox{
			text-align: right;
			padding: 20px 0;
			color: #0018ff;
			span{
				transition: 0.3s;
				padding: 0 5px;
				cursor: pointer;
				&:hover{
					text-decoration:underline;
				}
				&.exp-delete{
					margin-right: 20px;
				}
			}
		}
	}

</style>
