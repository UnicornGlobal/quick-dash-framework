import config from '@/config'
import icons from '@/icons'

const home = config.router.home.enabled ? [{
  name: 'Home',
  path: '/',
  component: config.router.home.component,
  meta: {
    main: true,
    label: 'Home',
    icon: icons.home
  }
}] : []

const account = config.router.account.enabled ? [{
  name: 'Account',
  path: '/account',
  component: config.router.account.component,
  meta: {
    main: true,
    label: 'Account',
    icon: icons.user
  }
}] : []

export default [
  ...home,
  ...account
]
