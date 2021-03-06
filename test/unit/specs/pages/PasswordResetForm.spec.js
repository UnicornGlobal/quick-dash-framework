// http://chaijs.com/api/bdd/
import PasswordResetForm from '@/pages/PasswordResetForm'
import sinon from 'sinon'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { ErrorBag } from 'vee-validate'
import store from '@/store'
import axios from 'axios'
import Vue from 'vue'

const mocks = {
  $http: axios,
  $route: {
    params: {
      email: '1@example.com',
      token: 'lkjasfdlfsd'
    }
  },
  $auth: {
    check: sinon.stub().returns(true),
    user: sinon.stub().returns({}),
    login: sinon.stub().resolves(true)
  },
  errors: new ErrorBag(),
  $store: store
}

describe('PasswordResetForm.vue', () => {
  it('is an Object', () => {
    expect(PasswordResetForm).to.be.an('Object')
  })

  it('has default data', () => {
    const defaultData = PasswordResetForm.data()
    expect(defaultData).to.be.an('object')
    expect(Object.keys(defaultData)).to.have.lengthOf(5)
    expect(defaultData).to.have.all.keys('email', 'sent', 'sending', 'token', 'password')
  })

  it('has three methods', () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(PasswordResetForm, {localVue, mocks})

    expect(wrapper.vm.submit).to.be.a('function')
    expect(wrapper.vm.sendRequest).to.be.a('function')
    expect(wrapper.vm.goBack).to.be.a('function')
  })

  it('submits successful request', async () => {
    const localVue = createLocalVue()
    localVue.prototype.$eventBus = new Vue()
    const wrapper = shallowMount(PasswordResetForm, {localVue, mocks})
    wrapper.setData({email: 'name@example.com', sent: false})

    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    const post = sinon.stub(wrapper.vm.$http, 'post').resolves({data: {success: true}})
    const sendRequest = sinon.spy(wrapper.vm, 'sendRequest')

    await wrapper.vm.submit().then(() => {
      expect(sendRequest.called).to.equal(true)
      sendRequest.restore()
      post.restore()
      post.reset()
    })
  })

  it('submits failed request', async () => {
    const localVue = createLocalVue()
    localVue.prototype.$eventBus = new Vue()
    const wrapper = shallowMount(PasswordResetForm, {localVue, mocks})
    wrapper.setData({email: 'name@example.com', sent: false})

    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    const post = sinon.stub(wrapper.vm.$http, 'post').resolves({data: {success: false}})
    const sendRequest = sinon.spy(wrapper.vm, 'sendRequest')

    await wrapper.vm.submit().then(() => {
      expect(sendRequest.called).to.equal(true)
      sendRequest.restore()
      post.restore()
      post.reset()
    })
  })
})
