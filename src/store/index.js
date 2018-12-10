import Vue from 'vue'
import VueX from 'vuex'

import user from '@/store/user'
import users from '@/store/users'
import roles from '@/store/roles'
import auth from '@/store/auth'
import routes from '@/store/routes'
import common from '@/store/common'

Vue.use(VueX)

/**
 * Base framework level store
 *
 * We load these explicitly, we do not autoload all files found in
 * the framework level store folder.
 */
let state = {
  ...user.state,
  ...auth.state,
  ...routes.state,
  ...common.state,
  ...users.state,
  ...roles.state
}

let mutations = {
  ...user.mutations,
  ...auth.mutations,
  ...routes.mutations,
  ...common.mutations,
  ...users.mutations,
  ...roles.mutations
}

let getters = {
  ...user.getters,
  ...auth.getters,
  ...routes.getters,
  ...common.getters,
  ...roles.getters
}

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
  state,
  mutations,
  getters
})
