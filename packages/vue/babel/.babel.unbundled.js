const baseConfig = require('../.babelrc.js')
const { resolve } = require('path')
const { cloneDeep } = require('lodash')

// Use cloneDeep to avoid potential override to the original configuration
const clonedConfig = cloneDeep(baseConfig)
clonedConfig.plugins.push([
  'module-resolver',
  {
    root: [resolve(__dirname, '..')],
    alias: {
      packages: './packages',
      src: './src'
    }
  }
])

module.exports = clonedConfig
