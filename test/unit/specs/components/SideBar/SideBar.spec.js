// http://chaijs.com/api/bdd/
import SideBar from '@/components/SideBar/SideBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

const localVue = createLocalVue()
const mocks = {
  $route: {
    name: 'Home',
    label: 'Home',
    matched: []
  },
  $store: {
    getters: {
      'app/config': {
        sidebar: {
          profile: true,
          logout: true,
          icons: true,
          highlight: false
        }
      }
    }
  }
}

describe('SideBar.vue', () => {
  it('it is an object', () => {
    expect(SideBar).to.be.an('object')
  })

  it('accepts menus and root-path props', () => {
    expect(SideBar.props).to.be.an('object')

    const menu = {
      name: 'Home',
      path: '',
      meta: {
        label: 'Home'
      }
    }

    const sidebar = shallowMount(SideBar, {
      localVue,
      propsData: {
        user: {},
        menus: [menu],
        rootPath: '/test'
      },
      stubs: ['router-link'],
      mocks
    })

    expect(sidebar.vm.rootPath).to.equal('/test')
    expect(sidebar.vm.menus).to.be.an('array').that.has.lengthOf(1)
    expect(sidebar.vm.menus[0].name).to.equal('Home')
  })

  it('loads main menu routes', () => {
    const sidebar = shallowMount(SideBar, {
      localVue,
      propsData: {
        user: {},
        menus: [
          {
            name: 'home',
            path: '/',
            meta: {
              icon: 'fa fa-home',
              label: 'Home',
              main: true
            }
          }
        ]
      },
      mocks
    })
    const menus = sidebar.vm.menus
    expect(menus).to.be.an('array')
    expect(menus).to.have.lengthOf.at.least(1)
    const menu = menus[0]
    expect(menu).to.be.an('object')
    expect(menu.meta).to.be.an('object')
    expect(menu.meta.main).to.equal(true)
  })

  it('logs out', () => {
    const sidebar = shallowMount(SideBar, {
      localVue,
      propsData: {
        user: {},
        menus: [
          {
            name: 'home',
            path: '/',
            meta: {
              icon: 'fa fa-home',
              label: 'Home',
              main: true
            }
          }
        ]
      },
      mocks: {
        ...mocks,
        $auth: {
          user() {
            return {
              first_name: 'fn',
              last_name: 'ln'
            }
          },
          logout: sinon.stub().resolves(true)
        }
      }
    })

    const logout = sidebar.find('a.logout')
    expect(logout.is('a')).to.equal(true)
    sinon.stub(sidebar.vm, 'redirectToLogin').returns(true)
    logout.trigger('click')
    expect(sidebar.vm.$auth.logout.called).to.equal(true)
  })
})
