<template>
  <div class="hintBox">
      <div class="success-pop-box">
        <div class="success-header">
          <span :class="[this.successIcon?'icon':'iconErr']"></span>
          <span class="first-text">{{this.firstText}}</span>
        </div>
        <div class="second-text">
          {{this.secondText}}
        </div>
        <div class="success-btn-box">
          <router-link :to="this.handleBtn.btnLink" class="success-btn" tag="div">{{this.handleBtn.btnText}}</router-link>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
      name: "hintBox",
      props: {hintInfo:Object,changheHintBoxShow:Function},
      data(){
        return{
          firstText:"",
          secondText:"",
          iconStatus:{},
          successIcon:true,
          handleBtn:{
            btnText:"",
            btnLink:""
          }
        }
      },
      methods:{
        achieveHintInfo(){
          this.successIcon = this.hintInfo.successIcon;
          this.firstText = this.hintInfo.firstText;
          this.secondText = this.hintInfo.secondText;
          this.handleBtn.btnText = this.hintInfo.successBtn.btnText;
          this.handleBtn.btnLink = this.hintInfo.successBtn.btnLink;
          setTimeout(()=> {
            this.$emit('changheHintBoxShow');
          },this.hintInfo.countDown)
        }
      },
      mounted(){
        this.achieveHintInfo()
      }
    }
</script>

<style scoped lang="less">

  .hintBox{
    background-color: rgba(0,0,0,.1);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    .success-pop-box{
      width: 440px;
      height: 170px;
      background-color: rgba(0,0,0,0.8);
      .success-header,.second-text,.success-btn-box{
        padding: 12px 0;
        text-align: center;
        color: #fff;
      }
      .first-text{
        font-size: 18px;
      }
      .success-btn-box{
        .success-btn{
          height: 40px;
          line-height: 40px;
          width: 150px;
          margin: 0 auto;
          cursor: pointer;
          letter-spacing: 2px;
          background-color: #ec6538;
          border: none;
          color: #fff;
        }
      }
      .icon{
        width: 30px;
        height: 30px;
        vertical-align: bottom;
        display: inline-block;
        background-image: url("../../../static/images/icons.png");
        background-position: -138px -204px;
      }
      .iconErr{
        width: 30px;
        height: 30px;
        vertical-align: bottom;
        display: inline-block;
        background-image: url("../../../static/images/icons.png");
        background-position: -177px -206px;
      }
    }

  }
</style>
