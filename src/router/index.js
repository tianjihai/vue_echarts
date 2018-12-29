import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../view/index/index'
import page2 from '../view/page2/index'
import page3 from '../view/page3/index'
import TestPage from '../view/test/index'
import my from '../view/geren/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]

})


