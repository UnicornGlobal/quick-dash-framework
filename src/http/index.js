import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  init: () => {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = process.env.apiUrl
    Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
  }
}
