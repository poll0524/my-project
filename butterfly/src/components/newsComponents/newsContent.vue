<template>
  <div class="new-container box-maxWidth">
    <div class="news-content-box">
      <div class="news-content-header">
        <p class="news-title">{{singlenewsConten.title}}</p>
        <!--<p class="new-edit">责任编辑：  编辑时间：</p>-->
      </div>
      <div class="news-content" v-html="singlenewsConten.content">

      </div>
    </div>
  </div>
</template>

<script>
  import {axiosReqGet} from '../../assets/js/public'
  export default {
    name: "newsContent",
    data(){
      return{
        singlenewsConten:{},
        newsContentType:[
          {"type":{"MJ_INFORMATION_NEWS_TYPE_ANNOUNCEMENT":"公告","MJ_INFORMATION_NEWS_TYPE_NEWS":"新闻","MJ_INFORMATION_NEWS_TYPE_WARN":"警告"},
            "category":{"MJ_INFORMATION_NEWS_CATEGORY_INDUSTRY_NEWS":"行业资讯","MJ_INFORMATION_NEWS_CATEGORY_COMPANY_NEWS":"公司新闻"}
          }
          ]
      }
    },
    methods:{
      achievenews(newsId){
        // let url = 'news/'+newsId;
        let url = 'article?id='+newsId;
        axiosReqGet(url,this.sucFun,null);
      },
      sucFun(param){
        this.singlenewsConten = param.data;
      }
    },
    mounted(){
      this.achievenews(this.$route.query.id);
    }
  }
</script>

<style scoped lang="less">
  .new-container{
    min-height: calc(100vh - 222px);
    padding-top: 100px;
    .news-content-box{
      margin: 40px 0;
      padding: 50px 200px;
      border-radius: 5px;
      box-shadow: 0 0 10px #aaa inset;
      .news-title{
        text-align: center;
        font-family: "宋体";
        font-size: 24px;
        margin-bottom: 20px;
      }
      .new-edit{
        text-align: center;
        margin: 30px 0;
      }
    }
  }

</style>
