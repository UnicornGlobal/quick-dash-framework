<template>
  <div
    v-if="loaded"
    class="home-page"
  >
    <verify-account-card
      v-if="userNotVerified"
      :user="user"
    />
    <page-container title="">
      <page-section
        title=""
        class="intro"
      >
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 2rem; height: 100%; padding: 2rem;">
          <p>Admin Role Loaded</p>
        </div>
      </page-section>
    </page-container>
  </div>
</template>

<style lang="scss" scoped>
  .home-page.content-area {
    background-color: colour("background", "light");
    padding-left: 2em;
  }
</style>

<script>
  import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'
  import PageContainer from '@/components/Containers/PageContainer.vue'
  import PageSection from '@/components/Containers/PageSection.vue'

  export default {
    name: 'Home',
    components: {
      VerifyAccountCard,
      PageContainer,
      PageSection
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
    },
    mounted() {
      this.loaded = true
    }
  }
</script>

