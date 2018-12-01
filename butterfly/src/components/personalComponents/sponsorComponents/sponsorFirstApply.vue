<template>
  <div v-show="sponsorFirstflag" class="sponsor-first">
    <form action="">
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>姓&emsp;&emsp;名</span>
        <div class="input-box">
          <input maxlength="15" type="text" v-model="sponsorInfo.name" placeholder="请输入您的真实姓名,2-15个汉字">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>性&emsp;&emsp;别</span>
        <div class="input-box select-box">
          <select name="" id=""  v-model="sponsorInfo.gender">
            <option value="0" selected disabled>请选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
          <span class="inp-arrow sponsor-inp-arrow"></span>
        </div>

      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>出生年月</span>
        <div class="input-box">
          <Datepicker :language="languages.zh" v-model="sponsorBirthday" format="yyyy-MM-dd"/>
          <span class="inp-arrow sponsor-inp-arrow"></span>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>所在城市</span>
        <div class="input-box city-box">
          <v-distpicker @selected="onSelected"></v-distpicker>
          <span class="inp-arrow sponsor-inp-arrow"></span>
          <span class="inp-arrow sponsor-inp-arrow"></span>
          <span class="inp-arrow sponsor-inp-arrow"></span>

        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">个人简介</span>
        <div class="input-box textarea-box">
          <textarea name="" id="" cols="30" rows="10" v-model="sponsorInfo.intro" placeholder="请用一段话介绍自己，字数不得超过250字"></textarea>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"></span>
        <div class="btn-box">
          <button @click="achieveSponsorInfo">下一步</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import * as lang from "vuejs-datepicker/src/locale";

  import {mapGetters,mapActions} from "vuex";


  import address from '../../../assets/js/address.js'
  import LinkageItem from '../../linkageComponents/linkageComponents'

    export default {
        name: "sponsorFirstApply",
        data(){
          return{
            sponsorFirstflag:true,
            sponsorBirthday:null,
            sponsorInfo:{
              name:null,
              gender:0,
              birthday:null,
              hometown:null,
              intro:null,
            },
            languages: lang,
            propsFlag:false,
            addressData:[],
            cityIdx:0
          }
        },
        components:{
          Datepicker,
          LinkageItem,

        },
        methods:{
          ...mapActions({
            stepsToChange:'stepsToChange',
          }),
          achieveSponsorInfo(){
            this.stepsToChange({data:this.sponsorInfo,idx:1,type:'sponsor'});
            //console.log(this.sponsorBirthday);
          },
          onSelected(data) {
            // alert(data.province + ' | ' + data.city + ' | ' + data.area)
            this.brokerInfo.hometown = data.province.value + ',' + data.city.value + ',' + data.area.value
          },
        },
        mounted(){

        }

    }
</script>

<style lang="less">


  .sponsor-first{
    /*必填*/
    .mustFill{
      color: #ec6538;
      display: inline-block;
      vertical-align: middle;
      line-height: 1px;
      letter-spacing: 5px;
    }

    input,textarea,select{
      &:focus{
        outline: none;
      }
      letter-spacing: 2px;
      text-indent: 6px;
      border:1px solid #999;
      border-radius: 4px;
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
      .input-name{
        width: 150px;
        text-align: center;
      }
      .input-box{
        position: relative;

        input{
          position: relative;
          z-index: 1;
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
            width: 130px;
          }
        }
        .sponsor-inp-arrow{
          position: absolute;
          height: 39px;
          width: 40px;
          right: 1px;
          top: 1px;
        }
      }
      .select-box{
        width: 150px;
        select{
          height: 40px;
          width: 150px;
          position: relative;
          z-index: 1;
          appearance:none;
          background: transparent;
        }

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
      select{
        position: relative;
        appearance:none;
        background-color: transparent;
        z-index: 1;
      }
      .sponsor-inp-arrow{
        height: 39px;
        width: 40px;

        &:nth-child(2){
          right: 135px;

        }
        &:nth-child(3){
          right: 269px;
        }
      }
    }
  }
</style>

