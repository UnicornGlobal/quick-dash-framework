<template>
  <div class="home-page" v-if="loaded">
    <h2 class="welcome" v-if="tips">Welcome {{ user.first_name }}!</h2>
    <verify-account-card
      v-if="userNotVerified"
      :user="user">
    </verify-account-card>

    <tips-section v-if="tips" :tips="tips" title="Here are some tips to help you get started"></tips-section>
    <summary-section></summary-section>
  </div>
</template>

<style lang="scss">
  .welcome {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    margin: 0.75em 0.5em;
  }

  .home-page {
    h2 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 1024px) {
        margin: 0.7em;
      }
    }
  }
</style>

<script>
  import TipsSection from './TipsSection.vue'
  import SummarySection from './SummarySection.vue'
  import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'

  export default {
    name: 'home',
    components: {
      TipsSection,
      SummarySection,
      VerifyAccountCard
    },
    mounted() {
      this.loaded = true
    },
    data() {
      return {
        loaded: false
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      userNotVerified() {
        if (this.$store.state.user) {
          return !this.$store.state.user.confirmed
        }

        return false
      },
      tips() {
        if (this.$store.state) {
          let tips = []

          // Make actual conditionals here
          if (this.$store.state) {
            tips.push({
              title: 'Example tip!',
              content: 'You can add content here. You can also add a link!',
              linkText: 'My Account',
              target: {
                name: 'account'
              }
            })
          }

          return tips
        }
      }
    }
  }
</script>

