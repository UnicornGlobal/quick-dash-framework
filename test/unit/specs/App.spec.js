// http://chaijs.com/api/bdd/
import App from '@/App'
import Router from 'vue-router'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Router)
localVue.use(Vuex)

describe('App.vue', () => {
  it('The name is "app"', () => {
    expect(App).to.be.an('Object')
    expect(App).to.have.property('name', 'app')
  })

  it('Includes a SideBar, Loader and Toast components', () => {
    // We have to use let because the value mutates behind the scenes
    // eslint-disable-next-line prefer-const
    let val = App.components
    expect(val).to.have.all.keys('SideBar', 'Loader', 'Toaster')
  })

  it('Renders when loaded and authenticated', () => {
    const app = shallowMount(App, {
      localVue,
      mocks: {
        $store: new Vuex.Store({
          getters: {
            loading: () => false,
            user: () => {}
          },
          modules: {
            app: {
              namespaced: true,
              getters: {
                config: () => {
                  return {
                    sidebar: {
                      enabled: true,
                      position: 'left'
                    }
                  }
                },
                routes: () => {
                  return [{
                    children: [
                      {
                        children: [
                          {
                            meta: {
                              main: true
                            }
                          }
                        ]
                      }
                    ]
                  }]
                }
              },
              modules: {
                sidebar: {
                  namespaced: true,
                  getters: {
                    open: () => true
                  },
                  mutations: {
                    open: sinon.spy()
                  }
                }
              }
            }
          }
        }),
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    app.vm.$store.commit = sinon.spy()
    expect(app.contains('div')).to.equal(true)
    const element = app.find('.main-content')
    expect(element.is('div')).to.equal(true)
  })

  it('closes side bar', async () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks: {
        $store: new Vuex.Store({
          getters: {
            loading: () => false,
            user: () => {}
          },
          commit: sinon.spy(),
          modules: {
            app: {
              namespaced: true,
              getters: {
                config: () => {
                  return {
                    sidebar: {
                      enabled: true,
                      position: 'left'
                    }
                  }
                },
                routes: () => {
                  return [{
                    children: [
                      {
                        children: [
                          {
                            meta: {
                              main: true
                            }
                          }
                        ]
                      }
                    ]
                  }]
                }
              },
              modules: {
                sidebar: {
                  namespaced: true,
                  getters: {
                    open: () => true
                  },
                  mutations: {
                    open: sinon.spy()
                  }
                }
              }
            }
          }
        }),
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    app.vm.$store.commit = sinon.spy()
    expect(app.vm.showSideBar).to.equal(true)
    await app.vm.closeSidebar()

    expect(app.vm.$store.commit.calledWith('app/sidebar/open', false)).to.equal(true)
  })

  it('initializes side bar menu', () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks: {
        $store: new Vuex.Store({
          getters: {
            loading: () => false,
            user: () => {}
          },
          modules: {
            app: {
              namespaced: true,
              getters: {
                config: () => {
                  return {
                    sidebar: {
                      enabled: true,
                      position: 'left'
                    }
                  }
                },
                routes: () => {
                  return [{
                    children: [
                      {
                        children: [
                          {
                            meta: {
                              main: true
                            }
                          }
                        ]
                      }
                    ]
                  }]
                }
              },
              modules: {
                sidebar: {
                  namespaced: true,
                  getters: {
                    open: () => true
                  },
                  mutations: {
                    open: sinon.spy()
                  }
                }
              }
            }
          }
        }),
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    app.vm.$store.commit = sinon.spy()

    expect(app.find('side-bar-stub.side-bar').exists()).to.equal(false)
    expect(app.vm.showSideBar).to.equal(true)
    expect(app.vm.menu).to.be.an('array').that.has.lengthOf(1)
    expect(app.find('div.side-bar').exists()).to.equal(false)
  })

  it('Renders sidebar on left when configured', () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks: {
        $store: new Vuex.Store({
          getters: {
            loading: () => false,
            user: () => {}
          },
          modules: {
            app: {
              namespaced: true,
              getters: {
                sidebar: () => {
                  return {
                    enabled: true
                  }
                },
                config: () => {
                  return {
                    sidebar: {
                      enabled: true,
                      position: 'left'
                    }
                  }
                },
                routes: () => {
                  return [{
                    children: [
                      {
                        children: [
                          {
                            meta: {
                              main: true
                            }
                          }
                        ]
                      }
                    ]
                  }]
                }
              },
              modules: {
                sidebar: {
                  namespaced: true,
                  getters: {
                    open: () => true,
                    enabled: () => true
                  },
                  mutations: {
                    open: sinon.spy()
                  }
                }
              }
            }
          }
        }),
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    app.vm.$store.commit = sinon.spy()
    expect(app.find('side-bar-stub.side-bar').exists()).to.equal(true)
    expect(app.find('side-bar-stub.side-bar[name="slideleft"').exists()).to.equal(true)
  })

  it('Renders sidebar on right when configured', () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks: {
        $store: new Vuex.Store({
          getters: {
            loading: () => false,
            user: () => {}
          },
          modules: {
            app: {
              namespaced: true,
              getters: {
                sidebar: () => {
                  return {
                    enabled: true
                  }
                },
                config: () => {
                  return {
                    sidebar: {
                      enabled: true,
                      position: 'right'
                    }
                  }
                },
                routes: () => {
                  return [{
                    children: [
                      {
                        children: [
                          {
                            meta: {
                              main: true
                            }
                          }
                        ]
                      }
                    ]
                  }]
                }
              },
              modules: {
                sidebar: {
                  namespaced: true,
                  getters: {
                    open: () => true,
                    enabled: () => true
                  },
                  mutations: {
                    open: sinon.spy()
                  }
                }
              }
            }
          }
        }),
        $auth: {
          ready() {
            return true
          }
        }
      }
    })

    app.vm.$store.commit = sinon.spy()
    expect(app.find('side-bar-stub.side-bar').exists()).to.equal(true)
    expect(app.find('side-bar-stub.side-bar[name="slideright"').exists()).to.equal(true)
  })
})
