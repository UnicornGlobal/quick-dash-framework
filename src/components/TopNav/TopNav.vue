<template>
  <div>
    <div class="top-navigation">
      <div class="left">
        <div class="menu-toggle">
          <div @click.prevent="toggleSideBar()">
            <hamburger></hamburger>
          </div>
        </div>
        <router-link class="logo" to="/">
          Quick Dash
        </router-link>
      </div>
      <div class="right">
        <div v-if="user" class="user-menu">
          <avatar-or-initials
            class="user-avatar"
            :size="40"
            :title="user.first_name"
            backgroundColour="#4CAF50"
          >
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
  </div>
</template>

<style lang="scss" scoped>
  .top-navigation {
    height: 60px;
    margin: 0;
    padding: 0;
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

  .left {
    width: 250px;
    border-right: .5px solid $light-bg;
    display: flex;
    align-items: center;
    background-color: $primary;
    height: 61px;
    @media (max-width: 1025px) {
      width: 100%;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    background-color: $primary;
    padding-right: 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2em;
    color: $white;
    font-size: 22px;
    text-decoration: none;

    svg {
      height: 30px;
      fill: $white;
    }
  }

  .user-menu {
    // background: $accent;
    // width: 350px;
    height: 60px;
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
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar-initials {
      background-color: $accent;
      border: 2px solid $white;
    }
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
  import AvatarOrInitials from '@unicorns/avatars'
  import { reloadRouter } from '@/router'
  import icons from '@/icons'

  export default {
    name: 'top-nav',
    components: {
      AvatarOrInitials,
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
