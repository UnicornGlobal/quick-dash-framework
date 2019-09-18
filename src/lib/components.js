import Vue from 'vue'

// Use a custom loader if defined
try {
  const customLoader = require('~/components/Loader').default
  Vue.component('loader', customLoader)
} catch {
  Vue.component('loader', require('../components/Loader').default)
}

Vue.component('alert', require('../components/Alert').default)
