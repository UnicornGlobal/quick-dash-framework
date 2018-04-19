<template>
  <transition name="slide">
    <div v-if="!closed" class="verify-email">
      <div class="instructions">
        <h3>Email requires verification</h3>
        <p>
          We sent a verification email to <strong>{{ user.email }}</strong> with further instructions.
        </p>
      </div>
      <div class="actions">
        <a class="button"
          v-if="!this.$store.getters['auth/resentVerification']"
          @click="resendMail">
            Resend
        </a>
        <a class="dismiss" @click="closed=true">X</a>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .verify-email {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: $primary;
    color: $secondary-text;
    padding: 0 0 0 0.5em;
    display: flex;
    flex-direction: row;

    .instructions {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 1em;

      h3 {
        padding: 0;
        margin: 0;
      }

      p {
        padding: 0;
        margin: 0;
        flex: 2;
      }
    }

    .actions {
      padding: 1em;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      a {
        cursor: pointer;
      }

      a.button {
        margin: 1em;
        background: $secondary-text;
        color: $primary;
        border-radius: $border-radius;
      }

      a.dismiss {
        padding: 1em;
      }
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(20em);
  }
</style>

<script>
  import Card from '@/components/Cards/Card.vue'
  import Info from '@/components/Icons/info.svg'
  import { resendVerification } from '@/api/user'

  export default {
    components: {
      Card,
      Info
    },
    props: {
      user: {
        tpye: Object,
        required: true
      }
    },
    data() {
      return {
        closed: this.$store.getters['auth/resentVerification']
      }
    },
    methods: {
      resendMail() {
        if (!this.$store.getters['auth/resentVerification']) {
          resendVerification()
          this.$store.commit('auth/setResentVerification')
        }
      }
    }
  }
</script>
