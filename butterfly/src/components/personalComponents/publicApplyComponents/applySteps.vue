<template>
	<div class="steps-container">
		<div class="flex-box flex">
			<div :class="['flex-item',{'active':stepsIndex>=idx}]" v-for="(item,idx) in stepsTextData">
				<div class="flex-num">{{idx+1}}</div>
				<div class="flex-txt">{{item}}</div>
			</div>
		</div>
	</div>
</template>
<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'steps',
		props:{
			'stepsTextData':{
				type:Array
			},
		},
		data(){
			return{
				stepsIndex:0
			}
		},
		computed:{
			...mapGetters({
				showstepActiveIndex:'showstepActiveIndex'
			})
		},
		mounted(){
			this.stepsIndex = this.showstepActiveIndex
		},
		watch:{
			showstepActiveIndex(){
				this.stepsIndex = this.showstepActiveIndex
			}
		}
	}
</script>

<style scoped lang="less">
	.steps-container{
		border-bottom: 2px dashed #999;
		.flex-box{
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;
			padding:30px 140px;
			text-align: center;
			.flex-item{
				flex-basis: 20%;
				overflow: hidden;
				position: relative;
				.flex-num{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					line-height: 50px;
					font-weight: 700;
					font-size: 24px;
					color: #fff;
					background: #999;
					margin:0 auto 10px;
					position: relative;
					z-index: 1;
				}
				&::after{
					display:block;
					content: '';
					border-top: 1px solid #999;
					position: absolute;
					top: 30%;
					left: 0;
					width: 100%;
				}
				&.active{
					&::after{
						border-color:#ec6538;
					}
					.flex-num{
						background: #ec6538;
					}
				}
			}
		}
	}
</style>
