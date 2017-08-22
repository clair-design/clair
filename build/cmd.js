/* eslint-disable default-case */
/* eslint-disable no-magic-numbers */
const argv = [...process.argv.slice(2)]

if (argv.length === 0) {
  throw new Error('[ERROR] command name required')
}

const opn = require('opn')
const shell = require('shelljs')
const { log, toLog, setNodeEnv, camelCase } = require('./util')

const markdown = require('./markdown')
const rollup = require('./rollup')
const nuxtServe = require('./nuxt.server')
const BIN = require('path').join(__dirname, '../node_modules/.bin')
const PORT = 5432
const [ cmdName ] = argv

switch (cmdName) {
  case 'build':
    Promise
      .resolve(setNodeEnv('production'))
      .then(toLog('Start rollup bundling...'))
      .then(rollup.build)
      .then(toLog('Bundling done.'))
      .catch(log)
    break

  case 'dev':
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
            log('Serving with nuxt.js...')
            nuxtServe({ port: PORT })
            opn(`http://127.0.0.1:${PORT}`)
          }
        })
      })
      .catch(log)
    break

  case 'deploy':
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
  // case 'add':
  //   Promise
  //     .resolve(argv[1])
  //     .then(name => [camelCase(name), name])
  //     .then(([compName, dirName]) => {
  //       console.log(compName, dirName)
  //     })
  //   break
}

function execAsPromise (cmd) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, resolve)
  })
}
