import Vue from 'vue'

export async function logout() {
  await Vue.axios.post(`/logout`)
  await localStorage.clear()
  window.location.href = '/login?logout=true'
}

export function resendVerification() {
  return Vue.axios.get(`/api/resend/verification`)
    .then((response) => {
      return response.data
    })
}
