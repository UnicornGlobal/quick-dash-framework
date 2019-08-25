export default [
  {
    name: 'Home',
    path: '',
    component: require('@/pages/User/Home/Home.vue').default,
    meta: {
      main: true,
      label: 'Home',
      icon: require('@/components/SideBar/icons/home.svg')
    }
  },
  {
    name: 'Account',
    path: '/account',
    component: require('@/pages/User/Details').default,
    meta: {
      main: true,
      label: 'Account',
      icon: require('@/components/SideBar/icons/PersonalAccount.svg')
    }
  }
]
