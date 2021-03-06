<template>
  <page-container>
    <page-section>
      <data-table v-if="users" :dataset="users" :options="tableConfig" class="data-table"></data-table>
      <loader v-else width="80" height="80"></loader>
    </page-section>
  </page-container>
</template>

<script>
  import PageContainer from '@/components/Containers/PageContainer'
  import PageSection from '@/components/Containers/PageSection'
  import DataTable from '@unicorns/data-table'
  import { loadAllUsers } from '@/api/admin/users'

  export default {
    components: {
      DataTable,
      PageContainer,
      PageSection
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
                  field: 'confirmed',
                  text: 'Include Not Confirmed',
                  enabled: true,
                  value: true
                }
              ]
            },
            headers: {
              enabled: true,
              gap: true
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
              name: 'Confirmed',
              field: 'confirmed',
              header: true,
              secondary: true,
              grow: 0
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
        const users = this.$store.getters['admin/users']
        if (users) {
          var ret = users.map(user => ({
            id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.mobile,
            confirmed: user.confirmed
          }))
          return ret
        }
      }
    }
  }
</script>
