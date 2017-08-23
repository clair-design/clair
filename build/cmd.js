/* eslint-disable default-case */
/* eslint-disable no-magic-numbers */
const argv = [...process.argv.slice(2)]

if (argv.length === 0) {
  throw new Error('[ERROR] command name required')
}

const path = require('path')
const opn = require('opn')
const shell = require('shelljs')
const {
  log,
  toLog,
  setNodeEnv,
  findAvailablePort,
  kebabCase,
  pascalCase
} = require('./util')

const markdown = require('./markdown')
const rollup = require('./rollup')
const nuxtServe = require('./nuxt.server')
const COMPONENT_DIR = path.join(__dirname, '../src/components')
const BIN = path.join(__dirname, '../node_modules/.bin')
const PORT = 3000
const [ cmdName, ...args ] = argv

const startDevServer = () => findAvailablePort(PORT)
  .then(toLog('Serving with nuxt.js...'))
  .then(port => {
    nuxtServe(port)
    opn(`http://127.0.0.1:${port}`)
  })

switch (cmdName) {
  case '--build':
    Promise
      .resolve(setNodeEnv('production'))
      .then(toLog('Start rollup bundling...'))
      .then(rollup.build)
      .then(toLog('Bundling done.'))
      .catch(log)
    break

  case '--dev':
    Promise
      .resolve(setNodeEnv('development'))
      .then(toLog('Watching markdown documents...'))
      .then(markdown.watchBuild)
      .then(toLog('Watching components and js files...'))
      .then(rollup.watchBuild)
      .then(watcher => {
        // serve nuxt.js after bundling done for the first time
        watcher.on('event', function listener ({ code }) {
          if (code === 'END') {
            watcher.removeListener('event', listener)
            startDevServer()
          }
        })
      })
      .catch(log)
    break

  case '--deploy':
    Promise
      .resolve(setNodeEnv('production'))
      .then(toLog('Building documentation...'))
      .then(markdown.build)
      .then(toLog('Rollup Bundling...'))
      .then(rollup.build)
      .then(toLog('Generate static files and deploy to gh-pages...'))
      .then(() => execAsPromise(`${BIN}/nuxt generate -c ./build/nuxt.config.js`))
      .then(() => execAsPromise('echo clair.wemlion.com > site/CNAME'))
      .then(() => execAsPromise(`${BIN}/gh-pages -d site`))
      .catch(log)
    break

  case '--clean':
    shell.rm('-rf', '.nuxt', 'site', 'dist')
    break
  case '--add':
    Promise
      .resolve(args.map(n => [kebabCase(n), pascalCase(n)]))
      .then(createBoilerplate)
    break
}

function execAsPromise (cmd) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, resolve)
  })
}

function createBoilerplate (arr) {
  arr.forEach(([dirName, compName]) => {
    const dir = path.join(COMPONENT_DIR, dirName)
    const file = path.join(dir, 'index')
    const tagName = `c-${dirName}`

    if (!shell.test('-d', dir)) {
      shell.mkdir('-p', dir)

      shell.ShellString(mdTemplate(tagName, compName)).to(`${file}.md`)
      shell.ShellString(jsTemplate(tagName, compName)).to(`${file}.js`)
      shell.ShellString(cssTemplate(tagName, compName)).to(`${file}.css`)
      shell.ShellString(vueTemplate(tagName, compName)).to(`${file}.vue`)
      log(`[DONE] ${dirName} created at ${dir}.`)
    } else {
      // eslint-disable no-console
      console.warn(`[Warning] Skipping component ${dirName}, it already exisits at ${dir}.`)
    }
  })
}

function mdTemplate (tagName, compName) {
  return `---
title: ${compName}
layout: 'component'
scrollTop: true
---

# ${compName}

## Demo

\`\`\`html
<${tagName}></${tagName}>
\`\`\`
`
}

function jsTemplate (tagName, compName) {
  return `import ${compName} from './index.vue'

${compName}.install = Vue => {
  Vue.component(${compName}.name, ${compName})
}

export default ${compName}
`
}

function cssTemplate (tagName, compName) {
  return `/**
 * ${tagName}
 */
`
}

function vueTemplate (tagName, compName) {
  return `<template lang="pug">
  .${tagName}
    | ${compName}
</template>

<script>

export default {
  name: '${tagName}',
  props: {},

  data () {
    return {}
  },

  methods: {}
}
</script>
`
}
