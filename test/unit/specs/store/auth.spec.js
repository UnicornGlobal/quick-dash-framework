import store from '@/store'

describe('store/auth.js', () => {
  it('sets and gets resent verification state', () => {
    expect(store.getters.resentVerification).to.equal(false)
    store.commit('setResentVerification', true)
    expect(store.getters.resentVerification).to.equal(true)
  })

  it('sets and gets retried signup state', () => {
    expect(store.getters.retriedSignup).to.equal(false)
    store.commit('setRetriedSignup', true)
    expect(store.getters.retriedSignup).to.equal(true)
  })
})
