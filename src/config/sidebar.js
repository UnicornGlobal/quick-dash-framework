import icons from '@/icons'

export default {
  enabled: true,
  open: true,
  position: 'left',
  logout: false,
  logo: () => {
    return icons.quick
  },
  account: true,
  highlight: true,
  highlightPosition: 'right',
  icons: true,
  customSideBarFooterComponent: {
    enabled: false,
    component: null
  },
  customSideBarHeaderComponent: {
    enabled: true,
    component: ''
  }
}
