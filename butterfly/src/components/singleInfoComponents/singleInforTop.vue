<template>
  <div class="infotop-container-bg">
    <div v-if="artistflage" class="info-box">
      <div class="flex-center">
        <div class="info-content">
          <!--<p class="info-name">{{artist.realname}}({{artist.stage_name}})</p>-->
          <p class="info-name">{{artist.stage_name}}</p>
          <p><span>性别</span>{{artist.gender}}</p>
          <p><span>身高</span>{{artist.height}}cm</p>
          <p><span>体重</span>{{artist.weight}}kg</p>
          <p><span>生日</span>{{artist.birthday}}</p>
          <p><span class="four-text">毕业院校</span>{{artist.college}}</p>
          <p><span>城市</span>{{artist.hometown}}</p>
          <p><span>才艺</span>{{artist.skills}}</p>
        </div>
        <div class="info-img">
          <img v-if="artist.coverArtist" :src="artist.coverArtist" alt="img加载失败...">
          <img v-if="!artist.coverArtist" src="https://icon.maxbutterfly.com/static/icon/placeholder_list.png" alt="">
        </div>
      </div>
      <div class="invite-box">
        <span>￥{{artist.salary}}</span><button type="button" class="invite-btn" @click="invitationHintBoxShow">商谈</button>
      </div>
    </div>
    <div v-if="artistGroupflage" class="info-box">
      <div class="flex-center">
        <div class="info-content">
          <p class="info-name">{{group.groupName}}</p>
          <p><span class="four-text">团长姓名</span>{{group.leaderName}}</p>
          <p><span class="four-text">团队人数</span>{{group.number}}</p>
          <p><span class="">报价</span>￥{{group.salary}}</p>
          <p><span class="four-text">所在城市</span>{{group.hometown}}</p>
          <p><span class="four-text">团队简介</span>{{group.introduction}}</p>
          <p><span class="four-text">团队才艺</span>{{group.skills}}</p>
        </div>
        <div class="info-img">
          <img src="../../assets/img/actor.png" alt="">
        </div>
      </div>
      <div class="invite-box">
        <span>￥{{group.salary}}</span><button type="button" class="invite-btn">商谈</button>
      </div>
    </div>
    <div v-if="companyflage" class="info-box">
      <div class="flex-center companyInfo">
        <div class="info-content">
          <p class="info-name">{{company.fullName}}({{company.simpleName}})</p>
          <p><span class="four-text">企业属性</span>{{company.type}}</p>
          <p><span class="four-text">从业年限</span>{{company.life}}年</p>
          <p><span class="four-text">人数规模</span>{{company.number}}人</p>
          <p><span class="four-text">公司类型</span>{{company.companyType}}</p>
          <p><span class="four-text">绑定经纪人</span>{{company.brokerNum}}</p>
          <p><span class="four-text">所在城市</span>{{company.hometown}}</p>
        </div>
        <div class="info-img">
          <img v-if="company.coverPlanningCompany" :src="company.coverPlanningCompany" alt="img加载失败...">
          <img v-if="!company.coverPlanningCompany" src="https://icon.maxbutterfly.com/static/icon/placeholder_list.png" alt="">
        </div>
      </div>
      <div class="invite-box" @click="invitationHintBoxShow">
        <span></span><button type="button" class="invite-btn" >商谈</button>
      </div>
    </div>
    <ModalItem
      :showModal="invitationHintFlag"
      @changheHintBoxShow="changeInvitationHintBoxShow"
    >
      <div slot="body">
        <div class="demand-big-box hint-big-box">
          <span><span>*</span>选择需求</span>
          <ul class="input-box">
            <li v-for="item in myDemandData">
              <input type="radio" name="demand" v-model="checkedValue" :value="item.id" @click="limtDiscussTime(item.date)">{{item.title}}（需招 {{item.type}} {{item.number}}人，
              <span v-if="item.demandEntrySet">已报名{{item.demandEntrySet.length}}人）</span>
            </li>
          </ul>
        </div>

        <div class="hint-big-box">
          <span><span>*</span>商谈时间</span>
          <div class="input-box">
            <Datepicker
              :language="languages.zh"
              :disabledDates="disabledDates"
              v-model="invitationHintData.inviteTime"
              format="yyyy-MM-dd"/>
          </div>
        </div>

        <div class="hint-big-box">
          <span><span>*</span>商谈地址</span>
          <div class="textarea-box">
            <textarea v-model="invitationHintData.inviteAddr" name="" id="" cols="30" rows="10" placeholder="请输入详细的商谈地址"></textarea>
          </div>
        </div>

        <div class="hint-big-box">
          <span><span>*</span>联系电话</span>
          <div class="input-box">
            <input type="text" v-model="invitationHintData.inviteTelNum" placeholder="请输入联系号码">
          </div>
        </div>

        <div class="hint-big-box">
          <span><span>*</span>备注</span>
          <div class="input-box">
            <input type="text" v-model="invitationHintData.inviteOther" placeholder="请输入备注">
          </div>
        </div>

      </div>
      <div slot="footer">
        <div class="invitation-btn">
          <button type="button" @click="invitationToNegotiate">发送邀请</button>
        </div>

      </div>
    </ModalItem>
    <div class="hint-box">
      <ModalItem
        :showModal="hintMoadlFlag"
        @changheHintBoxShow="hintMoadlFun"
      >
        <div slot="body">
          {{hintMoadlText}}
        </div>
      </ModalItem>
    </div>

  </div>
