<template>
  <div>
    <TitleItem titleName="策划公司实名"></TitleItem>
    <IdentificaPic :parentStatusObjData="statusObjData"></IdentificaPic>
  </div>
</template>

<script>
  import IdentificaPic from '../publicApplyComponents/identificaPic'
  import TitleItem from '../titleNameComponents'


  export default {
    name:"CompanyRealname",
    components:{IdentificaPic:IdentificaPic,TitleItem:TitleItem},
    data(){
      return{
        statusObjData:{
          status:'planningCompany',
          frontText:"法人身份证头像面",
          backText:"法人身份证国徽面",
          withFaceText:"法人手持身份证头像面"
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
