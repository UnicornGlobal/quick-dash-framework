let result = {}

/**
 * Load all local config files
 */
let local = false

try {
  local = require.context('@/config', true, /\.js$/)
  local.keys().forEach(function(key) {
    const name = /\.\/(\S+)\.js/.exec(key)[1]

    /**
     * Do not load index.js
     */
    if (name === 'index') {
      return
    }

    console.log('Found base config for ', name)

    result = {
      ...result,
      [name]: local(key).default
    }
  })
} catch (e) {
  console.error('Something errored while loading the base configuration.')
}

/**
 * Load all _remote_ config files and overwrite any base ones.
 */
let remote = false

try {
  remote = require.context('~/config', true, /\.js$/)
  remote.keys().forEach(function(key) {
    const name = /\.\/(\S+)\.js/.exec(key)[1]

    /**
     * Do not load index.js
     */
    if (name === 'index') {
      return
    }

    console.log('Found host config for ', name)

    let config = remote(key).default

    // Do not replace the entire object, instead modify values based
    // on the config. If the key exists then override, otherwise append.
    if (result[name]) {
      config = {...result[name], ...config}
    }

    result = {
      ...result,
      [name]: config
    }
  })
} catch (e) {
  console.error('Something errored while loading the base configuration.')
}

export default result
