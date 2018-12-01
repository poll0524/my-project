<template>
	<div class="search-container">
		<div class="search-box flex">
			<input type="text" v-model="searchText" placeholder="请输入搜索信息" @keyup.enter="clickSearchBtn">
			<div class="search-btn" @click="clickSearchBtn()">搜索</div>
		</div>
		<div class="hot-search flex" style="display: none;">
			<label for="">热门搜索：</label>
			<div class="hot-searchInfo">
				<!-- <router-link to="" v-for="item in hotData">{{item}}</router-link> -->
				<span v-for="item in hotData">{{item}}</span>
			</div>
		</div>
	</div>
</template>
<script>
  import {axiosReqGet} from '../../assets/js/public'
  import {mapGetters,mapActions} from "vuex"
	export default{
		name:'saerchBox',
    props:{
      showSearchResult:{
        type:Function
      },
      sessionSearchValue:{
        type:Object
      }
    },
		data(){
			return{
        searchText:'',
				hotData:['宋慧乔','宋仲基','李光洙','刘在石','金钟国','宋智孝']
			}
		},
    computed:{
      ...mapGetters({
        showSearchData:'showSearchData',
      })
    },
    methods:{
      clickSearchBtn(){
        // 判断是否 在搜索页
        if((location.href).indexOf('SearchPage') === -1){
          location.href = '#/SearchPage';
        }
        if(this.searchText){
          sessionStorage.setItem('searchValue',this.searchText);
          this.showSearchData.text = this.searchText;
          let uri = 'search?query='+this.searchText ;
          let that = this;
          axiosReqGet(uri,function (param) {
            that.publicSearchHandler({searchContent:param.hits.hits})
            that.$emit('showSearchResult');
          },null);
        }else{
          sessionStorage.setItem('searchValue',"");
        }
        // sessionStorage.setItem('searchValue',"");
      },
      ...mapActions({
        publicSearchHandler:'publicSearchHandler'
      })
    },
    mounted(){
		//   if(sessionStorage.getItem('searchValue')){
		//     this.searchText = sessionStorage.getItem('searchValue');
      // }
      this.searchText = this.showSearchData.text ;
      if(this.sessionSearchValue&&this.sessionSearchValue.value){
        this.searchText = this.sessionSearchValue.value ;
      }
    },
    watch:{
      sessionSearchValue(){
        if(this.sessionSearchValue.value && this.sessionSearchValue.value!= 'undefined'){
          this.searchText = this.sessionSearchValue.value;
        }
      }
    }
	}
</script>
<style lang="less">
	.search-container{
		position: absolute;
		z-index: 1;
		bottom: 100px;
		width: 800px;
		left: 50%;
		margin-left: -400px;
		.search-box{
			width: 100%;
			background: #fff;
			justify-content: space-between;
			align-items: center;
			padding: 5px;
			input{
				height: 64px;
				padding: 0 10px;
				font-size: 16px;
				color: #546370;
				flex: 1;
				outline: none;
				border:transparent;
			}
			.search-btn{
				width: 240px;
				height: 64px;
				background-color: #ec6538;
				color: #fff;
				line-height: 60px;
				text-align: center;
				font-size: 18px;
				transition: 0.3s;
				cursor: pointer;
				&:hover{
					box-shadow:0 0 2px rgba(0,0,0,0.5);
				}
				&:active{
					background-color:#cd562e;
				}
			}
		}
		.hot-search{
			color: rgba(255,255,255,1);
			padding: 10px 0;
			span{
				margin-right: 25px;
				cursor: pointer;
				&:hover{
					color:#ec6538;
				}
			}
			&.a{
				color: rgba(255,255,255,1);
			}
		}
	}
</style>
