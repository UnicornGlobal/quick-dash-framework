import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import userRoutes from '@/router/UserRoutes'
import adminRoutes from '@/router/AdminRoutes'
import SharedRoutes from '@/router/SharedRoutes'
import { userHasRole } from '@/auth'

let router = new Router({
  mode: 'history',
  routes: [...SharedRoutes]
})

export async function loadRoutes(user) {
  let appRoute = {
    path: '/',
    component: require('@/App.vue').default,
    meta: {
      main: true,
      label: 'Home',
      icon: require('@/components/SideBar/icons/home.svg').default
    },
    children: []
  }

  let routes = userRoutes

  if (userHasRole(user, 'ADMIN')) {
    routes = [...routes, ...adminRoutes]
  }

  appRoute.children = routes

  store.commit('setRoutes', [appRoute])
  return appRoute
}

export function reloadRouter() {
  Vue.router = new Router({
    mode: 'history',
    routes: [...SharedRoutes]
  })
}

Vue.use(Router)
Vue.router = router

Vue.router.afterEach(function (to, from) {
  store.commit('showSideBar', false)
})

export default router