</template>

<script>
  import {formatTime,getToken,axiosReqGet,base64_encode,axiosReqPost,regEX} from '../../assets/js/public'
  import ModalItem from '../publicModalComponents/publicModal'

  import Datepicker from 'vuejs-datepicker';
  import * as lang from "vuejs-datepicker/src/locale";
    export default {
      name: "singleInforTop",
      components:{
        ModalItem,
        Datepicker
      },
      data(){
        return{
          artistflage:false,
          artistGroupflage:false,
          companyflage:false,
          infor:null,
          artist:null,
          companyType:{
            "MJ_COMPANY_TYPE_PERFORMANCE_CO":"演出公司",
            "MJ_COMPANY_TYPE_ADVERTISING_CO":"广告公司",
            "MJ_COMPANY_TYPE_PUBLIC_RELATIONS_CO":"公关公司",
            "MJ_COMPANY_TYPE_WEDDING_CO":"婚庆礼仪公司"
          },
          group:null,
          company:null,
          invitationHintFlag:false,
          languages: lang,
          myDemandData:[],
          checkedValue:'',
          invitationHintData:{
            inviteTime:new Date(),
            inviteAddr:null,
            inviteTelNum:null,
            inviteOther:null,
          },
          hintMoadlFlag:false,
          hintMoadlText:null,
          disabledDates:{
            to: new Date(),
            from: ''
          },

        }
      },
      props:{actorInfor:Object},
      methods:{
        judgeAchieveInfo(param){
          if(param.certifyType){
            if(param.certifyType === 'artist'){
              this.artistflage = true;
               this.artist = {
                 realname:param.name,
                 stage_name:param.stageName,
                 gender:param.gender,
                 height:param.height,
                 weight:param.weight,
                 birthday:formatTime(param.birthday,'.').split(" ")[0],
                 college:param.college,
                 hometown:param.hometown,
                 skills:param.skills,
                 salary:param.salary,
                 coverArtist:param.coverArtist
               }
            }
            if(param.certifyType === 'group'){
              this.artistGroupflage = true;
              this.group = {
                groupName:param.groupName,
                leaderName:param.leaderName,
                number:param.number,
                salary:param.salary,
                hometown:param.hometown,
                skills:param.skills,
                introduction:param.introduction
              }
            }
            if(param.certifyType === 'planningCompany'){
              this.companyflage = true;
              this.company = {
                fullName:param.fullName,
                simpleName:param.simpleName,
                type:param.type,
                number:param.number,
                life:param.life,
                hometown:param.hometown,
                companyType:this.companyType[param.companyType],
                coverPlanningCompany:param.coverPlanningCompany,
                brokerNum:"**"

              }
            }
          }
        },

      //  邀请商谈弹框显示
        invitationHintBoxShow(){
          this.changeInvitationHintBoxShow();
          this.distributableRequirementsList();
        },
      //  限制邀请商谈的时间
        limtDiscussTime(timer){

          this.disabledDates.from = new Date(timer);
        },
      //邀请弹框
        changeInvitationHintBoxShow(){
          if(this.myDemandData ==[]){
            this.hintMoadlFun("你暂时没有可以邀请艺人的需求（原因可能是正在审核中或审核不通过）")
            return
          }
          this.invitationHintFlag = !this.invitationHintFlag;
        },
      //  获取我发布 可邀请艺人的需求列表
        distributableRequirementsList(){
          let uri = 'demand/list/entering';
          let token = getToken();
          axiosReqGet(uri,(params)=>{
            this.myDemandData = params;

          },token,(params)=>{

          })
        },
      //  点击确认邀请商谈
        invitationToNegotiate(){



          if(this.checkedValue == ''){
            this.hintMoadlFun('请选择一个需求')
            return
          }
          if(!this.invitationHintData.inviteTime){
            this.hintMoadlFun('请选择一个时间')
            return
          }
          if(!this.invitationHintData.inviteAddr){
            this.hintMoadlFun('请填写商谈详细地址')
            return
          }
          if(!regEX(this.invitationHintData.inviteTelNum).checkPhone){
            this.hintMoadlFun('请填写正确的手机号')
            return
          }

          let uri = 'entry/interview/invite';
          let token = getToken();
          // return
          let bodyValueObj = {
            'demand_id':this.checkedValue,
            'user_id': this.actorInfor.ownerId,
            "initiative":true,
            "content":JSON.stringify(this.invitationHintData),
          }
          let bodyValue = base64_encode(encodeURIComponent(JSON.stringify(bodyValueObj)));
          axiosReqPost(uri,(params)=>{

            this.changeInvitationHintBoxShow();
            this.hintMoadlFun(params.message)
          },token,bodyValue,null,(params)=>{

            this.hintMoadlFun(params.response.data.message)
          })
        },

      //  提示弹框
        hintMoadlFun(errtext){
          this.hintMoadlText = errtext;
          this.hintMoadlFlag=!this.hintMoadlFlag;
        }
      },
      mounted(){
        this.judgeAchieveInfo(this.actorInfor);
        // this.disabledDates={
        //     to:new Date(),
        //     from: ''
        // }
      }
    }
