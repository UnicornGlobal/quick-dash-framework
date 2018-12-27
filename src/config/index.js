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

    const config = remote(key).default

    result = {
      ...result,
      [name]: config
    }
  })
} catch (e) {
  console.error('Something errored while loading the base configuration.')
}

export default result
