<template>
  <div>
    <TitleItem titleName="联系客服"/>
    <div v-for="item in contactData"  class="contactContent">
        <p class="contactText">{{item.contactText}}</p>
        <p class="contactInfo">{{item.contactInfo}}</p>
    </div>
  </div>
</template>

<script>
  import TitleItem from '../titleNameComponents'

  export default {
        name: "contactService",
        components:{TitleItem},
        data(){
          return{
            contactData:[
              {contactText:'客服热线:',contactInfo:'028-87570260'},
              {contactText:'客服QQ:',contactInfo:'2682882217'},
              {contactText:'客服邮箱:',contactInfo:'2682882217@qq.com'},
              {contactText:'服务时间:',contactInfo:'09:00-17:30（节假日以公告服务时间为准）'},
            ]
          }
        }
    }
</script>

<style scoped lang="less">
  .contactContent{
    width: 600px;
    margin: 50px auto;
    p{
      line-height: 30px;
      height: 30px;
    }
    .contactInfo{
      height: 20px;
      line-height: 20px;
      color: #aaa;
      text-indent: 20px;
    }
  }
</style>
