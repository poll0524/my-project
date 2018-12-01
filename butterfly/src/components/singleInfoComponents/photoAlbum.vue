<template>
  <div class="ablum-container">
    <div class="widthCenter">
      <p class="ablum-header">相册</p>
      <div class="ablum-content">

        <div class="album actor-ablum" @click="changeShowAlbum('album')">
          <div class="top">
            <div><img  :src="actorAlbum.cover.imgUrl" alt=""></div>
            <p class="top-text">个人展示</p>
          </div>
          <div class="buttom">
            <div>
              <img  :src="actorAlbum.cover.imgUrl" alt="">
            </div>
            <p class="buttom-text"></p>
          </div>

        </div>

        <div class="album perFormance-album" @click="changeShowAlbum('perFormance')">
          <div class="top">
            <div>
              <img  :src="perFormanceAlbum.cover.imgUrl" alt="">
            </div>
            <p class="top-text">演出经历</p>
          </div>
          <div class="buttom">
            <div>
              <img  :src="perFormanceAlbum.cover.imgUrl" alt="">
            </div>
            <p class="buttom-text"></p>
          </div>
        </div>

        <div class="album perFormance-album" @click="changeShowAlbum('award')">
          <div class="top">
            <div>
              <img  :src="awardAlbum.cover.imgUrl" alt="">
            </div>
            <p class="top-text">获奖经历</p>
          </div>
          <div class="buttom">
            <div>
              <img  :src="awardAlbum.cover.imgUrl" alt="">
            </div>
            <p class="buttom-text"></p>
          </div>
        </div>
      </div>
    </div>
    <albumModal
      v-if="showModal"
      :showModal = 'showModal'
      @changheHintBoxShow = 'changeShowAlbum'
    >
      <div slot="body">
        <swiper :options="swiperOption">

          <swiper-slide v-for="(item,index) in swiperImgArr":key="index" >
            <img :src="item" alt="img" >
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </albumModal>

  </div>
</template>

<script>
  import AlbumModal from '../publicModalComponents/publicModal'
  import $ from 'jquery'
    export default {
        name: "photoAlbum",
        props:{actorInfor:Object},
        components:{'albumModal':AlbumModal},
        data(){
            return{
                showModal:false,
                swiperOption: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                  loop: true,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                  }
                },
                swiperImgArr:[],
                actorAlbum: {
                      cover:{imgUrl:''},
                      other:[]
                },
                perFormanceAlbum: {
                      cover:{imgUrl:''},
                      other:[]
                },
                awardAlbum:{
                  cover:{imgUrl:''},
                  other:[]
                },
            }
        },
        methods:{
          changeShowAlbum(value){
            this.showModal = !this.showModal;
            if(value == 'album'){
              this.swiperImgArr  = this.actorAlbum.other

            }
            if(value == 'perFormance' ){
              this.swiperImgArr  = this.perFormanceAlbum.other
            }
            if(value == 'award' ){
              this.swiperImgArr  = this.awardAlbum.other
            }

          },
          //获取相册的数据
          getActorAlbumData(){
            if(this.actorInfor.album){
              this.actorInfor.album.forEach((item) =>{
                if(item.type === 'photo'){
                  this.actorAlbum.other.push(item.path);
                }
                this.actorAlbum.cover.imgUrl = this.actorAlbum.other[0]
              });
            }else {
              this.actorAlbum.cover.imgUrl = 'https://icon.maxbutterfly.com/static/icon/placeholder_list.png'
            }
          },

          //获取演出经历图片
          getPerformAlbumData(){
            if(this.actorInfor.artistPerformanceExperiences){
              this.actorInfor.artistPerformanceExperiences.forEach((item) => {
                  this.perFormanceAlbum.cover.imgUrl = this.actorInfor.artistPerformanceExperiences[0].imageUrl.split(',')[0];
                  item.imageUrl.split(',').forEach((itemImgUrl)=>{
                    this.perFormanceAlbum.other.push(itemImgUrl)
                })
              })
            }else {
              //没有演出经历图片
              this.perFormanceAlbum.cover.imgUrl = 'https://icon.maxbutterfly.com/static/icon/placeholder_list.png'
            }
          },

          //获取获奖经历图片
          awardAlbumData(){
            if(this.actorInfor.artistAwardExperiences){
              this.actorInfor.artistAwardExperiences.forEach((item) => {
                  this.awardAlbum.cover.imgUrl = this.actorInfor.artistAwardExperiences[0].imageUrl.split(',')[0];
                  item.imageUrl.split(',').forEach((itemImgUrl)=>{
                  this.awardAlbum.other.push(itemImgUrl)
                })
              })
            }else {
              //没有获奖经历图片
              this.awardAlbum.cover.imgUrl = 'https://icon.maxbutterfly.com/static/icon/placeholder_list.png'
            }
          }
        },
        mounted(){
          this.getActorAlbumData();
          this.getPerformAlbumData();
          this.awardAlbumData();
        }

    }
</script>

<style lang="less">
  .ablum-container{
    background-image: url("../../assets/img/albumBg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 520px;
    .widthCenter{
      width: 1200px;
      margin: 0 auto;
      .ablum-header{
        padding: 40px 0 10px;
        text-indent: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      .ablum-content{
        display: flex;
        .album{
          width: 230px;
          height: 312px;
          margin: 50px;
          cursor: pointer;
          position: relative;
          img{
            width: 100%;
            height: 270px;
          }
          .buttom,.top{
            position: absolute;
            z-index: 1;
            div{
              width: 230px;
              height: 270px;
            }
          }
          .buttom{
            z-index: 0;
            transform:rotate(-7deg);
          }
          .top-text,.buttom-text{
            background-color: #fff;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
    .modal-container{
      min-width: 850px;
      /*height: 600px;*/
      .swiper-container{
        height: 900px;
      }
      img{
        height: 100%;
      }
    }


  }

</style>
