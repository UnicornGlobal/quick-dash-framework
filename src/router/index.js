import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import admin from '@/store/admin'
import adminRoutes from '@/router/admin'
import authRoutes from '@/router/auth'
import userRoutes from '@/router/user'
import appRoute from '@/router/base'

import { userHasRole } from '@/auth'

/**
 * These filenames are reserved for the time being.
 *
 * The future roadmap will allow the host application the ability
 * to overload the file and have their one loaded instead of the
 * base framework one.
 *
 * It's important to add the filenames of everything in the base
 * `/store` folder.
 */
const reserved = [
  'admin',
  'auth',
  'base',
  'index',
  'user'
]

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
      const name = /\.\/(\S+)\.js/.exec(key)[1]

      /**
       * Do not load any files with reserved names from the host
       * applications `router` folder and leave a warning.
       */
      if (reserved.includes(name)) {
        console.warn(`Do not place '${name}.js' files in your '/router' directory, the filenames are reserved and ignored.`)
        return
      }

      console.log('Found custom routes: ', name)
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

  /**
   * If the user is an admin then we need to add the admin specific
   * routes _and_ the admin specific stores into the mix.
   */
  if (userHasRole(user, 'ADMIN')) {
    routes = [...routes, ...adminRoutes]
    store.registerModule('admin', admin)
  }

  // Unique
  routes = await [...new Set(routes)]
  appRoute.children = routes

  store.commit('app/setRoutes', [appRoute])

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
  if (store.getters['app/sidebar/open']) {
    store.commit('app/sidebar/open', false)
  }
})

export default router
