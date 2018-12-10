<template>
  <div>
    <template v-if="roles.length">
      <label v-for="role in roles">
        <input type="radio" name="role" :value="role._id" v-model="currentRoleId">
        <span class="radiomark"></span>
        <span style="text-transform: capitalize; color: black;">{{role.name}}</span>
      </label>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <button type="submit" v-if="currentRoleId" @click.prevent="assignRole" class="button-positive button-with-loader">
          <span class="button-loader">
            <loader v-if="sending" fill="#ffffff" strokeEdges="#ffffff"></loader>
          </span>
          <span class="button-text">Assign</span>
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
              this.$toaster.addToast({
                type: 'error',
                title: 'Error',
                message: 'Failed to assign role',
                timeOut: 5000
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
        background: $blue-1;
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
      border: thin solid $grey-2;
    }

    .radiomark:hover {
      background: $grey-2;
    }
  }
</style>
