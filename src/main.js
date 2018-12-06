import '@/assets/sass/base.scss'

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import DataTable from 'unicorn-vue-datatable'

import router from '@/router'
import store from '@/store'
import auth from '@/auth'
import comms from '@/comms'

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  classes: false,
  events: 'input'
})

Vue.use(DataTable, {
  theme: {
    primary: '#B7C7E0',
    primaryText: 'black',
    secondaryText: '#1B2638',
    secondary: '#343',
    padding: '1em',
    rowHeight: '65px'
  }
})

const start = () => {
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
}

comms.init()
auth.init()

export default {
  install: (Vue, options) => {
    // router = [...options.router]
    console.log(options.router, Vue.router, router)
    Vue.router.addRoutes(options.router)
    // await Vue.router.replace(window.location.pathname)
    // console.log(store.getters.routes)
    // store.commit('setRoutes', [options.router])
  }
}

window.onload = () => {
  start()
}
