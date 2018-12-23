import remote from '~/config/router'

const local = {
  home: {
    enabled: true,
    component: require('@/pages/User/Home/Home').default
  },
  account: {
    enabled: true,
    component: require('@/pages/User/Details').default
  }
}

export default {
  ...local,
  ...remote
}
