const child_process = require('child_process')

const consoleLog = function (...args) {
  /* eslint-disable no-console */
  console.log.apply(console, args)
}

/**
 * shorthand for `console.log`
 */
exports.log = consoleLog
exports.toLog = (...args) => consoleLog(...args)

exports.setNodeEnv = (s) => {
  process.env.NODE_ENV = s
}

exports.execSync = (cmd) => {
  child_process.execSync(cmd)
}
