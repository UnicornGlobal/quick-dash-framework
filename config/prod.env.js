'use strict'
const merge = require('webpack-merge')
const secrets = require('./secrets.env')

module.exports = merge(secrets, {
  NODE_ENV: '"production"'
})
