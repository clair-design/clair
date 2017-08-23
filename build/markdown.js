/**
 * markdown document to nuxt.js vue page
 */
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const md2vue = require('md2vue')
const chokidar = require('chokidar')
const yamlFront = require('yaml-front-matter')

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
    .then(([code]) => fs.writeFile(dest, code))
    .catch(log)
}

/**
 * compile markdown document to .vue code
 * @param {String} file  file path
 * @returns {String} .vue code
 */
function compile2vue (file) {
  const defaults = {
    title: 'Component',
    layout: 'component',
    scrollTop: true
  }

  return fs.readFile(file)
    .then(bf => bf.toString())
    .then(getFrontMatter)
    .then(({ source, config }) => {
      const {
        layout, scrollTop, title
      } = Object.assign({}, defaults, config)

      return md2vue(source, {
        toggleCode: true,
        vueInjection: `
layout: '${layout}',
scrollTop: ${scrollTop},
head(){
  return {
    title: '${title}'
  }
}
`
      })
    })
}

function getFrontMatter (source) {
  const result = yamlFront.loadFront(source, '__mdContent')
  const { __mdContent } = result
  delete result.__mdContent

  return {
    source: __mdContent,
    config: result
  }
}
