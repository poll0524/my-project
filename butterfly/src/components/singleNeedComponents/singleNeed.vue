<template>
  <div class="need-bg">
    <div class="need-container">
      <SingleNeedRight v-if="passValue" :needInfor="needInfor"/>
      <SingleNeedLeft v-if="passValue" :needInfor="needInfor"/>
    </div>
  </div>
</template>

<script>
  import {axiosReqGet,getToken} from '../../assets/js/public'
  import SingleNeedRight from './singleNeedRight'
  import SingleNeedLeft from './singleNeedLeft'
  export default {
      name: "singleNeed",
      components:{SingleNeedRight,SingleNeedLeft},
      data(){
        return{
          needInfor:null,
          passValue:false
        }
      },
      methods:{
        achieveSingle(){
          const url = 'demand/'+this.$route.query.id;
          const token = getToken();
          axiosReqGet(url,this.sucFun,token);
        },
        sucFun(param){
          this.needInfor = param;
          this.passValue = true;
        }
      },
      mounted(){
        this.achieveSingle();
        if(!getToken()){
          location.href = "#/login"
        }
      }
    }
</script>

<style scoped lang="less">
  .need-bg{
    min-height: 1000px;
    background-color: #f2f2f2;
    .need-container{
      width: 1200px;
      margin: 10px auto;
      padding: 100px 0 0;
      display: flex;
      justify-content: space-between;
    }
  }


</style>
