<template>
	<div class="conditon-banner">
		<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide class="slide-1" v-for="(item,index) in bannerImg" :key='index'>
		    	<a :href="item.link">
					<img :src="item.imageUrl" alt="img" >
		    	</a>
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	export default{
		name:'filterBanner',
		props:{
			'bannerImg':{
				type:Array
			}
		},
		data(){
			return{
				swiperOption:{
			        effect: 'fade',
			        autoplay:true,
			        pagination: {
			           el: '.swiper-pagination',
			           clickable: true
			        },
				},
			}
		},

	}
</script>

<style scoped lang="less">
	.conditon-banner{
		height: 120px;
		margin: 5px 0;
		.swiper-container{
			height: 100%;
		}
	}
</style>
