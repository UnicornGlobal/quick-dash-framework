import Home from '@/assets/icons/home'
import User from '@/assets/icons/user'
import config from '@/config'

console.log(config)
const home = config.router.home.enabled ? [{
  name: 'Home',
  path: '',
  component: config.router.home.component,
  meta: {
    main: true,
    label: 'Home',
    icon: Home
  }
}] : []

const account = config.router.account.enabled ? [{
  name: 'Account',
  path: '/account',
  component: config.router.account.component,
  meta: {
    main: true,
    label: 'Account',
    icon: User
  }
}] : []

export default [
  ...home,
  ...account
]
