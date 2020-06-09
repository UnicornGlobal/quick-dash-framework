<template>
  <div class="login-page">
    <component v-if="headerComponent" :is="headerComponent"></component>
    <div v-else class="login-header">
      <div class="logo" v-if="showEmojiLogo"><span>{{ emojiLogo }}</span></div>
        <component v-if="showLogo" :is="logo" class="svg-logo"></component>
      <div class="brand">{{ appName }}</div>
      <div class="spacer" style="flex: 2"></div>
      <router-link to="/signup" tag="button" class="text-uppercase signup-button">
        {{ strings.signup }}
      </router-link>
    </div>
    <div class="login-form">
      <card class="login-card">
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

<style lang="scss">
  @import '../assets/sass/mixins/buttons';
  @import '../assets/sass/mixins/layout';

  button.signup-button {
    @include button-outline();
  }

  .login-page {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -1.5rem;

    .login-header {
      min-height: login(header, height);
      padding: spacing(tight);
      background-color: login(header, background);
      border-bottom: login(header, border);
      box-shadow: login(header, shadow);
      justify-content: left;
      align-items: center;
      display: flex;

      .svg-logo {
        margin: login(logo, margin);
      }

      .logo {
        display: inline-block;

        span {
          @include flex-center;

          height: 50px;
          width: 50px;
          border-radius: 100%;
          background-color: colour(primary);
          color: colour(primary, light);
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
        }
      }

      .brand {
        display: inline-block;
        font-size: 24px;
        color: login(header, color);
      }
    }

    .login-form {
      @include flex-center;

      height: calc(100vh - #{login(header, height)});
      padding-bottom: login(header, height);
      background-color: login(background);

      @media(max-width: login(box, width)) {
        border: border(none);
        width: 100%;
        min-width: 100%;
        max-width: unset;
        padding-bottom: 0;
        margin-top: login(mobile, margin);
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
          color: colour(primary, dark);
        }
      }

      .login-button-wrapper {
        margin-top: spacing(extra-loose);
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        @media(max-width: login(box, width)) {
          flex-direction: column;
          align-items: center;
        }
      }

      .login-card {
        border: login(box, border);
        background-color: login(box, background);
        width: login(box, width);
        min-width: login(box, width);

        // Makes fullscreen on mobile
        @media(max-width: login(box, width)) {
          border: 0;
          height: 100%;
          width: 100%;
          min-width: 100%;
          justify-content: space-evenly;
          display: flex;
          flex-direction: column;
        }
      }

      .password-reset-container {
        margin-top: 35px;
        margin-bottom: 5px;
      }

      .label-checkbox {
        margin-left: 5px;
      }

      button.login-button {
        @include button-filled();
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
