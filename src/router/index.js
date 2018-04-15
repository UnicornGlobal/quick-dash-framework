import Router from 'vue-router'
import SharedRoutes from './SharedRoutes'

export default new Router({
  mode: 'history',
  routes: [...SharedRoutes]
})
