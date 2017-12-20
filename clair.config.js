const fs = require('fs')
const path = require('path')
const glob = require('glob')

const vue = require('rollup-plugin-vue')
const json = require('rollup-plugin-json')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const isProd = process.env.NODE_ENV === 'production'

// `npm run new [component-name]`
exports.boilerplate = {
  // prefix of tag
  prefix: 'c',
  // dest
  dir: 'src/components',
  files: getBoilerplates('./boilerplate')
}

exports.rollup = {
  name: 'Clair',
  input: 'src/js/entry.js',
  output: getRollupOption(),
  plugins: [
    installVueComps({
      entry: 'src/js/entry.js',
      vues: 'src/components/**/!(_)*.vue'
    }),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    json(),
    vue(),
    getCSSPlugin(),
    buble()
  ]
}

/**
 * collect all components
 */
function installVueComps ({ entry, vues }) {
  const mainId = path.resolve(__dirname, entry)
  const transform = function (source, id) {
    if (id !== mainId) {
      return
    }

    const imports = []
    const components = []
    const entryDirectory = path.dirname(entry)

    for (let file of glob.sync(vues)) {
      const relative = path.relative(entryDirectory, file)
      const normalized = relative.replace(/\\/g, '/')
      const { name, dir } = path.parse(relative)
      const compName = pascalCase(name !== 'index' ? name : path.basename(dir))
      imports.push(`import ${compName} from "${normalized}"`)
      components.push(compName)
    }

    const code = (`${source}
      ${imports.join('\n')}
      const Clair = {
        install (Vue) {
          main.install(Vue);
          const comps = [${components.join(', ')}];
          comps.forEach(comp => comp.name && Vue.component(comp.name, comp));
        }
      };

      export default Clair;

      if (typeof window !== 'undefined' && window.Vue) {
        Vue.use(Clair);
      }`
    )

    return code
  }

  return { transform }
}

/**
 * foo-bar  => FooBar
 */
function pascalCase (name) {
  return name
    .replace(/-([0-9a-zA-Z])/g, (m, g1) => g1.toUpperCase())
    .replace(/^[a-z]/, m => m.toUpperCase())
}

/**
 * component 模板文件
 */
function getBoilerplates (dir) {
  const result = {}

  fs.readdirSync(dir).forEach(filename => {
    const file = path.join(dir, filename)

    if (fs.statSync(file).isFile()) {
      const content = fs.readFileSync(file, 'utf-8')

      result[filename] = function (data) {
        return content.replace(/\$\{(\w+)\}/g, (_, key) => data[key])
      }
    }
  })

  return result
}

function getRollupOption () {
  return [
    {
      format: 'es',
      file: 'docs/plugins/clair.js'
    },
    {
      format: 'es',
      file: 'dist/clair.esm.js'
    },
    {
      format: 'umd',
      file: 'dist/clair.js'
    },
    {
      format: 'cjs',
      file: 'dist/clair.common.js'
    }
  ]
}

function getCSSPlugin () {
  // ignore css when developing
  const cssNoop = {
    transform (code, id) {
      if (/\.css$/.test(id)) {
        return 'export default {}'
      }
    }
  }

  if (isProd) {
    return cssNoop
  }

  const postCSS = require('rollup-plugin-postcss')

  return postCSS({
    plugins: [
      require('postcss-import')(),
      require('postcss-for')(),
      require('postcss-each')(),
      require('postcss-cssnext')({
        warnForDuplicates: false
      })
    ],
    extract: 'dist/clair.css'
  })
}
