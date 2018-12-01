<template>
	<div class="exp-ablum-container">
		<div class="info-head flex">
			<span class="name">{{headName}}</span>
			<span class="edit" @click="editToPersonalHandler('ablum')">新增/编辑</span>
		</div>
		<div class="exp-ablum-flex flex">
			<div class="exp-ablum-item" v-for="(item,idx) in albumArr" v-if="item.type=='photo'">
				<img :src="item.path" alt="">
				<span class="ablum-tips" v-if="item.cover">
					<span>面</span>
					<span>封</span>
				</span>
			</div>
			<div class="exp-ablum-item" v-for="(item,idx) in albumArr" v-if="!item.type">
				<img :src="item" alt="">
				<span class="ablum-tips" v-if="item.cover">
					<span>面</span>
					<span>封</span>
				</span>
			</div>
		</div>
		<div class="exp-album-tips">
			<ExpTip :titleData="titleData"/>
		</div>
		<ModalItem
		v-if="showUploadImgFlag"
		:showModal="showUploadImgFlag"
		@changheHintBoxShow="cancelToEditHandler({type:'ablum'})">
			<div slot="body">
				<UploadImg
				roleType="album"
				:imgUrlArr="albumArr"
				:applyType="applyType"/>
				<ControlBtn v-if="showUploadImgFlag" :albumArr="albumImg" type="ablum" :applyType="applyType"/>
			</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import ExpTip from '../publicApplyComponents/expTips'
	import ModalItem from '../../publicModalComponents/publicModal'
	import UploadImg from '../publicApplyComponents/uploadImg'
	import ControlBtn from './publicControBtns'


	export default{
		name:'expAlbum',
		props:['headName','albumData','applyType'],
		data(){
			return{
				titleData:{
					smallTitle:`1.无演出经历需传 素颜照*1 生活中*1 淡妆照*1
   2.有演出经历需传，有代表性的一次演出的演出背景照*1 展示现场人数照*1 上台演出照*1，及在演出经历出填写详细的演
  出经历。`
				},
				albumArr:[],
				albumImg:[]
			}
		},
		components:{
			ExpTip,
			ModalItem,
			UploadImg,
			ControlBtn
		},
		computed:{
			...mapGetters({
				showUploadImgFlag:'showUploadImgFlag'
			})
		},
		methods:{
			...mapActions({
				editToPersonalHandler:'editToPersonalHandler',
				cancelToEditHandler:'cancelToEditHandler'
			}),
		},
		mounted(){
			this.albumData.forEach((item)=>{
				if(item.type == 'photo'){
					this.albumArr.push(item)
					this.albumImg.push(item.path)
				}
			})
		},
		watch:{
			albumArr(){
			}
		}
	}
</script>

<style lang="less">
	.exp-ablum-container{
		padding: 20px 0;
		border-bottom: 2px dashed #999;
		.info-head{
			justify-content: space-between;
			padding:0 20px 20px;
			color: #ec6538;
			font-weight: 700;
			.edit{
				font-weight: normal;
				color: #0018ff;
				cursor: pointer;
				&:hover{
					text-decoration:underline;
				}
			}
		}
		.exp-ablum-flex{
			flex-wrap: nowrap;
			padding: 0 20px;
			.exp-ablum-item{
				width: 20%;
				margin-right: 1%;
				position: relative;
				overflow: hidden;
				height: 200px;
				img{
					transition: 0.3s;
				}
				&:hover{
					img{
						transform: scale(1.1);
					}
				}
				.ablum-tips{
					position: absolute;
					display: block;
					top: 0;
					left: 0;
					background: #ec6538;
					color: #fff;
					transform: rotate(-30deg) translate(-40px,-17px);
					padding: 0 50px;
					font-size: 12px;
					&>span{
						display: inline-block;
						transform: rotate(30deg);
					}
				}
			}
		}
		.exp-album-tips{
			position: relative;
			min-height: 70px;
			.exp-tips{
				left: 0;
				white-space: pre-wrap;
			}
		}
		.modal-container{
			max-width: 800px;
			.upload-imgbox{
				width: 100%;
				.upload-img{
					width: 19%;
				}
				.del-img{
					color: #999;
				}
			}
			.upload-btn{
				width: 20%;
			}
		}
	}
</style>
