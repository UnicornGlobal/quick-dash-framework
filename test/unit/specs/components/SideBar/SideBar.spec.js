// http://chaijs.com/api/bdd/
import SideBar from '@/components/SideBar/SideBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

let localVue = createLocalVue()

describe('SideBar.vue', () => {
  it('it is an object', () => {
    expect(SideBar).to.be.an('object')
  })

  it('has a name', () => {
    expect(SideBar).to.have.property('name', 'side-bar')
  })

  it('accepts menus and root-path props', () => {
    expect(SideBar.props).to.be.an('array')
    let menu = {
      name: 'Home',
      path: '',
      meta: {
        label: 'Home'
      }
    }

    let sidebar = shallowMount(SideBar, {localVue, propsData: {menus: [menu], rootPath: '/test'}})
    expect(sidebar.vm.rootPath).to.equal('/test')
    expect(sidebar.vm.menus).to.be.an('array').that.has.lengthOf(1)
    expect(sidebar.vm.menus[0].name).to.equal('Home')
  })

  it('loads main menu routes', () => {
    let sidebar = shallowMount(SideBar, {
      localVue,
      propsData: {
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
      }
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
