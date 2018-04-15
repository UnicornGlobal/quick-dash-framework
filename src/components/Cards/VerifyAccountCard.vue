<template>
  <div class="action-required-card">
    <div class="mobile-layout">
      <div class="action-description">
        <h3 class="title">Email requires verification</h3>
        <p class="description">
          Please confirm your email address <strong>{{ user.email }}</strong> from the email we sent you when you signed up.
        </p>
      </div>
    </div>
    <div>
      <div v-if="this.$store.getters.resentVerification"></div>
      <button v-else @click="resendMail" class="action-required-link">Resend Email</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .action-required-card {
    display: flex;
    flex-direction: row;
    border: 2px solid $success;
    background-color: lighten($success, 35%);
    margin: 1em;
    padding: 1em;
    align-items: center;
    justify-content: space-between;
    @media(min-width: 1400px) {
      justify-content: center;
    }
    @media(max-width: 590px) {
      flex-direction: column;
    }
    .mobile-layout {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      fill: $black;
      color: $black;
      @media(max-width: 590px) {
        align-self: center;
        width: 80px;
        height: 80px;
        padding-right: 10px;
      }
      svg {
        width: 70px;
        height: 80px;
        fill: $primary-dark;
      }
    }

    .action-description {
      flex: 1;
      @media(max-width: 590px) {
        text-align: center;
      }

      .title {
        font-size: 16px;
        margin: 0;
        font-weight: bold;
      }

      p {
        height: 100%;
        font-size: 14px;
        flex: 1;
      }
    }

    .action-required-link {
      display: inline-block;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 2px solid;
      padding: .375rem 1rem;
      margin-left: 1rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0;
      transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      color: $primary-text;
      background-color: $primary-light;
      background-image: none;
      border-color: lighten($primary, 10%);
      text-decoration: none;
    }
  }
</style>

<script>
  import Card from '@/components/Cards/Card.vue'
  import { resendVerification } from '@/api/user'

  export default {
    name: 'action-required-card',
    components: {
      Card
    },
    props: {
      user: {
        tpye: Object,
        required: true
      }
    },
    methods: {
      resendMail() {
        if (!this.$store.getters.resentVerification) {
          resendVerification()
          this.$store.commit('setResentVerification')
        }
      }
    }
  }
</script>
