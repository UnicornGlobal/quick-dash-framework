import store from '@/store'

describe('store/auth.js', () => {
  it('sets and gets resent verification state', () => {
    expect(store.getters['auth/resentVerification']).to.equal(false)
    store.commit('auth/setResentVerification', true)
    expect(store.getters['auth/resentVerification']).to.equal(true)
  })

  it('sets and gets retried signup state', () => {
    expect(store.getters['auth/retriedSignup']).to.equal(false)
    store.commit('auth/setRetriedSignup', true)
    expect(store.getters['auth/retriedSignup']).to.equal(true)
  })
})
