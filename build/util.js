const consoleLog = function (...args) {
  /* eslint-disable no-console */
  console.log.apply(console, args)
}

/**
 * shorthand for `console.log`
 */
exports.log = consoleLog

/**
 * generate console.log callback function
 */
exports.toLog = (...args) => consoleLog(...args)

/**
 * set process.env.NODE_ENV
 */
exports.setNodeEnv = (s) => {
  process.env.NODE_ENV = s
}

exports.camelCase = s => s.replace(
  /[-_]{1}([a-zA-Z\d])/g,
  (m, g) => g.toUpperCase()
)
