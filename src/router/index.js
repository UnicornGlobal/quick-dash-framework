import Vue from 'vue'
import Router from 'vue-router'
import SharedRoutes from './SharedRoutes'
import store from '@/store'

let router = new Router({
  mode: 'history',
  routes: [...SharedRoutes]
})

Vue.use(Router)
Vue.router = router

Vue.router.afterEach(function (to, from) {
  store.commit('showSideBar', false)
})

export default router
