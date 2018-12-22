export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    user(state, user) {
      state.user = user
    }
  },
  getters: {
    user(state, _getters) {
      return state.user
    }
  }
}
