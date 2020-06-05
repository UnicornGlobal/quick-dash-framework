<template>
  <div class="user-profile">
    <avatar-or-initials
      class="profile-avatar"
      :size="70"
      :radius="70"
      round
      :title="user.first_name">
    </avatar-or-initials>
    <h4>{{ user.first_name}} {{user.last_name}}</h4>
    <h5>{{ user.email }}</h5>
  </div>
</template>

<style lang="scss">
  .user-profile {
    background-color: colour(primary, dark);
    height: 180px;
    padding: 1em;
    display: flex;
    justify-content: center;
    flex-direction: column;

    h4, h5 {
      margin: 0;
      padding: 0;
      color: white;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar-initials {
        background-color: colour(primary, dark);
        border: 0px solid colour(white);

        span {
          font-size: 1.5em;
        }
      }
    }
  }
</style>

<script>
  import AvatarOrInitials from '@unicorns/avatars'

  export default {
    props: {
      user: {
        required: true
      }
    },
    components: {
      AvatarOrInitials
    }
  }
</script>
