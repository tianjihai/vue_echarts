// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Demo from './App'
import router from './router'
import echarts from 'echarts'
import  'echarts/lib/chart/map';
import 'echarts/map/js/china.js';

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Demo66:Demo }
})
