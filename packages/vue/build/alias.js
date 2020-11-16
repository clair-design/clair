const { resolve } = require('path')

exports.alias = {
  src: resolve(__dirname, '../src'),
  packages: resolve(__dirname, '../packages'),
  vue$: 'vue/dist/vue.esm.js'
}
