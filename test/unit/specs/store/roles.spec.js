import store from '@/store'

describe('store/roles.js', () => {
  it('sets and gets all roles', () => {
    store.commit('setAllRoles', [{ '_id': 2 }])
    expect(store.getters.allRoles).to.deep.equal([{ '_id': 2 }])
  })
})
