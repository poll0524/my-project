<template>
    <div class="sponsor-apply">

      <TitleItem
        :titleName="titleName"
      />
      <RemarkItem
        :remarkText="remarkText"/>
      <ApplyStep
        :stepsTextData="stepsTextData"
      />
      <SponsorFirst v-if="showstepActiveIndex == 0"/>
      <SponsorSecond v-if="showstepActiveIndex == 1"/>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";

    import ApplyStep from '../publicApplyComponents/applySteps'
    import TitleItem from '../titleNameComponents'
    import RemarkItem from '../remarkComponents'

    import SponsorFirst from './sponsorFirstApply'
    import SponsorSecond from './sponsorSecond'

    export default {
        name: "sponsor",
        data(){
          return{
            titleName:'主办方个人申请',
            stepsTextData:['填写信息','上传相关资质','待审核','申请成功'],
            remarkText:"请仔细填写主办方信息，上传相关资质，方便艺人更快找到您"
          }
        } ,
        components:{
          ApplyStep,
          TitleItem,
          RemarkItem,
          SponsorFirst,
          SponsorSecond
        },
        methods:{
          changetitle(param){
          },
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

<style scoped lang="less">

</style>
