const req = require.context('.', true, /\.js$/)

export default {
  load: () => {
    req.keys().forEach(function(key) {
      if (key === './index.js') {
        return
      }
      console.log('loading', key)
      req(key)
    })
  }
}
