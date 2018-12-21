export default {
  namespaced: true,
  state: {
    users: null,
    usersLoaded: null
  },
  mutations: {
    setAllUsers(state, users) {
      state.users = users
    }
  },
  getters: {
    users(state, _getters) {
      return state.users
    }
  }
}
