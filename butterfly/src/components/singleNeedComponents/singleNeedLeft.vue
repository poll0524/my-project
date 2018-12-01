<template>
  <div class="needLift-container" v-if="needPublisherFlage">
    <div class="needLift-top">
      <p class="needLift-title"><span>发布此需求的服务商</span></p>
      <div class="publish-info">
        <div class="avatar">
          <img v-if="avatarFlage" :src="avatrUrl" alt="">
          <img v-if="!avatarFlage" src="../../../static/images/default_avatar.png" alt="">
        </div>
        <div>
          <p class="name">{{needPublisher.simpleName}}</p>
          <p class="hometown">{{needPublisher.certifies[0].hometown}}</p>
        </div>
      </div>
      <div class="publish-grade">
        平台信誉分 <span>{{needPublisher.creditScore}}分</span>
      </div>
    </div>

    <div class="needLift-bottom">
      <p class="needLift-title"><span>热门需求</span></p>
      <router-link tag="div" :to="{path:'/needInfo',query:{id:item.id}}" :key="index"  class="needLift-bottom-content" v-for="(item,index) in hotNeedsList">
        <p><span class="need-title">{{item.title}}</span>报价：<span class="need-price">￥{{item.budget}}</span></p>
        <p class="need-type">{{item.type}}</p>
        <p><span class="need-number">已确定{{item.cooperatedNumber}}人</span><span class="need-time">{{item.deadline}}</span></p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {getToken,axiosReqGet,formatTime} from '../../assets/js/public'
    export default {
      name: "singleNeedLeft",
      props:{needInfor:Object},
      data(){
        return{
          avatarFlage:false,
          avatrUrl:null,
          needPublisher:null,
          needPublisherFlage:false,
          hotNeedsList:[]
        }
      },
      methods:{
        achieveNeedContent(param){

          if(param.publisher){
            this.needPublisher = param.publisher;
            this.needPublisherFlage = true;
            this.avatarFlage = param.publisher.avatar?true:false
            this.avatrUrl = param.publisher.avatar
          }

        },
        getAllNeedList() {
          let url = 'demand?role=02,08,09,10,11&sift=&sort=';
          let token = getToken();
          axiosReqGet(url, (params)=>{
            this.hotNeedsList = params.content;
            this.hotNeedsList.forEach((item) =>{
              item.deadline = formatTime(item.deadline,'-').split(' ')[0];
            })
          },token,(params)=>{
            // console.log(params.response.data.message)
          })
        }
      },
      mounted(){
        this.achieveNeedContent(this.needInfor);
        this.getAllNeedList();
      },
      watch:{
        // 如果路由有变化，会再次执行该方法
        "$route"(){
          location.reload();
        }
      }
    }
</script>

<style scoped lang="less">
  .needLift-container{
    width: 340px;
    min-height: 750px;
    .needLift-top{
      background-color: #fff;
      padding-bottom: 20px;
      .needLift-title{
        width: 320px;
        margin: 0 auto;
        padding: 15px 10px 5px;
        border-bottom: 1px solid #ec6538;
        span{
          text-indent: 10px;
          font-size: 16px;
          display: inline-block;
          border-left: 3px solid #ec6538;
        }
      }
      .publish-info{
        display: flex;
        align-items: center;
        padding: 30px 20px 20px 30px;
        .avatar,img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .noavatar{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-image: url("../../assets/img/userImg.jpg");
          background-repeat: no-repeat;
          background-size: 100%;
        }
        div{
         text-indent: 10px;
          .name{
            font-size: 18px ;
            letter-spacing: 4px;
          }
          .hometown{
            padding-top: 10px;
            font-size: 12px;
          }
        }
      }
      .publish-grade{
        height: 80px;
        width: 300px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        letter-spacing: 2px;
        background-color: #333333;
        span{
          display: inline-block;
          text-align: center;
          width: 80px;
          color: #ec6538;
        }
      }
    }
    .needLift-bottom{
      background-color: #fff;
      margin: 10px 0 0;
      padding-bottom: 10px;
      height: 470px;
      overflow: auto;

      .needLift-title{
        width: 320px;
        margin: 0 auto;
        padding: 15px 10px 5px;
        border-bottom: 1px solid #ec6538;
        span{
          text-indent: 10px;
          font-size: 16px;
          display: inline-block;
          border-left: 3px solid #ec6538;
        }
      }
      .needLift-bottom-content{
        color: #191b2e!important;
        width: 320px;
        margin: 10px auto;
        padding: 5px;
        box-shadow: 1px 1px 2px #ccc;
        .need-title{
          display: inline-block;
          vertical-align: bottom;
          width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover{
            color: #ec6538;
          }
        }
        .need-type,.need-number,.need-time,.need-price{
          font-size: 12px;
        }
        .need-price{
          color: #ec6538;
        }
        .need-type{
          padding: 5px 0;
        }
        .need-number {
          display: inline-block;
          vertical-align: bottom;
          width: 180px;
        }
      }
    }
  }

</style>
