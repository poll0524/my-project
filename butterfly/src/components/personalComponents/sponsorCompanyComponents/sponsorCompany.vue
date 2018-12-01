<template>
  <div class="sponsor-company-apply">

    <TitleItem
      :titleName="titleName"
    />
    <RemarkItem
      :remarkText="remarkText"/>
    <ApplyStep
      :stepsTextData="stepsTextData"
    />
    <SponsorCompanyFirst v-if="showstepActiveIndex == 0"/>
    <SponsorCompanySecond v-if="showstepActiveIndex == 1"/>
  </div>
</template>

<script>
  import ApplyStep from '../publicApplyComponents/applySteps'
  import TitleItem from '../titleNameComponents'
  import RemarkItem from '../remarkComponents'

  import SponsorCompanyFirst from './sponsorCompanyFirst'
  import SponsorCompanySecond from './sponsorCompanySecond'

  import {mapGetters,mapActions} from "vuex";

  export default {
        name: "sponsorCompany",
        components:{
          ApplyStep,
          TitleItem,
          RemarkItem,
          SponsorCompanyFirst,
          SponsorCompanySecond
        },
        data(){
          return{
            titleName:'主办方公司申请',
            stepsTextData:['填写信息','上传相关资质','待审核','申请成功'],
            remarkText:"请仔细填写主办方信息，上传相关资质，方便艺人更快找到您"
          }
        } ,
        methods:{
          ...mapActions({
            initToSteps:'initToSteps'
          })
        },
        computed:{
          ...mapGetters({
            showstepActiveIndex:'showstepActiveIndex'
          })
        },
        mounted(){
          this.initToSteps()
        }
    }
</script>

<style scoped>

</style>
