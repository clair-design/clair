/**
 * This file is a configuration for
 * libray bundling options with rollup
 */
const { resolve } = require('path')

const moduleName = 'Clair'
const toAbs = path => resolve(__dirname, path)
const destFile = filename => resolve(__dirname, './dist', filename)

const defaults = {
  input: toAbs('src/entry.js'),
  alias: {
    '@js': toAbs('src/scripts'),
    '@css': toAbs('src/styles'),
    '@component': toAbs('src/components')
  }
}

const options = [
  {
    postcss: {
      // postcss.config.js will be used by default
      // since emballer@2.0.0
      extract: destFile('clair.css'),
      minify: false,
      sourceMap: true
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
    postcss: {
      extract: destFile('clair.min.css'),
      minify: true,
      sourceMap: true
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
    uglify: false,
    // explicitly set `postcss` to false
    // to disable using postcss
    postcss: false,
    output: {
      format: 'es',
      file: destFile('clair.esm.js')
    },
    external (id) {
      return /^[a-z][\w]/.test(id) && !/\*/.test(id)
    }
  }
]

module.exports = {
  options: options.map(opt => Object.assign(opt, defaults))
}
