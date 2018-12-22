import user from '@/store/user'

export default {
  namespaced: true,
  state: {
    ...user.state,
    resentVerification: false,
    retriedSignup: false
  },
  mutations: {
    ...user.mutations,
    setResentVerification(state) {
      state.resentVerification = true
    },
    setRetriedSignup(state) {
      state.retriedSignup = true
    }
  },
  getters: {
    ...user.getters,
    retriedSignup(state, _getters) {
      return state.retriedSignup
    },
    resentVerification(state, _getters) {
      return state.resentVerification
    }
  }
}
