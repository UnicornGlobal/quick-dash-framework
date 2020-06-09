export default {
  name: 'QuickDash',
  customHeader: null,
  customFooter: null,
  remember: false,
  logo: false,
  showSignup: true,
  signupUrl: '/signup',
  emojiLogo: () => {
    return '⚡️'
  },
  background: require('~/assets/images/login.jpg').default
}
