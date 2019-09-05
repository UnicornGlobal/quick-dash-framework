import store from '@/store'

describe('store/users.js', () => {
  it('sets and gets all users', () => {
    store.commit('admin/users', [{ _id: 1 }])
    expect(store.getters['admin/users']).to.deep.equal([{ _id: 1 }])
  })
})
