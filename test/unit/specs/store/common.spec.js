import store from '@/store'

describe('store/app', () => {
  it('is an object', () => {
    expect(store).to.be.an('Object')
  })

  it('sets and gets loading state', () => {
    store.commit('app/loading', true)
    expect(store.getters['app/loading']).to.equal(true)

    store.commit('app/loading', false)
    expect(store.getters['app/loading']).to.equal(false)
  })

  it('sets and gets sidebar state', () => {
    store.commit('app/sidebar/open', true)
    expect(store.getters['app/sidebar/open']).to.equal(true)

    store.commit('app/sidebar/open', false)
    expect(store.getters['app/sidebar/open']).to.equal(false)
  })

  it('sets and gets sidebar enabled state', () => {
    store.commit('app/sidebar/enabled', true)
    expect(store.getters['app/sidebar/enabled']).to.equal(true)

    store.commit('app/sidebar/enabled', false)
    expect(store.getters['app/sidebar/enabled']).to.equal(false)
  })

  it('sets and gets config', () => {
    store.commit('app/config', false)
    expect(store.getters['app/config']).to.equal(false)

    store.commit('app/config', true)
    expect(store.getters['app/config']).to.equal(true)
  })
})
