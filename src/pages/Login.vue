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
            <label class="required username-input-label">{{ strings.username_label }}&nbsp;
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
            <label v-if="showRemember">
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
  import {
    ref,
    computed,
    onMounted
  } from '@vue/composition-api'

  import Card from '@/components/Cards/Card.vue'

  export default {
    // New composition API
    setup(props, context) {
      // `data()` equiv
      const message = ref('')
      const error = ref('')
      const username = ref('')
      const password = ref('')
      const remember = ref(true)
      const sending = ref(false)

      // `computed` equiv
      const appName = computed(() => {
        if (context.root.$store.getters['app/config'].login.name) {
          return context.root.$store.getters['app/config'].login.name
        }

        return process.env.appName
      })

      const showEmojiLogo = computed(() => {
        if (context.root.$store.getters['app/config'].login.emojiLogo) {
          return true
        }

        return false
      })

      const emojiLogo = computed(() => {
        if (context.root.$store.getters['app/config'].login.emojiLogo) {
          return context.root.$store.getters['app/config'].login.emojiLogo()
        }

        return false
      })

      const showLogo = computed(() => {
        if (context.root.$store.getters['app/config'].login.logo) {
          return true
        }

        return false
      })

      const showRemember = computed(() => {
        if (context.root.$store.getters['app/config'].login.remember) {
          return true
        }

        return false
      })

      const logo = computed(() => {
        if (context.root.$store.getters['app/config'].login.logo) {
          return context.root.$store.getters['app/config'].login.logo()
        }

        return false
      })

      // `methods` equiv
      const signIn = () => {
        return context.root.$validator.validateAll().then((result) => {
          if (result) {
            sendSignInRequest()
          }
          return result
        })
      }

      const sendSignInRequest = () => {
        sending.value = true
        return context.root.$auth.login({
          url: 'login',
          redirect: {
            path: '/'
          },
          rememberMe: true,
          fetchUser: true,
          staysSignedIn: true,
          data: {
            username: username.value,
            password: password.value
          }
        }).then(
          // Success
          () => {},
          // Error
          () => {
            context.root.errors.add({
              field: 'username',
              msg: strings.value.invalid_submission
            })
            sending.value = false
            return true
          }
        )
      }

      // mounted()
      onMounted(() => {
        context.root.$store.commit('app/loading', false)

        if (context.root.$route.query && context.root.$route.query.welcome) {
          message.value = 'Your account has been created and an email with a confirmation link has been sent to you. Please click the link in the email to proceed to the next step.'
        }

        if (context.root.$route.query && context.root.$route.query.request) {
          message.value = 'Please check your email for further instructions on how to reset your password.'
        }

        if (context.root.$route.query && context.root.$route.query.reset) {
          message.value = 'You have successfully reset your password. Please sign in below.'
        }

        if (context.root.$route.query && context.root.$route.query.confirmed) {
          message.value = 'You have successfully confirmed your email. Please sign in below.'
        }

        if (context.root.$route.query && context.root.$route.query.logout) {
          message.value = 'You have successfully logged out of your account.'
        }

        if (context.root.$route.query && context.root.$route.query.invalidconfirmation) {
          message.value = 'Bad login confirmation token provided. Please contact support or request a new one.'
        }
      })

      // created() [just do it here]
      const strings = ref(require('@/i18n/en/login').default)

      return {
        // data()
        message,
        error,
        username,
        password,
        remember,
        sending,
        strings,

        // computed:
        appName,
        showEmojiLogo,
        emojiLogo,
        showLogo,
        showRemember,
        logo,

        // methods:
        signIn,
        sendSignInRequest
      }
    },
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
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/mixins/buttons';
  @import '../assets/sass/mixins/layout';

  .username-input-label {
    display: flex;

    span {
      flex: 2;
      text-align: right;
    }
  }

  button.signup-button {
    @include button-outline();
  }

  .login-page {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -1.5rem;

    .login-header {
      @include flex-row;

      min-height: login(header, height);
      padding: spacing(tight);
      background-color: login(header, background);
      border-bottom: login(header, border);
      box-shadow: login(header, shadow);

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

      .label-checkbox {
        margin-left: 5px;
      }

      button.login-button {
        @include button-filled();
        width: 100%;
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
