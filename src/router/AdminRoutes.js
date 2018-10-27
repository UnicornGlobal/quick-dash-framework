export default [
  {
    name: 'AdminAccount',
    path: 'admin',
    component: {template: '<router-view></router-view>'},
    meta: {
      main: true,
      label: 'Admin Account',
      icon: require('@/components/SideBar/icons/Details.svg')
    },
    children: [
      {
        name: 'AllUsers',
        path: 'users',
        component: require('@/pages/Admin/Users/Index.vue').default,
        meta: {
          main: true,
          label: 'All Users',
          icon: require('@/components/SideBar/icons/Customers.svg')
        }
      },
      {
        name: 'Settings',
        path: 'settings',
        component: {template: '<router-view></router-view>'},
        meta: {
          main: true,
          label: 'Settings',
          icon: require('@/components/SideBar/icons/details_settings.svg')
        }
      }
    ]
  }
]
