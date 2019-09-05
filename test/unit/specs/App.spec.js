// http://chaijs.com/api/bdd/
import App from '@/App'
import Router from 'vue-router'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Router)
localVue.use(Vuex)

const mocks = {
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

mocks.$store.commit = sinon.spy()

describe('App.vue', () => {
  it('The name is "app"', () => {
    expect(App).to.be.an('Object')
    expect(App).to.have.property('name', 'app')
  })

  it('Includes a SideBar, TopNav, Loader and Toast components', () => {
    const val = App.components
    expect(val).to.have.all.keys('SideBar', 'TopNav', 'Loader')
  })

  it('Renders when loaded and authenticated', () => {
    const app = shallowMount(App, {
      localVue,
      mocks
    })

    expect(app.contains('div')).to.equal(true)
    const element = app.find('.main-content')
    expect(element.is('div')).to.equal(true)
  })

  it('closes side bar', async () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks
    })

    expect(app.vm.showSideBar).to.equal(true)
    await app.vm.closeSidebar()

    expect(app.vm.$store.commit.calledWith('app/sidebar/open', false)).to.equal(true)
  })

  it('initializes side bar menu', () => {
    const app = shallowMount(App, {
      localVue,
      stubs: ['router-view'],
      mocks
    })

    expect(app.vm.showSideBar).to.equal(true)
    expect(app.vm.menu).to.be.an('array').that.has.lengthOf(1)
  })
})
