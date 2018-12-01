<template>
	<div class="news-container">
		<TitleItem titleName="系统信息"/>
		<NewsBtn/>
		<!-- 消息列表 -->
		<NewsCon v-if="!showinfoFlag"/>
		<!-- 消息详情 -->
		<NewsInfo v-if="showinfoFlag"/>
		<ModalItem 
		v-if="showNewsModalFlag"
		:showModal="showNewsModalFlag">
			<div slot="body" class="news-tips-box">
				<i></i>
				{{showModalMsg}}
			</div>
		</ModalItem>
	</div>
</template>

<script>

	import {mapGetters,mapActions} from "vuex";

	import TitleItem from '../titleNameComponents'
	import NewsBtn from './newsBtn'
	import NewsCon from './newsContent'
	import NewsInfo from './newsInfo'
	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'news',
		data(){
			return{

			}
		},
		components:{
			TitleItem,
			NewsBtn,
			NewsCon,
			NewsInfo,
			ModalItem
		},
		computed:{
			...mapGetters({
				showinfoFlag:'showinfoFlag',
				showModalMsg:'showModalMsg',
				showNewsModalFlag:'showNewsModalFlag'
			})
		},
		methods:{
			...mapActions({
				newsToBackHandler:'newsToBackHandler'
			})
		},
		mounted(){
			this.newsToBackHandler();
		}

	}
</script>

<style lang="less">
	.news-container{
		.news-tips-box{
			text-align: center;
			i{	
				display: inline-block;
				width: 35px;
				height: 35px;
				background:url(../../../../static/images/icons.png)no-repeat;
				background-position: -175px -203px;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
		.closeModal{
			display: none;
		}
	}
</style>