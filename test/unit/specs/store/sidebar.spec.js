import store from '@/store'

describe('store/sidebar.js', () => {
  it('default position is left, currentMenu is undefined', () => {
    expect(store.state.app.sidebar.position).to.equal('left')
    expect(store.state.app.sidebar.currentMenu).to.equal('')
  })

  it('sets and gets open states', () => {
    store.commit('app/sidebar/open', true)
    expect(store.getters['app/sidebar/open']).to.equal(true)
  })

  it('sets and gets enabled states', () => {
    store.commit('app/sidebar/enabled', true)
    expect(store.getters['app/sidebar/enabled']).to.equal(true)
  })

  it('sets and gets current menu states', () => {
    store.commit('app/sidebar/currentMenu', 'Home')
    expect(store.getters['app/sidebar/currentMenu']).to.equal('Home')
  })
})
