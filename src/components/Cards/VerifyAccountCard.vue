<template>
  <div v-if="!closed" class="verify-email">
    <div class="instructions">
      <h3>Email requires verification</h3>
      <p class="details">
        We sent a verification email to <strong>{{ user.email }}</strong> with further instructions.
      </p>
    </div>
    <div class="actions">
      <a class="button"
        v-if="!this.$store.getters['auth/resentVerification']"
        @click="resendMail">
          RESEND
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .verify-email {
    z-index: 9999;
    background: $accent;
    color: $primary-text;
    padding: 0rem 0 0rem 2.2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 1023px) {
      padding: 1rem 0 0 1.2rem;
    }

    .instructions {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 1em;
      color: $primary;

      .details {
        color: $primary-light;
      }

      h3 {
        padding: 0;
        margin: 0;
        color: $primary;
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
        margin: 1rem 0.25rem 1rem;
        background: $secondary-text;
        color: $primary;
        border-radius: $border-radius;

        &:active, &:hover {
          background-color: $secondary-text;
          color: #ffffff;
        }
      }
    }
  }
</style>

<script>
  import { resendVerification } from '@/api/user'

  export default {
    props: {
      user: {
        type: Object,
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
