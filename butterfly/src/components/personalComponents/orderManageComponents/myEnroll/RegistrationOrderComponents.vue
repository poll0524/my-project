<template>
	<div class="register-order-container">
		<TitleItem titleName="我的报名"/>
		<OrderSteps :stepsTextData="stepsTextData"/>
		<div class="register-content">
			<TradeHead :tradeHead="tradeHead"/>
			<RegisterTable :tradeData="showeEnrollData"/>
		</div>
    <pageItem kindsType="actorRegister"/>
    <ModalItem
    v-if='showInviteChatFlag'
    :showModal='showInviteChatFlag'
    @changheHintBoxShow="closeToTipsModalHandler">
      <div slot="body" class="flex-tips flex">
          <div class="recive-tips" v-if="showTipsType=='reciveInvite'"><i></i>您已接受商谈邀约(商谈时间、地址等详情，请查看系统消息)</div>
          <div class="recive-tips" v-if="showTipsType=='reciveCooper'"><i></i>您已接受合作</div>
          <div class="refuse-tips" v-if="showTipsType=='refuseInvite'">
            <p>请输入拒绝原因</p>
            <div class="text-control">
              <label for="">拒绝原因:</label>
              <textarea placeholder="请输入拒绝原因" maxlength="250" v-model="refuseReason"></textarea>
              <span>{{refuseReason.length}}/250</span>
            </div>
            <div class="button-box">
              <button @click="refuseChat">确定</button>
              <button @click="closeToTipsModalHandler">取消</button>
            </div>
          </div>
          <div class="refuse-tips" v-if="showTipsType=='refuseCooper'">
            <div class="refuse-select flex">
              <label for="">拒绝原因：</label>
              <select name="" id="" v-model="refuseCooperDada.refuseKinds">
                <option value="价钱不符">价钱不符</option>
                <option value="不能开发票">不能开发票</option>
                <option value="其他原因">其他原因</option>
              </select>
            </div>
            <div class="remark text-control">
              <label for="">备注：</label>
              <textarea placeholder="请输入备注" maxlength="250" v-model="refuseCooperDada.reject_reason"></textarea>
              <span>{{refuseCooperDada.reject_reason.length}}/250</span>
            </div>
            <div class="button-box">
              <button @click="refuseChat('refuseCooper')">确定</button>
              <button @click="closeToTipsModalHandler">取消</button>
            </div>
          </div>
          <div class="recive-tips cancel-coo" v-if="showTipsType=='cancelCoo'"><i></i>艺人身份暂时不能取消合作，请联系客服</div>
      </div>
    </ModalItem>
    <ModalItem
      v-if="showCommentFlag"
      :showModal="showCommentFlag">
        <div slot="body"  class="flex-tips flex">
          <div class="recive-tips"><i></i>评价成功</div>
        </div>
    </ModalItem>
	</div>
</template>

<script>

	import TitleItem from '../../titleNameComponents'
	import OrderSteps from '../publicOrderComponents/publicOrderSteps'
	import TradeHead from '../publicOrderComponents/publicTradeHead'
	import RegisterTable from './registerTable'
  import ModalItem from '../../../publicModalComponents/publicModal'
  import pageItem from '../../../paginations/pagination'

  import {getToken,axiosReqGet,formatTime} from '../../../../assets/js/public'
  import {mapGetters,mapActions} from "vuex";

	export default{
		name:'registerOrder',
		data(){
			return{
				stepsTextData:['报名成功/待邀请商谈','待确认合作','劳务费托管中','合作完成','评价'],
				tradeHead:['需求名称','需求类型','报价','合作金额','演出时间','当前状态','操作'],
				tradeData:[],
        refuseReason:'',
        refuseCooperDada:{
          refuseKinds:'价钱不符',
          reject_reason:''
        },
			}
		},
		components:{
			TitleItem,
			OrderSteps,
			TradeHead,
			RegisterTable,
      ModalItem,
      pageItem
		},
    computed:{
      ...mapGetters({
        showeEnrollData:'showeEnrollData',
        showInviteChatFlag:'showInviteChatFlag',
        showTipsType:'showTipsType',
        showCommentFlag:'showCommentFlag'
      })
    },
    methods:{
      ...mapActions({
        getToMyEnrollInfor:'getToMyEnrollInfor',
        closeToTipsModalHandler:'closeToTipsModalHandler',
        refuseToChatHandler:'refuseToChatHandler'
      }),
      refuseChat(params){
        if(params == 'refuseCooper'){
          let strData = this.refuseCooperDada.refuseKinds+"@"+this.refuseCooperDada.reject_reason
          this.refuseToChatHandler({data:strData,type:'refuseCooper'})
        }else{
          this.refuseToChatHandler({data:this.refuseReason,type:'refuseChat'})
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getToMyEnrollInfor()
      })
    },
    watch:{
      showInviteChatFlag(){
        if(!this.showInviteChatFlag){
          this.refuseReason = '';
          this.refuseCooperDada = {
            refuseKinds:'价钱不符',
            reject_reason:''
          }
        }
      },
      showCommentFlag(){
        if(this.showCommentFlag){
           this.$nextTick(()=>{
            this.getToMyEnrollInfor()
          })
        }
      }
    }
	}
</script>

<style scoped lang="less">
	.register-content{
		padding: 20px;
  }
  .register-order-container{
      .text-control{
        span{
          color: #000;
          right: 35px;
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
        .cancel-coo{
          i{
            background-position: -175px -203px;
          }
        }
      }
      .refuse-tips{
        width: 100%;
        select{
            margin-bottom: 20px;
            padding: 5px 20px;
          }
        p{
          text-align: center;
          padding: 0 0 20px;
          font-size: 16px;
        }
        &>div{
          display:flex;
          justify-content: center;
          label{
            align-self: flex-start;
            margin-right: 20px;
          }
          textarea{
            resize: none;
            border-radius: 3px;
            border:1px solid #999;
            padding: 5px;
            width: 300px;
            height: 100px;
          }

          &.button-box{
            padding-top: 20px;
              button{
                height: 30px;
                width: 90px;
                color: #fff;
                border:none;
                cursor: pointer;
                transition: 0.3s;
                &:first-child{
                  background:#ec6538;
                  margin-right: 15px;
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
        }
        .refuse-select{
          align-items: center;
          label{
            margin-top: 5px;
          }
        }
      }
  }
</style>
