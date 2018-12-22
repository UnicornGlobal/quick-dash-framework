// http://chaijs.com/api/bdd/
import TopNav from '@/components/TopNav/TopNav'
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
  $store: {...store, ...{ commit: sinon.spy() }}
}

describe('TopNav.vue', () => {
  it('has property "name" with property value "top-nav"', () => {
    expect(TopNav).to.be.an('Object')
    expect(TopNav).to.have.property('name', 'top-nav')
  })

  it('has a logout method', () => {
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
    expect(wrapper.vm.logout).to.be.a('function')
    let logout = sinon.stub(wrapper.vm, 'logout').resolves(true)
    return wrapper.vm.logout().then((result) => {
      expect(result).to.equal(true)
      logout.restore()
    })
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

  it('logs out', () => {
    let wrapper = shallowMount(TopNav, {
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

    const logout = wrapper.find('a.logout-button')
    expect(logout.is('a')).to.equal(true)
    sinon.stub(wrapper.vm, 'redirectToLogin').returns(true)
    logout.trigger('click')
    expect(wrapper.vm.$auth.logout.called).to.equal(true)
  })
})
