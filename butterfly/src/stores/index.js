import Vue from "vue";
import Vuex from 'vuex';

import pulishNeeds from "./modules/pulishNeeds";
import Authority from "./modules/authority";
import AddExp from "./modules/addExp";
import SkillsTab from "./modules/skillsTab";
import EditExp from "./modules/editExp";
import News from "./modules/news";
import OrderMange from "./modules/orderManage";
import search from "./modules/searchPage";
import identifica from "./modules/identifica"
import Pagenation from "./modules/pagenation"
import PersonalSliderControl from "./modules/personalSliderControl"


Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		pulishNeeds,
		Authority,
		AddExp,
		SkillsTab,
		EditExp,
		News,
		OrderMange,
		Pagenation,
		PersonalSliderControl,
	    search,
	    identifica
	}
})
