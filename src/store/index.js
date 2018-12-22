import Vue from 'vue'
import VueX from 'vuex'

/**
 * Base framework level store
 *
 * We load these explicitly, we do not autoload all files found in
 * the framework level store folder.
 *
 * They contain their own imports.
 *
 * VueX modules are used extensively.
 */
import admin from '@/store/admin'
import auth from '@/store/auth'
import app from '@/store/app'

Vue.use(VueX)

/**
 * Custom store
 *
 * This is loaded from the host application via directory naming
 * convention.
 *
 * The convention is to load anything not called `index.js` from
 * the `src/store` folder in the host application after the built
 * in framework level requirements have been loaded.
 *
 * ~/ represents the host application `src` directory
 * @/ represents this frameworks `src` directory
 */

let custom = false
let state = {}
let mutations = {}
let getters = {}

try {
  custom = require.context('~/store', true, /\.js$/)
  custom.keys().forEach(function(key) {
    /**
     * Do not load any index.js files that are placed in the host
     * applications `store` folder
     */
    if (key === './index.js') {
      console.warn('Do not place `index.js` files in your `/store` directory, they are ignored.')
      return
    }

    if (key === './auth.js') {
      console.warn('Do not place `auth.js` files in your `/store` directory, they are ignored.')
      return
    }

    if (key === './user.js') {
      console.warn('Do not place `user.js` files in your `/store` directory, they are ignored.')
      return
    }

    if (key === './users.js') {
      console.warn('Do not place `users.js` files in your `/store` directory, they are ignored.')
      return
    }

    if (key === './roles.js') {
      console.warn('Do not place `roles.js` files in your `/store` directory, they are ignored.')
      return
    }

    console.log('Found custom store: ', key)

    state = {
      ...state,
      ...custom.state
    }

    mutations = {
      ...mutations,
      ...custom.mutations
    }

    getters = {
      ...getters,
      ...custom.getters
    }
  })
} catch (e) {
  console.error('Application level `store` folder is missing')
}

export default new VueX.Store({
  modules: {
    app,
    auth,
    admin
  },
  state,
  mutations,
  getters
})
