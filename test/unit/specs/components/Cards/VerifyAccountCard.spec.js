import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import sinon from 'sinon'
import Vue from 'vue'
import store from '@/store'

describe('VerifyAccountCard.vue', () => {
  it('Is an object', () => {
    expect(VerifyAccountCard).to.be.an('object')
  })

  it('Has correct props', () => {
    expect(VerifyAccountCard.props).to.be.an('object').that.has.all.keys('user')
  })

  it('resends mail', () => {
    const localVue = createLocalVue()
    const card = shallowMount(VerifyAccountCard, {
      localVue,
      propsData: {
        user: {}
      },
      mocks: {
        $store: {...store, ...{ commit: sinon.spy() }}
      }
    })

    Vue.axios = {
      get: sinon.stub().resolves({data: {}})
    }

    card.vm.resendMail()
    expect(card.vm.$store.commit.called).to.equal(true)

    card.vm.$store.commit('auth/resentVerification', true)
    card.vm.resendMail()
    expect(card.vm.$store.commit.calledTwice).to.equal(false)
  })
})
