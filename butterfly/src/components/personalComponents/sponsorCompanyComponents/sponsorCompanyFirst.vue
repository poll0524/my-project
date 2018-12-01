<template>
  <div v-show="sponsorCompanyFirstflag" class="sponsorCompany-first">
    <form action="">
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>公司全称</span>
        <div class="input-box">
          <input maxlength="" type="text" v-model="sponsorCompanyInfo.name" placeholder="请输入公司的全称">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>公司简称</span>
        <div class="input-box">
          <input type="text" placeholder="请输入公司的简称">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>类&emsp;&emsp;型</span>
        <div class="input-box select-box">
          <select name="" id="">
            <option value="" selected disabled>-请选择-</option>
            <option value="国有企业">国有企业</option>
            <option value="集体所有制">集体所有制</option>
            <option value="私营企业">私营企业</option>
            <option value="股份制企业">股份制企业</option>
            <option value="有限合作企业">有限合作企业</option>
            <option value="联营企业">联营企业</option>
            <option value="外商投资企业">外商投资企业</option>
            <option value="个人独资企业">个人独资企业</option>
            <option value="港、澳、台">港、澳、台</option>
            <option value="股份合作企业">股份合作企业</option>
          </select>
          <span class="inp-arrow sponsor-inp-arrow"></span>
        </div>
      </div>
      <div class="apply-box apply-half-box">
        <span class="input-name"><span class="mustFill">*</span>从业年限</span>
        <div class="input-box">
          <input type="tel"><span class="yearUnit">年</span>
        </div>
      </div>
      <div class="apply-box apply-half-box">
        <span class="input-name"><span class="mustFill">*</span>人数规模</span>
        <div class="input-box">
          <input type="tel"><span class="yearUnit">人</span>
        </div>
      </div>
      <div style="clear: both"></div>
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
        <span class="input-name"><span class="mustFill">*</span>营业执照注册号</span>
        <div class="input-box">
          <input type="text" placeholder="统一社会信用代码">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"><span class="mustFill">*</span>营业执照地址</span>
        <div class="input-box">
          <input type="text">
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name">企业简介</span>
        <div class="input-box textarea-box">
          <textarea name="" id="" cols="30" rows="10" placeholder="请用">

          </textarea>
        </div>
      </div>
      <div class="apply-box">
        <span class="input-name"></span>
        <div class="btn-box">
          <button @click="achieveSponsorCompanyInfo">下一步</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";


  import LinkageItem from '../../linkageComponents/linkageComponents'
    export default {
        name: "sponsorCompanyFirst",
        components:{
          LinkageItem,

        },
        data(){
          return{
            sponsorCompanyFirstflag:true,
            sponsorCompanyInfo:{
              name:null,
              gender:0,
              birthday:null,
              hometown:null,
              intro:null,
            },
            propsFlag:false,
            addressData:[],
            cityIdx:0
          }
        },
        methods:{
          ...mapActions({
            stepsToChange:'stepsToChange',
          }),
          achieveSponsorCompanyInfo(){
            this.stepsToChange({data:this.sponsorCompanyInfo,idx:0,type:'sponsorCompany'});
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
  .sponsorCompany-first{
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
        width: 130px;
        letter-spacing: 2px;
        text-indent: 6px;
        border:1px solid #999;
        border-radius: 4px;
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
      color: #ccc;
    }
      width:600px;
      margin: 40px auto 40px;
      letter-spacing: 2px;
      .apply-box{
        display: flex;
        line-height: 40px;
        margin: 30px 0 0;
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
        }
        .select-box{
          position: relative;
          z-index: 1;
          width: 150px;
          select{
            height: 40px;
            width: 150px;
            appearance:none;
            position: relative;
            z-index: 1;
            background: transparent;
          }

        }
        .sponsor-inp-arrow{
          position: absolute;
          height: 39px;
          width: 40px;
          right: 1px;
          top: 1px;
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
          cursor: pointer;
          &:active{
            background-color: #cd562e;
          }
          &:focus{
            outline: none;
          }
        }
      }
      .apply-half-box{
        width: 250px;
        display: flex;
        justify-content: space-between;
        float: left;
        .input-box{
          position: relative;
          border: 1px solid #546370;

          box-sizing: border-box;
          border-radius: 4px;
          input{
            width: 100px;
            height: 40px;
            border: none;
          }
          .yearUnit{
            display: inline-block;
            width: 38px;
            height: 40px;
            position: absolute;
            top: 0;
            right: 0;
            background-color: #ec6538;
            color: #fff;
            line-height: 40px;
            text-align: center;
          }
        }

      }

      .city-box{
        select{

          appearance:none;
          width: 128px;
          background-color: transparent;
          z-index: 1;
        }
        .sponsor-inp-arrow{
          height: 38px;
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
