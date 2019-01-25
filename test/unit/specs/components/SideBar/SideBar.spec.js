// http://chaijs.com/api/bdd/
import SideBar from '@/components/SideBar/SideBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

let localVue = createLocalVue()
let mocks = {
  $route: {
    name: 'Home',
    matched: []
  },
  $store: {
    getters: {
      'app/config': {
        sidebar: {
          profile: true,
          logout: true
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

    let menu = {
      name: 'Home',
      path: '',
      meta: {
        label: 'Home'
      }
    }

    let sidebar = shallowMount(SideBar, {
      localVue,
      propsData: {
        user: {},
        menus: [ menu ],
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
    let sidebar = shallowMount(SideBar, {
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
    let sidebar = shallowMount(SideBar, {
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

  it('only keeps one folder open', () => {
    let sidebar = shallowMount(SideBar, {
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
          },
          {
            name: 'profile',
            path: '/',
            meta: {
              icon: 'fa fa-user',
              label: 'Profile',
              main: true
            }
          }
        ],
        rootPath: '/'
      },
      mocks
    })

    expect(sidebar.vm.currentMenu).to.equal('Home')

    sidebar.vm.getCurrentMenu('menu_0')
    expect(sidebar.vm.currentMenu).to.equal('menu_0')

    sidebar.vm.getCurrentMenu('menu_1')
    expect(sidebar.vm.currentMenu).to.equal('menu_1')
  })

  it('Has functions to alter SideBar state', () => {
    let app = shallowMount(SideBar, {
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

    expect(app.vm.toggleSideBar).to.be.a('function')
  })
})
