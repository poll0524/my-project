<template>
	<div class="edit-member-box">
		<div class="edit-member-content" v-for="(item,idx) in showMemberInfoData">
			<div class="edit-btnbox">
				<span class="exp-delete" @click="deletToMember(idx)">删除</span>
				<span class="exp-edit" @click="editToMember(idx)">编辑</span>
			</div>
			<div class="edit-member-info" v-if="showToEditBox!=idx">
				<div class="flex-box flex">
					<label for="">成员姓名</label>
					<div class="flex-text">范冰冰</div>
				</div>
				<div class="flex-box flex">
					<label for="">才　　艺</label>
					<div class="flex-text">街舞、巴蜀笑星、模特秀、民族舞、机械舞、爵士舞</div>
				</div>
				<div class="flex-box flex">
					<label for="">成员职务</label>
					<div class="flex-text">范冰冰</div>
				</div>
				<div class="flex-box flex">
					<label for="">性　　别</label>
					<div class="flex-text">女</div>
				</div>
				<div class="flex-box flex">
					<label for="">出生年月</label>
					<div class="flex-text">1992.07.21</div>
				</div>
			</div>
			<div class="edit-inpbox" v-if="showToEditBox==idx">
				<slot></slot>
				<ControlBtn v-if="showToEditBox==idx" type="memberInfo"/>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";

	import ControlBtn from '../publicEditComponents/publicControBtns'

	export default{
		name:'expInfo',
		props:['contentName','contentData','type'],
		data(){
			return{
				
			}
		},
		components:{
			ControlBtn
		},
		computed:{
			...mapGetters({
				showMemberInfoData:'showMemberInfoData',
				showToEditBox:'showToEditBox'
			})
		},
		methods:{
			...mapActions({
				deletToMember:'deletToMember',
				editToMember:'editToMember',
			})
		},
		
	}
</script>

<style lang="less">
	.edit-member-box{
		.edit-member-content{
			box-shadow: 0 0 3px #999;
			padding:0 40px 20px;
			margin-bottom: 20px;
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
		.flex-box{
			margin-bottom: 20px;
			align-items: center;
			label{
				margin-right: 20px;
			}
			.flex-text{
				flex:1;
			}
		}
		.edit-inpbox{
			padding-bottom: 20px;
		}
	}
</style>