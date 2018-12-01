<template>
  <div>
    <TitleItem
      :titleName="titleName"
    />
    <RemarkItem
      :remarkText="remarkText"/>
    <ApplyStep
      :stepsTextData="stepsTextData"
    />
    <BrokerFirst v-if="showstepActiveIndex == 0"/>
    <BrokerSecond v-if="showstepActiveIndex == 1"/>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";

  import ApplyStep from '../publicApplyComponents/applySteps'
  import TitleItem from '../titleNameComponents'
  import RemarkItem from '../remarkComponents'

  import BrokerFirst from './brokerFirstStep'
  import BrokerSecond from './brokerSecond'
    export default {
        name: "broker",
        data(){
          return{
            titleName:'经纪人申请',
            stepsTextData:['填写信息','上传相关资质','待审核','申请成功'],
            remarkText:"请仔细填写主办方信息，上传相关资质，方便艺人更快找到您"
          }
        } ,
        components:{
          ApplyStep,
          TitleItem,
          RemarkItem,
          BrokerFirst,
          BrokerSecond
      },
      computed:{
        ...mapGetters({
          showstepActiveIndex:'showstepActiveIndex'
        })
      },
      methods:{
        ...mapActions({
          initToSteps:'initToSteps'
        })
      },
      mounted(){
        this.initToSteps()
      }

    }
</script>

<style scoped lang="less">

</style>
