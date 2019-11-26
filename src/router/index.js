import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import admin from '@/store/admin'
import baseAdminRoutes from '@/router/admin'
import authRoutes from '@/router/auth'
import originalHomeRoutes from '@/router/home'
import appRoute from '@/router/base'
import config from '@/config'
import icons from '@/icons'
import strings from '@/i18n/en/sidebar'

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
  'auth',
  'base',
  'index'
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
async function getCustomRoutes(user) {
  let customFile
  let homeRoutes = originalHomeRoutes
  let customRoutes = []
  try {
    // Load everything except for the 'static' folder in the host app
    // The static folder contains things that are outside of the App.vue
    // This is things like contact forms or terms and conditions
    customFile = require.context('~/router', true, /^((?![\\/]static[\\/]).)*\.js$/)
    customFile.keys().forEach(function(key) {
      const name = /\.\/(\S+)\.js/.exec(key)[1]

      /**
       * Do not load any files with reserved names from the host
       * applications `router` folder and leave a warning.
       */
      if (reserved.includes(name)) {
        console.warn(`Do not place '${name}.js' files in your '/router' directory, the filenames are reserved and ignored.`)
        return
      }

      const value = customFile(key).default

      /**
       * Override home route if available
       * We do these seperately so that we can always make home routes
       * the first entry on the sidebar.
       *
       * TODO there should technically only be 1 home route allowed...
       */
      if (name === 'home') {
        homeRoutes = filterRoutesByRole(value, user)
      }

      // Check non-home routes
      // Skip any admin routes
      if (name !== 'home' && name !== 'admin') {
        customRoutes = [...customRoutes, ...filterRoutesByRole(value, user)]
      }
    })

    // Combine, placing the home routes at the top of the list
    return [...homeRoutes, ...customRoutes]
  } catch (e) {
    console.error('Application level `router` folder is missing or contents are malformed!')
    return []
  }
}

/**
 * Filters custom routes based on required role and users available roles
 */
function filterRoutesByRole(routes, user) {
  const processedRoutes = []

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].role && userHasRole(user, routes[i].role)) {
      processedRoutes.push(routes[i])
    }
  }

  return processedRoutes
}

// These are any routes available in the ~/src/router/static folder
// These are loaded outside of the App.vue
// These do not require authorization
// Examples include contact forms and privacy policy pages
// These get excluded from the getCustomRoutes require.context
export function loadStaticRoutes() {
  let staticRoutes = false
  let staticResult = []
  try {
    staticRoutes = require.context('~/router/static', true, /\.js$/)
    staticRoutes.keys().forEach(function(key) {
      const value = staticRoutes(key).default

      staticResult = [...staticResult, ...value]
    })

    return staticResult
  } catch (e) {
    console.log('No static routes found')
    return []
  }
}

export async function loadRoutes(user) {
  const customRoutes = await getCustomRoutes(user)
  let routes = [...customRoutes]

  /**
   * If the user is an admin then we need to add the admin specific
   * routes _and_ the admin specific stores into the mix.
   *
   * These are the framework-level admin routes, not custom ones
   */
  if (config.router.admin.enabled && userHasRole(user, config.router.admin.role)) {
    routes = [...routes, ...baseAdminRoutes]
    store.registerModule('admin', admin)
  }

  /**
   * Load the account page link as the last item in the sidebar
   */
  const account = config.router.account.enabled ? [{
    name: 'Account',
    path: '/account',
    component: config.router.account.component,
    meta: {
      main: config.sidebar.account ? true : false,
      label: strings.account,
      icon: icons.account
    }
  }] : []

  routes = [...routes, ...account]

  // Unique
  routes = await [...new Set(routes)]
  appRoute.children = routes

  store.commit('app/setRoutes', [appRoute])

  return appRoute
}

const staticRoutes = loadStaticRoutes()

export function reloadRouter() {
  Vue.router = new Router({
    mode: 'history',
    routes: [...staticRoutes, ...authRoutes]
  })
}

const router = new Router({
  mode: 'history',
  routes: [...staticRoutes, ...authRoutes]
})

router.afterEach(function (to, from) {
  if (store.getters['app/sidebar/open']) {
    store.commit('app/sidebar/open', false)
  }
})

export default router
