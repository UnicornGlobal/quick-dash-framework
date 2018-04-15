import Vue from 'vue'
import VueX from 'vuex'

import user from './user'
import common from './common'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    ...user.state,
    ...common.state
  },
  mutations: {
    ...user.mutations,
    ...common.mutations
  },
  getters: {
    ...user.getters,
    ...common.getters
  }
})
