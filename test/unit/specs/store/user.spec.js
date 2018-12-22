import store from '@/store'

describe('store/user.js', () => {
  it('sets and gets user', () => {
    store.commit('user/setUser', [{ '_id': 5 }])
    expect(store.getters['auth/user']).to.deep.equal([{ '_id': 5 }])
  })
})
