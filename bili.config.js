const pkg = require('./package.json')
// SEE https://bili.egoist.moe/#/api
module.exports = {
  input: 'src/entry.js',
  outDir: 'dist',
  moduleName: 'Clair',
  filename: '[name][suffix].js',
  format: ['cjs', 'es', 'umd', 'umd-min'],
  target: 'browser',

  alias: {},
  // Options for rollup-plugin-postcss
  // it will also automatically load local PostCSS config file.
  postcss: {
    extract: true
  },
  js: 'babel',
  jsx: 'vue',
  plugin: ['require-context', 'vue'],
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  banner: {
    version: pkg.version,
    name: 'Clair',
    year: 2017,
    author: 'clair-design@75team',
    license: 'MIT'
  },
  virtualModules: {},
  sizeLimit: {}
}
