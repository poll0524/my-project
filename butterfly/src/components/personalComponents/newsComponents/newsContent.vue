<template>
	<div class="news-content">
		<div class="news-number">有{{showNoHasReadArr.length}}条系统消息未读</div>
		<div class="news-infobox">
			<div class="news-list flex" v-for="(item,idx) in newsData">
				<input type="checkbox" v-model="item.checked"  @change="singleToCheck">
				<div class="news-info flex" @click="seeToInfomation(item.id)">
					<span class="news-tips" v-if="!item.hasRead"></span>
					<div class="news-textbox flex">
						<div class="news-text">{{item.title}}</div>
						<div class="news-date">{{item.date}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	export default{
		name:'newsCon',
		data(){
			return{
          newsData:[]
			}
		},
		computed:{
			...mapGetters({
				showNewsListData:'showNewsListData',
        showNoHasReadArr:'showNoHasReadArr',
        // showToCheck:'showToCheck'
			})
		},
		methods:{
			...mapActions({
				singleToCheck:'singleToCheck',
				seeToInfomation:'seeToInfomation',
				getToAllNewsHandler:'getToAllNewsHandler'
			})
		},
		mounted(){
			this.getToAllNewsHandler()
		},
    watch:{
      showNewsListData(){
        this.newsData = this.showNewsListData;
        this.newsData.forEach((item,i)=>{
          this.$set(item,'checked',false)
        })
      }
    }
	}
</script>

<style scoped lang="less">
	.news-content{
		padding: 0 40px;
		.news-infobox{
			padding: 20px 0;
			.news-list{
				width: 100%;
				align-items: center;
				padding: 40px 20px;
				border-bottom: 1px solid #ccc;
				cursor: pointer;
				transition: 0.3s;
				&:hover{
					color:#ec6538;
				}
				.news-info{
					flex:1;
					padding-left: 40px;
					position: relative;
					.news-tips{
						display: block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						position: absolute;
						left: 25px;
    					top: 5px;
						background: red;
					}
					.news-textbox {
						flex:1;
						justify-content: space-between;
						.news-text{
							max-width: 500px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>
