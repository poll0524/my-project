<template>
	<div class="member-container flex">
		<div class="flex-content" v-if="showIndex==idx" v-for="(item,idx) in showMemberData">
			<!-- 成员名字 -->
			<div class="flex-inpbox flex">
				<label for="">成员姓名</label>
				<div class="flex-inp">
					<input type="text" placeholder="请输入您的成员姓名">
				</div>
			</div>
			<!-- 才艺 -->
			<div class="flex-inpbox flex-skill flex">
				<label for="">才　　艺</label>
				<div class="flex-skillbox">
					<div class="flex-inp">
						<ul class="flex">
							<li v-for="(item,idx) in showMemberBodyData[showIndex]">
								<span>{{item.value}}</span>
								<span class="del-skill" @click="delToSkill({type:'groupMember',delIdx:showIndex,idx})">×</span>
							</li>
						</ul>
					</div>
					<div class="flex-inp" @click="showToModalHandler({type:'groupMember',idx})">
						<input type="text" readonly placeholder="请选择技能">
						<span class="color-arrow inp-arrow"></span>
					</div>

				</div>
			</div>
			<!-- 成员职务 -->
			<div class="flex-inpbox flex-short flex">
				<label for="">成员职务</label>
				<div class="flex-inp">
					<select name="" id="">
						<option value="0" selected disabled>请选择</option>
						<option value="1">团长</option>
						<option value="2">副团长</option>
						<option value="3">成员</option>
						<option value="4">其他</option>
					</select>
					<span class="color-arrow inp-arrow"></span>
				</div>
			</div>
			<!-- 性别 -->
			<div class="flex-inpbox flex-short flex">
				<label for="">性　　别</label>
				<div class="flex-inp">
					<select name="" id="">
						<option value="0" selected disabled>请选择</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
					<span class="color-arrow inp-arrow"></span>
				</div>
			</div>
			<!-- 毕业院校 -->
			<div class="flex-inpbox flex">
				<label for="">毕业院校</label>
				<div class="flex-inp">
					<input type="text" placeholder="请填写高中及以上学历,(没有填无)">
				</div>
			</div>
			<!-- 出身年月 -->
			<div class="flex-inpbox flex">
				<label for="">出生年月</label>
				<div class="flex-inp">
					<Datepicker
					:language="languages.zh"
					format="yyyy-MM-dd"
					/>
					<span class="color-arrow inp-arrow"></span>
				</div>
			</div>
			<div class="flex-inpbox flex">
				<div class="flex-small-inpbox flex">
					<label for="">身　　高</label>
					<div class="flex-inp">
						<input type="text"><span class="text-arrow color-arrow">CM</span>
					</div>
				</div>
				<div class="flex-small-inpbox flex">
					<label for="">体　　重</label>
					<div class="flex-inp">
						<input type="text"><span class="text-arrow color-arrow">kg</span>
					</div>
				</div>
			</div>
		</div>
		<!-- <ModalItem
			v-if="showSkillModal"
			:showModal="showSkillModal"
			@changheHintBoxShow="cancelToChooseSkill"
			>
			<div slot="header" class="skill-title flex">
				<h3>选择才艺</h3>
				<span>(最多只能选择五项)</span>
			</div>
			<div class="skillsBox">
				<div class="skills-tips">
					<ul class="flex">
						<li v-for="(item,idx) in showMemberBodyData[showIndex]">
							<span>{{item.value}}</span>
							<span class="del-skill" @click="delToSkill({type:'groupMember',idx})">×</span>
						</li>
					</ul>
				</div>
				<div class="skills-content flex">
					<div class="skills-slide">
						<ul>
							<li
							v-for="(item,idx) in showSkillsData"
							v-if="idx!=0"
							@click="skillToChange({item,idx})">{{item.name}}</li>
						</ul>
					</div>
					<div class="skills-infobox">
						<ul class="flex">
							<li
							v-for="(item,idx) in showSkillsData[showSkillIndex].childCity"
							@click="skillInfoToChange(idx)">{{item.value}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="skill-btn flex" slot="footer">
				<button @click="sureToChooseSkill">确定</button>
				<button @click="cancelToChooseSkill">取消</button>
			</div>
		</ModalItem> -->
	</div>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import Datepicker from 'vuejs-datepicker';
	import * as lang from "vuejs-datepicker/src/locale";

	import ModalItem from '../../publicModalComponents/publicModal'

	export default{
		name:'memberInfo',
		data(){
			return{
				languages:lang,
				showIndex:0
			}
		},
		components:{
			Datepicker,
			ModalItem
		},
		computed:{
			...mapGetters({
				showSkillsData:'showSkillsData',
				showSkillIndex:'showSkillIndex',
				showSkillModal:'showSkillModal',
				showMemberData:'showMemberData',
				showMemberBodyData:'showMemberBodyData',
				showMemberActiveIdx:'showMemberActiveIdx',
			})
		},
		methods:{
			...mapActions({
				showToModalHandler:'showToModalHandler',
				skillToChange:'skillToChange',
				skillInfoToChange:'skillInfoToChange',
				delToSkill:'delToSkill',
				cancelToChooseSkill:'cancelToChooseSkill',
				sureToChooseSkill:'sureToChooseSkill'
			}),
			addressToChange(value){
			},
		},
		mounted(){
			this.showIndex = this.showMemberActiveIdx
			// console.log(this.showMemberActiveIdx)
		},
		watch:{
			showMemberActiveIdx(){
				this.showIndex = this.showMemberActiveIdx
				// console.log(this.showMemberActiveIdx)
			},
			showMemberData(){
				this.showIndex = this.showMemberData.length-1;
			},
		}
	}
</script>

<style lang="less">
	.member-container{
		justify-content: center;
		padding: 20px 0;
		.flex-short{
			select{
				width: 150px;
			}
		}
	}
</style>
