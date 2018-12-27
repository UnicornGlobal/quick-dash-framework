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
  .home-page {
    background-color: $light-bg;
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

