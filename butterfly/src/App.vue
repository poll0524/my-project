 <template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	export default {
	  name: 'App',
	}
</script>

<style lang="less">
  @import url('../static/public.less');
  @import url("assets/icon/iconfont.css");
  .swiper-pagination-bullet{
  	width: 10px;
  	height: 10px;
  }
</style>
