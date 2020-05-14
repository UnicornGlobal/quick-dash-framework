<template>
  <div class="page-container">
    <top-nav class="top-nav" :loaded="loaded" :user="user" :sidebar="enableSideBar" v-if="user">
      <slot name="additional-info"></slot>
    </top-nav>
    <!-- <verify&#45;account&#45;card -->
      <!-- v-if="!user.confirmed" -->
      <!-- :user="user" -->
    <!-- /> -->
    <div class="content">
      <h1 v-if="title">{{title}}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.page-container {
  background-color: $light-bg;
  min-height: 100%;
  height: 100%;
  padding-bottom: 4rem;
}

.top-nav {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>

<script>
import TopNav from '@/components/TopNav/TopNav'
import VerifyAccountCard from '@/components/Cards/VerifyAccountCard.vue'

export default {
  props: {
    title: {
      type: String,
      required: false
    }
  },
  components: {
    VerifyAccountCard,
    TopNav
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    loaded() {
      return !this.$store.getters['app/loading']
    },
    enableSideBar() {
      return (
        this.$store.getters['app/sidebar/enabled'] &&
        this.$store.getters['app/config'].sidebar.enabled
      )
    }
  }
}
</script>
