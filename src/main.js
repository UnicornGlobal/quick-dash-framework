// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/sass/base.scss'
import '@/components'

import Router from 'vue-router'
import router from './router'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import Auth from '@websanova/vue-auth'
import store from './store'

import { loadRoutes } from '@/lib'
import { loadUserData } from '@/api/user'

Vue.use(Router)
Vue.use(VeeValidate, {fieldsBagName: 'formFields', classes: false, events: 'input'})
Vue.use(VueAxios, axios)
Vue.router = router
Vue.use(Auth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
  refreshData: {
    enabled: true,
    url: 'refresh',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    }
  },
  fetchData: {
    enabled: true,
    url: 'api/me',
    method: 'GET'
  },
  async parseUserData(response) {
    store.commit('setLoading', true)

    let user = await loadUserData(response)

    let appRoute = await loadRoutes(user)
    await Vue.router.addRoutes([appRoute])

    // 'refresh' current route
    await Vue.router.replace(window.location.pathname)

    await store.commit('setLoading', false)
    return response
  }
})

Vue.axios.defaults.baseURL = process.env.apiUrl
// Uncomment when developing for more info from API failures
// Vue.axios.defaults.headers.common['Debug-Token'] = process.env.debugToken
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.config.productionTip = false

// Add a response interceptor
Vue.axios.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, (error) => {
  if (error.response && (error.response.status === 500) && (error.response.data.error === 'Token has expired and can no longer be refreshed')) {
    localStorage.clear()
    router.push('login')
  }

  if (error.response && (error.response.status === 500) && (error.response.data.error === 'The token has been blacklisted')) {
    localStorage.clear()
    router.push('login')
  }

  if (error.response && (error.response.status === 500) && (error.response.data.error === 'Wrong number of segments')) {
    localStorage.clear()
    router.push('login')
  }

  if (Vue.auth.token() === null) {
    localStorage.clear()
    router.push('login')
  }

  return Promise.reject(error)
})

Vue.router.beforeEach(function (to, from, next) {
  const excluded = ['Login', 'ResetPassword']
  if (excluded.includes(to.name) || Vue.auth.check()) {
    next()
  } else {
    localStorage.clear()
    next({name: 'Login'})
  }
})

Vue.router.afterEach(function (to, from) {
  store.commit('showSideBar', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>',
  computed: {
    loaded() {
      return !this.$store.getters.loading
    }
  },
  watch: {
    loaded(loaded) {
      const loaderElement = document.getElementById('initialLoader')
      if (loaded) {
        loaderElement.style.display = 'none'
      } else {
        loaderElement.style.display = 'flex'
      }
    }
  }
})
