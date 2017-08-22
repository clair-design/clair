const shell = require('shelljs')

const {
  log,
  toLog,
  setNodeEnv
} = require('./util')

const markdown = require('./markdown')
const rollup = require('./rollup')
const nuxtServe = require('./nuxt.server')

const BIN = require('path').join(__dirname, '../node_modules/.bin')
const argv = [...process.argv.slice(2)]

if (argv.length === 0) {
  throw new Error('[ERROR] command name required')
}

const [ cmdName ] = argv

/* eslint-disable default-case */
switch (cmdName) {
  case 'build':
    Promise
      .resolve(setNodeEnv('production'))
      .then(toLog('Start rollup bundling...'))
      .then(rollup.build)
      .then(toLog('Bundling done.'))
    break

  case 'dev':
    Promise
      .resolve(setNodeEnv('development'))
      .then(toLog('Watching markdown documents...'))
      .then(markdown.watchBuild)
      .then(toLog('Watching components and js files...'))
      .then(rollup.watchBuild)
      .then(watcher => {
        // bundling ended, then serve nuxt.js
        watcher.on('event', function listener ({ code }) {
          if (code === 'END') {
            watcher.removeListener('event', listener)
            log('Serving with nuxt.js...')
            nuxtServe()
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
      .then(() => {
        return execAsPromise(`${BIN}/nuxt generate -c ./build/nuxt.config.js`)
      })
      .then(() => {
        shell.exec('echo clair.wemlion.com > site/CNAME')
        return execAsPromise(`${BIN}/gh-pages -d site`)
      })
    break
}

function execAsPromise (cmd) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, resolve)
  })
}
