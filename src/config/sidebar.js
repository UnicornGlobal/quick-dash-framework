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
  customSideBarFooterComponent: {
    enabled: false,
    component: null
  }
}
