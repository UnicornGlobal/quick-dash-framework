// http://chaijs.com/api/bdd/
import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import router from '@/router'
import { userHasRole } from '@/auth'

let localVue = createLocalVue()
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

describe('Authentication Redirects', () => {
  it('Does not load login page if already logged in', () => {
    localVue.router.push({name: 'Home'})
    expect(localVue.router.currentRoute).to.be.an('Object')
    expect(localVue.router.currentRoute.name).to.equal('Home')

    localVue.router.push({name: 'Login'})
    expect(localVue.router.currentRoute.name).to.equal('Home')
  })

  it('Loads password reset page if already logged in', () => {
    localVue.router.push({name: 'Home'})
    expect(localVue.router.currentRoute).to.be.an('Object')
    expect(localVue.router.currentRoute.name).to.equal('Home')

    localVue.router.push({name: 'ResetPassword'})
    expect(localVue.router.currentRoute.name).to.equal('ResetPassword')
  })
})

describe('User roles', () => {
  it('User has role', () => {
    const result = userHasRole({
      roles: [{
        name: 'xx'
      }]
    }, 'xx')
    expect(result).to.equal(true)
  })

  it('User doesn not have role', () => {
    const result = userHasRole({
      roles: [{
        name: 'a'
      }]
    }, 'xx')
    expect(result).to.equal(false)
  })
})
