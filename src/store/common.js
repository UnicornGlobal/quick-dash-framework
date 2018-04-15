export default {
  state: {
    loading: true,
    sideBarShown: true,
    resentVerification: false,
    retriedSignup: false,
    routes: [],
    config: {}
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    showSideBar(state, show) {
      state.sideBarShown = show
    },
    setRoutes(state, routes) {
      state.routes = routes
    },
    setResentVerification(state) {
      state.resentVerification = true
    },
    setRetriedSignup(state) {
      state.retriedSignup = true
    },
    setConfig(state, config) {
      state.config = config
    }
  },
  getters: {
    sideBarState(state, _getters) {
      return state.sideBarShown
    },
    retriedSignup(state, _getters) {
      return state.retriedSignup
    },
    resentVerification(state, _getters) {
      return state.resentVerification
    },
    loading(state) {
      return state.loading
    },
    routes(state, _getter) {
      return state.routes
    },
    config(state, _getters) {
      return state.config
    }
  }
}
