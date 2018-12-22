import store from '@/store'

describe('store/user.js', () => {
  it('sets and gets user', () => {
    store.commit('auth/user', [{ '_id': 5 }])
    expect(store.getters['auth/user']).to.deep.equal([{ '_id': 5 }])
  })
})
