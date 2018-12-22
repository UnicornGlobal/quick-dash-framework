import users from '@/store/users'
import roles from '@/store/roles'

export default {
  namespaced: true,
  state: {
    ...users.state,
    ...roles.state
  },
  mutations: {
    ...users.mutations,
    ...roles.mutations
  },
  getters: {
    ...users.getters,
    ...roles.getters
  }
}
