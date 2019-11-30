<template>
  <div class="menu-element">
    <router-link
      class="logo"
      :to="homeRoute"
      v-if="showLogo"
      @click.native="closeSidebar"
    >
      <component v-if="showLogo" :is="logo"></component>
    </router-link>
    <user-profile v-if="showUserProfile" :user="user"></user-profile>
    <div class="menu-items">
      <side-bar-menu-item
        v-for="menu in menus"
        :key="menu.name"
        :menu="menu"
        :base="rootPath"
      ></side-bar-menu-item>
    </div>
    <component v-if="showSideBarFooterComponent" :is="sideBarFooterComponent"></component>
    <div v-if="showLogout" class="logout-link-menu-item" :style="logoutStyle">
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
    quick: icons.quick,
    'logout-icon': icons.sign_out
  },
  computed: {
    homeRoute() {
      return this.$store.getters['app/config'].header.homeRoute || '/'
    },
    showUserProfile() {
      return this.$store.getters['app/config'].sidebar.profile
    },
    showLogo() {
      if (this.$store.getters['app/config'].sidebar.logo) {
        return true
      }

      return false
    },
    logo() {
      if (this.$store.getters['app/config'].sidebar.logo) {
        return this.$store.getters['app/config'].sidebar.logo()
      }

      return false
    },
    logoutStyle() {
      if (this.$store.getters['app/config'].sidebar.logout) {
        return 'display: block'
      }
    },
    showLogout() {
      return this.$store.getters['app/config'].sidebar.logout
    },
    showSideBarFooterComponent() {
      return this.$store.getters['app/config'].sidebar.customSideBarComponent.enabled;
    },
    sideBarFooterComponent() {
      return this.$store.getters['app/config'].sidebar.customSideBarComponent.component;
    },
  },
  methods: {
    closeSidebar() {
      if (this.$store.getters['app/sidebar/open']) {
        this.$store.commit('app/sidebar/open', false)
      }
    },
    logout() {
      return this.$auth
        .logout({
          makeRequest: true,
          method: 'POST',
          url: '/logout',
          success: () => {
            reloadRouter()
          }
        })
        .then(() => {
          this.redirectToLogin()
        })
    },
    redirectToLogin() {
      window.location.href = '/login?logout=true'
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
  position: absolute;
  width: 100%;
  margin-bottom: 0;

  a.logout {
    height: 65px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: $white;
    background: $accent;

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
  overflow: hidden;
  position: relative;
}

.menu-items {
  padding-bottom: 0;
  //margin-bottom: auto;
  margin-top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -1rem;
  //height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: left;
  margin: 0;
  color: $white;
  font-size: 22px;
  text-decoration: none;
  background-color: $header_background;
  height: 60px;
  padding: 1em 0.75em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  svg {
    height: 40px;
    width: 45px;
    fill: $white;
  }
}
</style>
