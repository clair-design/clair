const { resolve } = require('path')

// For why this file exists, see https://babeljs.io/docs/en/options#configfile
// and also checkbox the comment in .babelrc.js
module.exports = require('babel-jest').createTransformer({
  configFile: resolve(__dirname, '../.babelrc.js')
})
