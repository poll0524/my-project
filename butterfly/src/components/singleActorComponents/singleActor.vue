<template>
  <div class="actorInfo-container">
    <SingleInforTop v-if="passValue" :actorInfor="this.actorInfor" />
    <SingleInfoSummary v-if="passValue" :actorInfor="this.actorInfor"/>
    <membersInfo v-if="passValueMembers" :actorInfor="this.actorInfor"/>
    <PerformExoeriences v-if="passValueExoeriences" :actorInfor="this.actorInfor"/>
    <PhotoAlbum v-if="passValue" :actorInfor="this.actorInfor"/>
    <Schedule v-if="passValueSchedule" :actorInfor="this.actorInfor"/>
  </div>
</template>
<script>
  import {axiosReqGet,getToken} from '../../assets/js/public'
  import SingleInforTop from '../singleInfoComponents/singleInforTop'
  import SingleInfoSummary from '../singleInfoComponents/singleInfoSummary'
  import PerformExoeriences from '../singleInfoComponents/performExperiences'
  import PhotoAlbum from '../singleInfoComponents/photoAlbum'
  import membersInfo from '../singleInfoComponents/membersInfo'
  import Schedule from '../singleInfoComponents/scheduleComponents'


  export  default {
    name:'singleActor',
    components:{SingleInforTop,SingleInfoSummary,PerformExoeriences,PhotoAlbum,membersInfo,Schedule},
    data(){
      return{
        actorInfor:null,
        actorSummary:null,
        passValue:false,
        passValueExoeriences:false,
        passValueAlbum:false,
        passValueSchedule:false,
        passValueMembers:false,

      }
    },
    methods:{
      achieveSingle(){
        const url = 'certify/artist/'+this.$route.query.id;
        const token = getToken();
        axiosReqGet(url,this.sucFun,token);
      },
      sucFun(param) {
        this.actorInfor = param;
        this.passValue = true;
        (param.artistPerformanceExperiences&&param.artistPerformanceExperiences!==[])?this.passValueExoeriences=true:this.passValueExoeriences=false;
        (param.artistGroupMemberSet&&param.artistGroupMemberSet!==[])?this.passValueMembers=true:this.passValueMembers=false;
        param.artistSchedule?this.passValueSchedule=true:this.passValueSchedule=false;
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

  .actorInfo-container{
    min-height: calc(100vh - 222px);
    padding: 100px 0 0;
  }

</style>
