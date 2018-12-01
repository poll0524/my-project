<template>
	<div class="publish-addTab flex">
		<ul class="flex">
			<li :class="[tabIndex==index?'active':'none']" v-for="(item,index) in tabLength" :key="index" @click="tabTochange({addType,index})">
				{{name}}{{index+1}}
				<span class="close-tab" @click="delToNeedsInfo({addType,index})">×</span>
			</li>
		</ul>
		<div class="add-btn" @click="addToNeedsInfo(addType)" v-if="tabLength<5">+</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from "vuex";
	export default{
		name:'addTab',
		props:['name',"addType"],
		data(){
			return{
				tabIndex:0,
				tabLength:1
			}
		},
		computed:{
			...mapGetters({
				showActiveIndex:'showActiveIndex',
				showTabLength:'showTabLength',
				showMemberActiveIdx:'showMemberActiveIdx',
				showMemberLength:'showMemberLength'

			})
		},
		methods:{
			...mapActions({
				addToNeedsInfo:'addToNeedsInfo',
				delToNeedsInfo:'delToNeedsInfo',
				tabTochange:'tabTochange'
			})
		},
		mounted(){
			if(this.addType=='needs'){
				this.tabIndex=this.showActiveIndex;
				this.tabLength = this.showTabLength;
			}else if(this.addType == 'group'){
				this.tabIndex=this.showMemberActiveIdx;
				this.tabLength = this.showMemberLength;
			}
		},
		watch:{
			showActiveIndex(){
				if(this.addType == 'needs'){
					this.tabIndex = this.showActiveIndex;
				} 	
			},
			showMemberActiveIdx(){
				if(this.addType == 'group'){
					this.tabIndex = this.showMemberActiveIdx;	
				}
			},
			showTabLength(){
				if(this.addType == 'needs'){
					this.tabLength = this.showTabLength;
					this.tabIndex = this.showTabLength-1;
				}
			},
			showMemberLength(){
				if(this.addType == 'group'){
					this.tabLength = this.showMemberLength;
					this.tabIndex = this.showMemberLength-1;
				}
			}
		}
	}
</script>