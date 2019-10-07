// http://chaijs.com/api/bdd/
import Vue from 'vue'
import { reloadRouter } from '@/router'

describe('Router Exports', () => {
  describe('reloadRouter', () => {
    it('reloads router', () => {
      reloadRouter()
      expect(Vue.router.options.routes).to.be.an('array').that.has.lengthOf(7)
    })
  })
})
