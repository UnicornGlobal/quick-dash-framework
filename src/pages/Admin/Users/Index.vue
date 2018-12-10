<template>
  <page-container class="page-container" title="All Users">
    <card class="card">
      <h5>Placeholder</h5>
      <data-table v-if="users" :dataset="users" :options="tableConfig"></data-table>
      <loader v-else class="loader" width="80" height="80"></loader>
    </card>
  </page-container>
</template>
<script>
  import PageContainer from '@/components/Containers/PageContainer'
  import Card from '@/components/Cards/Card'
  import DataTable from 'unicorn-vue-datatable'
  import { loadAllUsers } from '@/api/admin/users'

  export default {
    components: {
      Card,
      DataTable,
      PageContainer
    },
    data() {
      return {
        tableConfig: {
          config: {
            actionComponent: {
              enabled: false
            },
            search: {
              enabled: true,
              field: 'first_name',
              term: null,
              placeholder: 'Search User'
            },
            sorting: {
              enabled: true,
              field: 'first_name',
              ascending: true
            },
            filtering: {
              enabled: true,
              filters: [
                {
                  type: 'checkbox',
                  field: 'is_verified',
                  text: 'Include Not Verified',
                  enabled: true
                },
                {
                  type: 'checkbox',
                  field: 'confirmed',
                  text: 'Include Not Confirmed',
                  enabled: true
                }
              ]
            },
            linking: {
              enabled: true,
              route: {
                name: 'UserDetails'
              },
              field: 'id',
              param: 'userId'
            }
          },
          fields: [
            {
              type: 'text',
              name: 'First Name',
              field: 'first_name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'text',
              name: 'Last Name',
              field: 'last_name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'text',
              name: 'Email',
              field: 'email',
              header: true,
              grow: 3
            },
            {
              type: 'text',
              name: 'Phone',
              field: 'phone',
              header: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Verified',
              field: 'is_verified',
              header: true,
              secondary: true,
              grow: 1
            },
            {
              type: 'boolean',
              name: 'Confirmed',
              field: 'confirmed',
              header: true,
              secondary: true,
              grow: 1
            }
          ]
        }
      }
    },
    async mounted() {
      await this.loadUsers()
    },
    methods: {
      loadUsers() {
        return loadAllUsers()
      }
    },
    computed: {
      users() {
        return this.$store.state.users
      }
    }
  }
</script>

<style lang="scss">
  .page-container {
    background-color: $light-bg;
    padding: 20px;
  }
  .card{
    display: flex;
    flex-direction: column;
    .loader{
      align-self: center;
    }
  }
</style>
