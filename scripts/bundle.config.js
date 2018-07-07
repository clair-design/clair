const { join, resolve } = require('path')

const moduleName = 'Clair'
const input = resolve(__dirname, '../src/js/main.js')
const dest = resolve(__dirname, '../dist/')
const destFile = filename => join(dest, filename)

const CSSPlugins = require('../postcss.config.js').plugins
const plugins = Object.keys(CSSPlugins).map(key => {
  return { [key]: CSSPlugins[key] }
})

module.exports = [
  {
    input,
    output: {
      format: 'umd',
      name: moduleName,
      sourcemap: true,
      file: destFile('clair.js')
    },
    uglify: false,
    postcss: {
      extract: destFile('clair.css'),
      minify: false,
      sourcemap: true,
      plugins
    }
  },

  {
    input,
    output: {
      format: 'umd',
      name: moduleName,
      sourcemap: true,
      file: destFile('clair.min.js')
    },
    uglify: true,
    postcss: {
      extract: destFile('clair.min.css'),
      minify: true,
      sourcemap: true,
      plugins
    }
  },

  // ES module
  {
    input,
    output: {
      format: 'es',
      file: destFile('clair.esm.js')
    },
    uglify: false,
    postcss: null,
    external (id) {
      // ignore depencencies unless importing with glob pattern
      return /^[a-z][\w]/.test(id) && !/\*/.test(id)
    }
  }
]
