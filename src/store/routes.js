export default {
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    }
  },
  getters: {
    routes(state, _getter) {
      return state.routes
    }
  }
}
