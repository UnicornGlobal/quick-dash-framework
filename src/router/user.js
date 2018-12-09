import Home from '@/assets/icons/home'
import User from '@/assets/icons/user'

export default [
  {
    name: 'Home',
    path: '',
    component: require('@/pages/User/Home/Home.vue').default,
    meta: {
      main: true,
      label: 'Home',
      icon: Home
    }
  },
  {
    name: 'Account',
    path: '/account',
    component: require('@/pages/User/Details.vue').default,
    meta: {
      main: true,
      label: 'Account',
      icon: User
    }
  }
]
