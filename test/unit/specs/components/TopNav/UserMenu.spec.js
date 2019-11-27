// http://chaijs.com/api/bdd/
import UserMenu from '@/components/TopNav/UserMenu'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import store from '@/store'

const localVue = createLocalVue()

describe('UserMenu.vue', () => {
  it('has a logout method', async () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })
    expect(wrapper.vm.logout).to.be.a('function')
    const logout = sinon.stub(wrapper.vm, 'logout').resolves(true)
    await wrapper.vm.logout().then((result) => {
      expect(result).to.equal(true)
      logout.restore()
    })
  })

  it('logs out', () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('a.user-menu-logout').exists()).to.equal(true)
    const logout = wrapper.find('a.user-menu-logout')
    expect(logout.is('a')).to.equal(true)
    sinon.stub(wrapper.vm, 'redirectToLogin').returns(true)
    logout.trigger('click')
    expect(wrapper.vm.$auth.logout.called).to.equal(true)
  })

  it('Hides logout button when set to false', () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: false,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('div.user-name').exists()).to.equal(true)
    expect(wrapper.find('a.user-menu-logout').exists()).to.equal(false)
    expect(wrapper.findAll('div.links > ul > li').length).to.equal(1)
  })

  it('Hides username when set to false', () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: false,
                  role: true,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: sinon.stub().returns('somerole')
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('div.user-name').exists()).to.equal(false)
    expect(wrapper.find('div.role').exists()).to.equal(true)
    expect(wrapper.find('div.role').text()).to.equal('somerole')
  })

  it('Hides role when set to false', () => {
    const userRoleMethod = sinon.stub().returns('somerole')

    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: true,
                  role: false,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: userRoleMethod
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('div.user-name').exists()).to.equal(true)
    expect(wrapper.find('div.role').exists()).to.equal(false)
    expect(userRoleMethod.called).to.equal(false)
    expect(wrapper.findAll('div.links > ul > li').length).to.equal(2)
  })

  it('Hides account link when set to false', () => {
    const userRoleMethod = sinon.stub().returns('somerole')

    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: false,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: userRoleMethod
                },
                router: {
                  account: {
                    enabled: false,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.findAll('div.links > ul > li').length).to.equal(1)
    expect(wrapper.findAll('a.user-menu-link').exists()).to.equal(false)
    expect(wrapper.find('a.user-menu-logout').exists()).to.equal(true)
    expect(wrapper.find('a.user-menu-account').exists()).to.equal(false)
    expect(wrapper.find('div.user-menu > .dropdown-list > .user-details-wrapper > .user-avatar').exists()).to.equal(true)
  })

  it('Does not render user avatar when disabled', () => {
    const userRoleMethod = sinon.stub().returns('somerole')

    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: false,
                  menus: []
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: userRoleMethod
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('div.user-menu > .dropdown-list > .user-details-wrapper > .user-avatar').exists()).to.equal(false)
  })

  it('Renders custom menu items when present', () => {
    const userRoleMethod = sinon.stub().returns('somerole')

    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: true,
                  logout: true,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: [
                    {
                      label: 'Contact Us',
                      link: '/contact'
                    }
                  ]
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: userRoleMethod
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.findAll('div.links > ul > li').length).to.equal(3)
    expect(wrapper.find('a.user-menu-link').exists()).to.equal(true)
    expect(wrapper.find('a.user-menu-link').text()).to.equal('Contact Us')
    expect(wrapper.findAll('a.user-menu-link').length).to.equal(1)
    expect(wrapper.find('a.user-menu-logout').exists()).to.equal(true)
  })

  it('Disables user menu and does not render', () => {
    const wrapper = shallowMount(UserMenu, {
      localVue,
      mocks: {
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
                usermenu: {
                  enabled: false,
                  logout: true,
                  profile: true,
                  name: true,
                  role: true,
                  avatar: true,
                  menus: [
                    {
                      label: 'Contact Us',
                      link: '/contact'
                    }
                  ]
                },
                sidebar: {
                  position: 'left'
                },
                header: {
                  enabled: true,
                  avatar: true,
                  name: true,
                  logout: true,
                  profile: true,
                  role: 'none'
                },
                router: {
                  account: {
                    enabled: true,
                    component: require('@/pages/User/EditDetails').default
                  }
                }
              }
            }
          }
        }
      },
      stubs: ['router-link'],
      propsData: {
        user: {
          first_name: 'User',
          last_name: 'Xx'
        }
      }
    })

    expect(wrapper.find('div.user-menu').exists()).to.equal(false)
    expect(wrapper.findAll('div.links > ul > li').length).to.equal(0)
    expect(wrapper.find('a.user-menu-link').exists()).to.equal(false)
    expect(wrapper.find('a.user-menu-logout').exists()).to.equal(false)
  })
})
