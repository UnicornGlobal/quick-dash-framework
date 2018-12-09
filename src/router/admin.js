import Settings from '@/assets/icons/settings'
import User from '@/assets/icons/user'

export default [
  {
    name: 'AdminAccount',
    path: 'admin',
    component: {template: '<router-view></router-view>'},
    meta: {
      main: true,
      label: 'Admin Account',
      icon: Settings
    },
    children: [
      {
        name: 'AllUsers',
        path: 'users',
        component: require('@/pages/Admin/Users/Index.vue').default,
        meta: {
          main: true,
          label: 'All Users',
          icon: User
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: {template: '<router-view></router-view>'},
        meta: {
          main: true,
          label: 'Settings',
          icon: Settings
        }
      }
    ]
  }
]
