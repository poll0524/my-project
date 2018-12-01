<template>
  <div class="center-calc box-maxWidth">
      <div class="case-content">
        <div class="header">
          <p class="case-title">{{singleCaseConten.title}}</p>
        </div>
        <div class="content" v-html="singleCaseConten.content">

        </div>
      </div>
  </div>
</template>


<script>
  import {axiosReqGet} from '../../assets/js/public'
    export default {
      name: "caseContent",
      data(){
        return{
          singleCaseConten:{}
        }
      },
      methods:{
        achievecase(caseId){
          let url = 'article?id='+caseId;
          axiosReqGet(url,this.sucFun,null);
        },
        sucFun(param){

          this.singleCaseConten = param.data;
        }
      },
      mounted(){
        this.achievecase(this.$route.query.id);
      }
    }
</script>

<style scoped lang="less">
  .case-content{
    margin: 40px 0;
    box-shadow: 0 0 10px #aaa inset;
    padding: 50px 200px;
    border-radius: 5px;
    font-family: "宋体";
    .case-title{
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
</style>
