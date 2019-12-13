<script>
  export default {
    props: {
      token: {
        type: String,
        required: true
      }
    },
    created() {
      this.$auth.login({
        url: '/login/token',
        redirect: '/home',
        fetchUser: true,
        data: {
          token: this.token
        },
        error: function (e) {
          window.location.href = '/login?invalidconfirmation=true'
        }
      })
    }
  }
</script>
