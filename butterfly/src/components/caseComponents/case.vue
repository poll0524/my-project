<template>
  <div class="pagination-case-box">
    <div class="case-list-box center-calc box-maxWidth">
      <div v-for="item in showInfodata">
        <router-link class="case-box"  :to="{path:'/caseContent',query:{id:item.id}}" tag="div" >
          <div class="case-box-img"  >
            <img :src="item.thumb" alt="">
          </div>
          <p>{{item.title}}</p>
          <p class="caseTime">{{item.createtime}}</p>
        </router-link>
      </div>

    </div>
    <PaginItem
      kindsType="case"
      :filterData="caseListId"
    />
  </div>
</template>

<script>
  import {axiosReqGet,formatTime,getPublicConfigData} from '../../assets/js/public'
  import {mapGetters,mapActions} from "vuex";
  import PaginItem from '../paginations/pagination'

    export default {
      name: "case",
      components:{
        'PaginItem':PaginItem
      },
      data(){
        return {
          caseListBox:[],
          caseListId:{
            id:null,
            totalPage:null
          }
        }
      },
      methods:{
        achieveCaseList(caseListId){
          //接受后台配置数据
          let url = 'article/list?category_id='+caseListId;

          // let url = 'news';
          axiosReqGet(url,this.sunFun,null);
        },
        sunFun(param){
          // for(const i in param.content){
          //   if(param.content[i].category === "MJ_INFORMATION_NEWS_CATEGORY_SUCCESSFUL_CASE"){
          //     var obj = {};
          //     obj.title = param.content[i].title;
          //     obj.imageUrl = param.content[i].thumb;
          //     obj.caseTime = formatTime(param.content[i].createtime,'-');
          //     obj.url_id = '/caseContent?id='+param.content[i].id;
          //     this.caseListBox.push(obj);
          //   }
          //
          //
          // }
          if(param.data.content.length > 0){
            param.data.content.forEach((item) => {
              item.createtime =formatTime(item.createtime,'-').split(' ')[0]
            })
          }
          this.caseListId.totalPage = param.data.totalPages;
          this.caseListBox = param.data.content;

        },
        ...mapActions({
          currentToPageHandler:'currentToPageHandler'
        })
      },
      computed:{
        ...mapGetters({
          showInfodata:'showInfodata'
        })
      },
      mounted(){
        //获取网站的资讯列表的id地址
        getPublicConfigData('system_config_success_article_category_id',(params)=>{
          this.caseListId.id = params.data;
          this.currentToPageHandler({type:'case',id:0,value:this.caseListId})
        },null,(params)=>{

        })


      }
    }
</script>

<style lang="less">
  .pagination-case-box{
    .case-list-box{
      padding-bottom: 40px;
      display: flex;
      flex-wrap: wrap;
      .case-box{
        width: 380px;
        height: 320px;
        margin: 40px 10px 0;
        box-shadow: 2px 2px 5px #ccc;
        border: 1px solid #ccc;
        cursor: pointer;
        .case-box-img{
          height: 250px;
          overflow: hidden;
        }
        &:hover{
          img{
            transition: 0.3s;
            transform: scale(1.1);
          }
        }
        img{
          height: 250px;
        }
        p{
          padding-top: 10px;
          text-indent: 10px;
        }
        .caseTime{
          padding-right: 20px;
          text-align: right;
        }
      }
    }
    .page{
      position: static!important;
      margin-bottom: 50px;
    }
  }


</style>
