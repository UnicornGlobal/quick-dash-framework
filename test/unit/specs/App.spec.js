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
      user: {}
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
})
