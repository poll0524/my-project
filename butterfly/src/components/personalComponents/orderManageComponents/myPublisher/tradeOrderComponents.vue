<template>
	<div class="needs-trade-container">
		<TitleItem titleName="交易订单"/>
		<div class="trade-content">
			<TradeHead :tradeHead="tradeHead"/>
			<tableItem
			v-if="tradeDataFlag"
			:tradeData="showTradeData"/>
			<pageItem kindsType="tradeOrder"/>
		</div>
		<ModalItem
		v-if="showToModal"
		:showModal="showToModal"
		@changheHintBoxShow="closeToCommentsHandler">
			<CommentInp/>
		</ModalItem>
		<ModalItem
			v-if="showTradeModalFlag"
			:showModal="showTradeModalFlag"
			@changheHintBoxShow="closeToTradeModal">
			<div slot="body">
				<!-- 支付方式 -->
				<div class="pay-box flex" v-if="showTradeModalType=='pay'">
					<div class="pay-kinds flex">
						<div :class="['pay-item',{active:payKindsData=10}]"><input value="10" v-model="payKindsData" type="radio" name="pay"></div>
						<div class="pay-item"><!-- <input value="" v-model="payKindsData" type="radio" name="pay"> --></div>
					</div>
					<div class="pay-btns trade-modal-btn">
						<button @click="goToPayHandler">去支付</button>
						<button @click="closeToTradeModal">取消</button>
					</div>
				</div>
				<div class="gopay-box" v-if="showTradeModalType=='goPay'">
					<p>支付完成前，请不要关闭支付验证窗口</p>
					<p>支付完成后，请根据您支付的情况点击下面按钮</p>
					<div class="pay-btns trade-modal-btn">
						<router-link to="/OrderRecord" tag="button">支付遇到问题</router-link>
						<router-link to="/OrderRecord" tag="button">支付完成</router-link>
					</div>
				</div>
				<div class="suer-coop" v-if="showTradeModalType=='suerCoop'">
					<p>是否确定合作完成，点击“确定”后劳务资金将划入对方账户</p>
					<div class="pay-btns trade-modal-btn">
						<button @click="suerToCooper">确定</button>
						<button @click="closeToTradeModal">取消</button>
					</div>
				</div>
				<div class="suer-coop" v-if="showTradeModalType=='cancelcooperate'">
					<p>如果您取消合作,将会对双方造成损失，并且托管资金的20%将会作为合作方损失补偿扣除，请谨慎操作！</p>
					<div class="pay-btns trade-modal-btn">
						<button @click="suerToCooper">执意取消</button>
						<button @click="closeToTradeModal">返回</button>
					</div>
				</div>
			</div>
		</ModalItem>
		<div class="trade-tips-modal">
			<ModalItem
			    v-if='showInviteChatFlag'
			    :showModal='showInviteChatFlag'>
			    <div slot="body" v-if="showTradeModalType=='suerCoop'">
					<i></i>合作完成
			    </div>
			    <div slot="body" v-if="showTradeModalType=='cancelcooperate'">
					<i></i>取消成功
			    </div>
			</ModalItem>
		</div>
		<div class="trade-tips-modal">
			<ModalItem
		      v-if="showCommentFlag"
		      :showModal="showCommentFlag">
		        <div slot="body"  class="flex-tips flex">
		          <div class="recive-tips"><i></i>评价成功</div>
		        </div>
		    </ModalItem>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleItem from '../../titleNameComponents'
	import tableItem from './tradeTable'
	import TradeHead from '../publicOrderComponents/publicTradeHead'
	import ModalItem from '../../../publicModalComponents/publicModal'
	import pageItem from '../../../paginations/pagination'

	import CommentInp from '../../commentsInp'

	export default{
		name:'tradeOrder',
		data(){
			return{
				tradeHead:['演出名称','需求类型','合作方','合作价格','服务佣金','订单状态','操作'],
				tradeData:[
					{
						orderNum:'155556656564654564',
						orderDate:'2018.05.13',
						orderTime:'13:30:30',
						orderName:'周杰伦来成都开演唱会了',
						orderType:'晚会主持',
						cooperName:'测试账号5555',
						cooperPrice:'5200',
						serviceMoney:'5200',
						orderState:'等待支付',
						orderControl:'支付',
						orderControlType:'pay'
					},
					{
						orderNum:'155556656564654564',
						orderDate:'2018.05.13',
						orderTime:'13:30:30',
						orderName:'周杰伦来成都开演唱会了',
						orderType:'晚会主持',
						cooperName:'测试账号5555',
						cooperPrice:'5200',
						serviceMoney:'5200',
						orderState:'等待支付',
						orderControlType:'cooper'
					},
					{
						orderNum:'155556656564654564',
						orderDate:'2018.05.13',
						orderTime:'13:30:30',
						orderName:'周杰伦来成都开演唱会了',
						orderType:'晚会主持',
						cooperName:'测试账号5555',
						cooperPrice:'5200',
						serviceMoney:'5200',
						orderState:'等待支付',
						orderControlType:'comment'
					},
					{
						orderNum:'155556656564654564',
						orderDate:'2018.05.13',
						orderTime:'13:30:30',
						orderName:'周杰伦来成都开演唱会了',
						orderType:'晚会主持',
						cooperName:'测试账号5555',
						cooperPrice:'5200',
						serviceMoney:'5200',
						orderState:'等待支付',
						orderControlType:'cancelCoo'
					},
					{
						orderNum:'155556656564654564',
						orderDate:'2018.05.13',
						orderTime:'13:30:30',
						orderName:'周杰伦来成都开演唱会了',
						orderType:'晚会主持',
						cooperName:'测试账号5555',
						cooperPrice:'5200',
						serviceMoney:'5200',
						orderState:'等待支付',
						orderControlType:'replace'
					},
				],
				tradeDataFlag:false,
				payKindsData:'10'
			}
		},
		components:{
			TitleItem,
			tableItem,
			TradeHead,
			ModalItem,
			CommentInp,
			pageItem
		},
		computed:{
			...mapGetters({
				showToModal:'showToModal',
				showTradeData:'showTradeData',
				showTradeModalFlag:'showTradeModalFlag',
				showInviteChatFlag:'showInviteChatFlag',
				showTradeModalType:'showTradeModalType',
				showCommentFlag:'showCommentFlag'
			})
		},
		methods:{
			...mapActions({
				closeToCommentsHandler:'closeToCommentsHandler',
				getToTradeHandler:'getToTradeHandler',
				goToPayHandler:'goToPayHandler',
				closeToTradeModal:'closeToTradeModal',
				suerToCooper:'suerToCooper',
				cancelToCooper:'cancelToCooper'
			})
		},
		mounted(){
			this.closeToCommentsHandler();
			this.closeToTradeModal();
			this.$nextTick(()=>{
				this.getToTradeHandler();
				this.tradeDataFlag = true;
			})
		},
		watch:{
			showCommentFlag(){
				if(this.showCommentFlag){
					this.$nextTick(()=>{
						this.getToTradeHandler();
						this.tradeDataFlag = true;
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.needs-trade-container{
		.trade-content{
			padding: 20px;
		}
		.modal-mask{
			.modal-container{
				max-width: 700px;
			}
		}
		.trade-modal-btn{
			button{
				height: 30px;
				border:none;
				border-radius: 3px;
				color: #fff !important;
				padding: 5px 25px;
				cursor: pointer;
				transition: 0.3s;
				&:first-child{
					background:#ec6538;
					&:hover{
						background:#cd562e;
					}
				}
				&:last-child{
					background: #999;
					&:hover{
						background:#888;
					}
				}
			}
		}
		.pay-box{
			justify-content: center;
			flex-direction: column;
			align-items: center;
			.pay-kinds{
				padding-bottom: 20px;
				.pay-item{
					width: 200px;
					height: 70px;
					position: relative;
					transition: 0.3s;
					border:2px solid transparent;
					&:hover,&.active{
						border:2px solid #ec6538;
					}
					input[type=radio]{
						position: absolute;
						left: 0;
						top:0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					&:first-child{
						background: url(../../../../../static/images/z_pay.png) center no-repeat;
						background-size: 100% 100%;
						margin-right: 20px;
					}
					&:last-child{
						background: url(../../../../../static/images/w_pay.png) center no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			.pay-btns{
				button{
					&:first-child{
						margin-right:20px;
					}
				}
			}
		}
		.gopay-box{
			p{
				padding-bottom: 20px;
				padding-left: 50px;
			}
		}
		.pay-btns{
			text-align: center;
			padding-top: 20px;
			button{
				&:first-child{
					margin-right:20px;
				}
			}
		}
		.suer-coop{
			text-align: center;
			p{
				line-height: 25px;
			}
		}
		.trade-head ul li:nth-child(3){
			width: 150px;
		}
		.trade-head ul li:nth-child(5){
			width: 70px;
		}
		.trade-tips-modal{
			.modal-mask{
				.modal-container{
					max-width: 200px;
					padding:10px 0;
					text-align: center;
					.closeModal{
						display: none;
					}
				}
			}
			i{
	          display: inline-block;
	          width: 35px;
	          height: 35px;
	          background: url(../../../../../static/images/icons.png) no-repeat;
	          background-position: -139px -203px;
	          vertical-align: middle;
	          margin-right: 10px;
	        }
		}
		.flex-tips{
	        text-align: center;
	        justify-content: center;
	        i{
	          display: inline-block;
	          width: 35px;
	          height: 35px;
	          background: url(../../../../../static/images/icons.png) no-repeat;
	          background-position: -139px -203px;
	          vertical-align: middle;
	          margin-right: 10px;
	        }
	    }
	}
</style>
