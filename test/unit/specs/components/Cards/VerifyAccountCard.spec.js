import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import sinon from 'sinon'

describe('VerifyAccountCard.vue', () => {
  it('resends mail', () => {
    const localVue = createLocalVue()
    const card = shallowMount(VerifyAccountCard, {
      localVue,
      propsData: {
        user: {}
      },
      mocks: {
        $store: {
          getters: {
            resentVerification: false
          },
          commit: sinon.stub()
        }
      }
    })

    card.vm.resendMail()
    expect(card.vm.$store.commit.called).to.equal(true)

    card.vm.$store.getters.resentVerification = true
    card.vm.resendMail()
    expect(card.vm.$store.commit.calledTwice).to.equal(false)
  })
})
