// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Demo from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'jquery/src/jquery.js'
import  'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Demo66:Demo }
});



