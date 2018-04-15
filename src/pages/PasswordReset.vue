<template>
  <div class="password-reset-page">
    <div class="reset-header">
      <h4 class="text-header">
        Forgot your password?
      </h4>
      <p class="text">We'll email you instructions on how to reset it.</p>
    </div>
    <p v-if="sent" class="sent-success" style="color: white">
      Please check your inbox for instructions to reset your password.
    </p>
    <div class="password-reset-form" v-else>
      <card class="card">
        <div>
          <label class="required">Email&nbsp;</label>
          <input v-validate="'required'" v-model="email" name="email" type="text">
          <span v-if="errors.has('email')" class="validation-error">{{errors.first('email')}}</span>
        </div>
        <div class="button-container">
          <button @click.prevent="submit()" class="btn-submit text-uppercase" :class="sent ? 'hide' : ''">
            <div class="loading" v-if="bSending">
              <loader fill="#ffffff" width="25px" height="25px"></loader>
            </div>
            Submit
          </button>
        </div>
      </card>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Card from '@/components/Cards/Card.vue'

  export default {
    components: {Card},
    data() {
      return {
        email: '',
        sent: false,
        bSending: false
      }
    },
    mounted(){
      this.$store.commit('setLoading', false)
    },
    methods: {
      submit() {
        return this.$validator.validateAll().then((valid) => {
          if (valid) {
            localStorage.clear()
            return this.sendRequest()
          }
        })
      },
      sendRequest() {
        this.bSending = true
        this.$http.post('reset', {email: this.email})
          .then(({data}) => {
            if (data.success === false) {
              this.errors.add('email', 'A user with that email address does not exist', 'required')
            } else {
              this.sent = true
            }
          })
          .finally(() => {
            this.bSending = false
          })
      },
      goBack() {
        window.history.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .password-reset-page {
    background-color: rgb(59, 71, 102);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .reset-header {
      margin: 20vh 0.5em 0.5em 0.5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1em;
    }

    .text-header {
      color: $white;
      padding-top: 10px;
      margin-bottom: 0;
    }

    .text {
      color: $white;
      font-size: 20px;
    }

    .logo {
      width: 275px;
      height: 65px;
    }

    .card {
      border: none;
      background-color: rgb(59, 71, 102);
    }

    label {
      color: $white;
    }

    .password-reset-form {
      width: 30%;
      align-self: center;
      max-width: 360px;

      @media(max-width: 769px) and (min-width: 481px) {
        width: 50%;
      }

      @media(max-width: 480px) {
        width: 100%;
      }

      .button-container {
        display: flex;
        justify-content: flex-end;
      }

      .btn-cancel {
        color: rgb(108, 117, 140);
        background-color: rgb(255, 255, 255);
        border: none;
      }

      .hide {
        display: none;
      }

      .btn-submit {
        color: $white;
        background-color: $primary;
        border: none;
        margin-left: 15px;
        display: flex;
        align-items: center;
      }
    }

    input {
      margin: 3px 0 20px 0;
    }

    .sent-success {
      font-size: 18px;
      color: $success;
    }

    .loading {
      transform: translate(-8px, 2px);
    }
  }
</style>
