const { join, resolve } = require('path')
const {
  statSync,
  existsSync,
  readdirSync,
  readFileSync,
  writeFile,
  ensureFile
} = require('fs-extra')

const argvs = process.argv.slice(2)
const component = argvs[0]

// `node thisfile [component-name]`
generateComponent({
  prefix: 'c',
  name: component,
  dir: resolve(__dirname, '../src/components'),
  files: getTemplates(resolve(__dirname, './template'))
})

/**
 * generateComponent from boilerplates
 */
function generateComponent ({ name, dir, prefix, files }) {
  // eg: ButtonGroup => button-group
  const route = kebabCase(name)
  // eg: button-group => ButtonGroup
  const component = pascalCase(name)
  // c-button-group
  const tagName = (prefix ? prefix + '-' : '') + route

  const dest = join(dir, route)

  if (existsSync(dest)) {
    console.warn(
      `Skipping component ${component}` +
      `, it already exisits at ${dest}.`
    )
    return
  }

  const data = {
    route,
    tagName,
    componentName: component
  }

  const promises = files.map(({ filename, render }) => {
    const content = render(data)
    const file = join(dest, filename)
    return ensureFile(file).then(() => writeFile(file, content))
  })

  Promise.all(promises)
    .then(() => {
      console.info(`Component ${component} is created at ${dest}.`)
      process.exit()
    })
}

function getTemplates (dir) {
  const result = []

  readdirSync(dir).forEach(filename => {
    const file = join(dir, filename)

    if (statSync(file).isFile()) {
      const content = readFileSync(file, 'utf-8')

      result.push({
        filename,
        render (data) {
          return content
            .replace(/\$\{(\w+)\}/g, (_, key) => data[key])
        }
      })
    }
  })
  return result
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
