/**
 * Base framework level libraries are represented in `@/lib`
 *
 * Host application level libraries are represented in `~/lib`
 */
const local = require.context('@/lib', true, /\.js$/)

// TODO there's a much better way of doing this
let host = false
try {
  host = require.context('~/lib', true, /\.js$/)
} catch (e) {
  console.error('Application level `lib` folder is missing')
}

export default {
  load: () => {
    local.keys().forEach(function(key) {
      if (key === './index.js') {
        return
      }

      console.log('Loading framework level library config: ', key)
      local(key)
    })

    if (host) {
      console.log('Host application has custom `lib` folder')
      host.keys().forEach(function(key) {
        if (key === './index.js') {
          console.error('Do not place `index.js` files in your `/lib` directory')
          return
        }

        console.log('Loading application level library config: ', key)
        host(key)
      })
    }
  }
}
