import Vue from 'vue'
import store from '@/store'

export function loadAllUsers() {
  return Vue.axios.get('/api/admin/users').then((response) => {
    store.commit('admin/users', response.data.users)
    return response.data
  })
}

export function addNewUser(user) {
  return Vue.axios.post('/register/email', user, {
    headers: {
      'Registration-Access-Key': process.env.registrationAccessKey
    }
  })
}
