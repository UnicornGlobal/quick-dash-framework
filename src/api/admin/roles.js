import Vue from 'vue'
import store from '@/store'

export function loadAndStoreAllRoles() {
  return Vue.axios.get('api/admin/roles').then(
    (response) => {
      store.commit('setAllRoles', response.data)
      return response.data
    })
}

export function loadUserRoles(userId) {
  return Vue.axios.get(`api/admin/users/${userId}/roles`).then(
    (response) => {
      return response.data
    })
}

export function assignRole(userId, roleId) {
  return Vue.axios.post(`api/admin/users/${userId}/roles/assign/${roleId}`)
}
