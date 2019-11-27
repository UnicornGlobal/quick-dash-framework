// http://chaijs.com/api/bdd/
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Home from '@/pages/Admin/Home/Home'
import VerifyAccountCard from '@/components/Cards/VerifyAccountCard'

describe('Admin/Home.vue', () => {
  it('is an Object', () => {
    expect(Home).to.be.an('Object')
  })

  it('Has the correct component', () => {
    expect(Home.components).to.be.an('object').that.has.all.keys(['VerifyAccountCard', 'PageContainer', 'PageSection'])
  })

  it('Renders with confirmed account', () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(Home, {
      localVue,
      mocks: {
        $store: {
          getters: {
            'auth/user': {
              _id: 1,
              confirmed: true
            }
          }
        }
      }
    })

    expect(wrapper.find('p').text()).to.equal('Admin Role Loaded')
    expect(wrapper.find(VerifyAccountCard).exists()).to.equal(false)
  })

  it('Renders with unconfirmed account', () => {
    const localVue = createLocalVue()
    const wrapper = shallowMount(Home, {
      localVue,
      mocks: {
        $store: {
          getters: {
            'auth/user': {
              _id: 1,
              confirmed: false
            }
          }
        }
      }
    })

    expect(wrapper.find(VerifyAccountCard).exists()).to.equal(true)
  })
})
