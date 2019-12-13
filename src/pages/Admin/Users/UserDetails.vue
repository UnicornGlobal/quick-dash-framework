<template>
  <div>
    <page-container v-if="userDetails" title="User Details">
      <page-section title="User Details">
        <card>
          <div>
            <p class="detail-title">Users First Name</p>
            <p>{{userDetails.first_name}}</p>
            <p class="detail-title">Users Last Name</p>
            <p>{{userDetails.last_name}}</p>
            <p class="detail-title">Email</p>
            <p>{{userDetails.email}}</p>
            <p class="detail-title">Phone</p>
            <p>{{userDetails.mobile ? userDetails.mobile : '-'}}</p>
            <p class="detail-title">Confirmed</p>
            <p>{{userDetails.confirmed ? 'yes' : 'no'}}</p>
            <p class="detail-title">Verified</p>
            <p>{{userDetails.is_verified ? 'yes' : 'no'}}</p>
          </div>
        </card>
      </page-section>
      <page-section title="User Roles">
        <card>
          <div class="button-section" style="margin-bottom: 1rem; height: 2rem; display: block; text-align: right;">
            <button type="submit" @click.prevent="showRolesForm = true">Add Role</button>
          </div>
          <template v-if="userRoles">
            <ul v-if="userRoles.length">
              <li class="user-role" v-for="role in userRoles">
                <span class="role-name">
                  {{role.name}}
                </span>
                <prompt method="post"
                        link-text="Revoke"
                        message="Are you sure you want to revoke this role?"
                        link-class="link"
                        @success="loadUserRoles"
                        :url="'api/admin/users/' + userId +'/roles/revoke/' + role._id">
                </prompt>
              </li>
            </ul>
            <h5 v-else>User has no roles</h5>
          </template>
          <loader v-else></loader>
        </card>
      </page-section>
    </page-container>
    <loader v-else></loader>
    <modal v-if="showRolesForm" @close="showRolesForm = false">
      <h4 slot="header">Assign Roles</h4>
      <div slot="body">
        <assign-role-form @success="loadUserRoles" v-if="availableRoles" :user="userDetails" :roles="availableRoles"></assign-role-form>
        <loader v-else></loader>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" scoped>
  ul {
    padding-left: 0;
    width: 100%;
  }

  li.user-role {
    list-style: none;
    padding: 1em;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: #f7f7f7;
    }
    .role-name {
      text-transform: uppercase;
    }
  }

  .detail-title {
    font-family: "Montserrat-SemiBold", sans-serif;
  }

  .button-section {
    display: flex;
    justify-content: flex-end;
  }
</style>

<script>
  import PageContainer from '@/components/Containers/PageContainer.vue'
  import PageSection from '@/components/Containers/PageSection.vue'
  import Card from '@/components/Cards/Card.vue'
  import Prompt from '@/components/Prompt'
  import Modal from '@/components/Modal'
  import AssignRoleForm from './AssignRoleForm.vue'
  import { loadAllUsers } from '@/api/admin/users'
  import { loadUserRoles, loadAndStoreAllRoles } from '@/api/admin/roles'

  export default {
    props: ['user-id'],
    components: {
      AssignRoleForm,
      PageContainer,
      PageSection,
      Prompt,
      Modal,
      Card
    },
    data() {
      return {
        userRoles: null,
        showRolesForm: false
      }
    },
    async mounted() {
      if (!this.$store.getters['admin/users']) {
        await this.loadAllUsers()
      }
      this.loadUserRoles()
    },
    computed: {
      userDetails() {
        if (this.$store.getters['admin/users']) {
          return (this.$store.getters['admin/users']).find(user => user._id === this.userId)
        }
        return null
      },
      availableRoles() {
        if (!this.$store.getters['admin/roles']) {
          this.loadAndStoreAllRoles()
          return null
        }

        if (!this.userRoles) {
          return null
        }

        return this.$store.getters['admin/roles'].filter((role) => {
          return !this.userRoles.find((_role) => {
            return _role._id === role._id
          })
        })
      }
    },
    methods: {
      loadAllUsers() {
        loadAllUsers()
      },
      loadUserRoles() {
        return loadUserRoles(this.userId)
          .then(
            (roles) => {
              this.userRoles = roles
            })
          .catch(
            (error) => {
              this.$emit('error', error)
              // this.$toaster.addToast({
              //   type: 'error',
              //   title: 'Error',
              //   message: 'Could not load user roles',
              //   timeOut: 5000
              // })
            })
      },
      loadAndStoreAllRoles() {
        return loadAndStoreAllRoles()
      }
    }
  }
</script>
