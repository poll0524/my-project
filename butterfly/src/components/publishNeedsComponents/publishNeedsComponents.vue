<template>
	<div class="publish-container center-calc">
		<div class="box-maxWidth">
			<HeadItem :formHeadData="showFormHeadData"/>
			<BodyItem :showFormDataList="showFormDataList"/>
			<div class="publish-submit flex">
				<button @click="publisherHandler">发布需求</button>
			</div>
		</div>
		<ModalItem
			v-if="showNeedsModalFlag"
			:showModal="showNeedsModalFlag"
			@changheHintBoxShow="needsToModalHandler"
		>
			<div class="needs-modal-content" slot="body">
				<div v-if="showNeedsContentType=='addrType'">请选择正确的地址</div>
				<div v-if="showNeedsContentType=='rightNumber'">请输入大于0的整数</div>
				<div v-if="showNeedsContentType=='dateType'">截止日期应该在演出日期之前</div>
				<div v-if="showNeedsContentType=='budgetType'">预算至少大于50的整数</div>
				<div v-if="showNeedsContentType=='maxLimit'">需求量应该小于最大限制数量</div>
				<div v-if="showNeedsContentType=='content'">请确定输入的内容是否完整</div>
				<div v-if="showNeedsContentType=='success'">您的需求发布已提交成功，工作人员将尽快审核，请耐心等待！</div>
			</div>
			<div
			v-if="showNeedsContentType=='success'"
			slot="footer"
			class="publish-submit flex"
			@click="needsToModalHandler">
				<router-link to="/NeedsOrder" tag="button">确定</router-link>
			</div>
		</ModalItem>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import {regEX} from '../../assets/js/public.js'
	import HeadItem from './publishNeedsHead'
	import BodyItem from './publishNeedsBody'

	import ModalItem from '../publicModalComponents/publicModal'

	export default{
		name:'pulishNeeds',
		data(){
			return{
			}
		},
		components:{
			HeadItem,
			BodyItem,
			ModalItem
		},
		computed:{
			...mapGetters({
				showNeedsModalFlag:'showNeedsModalFlag',
				showNeedsContentType:'showNeedsContentType',
				showFormDataList:'showFormDataList',
				showFormHeadData:'showFormHeadData'
			})
		},
		methods:{
			...mapActions({
				publishToNeeds:'publishToNeeds',
				needsToModalHandler:'needsToModalHandler',
				getToDraftHandler:'getToDraftHandler',
				getToCurrentUserInfo:'getToCurrentUserInfo'
			}),
			publisherHandler(){
				this.publishToNeeds()
			}
		},
		mounted(){

			if(this.$route.query.type){
				this.getToDraftHandler()
			};
			this.$nextTick(()=>{
				this.getToCurrentUserInfo();
			})
		}
	}
</script>
<style lang="less">
	.publish-container{
		padding: 100px 0 100px;
		font-size: 16px;
		.pulish-title{
			font-size: 24px;
			font-weight: 700;
			padding:20px 0;
			span{
				display: inline-block;
				border-bottom: 2px solid #546370;
			}
		}
		textarea,input,select{
			border:1px solid #999 !important;
			border-radius: 3px;
			font-size: 14px;
			color: #546370;
			height: 40px;
		}
		input{
			width: 400px;
			padding-left: 10px;
		}
		textarea{
			resize: none;
			width: 400px;
			height: 150px;
			padding:10px;
		}
		label{
			width: 130px;
			text-align: right;
			margin-right: 40px;
			span{
				color: #ec6538;
				margin-right: 5px;
			}
		}
		select{
			height: 40px !important;
			padding-right: 40px!important;
		}
		.warnBorder{
			border:1px solid red !important;
		}
		.inp-arrow{
			height: 100%;
			width: 40px;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
		.publish-head,.publish-body{
			flex-direction: column;
			align-items: center;
		}
		.publish-head{
			.pulish-inpbox{
				.flex{
					align-items: center;
					margin-bottom: 20px;
					position: relative;
				}
				.pulish-inp{
					position: relative;
					width: 600px;
				}
				.publish-date{
					input{
						width: 200px;
						position: relative;
						z-index: 1;
						background: transparent;
					}
					.inp-arrow{
						left: 160px;
						right: auto;
					}
				}
				.publish-addr,.publish-desc{
					align-items: flex-start;
				}
				.publish-addr{
					label{
						margin-top: 10px;
					}
					.pulish-inp-addr{
						position: relative;
						margin-bottom: 10px;
						select{
							width: 195px;
							position: relative;
							z-index: 1;
							background: transparent;
							appearance:none;
						}
						span.inp-arrow{
							&:nth-child(2){
								right: 67.6%;
							}
							&:nth-child(3){
								right: 34.4%;
							}
							&:nth-child(4){
								right: 1%;
							}
						}
					}
				}
				.pulish-addinfo{
					position: relative;
					span{
						position: absolute;
						right: 205px;
						bottom: 5px;
					}
				}
			}
		}
		/*需求详情*/
		.publish-addTab{
			border-bottom: 1px solid #999;
			width: 100%;
			ul{
				li{
					width: 150px;
					height: 40px;
					line-height: 40px;
					position: relative;
					text-align: center;
					color: #fff;
					background: #999;
					margin-right: 5px;
					.close-tab{
						position: absolute;
						display: block;
						top: 0;
						right: 0;
						width: 20px;
						height: 20px;
						cursor: pointer;
						line-height: 20px;
						opacity: 0.7;
						&:hover{
							opacity:1;
						}
					}
					&:first-child{
						span{
							display: none;
						}
					}
					&.active{
						background: #ec6538;
					}
				}
			}
			.add-btn{
				width: 40px;
				height: 40px;
				font-size: 30px;
				font-weight: 700;
				background: #ec6538;
				color: #fff;
				text-align: center;
				cursor: pointer;
				transition: 0.3s;
				&:hover{
					background:#cd562e;
				}
			}
		}
		.publish-needsinfo{
			padding:20px 0;
			.publish-needsinfo-box{
				&>.flex{
					margin-bottom: 30px;
					align-items: center;
					&.publish-supplyInfo{
						label{
							align-self: flex-start;
						}
					}
					input[type=radio]{
						width: 20px;
						height: 20px;
						vertical-align: bottom;
						margin-right:4px;
					}
					.publish-budget,.publish-maxLimit{
						input{
							width: 150px;
							text-align: center;
						}
					}
					.publish-deadLine{
						position: relative;
						input{
							width: 200px;
							z-index: 11;
							position: relative;
							background: transparent;
						}
					}
				}
			}
		}
		/*发布按钮*/
		.publish-submit{
			justify-content: center;
			align-items: center;
			padding:20px 0;
			button{
				width: 150px;
				height: 40px;
				color: #fff;
				background: #ec6538;
				border-radius: 3px;
				cursor: pointer;
				border:none;
				transition: 0.3s;
				outline: none;
				&:hover{
					background:#cd562e;
				}
			}
		}
	}
</style>
