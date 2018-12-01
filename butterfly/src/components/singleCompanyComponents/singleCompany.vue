<template>
  <div class="companyInfo-container">
    <SingleInforTop v-if="this.passValue" :actorInfor="this.actorInfor" />
    <SingleInfoSummary v-if="this.passValue" :actorInfor="this.actorInfor"/>
    <PerformExoeriences v-if="this.passValue" :actorInfor="this.actorInfor"/>
    <PhotoAlbum v-if="this.passValue" :actorInfor="this.actorInfor"/>
  </div>

</template>

<script>
  import {axiosReqGet,getToken} from '../../assets/js/public'
  import SingleInforTop from '../singleInfoComponents/singleInforTop'
  import SingleInfoSummary from '../singleInfoComponents/singleInfoSummary'
  import PerformExoeriences from '../singleInfoComponents/performExperiences'
  import PhotoAlbum from '../singleInfoComponents/photoAlbum'
    export default {
      name: "singleCompany",
      components:{SingleInforTop,SingleInfoSummary,PerformExoeriences,PhotoAlbum},
      data(){
        return{
          actorInfor:null,
          actorSummary:null,
          passValue:false
        }
      },
      methods:{
        achieveSingle(){
          const url = 'certify/broker_company/'+this.$route.query.id;
          const token = getToken();
          axiosReqGet(url,this.sucFun,token);
        },
        sucFun(param){
          this.actorInfor = param;
          this.passValue = true;
        }
      },
      mounted(){
        this.achieveSingle();
        if(!document.cookie.token){
          location.href = "#/login"
        }

      }
    }
</script>

<style scoped lang="less">
  .companyInfo-container{
    min-height: calc(100vh - 225px);
    padding: 100px 0 0;
  }
</style>
