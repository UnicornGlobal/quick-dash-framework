import config from '@/config'
import icons from '@/icons'

const users = config.admin.users ? [
  {
    name: 'AllUsers2',
    path: 'users2',
    component: require('@/pages/Admin/Users/Index.vue').default,
    meta: {
      main: true,
      label: 'All Users2',
      icon: icons.users
    }
  }
] : []

const settings = config.admin.settings.enabled ? [
  {
    name: 'Settings2',
    path: 'settings2',
    component: config.admin.settings.component,
    meta: {
      main: true,
      label: 'Settings2',
      icon: icons.settings
    }
  }
] : []

export default config.admin.enabled ? [
  {
    name: 'AdminAccount2',
    path: 'admin2',
    component: {template: '<router-view></router-view>'},
    meta: {
      main: true,
      label: 'Admin Account2',
      icon: icons.admin
    },
    children: [
      ...users,
      ...settings
    ]
  }
] : []
