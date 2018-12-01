<template>
  <div class="news-list-box box-maxWidth">
    <div v-for="item in showInfodata">
      <router-link :to="{path:'/newsContent',query:{id:item.id}}" tag="div" class="news-list">
        <p class="news-title">{{item.title}}
          <span class="title-right">
            <img src="../../../static/images/timeIcon.png" style="width: 20px;vertical-align: middle"/>
            {{item.createtime}}&emsp;
            <img v-if="item.type" src="../../../static/images/newsIcon.png" style="width: 20px;vertical-align: middle"/>
            {{item.type}}&emsp;
            <img src="../../../static/images/tagIcon.png" style="width: 20px;vertical-align: middle"/>
            {{item.category.split(',')[1]}}
          </span>
        </p>
        <div class="news-content">
          <div class="news-img-box" v-if="item.thumb"><img :src="item.thumb" alt=""></div>
          <div class="news-text">{{item.intro}}</div>
        </div>
      </router-link>
    </div>

    <PaginItem
      kindsType="case"
      :filterData="newsListId"
    />
  </div>
</template>

<script>
  import {axiosReqGet,formatTime,getPublicConfigData} from '../../assets/js/public'
  import {mapGetters,mapActions} from "vuex";
  import PaginItem from '../paginations/pagination'
    export default {
      name: "news",
      components:{
        "PaginItem":PaginItem
      },
      data(){
        return{
          newsList:[],
          newsType:[
            {"type":{"MJ_INFORMATION_NEWS_TYPE_ANNOUNCEMENT":"公告","MJ_INFORMATION_NEWS_TYPE_NEWS":"新闻","MJ_INFORMATION_NEWS_TYPE_WARN":"警告"},
              "category":{"MJ_INFORMATION_NEWS_CATEGORY_INDUSTRY_NEWS":"行业资讯","MJ_INFORMATION_NEWS_CATEGORY_COMPANY_NEWS":"公司新闻"}
            }
          ],
          newsListId:{
            id:null
          }
        }
      },
      methods:{
        achieveCase(newsListId){
          //接受后台配置数据
          let url = 'article/list?category_id='+newsListId;
          axiosReqGet(url,this.sucFun,null);
        },
        sucFun(param){
         //渲染后台配置数据
          if(param.data.content.length > 0){
            param.data.content.forEach((item) => {
              item.createtime = formatTime(item.createtime,'-').split(' ')[0];
              this.newsList.push(item)
            })
          }

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
        getPublicConfigData('system_config_news_article_category_id',(params)=>{

          this.newsListId.id=params.data;
          this.currentToPageHandler({type:'case',id:0,value:this.newsListId})
        },null,(params)=>{

        })


      },

    }
</script>

<style lang="less">
  .news-list-box{
    min-height: calc(100vh - 222px);
    padding: 100px;
    .news-list{
      margin-top: 40px;
      height: 180px;
      cursor: pointer;
      color: #546370!important;
      .news-title{
        font-size: 22px;

        &:hover{
          color: #ec6538;
        }
        .title-right{
          font-size: 12px;
          line-height: 30px;
          float: right;
          color: #ec6538;
        }
      }
      .news-content{
        margin-top: 20px;
        display: flex;
        align-items: flex-end;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        .news-img-box{
          display: inline-block;
          width: 200px;
          height: 130px;
          overflow: hidden;
          &:hover{
            img{
              transition: .3s;
              transform: scale(1.1);
            }
          }
        }
        .news-text{
          width: 1000px;
          height: 100px;
          padding-left: 20px;
          vertical-align: bottom;
          text-indent: 24px;
        }
      }
    }
    .page{
      position: static!important;
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }

</style>
