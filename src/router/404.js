export default {
  name: 'FourOhFour',
  path: '*',
  component: {
    template: '',
    created: () => {
      // This file should exist in the host project
      window.location.href = '/404.html'
    }
  }
}
