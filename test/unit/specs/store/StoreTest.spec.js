import store from '@/store'

describe('store/index.js', () => {
  it('is an object', () => {
    expect(store).to.be.an('Object')
  })

  it('sets and gets loading state', () => {
    store.commit('setLoading', true)
    expect(store.getters.loading).to.equal(true)

    store.commit('setLoading', false)
    expect(store.getters.loading).to.equal(false)
  })

  it('sets and gets sidebar state', () => {
    store.commit('showSideBar', true)
    expect(store.getters.sideBarState).to.equal(true)

    store.commit('showSideBar', false)
    expect(store.getters.sideBarState).to.equal(false)
  })
})
