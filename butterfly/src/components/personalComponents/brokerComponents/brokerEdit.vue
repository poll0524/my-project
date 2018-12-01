<template>
    <div>
      <TitleName titleName="经纪人资料"/>
      <div class="broker-editcontent">
        <PublicPerson headName="经纪人信息" blockType="info" v-if="!showPerInfoFlag" >
          <div slot='content' class="flex-content flex">
            <div class="flex-box flex">
              <div class="flex-item">
                <label for="">姓　　名</label>
                <span>黄大仙</span>
              </div>
            </div>

            <div class="flex-box flex">
              <div class="flex-item">
                <label for="">性　　别</label>
                <span>女</span>
              </div>
            </div>
            <div class="flex-box flex">
              <div class="flex-item">
                <label for="">所属公司</label>
                <span>成都迈嘉网络技术有限公司</span>
              </div>
            </div>
            <div class="flex-box flex">
              <div class="flex-item">
                <label for="">出生年月</label>
                <span>1995.05.02</span>
              </div>
            </div>
            <div class="flex-item flex-col">
              <label for="">所在城市</label>
              <span>四川省成都市高新区益州大道北段333号</span>
            </div>

            <div class="flex-item flex-col">
              <label for="">个人简介</label>
              <span class="flex-desc">这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介这是一个简介。</span>
            </div>
          </div>
        </PublicPerson>
        <div class="broker-edit-infomation">
          <PersonalInfo v-if="showPerInfoFlag"/>
          <ControlBtn v-if="showPerInfoFlag" type="info"/>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";

  import ControlBtn from '../publicEditComponents/publicControBtns'
  import PersonalInfo from '../sponsorComponents/sponsorFirstApply'

  import PublicPerson from '../publicEditComponents/publicPersonalInfo'
  import TitleName from '../titleNameComponents'

  export default {
        name: "brokerEdit",
        components:{
          PublicPerson,
          TitleName,
          ControlBtn,
          PersonalInfo,
        },
        computed:{
          ...mapGetters({
            showPerInfoFlag:'showPerInfoFlag',
          })
        },
        methods:{
          ...mapActions({

          })
        }
    }
</script>

<style lang="less">
  .broker-editcontent{
    padding: 20px;
    .flex-content{
      flex-direction: column;
      border-bottom: 2px dashed #999;
      padding: 0 40px;
      .flex-box,.flex-col{
        margin-bottom: 20px;
      }
      label{
        margin-right: 20px;
        width: 60px;
        overflow: hidden;
      }
      .flex-box{
        justify-content: space-between;
        align-items: center;
      }
      .flex-item{
        display: flex;
        justify-content: flex-start;
        span{
          min-width: 100px;
        }
        .flex-desc{
          flex:1;

        }
      }
    }
  }
  .broker-edit-infomation{
    .btn-box {
      display: none;
    }
  }

</style>
