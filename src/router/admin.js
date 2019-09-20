import config from '@/config'
import icons from '@/icons'

// Load up any custom admin routes
let customAdminRoutes = []
try {
  customAdminRoutes = require('~/router/admin').default
  console.log(customAdminRoutes)
} catch {
  // No custom admin routes exist
}

const users = config.admin.users ? [
  {
    name: 'AllUsers',
    path: 'users',
    component: require('@/pages/Admin/Users/Index.vue').default,
    meta: {
      main: true,
      label: 'All Users',
      icon: icons.users
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

const adminRoutes = config.admin.enabled ? [
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
      ...customAdminRoutes || [],
      ...users,
      ...settings
    ]
  }
] : []

export default adminRoutes
