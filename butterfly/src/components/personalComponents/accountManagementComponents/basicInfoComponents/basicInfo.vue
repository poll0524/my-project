<template>
  <div>
    <TitleItem titleName="个人信息"/>
    <div v-show="basicFirstflag" class="basic-first">
      <form action="">
        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>账&emsp;&emsp;号</span>
          <div class="input-box">
            <input maxlength="15" type="text" v-model="basicInfo.account" placeholder="请输入6-11位英文、数字或下划线（区分大小写）">
          </div>
        </div>
        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>昵&emsp;&emsp;称</span>
          <div class="input-box">
            <input maxlength="11" type="text" v-model="basicInfo.nick_name" placeholder="昵称请输入2-11位英文、中文、数字或下划线（区分大小写）">
          </div>
        </div>
        <div class="apply-box">
          <span class="input-name">手机号码</span>
          <div class="input-box">
            <input maxlength="11" type="text" v-model="basicInfo.myPhone" readonly>
          </div>
        </div>
        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>性&emsp;&emsp;别</span>
          <div class="input-box select-box">
            <select name="" id=""  v-model="basicInfo.gender">
              <option value="0" disabled>请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            <span class="inp-arrow basic-inp-arrow"></span>
          </div>
        </div>

        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>出生年月</span>
          <div class="input-box">
            <Datepicker
              :language="languages.zh"
              v-model="basicBirthday"
              format="yyyy-MM-dd"
              :disabledDates="disabledDates"
            />
            <span class="inp-arrow basic-inp-arrow"></span>
          </div>
        </div>
        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>所在城市</span>
          <div class="input-box city-box">
            <v-distpicker
              @selected="onSelected"
              @province="changeProvince"
              @city="changeCity"
              :province="basicInfo.selectAddr.province"
              :city="basicInfo.selectAddr.city"
              :area="basicInfo.selectAddr.area"
            ></v-distpicker>
            <span class="inp-arrow basic-inp-arrow"></span>
            <span class="inp-arrow basic-inp-arrow"></span>
            <span class="inp-arrow basic-inp-arrow"></span>

          </div>
        </div>
        <div class="apply-box">
          <span class="input-name"><span class="mainColor">*</span>上传头像</span>
          <div class="input-box file-box" @click="changheHintBoxShow">
            <img :src="avatorImgUrl" alt="">
          </div>
        </div>
        <div class="apply-box">
          <span class="input-name"></span>
          <div class="btn-box" >
            <button type="button" @click="achievebasicInfo">保存</button>
          </div>
        </div>
      </form>
    </div>
    <!--裁剪图片-->
    <div>
      <ModalItem class="cropperBox"
        :showModal="showModalflag"
        @changheHintBoxShow="changheHintBoxShow"
      >
        <div slot="body">
          <PicCropper
            @changheHintBoxShow="changheHintBoxShow"
          />
        </div>
      </ModalItem>
    </div>
    <!--提示-->
    <div>
      <ModalItem class="hintBox"
        :showModal="showHintModalflag"
        @changheHintBoxShow="changheHintShow"
      >
        <div slot="body">
          {{basicHintText}}
        </div>
      </ModalItem>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import * as lang from "vuejs-datepicker/src/locale";
  import {getCurrentRole,regEX,axiosReqPost,axiosReqMethods,getToken,base64_encode,formatTime} from "../../../../assets/js/public"

  import TitleItem from '../../titleNameComponents'

  import ModalItem from '../../../publicModalComponents/publicModal'
  import PicCropper from './picCropper'

  import {mapGetters,mapActions} from "vuex";
  export default {
    name:"BasicInfo",
    data(){
      return{
        basicFirstflag:true,
        basicBirthday:null,
        disabledDates:{
          from:new Date(),
        },
        basicInfo:{
          account:'',
          nick_name:'',
          gender:0,
          myPhone:'',
          birthday:null,
          hometown:null,
          avatar_url:null,
          selectAddr:{
            province:'',
            city:'',
            area:'',
          }
        },
        languages: lang,
        propsFlag:false,
        addressData:[],
        cityIdx:0,
        showModalflag:false,
        showHintModalflag:false,
        basicHintText:null

      }
    },
    components:{
      Datepicker,
      TitleItem,
      ModalItem,
      PicCropper
    },
    methods:{
      changeProvince(){
        this.basicInfo.hometown = null;
      },
      changeCity(){
        this.basicInfo.hometown = null;
      },

      achievebasicInfo(){
        this.basicInfo.avatar_url = this.avatorImgUrl.split('?id')[0];
        this.basicInfo.birthday = this.basicBirthday !=null?Date.parse(this.basicBirthday):null;
        this.basicInfo.hometown && this.basicInfo.hometown.split(',')[0] == '台湾省'?this.basicInfo.hometown = '台湾省':"";
        if(!regEX(this.basicInfo.account).checkAccount || !this.basicInfo.account){
          this.changheHintShow('账号名请输入6-11位英文、数字或下划线（区分大小写）!')
          return
        }else if(!regEX(this.basicInfo.nick_name).checkNickName || !this.basicInfo.nick_name){
          this.changheHintShow('昵称请输入2-11位英文、中文、数字或下划线（区分大小写）!')
          return
        }else if(this.basicInfo.gender == 0 ){
          this.changheHintShow('请选择性别!')
          return
        }else if(!this.basicInfo.birthday){
          this.changheHintShow('请选择出生年月!')
          return
        }else if( this.basicInfo.hometown == null || this.basicInfo.hometown.split(',')[0] =='省'){
          this.changheHintShow('请选择所在城市!')
          return
        }else if(!this.basicInfo.avatar_url){
          this.changheHintShow('请上传头像！')
          return
        }
        let uri = 'user';
        let token = getToken();
        let bodyValue = base64_encode(encodeURIComponent(JSON.stringify(this.basicInfo))) ;
        axiosReqMethods(uri,(param)=>{
            this.changheHintShow(param.message)
        },(param)=>{
          this.changheHintShow(param.response.data.message)
        },token,bodyValue,"PUT");

        // this.basicFirstflag = !this.basicFirstflag
        //console.log(this.basicBirthday);
      },
      onSelected(data) {
        // alert(data.province + ' | ' + data.city + ' | ' + data.area)
        this.basicInfo.hometown = data.province.value + ',' + data.city.value + ',' + data.area.value
      },
      showBasicInfo(){
        const that = this;
          getCurrentRole(function (params) {
            that.basicInfo.myPhone = params.phone;
            that.basicInfo.account = params.account;
            that.basicInfo.nick_name = params.nickName;
            that.basicInfo.gender = params.gender ?params.gender : 0 ;
            that.basicBirthday = formatTime(params.birthday,'-');
            // that.basicInfo.avatar_url = params.avatar;
            that.bindAvatorUrl(params.avatar);
            if(params.hometown){
              that.basicInfo.selectAddr.province = params.hometown.split(',')[0]
              that.basicInfo.selectAddr.city = params.hometown.split(',')[1]
              that.basicInfo.selectAddr.area = params.hometown.split(',')[2]
            }
          });
          // basicInfo.account = ""
          // basicInfo.nickName = ""
      },
      changheHintBoxShow(){

        this.showModalflag = !this.showModalflag;
      },
      changheHintShow(value){
        this.showHintModalflag = !this.showHintModalflag;
        this.basicHintText = value;

      },
      ...mapActions({
        bindAvatorUrl:'bindAvatorUrl'
      })
    },
    computed:{
      ...mapGetters({
        avatorImgUrl:'avatorImgUrl'
      }),
    },
    mounted(){
      this.showBasicInfo()
    }
  }

