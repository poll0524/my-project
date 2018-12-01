<template>
    <div class="searchPage-container" >
      <searchItem
        @showSearchResult="showSearchResult"
        :sessionSearchValue="sessionSearchValue"
      ></searchItem>
      <div class="searchContent" ref="searchContent">

        <div class="searched-box" v-if="showSearchData.searchContent&&item._source.esType == 'demand'" v-for="item in showSearchData.searchContent">
          <p v-if="item._source">
            <span style="cursor: pointer;text-decoration: underline" v-html="item._source.title" @click="clickNeedTitle(item._source.id)"></span>
            <span class="searchType">需求</span>
          </p>
          <p>
            - 活动时间：<span v-html="item._source.date"></span>
            - 我想要找：<span v-html="item._source.type"></span>
            - 我们的阵容有：<span v-html="item._source.lineUp"></span>
            - 地址：<span v-html="item._source.location"></span>
            - 需求简介：<span v-html="item._source.introduce"></span>
            - 补充信息：<span v-html="item._source.supplement"></span>
            -
          </p>
        </div>

        <div class="searched-box" v-if="showSearchData.searchContent&&item._source.esType == 'user'" v-for="item in showSearchData.searchContent">
          <div class="img-box" style="cursor: pointer" @click="clickActorTitle(item._source.id)">
            <img v-if="item._source.avatar" :src="item._source.avatar" alt="加载失败">
            <img v-if="!item._source.avatar" src="https://icon.maxbutterfly.com/static/icon/default_avatar.png" alt="">
          </div>
          <p>
            <span style="cursor: pointer;text-decoration: underline" @click="clickActorTitle(item._source.id)" v-html="item._source.stage_name?item._source.stage_name:item._source.nickName"></span>
            <span class="searchType">艺人</span>
          </p>
          <p>
            年代：<span v-html="item._source.generation"></span>后
            - 性别：<span v-html="item._source.gender"></span>
            - 昵称 <span v-html="item._source.account"></span>
            - 所在城市：<span v-html="item._source.hometown"></span>
            - 擅长技能：<span v-html="item._source.skills?item._source.skills:item._source.skillsGroup"></span>
            - 简介：<span v-html="item._source.intro"></span> -  - </p>
        </div>

        <div class="no-searched-box" v-if="showSearchData.searchContent == '' || !showSearchData.searchContent ">无结果！</div>
      </div>


      <Pagination
        kindsType="search"
        :filterData="sessionSearchValue"
      />

      <ModalItem
      :showModal="showModal"
      @changheHintBoxShow="changheHintBoxShow"
      >
        <div slot="body">
          {{errModalText}}
        </div>
      </ModalItem>
    </div>
</template>

<script>

  import searchItem from './searchBox'
  import {mapGetters,mapActions} from "vuex"
  import {axiosReqGet,getCurrentRole} from '../../assets/js/public'
  import ModalItem from '../publicModalComponents/publicModal'
  import Pagination from '../paginations/pagination'

  export default {
        name: "searchPage",
        data(){
          return{
            rearchResultContent:null,
            searchValue:null,
            sessionSearchValue:{
              value:null
            },
            showModal:false,
            errModalText:null,
            userRoleInfo:null,
          }
        },
        components:{searchItem,ModalItem,Pagination},
        computed:{
          ...mapGetters({
            showSearchData:'showSearchData'
          })
        },
        methods:{
          ...mapActions({
            publicSearchHandler:"publicSearchHandler"
          }),
        //  渲染数据
          showSearchResult(){
             // this.rearchResultContent = this.showSearchData;
             // this.searchValue = this.showSearchData.searchValue
            //  console.log(this.showSearchData)
            //  console.log(this.$refs.searchContent);
            //  let content = this.$refs.searchContent.innerHTML;
            //
            //  let hitLightText = sessionStorage.getItem('searchValue');
            //
            //  hitLightText.split('').forEach((item)=>{
            //    content = content.replace(item, "<span style='color: #f00!important;font-size: 20px'>"+item+"</span>");
            //
            //  })
            // this.$refs.searchContent.innerHTML = content;
          },

          changheHintBoxShow(errText){
            this.showModal = !this.showModal;
            this.errModalText = errText;
          },

         //  点击需求名称
          clickNeedTitle(value){

            if( this.userRoleInfo.id == '04'|| this.userRoleInfo.id == '06' ||this.userRoleInfo.id == '11'){
              location.href = '#/needInfo?id='+value;
            }else {
              this.changheHintBoxShow('你当前身份不能查看需求详情！')
            }

          },
        //  获取的身份
          succFun(params){
            this.userRoleInfo = params.currentRole;
          },
        //  点击艺人头像和名称
          clickActorTitle(value){
            if(this.userRoleInfo&&this.userRoleInfo.id == '11'){
              location.href = '#/actorInfo?id='+value;
            }else {
              this.changheHintBoxShow('你当前身份不能查看需求详情！')
            }
          }

        },
        mounted(){
          if(sessionStorage.getItem('searchValue')){

            this.sessionSearchValue.value = sessionStorage.getItem('searchValue');

            let uri = 'search?query='+sessionStorage.getItem('searchValue') ;
            let that = this;
            axiosReqGet(uri,function (param) {
              if(param.hits){
                that.publicSearchHandler({searchContent:param.hits.hits})
              }
              // that.$emit('showSearchResult');
            },null);
          }

          this.showSearchResult();

          getCurrentRole(this.succFun,function () {});
        },
        watch:{

        }
    }
</script>

<style lang="less">
  .searchPage-container{
    em{
      color: #ec6538;
      font-size: 18px;
      font-style: normal;
    }
    min-height: calc(100vh - 225px);
    .search-container{
      position: static;
      margin: 0 auto;
      padding-top: 150px;
      top: 100px;
      .search-box{
        border: 1px solid #ccc;
      }
    }
    .searchContent{
        min-height: 800px;
        width: 1200px;
        margin: 20px auto 0px;
        padding: 30px 50px;
        border: 1px solid #ccc;

      .searched-box{
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        .img-box{
          img{
            height: 70px;
            width: 70px;
            display: inline-block;
            border-radius: 50%;
          }
        }
        p{
          margin: 10px 0;
          line-height: 30px;
         }
        .searchType{
          background-color: #ec6538;
          color: #fff;
          padding: 2px 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      }
      .no-searched-box{
        height: 80px;
        padding: 20px;
        border: 1px dashed #ccc;
      }
    }
    .page{
      position: static!important;
      margin-bottom: 50px;
    }
  }

</style>
