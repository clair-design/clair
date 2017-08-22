/**
 * markdown document to nuxt.js vue page
 */
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const md2vue = require('md2vue')
const chokidar = require('chokidar')

const { log } = require('./util')
const OUTPUT_DIR = path.join(process.cwd(), '/document/pages/component')
const compileMd = file => compileWrite(file, OUTPUT_DIR)

/**
 * build once
 */
exports.build = () => glob
  .sync('./src/components/**/index.md')
  .forEach(compileMd)

/**
 * watch mode
 */
exports.watchBuild = () => chokidar
  .watch('./src/components/**/*.md', { persistent: true })
  .on('add', file => {
    log(`File ${file} added.`)
    compileMd(file)
  })
  .on('change', file => {
    log(`File ${file} has been changed.`)
    compileMd(file)
  })

/**
 * compile markdown documents to .vue code
 * and write it to output directory
 * @param {String} file       file path
 * @param {String} outputDir  output directory
 * @returns {Promise}
 */
function compileWrite (file, outputDir) {
  // src/components/button/index.md => button => button.vue
  const name = path.basename(path.dirname(file))
  const dest = path.join(outputDir, `${name}.vue`)

  return Promise
    .all([
      compile2vue(file),
      fs.ensureFile(dest)
    ])
    .then(([code]) => {
      fs.writeFile(dest, code)
    })
    .catch(log)
}

/**
 * compile markdown document to .vue code
 * @param {String} file  file path
 * @returns {String} .vue code
 */
function compile2vue (file) {
  const vueInjection = `
layout: 'component',
scrollToTop: true
`

  return fs.readFile(file)
    .then(bf => bf.toString())
    .then(raw => md2vue(raw, {
      vueInjection,
      toggleCode: true
    }))
}