</script>

<style lang="less">
  .basic-first{
    input,textarea,select{
      appearance:none;
      letter-spacing: 2px;
      text-indent: 6px;
      border:1px solid #999;
      border-radius: 4px;
      position: relative;
      z-index: 1;
      font-size: 14px !important;
      &:focus{
        outline: none;
      }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
      color: #ccc;
    }
    width:600px;
    margin: 40px auto 0;
    .apply-box{
      display: flex;
      line-height: 40px;
      margin-top: 30px;
      .basic-inp-arrow{
        position: absolute;
        height: 39px;
        width: 40px;
        right: 1px;
        top: 1px;
      }
      .input-name{
        width: 150px;
        text-align: center;
      }
      .input-box{
        position: relative;
        input{
          height: 40px;
          width: 400px;
        }
        textarea{
          height: 130px;
          width: 400px;
          resize:none;
        }
        .distpicker-address-wrapper {
          select{
            background: transparent;
            width: 147px;
            overflow: hidden;
          }
        }

      }
      .select-box{
        position: relative;
        width: 150px;
        select{
          height: 40px;
          width: 150px;
          background: transparent;
        }

      }
      .file-box{
        border: 1px solid #ccc;
        width: 150px;
        height: 150px;

      }

      .vdp-datepicker{
        input{
          background:transparent;
          width: 150px;
        }
      }
      .select-container{
        width: 400px;
        .inp-arrow{
          height: 40px;
          width: 40px;
          right: 1px;
        }
      }
      .select-container select{
        background: transparent;
        height: 40px;
        width: 126px;
        border: 1px solid #999;

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
    .city-box{
      .basic-inp-arrow{
        &:nth-child(2){
          right: 152px;
        }
        &:nth-child(3){
          right: 302px;
        }
      }
    }
    .hintBox .modal-container{
      max-width: 300px;
    }
    .mainColor{
      color: #ec6538;
    }
  }
  .cropperBox .modal-container{
    max-width: 900px;
  }

</style>
