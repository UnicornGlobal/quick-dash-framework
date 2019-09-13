'use strict'
const merge = require('webpack-merge')
const secrets = require('./secrets.env.js.example')

module.exports = merge(secrets, {
  NODE_ENV: '"production"'
})
