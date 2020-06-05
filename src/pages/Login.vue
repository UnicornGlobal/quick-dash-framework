<template>
  <div class="login-page">
    <component v-if="headerComponent" :is="headerComponent"></component>
    <div v-else class="login-header">
      <div class="logo" v-if="showEmojiLogo"><span>{{ emojiLogo }}</span></div>
        <component v-if="showLogo" :is="logo" class="svg-logo"></component>
      <div class="brand">{{ appName }}</div>
    </div>
    <div class="login-form">
      <card class="card">
        <div v-if="message" class="message">{{ message }}</div>
        <form>
          <div>
            <label class="required">{{ strings.username_label }}&nbsp;
            <span v-if="errors.has('username')" class="validation-error">{{errors.first('username')}}</span>
            </label>
            <input v-validate="'required'" v-model="username" name="username" type="text" />
          </div>
          <div class="password-reset-container">
            <label class="required">{{ strings.password_label }}&nbsp;</label>
            <div class="password-box">
              <input v-validate="'required'" v-model="password" name="password" type="password" />
              <router-link v-if="errors.has('password') || errors.has('username')" :to="{name: 'ResetPassword'}">
                {{ strings.forgot }}
              </router-link>
            </div>
            <span v-if="errors.has('password')" class="validation-error">{{errors.first('password')}}</span>
          </div>
          <div class="login-button-wrapper">
            <label>
            <input
              type="checkbox"
              name="rememberMe"
              v-model="remember"
              :value="true"
              :unchecked-value="false"
            >
              <span class="label-checkbox">{{ strings.remember_label }}</span>
            </label>
            <button @click.prevent="signIn" class="text-uppercase login-button">
              <div class="loading" v-if="sending">
                <loader fill="#ffffff" width="25px" height="25px"></loader>
              </div>
              {{ strings.button }}
            </button>
          </div>
        </form>
      </card>
    </div>
    <component v-if="footerComponent" :is="footerComponent"></component>
  </div>
</template>

