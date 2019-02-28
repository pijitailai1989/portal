'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://backend.spiderparcel.com"'
  BASE_API: '"http://10.2.8.184:8006"'
})
