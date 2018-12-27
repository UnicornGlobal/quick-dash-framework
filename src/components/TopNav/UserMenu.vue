<template>
  <div class="user-menu" v-if="showUserMenu">
    <avatar-or-initials
      v-if="showUserAvatar"
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
      <div class="text-white" v-if="showLogout">
        <a @click.prevent="logout" href="#" class="logout-button">Logout</a>
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
    flex-direction: row-reverse;

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
    color: $white;

    .user-name {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>

<script>
  import AvatarOrInitials from '@unicorns/avatars'

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
      showLogout() {
        if (this.$store.getters['app/config'].header.logout) {
          return true
        }

        return false
      }
    }
  }
</script>
