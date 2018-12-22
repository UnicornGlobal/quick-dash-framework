export default {
  namespaced: true,
  state: {
    roles: null
  },
  mutations: {
    roles: (state, roles) => {
      state.roles = roles
    }
  },
  getters: {
    roles(state, _getters) {
      return state.roles
    }
  }
}
