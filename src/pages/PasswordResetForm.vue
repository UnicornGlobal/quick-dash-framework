<template>
  <div class="password-reset-page">
    <component v-if="headerComponent" :is="headerComponent"></component>
    <div v-else class="reset-header">
      <div class="logo" v-if="showEmojiLogo"><span>{{ emojiLogo }}</span></div>
        <component v-if="showLogo" :is="logo" class="svg-logo"></component>
      <div class="brand">{{ appName }}</div>
    </div>
    <p v-if="sent" class="sent-success" style="color: white">
      {{ strings.success }}
    </p>
    <div class="password-reset-form" v-else>
      <card class="card">
        <h2>Set New Password</h2>
        <div>
          <label for="password">New Password</label>
          <input v-validate="'required'" v-model="password" name="password" type="password">
          <span v-if="errors.has('password')" class="validation-error">{{errors.first('password')}}</span>
        </div>
        <div class="button-container">
          <div class="quick-links">
            <a href="/login">Sign In</a>
            |
            <a href="/privacy">Privacy Policy</a>
          </div>

          <button @click.prevent="submit()" class="reset-button text-uppercase" :class="sent ? 'hide' : ''">
            <div class="loading" v-if="sending">
              <loader fill="#ffffff" width="25px" height="25px"></loader>
            </div>
            {{ strings.button }}
          </button>
        </div>
      </card>
    </div>
    <component v-if="footerComponent" :is="footerComponent"></component>
  </div>
</template>

<script type="text/javascript">
  import Card from '@/components/Cards/Card.vue'

  export default {
    components: {Card},
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
        email: '',
        token: '',
        password: '',
        sent: false,
        sending: false
      }
    },
    created() {
      this.strings = require('@/i18n/en/password-reset').default
    },
    mounted() {
      this.$store.commit('app/loading', false)
      this.email = this.$route.params.email
      this.token = this.$route.params.token
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
        this.sending = true
        this.$http.post(`reset/${this.token}`, {
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
          token: this.token
        })
          .then(data => {
            if (data !== null && data.data && !data.data.success) {
              this.errors.add({
                field: 'password',
                msg: 'There was a problem resetting your password. Please request a new password reset link.',
                rule: 'required'
              })
            } else if (data !== null && !data.data && data.response && data.response.data && !data.response.data.success) {
              if (data.response.data.password && data.response.data.password[0]) {
                this.errors.add({
                  field: 'password',
                  msg: data.response.data.password[0],
                  rule: 'required'
                })
              }

              this.errors.add({
                field: 'password',
                msg: 'There was a problem resetting your password',
                rule: 'required'
              })
            } else if (data !== null && data.data && data.data.success === true) {
              this.$router.push('/login?reset=true')
            } else {
              this.sent = true
              this.sending = false
            }
          })
          .finally(() => {
            this.sending = false
          })
      },
      goBack() {
        window.history.back()
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

      @media(max-width: 999px) {
        text-align: center;
      }
    }
  }

  .validation-error {
    margin-bottom: 1rem;

    @media(max-width: 999px) {
      text-align: center;
    }
  }

  .password-reset-page {
    .reset-header {
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
          background-color: $primary;
          color: $primary-light;
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

    .card {
        border: $login_box_border;
        background-color: $login_box_background;
        width: $login_box_min_width;
        min-width: $login_box_min_width;
        @media(max-width: $login_box_min_width) {
          width: 100%;
          min-width: 100%;
        }
    }

    label {
      color: $primary-text;
      font-size: $login_label_text_size;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .password-reset-form {
      min-height: calc(100vh - 70px);
      background-color: $login_background;
      display: flex;
      justify-content: center;
      align-items: center;
      @media(max-width: 560px) {
        width: 100%;
        max-width: unset;
      }

      .button-container {
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        @media(max-width: 999px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .quick-links {
          a {
            text-decoration: none;
            color: $login_text;
            font-weight: bold;
            font-size: 12px;
          }
          a:hover {
            text-decoration: underline;
          }

          @media(max-width: 999px) {
            margin-bottom: 1rem;
          }
        }
      }

      .hide {
        display: none;
      }
    }

    button {
      line-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $white;
      background-color: $login_button_background;
      border: none;
      border-radius: $border-radius;
      cursor: pointer;
      min-width: $login_button_min_width;
      min-height: $login_button_min_height;
      margin: 0;

      @media(max-width: 999px) {
        width: 100%;
      }
    }

    input {
      padding-left: 10px;
      margin-top: 5px;
      border: 1px solid darken($primary, 20);
      border-radius: $border-radius;
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
