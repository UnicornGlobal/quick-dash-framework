export default {
  state: {
    loading: true,
    sideBarShown: true,
    config: {}
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    showSideBar(state, show) {
      state.sideBarShown = show
    },
    setConfig(state, config) {
      state.config = config
    }
  },
  getters: {
    sideBarState(state, _getters) {
      return state.sideBarShown
    },
    loading(state) {
      return state.loading
    },
    config(state, _getters) {
      return state.config
    }
  }
}
