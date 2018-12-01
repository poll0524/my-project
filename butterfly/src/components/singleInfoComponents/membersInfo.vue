<template>
    <div class="members-container">
        <div class="widthCenter">
            <p class="member-header">成员介绍</p>
            <div class="memberBigBox">
                <div class="memberBox">
                    <p>黄敏</p>
                    <div>
                      <span>才艺</span>
                      <span>吹牛皮</span>
                    </div>
                    <div>
                      <span>成员职务</span>
                      <span>团长</span>
                    </div>
                    <div>
                        <span>性别</span>
                        <span>女</span>
                    </div>
                  <div>
                    <span>毕业院校</span>
                    <div>四川文化产业</div>
                  </div>
                    <div>
                        <span>出生年月</span>
                        <span>1985.02.25</span>
                    </div>
                    <div>
                        <span>体重</span>
                        <span>192</span>
                    </div>
                    <div>
                        <span>身高</span>
                        <span>56</span>
                    </div>
                </div>
                <div class="memberBox">
                <p>黄敏</p>
                <div>
                  <span>才艺</span>
                  <span>吹牛皮</span>
                </div>
                <div>
                  <span>成员职务</span>
                  <span>团长</span>
                </div>
                <div>
                  <span>性别</span>
                  <span>女</span>
                </div>
                <div>
                  <span>毕业院校</span>
                  <div>四川文化产业</div>
                </div>
                <div>
                  <span>出生年月</span>
                  <span>1985.02.25</span>
                </div>
                <div>
                  <span>体重</span>
                  <span>192</span>
                </div>
                <div>
                  <span>身高</span>
                  <span>56</span>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "membersInfo",
        props:{actorInfor:Object},
        data(){
            return{

            }
        },
        methods:{

        },
        mounted(){
        }
    }
</script>

<style scoped lang="less">
    .members-container{
        background-image: url("../../assets/img/albumBg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 480px;
    .widthCenter{
        width: 1200px;
        overflow: hidden;
        margin: 0 auto;
      .member-header{
        padding: 40px 0 10px;
        text-indent: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      .memberBigBox{
        display: flex;
        margin-top: 50px;
        justify-content: space-around;
        .memberBox{
          height: 330px;
          width: 450px;
          color: #fff;
          background-color: rgba(0,0,0,0.6);
        }
      }

    }

  }
</style>
