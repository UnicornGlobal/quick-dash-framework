import Vue from 'vue'
import Auth from '@websanova/vue-auth'
import store from '@/store'
import { loadRoutes } from '@/router'
import { getSelf } from '@/api/user'

export function userHasRole(user, role) {
  return user.roles.findIndex(userRole => userRole.name.toUpperCase() === role.toUpperCase()) > -1
}

export function reloadSelf() {
  getSelf().then(data => {
    store.commit('auth/user', data)
  })
}

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
      async parseUserData(user) {
        await store.commit('app/loading', true)

        // Add custom app routes (contained in sidebar)
        const appRoute = await loadRoutes(user)
        await Vue.router.addRoutes([appRoute])

        // 'refresh' current route
        await Vue.router.replace(window.location.pathname).catch(err => { if (err.name === 'NavigationDuplicated') { return true } else { throw err } })

        await store.commit('auth/user', user)
        await store.commit('app/loading', false)

        if (window.location.pathname === '/') {
          Vue.router.replace('/home')
        }
      }
    })

    // Add a response interceptor
    Vue.axios.interceptors.response.use((response) => {
      // Do something with response data
      return response
    }, (error) => {
      if (window.location.pathname.includes('/password-reset')) {
        return error
      }

      if (window.location.pathname.includes('/confirmed')) {
        Vue.router.push('/login?confirmed=true')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error ===
          'Token has expired and can no longer be refreshed'
      ) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'Token Signature could not be verified.'
      ) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (error.response && (error.response.status === 500) && (error.response.data.error === 'The token has been blacklisted')) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'The token has been blacklisted'
      ) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'Token could not be parsed from the request.'
      ) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.error === 'Wrong number of segments'
      ) {
        localStorage.clear()
        Vue.router.push('login')
      }

      if (Vue.auth.token() === null) {
        localStorage.clear()
        Vue.router.push('login')
      }

      return Promise.reject(error)
    })

    Vue.router.beforeEach(function (to, from, next) {
      const excluded = ['Login', 'ResetPassword', 'ResetPasswordForm', 'Signup', 'Confirmed']
      if (to.meta.static) {
        next()
      } else if (excluded.includes(to.name) || Vue.auth.check()) {
        next()
      } else {
        localStorage.clear()
        next({name: 'Login'})
      }
    })
  }
}