</script>

<style lang="less">
  .infotop-container-bg{
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/img/banner.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .info-box{
      width: 880px;
      color: #fff;
      padding: 8px 0 20px;
      background-color: rgba(0,0,0,.7);
      .companyInfo{
        margin-top: 20px;
      }
      .flex-center{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .info-content{
          width: 370px;
          p{
            margin-top: 12px;
            span{
              display: inline-block;
              text-indent: 4px;
              letter-spacing: 30px;
            }
            .four-text{
              letter-spacing: 0;
              margin-right: 30px;
            }
          }
          .info-name{
            font-size: 18px;
            letter-spacing: 5px;
            text-indent: 4px;
            height:40px;
            line-height: 40px;
            box-sizing: padding-box;
            border-bottom: 1px solid #fff;
          }
        }
        .info-img{
          height: 250px;
          width: 200px;
        }
      }

      .invite-box{
        width: 150px;
        margin: 20px auto;
        border-radius: 5px;
        display: flex;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        border: 1px solid #EC6538;
        span{
          display: inline-block;
          width: 70px;
          color: #ec6538;
          text-align: center;
        }
        button{
          width: 80px;
          height: 40px;
          color: #FFF;
          text-align: center;
          letter-spacing: 5px;
          font-size: 16px;
          cursor: pointer;
          background-color: #ec6538;
          border: none;
          &:focus{
            outline: none;
          }
        }
      }
    }
    .hint-big-box{
      display: flex;
      margin: 5px 0;
      &>span{
        width: 150px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        vertical-align: middle;
        span{
          color: #ec6538;
          display: inline-block;
          width: 20px;
          height: 40px;
          line-height: 40px;
        }
      }
      .input-box,.textarea-box{
        input,textarea{
          width: 300px;
          height: 40px;
          line-height: 40px;
          resize:none

        }
        textarea{
          height: 80px;
        }
        .vdp-datepicker{
          div{
            input{
              height: 40px;
              line-height: 40px;
            }
          }


        }
      }
      .demand-box{
        width: 400px;
      }
    }
    .invitation-btn{
      text-align: center;
      button{
        background-color: #ec6538;
        color: #FFF;
        border: none;
        outline: none;
        height: 40px;
        width: 140px;
        &:hover{
          background-color: #cd562e;
        }
      }

    }
    .modal-container{
      max-width: 600px;
    }
    .demand-big-box{

      .input-box{
        width: 400px;
        margin: 0 auto;
        height: 200px;
        overflow-y: auto;
        li{
          line-height: 35px;
        }
        input{
          width: 15px;
          height: 15px;
        }
      }
    }
    .hint-box{
      .modal-container{
        width: 200px;
      }
    }
  }

</style>
