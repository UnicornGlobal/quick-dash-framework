<template>
  <div class="signup-page" id="signup-page">
    <component v-if="headerComponent" :is="headerComponent"></component>
    <div v-else class="signup-header">
      <div class="logo" v-if="showEmojiLogo"><span>{{ emojiLogo }}</span></div>
        <component v-if="showLogo" :is="logo" class="svg-logo"></component>
      <div class="brand">{{ appName }}</div>
    </div>
    <div class="signup-form">
      <card class="card">
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

<style lang="scss" scoped>
  .card {
    max-width: 480px;
    padding: $signup_box_padding;
    margin: $signup_box_margin;
    border-radius: $border-radius;
    background-color: $signup_box_background;
    box-shadow: $signup_shadow;

    h2 {
      padding: $signup_header_padding;
      margin: 0px;
      background-color: $signup_box_header;
      color: $signup_text;
      font-size: $signup_header_text_size;
    }
  }

  .signup-page {
    height: 100%;
    overflow-y: scroll;

    .signup-header {
      min-height: $signup_header_height;
      padding: 10px;
      background-color: $signup_header;
      border-bottom: $signup_header_border;
      box-shadow: $signup_header_shadow;
      justify-content: left;
      align-items: center;
      display: flex;

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
      margin-top: 110px;
      padding: 2rem;
      background-color: $signup_background;
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

      label {
        color: colour(primary, text);
        font-size: $signup_label_text_size;
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
        color: colour(white);
        background-color: $signup_button_background;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
        min-width: $signup_button_min_width;
        min-height: $signup_button_min_height;
        margin: 0;
      }

      input {
        padding-left: 10px;
        margin-top: 5px;
        border: 1px solid colour(primary, dark);
        border-radius: $border-radius;
      }

      input[type=checkbox] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: colour(primary);
        border: 2px solid $signup_checkbox_colour;
        display: inline-block;
        position: relative;
        padding: 7px !important;
        top: 0.25rem;

        &:focus {
          border: 2px solid $signup_checkbox_colour;
          outline: $signup_checkbox_colour solid 2px;
          outline-offset: 1px;
        }

        &:checked {
          border: 2px solid $signup_checkbox_colour;
          background-color: $signup_checkbox_colour;
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
  }
</style>
