<template>
	<div :class="['order-info-container',{tipsBox:activeType=='ignore'||activeType=='refuseCooper'}]">
		<div class="back">
			<button @click="initToFlag">返回</button>
		</div>
		<TableItem
		:tableTitle="tableTitle"
		:tableData="showNeedsInfo"
		type='needsOrder'
		infoType="needsInfo"/>
		<div class="order-info-content">
			<div class="order-personbox">
				<NameItem nameTxt="申请报名的艺人/团体"/>
				<TabItem :tabData="applyTabData" type="applyIdx"/>
				<div class="order-listcontent">
					<div class="order-listbox flex" v-if="showApplyIdx==0">
						<ListItem
							v-if="showInfoFlag"
							:showBtnFlag="true"
							:smallFlag="true"
							:showInfoFlag="showInfoFlag"
							:reciveEntryData="entryingData"
							:demandId="showNeedsInfo[0].id"
							btnText="邀请商谈"
							btnSmallText="忽略"
							modalType="inviteContact"
							orderType="ivite"
							smallType="ignore"/>
					</div>
					<div class="order-listbox flex" v-if="showApplyIdx==1">
						<ListItem
							:showBtnFlag="true"
							:demandId="showNeedsInfo[0].id"
							btnText="重新邀请商谈"
							typeText='已忽略'
							orderType="ivite"
							:reciveEntryData="ignoreEntryData"/>
					</div>
					<div class="order-listbox flex" v-if="showApplyIdx==2">
						<ListItem
						typeText='已拒绝'
						:reciveEntryData="refuseEntryData"/>
					</div>
					<div class="order-listbox flex" v-if="showApplyIdx==3">
						<ListItem
						:reciveEntryData="waitEntryData"
						:showInfoFlag="showInfoFlag"/>
					</div>
				</div>
			</div>
			<div class="order-personbox">
				<NameItem nameTxt="商谈中的艺人/团体"/>
				<TabItem :tabData="contactTabData" type="contactIdx"/>
				<div class="order-listcontent">
					<div class="order-listbox flex" v-if="showContactIdx==0">
						<ListItem
							:showBtnFlag="true"
							:demandId="showNeedsInfo[0].id"
							btnText="确定合作"
							btnSmallText="拒绝合作"
							:smallFlag="true"
							orderType="cooper"
							smallType="refuseCooper"
							:reciveEntryData="chatingData"/>
					</div>
					<div class="order-listbox flex" v-if="showContactIdx==1">
						<ListItem
							:showBtnFlag="true"
							:demandId="showNeedsInfo[0].id"
							typeText='已拒绝'
							btnText="重新确定合作"
							orderType="cooper"
							:reciveEntryData="refuseCoopData"/>
					</div>
					<div class="order-listbox flex" v-if="showContactIdx==2">
						<ListItem
						typeText='已拒绝'
						refuseType="true"
						:reciveEntryData="actorRefuseCoopData"/>
					</div>
					<div class="order-listbox flex" v-if="showContactIdx==3">
						<ListItem :reciveEntryData="reciveCoopData"/>
					</div>
				</div>
			</div>
		</div>
		<ModalItem
			v-if="showOrderModal&&activeType=='ivite'"
			:showModal="showOrderModal"
			@changheHintBoxShow="inviteToBackHandler">
			<div slot="header" class="ivite-header">
				邀请商谈
			</div>
			<div slot="body" class="invite-flex flex">
				<div class="invite-box">
					<div class="flex-item flex-date flex">
						<label for="">商谈时间</label>
						<div class="flex-inp">
							<Datepicker
							:language="languages.zh"
							:disabledDates="disabledDates"
							format="yyyy-MM-dd"
							v-model="showInvitActorData.inviteTime"
							/>
							<span class="color-arrow inp-arrow"></span>
						</div>
					</div>
					<div class="flex-item flex-addr flex-inviteAddr flex">
						<label for="">商谈地址</label>
						<div class="flex-inp">
							<v-distpicker @selected="onSelected"></v-distpicker>
							<div class="info-addr">
								<textarea placeholder="请输入详细地址" v-model="showInvitActorData.inviteAddrInfo"></textarea>
							</div>
						</div>
					</div>
					<div class="flex-item flex">
						<label for="">联系方式</label>
						<div class="flex-inp">
							<input type="text" v-model="showInvitActorData.inviteTelNum">
						</div>
					</div>
				</div>
			</div>
			<div slot='footer' class="ivite-btnbox flex">
				<div class="invit-btn" @click="sendRequestHandler">发送邀请</div>
				<div class="back" @click="inviteToBackHandler">返回</div>
			</div>
		</ModalItem>
		<ModalItem
			v-if="showOrderModal&&activeType=='cooper'"
			:showModal="showOrderModal"
			@changheHintBoxShow="inviteToBackHandler">
			<div slot="header" class="ivite-header">
				确定合作
			</div>
			<div slot="body" class="invite-flex flex">
				<div class="invite-box">
					<div class="flex-item flex">
						<label for="">合作金额</label>
						<div class="flex-inp">
							<input type="text" maxlength="8" placeholder="请输入合作金额" v-model="showInviteCooperData.price">
							<span class="color-arrow text-arrow">元</span>
						</div>
					</div>
					<div class="flex-item flex">
						<label for="">开发票</label>
						<div class="flex-inp">
							<select
								v-model="showInviteCooperData.need_invoice"
								@change="tipsChange">
								<option value="0">不需要</option>
								<option value="1">需要</option>
							</select>
							<span class="color-arrow inp-arrow"></span>
						</div>
					</div>
					<div class="needs-tips" v-if="showTips">
						<div class="flex-title">发票信息</div>
						<div class="flex-item flex">
							<label for="">发票类型</label>
							<div class="flex-inp">
								<select name="" id="">
									<option value="0">纸质发票</option>
								</select>
								<span class="color-arrow inp-arrow"></span>
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">发票种类</label>
							<div class="flex-inp">
								<select name="" id="" v-model="showInviteCooperData.category">
									<option disabled value="">请选择</option>
									<option value="增值税普通发票">增值税普通发票</option>
									<option value="增值税专用发票">增值税专用发票</option>
								</select>
								<span class="color-arrow inp-arrow"></span>
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">发票抬头类型</label>
							<div class="flex-inp">
								<select name="" id="" v-model="showInviteCooperData.title_type" @change="taxTypeHandler">
									<option disabled value="">请选择</option>
									<option value="个人/非企业单位">个人/非企业单位</option>
									<option value="企业单位">企业单位</option>
								</select>
								<span class="color-arrow inp-arrow"></span>
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">发票抬头</label>
							<div class="flex-inp">
								<input type="text" placeholder="请输入发票抬头" v-model="showInviteCooperData.title">
							</div>
						</div>
						<div class="flex-item flex" v-if="showTaxNumber">
							<label for="">税号</label>
							<div class="flex-inp">
								<input type="text" maxlength="30" placeholder="请输入税号" v-model="showInviteCooperData.tax_number" @change="checkTaxNumber">
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">发票内容</label>
							<div class="flex-inp">
								<input type="text" placeholder="请输入发票内容" v-model="showInviteCooperData.content">
							</div>
						</div>
						<div class="flex-item flex-moreInfo flex">
							<label for="">更多信息</label>
							<div class="flex-inp">
								<input type="text" placeholder="请输入更多信息" v-model="showInviteCooperData.comment">
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">收件人</label>
							<div class="flex-inp">
								<input type="text" placeholder="请输入收件人姓名" v-model="showInviteCooperData.receiver_name">
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">联系电话</label>
							<div class="flex-inp">
								<input type="text" placeholder="请输入联系电话" v-model="showInviteCooperData.receiver_phone">
							</div>
						</div>
						<div class="flex-item flex">
							<label for="">邮寄地址</label>
							<div class="flex-inp">
								<v-distpicker @selected="onSelected"></v-distpicker>
							</div>
						</div>
						<div class="flex-item flex-addr flex">
							<label for="">详细地址</label>
							<div class="flex-inp">
								<textarea placeholder="请输入详细地址" v-model="addressInfo"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot='footer' class="ivite-btnbox flex">
				<div class="invit-btn" @click="sendCooperHandler">确定合作</div>
				<div class="back" @click="inviteToBackHandler">返回</div>
			</div>
		</ModalItem>
		<ModalItem
			v-if="showOrderModal&&activeType=='ignore'"
			:showModal="showOrderModal"
			@changheHintBoxShow="inviteOrCoop">
			<div slot="body" class="invite-flex flex">
				<i></i>已忽略该艺人
			</div>
		</ModalItem>
		<ModalItem
			v-if="showOrderModal&&activeType=='refuseCooper'"
			:showModal="showOrderModal"
			@changheHintBoxShow="inviteOrCoop">
			<div slot="body" class="invite-flex flex">
				<i></i>已拒绝该艺人
			</div>
		</ModalItem>
		<div class="success-box">
			<ModalItem
				v-if="showInviteContentFlag"
				:showModal="showInviteContentFlag"
				@changheHintBoxShow="inviteOrCoop">
				<div slot="body" class="invite-flex flex">
					<i></i>
					<span v-if="showInviteTimeControl!=''">{{showInviteTimeControl}}</span>
					<span v-if="showInviteTimeControl==''">请确定内容是否填写完整</span>
				</div>
			</ModalItem>
		</div>
		<div class="success-box">
			<ModalItem
				v-if="checkPhoneFlag"
				:showModal="checkPhoneFlag"
				@changheHintBoxShow="inviteOrCoop">
				<div slot="body" class="invite-flex flex" v-if="checkContent=='phone'">
					<i></i>请输入正确的手机号
				</div>
				<div slot="body" class="invite-flex flex" v-if="checkContent=='price'">
					<i></i>请输入正确的合作金额
				</div>
				<div slot="body" class="invite-flex flex" v-if="checkContent=='address'">
					<i></i>请选择正确的地址
				</div>
				<div slot="body" class="invite-flex flex" v-if="checkContent=='content'">
					<i></i>请确定内容是否输入完整
				</div>
			</ModalItem>
		</div>
		<div class="success-box">
			<ModalItem
				v-if="showNoRealNameFlag"
				:showModal="showNoRealNameFlag"
				@changheHintBoxShow="inviteOrCoop">
				<div slot="body" class="invite-flex flex">
					<i></i><span>{{showInviteMessage}}</span>
				</div>
			</ModalItem>
		</div>
		<div class="success-box tips-box">
			<ModalItem
				v-if="showInviteSuccessFlag"
				:showModal="showInviteSuccessFlag"
				@changheHintBoxShow="inviteOrCoop">
				<div slot="body" class="invite-flex flex">
					<i></i>邀请成功
				</div>
			</ModalItem>
		</div>
		<!-- <ModalItem
			v-if="showAuthFlag"
			:showModal="showAuthFlag"
			@changheHintBoxShow="closeToAuthModal">
			<div class="auth-tips-title" slot="header">
				<img src="../../../../assets/img/warn.png" alt="">温馨提示
			</div>
			<div slot="body" class="auth-box">
				<p>您当前身份未实名认证，不能邀请商谈，请前往个人中心实名认证</p>
				<div class="auth-btns">
					<router-link to="/personalindex" tag="button">前往个人中心</router-link>
				</div>
			</div>
		</ModalItem> -->
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";

	import {regEX} from '../../../../assets/js/public.js'

	import TableItem from '../publicOrderComponents/publicTable'
	import NameItem from '../../titleComponents'
	import TabItem  from '../publicOrderComponents/publicTabs'
	import ListItem from '../publicOrderComponents/publicList'

	import ModalItem from '../../../publicModalComponents/publicModal'
	import LinkageItem from '../../../linkageComponents/linkageComponents'

	export default{
		name:'OrderInfo',
		props:['tableTitle'],
		data(){
			return{
				applyTabData:['申请报名的艺人','被忽略的艺人','拒绝商谈的艺人','待确认邀请的艺人'],
				contactTabData:['商谈中的艺人','我拒绝的艺人','拒绝我的艺人','待确认合作的艺人'],
				languages:lang,
				activeType:'',
				select: { province: '广东省', city: '广州市', area: '海珠区' },
				showTips:false,
				neewsOr:0,
				entryFlag:false,
				addressInfo:'',
				entryActorData:[],
				entryingData:[],//申请中的
				waitEntryData:[],//待确认邀请的
				ignoreEntryData:[],//被忽略的
				refuseEntryData:[],//拒绝商谈的
				chatingData:[],//商谈中的(已接收面试商谈)
				reciveCoopData:[],//已接收合作邀请
				refuseCoopData:[],//已拒绝合作邀请
				actorRefuseCoopData:[],//被需求放主动拒绝合作
				checkPhoneFlag:false,//验证手机号
				checkContent:'',
				showTaxNumber:false,
				disabledDates:{
					to: new Date(),
					// from: new Date()
				},
			}
		},
		components:{
			TableItem,
			NameItem,
			TabItem,
			ListItem,
			ModalItem,
			Datepicker,
			LinkageItem
		},
		computed:{
			...mapGetters({
				showNeedsInfo:'showNeedsInfo',
				showApplyIdx:'showApplyIdx',
				showContactIdx:'showContactIdx',
				showOrderModal:'showOrderModal',
				showModalContentType:'showModalContentType',
				showInfoFlag:'showInfoFlag',
				showInvitActorData:'showInvitActorData',
				showInviteSuccessFlag:'showInviteSuccessFlag',
				showInviteContentFlag:'showInviteContentFlag',
				showNoRealNameFlag:'showNoRealNameFlag',
				showInviteCooperData:'showInviteCooperData',
				showInviteMessage:'showInviteMessage',
				showAuthFlag:'showAuthFlag',
				showInviteTimeControl:'showInviteTimeControl'

			})
		},
		methods:{
			...mapActions({
				addressToChange:'addressToChange',
				inviteOrCoop:'inviteOrCoop',
				initToFlag:'initToFlag',
				inviteToBackHandler:'inviteToBackHandler',
				inviteToSendHandler:'inviteToSendHandler',
				sendToCooperHandler:'sendToCooperHandler',
				closeToAuthModal:'closeToAuthModal'
			}),
			onSelected(data) {
		      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
		      this.showInvitActorData.inviteAddr = data.province.value+','+data.city.value+','+data.area.value
		      this.showInviteCooperData.receiver_address = data.province.value+','+data.city.value+','+data.area.value

		    },
		    tipsChange(){

		    	if(this.showInviteCooperData.need_invoice==1){
		    		this.showTips = true
		    	}else{
		    		this.showTips = false
		    	}
		    },
		    //抬头类型
		    taxTypeHandler(){

		    	if(this.showInviteCooperData.title_type == '企业单位'){
		    		this.showTaxNumber = true
		    	}else{
		    		this.showTaxNumber = false
		    	}
		    },
		    //税号
		    checkTaxNumber(){
		    	if(!regEX(this.showInviteCooperData.tax_number).checkNumber){
		    		this.showInviteCooperData.tax_number = '';
		    	}
		    },
		    //发送请求
		    sendRequestHandler(){
		    	if(!regEX(this.showInvitActorData.inviteTelNum).checkPhone){
		    		this.checkPhoneFlag = true
		    		this.checkContent = 'phone'
		    		setTimeout(()=>{
		    			this.checkPhoneFlag = false
		    		},2000)
		    		return
		    	}
		    	if(this.showInvitActorData.inviteAddr =='' || this.showInvitActorData.inviteAddr.split(',')[0] == '省' || this.showInvitActorData.inviteAddr.split(',')[1] == '市' || this.showInvitActorData.inviteAddr.split(',')[2] == '区'){
		    		this.checkPhoneFlag = true
		    		this.checkContent = 'address'
		    		setTimeout(()=>{
		    			this.checkPhoneFlag = false
		    		},2000)
		    		return
		    	}
		    	if(this.showInvitActorData.inviteAddr.split(',')[0] == '台湾省'){
		    		this.showInvitActorData.inviteAddr = '台湾省'
		    	}
		    	this.inviteToSendHandler();
		    },
		    //邀请合作
		    sendCooperHandler(){

		    	if(!regEX(this.showInviteCooperData.price).checkNumber || Number(this.showInviteCooperData.price)<=0){
		    		this.checkPhoneFlag = true
		    		this.checkContent = 'price'
		    		setTimeout(()=>{
		    			this.checkPhoneFlag = false
		    		},2000)
		    		return
		    	}
		    	if(this.showInviteCooperData.need_invoice==1){
		    		for(let key in this.showInviteCooperData){
		    			if(this.showInviteCooperData[key] == ''&&key != 'comment'&&key != 'type'){
		    				if(this.showInviteCooperData.title_type == '' || this.showInviteCooperData.title_type !='企业单位'){
		    					if( key != 'tax_number'){
				    				this.checkPhoneFlag = true
						    		this.checkContent = 'content'
						    		setTimeout(()=>{
						    			this.checkPhoneFlag = false
						    		},2000)
						    		return
		    					}
		    				}else if(this.showInviteCooperData.title_type =='企业单位'){
		    					this.checkPhoneFlag = true
					    		this.checkContent = 'content'
					    		setTimeout(()=>{
					    			this.checkPhoneFlag = false
					    		},2000)
					    		return
		    				}
		    			}
				    	if(!regEX(this.showInviteCooperData.receiver_phone).checkPhone){
				    		this.checkPhoneFlag = true
				    		this.checkContent = 'phone'

				    		setTimeout(()=>{
				    			this.checkPhoneFlag = false
				    		},2000)
				    		return
				    	}
		    		}
		    		if(this.showInviteCooperData.receiver_address != ''){
			    		let pro = this.showInviteCooperData.receiver_address.split(',')[0];
			    		if(pro == '省'){
			    			this.checkPhoneFlag = true
				    		this.checkContent = 'address'
				    		setTimeout(()=>{
				    			this.checkPhoneFlag = false
				    		},2000)
				    		return
			    		}
			    		if(pro == '台湾省'){
			    			this.showInviteCooperData.receiver_address = '台湾省'
			    		}
			    	}
		    		this.showInviteCooperData.receiver_address = this.showInviteCooperData.receiver_address+' '+this.addressInfo
		    	}
		    	this.sendToCooperHandler();
		    },
		    KindsHandler(data){
		    	this.entryingData = [];//申请中的
				this.waitEntryData = [];//待确认邀请的
				this.ignoreEntryData = [];//被忽略的
				this.refuseEntryData = [];//拒绝商谈的
				this.chatingData = [];//商谈中的(已接收面试商谈)
				this.reciveCoopData = [];//已接收合作邀请
				this.refuseCoopData = [];//已拒绝合作邀请
				this.actorRefuseCoopData = [];//被需求放主动拒绝合作
				if(typeof(data)!='object'){
					return
				}
		    	data.forEach((item,i)=>{
					//申请报名中的艺人
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_ENTERED'){
						this.entryingData.push(item)
					}
					//待确认邀请的艺人
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_INVITED'){
						this.waitEntryData.push(item)
					}
					//忽略的
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_IGNORED'){
						this.ignoreEntryData.push(item)
					}
					//拒绝商谈的
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_REJECT'){
						this.refuseEntryData.push(item)
					}
					//已接收商谈邀请，商谈中的艺人
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_INTERVIEW_ACCEPT'){
						this.chatingData.push(item)
					}
					//我拒绝合作的艺人MJ_DEMAND_ENTRY_STATUS_COOPERATE_REJECT
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_COOPERATE_REJECT_INITIATIVE'){
						this.refuseCoopData.push(item)
					}
					//拒绝我合作的艺人
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_COOPERATE_REJECT'){
						if(item.rejectReason){
							item.reason = item.rejectReason.split('@')[0];
							item.remarks = item.rejectReason.split('@')[1];
						}
						this.actorRefuseCoopData.push(item)
					}
					//待确认合作
					if(item.demandEntryStatus == 'MJ_DEMAND_ENTRY_STATUS_COOPERATE_INVITED'){
						this.reciveCoopData.push(item)
					}
				})
		    }
		},
		mounted(){
			this.activeType = this.showModalContentType
			this.$nextTick(()=>{
				if(this.showNeedsInfo[0].demandEntrySet){
					this.entryActorData = this.showNeedsInfo[0].demandEntrySet;
				}
				this.entryFlag = true
				this.KindsHandler(this.entryActorData)
			})
		},
		watch:{
			showModalContentType(){
				this.activeType = this.showModalContentType
			},
			showNeedsInfo(){
				this.entryActorData = this.showNeedsInfo[0].demandEntrySet;
				this.KindsHandler(this.entryActorData)
				// this.entryActorData = this.showNeedsInfo[0].demandEntrySet;
				// console.log(this.entryActorData)
			},
			showInviteCooperData(){
				this.showTips = false
				this.addressInfo = ''
			},
		}
	}
