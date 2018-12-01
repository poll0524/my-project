<template>
	<div class="comment-imgbox">
		<div class="flex-img flex">
			<div class="flex-item" v-for="(item,idx) in commentImgData" @click="showModalHandler(idx)">
				<img :src="item" alt="img加载失败">
			</div>
		</div>
		<ModalItem
		v-if="showModal"
		:showModal="showModal"
		@changheHintBoxShow="showModalHandler"
		>
			<div slot="body">
				<swiper :options="swiperOption" ref="mySwiper">
				    <!-- slides -->
				    <swiper-slide class="slide-1" v-for="(item,index) in commentImgData" :key="index">
						<img :src="item" alt="img" >
				    </swiper-slide>
				    <!-- Optional controls -->
				    <div class="swiper-pagination" slot="pagination"></div>
				    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        			<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
				</swiper>
			</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import ModalItem from '../../../publicModalComponents/publicModal'

	export default {
		name:'commentImg',
		props:['commentImgData'],
		data(){
			return{
				swiperOption:{
			        navigation: {
			           nextEl: '.swiper-button-next',
            			prevEl: '.swiper-button-prev'
			        },
			        pagination: {
			            el: '.swiper-pagination',
			            clickable: true
			        },
			        preloadImages:false,
			        initialSlide:0
				},
			    showModal:false,
			}
		},
		components:{
			ModalItem
		},
		methods:{
			showModalHandler(idx){
				this.showModal = !this.showModal
				this.swiperOption.initialSlide = idx
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped lang="less">
	.comment-imgbox{
		padding:10px 10px 20px;
		.flex-img{
			.flex-item{
				width: 19%;
				margin-right: 1%;
				height: 170px;
				overflow: hidden;
				img{
					transition: 0.3s;
				}
				&:hover{
					img{
						transform: scale(1.1);
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.comment-imgbox{
		.modal-container{
			max-width: 1200px;
			overflow: hidden;
			.swiper-container{
				height: 500px;
			}
		}

	}
</style>