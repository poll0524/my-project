<template>
	<div class="flex-list-temp flex">
		<div class="flex-list" v-for="(item,idx) in reciveEntryData">
			<div class="list-box flex">
				<div class="list-img">
					<img :src="item.relatedUser.avatar?item.relatedUser.avatar:defaultImg" alt="">
				</div>
				<div class="list-info">
					<div class="list-head flex">
						<span class="list-name">{{item.relatedUser.stageName}}</span>
						<span>{{item.relatedUser.skills}}</span>
					</div>
					<div class="list-body flex">
						<div class="price">报价 ￥{{item.relatedUser.price}}</div>
						<router-link class="list-links" tag="div" :to="{path:'/actorInfo',query:{id:item.relatedUser.id}}">查看艺人详情>></router-link>
					</div>
					<div class="list-btnbox flex" v-if="showBtnFlag==true">
						<div class="auth-invite">
							<div class="auth-mask" @click="checkToCertify({type:'inviteActor'})" v-if="showAuthId=='10'"></div>
							<div class="list-btn" @click="inviteOrCoop({type:orderType,demandId:demandId,userID:item.relatedUser.id})">{{btnText}}</div>
						</div>
						<div class="list-smallbtn" v-if="smallFlag" @click="ignoreOrRefuseHandler(item,idx)">{{btnSmallText}}</div>
					</div>
				</div>
			</div>
			<div class="list-reason" v-if="refuseType">
			    拒绝原因：{{item.reason}}<br/>
				备　　注：{{item.remarks}}
			</div>
			<div class="tip" v-if="typeText">{{typeText}}</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		name:'orderList',
		props:['typeText','refuseType','showBtnFlag','btnText','btnSmallText','smallFlag','orderType','smallType','reciveEntryData','demandId','showInfoFlag'],
		data(){
			return{
				defaultImg:'https://icon.maxbutterfly.com/static/icon/default_avatar.png'
			}
		},
		computed:{
			...mapGetters({
				showAuthId:'showAuthId'
			})
		},
		methods:{
			...mapActions({
				inviteOrCoop:'inviteOrCoop',
				checkToCertify:'checkToCertify',
				getToUserInfo:'getToUserInfo'
			}),
			//邀请面试//合作
			inviteHanlder(){

			},

			//忽略/拒绝
			ignoreOrRefuseHandler(item,idx){

				// setTimeout(()=>{
				// 	this.reciveEntryData.splice(idx,1);
				// },2000)
				this.inviteOrCoop({type:this.smallType,demandId:this.demandId,userID:item.relatedUser.id})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getToUserInfo()
			})
		},
		watch:{
			reciveEntryData(){

			}
		}
	}
</script>

<style scoped lang="less">
	.flex-list-temp{
		width: 100%;
		.flex-list{
			width: 32.3%;
			border:1px solid #999;
			box-shadow: 0 0 2px #ccc;
			border-radius: 3px;
			padding: 10px;
			position: relative;
			overflow: hidden;
			margin-right: 1%;
			margin-bottom: 20px;
			&:nth-child(3n){
				margin-right:0;
			}
			.list-box{
				align-items: center;
				.list-img{
					width: 80px;
					height: 80px;
					overflow: hidden;
					border-radius: 50%;
					background: red;
					margin-right: 10px;
				}
				.list-info{
					line-height: 20px;
					font-size: 12px;
					.list-name{
						font-size: 14px;
						padding-right: 10px;
						max-width: 100px;
						white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
					}
					.list-head{
						align-items: center;
						&>span{
							&:last-child{
								display:block;
								max-width: 100px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
					.list-links{
						color: #ec6538;
						margin-left: 10px;
						cursor: pointer;
						&:hover{
							text-decoration:underline;
						}
					}
					.list-btnbox {
						color: #ec6538;
						align-items: flex-end;
						padding-top: 5px;
						.list-btn{
							background: #ec6538;
							color: #fff;
							border-radius: 3px;
							height: 30px;
							width: 80px;
							line-height: 30px;
							text-align: center;
							margin-right: 25px;
							cursor: pointer;
							transition: 0.3s;
							&:hover{
								background:#cd562e;
							}
						}
						.list-smallbtn{
							cursor: pointer;
							&:hover{
								text-decoration:underline;
							}
						}
					}
				}
			}
			.list-reason{
				border-top: 1px solid #999;
				font-size: 12px;
				padding: 10px 20px;
				margin-top: 10px;
			}
			.tip{
				position: absolute;
				top: 0;
				right: 0;
				background: #999;
				color: #fff;
				padding: 0 50px;
				transform: rotate(45deg) translate(40px, -23px);
			}
			.auth-invite{
				position: relative;
				.auth-mask{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background: transparent;
					cursor: pointer;
				}
				.auth-mask:hover + .list-btn{
						background:#cd562e;

				}
			}
		}
	}
</style>
