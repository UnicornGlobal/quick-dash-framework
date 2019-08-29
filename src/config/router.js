export default {
  home: {
    enabled: true,
    component: require('@/pages/User/Home/Home').default
  },
  account: {
    enabled: true,
    component: require('@/pages/User/EditDetails').default
  },
  admin: {
    enabled: false
  }
}
