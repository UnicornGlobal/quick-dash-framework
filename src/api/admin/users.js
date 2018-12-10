import Vue from 'vue'
import store from '@/store'

export function loadAllUsers() {
  return Vue.axios.get('/api/admin/users').then((response) => {
    store.commit('setAllUsers', response.data.users)
    return response.data
  })
}
