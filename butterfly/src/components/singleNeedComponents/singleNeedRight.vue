<template>
  <div class="needRight-container" v-if="needContentFlage">
    <div class="needRight-header">
        <h3>{{needContent.title}}</h3>
        <p class="price">￥{{needContent.budget}}</p>
        <p>客户&emsp;{{needContent.publisher.simpleName}}&emsp;发布了该需求，报名还在持续中...</p>
      </div>
    <div class="needRight-content">
      <p>需求详情：</p>
      <div class="needInfoBox">
        <span>演出时间：</span>
        <div>{{performanceTimes}}</div>
      </div>
      <div class="needInfoBox">
        <span>报名截止时间：</span>
        <div>{{endTimes}}</div>
      </div>
      <div class="needInfoBox">
        <span>演出简介：</span>
        <div>{{needContent.introduce}}</div>
      </div>
      <div class="needInfoBox">
        <span>演出地址：</span>
        <div>{{needContent.location}}</div>
      </div>
      <div class="needInfoBox">
        <span>演出阵容：</span>
        <div>{{needContent.lineUp}}</div>
      </div>
      <div class="needInfoBox">
        <span>演出类型：</span>
        <div>{{needContent.type}}</div>
      </div>
      <div class="needInfoBox">
        <span>需求数量：</span>
        <div>{{needContent.number}}名</div>
      </div>
      <!--<div class="needInfoBox">
        <span>需求种类：</span>
        <div>{{needContent.categories.categoryChinese}}</div>
      </div>-->
      <div class="needInfoBox">
        <span>已报名/报名限制：</span>
        <div>{{needContent.demandEntrySet?needContent.demandEntrySet.length:0}}/{{needContent.maxLimit}}名</div>
      </div>
      <div class="needInfoBox">
        <span>补充信息：</span>
        <div>{{needContent.supplement}}</div>
      </div>

    </div>
    <div class="application-box">
      <button type="button" @click="applicationRequire">申请</button>
    </div>
    <PublicModal
      @changheHintBoxShow="changheHintBoxShow"
      :showModal="showModal"
      :hintInfo="hintInfo">
      <div slot="header">
        <span class="headerIcon"><img src="../../assets/img/right.png" alt=""></span>
        <span class="headerText">报名成功</span>
      </div>
      <div slot="body">
        <span>你已报名此条需求，是否前往需求大厅继续报名</span>
      </div>
      <div slot="footer" class="modalBtn">
        <router-link tag="div" to="/needs" >需求大厅</router-link>
      </div>
    </PublicModal>

    <PublicModal
      :showModal="showModalTwo"
      @changheHintBoxShow="changheHintBoxShowTwo"
    >
      <div slot="body">
        {{showModalErrText}}
      </div>
    </PublicModal>
  </div>
</template>

<script>
  import {axiosReqGet,getToken,getCurrentRole,formatTime,base64_encode,axiosReqPost} from "../../assets/js/public"
  import PublicModal from "../../components/publicModalComponents/publicModal"
    export default {
      name: "singleNeedRight",
      props:{needInfor:Object},
      components:{PublicModal},
      data(){
        return{
          performanceTimes:"",
          endTimes:"",
          needContent: null,
          showModal:false,
          needContentFlage: false,
          hintBoxFlage: false,
          hintInfo:{},
          currentRole: null,
          showModalTwo:false,
          showModalErrText:null
        }
      },
      methods:{
        achieveNeedContent(param){
          this.needContent = param;
          this.performanceTimes = formatTime(param.date,".").split(" ")[0]
          this.endTimes = formatTime(param.deadline,'.').split(' ')[0];
          this.needContentFlage = true
        },
        changheHintBoxShow(){
          this.showModal = false;
        },
        sucFun(param){
          this.currentRole = param.currentRole;
        },
        applicationCallback(param){
          if(param){
            this.hintBoxFlage = true;
            this.showModal = true;
            this.hintInfo = {
              successIcon:false,
              countDown:3000,
              firstText:"报名成功",
              secondText:"您已报名次需求，是否前往需求大厅",
              successBtn:{
                btnText:"前往需求大厅",
                btnLink:"/needs"
              }
            }
          }
        },
        applicationRequire(){
          if(this.currentRole.id === "04"||this.currentRole.id === "03" || this.currentRole.id === "06" || this.currentRole.id === "11"){
            let url = 'entry';
            let token = getToken();
            const data = base64_encode(encodeURIComponent(JSON.stringify({demand_id:this.needContent.id})));
            axiosReqPost(url,this.applicationCallback,token,data,null,(err)=>{
              this.changheHintBoxShowTwo(err.response.data.message)
            });

          }else if(this.currentRole.id === "03" || this.currentRole.id === "05" || this.currentRole.id === "10") {

          }else {

          }
        },
      //  提示框
        changheHintBoxShowTwo(errtext){
          this.showModalErrText = errtext;
          this.showModalTwo = !this.showModalTwo;
        }
      },
      mounted(){
        this.achieveNeedContent(this.needInfor);
        getCurrentRole(this.sucFun);
      }
    }
</script>

<style scoped lang="less">
  .needRight-container{
    width: 850px;
    min-height: 750px;
    background-color: #fff;
    padding: 30px;
    .needRight-header{
      border-bottom: 1px solid #546370;
      padding-bottom: 10px;
      h3{
        letter-spacing: 2px;
        font-size: 18px;
        height: 28px;
        line-height: 28px;
      }
      p{
        height: 28px;
        line-height: 28px;
        text-indent: 8px;
      }
      .price{
        color: #ec6538;
        font-size: 20px;
        text-indent: 5px;
      }

    }
    .needRight-content{
      p{
        height: 80px;
        line-height: 80px;
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 2px;
      }
      .needInfoBox{
        display: flex;
        padding: 10px;
        letter-spacing: 2px;
        div{
          width: 530px;
        }
        span{
          display: inline-block;
          margin-left: 50px;
        }

      }
    }
    .application-box{
      width: 600px;
      margin-top: 100px;
      text-align: right;
      button{
        width: 150px;
        height: 40px;
        color: #fff;
        font-size: 16px;
        letter-spacing: 4px;
        cursor: pointer;
        background-color: #ec6538;
        border: none;
        &:focus{
          outline: none;
        }
        &:active{
          background-color: #cd562e;
        }
      }
    }
  }

</style>
