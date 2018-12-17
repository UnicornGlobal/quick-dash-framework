// http://chaijs.com/api/bdd/
import SideBarMenuItem from '@/components/SideBar/SideBarMenuItem'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('SideBarMenuItem.vue', () => {
  it('renders menu item without children', () => {
    let localVue = createLocalVue()

    let mocks = {
      $route: {
        name: 'Home',
        matched: []
      }
    }

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      localVue,
      propsData: {
        base: 'xxx',
        menu: {
          name: 'home',
          path: '/',
          meta: {
            icon: '',
            label: 'Home',
            main: true
          }
        }
      },
      mocks,
      stubs: ['router-link']
    })

    expect(sidebarMenuItem.vm).to.have.property('hasChildren', false)
  })

  it('renders menu items with children', () => {
    let localVue = createLocalVue()

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      localVue,
      propsData: {
        menu: {
          name: 'home',
          path: '/',
          meta: {
            label: 'Home',
            main: true
          },
          children: [
            {
              name: 'Test',
              path: 'test',
              meta: {
                label: 'Test',
                main: true
              }
            }
          ]
        }
      },
      stubs: ['router-link', 'side-bar-menu-item'],
      mocks: {
        $route: {
          name: 'Home',
          matched: []
        }
      }
    })

    expect(sidebarMenuItem.vm).to.have.property('hasChildren', true)
  })

  it('shows current route', () => {
    let localVue = createLocalVue()

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      localVue,
      propsData: {
        menu: {
          name: 'Home',
          path: '/',
          meta: {
            icon: '',
            label: 'Home',
            main: true
          }
        }
      },
      stubs: ['router-link'],
      mocks: {
        $route: {
          name: 'Home',
          matched: []
        }
      }
    })

    expect(sidebarMenuItem.vm).to.have.property('isCurrent', true)
  })

  it("computes route's full path", () => {
    let localVue = createLocalVue()

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      localVue,
      propsData: {
        base: '/base/path',
        menu: {
          name: 'Home',
          path: 'test',
          meta: {
            label: 'Home',
            main: true
          }
        }
      },
      stubs: ['router-link', 'side-bar-menu-item'],
      mocks: {
        $route: {
          name: 'Home',
          matched: []
        }
      }
    })

    expect(sidebarMenuItem.vm).to.have.property('fullPath', '/base/path/test')
  })

  it('it opens menu if its matched in current route', () => {
    let localVue = createLocalVue()

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      propsData: {
        localVue,
        base: '/',
        menu: {
          name: 'Home',
          path: 'home',
          meta: {
            label: 'Home',
            main: true
          },
          children: [
            {
              name: 'Test',
              path: 'test',
              meta: {
                label: 'Test',
                main: true
              }
            }
          ]
        }
      },
      stubs: ['router-link', 'side-bar-menu-item'],
      mocks: {
        $route: {
          name: 'Home',
          matched: [{path: '/'}, {path: '/home'}]
        }
      }
    })

    expect(sidebarMenuItem.vm).to.have.property('open', true)
  })

  it('it closes sidebar when clicked', () => {
    let localVue = createLocalVue()

    let sidebarMenuItem = shallowMount(SideBarMenuItem, {
      localVue,
      propsData: {
        base: '/',
        menu: {
          name: 'Home',
          path: 'home',
          meta: {
            label: 'Home',
            main: true
          }
        }
      },
      stubs: ['router-link', 'side-bar-menu-item'],
      mocks: {
        $route: {
          name: 'Home',
          matched: []
        },
        $store: {
          commit: sinon.spy()
        }
      }
    })

    sidebarMenuItem.vm.closeSidebar()
    expect(sidebarMenuItem.vm.$store.commit.calledWith('showSideBar', false)).to.equal(true)
  })
})
