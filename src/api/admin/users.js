import Vue from 'vue'

export function loadAllUsers() {
  return Vue.axios.get('/api/admin/users/all').then((response) => {
    return response.data
  })
}
