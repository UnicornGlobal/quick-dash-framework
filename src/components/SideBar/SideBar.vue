<template>
  <div class="menu-element">
    <user-profile v-if="showUserProfile" :user="user"></user-profile>
    <div class="menu-items">
      <side-bar-menu-item
        v-for="menu in menus"
        :key="menu.name"
        :menu="menu"
        :base="rootPath"
        @open="setAsCurrentMenu"
      >
      </side-bar-menu-item>
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
      'logout-icon': icons.sign_out
    },
    data() {
      return {
        currentMenu: null
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
      setAsCurrentMenu(menuId) {
        if (this.currentMenu && this.currentMenu !== menuId) {
          this.$refs[this.currentMenu][0].close()
        }

        this.currentMenu = menuId
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
</style>
