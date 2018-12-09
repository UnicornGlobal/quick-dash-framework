import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import adminRoutes from '@/router/admin'
import authRoutes from '@/router/auth'
import userRoutes from '@/router/user'
import appRoute from '@/router/base'

import { userHasRole } from '@/auth'

let router = new Router({
  mode: 'history',
  routes: [...authRoutes]
})

export async function loadRoutes(user) {
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
    routes: [...authRoutes]
  })
}

router.afterEach(function (to, from) {
  store.commit('showSideBar', false)
})

export default router
