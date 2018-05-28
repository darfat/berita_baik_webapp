'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:3000"',
  VERSION: '"/v1"',
  AUTH_GROUP: '"/auth"',
  APP_ID: '"BERITABAIK_WEBAPP_V01"'
})
