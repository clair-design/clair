/* eslint-disable no-console */
const rollup = require('rollup')
const chokidar = require('chokidar')
const postcss = require('rollup-plugin-postcss')
const rollupVue = require('rollup-plugin-vue')
const resolve = require('rollup-plugin-node-resolve')
const cssnext = require('postcss-cssnext')
const cssimport = require('postcss-import')
const postcssfor = require('postcss-for')

const plugins = [
  resolve({
    jsnext: true,
    main: true
  }),
  rollupVue(),
  postcss({
    plugins: [
      cssimport(),
      postcssfor(),
      cssnext()
    ],
    extract: './clair.bundle.css'
    // extract: 'document/assets/clair.bundle.css'
  })
]

const watcher = rollup.watch({
  entry: 'src/js/main.js',
  // dest: 'document/assets/clair.bundle.js',
  dest: './clair.bundle.js',
  format: 'es',
  moduleName: 'Clair',
  plugins,
  watch: { chokidar }
})

watcher.on('event', (e) => {
  console.log(e)
  // TODO
  // e.code === 'END'
})

/*
// see https://github.com/rollup/rollup/blob/master/test/watch/index.js
sequence(watcher, [
  'START',
  'BUNDLE_START',
  'BUNDLE_END',
  'END',
  (res) => {
    console.log(res)
  }
])

function sequence (wtcher, events) {
  return new Promise((resolve, reject) => {
    function go (event) {
      console.log(event)
      const next = events.shift()

      if (!next) {
        resolve()
      } else if (typeof next === 'string') {
        watcher.once('event', event => {
          if (event.code !== next) {
            reject(new Error(`Expected ${next} event, got ${event.code}`))
          } else {
            go(event)
          }
        })
      } else {
        Promise.resolve()
          // eslint-disable-next-line no-magic-numbers
          .then(() => wait(100))
          .then(() => next(event))
          .then(go)
          .catch(reject)
      }
    }
    go()
  })
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
*/
