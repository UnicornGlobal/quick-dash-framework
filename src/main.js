import '@/assets/sass/base.scss'

import Vue from 'vue'
import Router from 'vue-router'

import router from '@/router'
import store from '@/store'
import auth from '@/auth'
import comms from '@/http'
import lib from '@/lib'

Vue.config.productionTip = false

Vue.use(Router)
Vue.router = router

const start = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view></router-view>',
    computed: {
      loaded() {
        return !this.$store.getters['app/loading']
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
}

comms.init()
auth.init()
lib.load()
// lib.init()

export default {
  install: (Vue, options) => {
    // router = [...options.router]
    // Vue.router.addRoutes(options.router)
    // await Vue.router.replace(window.location.pathname)
    // store.commit('setRoutes', [options.router])
  }
}

window.onload = () => {
  start()
}
