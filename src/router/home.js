import config from '@/config'
import icons from '@/icons'
import strings from '@/i18n/en/sidebar'

const home = config.router.home.enabled ? [{
  name: 'Home',
  path: '/',
  component: config.router.home.component,
  meta: {
    main: true,
    label: strings.home,
    icon: icons.home
  }
}] : []

export default [
  ...home
]
