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
       */
      if (name === 'home') {
        homeRoutes = resolveHomeRoute(value, user)
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

function shouldAllowRoute(route, user) {
  if (route.role === false) {
    return true
  }

  if (route.role && route.role.indexOf('|') > -1) {
    const pieces = route.role.split('|')
    for (let x = 0; x < pieces.length; x++) {
      if (userHasRole(user, pieces[x])) {
        return true
      }
    }
  }

  if (route.role && userHasRole(user, route.role)) {
    return true
  }

  return false
}

/**
 * Filters custom routes based on required role and users available roles
 */
function filterRoutesByRole(routes, user) {
  const processedRoutes = []

  for (let i = 0; i < routes.length; i++) {
    if (shouldAllowRoute(routes[i], user)) {
      console.log('yfg')
      processedRoutes.push(routes[i])
    } else {
      console.log('dzf')
    }
  }

  return processedRoutes
}

/**
 * Makes sure there is only ever 1 homepage.
 *
 * If no valid /home route exists for the users
 * set of roles we add a default admin homepage
 * if they are an admin.
 *
 * If they are not an admin we add a default home
 * route explaining how to set up a role-based
 * home route configuration.
 *
 * If there is more than 1 home route we throw an
 * exception because there should only ever be
 * 1 home route loaded for a user.
 */
function resolveHomeRoute(routes, user) {
  const homeRoutes = filterRoutesByRole(routes, user)

  if (homeRoutes.length === 1) {
    return homeRoutes
  }

  if (homeRoutes.length === 0 && userHasRole(user, config.router.admin.role)) {
    return [
      {
        name: 'AdminHome',
        role: 'admin',
        path: '/home',
        component: config.home.admin,
        meta: {
          main: false,
          label: 'Dashboard',
          icon: icons.home
        }
      }
    ]
  }

  // Warn about bad role configuration
  if (homeRoutes.length > 1) {
    console.warn('User has a role configuration that loads multiple home routes. Falling back to default home route.')
  }

  // If there are no routes and the user is not an admin (or if multiple
  // home routes are set) then we return the default home page
  return [
    {
      name: 'Home',
      path: '/home',
      component: config.home.fallback,
      meta: {
        main: false,
        label: 'Dashboard',
        icon: icons.home
      }
    }
  ]
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
      main: !!config.sidebar.account,
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
