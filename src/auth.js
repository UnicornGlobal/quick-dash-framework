import Vue from 'vue'
import Auth from '@websanova/vue-auth'
import store from '@/store'
import { loadUserData } from '@/api/user'
import { loadRoutes } from '@/lib'
// TODO ?
import router from '@/router'

export default {
  init: () => {
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
        await store.commit('setLoading', true)

        let user = await loadUserData(response)

        let appRoute = await loadRoutes(user)
        await Vue.router.addRoutes([appRoute])

        // 'refresh' current route
        await Vue.router.replace(window.location.pathname)

        await store.commit('setLoading', false)
        return response
      }
    })

    // Add a response interceptor
    Vue.axios.interceptors.response.use((response) => {
      // Do something with response data
      return response
    }, (error) => {
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error ===
          'Token has expired and can no longer be refreshed'
      ) {
        localStorage.clear()
        router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'Token Signature could not be verified.'
      ) {
        localStorage.clear()
        router.push('login')
      }

      if (error.response && (error.response.status === 500) && (error.response.data.error === 'The token has been blacklisted')) {
        localStorage.clear()
        router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'The token has been blacklisted'
      ) {
        localStorage.clear()
        router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'Wrong number of segments'
      ) {
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
  }
}
