<template>
  <div>
    <IdentificaPic :parentStatusObjData="statusObjData"></IdentificaPic>
    <div class="btn-box">
      <!--<button type="button" @click="stepsToChange({idx:0})">上一步</button>-->
    </div>

  </div>
</template>

<script>
  import IdentificaPic from '../publicApplyComponents/identificaPic'
  export default {
    components:{IdentificaPic:IdentificaPic},
    data(){
      return{
        statusObjData:{
          status:'broker',
          frontText:"上传本人身份证头像面",
          backText:"上传本人身份证国徽面",
          withFaceText:"上传本人手持身份证头像面"
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

<style scoped lang="less">
  button{
    width: 150px;
    height: 40px;
    background-color: #ec6538;
    border: none;
    color: #fff;
    &:active{
      background-color: #cd562e;
    }
    &:focus{
      outline: none;
    }
  }

</style>
