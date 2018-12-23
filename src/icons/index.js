let local = require.context('@/icons', true, /\.svg$/)

let icons = {}

/**
 * Load all the SVG files in the icons folder into an object, using the
 * stripped name of the file for the object key.
 *
 * Do not use spaces or dashes etc in file names.
 */
local.keys().forEach(function(key) {
  const name = /\.\/(\S+)\.svg/.exec(key)[1]
  icons = {
    ...icons,
    [name]: local(key).default
  }
})

/**
 * Load the _host_ applications icons from its icons folder.
 *
 * Then we merge whatever is found into our object, replacing any
 * default icons with an overriding icon.
 */
try {
  let remote = require.context('~/icons', true, /\.svg$/)
  remote.keys().forEach(function(key) {
    const name = /\.\/(\S+)\.svg/.exec(key)[1]
    console.log('Found custom icon', name)
    icons = {
      ...icons,
      [name]: remote(key).default
    }
  })
} catch (e) {
  console.warn('No local icons found')
}

export default icons
