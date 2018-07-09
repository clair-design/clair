/**
 * This file is a configuration for
 * libray bundling options with rollup
 */
const { resolve } = require('path')

const moduleName = 'Clair'
const input = resolve(__dirname, './src/entry.js')
const destFile = path => resolve(__dirname, './dist', path)

// TODO
// use postcss.config.js by default
const postCSSPlugins = [require('./postcss.config.js').plugins]

const options = [
  {
    input,
    postcss: {
      extract: destFile('clair.css'),
      minify: false,
      sourceMap: true,
      plugins: postCSSPlugins
    },
    uglify: false,
    output: [
      {
        format: 'cjs',
        file: destFile('clair.common.js')
      },
      {
        format: 'umd',
        name: moduleName,
        file: destFile('clair.js')
      }
    ]
  },
  {
    input,
    postcss: {
      extract: destFile('clair.min.css'),
      minify: true,
      sourceMap: true,
      plugins: postCSSPlugins
    },
    uglify: true,
    output: [
      {
        format: 'umd',
        name: moduleName,
        file: destFile('clair.min.js')
      }
    ]
  },
  {
    input,
    uglify: false,
    output: {
      format: 'es',
      file: destFile('clair.esm.js')
    },
    external (id) {
      return /^[a-z][\w]/.test(id) && !/\*/.test(id)
    }
  }
]

module.exports = { options }
