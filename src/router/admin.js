import config from '@/config'
import icons from '@/icons'

const users = config.admin.users ? [
  {
    name: 'AllUsers',
    path: 'users',
    component: require('@/pages/Admin/Users/Index.vue').default,
    meta: {
      main: true,
      label: 'All Users',
      icon: icons.user
    }
  },
  {
    name: 'UserDetails',
    path: 'users/:userId',
    component: require('@/pages/Admin/Users/UserDetails.vue').default,
    props: true
  }
] : []

const settings = config.admin.settings.enabled ? [
  {
    name: 'Settings',
    path: 'settings',
    component: config.admin.settings.component,
    meta: {
      main: true,
      label: 'Settings',
      icon: icons.settings
    }
  }
] : []

export default config.admin.enabled ? [
  {
    name: 'AdminAccount',
    path: 'admin',
    component: {template: '<router-view></router-view>'},
    meta: {
      main: true,
      label: 'Admin Account',
      icon: icons.admin
    },
    children: [
      ...users,
      ...settings
    ]
  }
] : []
