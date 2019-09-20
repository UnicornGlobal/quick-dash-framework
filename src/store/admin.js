import users from '@/store/users'
import roles from '@/store/roles'

let custom = false
let external = {}

// The framework level store
let adminStore = {
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

// Load any app level admin only stores
try {
  custom = require.context('~/store/admin', true, /\.js$/)
  custom.keys().forEach(function(key) {
    const name = /\.\/(\S+)\.js/.exec(key)[1]

    console.log('Found custom admin only store: ', name)

    external = {
      ...external,
      [name]: custom(key).default
    }
  })
} catch (e) {
  console.log('Loading custom admin store error:', e)
}

// Load the new custom stores into the namespace
if (external) {
  console.log([external])
  Object.keys(external).forEach(function(key) {
    adminStore.state = {
      ...adminStore.state,
      ...external[key].state
    }
    adminStore.mutations = {
      ...adminStore.mutations,
      ...external[key].mutations
    }
    adminStore.getters = {
      ...adminStore.getters,
      ...external[key].getters
    }
  })
}

export default adminStore
