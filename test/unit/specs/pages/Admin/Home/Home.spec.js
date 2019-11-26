// http://chaijs.com/api/bdd/
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Home from '@/pages/Admin/Home/Home'

describe('Admin/Home.vue', () => {
  it('is an Object', () => {
    expect(Home).to.be.an('Object')
  })

  it('Has the correct component', () => {
    expect(Home.components).to.be.an('object').that.has.all.keys(['VerifyAccountCard', 'PageContainer', 'PageSection'])
  })

  it('Renders', () => {
    let localVue = createLocalVue()
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
  })
})
