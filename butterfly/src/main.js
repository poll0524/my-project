// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import  "babel-polyfill";

// import fullCalendar from 'vue-fullcalendar'

// Vue.component('full-calendar', fullCalendar)

import Distpicker from 'v-distpicker'

//vuex
import store from "./stores/index"

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper)
Vue.component('v-distpicker', Distpicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
