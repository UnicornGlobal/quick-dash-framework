// http://chaijs.com/api/bdd/
import router from '@/router'
import Router from 'vue-router'
import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'

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
  it('is an Object', () => {
    expect(router).to.be.an('Object')
  })

  it('does not load login page if already logged in', () => {
    localVue.router.push({name: 'Home'})
    expect(localVue.router.currentRoute).to.be.an('Object')
    expect(localVue.router.currentRoute.name).to.equal('Home')

    localVue.router.push({name: 'Login'})
    expect(localVue.router.currentRoute.name).to.equal('Home')
  })

  it('loads password reset page if already logged in', () => {
    localVue.router.push({name: 'Home'})
    expect(localVue.router.currentRoute).to.be.an('Object')
    expect(localVue.router.currentRoute.name).to.equal('Home')

    localVue.router.push({name: 'ResetPassword'})
    expect(localVue.router.currentRoute.name).to.equal('ResetPassword')
  })
})
