<template>
  <div class="summary-container">
    <div class="summary-video-box">
      <video class="myvideo" :controls="!playOrPause" poster="../../assets/img/video_poster.png" :src="videoScr"></video>
      <span v-show="playOrPause" @click="startPlay" class="play-btn"></span>
      <!--<span v-show="!this.playOrPause" @click="this.startPlay" class="pause-btn"></span>-->
    </div>
    <div class="summary-text-box">
      <p>简介</p>
      <div>
        {{actorInfor.introduction}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "singleInfoSummary",
      data(){
        return{
          _dom:null,
          summaryflage:false,
          videoScr:null,
          playOrPause:true,
          playStatus:false,
          muteStatus:true,
          summary:null
        }
      },
      props:{actorInfor:Object},
      methods:{
        startPlay(){
          this.playOrPause = !this.playOrPause
          if(this.playOrPause === false){
           this._dom = document.getElementsByClassName("myvideo");
           this._dom[0].play();
          }
        },
        judgeVideoSrc(){
          for(let i in this.summary.album){
            if(this.summary.album[i].type === 'video'){
              this.videoScr = this.summary.album[i].path;
            }
          }
        }

      },
      mounted(){
        this.summary = this.actorInfor;
        this.judgeVideoSrc();
      }
    }
</script>

<style scoped lang="less">

  .summary-container{
    width: 1200px;
    height: 376px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .summary-video-box{
      margin-top: 20px;
      height: 338px;
      width: 600px;
      position: relative;
      video{
        width: 100%;
        height: 100%;
      }
      .play-btn{
        position: absolute;
        top: 40%;
        right: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-image: url('../../../static/images/icons.png');
        background-position: -15px -200px;
      }
      .pause-btn{
        position: absolute;
        top: 40%;
        right: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background-image: url('../../../static/images/icons.png');
        background-position: -72px -200px;
      }
    }
    .summary-text-box{
      width: 600px;
      padding: 40px 40px 0;

      overflow: hidden;
      p{
        font-size: 24px;
      }
      div{
        text-indent: 24px;
        line-height: 28px;
        letter-spacing: 5px;
      }

    }
  }
</style>
