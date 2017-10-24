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
const OUTPUT_DIR = path.join(process.cwd(), '/document/pages/')
const MARKDOWN_GLOBS = [
  'src/components/**/index.md',
  'document/content/**/*.md'
]

/**
 * build once
 */
exports.build = () => MARKDOWN_GLOBS
  .reduce((acc, pattern) => acc.concat(glob.sync(pattern)), [])
  .forEach(compile2vue)

/**
 * watch mode
 */
exports.watchBuild = () => chokidar
  .watch(MARKDOWN_GLOBS, { persistent: true })
  .on('add', file => {
    log(`File ${file} added.`)
    compile2vue(file)
  })
  .on('change', file => {
    log(`File ${file} has been changed.`)
    compile2vue(file)
  })

/**
 * compile markdown document to .vue code
 * @param {String} file  file path
 * @returns {String} .vue code
 */
function compile2vue (file) {
  // src/components/button/index.md => button => button.vue
  const name = path.basename(path.dirname(file))
  const defaults = {
    title: 'Component',
    layout: 'component',
    scrollTop: true,
    route: `component/${name}`
  }

  return fs.readFile(file)
    .then(bf => bf.toString())
    .then(getFrontMatter)
    .then(({ source, config }) => {
      const {
        layout, scrollTop, title, route
      } = Object.assign({}, defaults, config)

      const dest = path.join(OUTPUT_DIR, `${route}.vue`)
      const vueInjection = `
layout: '${layout}',
scrollTop: ${scrollTop},
head () {
  return { title: '${title}' }
}
`
      return Promise
        .all([
          md2vue(source, { toggleCode: true, vueInjection }),
          fs.ensureFile(dest)
        ])
        .then(([code]) => fs.writeFile(dest, code))
        .catch(log)
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
