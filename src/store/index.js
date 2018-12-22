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
let external = {}

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
  'index',
  'roles',
  'routes',
  'sidebar',
  'user',
  'users'
]

try {
  custom = require.context('~/store', true, /\.js$/)
  custom.keys().forEach(function(key) {
    const name = /\.\/(\S+)\.js/.exec(key)[1]

    /**
     * Do not load any files with reserved names from the host
     * applications `store` folder and leave a warning.
     */
    if (reserved.includes(name)) {
      console.warn(`Do not place '${name}.js' files in your '/store' directory, the filenames are reserved and ignored.`)
      return
    }

    console.log('Found custom store: ', name)

    /**
     * Put together an object containing all the external store exports
     * and collate them into a single object, using their filename as
     * the key.
     *
     * This results in the VueX store being configured with the
     * trimmed filename as the root namespace.
     *
     * As an example, if you have a custom store called `awesome` then
     * you will have a VueX namespace on the root called `awesome` that
     * will contain your getters and setters.
     *
     * It's best to namespace in the external application, and access
     * your getters like `store.getters['awesome/thing']` and do your
     * custom commits like `store.commit('awesome/thing', value)`.
     */
    external = {
      ...external,
      [name]: custom(key).default
    }
  })
} catch (e) {
  console.error('Application level `store` folder is missing')
}

export default new VueX.Store({
  modules: {
    ...external,
    app,
    auth,
    admin
  }
})
