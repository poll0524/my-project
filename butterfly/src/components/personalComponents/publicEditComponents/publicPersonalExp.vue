<template>
	<div class="personal-edit-exp">
		<div class="info-head flex">
			<span class="name">{{headName}}</span>
			<span class="edit" @click="addExpToHandler({expType,applyType,addType:'addexp'})">新增</span>
		</div>
		<div class="edit-exp-content">
			<ExpInfo 
			:contentName="contentName"
			:contentData="contentData"
			:type="expType"
			:applyType="applyType"
			/>
			<ModalItem
				v-if="showToExpModal"
				:showModal="showToExpModal"
				@changheHintBoxShow="cancelToEditHandler({applyType})">
				<div slot="body">
					<OneExpItem
					:labelTxt="showToData.txt"
					:showToData="showToData"
					:roleType="showToData.type"
					:applyType="applyType"/>
				</div>
				<div slot="footer">
					<ControlBtn v-if="showToExpModal" :type="showToData.type" :applyType="applyType"/>
				</div>
			</ModalItem>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import ExpInfo from './publicExpInfo'
	import OneExpItem from '../publicApplyComponents/addOneExpComponents'
	import ModalItem from '../../publicModalComponents/publicModal'
	import ControlBtn from './publicControBtns'

	export default{
		name:'publicExp',
		props:['headName','contentName','contentData','expType','applyType'],
		data(){
			return{
				labelTxt:null
			}
		},
		components:{
			ExpInfo,
			OneExpItem,
			ModalItem,
			ControlBtn
		},
		computed:{
			...mapGetters({
				showToData:'showToData',
				showToExpModal:'showToExpModal'
			})
		},
		methods:{
			...mapActions({
				cancelToEditHandler:'cancelToEditHandler',
				addExpToHandler:'addExpToHandler'
			}),
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.personal-edit-exp{
		padding: 20px 0;
		border-bottom: 2px dashed #999;
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
		.edit-exp-content{
			padding: 0 20px;
			.modal-container{
				max-width: 800px;
				.delete-icon{
					display: none;
				}
				.del-img{
					color:#999;
				}
				.vdp-datepicker{
					input{
						color:#fff;
					}
				}
			}
		}
	}
</style>