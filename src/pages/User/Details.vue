<template>
  <page-container title="User Account">
    <page-section title="User Details" subtitle="More Info">
      <key-value-card :items="userDetails"></key-value-card>
    </page-section>
  </page-container>
</template>

<style lang="scss" scoped>
  .link-container {
    display: flex;
    justify-content: flex-end;
  }

  .section-divider {
    border-bottom: none;
  }
</style>

<script>
  import KeyValueCard from '@/components/Cards/KeyValueCard.vue'
  import PageContainer from '@/components/Containers/PageContainer.vue'
  import PageSection from '@/components/Containers/PageSection.vue'

  export default {
    components: {
      KeyValueCard,
      PageContainer,
      PageSection
    },
    computed: {
      userDetails() {
        const user = this.$store.getters['auth/user']

        return [
          {
            key: 'First Name',
            value: user.first_name || '-'
          },
          {
            key: 'Last Name',
            value: user.last_name || '-'
          },
          {
            key: 'Email',
            value: user.email || '-'
          },
          {
            key: 'Mobile',
            value: user.mobile || '-'
          },
          {
            key: 'User ID',
            value: user._id || '-'
          }
        ]
      }
    }
  }
</script>
