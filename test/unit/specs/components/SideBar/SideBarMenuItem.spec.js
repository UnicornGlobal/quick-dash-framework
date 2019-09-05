// http://chaijs.com/api/bdd/
import SideBarMenuItem from '@/components/SideBar/SideBarMenuItem'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import store from '@/store'

describe('SideBarMenuItem.vue', () => {
  it('renders menu item without children', () => {
    const localVue = createLocalVue()

    const mocks = {
      $route: {
        name: 'Home',
        matched: []
      },
      $store: {
        getters: {
          'app/sidebar/open': true,
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

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
    const localVue = createLocalVue()

    const mocks = {
      $route: {
        name: 'Home',
        matched: []
      },
      $store: {
        getters: {
          'app/sidebar/open': true,
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

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
      mocks
    })

    expect(sidebarMenuItem.vm).to.have.property('hasChildren', true)
  })

  it('shows current route', () => {
    const localVue = createLocalVue()

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
        },
        $store: {
          getters: {
            'app/sidebar/open': true,
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
    })

    expect(sidebarMenuItem.vm).to.have.property('isCurrent', true)
  })

  it('computes route\'s full path', () => {
    const localVue = createLocalVue()

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
        },
        $store: {
          getters: {
            'app/sidebar/open': true,
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
    })

    expect(sidebarMenuItem.vm).to.have.property('fullPath', '/base/path/test')
  })

  it('it opens menu if its matched in current route', () => {
    const localVue = createLocalVue()

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
        },
        $store: {
          getters: {
            'app/sidebar/open': true,
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
    })

    expect(sidebarMenuItem.vm).to.have.property('open', true)
  })

  it('it closes sidebar when clicked', () => {
    const localVue = createLocalVue()

    store.commit('app/sidebar/open', true)

    const sidebarMenuItem = shallowMount(SideBarMenuItem, {
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
          ...store,
          ...{ commit: sinon.spy() },
          ...{
            getters: {
              'app/sidebar/open': true,
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
      }
    })

    sidebarMenuItem.vm.closeSidebar()
    expect(sidebarMenuItem.vm.$store.commit.calledWith('app/sidebar/open', false)).to.equal(true)
  })
})
