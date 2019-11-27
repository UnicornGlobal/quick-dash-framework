import icons from '@/icons'

export default {
  enabled: true,
  open: true,
  position: 'left',
  logout: false,
  logo: () => {
    return icons.quick
  },
  profile: true,
  account: true,
  highlight: true,
  icons: true,
  customSideBarComponent: {
    enabled: false,
    component: null
  }
}
