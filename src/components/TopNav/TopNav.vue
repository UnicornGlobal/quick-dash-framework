<template>
  <div class="top-navigation">
    <div class="header" :style="headerStyle">
      <div class="menu-toggle">
        <div @click.prevent="toggleSideBar()">
          <hamburger></hamburger>
        </div>
      </div>
      <router-link class="logo" to="/" v-if="showLogo">
        <quick></quick>&nbsp;Quick Dash
      </router-link>
      <user-menu v-if="user" :user="user"></user-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .top-navigation {
    height: 60px;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 1025px) {
      display: block;
    }
  }

  .menu-toggle {
    width: 65px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $primary;

    @media (min-width: 1025px) {
      display: none;
    }
  }

  .menu-toggle {
    svg {
      width: 30px;
      height: 30px;
      fill: $primary;
    }
  }

  .header {
    width: 100%;
    padding: 0 1em;
    display: flex;
    align-items: center;
    background-color: $primary;
    height: 61px;
    @media (max-width: 1025px) {
      padding-left: 1em;
      width: 100%;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: $white;
    font-size: 22px;
    text-decoration: none;

    svg {
      height: 40px;
      width: 45px;
      fill: $white;
    }
  }
</style>

<script>
  import UserMenu from '@/components/TopNav/UserMenu'
  import icons from '@/icons'

  export default {
    name: 'top-nav',
    components: {
      UserMenu,
      hamburger: icons.hamburger,
      quick: icons.quick
    },
    props: {
      user: {
        type: Object,
        required: true
      },
      loaded: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      headerStyle() {
        if (this.$store.getters['app/config'].sidebar.position === 'right') {
          return 'flex-direction: row-reverse; justify-content: space-between;'
        }

        return 'justify-content: space-between'
      },
      showLogo() {
        if (this.$store.getters['app/config'].header.logo) {
          return true
        }

        return false
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.commit('app/sidebar/open', !this.$store.getters['app/sidebar/open'])
      }
    }
  }
</script>
