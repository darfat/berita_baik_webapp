'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:3000"',
  VERSION: '"/v1"',
  AUTH_GROUP: '"/auth"',
  SAMPLE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  APP_ID: '"BERITABAIK_WEBAPP_V01"'
})
