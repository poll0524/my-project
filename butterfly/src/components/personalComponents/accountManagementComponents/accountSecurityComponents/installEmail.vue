<template>
	<div class="email-container">
    <TitleItem titleName="绑定邮箱账号"/>
    <div class="email-message">
      <StepsItem :stepsTextData="stepsTextData"/>
      <div v-if="emailPageIndex===1" class="email-box">
        <p>请输入您的邮箱地址：</p>
        <div class="email-input-box">
          <span>邮箱地址</span>
          <input type="email" v-model="emailValue">
        </div>
        <div>
          <span></span>
          <span class="tip-message">
            <img src="../../../../assets/img/warn.png" alt="">
            推荐使用除雅虎中国邮箱以外的主流邮箱，
            如：QQ邮箱、新浪邮箱等邮箱
          </span>
        </div>
        <div>
          <span></span>
          <button type="button" @click="changeEmailPageIndex">下一步</button>
        </div>
        <div class="email-last-message">
          <p>邮箱绑定成功后，您可以享有以下服务</p>
          <ul>
            <li v-for="(item,index) in emailHintData">
              {{(index+1+'、')+item}}
            </li>
          </ul>
        </div>

      </div>
      <div v-if="emailPageIndex===2" class="email-box">
          <p class="successMessage">验证码已发送至您的邮箱 {{emailValue}} <span class="goSeeEmail" @click="goSeeEmail">前往查收&gt;&gt;</span>&emsp;&emsp;&emsp;</p>
        <div class="email-last-message">
          <p>如果没有收到邮件</p>
          <ul>
            <li v-for="(item,index) in emailHintData">
              {{(index+1+'、')+item}}
            </li>
          </ul>
        </div>

      </div>
    </div>
    <ModalItem
      :showModal="showModal"
      @changheHintBoxShow="changheHintBoxShow"
    >
      <div slot="body">{{hintText}}</div>
    </ModalItem>
	</div>
</template>

<script>
  import TitleItem from '../../titleNameComponents'
  import StepsItem from '../../publicApplyComponents/applySteps'
  import ModalItem from '../../../publicModalComponents/publicModal'

  import {regEX,axiosReqGet,getToken} from '../../../../assets/js/public'


  export default{
		name:'installEmail',
    components:{TitleItem,StepsItem,ModalItem},
		data(){
			return{
        stepsTextData:["填写邮箱","验证邮箱","绑定成功"],
        emailHintData:[
          "邮箱地址登录，可直接使用：“邮箱地址”登录到蝶儿飞网。",
          "重要事件提醒，课及时收到邮件提醒。",
          "找回账号密码忘记密码时，可使用邮件找回密码。"
        ],
        emailPageIndex:1,
        emailValue:null,
        showModal:false,
        hintText:null
			}
		},
    methods:{
      sucFunc(param){
        this.emailPageIndex = 2;
        this.emailHintData = [
          '1.邮件到达需要2-3分钟，若您长时间未收到邮件，建议您检查垃圾箱或者重发邮件',
          '2.如果您邮箱填写有误或一直无法收到邮件，建议您更换邮箱'
        ];
      },
      changeEmailPageIndex(){
        if(regEX(this.emailValue).checkEmail ===true){
          let uri = '/mail?mail='+this.emailValue+'&type=1';
          let token = getToken();
          axiosReqGet(uri,this.sucFunc,token,(params)=>{
            this.changheHintBoxShow(params.response.data.message);
          });
        } else {
          this.changheHintBoxShow('请输入正确的邮箱！');
        }

      },
      changheHintBoxShow(value){
        this.hintText = value;
        this.showModal = !this.showModal
      },

    //  前往常用邮箱
      goSeeEmail(){
        let hash ={
          'qq.com': 'http://mail.qq.com',
          'gmail.com': 'http://mail.google.com',
          'sina.com': 'http://mail.sina.com.cn',
          '163.com': 'http://mail.163.com',
          '126.com': 'http://mail.126.com',
          'yeah.net': 'http://www.yeah.net/',
          'sohu.com': 'http://mail.sohu.com/',
          'tom.com': 'http://mail.tom.com/',
          'sogou.com': 'http://mail.sogou.com/',
          '139.com': 'http://mail.10086.cn/',
          'hotmail.com': 'http://www.hotmail.com',
          'live.com': 'http://login.live.com/',
          'live.cn': 'http://login.live.cn/',
          'live.com.cn': 'http://login.live.com.cn',
          '189.com': 'http://webmail16.189.cn/webmail/',
          'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
          'yahoo.cn': 'http://mail.cn.yahoo.com/',
          'eyou.com': 'http://www.eyou.com/',
          '21cn.com': 'http://mail.21cn.com/',
          '188.com': 'http://www.188.com/',
          'foxmail.com': 'http://www.foxmail.com',
          'outlook.com': 'http://www.outlook.com'
        };
        let _mail = this.emailValue.split('@')[1];
        window.open(hash[_mail],'_blank')
      }
    },
    mounted(){

    }
	}
</script>

<style lang="less">
  .email-container{
    .email-message{
      border-bottom: 2px dashed #999;
      .email-box{
        width: 600px;
        height: 210px;
        margin: 20px auto;
        position: relative;
        p{
          height: 50px;
          line-height: 50px;
          font-size: 18px;
        }
        .successMessage{
          font-size: 14px;
          text-align: center;
          .goSeeEmail{
            color: #ec6538;
            text-decoration: underline;
            padding: 5px;
            cursor: pointer;
            &:hover{
              color: #cd562e;
            }
          }
        }
        div{
          span{
            width: 100px;
            letter-spacing: 2px;
            display: inline-block;
          }
          input{
            height: 40px;
            line-height:40px;
            width: 280px;
            margin-top: 20px;
          }
          .tip-message{
            width: 280px;
          }
          img{
            margin-top: 5px;
            width: 12px;
            height: 12px;
          }
          button{
            width: 150px;
            height: 40px;
            margin: 20px 0 0 40px;
            font-size: 16px;
            letter-spacing: 2px;
            cursor: pointer;
            border:none;
            outline:none;
            color: #FFF;
            background-color: #ec6538;
            &:active{
              background-color: #cd562e;
            }
          }
        }
      }
    }
    .email-last-message{
      width: 800px;
      margin: 40px auto;
      left: -160px;
      top:210px;
      position: absolute;
      p{
        font-size: 20px;
        height: 30px;
      }
      ul{
        li{
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .modal-container{
      width: 200px;
    }
    .steps-container .flex-box .flex-item .flex-num{
      background-color: #ec6538!important;
    }
  }

</style>
