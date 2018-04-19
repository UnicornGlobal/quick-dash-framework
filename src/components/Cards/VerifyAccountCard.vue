<template>
  <div class="cont">
    <div class="action-required-card">
      <div class="mobile-layout">
        <div>
          <info class="info-icon"></info>
        </div>
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
  </div>
</template>

<style lang="scss" scoped>
  .cont {
    background-color: $white;
    padding: 15px;
  }
  .info-icon {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
  .action-required-card {
    display: flex;
    flex-direction: row;
    border: 1px solid $blue-2;
    background-color: $blue-light;
    padding: 1em;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
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
        font-size: 18px;
        margin: 0;
        font-weight: bold;
        color: $blue-1;
      }

      p {
        height: 100%;
        font-size: 13px;
        flex: 1;
        margin: 5px 0px;

        strong {
          color: $primary
        }
      }
    }

    .action-required-link {
      display: inline-block;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 1px solid;
      padding: .375rem 1rem;
      margin-left: 1rem;
      font-size: .8rem;
      line-height: 1.5;
      border-radius: 0;
      transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
      color: $white;
      background-color: $blue-2;
      background-image: none;
      border-color: $blue-1;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        background-color: darken($blue-2, 10)
      }
    }
  }
</style>

<script>
  import Card from '@/components/Cards/Card.vue'
  import Info from '@/components/Icons/info.svg'
  import { resendVerification } from '@/api/user'

  export default {
    name: 'action-required-card',
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
