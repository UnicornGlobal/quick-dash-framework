import Vue from 'vue'

import { clearCookies } from '@/auth'

export async function logout() {
  await Vue.axios.post(`/logout`)
  await localStorage.clear()
  await clearCookies()
  window.location.href = '/login?logout=true'
}

export function resendVerification() {
  return Vue.axios.get(`/api/resend/verification`)
    .then((response) => {
      return response.data
    })
}
