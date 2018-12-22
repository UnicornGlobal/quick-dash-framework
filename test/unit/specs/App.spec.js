// http://chaijs.com/api/bdd/
import App from '@/App'
import Router from 'vue-router'
import { createLocalVue, shallowMount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Router)

let mocks = {
  $store: {
    state: {
      routes: [{children: []}]
    },
    getters: {
      loading: false,
      user: {},
      app: {
        sidebar: {
          open: true
        }
      }
    }
  },
  $auth: {
    ready() {
      return true
    }
  }
}

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
    let app = shallowMount(App, {
      localVue,
      mocks
    })

    expect(app.contains('div')).to.equal(true)
    const element = app.find('.main-content')
    expect(element.is('div')).to.equal(true)
  })

  it('closes side bar', () => {
    let localVue = createLocalVue()
    let app = shallowMount(App, {
      localVue,
      stubs: [ 'router-view' ],
      mocks: {
        $store: {
          getters: {
            'app/sidebar/open': true,
            loading: false,
            user: {}
          },
          commit: sinon.spy()
        }
      }
    })

    app.vm.closeSidebar()
    expect(app.vm.$store.commit.calledWith('app/sidebar/open', false)).to.equal(true)
  })

  it('initializes side bar menu', () => {
    let localVue = createLocalVue()
    let app = shallowMount(App, {
      localVue,
      stubs: [ 'router-view' ],
      mocks: {
        $store: {
          getters: {
            user: {},
            'app/sidebar/open': true,
            'app/routes': [
              {
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
              }
            ]
          }
        }
      }
    })

    expect(app.vm.showSideBar).to.equal(true)
    expect(app.vm.menu).to.be.an('array').that.has.lengthOf(1)
  })
})
