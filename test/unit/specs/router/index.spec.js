// http://chaijs.com/api/bdd/
import Router from 'vue-router'
import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import UserRoutes from '@/router/user'
import AdminRoutes from '@/router/admin'
import router, { loadRoutes, reloadRouter } from '@/router'

let localVue = createLocalVue()
localVue.use(Router)
localVue.router = router
if (Vue.auth) {
  Vue.auth.check = () => {
    return true
  }
} else {
  Vue.auth = {
    check() {
      return true
    }
  }
}

localVue.router.addRoutes([{name: 'Home', path: ''}])

describe('router/index.js', () => {
  it('Exports an Object', () => {
    expect(router).to.be.an('Object')
  })
})

describe('Router Exports', () => {
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
