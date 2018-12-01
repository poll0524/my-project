<template>
	<div class="publish-body flex">
		<div class="pulish-title">
			<span>需求详情</span>
		</div>
		<AddTab name="需求" addType="needs"/>
		<NeedsInfo :showFormDataList="showFormDataList"/>
	</div> 
</template>

<script>

	import AddTab from './publishAddTab'
	import NeedsInfo from './publishNeedsInfo'

	export default{
		name:'pulishBody',
		props:['showFormDataList'],
		data(){
			return{
			}
		},
		components:{
			AddTab,
			NeedsInfo
		},
		methods:{

		},
	}
</script>
<style lang="less">

</style>