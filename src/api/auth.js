import Vue from 'vue'

export async function logout() {
  await Vue.axios.post(`/logout`)
  await localStorage.clear()
  // Clear cookies too
  document.cookie.split(';').forEach(function(c) {
    document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  })
  window.location.href = '/login?logout=true'
}

export function resendVerification() {
  return Vue.axios.get(`/api/resend/verification`)
    .then((response) => {
      return response.data
    })
}
