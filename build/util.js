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

const findAPortNotInUse = (ports) => new Promise((resolve, reject) => {
  require('portscanner').findAPortNotInUse(ports, '127.0.0.1', (err, port) => {
    if (err) {
      reject(err)
    } else if (port === false) {
      reject(new Error(`${ports} are all in use...`))
    } else {
      resolve(port)
    }
  })
})

/* eslint-disable no-magic-numbers */
const findPort = (port) => findAPortNotInUse(
  [port, port + 1, port + 2]
).catch(e => findPort(port + 3))

exports.findAvailablePort = findPort
