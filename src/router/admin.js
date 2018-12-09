export default [
  {
    name: 'AdminAccount',
    path: 'admin',
    component: {template: '<router-view></router-view>'},
    meta: {
      main: true,
      label: 'Admin Account',
      icon: require('@/assets/icons/info.svg').default
    },
    children: [
      {
        name: 'AllUsers',
        path: 'users',
        component: require('@/pages/Admin/Users/Index.vue').default,
        meta: {
          main: true,
          label: 'All Users',
          icon: require('@/assets/icons/users.svg').default
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: {template: '<router-view></router-view>'},
        meta: {
          main: true,
          label: 'Settings',
          icon: require('@/assets/icons/settings.svg').default
        }
      }
    ]
  }
]
