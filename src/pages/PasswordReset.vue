<template>
  <div class="password-reset-page">
    <div class="reset-header">
      <h4 class="text-header">
        {{ strings.header }}
      </h4>
      <p class="text">{{ strings.details }}</p>
    </div>
    <p v-if="sent" class="sent-success" style="color: white">
      {{ strings.success }}
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
            {{ strings.button }}
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
    created() {
      this.strings = require('@/i18n/en/password-reset').default
    },
    mounted() {
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
  h4 {
    top: 20px;
    left: 80px;
    font-size: 2em;
    align-self: flex-start;
  }

  .password-reset-page {
    background-color: $primary;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;

    .reset-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1em;
      align-self: flex-start;
      flex: 1;
    }

    .text-header {
      color: $white;
      padding-top: 10px;
      margin-bottom: 0;
    }

    .text {
      color: $white;
      font-size: 20px;
      top: 100px;
      left: 82px;
      font-size: 1em;
    }

    .logo {
      width: 275px;
      height: 65px;
    }

    .card {
      border: none;
      border-radius: $border-radius;
      background-color: $primary-dark;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    label {
      color: $white;
    }

    .password-reset-form {
      width: 420px;
      align-self: center;
      max-width: 360px;
      flex: 2;

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
        border-radius: $border-radius;
        cursor: pointer;
      }
    }

    input {
      margin: 0px 0 22px 0;
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
