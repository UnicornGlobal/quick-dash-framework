import remote from '~/config/admin'

const local = {
  enabled: true,
  users: {
    manage: true
  },
  settings: {
    enabled: true,
    component: require('@/pages/User/Details').default
  }
}

export default {
  ...local,
  ...remote
}
