<template>
  <div style="position: relative">
    <remankItem v-if="remarkTextFlag" :remarkText="remarkText"></remankItem>
    <div :class="[remarkTextFlag?'identificaPass':'identificaPass2']">{{certifyText}}</div>
    <div class="identificaPic">
      <div class="certif-box">
        <p>{{statusObjData.frontText}}</p>
        <div class="certif-pic">
          <img :src="statusObjData.front" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input" type="file" accept="image/*" @change="fileInputChange('front')">
        </div>
      </div>
      <div class="certif-box">
        <p>{{statusObjData.backText}}</p>
        <div class="certif-pic">
          <img :src="statusObjData.back" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input" type="file" accept="image/*" @change="fileInputChange('back')">
        </div>
      </div>
      <div class="certif-box">
        <p>{{statusObjData.withFaceText}}</p>
        <div class="certif-pic">
          <img :src="statusObjData.with_face" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input" type="file" accept="image/*" @change="fileInputChange('with_face')">
        </div>
      </div>

      <div class="certif-box" v-if="companyFlag">
        <p>上传企业营业执照</p>
        <div class="certif-pic business_licence">
          <img :src="statusObjData.business_license" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input" type="file" accept="image/*" @change="fileInputChange('business_license')">
        </div>
      </div>
      <div class="certif-box" v-if="brokerFlag">
        <p>经纪人资格证内页正面</p>
        <div class="certif-pic">
          <img :src="statusObjData.broker_certificate" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input" type="file" accept="image/*" @change="fileInputChange('broker_certificate')">
        </div>
      </div>
      <!--<div class="certif-box" v-if="brokerFlag">
        <p>经纪人资格证内页反面</p>
        <div class="certif-pic">
          <img :src="statusObjData.brokerBack" alt="">
          <span class="upload-btn"></span>
          <input class="upload-input" type="file" accept="image/*" @change="fileInputChange('brokerBack')">
        </div>
      </div>-->
      <div class="certif-box" v-if="groupFlag">
        <p>上传团队资质证明</p>
        <div class="certif-pic">
          <img :src="statusObjData.team_qualification" alt="">
          <span v-if="onlyReadFalg" class="upload-btn"></span>
          <input v-if="onlyReadFalg" class="upload-input"  type="file" accept="image/*" @change="fileInputChange('team_qualification')">
        </div>
      </div>
      <div class="certif-box">
        <button v-if="onlyReadFalg" type="button" @click="applyRealName">提交认证</button>
      </div>
      <div>
        <ModalItem
          :showModal="identificaHintFalg"
          @changheHintBoxShow = "changheHintBoxShow"
        >
          <div slot="body">
            {{hintText}}
          </div>
        </ModalItem>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters,mapActions} from "vuex"
  import {getToken,axiosReqPost,base64_encode,axiosReqGet} from '../../../assets/js/public'

  import ModalItem from '../../publicModalComponents/publicModal'

  import remankItem from '../remarkComponents'

    export default {
        name: "identificaPic",
        props:{
          'parentStatusObjData':{type:Object}
        },
        components:{ModalItem,remankItem},
        data(){
          return{
            actorFlag:false,
            groupFlag:false,
            sponsorFlag:false,
            brokerFlag:false,
            companyFlag:false,
            onlyReadFalg:true,
            groupUpload:[
              {imgText:"团长身份证头像面",imgFace:"front",imgurl:"../../../../static/images/front.png"},
              {imgText:"团长身份证国徽面",imgFace:"back",imgurl:"../../../../static/images/back.png"},
              {imgText:"团长手持身份证头像面",imgFace:"with_face",imgurl:"../../../../static/images/with_face.png"},
            ],
            singleUpload:[
              {imgText:"本人身份证头像面",imgFace:"front",imgurl:"../../../../static/images/front.png"},
              {imgText:"本人身份证国徽面",imgFace:"back",imgurl:"../../../../static/images/back.png"},
              {imgText:"本人手持身份证头像面",imgFace:"with_face",imgurl:"../../../../static/images/with_face.png"},
            ],
            statusArrData:null,
            apply_type:null,
            statusObjData:{
              front:'https://icon.maxbutterfly.com/static/icon/front.png',
              back:"https://icon.maxbutterfly.com/static/icon/back.png",
              with_face:"https://icon.maxbutterfly.com/static/icon/with_face.png",
              business_license:"https://icon.maxbutterfly.com/static/icon/business_licence.png",
              brokerBack:'https://icon.maxbutterfly.com/static/icon/broker_back.png',
              team_qualification:'https://icon.maxbutterfly.com/static/icon/group_certify.png',
              broker_certificate:'https://icon.maxbutterfly.com/static/icon/broker_front.png',
              frontText:null,
              backText:null,
              withFaceText:null,
            },
            identificaHintFalg:false,
            hintText:null,
            remarkText:null,//拒绝原因提示
            remarkTextFlag:false,//拒绝标志
            certifyText:null// 是否通过
          }
        },
        computed:{
          ...mapGetters({
            identificaImgData:'identificaImgData'
          })
        },
        methods:{
          judgestatus(){
            this.statusObjData.frontText = this.parentStatusObjData.frontText;
            this.statusObjData.backText = this.parentStatusObjData.backText;
            this.statusObjData.withFaceText = this.parentStatusObjData.withFaceText;
            // this.apply_type = this.parentStatusObjData.status;
            switch(this.parentStatusObjData.status)
            {
              case 'sponsorCompany':
                this.companyFlag=true;
                this.apply_type = 'sponsor_company'
                // this.statusObjData.frontText = this.parentStatusObjData.frontText;
                break;
              case 'sponsor':
                this.sponsorFlag = true;
                this.apply_type = 'sponsor'
                // this.statusObjData.backText = this.parentStatusObjData.backText;
                break;
              case 'artist':
                this.actorFlag = true;
                this.apply_type = 'artist'
                // this.statusObjData = this.parentStatusObjData;
                break;
              case 'group':
                this.groupFlag = true;
                this.apply_type = 'group'
                // this.statusObjData = this.parentStatusObjData;
                break;
              case 'planningCompany':
                this.companyFlag = true;
                this.apply_type = 'broker_company'
                // this.statusObjData = this.parentStatusObjData;
                break;
              case 'broker':
                this.brokerFlag = true;
                this.apply_type = 'broker'
                // this.statusObjData = this.parentStatusObjData;
                break;
            }

          },
          //选择照片
          fileInputChange(value){
            // let testInput = document.querySelectorAll('.upload-input');
            let uri = 'resource/image?apply_type='+this.apply_type+'&resource_type=4&certify_type='+value;
            let token = getToken();
            const that = this
            const formData = new FormData();
            formData.append('file',event.target.files[0])
            if(event.target.files[0]){
              axiosReqPost(uri,function (param) {

                if(param){
                  that.statusObjData[value]=param.image_url+'?id='+Math.random();
                  that.pushIdentificaImgUrl([value,param.image_url])
                }
              },token,formData,null,null)
            }

            // const file = event.target.files[0]
            // const reader = new FileReader();
            // const that = this
            // reader.readAsDataURL(file);
            // reader.onload = function(){
            //   that.statusObjData[value]=this.result
            //   // console.log(this.result)
            // }
          },

          //点击上传
          applyRealName(){

            let uri = 'certify/'+this.apply_type;
            let token = getToken();
            const that= this;
            const bodyValue = base64_encode(encodeURIComponent(JSON.stringify({'photos':JSON.stringify(this.identificaImgData)})));

            axiosReqPost(uri,function (param) {
              that.changheHintBoxShow('上传实名认证资料成功，请等待审核结果！')
              that.onlyReadFalg = false;
             // location.reload();
              this.certifyText = '已提交'

            },token,bodyValue,null,function (param) {

            });
          },

          ...mapActions({
            pushIdentificaImgUrl:'pushIdentificaImgUrl'
          }),

          /*修改弹框显示*/
          changheHintBoxShow(value){
            this.hintText = value;
            this.identificaHintFalg = !this.identificaHintFalg
          },
          //是否已上传 渲染证件照
          getIdentifiPicData(){
            let uri = 'certify/'+this.apply_type;
            let token = getToken();
            const that = this;
            axiosReqGet(uri,function (param) {

              if(param.idCardCertify){

                param.idCardCertify.result == 'MJ_CERIIFY_EXAMINE_RESULT_TYPE_REJECT'?that.onlyReadFalg=true:that.onlyReadFalg=false;
                that.remarkText = param.idCardCertify.examineComment;
                param.idCardCertify.examineComment ? that.remarkTextFlag = true:that.remarkTextFlag = false;

                that.statusObjData.front = param.idCardCertify.idCardFrontUrl;
                that.statusObjData.back = param.idCardCertify.idCardBackUrl;
                that.statusObjData.with_face = param.idCardCertify.idCardWithFaceUrl;
                that.statusObjData.business_license = param.idCardCertify.businessLicenseUrl;

                that.pushIdentificaImgUrl(['front',param.idCardCertify.idCardFrontUrl]);
                that.pushIdentificaImgUrl(['back',param.idCardCertify.idCardBackUrl]);
                that.pushIdentificaImgUrl(['with_face',param.idCardCertify.idCardWithFaceUrl]);
                that.pushIdentificaImgUrl(['business_license',param.idCardCertify.businessLicenseUrl]);

                const mjCertify = {
                  'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'0',state:'审核中...'},
                  // 'MJ_CERIIFY_EXAMINE_RESULT_TYPE_HANG_UP':{value:'0',state:'审核中...'},
                  'MJ_CERIIFY_EXAMINE_RESULT_TYPE_PASS':{value:'2',state:'审核通过'},
                  'MJ_CERIIFY_EXAMINE_RESULT_TYPE_REJECT':{value:'3',state:'审核被拒绝'},
                  'MJ_CERIIFY_EXAMINE_RESULT_TYPE_UNKNOWN':{value:'4',state:'审核状态未知'}
                }
                that.certifyText = mjCertify[param.idCardCertify.result].state;
              }
            },token)
          }

        },
        mounted(){
          this.judgestatus();
          this.getIdentifiPicData();
        }
    }
