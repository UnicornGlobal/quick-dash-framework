export default {
  state: {
    allRoles: null
  },
  mutations: {
    setAllRoles: (state, roles) => {
      state.allRoles = roles
    }
  },
  getters: {
    allRoles(state, _getters) {
      return state.allRoles
    }
  }
}
