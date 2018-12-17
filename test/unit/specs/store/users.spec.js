import store from '@/store'

describe('store/users.js', () => {
  it('sets and gets all users', () => {
    store.commit('setAllUsers', [{ '_id': 1 }])
    expect(store.getters.users).to.deep.equal([{ '_id': 1 }])
  })
})
