<template>
  <div>
    <template v-if="roles.length">
      <label v-for="role in roles">
        <input type="radio" name="role" :value="role._id" v-model="currentRoleId">
        <span class="radiomark"></span>
        <span class="role-name">{{role.name}}</span>
      </label>
      <div class="button-block">
        <button type="submit" v-if="currentRoleId" @click="assignRole" style="background: green;">
          <loader v-if="sending" fill="#ffffff" strokeEdges="#ffffff"></loader>
          <span>Assign</span>
        </button>
      </div>
    </template>
    <h6 v-else>No available roles</h6>
  </div>
</template>

<script>
  import { assignRole } from '@/api/admin/roles'

  export default {
    props: ['user', 'roles'],
    data() {
      return {
        currentRoleId: '',
        sending: false
      }
    },
    methods: {
      assignRole() {
        this.sending = true
        return assignRole(this.user._id, this.currentRoleId)
          .then(
            () => {
              this.$emit('success')
            })
          .catch(
            (error) => {
              this.$emit('error', error)
              let message = 'Unknown error'
              if (error.response && error.response.data && error.response.data.error) {
                message = error.response.data.error
              }

              this.$toaster.addToast({
                type: 'error',
                title: 'Error',
                message: message,
                timeOut: 2000
              })
            })
          .finally(() => {
            this.sending = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  label {
    display: flex;
    margin-bottom: 10px;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    input:checked {
      ~ .radiomark:after {
        display: block;
        background: colour("primary", "dark");
        top: 2px;
        left: 2px;
        width: 9px;
        height: 9px;
        position: absolute;
        border-radius: 50%;
        content: "";
      }
    }

    .radiomark {
      position: absolute;
      top: 4px;
      left: 0;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: thin solid grey;
    }

    .radiomark:hover {
      background: grey;
    }

    .role-name {
      text-transform: capitalize;
      color: black;
    }
  }

  .button-block {
    display: block;
    text-align: right;
    margin: 0;
  }
</style>
