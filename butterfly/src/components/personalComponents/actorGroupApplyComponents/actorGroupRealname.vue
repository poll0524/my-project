<template>
  <div>
    <TitleItem titleName="艺人团队实名"></TitleItem>
    <IdentificaPic :parentStatusObjData="statusObjData"></IdentificaPic>
  </div>
</template>

<script>
  import IdentificaPic from '../publicApplyComponents/identificaPic'
  import TitleItem from '../titleNameComponents'


  export default {
    name:"ActorGroupRealname",
    components:{IdentificaPic:IdentificaPic,TitleItem:TitleItem},
    data(){
      return{
        statusObjData:{
          status:'group',
          frontText:"团长身份证头像面",
          backText:"团长身份证国徽面",
          withFaceText:"团长手持身份证头像面"
          // statusArrData:[
          //   {imgText:"上传法人身份证头像面",imgFace:"front",imgurl:"../../../../static/images/front.png"},
          //   {imgText:"上传法人身份证国徽面",imgFace:"back",imgurl:"../../../../static/images/back.png"},
          //   {imgText:"上传法人手持身份证头像面",imgFace:"with_face",imgurl:"../../../../static/images/with_face.png"},
          // ],
        }

      }
    }

  }
</script>

<style>

</style>
