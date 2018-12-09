// http://chaijs.com/api/bdd/
import PasswordReset from '@/pages/PasswordReset'
import sinon from 'sinon'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { ErrorBag } from 'vee-validate'
import store from '@/store'
import axios from 'axios'
import Vue from 'vue'

let mocks = {
  $http: axios,
  $auth: {
    check: sinon.stub().returns(true),
    user: sinon.stub().returns({}),
    login: sinon.stub().resolves(true)
  },
  errors: new ErrorBag(),
  $store: store
}

describe('PasswordReset.vue', () => {
  it('is an Object', () => {
    expect(PasswordReset).to.be.an('Object')
  })

  it('has default data', () => {
    const defaultData = PasswordReset.data()
    expect(defaultData).to.be.an('object')
    expect(Object.keys(defaultData)).to.have.lengthOf(3)
    expect(defaultData).to.have.all.keys('email', 'sent', 'bSending')
  })

  it('has three methods', () => {
    let localVue = createLocalVue()
    const wrapper = shallowMount(PasswordReset, {localVue, mocks})

    expect(wrapper.vm.submit).to.be.a('function')
    expect(wrapper.vm.sendRequest).to.be.a('function')
    expect(wrapper.vm.goBack).to.be.a('function')
  })

  it('submits successful request', () => {
    let localVue = createLocalVue()
    localVue.prototype.$eventBus = new Vue()
    const wrapper = shallowMount(PasswordReset, {localVue, mocks})
    wrapper.setData({email: 'name@example.com', sent: false})

    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    let post = sinon.stub(wrapper.vm.$http, 'post').resolves({data: {success: true}})
    let sendRequest = sinon.spy(wrapper.vm, 'sendRequest')

    return wrapper.vm.submit().then(() => {
      expect(sendRequest.called).to.equal(true)
      expect(wrapper.vm.sent).to.equal(true)
      sendRequest.restore()
      post.restore()
      post.reset()
    })
  })

  it('submits failed request', () => {
    let localVue = createLocalVue()
    localVue.prototype.$eventBus = new Vue()
    const wrapper = shallowMount(PasswordReset, {localVue, mocks})
    wrapper.setData({email: 'name@example.com', sent: false})

    sinon.stub(wrapper.vm.$validator, 'validateAll').resolves(true)
    let post = sinon.stub(wrapper.vm.$http, 'post').resolves({data: {success: false}})
    let sendRequest = sinon.spy(wrapper.vm, 'sendRequest')

    return wrapper.vm.submit().then(() => {
      expect(sendRequest.called).to.equal(true)
      post.restore()
      post.reset()
    })
  })
})
