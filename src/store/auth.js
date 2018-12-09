export default {
  state: {
    resentVerification: false,
    retriedSignup: false
  },
  mutations: {
    setResentVerification(state) {
      state.resentVerification = true
    },
    setRetriedSignup(state) {
      state.retriedSignup = true
    }
  },
  getters: {
    retriedSignup(state, _getters) {
      return state.retriedSignup
    },
    resentVerification(state, _getters) {
      return state.resentVerification
    }
  }
}
