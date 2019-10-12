import Login from '@/pages/Login'
import sinon from 'sinon'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import store from '@/store'
import { ErrorBag } from 'vee-validate'
import Vue from 'vue'

const mocks = {
  $auth: {
    check: sinon.stub().returns(true),
    user: sinon.stub().returns({}),
    login: sinon.stub().resolves(true)
  },
  $route: {},
  errors: new ErrorBag(),
  $store: store
}

const stubs = ['router-link']

describe('Login.vue', () => {
  it('is an Object', () => {
    expect(Login).to.be.an('Object')
  })

  it('triggers sign in method', () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(Login, {localVue, mocks, stubs})
    expect(wrapper.vm.signIn).to.be.a('function')
    expect(wrapper.vm.sendSignInRequest).to.be.a('function')

    expect(wrapper.vm.bSending).to.equal(false)
    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    const sendSignInRequest = sinon.spy(wrapper.vm, 'sendSignInRequest')

    return wrapper.vm.signIn().then(() => {
      expect(sendSignInRequest.called).to.equal(true)
      sendSignInRequest.restore()
    })
  })

  it('triggers sign in with failed validation', async () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(Login, {localVue, mocks, stubs})
    expect(wrapper.vm.signIn).to.be.a('function')
    expect(wrapper.vm.sendSignInRequest).to.be.a('function')

    expect(wrapper.vm.bSending).to.equal(false)
    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(false)
    const sendSignInRequest = sinon.spy(wrapper.vm, 'sendSignInRequest')

    await wrapper.vm.signIn()
    expect(sendSignInRequest.called).to.equal(false)
    sendSignInRequest.restore()
  })

  it('handles sign in error', async () => {
    const localVue = createLocalVue()

    Vue.axios = {
      post: sinon.stub().rejects(Error('Invalid username'))
    }

    const wrapper = shallowMount(Login, {
      localVue,
      stubs,
      mocks: {
        $store: store,
        $route: {},
        $auth: {
          login: (conf) => {
            return Vue.axios.post()
          }
        }
      }
    })

    try {
      await wrapper.vm.sendSignInRequest()
    } catch (e) {
      expect(e.message).to.equal('Invalid username')
    }

    sinon.assert.called(Vue.axios.post)
  })

  it('has default data', () => {
    const defaultData = Login.data()
    expect(defaultData).to.be.an('object')
    expect(Object.keys(defaultData)).to.have.lengthOf(6)
    expect(defaultData).to.have.all.keys('message', 'error', 'username', 'password', 'remember', 'bSending')
  })
})
