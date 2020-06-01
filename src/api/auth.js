import Vue from 'vue'
import { clearCookies } from '@/auth'

export async function logout() {
  await clearCookies()
  await localStorage.clear()
  await Vue.axios.post(`/logout`)
  await Vue.router.replace('/login?logout=true').catch(err => {
    if (err.name === 'NavigationDuplicated') {
      return true
    } else {
      throw err
    }
  })
}

export function resendVerification() {
  return Vue.axios.get(`/api/resend/verification`)
    .then((response) => {
      return response.data
    })
}
