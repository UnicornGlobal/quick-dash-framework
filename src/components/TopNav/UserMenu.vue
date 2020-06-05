<template>
  <div class="user-menu" v-if="showUserMenu">
    <div class="menu-dropdown" @click="dropDownOpened = !dropDownOpened">
      <avatar-or-initials
        class="user-avatar"
        :size="40"
        :radius="40"
        round
        :title="user.first_name"
        :image="getAvatarImage"
      >
      </avatar-or-initials>
      <svg
        :class="dropDownOpened ? 'open' : 'closed'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class="toggle-icon"
      >
        <path
          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
        />
      </svg>
    </div>
    <div :class="[{ active: dropDownOpened }, 'dropdown-list']">
      <div class="user-details-wrapper" v-if="showUserName || showRole || showUserAvatar">
        <avatar-or-initials
          v-if="showUserAvatar"
          class="user-avatar"
          :size="40"
          :radius="40"
          round
          :title="user.first_name"
          :image="getAvatarImage"
        >
        </avatar-or-initials>
        <div class="user-details">
          <div class="user-name text-white" v-if="showUserName">
            {{ user.first_name }} {{ user.last_name }}
          </div>
          <div class="role" v-if="showRole">
            {{ role }}
          </div>
        </div>
      </div>
      <div class="links">
        <ul>
          <li v-if="account && account.enabled">
            <router-link to="/account" class="user-menu-account">Account Details</router-link>
          </li>
          <li v-for="(menu, index) in menus" :key="index">
            <a :href="menu.link" class="user-menu-link">{{ menu.label }}</a>
          </li>
          <li v-if="showLogout">
            <a @click.prevent="logout" href="#" class="user-menu-logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.profile-container {
  position: relative;
  height: 100%;
}

.logout-button {
  text-decoration: none;
}

.menu-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    height: 22px;
    width: 22px;
    fill: #aaaaaa;
    transition: 0.3s ease;

    &.open {
      transform: rotate(-180deg);
    }
  }
}

.dropdown-list {
  min-width: 250px;
  position: absolute;
  right: 0;
  top: 67px;
  z-index: 9999999;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.26s ease;
  background: #fff;
  overflow: hidden;
  border: thin solid colour(primary);
  border-radius: 3px;
  &.active {
    transform: scaleY(1);
  }
}

.user-details-wrapper {
  border-bottom: 1px solid #dddddd;
  display: flex;
  padding-right: 0.5rem;
}

.toggle-icon {
  margin-left: 0.75rem;
}

.user-menu {
  display: flex;
  height: 60px;
  flex-direction: row;
  position: relative;

  a {
    color: colour(white);
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  color: colour(primary, text);
  padding: 0.6rem 1.2rem;

  .user-name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: colour(primary, text);
  }

  .role {
    color: colour(primary, text);
  }
}

.user-avatar {
  width: 40px;
  height: 40px;
  margin: 1rem 0rem 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar-initials {
    background-color: colour(primary, dark);
    border: 0px solid colour(white);
  }
}

.links {
  padding: 20px 0;
  ul {
    list-style: none;
    margin-block-end: 0px;
    margin-block-start: 0px;
    margin-inline-end: 0px;
    margin-inline-start: 0px;
    padding-inline-start: 0px;
    li {
      a {
        color: #4c5459;
        display: block;
        padding: 5px 20px;
        font-size: 0.9rem;
        text-decoration: none;
        transition: 0.3s ease;

        &:hover {
          color: colour(primary, dark);
          font-weight: bold;
        }
      }
    }
  }
}
</style>

<script>
import AvatarOrInitials from '@unicorns/avatars'
import { reloadRouter } from '@/router'

export default {
  components: {
    AvatarOrInitials
  },
  props: {
    user: {
      required: true
    }
  },
  data() {
    return {
      dropDownOpened: false
    }
  },
  computed: {
    getAvatarImage() {
      if (this.user.profile_photo) {
        if (this.user.profile_photo.file_url.match(/^https?:\/\//)) {
          return this.user.profile_photo.file_url
        }

        return process.env.apiUrl + this.user.profile_photo.file_url
      }
    },
    showRole() {
      if (this.$store.getters['app/config'].usermenu.role) {
        return true
      }

      return false
    },
    role() {
      if (this.$store.getters['app/config'].header.role) {
        return this.$store.getters['app/config'].header.role(this.user)
      }
    },
    showUserMenu() {
      if (this.$store.getters['app/config'].usermenu.enabled) {
        return true
      }

      return false
    },
    showUserAvatar() {
      if (this.$store.getters['app/config'].usermenu.avatar) {
        return true
      }

      return false
    },
    showUserName() {
      if (this.$store.getters['app/config'].usermenu.name) {
        return true
      }

      return false
    },
    showLogout() {
      return this.$store.getters['app/config'].usermenu.logout
    },

    menus() {
      return this.$store.getters['app/config'].usermenu.menus
    },

    account() {
      return this.$store.getters['app/config'].router.account
    }
  },
  methods: {
    logout() {
      this.$store.commit('app/loading', true)
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
