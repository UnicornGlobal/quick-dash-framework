import store from '@/store'

describe('store/roles.js', () => {
  it('sets and gets all roles', () => {
    store.commit('admin/roles', [{ _id: 2 }])
    expect(store.getters['admin/roles']).to.deep.equal([{ _id: 2 }])
  })
})
