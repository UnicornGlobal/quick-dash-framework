// http://chaijs.com/api/bdd/
import TopNav from '@/components/TopNav/TopNav'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import store from '@/store'

const localVue = createLocalVue()

const mocks = {
  $auth: {
    user() {
      return {
        first_name: 'fn',
        last_name: 'ln'
      }
    }
  },
  $store: {
    ...store,
    ...{
      commit: sinon.spy(),
      getters: {
        'app/sidebar/open': true,
        'app/config': {
          sidebar: {
            position: 'left'
          },
          header: {
            logo: true
          }
        }
      }
    }
  }
}

describe('TopNav.vue', () => {
  it('has property "name" with property value "top-nav"', () => {
    expect(TopNav).to.be.an('Object')
    expect(TopNav).to.have.property('name', 'top-nav')
  })

  it('has a toggle sidebar method', () => {
    const wrapper = shallowMount(TopNav, {
      localVue,
      mocks,
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        },
        loaded: true
      }
    })

    expect(wrapper.vm.toggleSideBar).to.be.a('function')
    wrapper.vm.toggleSideBar()
    expect(wrapper.vm.$store.commit.calledWith('app/sidebar/open', false)).to.equal(true)
  })
})
