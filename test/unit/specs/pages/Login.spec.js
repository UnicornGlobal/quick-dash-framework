import Login from '@/pages/Login'
import sinon from 'sinon'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import store from '@/store'
import axios from 'axios'
import Validator from 'vee-validate'

let mocks = {
  $http: axios,
  $auth: {
    check: sinon.stub().returns(true),
    user: sinon.stub().returns({}),
    login: sinon.stub().resolves(true)
  },
  $store: store
}

describe('Login.vue', () => {
  it('is an Object', () => {
    expect(Login).to.be.an('Object')
  })

  it('triggers sign in method', () => {
    let localVue = createLocalVue()
    localVue.use(Validator)
    const wrapper = shallowMount(Login, {localVue, mocks})
    expect(wrapper.vm.signIn).to.be.a('function')
    expect(wrapper.vm.sendSignInRequest).to.be.a('function')

    expect(wrapper.vm.bSending).to.equal(false)
    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    let sendSignInRequest = sinon.spy(wrapper.vm, 'sendSignInRequest')

    return wrapper.vm.signIn().then(() => {
      expect(sendSignInRequest.called).to.equal(true)
      sendSignInRequest.restore()
    })
  })

  it('triggers sign in with failed validation', () => {
    let localVue = createLocalVue()
    localVue.use(Validator)
    const wrapper = shallowMount(Login, {localVue, mocks})
    expect(wrapper.vm.signIn).to.be.a('function')
    expect(wrapper.vm.sendSignInRequest).to.be.a('function')

    expect(wrapper.vm.bSending).to.equal(false)
    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(false)
    let sendSignInRequest = sinon.spy(wrapper.vm, 'sendSignInRequest')

    return wrapper.vm.signIn().then(() => {
      expect(sendSignInRequest.called).to.equal(false)
      sendSignInRequest.restore()
    })
  })

  it('handles sign in error', () => {
    let localVue = createLocalVue()
    localVue.use(Validator)
    const wrapper = shallowMount(Login, {
      localVue,
      mocks: {
        $http: axios,
        $store: store,
        $auth: {
          login: (conf) => {
            return wrapper.vm.$http.post(conf)
          }
        }
      }
    })

    let post = sinon.stub(wrapper.vm.$http, 'post').rejects(Error('Invalid username'))

    return wrapper.vm.sendSignInRequest().catch((err) => {
      expect(err.message).to.equal('Invalid username')
      sinon.assert.called(post)
      post.restore()
    })
  })

  it('has default data', () => {
    const defaultData = Login.data()
    expect(defaultData).to.be.an('object')
    expect(Object.keys(defaultData)).to.have.lengthOf(5)
    expect(defaultData).to.have.all.keys('error', 'username', 'password', 'remember', 'bSending')
  })
})
