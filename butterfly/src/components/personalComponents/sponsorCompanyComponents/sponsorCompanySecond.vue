<template>
    <div>
        <IdentificaPic :parentStatusObjData="statusObjData"></IdentificaPic>
    </div>
</template>

<script>
  import IdentificaPic from '../publicApplyComponents/identificaPic'
    export default {
        name: "sponsorCompanySecond",
        components:{IdentificaPic:IdentificaPic},
        data(){
          return{
            statusObjData:{
              status:'sponsorCompany',
              frontText:"上传法人身份证头像面",
              backText:"上传法人身份证国徽面",
              withFaceText:"上传法人手持身份证头像面"
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

<style scoped>

</style>
