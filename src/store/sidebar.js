export default {
  namespaced: true,
  state: {
    open: true,
    enabled: true
  },
  mutations: {
    open(state, show) {
      state.open = show
    },
    enabled(state, show) {
      state.enabled = show
    }
  },
  getters: {
    open(state, _getters) {
      return state.open
    },
    enabled(state, _getters) {
      return state.enabled
    }
  }
}
