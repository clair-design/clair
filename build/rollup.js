/* eslint-disable no-console */
const rollup = require('rollup')
const chokidar = require('chokidar')
const postcss = require('rollup-plugin-postcss')
const rollupVue = require('rollup-plugin-vue')
const resolve = require('rollup-plugin-node-resolve')
const cssnext = require('postcss-cssnext')
const cssimport = require('postcss-import')
const postcssfor = require('postcss-for')
const { log } = require('./util')

const moduleName = 'Clair'
const entry = 'src/js/main.js'
const buildTargets = [
  { dest: `dist/clair.js`, format: 'umd' },
  { dest: `dist/clair.common.js`, format: 'cjs' },
  { dest: `dist/clair.esm.js`, format: 'es' },
  { dest: `document/assets/clair.js`, format: 'es' }
]
const getPlugins = () => {
  const isProd = process.env.NODE_ENV === 'production'
  return [
    resolve({
      jsnext: true,
      main: true
    }),
    rollupVue(),
    postcss({
      plugins: [
        cssimport(),
        postcssfor(),
        cssnext({ warnForDuplicates: false })
      ],
      extract: `${isProd ? 'dist/' : 'document/assets/'}/clair.css`
    })
  ]
}

exports.build = () => rollup.rollup({
  entry,
  plugins: getPlugins()
}).then(bundle => Promise.all(
  buildTargets
    .map(({ dest, format }) => bundle.write({
      moduleName,
      dest,
      format
    }))
)).catch(log)

exports.watchBuild = () => {
  const option = {
    entry,
    moduleName,
    plugins: getPlugins(),
    dest: 'document/assets/clair.js',
    format: 'es',
    watch: {
      chokidar
    }
  }

  const watcher = rollup.watch(option)
  // https://rollupjs.org/#rollup-watch
  return watcher
}
