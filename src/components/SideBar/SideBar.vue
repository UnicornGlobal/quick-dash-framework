<template>
  <div class="menu-element">
    <div class="menu-items">
      <side-bar-menu-item v-for="menu in menus" :key="menu.name" :menu="menu" :base="rootPath"></side-bar-menu-item>
    </div>
    <div class="logout-link-menu-item">
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
  import { reloadRouter } from '@/router'
  import LogoutIcon from '@/components/SideBar/icons/sign_out.svg'

  export default {
    props: [
      'menus',
      'root-path'
    ],
    components: {SideBarMenuItem, LogoutIcon},
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
