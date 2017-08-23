
exports.kebabCase = kebabCase
exports.pascalCase = pascalCase

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

/**
 * get available server port
 */
exports.findAvailablePort = findPort

function consoleLog (...args) {
  /* eslint-disable no-console */
  console.log.apply(console, args)
}

function kebabCase (name) {
  return name
    .replace(/^[A-Z]/, m => m.toLowerCase())
    .replace(
      /([0-9a-zA-Z])[\b\s]*([0-9A-Z])/g,
      (m, g1, g2) => `${g1}-${g2.toLowerCase()}`
    )
}

function pascalCase (name) {
  return kebabCase(name)
    .replace(/-([0-9a-zA-Z])/g, (m, g1) => g1.toUpperCase())
    .replace(/^[a-z]/, m => m.toUpperCase())
}

function findAPortNotInUse (ports) {
  return new Promise((resolve, reject) => {
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
}

function findPort (port) {
  /* eslint-disable no-magic-numbers */
  return findAPortNotInUse([port, port + 1, port + 2])
    .catch(e => findPort(port + 3))
}
