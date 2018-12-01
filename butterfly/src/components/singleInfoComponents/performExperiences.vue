<template>
  <div class="performExperiences-container">
    <div class="experiences-box" v-show="performExperiencesflage">
      <div class="webPageBtn">
        <span class="pagination">{{performCurrentPage}}/{{parseInt(awardExperiencesAllData.length / 6)<1?parseInt(awardExperiencesAllData.length / 6)+1:parseInt(awardExperiencesAllData.length / 6)}}</span>
        <span class="prev" @click="performPageTurning('prev')">&lt;</span>
        <span class="next" @click="performPageTurning('next')">&gt;</span>
      </div>
      <div class="experiences-header">
        <span>演出经历</span>
      </div>
      <table border="1" bordercolor="#ccc" style="border-collapse:collapse;">
        <thead>
          <tr>
            <th style="width: 200px">日期</th>
            <th>演出内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in performExperiencesData">
            <td>{{item.perDate}}</td>
            <td>{{item.role}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="experiences-box" v-show="awardExperiencesflage">
      <div class="experiences-header">
        <span>获奖经历</span>
      </div>
      <div class="webPageBtn">
        <span class="pagination ">{{awardCurrentPage}}/{{parseInt(awardExperiencesAllData.length / 6)<1?parseInt(awardExperiencesAllData.length / 6)+1:parseInt(awardExperiencesAllData.length / 6) }}</span>
        <span class="prev" @click="awardPageTurning('prev')">&lt;</span>
        <span class="next" @click="awardPageTurning('next')">&gt;</span>
      </div>
      <table border="1" bordercolor="#ccc" style="border-collapse:collapse;">
        <thead>
        <tr>
          <th style="width: 200px">日期</th>
          <th>获奖内容</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in awardExperiencesData">
          <td>{{item.perDate}}</td>
          <td>{{item.role}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {formatTime,webPagination} from '../../assets/js/public'
    export default {
      name: "performExperiences",
      data(){
        return{
          performExperiencesData:[],
          performExperiencesAllData:[],
          performExperiencesflage:false,
          awardExperiencesData:[],
          awardExperiencesAllData:[],
          awardExperiencesflage:false,
          performCurrentPage:1,
          awardCurrentPage:1,
        }
      },
      props:{actorInfor:Object},
      methods:{
        //演出经历
        achieveExperiences(){
          if(this.actorInfor.artistPerformanceExperiences&&this.actorInfor.artistPerformanceExperiences != []){
            this.performExperiencesflage = true;
            this.performExperiencesAllData = this.actorInfor.artistPerformanceExperiences;
            this.showPerFormance(this.performCurrentPage);
          }
        },
        //渲染演出经历
        showPerFormance(pageNum){
          let performance = webPagination(pageNum,6,this.performExperiencesAllData);
          for (let i in performance ){
            performance[i].perDate = formatTime(performance[i].performanceDate,".").split(" ")[0];
          }
          this.performExperiencesData = performance;
        },
        //获奖经历
        achieveAward(){
          if(this.actorInfor.artistAwardExperiences&&this.actorInfor.artistAwardExperiences != []){
            this.awardExperiencesflage = true;
            this.awardExperiencesAllData = this.actorInfor.artistAwardExperiences;
            this.showAwardFormance(this.awardCurrentPage);
          }
        },
        //渲染获奖经历
        showAwardFormance(pageNum){
          if(this.awardExperiencesAllData&&this.awardExperiencesAllData.length>0){
            let performance = webPagination(pageNum,6,this.awardExperiencesAllData);
            for (let i in performance ){
              performance[i].perDate = formatTime(performance[i].awardDate,".").split(" ")[0];
            }
            this.awardExperiencesData = performance;
          }

        },

        //获奖经历翻页
        awardPageTurning(type){
          if(type === 'prev'){
            this.awardCurrentPage = this.awardCurrentPage -1<1?this.awardCurrentPage:this.awardCurrentPage -1;
            this.showAwardFormance(this.awardCurrentPage<1?'1':this.awardCurrentPage);

          }
          else if(type === 'next'){
            this.awardExperiencesData = [];
            this.awardCurrentPage = this.awardCurrentPage + 1>this.awardExperiencesAllData.length?this.awardCurrentPage:this.awardCurrentPage + 1;
            this.showAwardFormance(this.awardCurrentPage);
            // performance = webPagination(this.awardCurrentPage,6,this.actorInfor.artistAwardExperiences);
          }
        },
        //演出经历翻页
        performPageTurning(type){
          if(type === 'prev'){
            this.awardCurrentPage = (this.awardCurrentPage -1) < 1 ? this.awardCurrentPage : this.awardCurrentPage -1;
            this.showAwardFormance(this.awardCurrentPage<1 ? 1 : this.awardCurrentPage);

          }
          else if(type === 'next'){
            this.awardCurrentPage = (this.awardCurrentPage + 1) > (this.performExperiencesAllData.length)/6 ? this.awardCurrentPage : this.awardCurrentPage + 1;
            this.showAwardFormance(this.awardCurrentPage);
            // performance = webPagination(this.awardCurrentPage,6,this.actorInfor.artistAwardExperiences);
          }
        },
      },
      mounted(){
        this.achieveExperiences();
        this.achieveAward(this.awardCurrentPage)
      }
    }
</script>

<style scoped lang="less">

  .performExperiences-container{
    width: 1200px;
    margin: 20px auto;
    .experiences-box{
      padding-bottom: 40px;
      /*height: 350px;*/
      position: relative;
      .webPageBtn{
        position: absolute;
        right: 10px;
        top: 10px;
        span{
          width: 20px;
          height: 20px;
          text-align: center;
          display: inline-block;
          border: 1px solid #546370;
          line-height: 18px;
          cursor: pointer;
          &:hover{
            background-color: #ec6538;
            color: #fff;
          }
        }
        .pagination{
          border: none;
          margin-right: 10px;
          &:hover{
            background-color: #fff;
            color: #546370;

          }
        }
      }
    }
    .experiences-header{
      font-weight: bold;
      font-size: 20px;
      padding-bottom: 5px;
      border-bottom: 1px solid #ccc;

    }
    table{
      width: 100%;

      margin: 5px 0;
      text-align: center;
      tr{
        height: 40px;
      }
      th{
        background-color: #f2f2f2;
        font-size: 18px;
        font-weight: normal;
      }
    }
  }
</style>
