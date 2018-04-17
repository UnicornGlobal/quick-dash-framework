<template>
  <div>
    <div class="top-navigation">
      <div class="menu-toggle">
        <div @click.prevent="toggleSideBar()">
          <hamburger-lines></hamburger-lines>
        </div>
      </div>
      <div class="logo">
        Quick Dash
      </div>
      <div class="fill"></div>
      <div v-if="user" class="user-menu">
        <avatar-or-initials class="user-avatar" round
                            :size="40"
                            :title="user.first_name">
        </avatar-or-initials>
        <div class="user-details">
          <div class="user-name text-white">
            {{ user.first_name}} {{ user.last_name }}
          </div>
          <div class="user-company text-white">
            <a @click.prevent="logout" href="#" class="logout-button">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .top-navigation {
    height: 65px;
    background: $primary;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .menu-toggle {
    width: 65px;
    height: 65px;
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

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2em;
    color: $white;
    font-size: 22px;

    svg {
      height: 30px;
      fill: $white;
    }
  }

  .user-menu {
    background: $accent;
    width: 350px;
    height: 65px;
  }

  .fill {
    flex: 1;
  }

  .user-menu {
    display: flex;

    a {
      color: $white;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }

  .user-avatar {
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    color: $white;

    .user-name {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-company {
      font-size: 12px;
    }
  }

  .user-menu-dropdown-toggle {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    font-size: 24px;
    font-weight: bold;
    svg {
      width: 30px;
      height: 30px;
      fill: $white;
    }
  }
</style>

<script>
  import AvatarOrInitials from '@/components/AvatarOrInitials.vue'
  import { reloadRouter } from '@/lib'
  import HamburgerLines from '@/assets/images/svg/hamburger-lines.svg'

  export default {
    name: 'top-nav',
    components: {
      AvatarOrInitials,
      HamburgerLines
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
        this.$store.commit('showSideBar', !this.$store.getters.sideBarState)
      }
    }
  }
</script>
