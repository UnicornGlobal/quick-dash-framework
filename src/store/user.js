export default {
  state: {
    user: {},
    userLoaded: true
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  getters: {
    user(state, _getters) {
      return state.user
    }
  }
}
