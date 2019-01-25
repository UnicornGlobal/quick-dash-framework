<template>
  <div class="menu-element">
    <user-profile v-if="showUserProfile" :user="user"></user-profile>
    <div class="menu-items">
      <side-bar-menu-item
        v-for="menu in menus"
        :key="menu.name"
        :menu="menu"
        :base="rootPath"
        :ref="menu.name"
        @open="getCurrentMenu"
      >
      </side-bar-menu-item>
    </div>
    <div class="toggle-sidebar-button-menu-item">
      <div class="menu-item">
        <a class="toggle-sidebar-button" @click.prevent="toggleSideBar()" href="#">
          <collapse-icon></collapse-icon>
          Hide</a>
      </div>
    </div>
    <div class="logout-link-menu-item" :style="logoutStyle">
      <div class="menu-item">
        <a class="logout" @click.prevent="logout" href="#">
          <logout-icon></logout-icon>
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBarMenuItem from '@/components/SideBar/SideBarMenuItem'
  import UserProfile from '@/components/SideBar/UserProfile'
  import { reloadRouter } from '@/router'
  import icons from '@/icons'

  export default {
    props: {
      rootPath: {
        required: false,
        default: '/'
      },
      menus: {
        required: true
      },
      user: {
        required: true
      }
    },
    components: {
      SideBarMenuItem,
      UserProfile,
      'logout-icon': icons.sign_out,
      'collapse-icon': icons.collapse
    },
    data () {
      return {
        currentMenu: this.$store.getters['app/sidebar/currentMenu'] || this.$route.name || null
      }
    },
    computed: {
      showUserProfile() {
        if (this.$store.getters['app/config'].sidebar.profile) {
          return 'display: block'
        }
      },
      logoutStyle() {
        if (this.$store.getters['app/config'].sidebar.logout) {
          return 'display: block'
        }
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
      getCurrentMenu (name) {
        if (this.currentMenu !== name && this.$refs[this.currentMenu]) {
          this.$refs[this.currentMenu][0].close()
        }
        this.currentMenu = name
      },
      toggleSideBar() {
        this.$store.commit('app/sidebar/enabled', !this.$store.getters['app/sidebar/enabled'])
        this.$store.commit('app/sidebar/currentMenu', this.currentMenu)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logout-link-menu-item {
    @media (min-width: 1025px) {
      display: none;
    }

    bottom: 0;

    a.logout {
      height: 65px;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-decoration: none;
      color: $white;
      background: $primary;

      svg {
        width: 25px;
        height: 25px;
        fill: $white;
        stroke: $white;
        stroke-width: 10;
        padding-right: 8px;
      }

      &:hover {
        color: $primary-light;
        svg {
          fill: $primary-light;
          stroke: $primary-light;
          stroke-width: 15;
        }
      }
    }
  }

  .menu-element {
    display: flex;
    flex-direction: column;
  }

  .menu-items {
    padding-bottom: 3em;
    margin-bottom: auto;
  }

  .logout-link-menu-item {
    margin-bottom: 0;
  }

  .toggle-sidebar-button-menu-item {
    @media (max-width: 1025px) {
      display: none;
    }
    bottom: 0;
    a.toggle-sidebar-button {
      height: 55px;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-decoration: none;
      color: $black;
      background: $divider;
      svg {
        width: 25px;
        height: 25px;
        fill: $primary-dark;
        stroke: $primary-dark;
        stroke-width: 10;
        padding-right: 8px;
      }
    }
  }
</style>