<script type="text/javascript">
  import Card from '@/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    props: {
      headerComponent: {
        required: false,
        default: null
      },
      footerComponent: {
        required: false,
        default: null
      }
    },
    data() {
      return {
        message: '',
        error: '',
        username: '',
        password: '',
        remember: true,
        sending: false
      }
    },
    created() {
      this.strings = require('@/i18n/en/login').default
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
        this.sending = true
        return this.$auth.login({
          url: 'login',
          redirect: '/',
          fetchUser: true,
          data: {
            username: this.username,
            password: this.password
          },
          error: function (e) {
            this.errors.add({
              field: 'username',
              msg: this.strings.invalid_submission
            })
            this.sending = false
            return true
          }
        })
      }
    },
    computed: {
      appName() {
        if (this.$store.getters['app/config'].login.name) {
          return this.$store.getters['app/config'].login.name
        }

        return process.env.appName
      },
      showEmojiLogo() {
        if (this.$store.getters['app/config'].login.emojiLogo) {
          return true
        }

        return false
      },
      emojiLogo() {
        if (this.$store.getters['app/config'].login.emojiLogo) {
          return this.$store.getters['app/config'].login.emojiLogo()
        }

        return false
      },
      showLogo() {
        if (this.$store.getters['app/config'].login.logo) {
          return true
        }

        return false
      },
      logo() {
        if (this.$store.getters['app/config'].login.logo) {
          return this.$store.getters['app/config'].login.logo()
        }

        return false
      }
    },
    mounted() {
      this.$store.commit('app/loading', false)

      if (this.$route.query && this.$route.query.welcome) {
        this.message = 'Your account has been created and an email with a confirmation link has been sent to you. Please click the link in the email to proceed to the next step.'
      }

      if (this.$route.query && this.$route.query.request) {
        this.message = 'Please check your email for further instructions on how to reset your password.'
      }

      if (this.$route.query && this.$route.query.reset) {
        this.message = 'You have successfully reset your password. Please sign in below.'
      }

      if (this.$route.query && this.$route.query.confirmed) {
        this.message = 'You have successfully confirmed your email. Please sign in below.'
      }

      if (this.$route.query && this.$route.query.logout) {
        this.message = 'You have successfully logged out of your account.'
      }

      if (this.$route.query && this.$route.query.invalidconfirmation) {
        this.message = 'Bad login confirmation token provided. Please contact support or request a new one.'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    max-width: 480px;
    padding: $login_box_padding;
    margin: $login_box_margin;
    border-radius: $border-radius;
    background-color: $login_box_background;
    box-shadow: $login_shadow;

    h2 {
      padding: $login_header_padding;
      margin: 0px;
      background-color: $login_box_header;
      color: $login_text;
      font-size: $login_header_text_size;
    }
  }

  .login-page {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -1rem;

    .login-header {
      min-height: $login_header_height;
      padding: 10px;
      background-color: $login_header;
      border-bottom: $login_header_border;
      box-shadow: $login_header_shadow;
      justify-content: left;
      align-items: center;
      display: flex;

      .svg-logo {
        margin: $login_logo_margin;
      }
      .logo {
        display: inline-block;

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 50px;
          border-radius: 100%;
          background-color: colour("primary");
          color: colour("primary", "light");
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
        }
      }

      .brand {
        display: inline-block;
        font-size: 18px;
        color: $login_logo_text;
      }
    }

    .login-form {
      height: calc(100vh - #{$login_header_height});
      padding-bottom: $login_header_height;
      background-color: $login_background;
      display: flex;
      justify-content: center;
      align-items: center;

      @media(max-width: $login_box_min_width) {
        border: 0;
        width: 100%;
        min-width: 100%;
        max-width: unset;
        padding-bottom: 0;
        margin-top: $login_mobile_header_margin;
      }

      .logo-holder {
        margin: 2.5em 2em 0.5em 0.5em;
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: colour("icons");
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
          color: colour("primary", "dark");
        }
      }

      .login-button-wrapper {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        @media(max-width: $login_box_min_width) {
          flex-direction: column;
          align-items: center;
        }

        label {
          margin: 1rem;
        }
      }

      .card {
        border: $login_box_border;
        background-color: $login_box_background;
        width: $login_box_min_width;
        min-width: $login_box_min_width;
        @media(max-width: $login_box_min_width) {
          border: 0;
          height: 100%;
          width: 100%;
          min-width: 100%;
          justify-content: space-evenly;
          display: flex;
          flex-direction: column;
        }
      }

      label {
        color: colour("primary", "text");
        font-size: $login_label_text_size;
        font-weight: bold;
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
        color: colour("white");
        background-color: $login_button_background;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
        min-width: $login_button_min_width;
        min-height: $login_button_min_height;
        margin: 0;
      }

      input {
        padding-left: 10px;
        margin-top: 5px;
        border: 1px solid colour("primary", "dark");
        border-radius: $border-radius;
      }

      input[type=checkbox] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: colour("primary");
        border: 2px solid $login_checkbox_colour;
        display: inline-block;
        position: relative;
        padding: 7px !important;
        top: 0.25rem;

        &:focus {
          border: 2px solid $login_checkbox_colour;
          outline: $login_checkbox_colour solid 2px;
          outline-offset: 1px;
        }

        &:checked {
          border: 2px solid $login_checkbox_colour;
          background-color: $login_checkbox_colour;
          background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M173.898%20439.404l-166.4-166.4c-9.997-9.997-9.997-26.206%200-36.204l36.203-36.204c9.997-9.998%2026.207-9.998%2036.204%200L192%20312.69%20432.095%2072.596c9.997-9.997%2026.207-9.997%2036.204%200l36.203%2036.204c9.997%209.997%209.997%2026.206%200%2036.204l-294.4%20294.401c-9.998%209.997-26.207%209.997-36.204-.001z%22%20fill%3D%22white%22/%3E%3C/svg%3E);
          &:after {
            position: absolute;
            top: 0;
            left: 3px;
            padding: 0;
          }
        }
      }

      .loading {
        transform: translate(-8px, 2px);
      }
    }

    .message {
      padding: 1rem;
      background: #E8F0FE;
      border: 1px solid #cccccc;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
</style>
