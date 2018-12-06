export default [
  {
    name: 'Home',
    path: '',
    component: require('@/pages/User/Home/Home.vue').default,
    meta: {
      main: true,
      label: 'Home',
      icon: require('@/components/SideBar/icons/home.svg').default
    }
  },
  {
    name: 'Account',
    path: '/account',
    component: require('@/pages/User/Details.vue').default,
    meta: {
      main: true,
      label: 'Account',
      icon: require('@/components/SideBar/icons/PersonalAccount.svg').default
    }
  }
]
