export default {
  state: {
    loading: true,
    sideBarShown: true,
    sideBarEnabled: true,
    config: {}
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    showSideBar(state, show) {
      state.sideBarShown = show
    },
    sideBarEnabled(state, show) {
      state.sideBarEnabled = show
    },
    setConfig(state, config) {
      state.config = config
    }
  },
  getters: {
    sideBarState(state, _getters) {
      return state.sideBarShown
    },
    sideBarEnabled(state, _getters) {
      return state.sideBarEnabled
    },
    loading(state) {
      return state.loading
    },
    config(state, _getters) {
      return state.config
    }
  }
}
