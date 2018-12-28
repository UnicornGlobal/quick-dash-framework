// http://chaijs.com/api/bdd/
import UserMenu from '@/components/TopNav/UserMenu'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import store from '@/store'

const localVue = createLocalVue()

let mocks = {
  $auth: {
    user() {
      return {
        first_name: 'fn',
        last_name: 'ln'
      }
    },
    logout: sinon.stub().resolves(true)
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
            enabled: true,
            avatar: true,
            name: true,
            logout: true,
            profile: true
          }
        }
      }
    }
  }
}

describe('UserMenu.vue', () => {
  it('has a logout method', async () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks,
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })
    expect(wrapper.vm.logout).to.be.a('function')
    let logout = sinon.stub(wrapper.vm, 'logout').resolves(true)
    await wrapper.vm.logout().then((result) => {
      expect(result).to.equal(true)
      logout.restore()
    })
  })

  it('logs out', () => {
    let wrapper = shallowMount(UserMenu, {
      localVue,
      mocks,
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    const logout = wrapper.find('a.logout-button')
    expect(logout.is('a')).to.equal(true)
    sinon.stub(wrapper.vm, 'redirectToLogin').returns(true)
    logout.trigger('click')
    expect(wrapper.vm.$auth.logout.called).to.equal(true)
  })
})
