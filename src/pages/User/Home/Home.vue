<template>
  <div class="home-page" v-if="loaded">
    <verify-account-card
      v-if="userNotVerified"
      :user="user">
    </verify-account-card>

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
    background-color: $light-bg;
    padding: 20px;
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
  import SummarySection from './SummarySection.vue'
  import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'

  export default {
    name: 'home',
    components: {
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
        return this.$store.getters['auth/user']
      },
      userNotVerified() {
        if (this.$store.getters['auth/user']) {
          return !this.$store.getters['auth/user'].confirmed
        }

        return false
      }
    }
  }
</script>

