import Vue from 'vue'

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

export function changeUserDetails(userId, formData) {
  console.log(formData)
  return Vue.axios.post(`api/user/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
