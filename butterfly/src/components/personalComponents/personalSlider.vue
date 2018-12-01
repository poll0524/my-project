<template>
	<div class="person-slider">
		<div class="slider-content flex">
			<div class="slider-box" v-for="(item,index) in reciveSliderData" :key="index">
				<div class="slider-title" v-if="index<=reciveSliderData.length-2">{{item.name}}</div>
				<router-link v-if="index==reciveSliderData.length-1" tag="div" :to="`${item.routerLink}`" class="slider-title slider-news">{{item.name}}<span>{{showNoHasReadArr.length}}</span></router-link>
				<ul class="slider-small-title" v-if="index<=reciveSliderData.length-2">
					<li
					v-for="(childItem,idx) in item.children"
					:key="idx">
						<router-link tag="div"
						class="slider-three-title hover-name"
						:to="`${childItem.routerLink}`"
						v-if="childItem.type==0">{{childItem.name}}</router-link>
						<div
						class="slider-three-title hover-name"
						v-if="childItem.type==1"
						:data-id="`${childItem.id}`"
						@click="toggleSub">
							{{childItem.name}}
							<span class="link-arrow"></span>
						</div>
						<ul
						:class="['slider-three-content',{'maxHeight':showSub}]"
						v-if="childItem.type==1&&childItem.children&&subIdx==childItem.id">
							<router-link tag="li"
							class="slider-three-info hover-name"
							v-for="(threeItem,thIdx) in childItem.children"
							:key="thIdx"
							:to="`${threeItem.routerLink}`"
							v-if="childItem.id!='s_0'&&childItem.id!='s_4'">{{threeItem.name}}</router-link>
							<router-link tag="li"
							class="slider-three-info hover-name"
							v-for="(threeItem,thIdx) in childItem.children"
							:key="thIdx"
							:to="`${threeItem.routerLink}`"
							v-if="threeItem.show">{{threeItem.name}}</router-link>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
	export default {
		name:'personalSlider',
		props:{
			'sliderData':{
				type:Array
			}
		},
		data(){
			return{
				reciveSliderData:[],
				showSub:false,
				subIdx:null
			}
		},
		methods:{
			toggleSub(e){
				if(this.subIdx==e.currentTarget.dataset.id){
					this.showSub = !this.showSub
				}else{
					this.subIdx = e.currentTarget.dataset.id;
					this.showSub = true
				}
			}
		},
    computed:{
      ...mapGetters({
        showNoHasReadArr:'showNoHasReadArr'
      })
    },
		mounted(){
			this.reciveSliderData = this.sliderData;

		}
	}
</script>

<style scoped lang="less">
	.person-slider{
		width: 250px;
		overflow: hidden;
		color: rgba(255,255,255,0.7);
		background: #191b2e;
		text-align: left;
		padding:100px 20px;
		& .hover-name:hover{
			cursor:pointer;
			transition:0.3s;
			color:#fff;
		}
		.slider-content{
			flex-direction: column;
		    justify-content: center;
		    align-items: center;
		    .slider-box{
		    	width: 150px;
		    	padding-bottom: 15px;
		    	line-height: 25px;
		    	.slider-title{
		    		font-size: 18px;
		    		text-align: center;
		    		&.slider-news{
		    			position: relative;
		    			span{
		    				position: absolute;
						    display: block;
						    top: -3px;
						    right: 30px;
						    width: 15px;
						    height: 15px;
						    text-align: center;
						    background: red;
						    overflow: hidden;
						    border-radius: 50%;
						    font-size: 12px;
						    color: #fff;
						    line-height: 15px;
		    			}
		    		}
		    	}
		    	.slider-small-title{
		    		padding-left: 50px;
		    		.slider-three-title{
		    			position: relative;
						cursor: pointer;
		    		}
					& ul{
						padding-left: 10px;
						max-height: 0;
						transition: 0.3s;
						overflow: hidden;
						&.maxHeight{
							max-height: 500px;
						}
					}
		    		.link-arrow{
		    			display: block;
		    			position: absolute;
		    			right: 0;
		    			top: 10px;
						width: 5px;
						height: 5px;
						border-right: 1px solid rgba(255,255,255,0.7);
						border-bottom: 1px solid rgba(255,255,255,0.7);
						transform: rotate(-45deg);
		    		}
		    	}
		    }
		}
	}
</style>
