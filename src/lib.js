import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import userRoutes from './router/UserRoutes'
import adminRoutes from './router/AdminRoutes'
import SharedRoutes from '@/router/SharedRoutes'

export async function loadRoutes(user) {
  let appRoute = {
    path: '/',
    component: require('@/App.vue').default,
    meta: {
      main: true,
      label: 'Home',
      icon: require('@/components/SideBar/icons/home.svg')
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

function userHasRole(user, role) {
  return user.roles.findIndex(userRole => userRole.name === role) > -1
  // return true
}

export function reloadRouter() {
  Vue.router = new Router({
    mode: 'history',
    routes: [...SharedRoutes]
  })
}
