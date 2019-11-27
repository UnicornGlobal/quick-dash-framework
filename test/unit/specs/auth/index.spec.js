// http://chaijs.com/api/bdd/
import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import router from '@/router'
import { userHasRole, reloadSelf } from '@/auth'
import auth from '@/auth'
import store from '@/store'

const localVue = createLocalVue()
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

describe('General methods', () => {
  it('reloadSelf', () => {
    const originalGet = Vue.axios.get

    var getSelf = sinon.stub().resolves({
      '_id': '111111111',
      'username': 'user',
      'first_name': 'User',
      'last_name': 'Last',
      'email': 'lastname@example.com',
      'mobile': '+27822221111',
      'about': 'Example',
      'is_verified': 0,
      'title': null,
      'location': 'London, ON, Canada',
      'company_name': 'ExtraVallis',
      'referer': null,
      'account_type': 'startup',
      'facebook': null,
      'twitter': null,
      'linkedin': null,
      'instagram': null,
      'youtube': null,
      'confirmed': false,
      'roles': [
        {
          '_id': '1111',
          'name': 'startup'
        },
        {
          '_id': '2222',
          'name': 'user'
        }
      ],
      'primary_startup': null,
      'startup_company': null,
      'primary_investment': null,
      'investment_company': null,
      'profile_photo': null
    })

    Vue.axios.get = getSelf
    const result = reloadSelf()
    expect(getSelf.called).to.equal(true)
    Vue.axios.get = originalGet
  })
})

describe('Default export', () => {
  it('init', () => {
    Vue.axios.interceptors = {
      response: {
        use: sinon.stub().resolves({})
      }
    }

    const originalRouter = Vue.router
    const originalUse = Vue.use

    Vue.use = sinon.stub()
    Vue.router = {
      beforeEach: sinon.stub()
    }

    const result = auth.init()

    expect(Vue.use.called).to.equal(true)
    expect(Vue.router.beforeEach.called).to.equal(true)

    Vue.use = originalUse
    Vue.router = originalRouter
  })
})
