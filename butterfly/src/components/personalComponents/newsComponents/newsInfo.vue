<template>
	<div class="news-info">
		<div class="news-content">
      <p>{{showNewsInfoDate.title}}</p>
			<div v-if="showNewsInfoDate.plainText">{{showNewsInfoDate.plainText}}</div>
      <div></div>
      <!--发票信息-->
      <div class="invoice-box" v-if="showNewsInfoDate.invoiceObj">
          我方需要您开具发票，信息如下：
          <div class="invoice-title">发票信息：</div>
          <div class="invoice-content">开票金额：<span>{{showNewsInfoDate.invoiceObj.price}}元</span></div>
          <div class="invoice-content">发票类型：<span>纸质发票</span></div>
          <div class="invoice-content">发票种类：<span>{{showNewsInfoDate.invoiceObj.category}}</span></div>
          <div class="invoice-content">发票抬头类型：<span>{{showNewsInfoDate.invoiceObj.title_type}}</span></div>
          <div class="invoice-content">发票抬头：<span>{{showNewsInfoDate.invoiceObj.title}}</span></div>
          <div class="invoice-content">税号：<span>{{showNewsInfoDate.invoiceObj.tax_number===''?'无':showNewsInfoDate.invoiceObj.tax_number}}</span></div>
          <div class="invoice-content">发票内容：<span>{{showNewsInfoDate.invoiceObj.content}}</span></div>
          <div class="invoice-content">更多信息：<span>{{showNewsInfoDate.invoiceObj.comment}}</span></div>
          <div class="invoice-title">收件方式：</div>
          <div class="invoice-content">收件人：<span>{{showNewsInfoDate.invoiceObj.receiver_name}}</span></div>
          <div class="invoice-content">联系电话：<span>{{showNewsInfoDate.invoiceObj.receiver_phone}}</span></div>
          <div class="invoice-content">邮寄地址：<span>{{showNewsInfoDate.invoiceObj.receiver_address}}</span></div>

      </div>
      <!--邀请商谈信息-->
      <div class="invite-box" v-if="showNewsInfoDate.inviteobj">
        <div class="invite-title">邀请商谈的详细信息：</div>
        <div class="invite-content">商谈时间：<span>{{showNewsInfoDate.inviteobj.inviteTime}}</span></div>
        <div class="invite-content">商谈地址：<span>{{showNewsInfoDate.inviteobj.inviteAddr}}</span></div>
        <div class="invite-content">联系号码：<span>{{showNewsInfoDate.inviteobj.inviteTelNum}}</span></div>
        <div class="invite-content">备注：<span>{{showNewsInfoDate.inviteobj.inviteOther}}</span></div>
      </div>
		</div>
    <div v-if="showNewsInfoDate.from.currentRole">
      <p class="publisherInfo" v-if="showNewsInfoDate.from.currentRole.id =='04' || showNewsInfoDate.from.currentRole.id =='03'">发送人：{{showNewsInfoDate.from.stageName}}</p>
      <p class="publisherInfo" v-if="showNewsInfoDate.from.currentRole.id =='10' || showNewsInfoDate.from.currentRole.id =='11'">发送人：{{showNewsInfoDate.from.simpleName}}</p>
    </div>
    <div class="news-back" @click="newsToBackHandler">返回</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'newsInfo',
		data(){
			return{
        newContentData:null,
        newFromName:null,
        uersId:null
			}
		},
    computed:{
      ...mapGetters({
        showNewsInfoDate:'showNewsInfoDate',
        showNewsInfoDateFlag:'showNewsInfoDateFlag'
      })
    },
		methods:{
			...mapActions({
				newsToBackHandler:'newsToBackHandler'
			})
		},
    mounted(){
    },
		watch:{

    }
	}
</script>

<style scoped lang="less">
	.news-info{
		position: relative;
		padding: 20px;
		.news-content{
			min-height: 200px;
      margin-top: 20px;
      p{
        text-align: center;
        margin-bottom: 20px;
      }
      div{
        text-indent: 20px;
      }
      /*发票信息*/
      .invoice-box,.invite-box{
        margin-top: 40px;
        .invoice-title,.invite-title{
          height: 40px;
          line-height: 40px;
          font-size: 16px;
        }
        .invoice-content,.invite-content{
          text-indent: 50px;
          height: 30px;
          line-height: 30px;
        }
      }

		}
    .publisherInfo{
      text-align: right;
    }
		.news-back{
			width: 90px;
			height: 30px;
			background: #ec6538;
			color: #fff;
			border-radius: 3px;
			text-align: center;
			line-height: 30px;
			cursor: pointer;
			transition: 0.3s;
			position: absolute;
			bottom: -24px;
			right: 10px;
			&:hover{
				background:#cd562e;
			}
		}
	}
</style>
