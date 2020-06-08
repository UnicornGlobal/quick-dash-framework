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
        <h2>{{ strings.header }}</h2>
        <div>
          <label class="required">Email&nbsp;</label>
          <input v-validate="'required'" v-model="email" name="email" type="text">
          <span v-if="errors.has('email')" class="validation-error">{{errors.first('email')}}</span>
        </div>
        <div class="button-container">
          <div class="quick-links">
            <a href="/login">Sign In</a>
            |
            <a href="/privacy">Privacy Policy</a>
          </div>

          <button @click.prevent="submit()" class="reset-button text-uppercase" :class="sent ? 'hide' : ''">
            <div class="loading" v-if="bSending">
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
  import { clearCookies } from '@/auth'

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
        sent: false,
        bSending: false
      }
    },
    created() {
      this.strings = require('@/i18n/en/password-reset').default
    },
    mounted() {
      this.$store.commit('app/loading', false)
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
            clearCookies()
            localStorage.clear()
            return this.sendRequest()
          }
        })
      },
      sendRequest() {
        this.bSending = true
        this.$http.post('reset', {email: this.email})
          .then(data => {
            if (data !== null && data.response && data.response.data && data.response.data.email) {
              this.errors.add({
                field: 'email',
                msg: data.response.data.email[0],
                rule: 'required'
              })
            } else if (data !== null && data.data && data.data.success === false) {
              this.errors.add({
                field: 'email',
                msg: 'A user with that email address does not exist',
                rule: 'required'
              })
            } else if (data !== null && data.data && data.data.success === true) {
              this.$router.push('/login?request=true')
            } else {
              this.sent = true
              this.bSending = false
            }
          })
          .finally(() => {
            this.sent = true
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
  .card {
    max-width: 480px;
    padding: login(box, padding);
    margin: login(box, margin);
    border-radius: border-radius();
    background-color: login(box, background);
    box-shadow: login(shadow);

    h2 {
      padding: login(header, padding);
      margin: 0px;
      background-color: login(box, header);
      color: login(text, color);
      font-size: login(header, text);
    }
  }

  .password-reset-page {
    .reset-header {
      min-height: login(header, height);
      padding: 10px;
      background-color: login(header);
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
        color: login(logo, text);
      }
    }

    .text-header {
      color: colour(white);
      padding-top: 10px;
      margin-bottom: 0;
    }

    .text {
      color: colour(white);
      font-size: 20px;
      top: 100px;
      left: 82px;
      font-size: 1em;
    }

    .card {
        border: login(box, border);
        background-color: login(box, background);
        width: login(box, width);
        min-width: login(box, width);
        @media(max-width: login(box, width)) {
          width: 100%;
          min-width: 100%;
        }
    }

    label {
      color: colour(primary, text);
      font-size: login(text, label);
      font-weight: bold;
    }

    .password-reset-form {
      min-height: calc(100vh - 70px);
      background-color: login(background);
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

        .quick-links {
          a {
            text-decoration: none;
            color: login(text, color);
            font-weight: bold;
            font-size: 12px;
          }
          a:hover {
            text-decoration: underline;
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
      color: colour(white);
      background-color: colour(primary);
      border: none;
      border-radius: border-radius();
      cursor: pointer;
      min-width: $button_min_width;
      min-height: $button_min_height;
      margin: 0;
    }

    input {
      padding-left: 10px;
      margin-top: 5px;
      border: 1px solid colour(primary, "dark");
      border-radius: border-radius();
    }

    .sent-success {
      font-size: 18px;
      color: colour(success);
    }

    .loading {
      transform: translate(-8px, 2px);
    }
  }
</style>
