<template>
  <div v-show="brokerFirstflag" class="broker-first">
    <form action="">
      <div class="apply-box">
        <span class="input-name">姓&emsp;&emsp;名</span>
        <div class="input-box">
          <input maxlength="15" type="text" name="" v-model="brokerInfo.name" placeholder="请输入您的真实姓名,2-15个汉字">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">性&emsp;&emsp;别</span>
        <div class="input-box select-box">
          <select name="" id=""  v-model="brokerInfo.gender">
            <option value="0" selected disabled>请选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
          <span class="inp-arrow broker-inp-arrow"></span>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">所属公司</span>
        <div class="input-box select-box">
          <select name="" id="" v-model="brokerInfo.belongedCompany">
            <option value="0" selected disabled>请选择</option>
            <option value="1">公司1</option>
            <option value="2">公司2</option>
          </select>
          <span class="inp-arrow broker-inp-arrow"></span>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">出生年月</span>
        <div class="input-box">
          <Datepicker :language="languages.zh" v-model="brokerBirthday" format="yyyy-MM-dd"/>
          <span class="inp-arrow broker-inp-arrow"></span>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">所在城市</span>
        <div class="input-box city-box">
          <v-distpicker @selected="onSelected"></v-distpicker>
          <span class="inp-arrow basic-inp-arrow"></span>
          <span class="inp-arrow basic-inp-arrow"></span>
          <span class="inp-arrow basic-inp-arrow"></span>

        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">个人简介</span>
        <div class="input-box textarea-box">
          <textarea name="" id="" cols="30" rows="10" v-model="brokerInfo.intro" placeholder="请用一段话介绍自己，字数不得超过250字"></textarea>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"></span>
        <div class="btn-box">
          <button type="button" @click="stepsToChange({idx:0})">上一步</button>
          <button type="button" @click="this.achievebrokerInfo">下一步</button>
          <!--<router-link to="/brokerSecond" tag="button" @click="this.achievebrokerInfo"></router-link>-->
        </div>
      </div>
    </form>
  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import * as lang from "vuejs-datepicker/src/locale";

  import {mapGetters,mapActions} from "vuex";




  export default {
    name:"BrokerFirstStep",
    data(){
      return{
        brokerFirstflag:true,
        brokerBirthday:null,
        brokerInfo:{
          name:null,
          gender:0,
          belongedCompany:null,
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
      mapGetters,
      mapActions,
    },
    methods:{
      ...mapActions({
        stepsToChange:'stepsToChange',
      }),
      achievebrokerInfo(){
        // this.brokerFirstflag = !this.brokerFirstflag
        // this.brokerInfo.birthday = (this.brokerBirthday).valueOf();
        this.stepsToChange({data:this.brokerInfo,idx:1,type:'broker'});
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
  .broker-first{
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
        .broker-inp-arrow{
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

      .basic-inp-arrow{
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