</script>

<style lang="less">
.order-info-container{
	.order-listbox{
		flex-wrap: wrap;
		max-height: 350px;
		overflow: auto;
	}
	.back{
		text-align: right;
		padding: 10px 20px;
		button{
			background: #ec6538;
			color: #fff;
			border:none;
			padding:3px 10px;
			border-radius: 3px;
			cursor: pointer;
			transition: 0.3s;
			&:hover{
				background:#cd562e;
			}
		}
	}
	.ivite-header{
		text-align: center;
	}
	.modal-container{
		max-width: 700px;
	}
	&.tipsBox{
		.modal-container{
			max-width: 200px;
			padding:10px 0;
			.closeModal{
				display: none;
			}
		}
	}
	.invite-flex{
		justify-content: center;
		align-items: center;
		i{
			width: 35px;
			height: 35px;
			background:url(../../../../../static/images/icons.png) no-repeat;
			background-position: -174px -203px;
			margin-right: 10px;
		}
	}
	.modal-body{
		max-height: 500px;
		overflow: auto;
	}
	.invite-box{
		.flex-item{
			margin-bottom: 20px;
			align-items: center;
			label{
				margin-right: 10px;
				flex-shrink: 0;
				width: 100px;
				&::before{
					display:inline-block;
					content: '*';
					color: #ec6538;
				}
			}
			&.flex-addr{
				label{
					align-self: flex-start;
				}
				&.flex-inviteAddr{
					textarea{
						margin-top: 20px;
					}
				}
			}
			&.flex-moreInfo{
				label::before{
					display:none;
				}
			}
			.flex-inp{
				position: relative;
				.inp-arrow{
					height: 100%;
					width: 40px;
				}
			}
			input,select{
				height: 40px;
				padding-left: 5px;
				border:1px solid #999;
				position: relative;
				z-index: 1;
				min-width: 100px;
				/*padding-right: 40px;*/
				max-width: 170px;
			}
			textarea{
				width: 300px;
				resize: none;
				height: 100px;
				overflow: auto;
				padding:5px;
			}
			&.flex-date{
				.flex-inp{
					background: #fff;
				}
				input{
					background: transparent;

				}
			}
			&.flex-addr{
				label{
					align-self:flex-start;
				}
			}
		}
	}
	.ivite-btnbox{
		justify-content: center;
		align-items: flex-end;
		.invit-btn{
			width: 90px;
			height: 30px;
			color: #fff;
			border-radius: 3px;
			background: #ec6538;
			text-align: center;
			line-height: 30px;
			cursor: pointer;
			transition: 0.3s;
			&:hover{
				background:#cd562e;
			}
		}
		.back{
			color: #ec6538;
			margin-left: 20px;
			cursor: pointer;
			&:hover{
				text-decoration:underline;
			}
		}
	}
	.success-box{
		.modal-container{
			max-width: 300px;
			padding: 10px 0;
			.closeModal{
				display: none;
			}
			span{
				max-width: 225px;
				white-space: wrap;
			}
		}
		&.tips-box{
			i{
				background-position: -134px -203px;
			}
		}
	}
	.flex-title{
		padding: 10px 0;
		border-bottom: 1px solid #fff;
		margin-bottom: 20px;
	}
}
</style>