</script>

<style scoped lang="less">
    .identificaPic{
        margin: 40px auto 0;
        width: 500px;
      .certif-box{
        text-align: center;
        margin: 40px 0;
        p{
          height: 50px;
          line-height: 50px;
          letter-spacing: 4px;
        }
        .certif-pic{
          width: 500px;
          height: 270px;
          border: 1px solid #ccc;
          border-radius: 5px;
          position: relative;
          .upload-btn{
            display: inline-block;
            width: 150px;
            height: 150px;
            background-image: url("../../../../static/images/camera.png");
            background-size: 100% 100%;
            top: 20%;
            right: 180px;
            z-index: 2;
            position: absolute;
            opacity: .5;
          }
          .upload-input{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 3;
            display: inline-block;
            width: 500px;
            height: 268px;
            opacity: 0;
            cursor: pointer;
          }
        }
        .business_licence{
          height: 536px;
        }
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
      }

  }
    .identificaPass{
      position: absolute;
      right: -17px;
      top: -12px;
      z-index: 13;
      font-size: 20px;
      font-weight: 700;
      color: #ec6538;
      padding: 5px 10px;
      border: 1px solid #ec6538;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      background: #fff;
    }
    .identificaPass2{
      position: absolute;
      right: -17px;
      top: -50px;
      z-index: 13;
      font-size: 20px;
      font-weight: 700;
      color: #ec6538;
      padding: 5px 10px;
      border: 1px solid #ec6538;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      background: #fff;
    }
</style>
