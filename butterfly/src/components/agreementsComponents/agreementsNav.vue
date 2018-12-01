<template>
    <div class="nav-box">
      <ul class="nav-tabs-box" >
        <li><router-link to="/serviceAgreement" tag="div" class="nav-tabs">服务协议</router-link></li>
        <li v-for="item in linkData_0" v-if="item.link"><router-link :to="item.link.split('#/')[1]" tag="div" class="nav-tabs">{{item.title}}</router-link></li>
        <!--<li v-for="item in linkData_1"><router-link :to="item.link.split('#/')[1]" tag="div" class="nav-tabs">{{item.title}}</router-link></li>-->
        <li v-for="item in linkData_2" v-if="item.link"><router-link :to="item.link.split('#/')[1]" tag="div" class="nav-tabs">{{item.title}}</router-link></li>
        <!--<li v-for="item in linkData_3"><router-link :to="item.link.split('#/')[1]" tag="div" class="nav-tabs">{{item.title}}</router-link></li>-->
      </ul>
    </div>
</template>

<script>
  import {getPublicConfigData} from '../../assets/js/public'
    export default {
        name: "agreementsNav",
        data(){
          return{
            navArr:[
              {navText:'服务协议',navLink:'/serviceAgreement'}
            ],
            linkData_0:[],
            linkData_1:[],
            linkData_2:[],
            linkData_3:[],
          }
        },
        mounted(){
          //获取底部导航的菜单栏数据
          getPublicConfigData('system_footerNav',(params)=>{
            let footerNavArrData = JSON.parse(params.data);

            this.linkData_0 = footerNavArrData[0]
            this.linkData_1 = footerNavArrData[1]
            this.linkData_2 = footerNavArrData[2]
            this.linkData_3 = footerNavArrData[3]

          },null,(params)=>{

          })
        }
    }
</script>

<style scoped lang="less">
  .nav-box{

    .nav-tabs-box{
      background-color: #191b2e;
      width: 250px;
      height: 100%;
      padding: 100px 20px;
      li{
        text-align: center;
        margin: 10px 0;
        cursor: pointer;
        color: #fff;

      }
      .nav-tabs{

        &:hover{
          text-decoration: underline;
        }
      }
      div{
        color: #fff!important;
      }
    }

  }

</style>
