<template>
	<div class="needs-order-container">
		<div class="needs-allOrder" v-if="!showInfoFlag">
			<TitleItem titleName='需求订单'/>
			<StepItem :stepsTextData="stepsTextData"/>
			<div class="needs-contents">
				<TabItem :tabData="tabData"  type="allIdx"/>
				<TableItem
				v-if="showOrderTabIdx==0"
				:tableTitle="allTableTitle"
				:tableData="showAllNeedsData.needsOrderData"
				type="needsOrder"/>
				<TableItem
				v-if="showOrderTabIdx==1"
				:tableTitle="allTableTitle"
				:tableData="showAllNeedsData.noOverOrderData"
				type='draft'/>
				<TableItem
				v-if="showOrderTabIdx==2"
				:tableTitle="allTableTitle"
				:tableData="showAllNeedsData.noPassOrderData"
				type='refuse'/>
			</div>
		</div>
		<div class="needs-info" v-if="showInfoFlag">
			<TitleItem titleName='订单详情'/>
			<InfoItem :tableTitle="allTableTitle"/>
		</div>
		<ModalItem
		v-if="showAuthFlag"
		:showModal="showAuthFlag"
		@changheHintBoxShow="closeToAuthModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" class="auth-box" v-if="showInviteContentType=='compeleteNeeds'">
				<p>您当前身份不能完善需求，请前往个人中心申请/切换主办方或策划公司身份</p>
				<div class="auth-btns">
					<button @click="closeToAuthModal">确定</button>
				</div>
			</div>
			<div slot="body" class="auth-box" v-if="showInviteContentType=='inviteActor'">
				<p>您当前身份未实名认证，不能邀请商谈，请前往个人中心实名认证</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import StepItem from '../publicOrderComponents/publicOrderSteps'
	import TitleItem from '../../titleNameComponents'
	import TabItem from '../publicOrderComponents/publicTabs'
	import TableItem from '../publicOrderComponents/publicTable'
	import InfoItem from './orderInfoComponents'
	import ModalItem from '../../../publicModalComponents/publicModal'

	export default{
		name:'needsOrder',
		data(){
			return{
				stepsTextData:['完善需求','等待审核','等待报名','商谈及合作','合作完成'],
				tabData:['需求订单','待完善订单','未通过订单'],
				allTableTitle:['需求名称','需求类型','预计金额','当前合作金额','服务佣金','当前状态','订单操作'],
			}
		},
		components:{
			StepItem,
			TitleItem,
			TabItem,
			TableItem,
			InfoItem,
			ModalItem
		},
		computed:{
			...mapGetters({
				showOrderTabIdx:'showOrderTabIdx',
				showAllNeedsData:'showAllNeedsData',
				showInfoFlag:'showInfoFlag',
				showAuthFlag:'showAuthFlag',
				shwoAuthType:'shwoAuthType',
				showInviteContentType:'showInviteContentType'
			})
		},
		methods:{
			...mapActions({
				initToFlag:'initToFlag',
				closeToAuthModal:'closeToAuthModal',
				getToUserInfo:'getToUserInfo'
			})
		},
		mounted(){
			this.initToFlag();
			this.closeToAuthModal();
			this.$nextTick(()=>{
				this.getToUserInfo()
			})
		},
		watch:{
			showAuthFlag(){

			}
		}
	}
</script>

<style scoped lang="less">

</style>
