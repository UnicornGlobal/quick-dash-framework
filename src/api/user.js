import Vue from 'vue'
import store from '../store'

export function loadUserDetails(userId) {
  return Vue.axios.get('api/me')
    .then(response => {
      store.commit('setUser', response.data)
      return response.data
    })
}

export function resendVerification() {
  return Vue.axios.get(`/api/resend/verification`)
    .then((response) => {
      return response.data
    })
}

export async function logout() {
  await Vue.axios.post(`/logout`)
  await localStorage.clear()
  window.location.pathname = 'login'
}

export async function loadUserData(user) {
  const userData = await loadUserDetails(user._id)
  return userData
}
