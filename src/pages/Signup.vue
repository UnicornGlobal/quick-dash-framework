<template>
  <div class="signup-page" id="signup-page">
    <component v-if="headerComponent" :is="headerComponent"></component>
    <div v-else class="signup-header">
      <div class="logo" v-if="showEmojiLogo"><span>{{ emojiLogo }}</span></div>
        <component v-if="showLogo" :is="logo" class="svg-logo"></component>
      <div class="brand">{{ appName }}</div>
    </div>
    <div class="signup-form">
      <card class="signup-card">
        <sign-me-up :options="signupOptions"></sign-me-up>
        <form></form>
      </card>
    </div>
    <component v-if="footerComponent" :is="footerComponent"></component>
  </div>
</template>

<script type="text/javascript">
  import Card from '@/components/Cards/Card.vue'
  import SignMeUp from '@unicorns/sign-me-up'

  export default {
    components: {
      Card,
      SignMeUp
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
    created() {
      this.strings = require('@/i18n/en/signup').default
    },
    computed: {
      signupOptions() {
        if (this.$store.getters['app/config'].signup) {
          return this.$store.getters['app/config'].signup
        }

        return {}
      },
      appName() {
        if (this.$store.getters['app/config'].signup.name) {
          return this.$store.getters['app/config'].signup.name
        }

        return process.env.appName
      },
      showEmojiLogo() {
        if (this.$store.getters['app/config'].signup.emojiLogo) {
          return true
        }

        return false
      },
      emojiLogo() {
        if (this.$store.getters['app/config'].signup.emojiLogo) {
          return this.$store.getters['app/config'].signup.emojiLogo()
        }

        return false
      },
      showLogo() {
        if (this.$store.getters['app/config'].signup.logo) {
          return true
        }

        return false
      },
      logo() {
        if (this.$store.getters['app/config'].signup.logo) {
          return this.$store.getters['app/config'].signup.logo()
        }

        return false
      }
    },
    mounted() {
      this.$store.commit('app/loading', false)
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/mixins/buttons';
  @import '../assets/sass/mixins/layout';

  .signup-card {
    width: login(box, width);
    min-width: login(box, width);
    max-width: login(box, width);
    background-color: login(box, background);
  }

  .signup-page {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -1.5rem;

    .signup-header {
      @include flex-row;

      min-height: login(header, height);
      padding: spacing(tight);
      background-color: login(header, background);
      border-bottom: login(header, border);
      box-shadow: login(header, shadow);

      .svg-logo {
        margin: $signup_logo_margin;
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
          background-color: colour(primary);
          color: colour(primary, light);
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
        }
      }

      .brand {
        display: inline-block;
        font-size: 18px;
        color: $signup_logo_text;
      }
    }

    .signup-form {
      @include flex-center;

      height: calc(100vh - #{login(header, height)});
      padding: login(header, height) 0;
      background-color: login(background);

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
        color: colour(icons);
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
          color: colour(primary, dark);
        }
      }

      .signup-button-wrapper {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .card {
        border: $signup_box_border;
        background-color: $signup_box_background;
        width: $signup_box_min_width;
        min-width: $signup_box_min_width;
        @media(max-width: $signup_box_min_width) {
          width: 100%;
          min-width: 100%;
        }
      }

      .password-reset-container {
        margin-top: 35px;
        margin-bottom: 5px;
      }

      .label-checkbox {
        margin-left: 5px;
      }

      button.signup-button {
        @include button-filled();
      }

      .loading {
        transform: translate(-8px, 2px);
      }
    }
  }
</style>
