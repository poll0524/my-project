<template>
	<div class="pages-box" v-if='pages>=0'>
		<div class="page">
	        <div class="pagelist">
	          <span class="jump" :class="{disabled:pstart}" @click="jumpBtn(-1)">上一页</span>
	          <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
	          <span class="ellipsis"  v-show="efont">...</span>
	          <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
	          <span class="ellipsis"  v-show="ebehind">...</span>

	          <span :class="{disabled:pend}" class="jump" @click="jumpBtn(1)">下一页</span>
	          <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">{{pages}}</span>

	          <span class="jumppoint">跳转到：</span>
	          <span class="jumpinp"><input type="text" v-model="changePage"></span>
	          <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
	        </div>
      	</div>
	</div>
</template>

<script>

  import {mapGetters,mapActions} from "vuex";

	export default{
		name:'pages',
    // props:['infoData','paginationParTwoHandler'],
    // props:['kindsType','filterData'],
    props:{
      'kindsType':{
        type:String,
      },
      'filterData':{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
		data(){
			return{
		        current_page: 1, //当前页
		        pages: 50, //总页数
		        changePage:'',//跳转页
		        nowIndex:0
			}
      },
      computed:{
        ...mapGetters({
          showInfodata:'showInfodata',
          showTotalPages:'showTotalPages'
        }),
    		show:function(){
    		 	return this.pages && this.pages !=1
    		},
    		pstart: function() {
    			return this.current_page == 1;
    		},
    		pend: function() {
    			return this.current_page == this.pages;
    		},
    		efont: function() {
    			if (this.pages <= 7) return false;
    			return this.current_page > 5
    		},
    		ebehind: function() {
    			if (this.pages <= 7) return false;
    			var nowAy = this.indexs;
    			return nowAy[nowAy.length - 1] != this.pages;
    		},
    		indexs: function() {
    			var left = 1,
    		 	right = this.pages,
    		 	ar = [];
    			if (this.pages >= 7) {
    		 		if (this.current_page > 5 && this.current_page < this.pages - 4) {
    		   			left = Number(this.current_page) - 3;
    		   			right = Number(this.current_page) + 3;
    			 	} else {
    			   		if (this.current_page <= 5) {
    			     		left = 1;
    			     		right = 7;
    			   		} else {
    			     		right = this.pages;

    			     		left = this.pages - 6;
    			   		}
    			 	}
    			}
    			while (left <= right) {
    		 		ar.push(left);
    		 		left++;
    			}
    			if(ar.length == 0){
    			  ar = [1];
          }
    			return ar;
    		},
        },
    	methods: {
        ...mapActions({
          currentToPageHandler:'currentToPageHandler'
        }),
      	jumpPage: function(id) {
        		this.current_page = id;
            this.currentToPageHandler({id:id,type:this.kindsType,value:this.filterData})
            // this.$emit('paginationParTwoHandler',id)
      	},
        jumpBtn(num){
          if(num==1){
            this.current_page++
          }
          if(num == -1){
            this.current_page--
          }
          // this.$emit('paginationParTwoHandler',this.current_page)
          this.currentToPageHandler({id:this.current_page,type:this.kindsType,value:this.filterData})
        }
    	},
      mounted(){
        this.$nextTick(()=>{
            this.pages = this.showTotalPages
        })
      },
      watch:{
        showTotalPages(){
          this.pages = this.showTotalPages
        }
      }

}
</script>

<style scoped lang="less">
	.page {
      height: 40px;
      text-align: center;
      color: #888;
      position: absolute;
      bottom: 25px;
      right: 40px;
    }

    .pagelist {
      font-size: 0;
      height: 50px;
      line-height: 50px;
    }

    .pagelist span {
      font-size: 14px;
    }
	.pagelist .jump:hover{
		background: #ec6538;
		color: #fff;
    }
    .pagelist .jump {
      transition: 0.3s;
      border:1px solid #ec6538;
      padding: 5px 8px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 5px;
    }

    .pagelist .bgprimary {
      cursor: default;
      color: #fff;
      background: #ec6538;
      transition: 0.3s;
    }

    .jumpinp input {
      width: 55px;
      height: 26px;
      font-size: 13px;
      border: 1px solid #ccc;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      text-align: center;
    }

    .ellipsis {
      padding: 0px 8px;
    }

    .jumppoint {
      margin-left: 30px;
    }

    .pagelist .gobtn {
      font-size: 12px;
    }

    .bgprimary {
      cursor: default;
      color: #fff;
      background: #337ab7;
      border-color: #337ab7;
    }
    .pagelist .jump.disabled{
      pointer-events: none;
      background: #ddd;
      border-color: #ddd;
    }


</style>
