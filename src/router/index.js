import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import adminRoutes from '@/router/admin'
import authRoutes from '@/router/auth'
import userRoutes from '@/router/user'
import appRoute from '@/router/base'

import { userHasRole } from '@/auth'

/**
 * Custom routes
 *
 * This is loaded from the host application via directory naming
 * convention.
 *
 * The convention is to load anything not called `index.js` from
 * the `src/routes` folder in the host application after the built
 * in framework level requirements have been loaded.
 *
 * ~/ represents the host application `src` directory
 * @/ represents this frameworks `src` directory
 */
async function getCustomRoutes() {
  let custom = false
  let result = []
  try {
    custom = require.context('~/router', true, /\.js$/)
    custom.keys().forEach(function(key) {
      /**
       * Do not load any index.js files that are placed in the host
       * applications `store` folder
       */
      if (key === './index.js') {
        console.warn('Do not place `index.js` files in your `/router` directory, they are ignored.')
        return
      }

      if (key === './auth.js') {
        console.warn('Do not place `auth.js` files in your `/router` directory, they are ignored.')
        return
      }

      if (key === './base.js') {
        console.warn('Do not place `base.js` files in your `/router` directory, they are ignored.')
        return
      }

      console.log('Found custom routes: ', key)
      const value = custom(key).default
      console.log('val', value)
      result = [...result, ...value]
    })
    console.log(result)
    return result
  } catch (e) {
    console.error('Application level `router` folder is missing')
    return []
  }
}

export async function loadRoutes(user) {
  let customRoutes = await getCustomRoutes()
  let routes = [...userRoutes, ...customRoutes]

  if (userHasRole(user, 'ADMIN')) {
    routes = [...routes, ...adminRoutes]
  }

  // Unique
  routes = await [...new Set(routes)]
  appRoute.children = routes

  store.commit('routes/setRoutes', [appRoute])
  return appRoute
}

export function reloadRouter() {
  Vue.router = new Router({
    mode: 'history',
    routes: [...authRoutes]
  })
}

let router = new Router({
  mode: 'history',
  routes: [...authRoutes]
})

router.afterEach(function (to, from) {
  store.commit('showSideBar', false)
})

export default router
