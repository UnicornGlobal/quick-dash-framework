'use strict'
const merge = require('webpack-merge')
const secrets = require('./secrets.env.js')

module.exports = merge(secrets, {
  NODE_ENV: '"production"'
})
