<template>
  <div class="login-page">
    <div class="login-header">
      <div class="logo"><span>Q</span></div>
      <div class="brand">{{ appName }}</div>
    </div>
    <div class="login-form">
      <card class="card">
        <h2>Login</h2>
        <form>
          <div>
            <label class="required">Email Address&nbsp;</label>
            <input v-validate="'required'" v-model="username" name="username" type="text"
                   placeholder="Email Address" />
            <span v-if="errors.has('username')" class="validation-error">{{errors.first('username')}}</span>
          </div>
          <div class="password-reset-container">
            <label class="required">Password&nbsp;</label>
            <div class="password-box">
              <input v-validate="'required'" v-model="password" name="password" type="password"
                     placeholder="Password" />
              <router-link v-if="!errors.has('password')" :to="{name: 'ResetPassword'}">Forgot</router-link>
              <router-link v-if="errors.has('password')" style="padding-right: 30px" :to="{name: 'ResetPassword'}">
                Forgot?
              </router-link>
            </div>
            <span v-if="errors.has('password')" class="validation-error">{{errors.first('password')}}</span>
          </div>
          <label>
          <input
            type="checkbox"
            name="rememberMe"
            v-model="remember"
            :value="true"
            :unchecked-value="false"
          >
            <span class="label-checkbox">Remember Me</span>
          </label>
          <div class="login-button-wrapper">
            <button @click.prevent="signIn" class="text-uppercase login-button">
              <div class="loading" v-if="bSending">
                <loader fill="#ffffff" width="25px" height="25px"></loader>
              </div>
              Sign In
            </button>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Card from '@/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data() {
      return {
        error: '',
        username: '',
        password: '',
        remember: true,
        bSending: false
      }
    },
    methods: {
      signIn() {
        return this.$validator.validateAll().then((result) => {
          if (result) {
            this.sendSignInRequest()
          }
          return result
        })
      },
      sendSignInRequest() {
        this.bSending = true
        return this.$auth.login({
          url: 'login',
          rememberMe: this.remember,
          redirect: '/',
          fetchUser: true,
          data: {username: this.username, password: this.password},
          error: function () {
            this.errors.add({
              field: 'username',
              msg: 'Invalid username or password'
            })
            this.bSending = false
          }
        })
      }
    },
    computed: {
      appName() {
        return process.env.appName
      }
    },
    mounted() {
      this.$store.commit('app/loading', false)
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    margin-top: 0px;
    max-width: 480px;
    padding: 0px;
    border-radius: $border-radius;

    h2 {
      padding: 10px 20px;
      margin: 0px;
      background-color: darken( $primary-light, 20);
      color: $primary-text;
    }
  }

  form {
    padding: 20px;
  }
  .login-page {
    .login-header {
      min-height: 50px;
      padding: 10px;
      background-color: $primary-dark;

      .logo {
        display: inline-block;
        margin-right: 10px;

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 50px;
          border-radius: 100%;
          background-color: $primary;
          color: $primary-light;
          text-align: center;
          font-size: 20px;
          font-weight: 800;
        }
      }

      .brand {
        display: inline-block;
        font-size: 18px;
        text-transform: uppercase;
        color: $primary-light;
      }
    }

    .login-form {
      height: calc(100vh - 70px);
      background-color: $primary;
      display: flex;
      justify-content: center;
      align-items: center;
      @media(max-width: 560px) {
        width: 100%;
        max-width: unset;
      }

      .logo-holder {
        margin: 2.5em 2em 0.5em 0.5em;
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $icons;
      }

      .password-box {
        position: relative;
        a {
          position: absolute;
          display: inline-block;
          transform: translateY(-50%);
          bottom: 0;
          right: 0;
          text-decoration: none;
          padding-right: 10px;
          font-size: 13px;
          color: $accent;
        }
      }

      .login-button-wrapper {
        display: flex;
        justify-content: flex-end;
      }

      .card {
        border: none;
        background-color: $primary-light;
      }

      label {
        color: $primary-text;
      }

      .password-reset-container {
        margin-top: 35px;
        margin-bottom: 5px;
      }

      .label-checkbox {
        margin-left: 5px;
      }

      button {
        line-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        color: $white;
        background-color: $primary;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
      }

      input {
        padding-left: 10px;
        margin-top: 5px;
        border-radius: 3px;
      }

      .loading {
        transform: translate(-8px, 2px);
      }
    }
  }
</style>
