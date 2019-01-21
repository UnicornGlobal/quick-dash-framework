export default {
  namespaced: true,
  state: {
    enabled: true,
    open: true,
    position: 'left',
    logout: false,
    profile: false,
    currentMenu: ''
  },
  mutations: {
    open(state, show) {
      state.open = show
    },
    enabled(state, show) {
      state.enabled = show
    },
    currentMenu(state, show) {
      state.currentMenu = show
    }
  },
  getters: {
    open(state, _getters) {
      return state.open
    },
    enabled(state, _getters) {
      return state.enabled
    },
    currentMenu(state, _getters) {
      return state.currentMenu
    }
  }
}
