// http://chaijs.com/api/bdd/
import Vue from 'vue'
import { reloadRouter, loadRoutes, loadStaticRoutes } from '@/router'

describe('Router Exports', () => {
  describe('reloadRouter', () => {
    it('reloads router', () => {
      reloadRouter()
      expect(Vue.router.options.routes).to.be.an('array').that.has.lengthOf(7)
    })
  })

  describe('loadStaticRoutes', () => {
    it('Loads any static routes that may be available', () => {
      const routes = loadStaticRoutes()
      // There are no default static routes
      expect(routes).to.be.an('array').that.has.lengthOf(0)
    })
  })

  describe('loadRoutes', () => {
    it('Load routes as an admin user', async () => {
      const user = {
        roles: [
          {
            name: 'admin'
          }
        ]
      }

      const routes = await loadRoutes(user)

      expect(routes).to.be.an('object').that.has.all.keys(['path', 'component', 'meta', 'children'])
      expect(routes.path).to.equal('/')
      expect(routes.meta.label).to.equal('Home')
      expect(routes.children).to.be.an('array').that.has.lengthOf(3)
      expect(routes.children[0].meta.label).to.equal('Dashboard')
      expect(routes.children[1].meta.label).to.equal('Admin Account')
      expect(routes.children[2].path).to.equal('/account')
    })

    it('Load routes as a normal user', async () => {
      const user = {
        roles: [
          {
            name: 'user'
          }
        ]
      }

      const routes = await loadRoutes(user)

      expect(routes).to.be.an('object').that.has.all.keys(['path', 'component', 'meta', 'children'])
      expect(routes.path).to.equal('/')
      expect(routes.meta.label).to.equal('Home')
      expect(routes.children).to.be.an('array').that.has.lengthOf(2)
      expect(routes.children[0].meta.label).to.equal('Dashboard')
      expect(routes.children[1].meta.label).to.equal('Account Settings')
      expect(routes.children[1].path).to.equal('/account')
    })
  })
})
