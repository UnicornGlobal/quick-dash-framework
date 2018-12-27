<template>
  <div class="top-navigation">
    <div class="header" :style="headerStyle">
      <div class="menu-toggle">
        <div @click.prevent="toggleSideBar()">
          <hamburger></hamburger>
        </div>
      </div>
      <router-link class="logo" to="/">
        Quick Dash
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
    color: $white;

    @media (min-width: 1025px) {
      display: none;
    }
  }

  .menu-toggle {
    svg {
      width: 30px;
      height: 30px;
      fill: $white;
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
      height: 30px;
      fill: $white;
    }
  }
</style>

<script>
  import UserMenu from '@/components/TopNav/UserMenu'
  import { reloadRouter } from '@/router'
  import icons from '@/icons'

  export default {
    name: 'top-nav',
    components: {
      UserMenu,
      hamburger: icons.hamburger
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
      }
    },
    methods: {
      logout() {
        return this.$auth.logout({
          makeRequest: true,
          method: 'POST',
          url: '/logout',
          success: () => {
            reloadRouter()
          }
        }).then(() => {
          this.redirectToLogin()
        })
      },
      redirectToLogin() {
        window.location.pathname = 'login'
      },
      toggleSideBar() {
        this.$store.commit('app/sidebar/open', !this.$store.getters['app/sidebar/open'])
      }
    }
  }
</script>
