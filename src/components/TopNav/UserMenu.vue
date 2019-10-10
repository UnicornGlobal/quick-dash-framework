<template>
  <div class="user-menu" v-if="showUserMenu">
    <avatar-or-initials
      v-if="showUserAvatar"
      class="user-avatar"
      :size="40"
      round
      :title="user.first_name"
      :image="getAvatarImage"
      >
    </avatar-or-initials>
    <div class="user-details">
      <div class="user-name text-white" v-if="showUserName">
        {{ user.first_name}} {{ user.last_name }}
      </div>
      <div class="role" v-if="showLogout">
        <a @click.prevent="logout" href="#" class="logout-button">Logout</a>
      </div>
      <div class="role" v-if="showRole">
        {{ role }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .logout-button {
    text-decoration: none;
  }

  .user-menu {
    display: flex;
    height: 60px;
    flex-direction: row;

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
      border: 0px solid $white;
    }
  }

  .user-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    color: $primary-text;

    .user-name {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $primary-text;
    }

    .role {
      color: $primary-text;
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
    computed: {
      getAvatarImage() {
        if (this.user.profile_photo) {
          return process.env.apiUrl + this.user.profile_photo.file_url
        }
      },
      showRole() {
        if (this.$store.getters['app/config'].header.role) {
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
        if (this.$store.getters['app/config'].header.profile) {
          return true
        }

        return false
      },
      showUserAvatar() {
        if (this.$store.getters['app/config'].header.avatar) {
          return true
        }

        return false
      },
      showUserName() {
        if (this.$store.getters['app/config'].header.name) {
          return true
        }

        return false
      },
      showLogout() {
        if (this.$store.getters['app/config'].header.logout) {
          return true
        }

        return false
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
        window.location.href = '/login?logout=true'
      }
    }
  }
</script>
