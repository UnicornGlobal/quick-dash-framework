export default {
  namespaced: true,
  state: {
    users: null
  },
  mutations: {
    users(state, users) {
      state.users = users
    }
  },
  getters: {
    users(state, _getters) {
      return state.users
    }
  }
}
