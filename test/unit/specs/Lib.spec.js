import Vue from 'vue'
import axios from 'axios'
import UserRoutes from '@/router/UserRoutes'
import AdminRoutes from '@/router/AdminRoutes'

import { loadRoutes, reloadRouter } from '@/lib'

Vue.axios = axios.create()

describe('lib.js', () => {
  describe('loadRoutes', () => {
    it('loads user routes', async () => {
      let appRoute = await loadRoutes({_id: 1, roles: []})
      expect(appRoute.children).to.deep.equal(UserRoutes)
    })

    it('loads admin routes', async () => {
      let appRoute = await loadRoutes({_id: 1, roles: [{name: 'ADMIN'}]})
      expect(appRoute.children).to.deep.equal([...UserRoutes, ...AdminRoutes])
    })
  })

  describe('reloadRouter', () => {
    it('reloads router', () => {
      reloadRouter()
      expect(Vue.router.options.routes).to.be.an('array').that.has.lengthOf(4)
    })
  })
})
