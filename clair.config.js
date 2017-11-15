const boilerplates = readDirFiles('./boilerplate/')
Object.keys(boilerplates).forEach(key => {
  const val = boilerplates[key]
  boilerplates[key] = o => val.replace(/\$\{(\w+)\}/g, (_, g1) => o[g1])
})

module.exports = {
  boilerplate: {
    // where to place generated components
    dir: 'src/components',
    files: boilerplates,
    // prefix of the tag of a component
    prefix: 'c'
  },

  md2vue: {
    // globs identifying those `.md` files
    // to be transformed into `.vue`
    globs: [
      'src/components/**/index.md',
      'docs/content/**/*.md'
    ],
    // where to write `.vue`
    output: 'docs/pages',
    vueTools (name, uid) {
      return `<input id="${uid}" type="checkbox" /><label for="${uid}"></label>`
    }
  },

  rollup: {
    name: 'Clair',
    input: 'src/js/entry.js',
    output: [
      {
        format: 'umd',
        file: 'dist/clair.js'
      },
      {
        format: 'es',
        file: 'dist/clair.esm.js'
      },
      {
        format: 'cjs',
        file: 'dist/clair.common.js'
      }
    ],

    plugins: [
      installVueComps({
        entry: 'src/js/entry.js',
        vues: 'src/components/**/!(_)*.vue'
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
        main: true
      }),
      require('rollup-plugin-commonjs')(),
      require('rollup-plugin-vue')(),
      require('rollup-plugin-postcss')({
        plugins: [
          require('postcss-import')(),
          require('postcss-for')(),
          require('postcss-each')(),
          require('postcss-cssnext')({
            warnForDuplicates: false
          })
        ],
        extract: 'dist/clair.css'
      }),
      require('rollup-plugin-buble')()
    ]
  },

  nuxt: {
    srcDir: 'docs',
    generate: {
      dir: '.site',
      // avoid error with pre/code
      minify: false
    },
    loading: {
      color: '#56bf8b',
      duration: 3000
    },
    router: {
      linkExactActiveClass: 'is-active'
    },
    head: {
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Clair Design，一套包含设计规范、Vue 组件和配套资源的设计系统。'
        }
      ],
      link: [
        {
          href: 'https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css',
          rel: 'stylesheet'
        }
      ]
    },
    plugins: [
      '~plugins/clair.js',
      '~plugins/style.js'
    ],
    modules: ['@nuxtjs/workbox'],
    build: {
      extractCSS: true,
      publicPath: '/static/',
      postcss: [
        require('postcss-import')(),
        require('postcss-for')(),
        require('postcss-cssnext')({
          warnForDuplicates: false
        })
      ]
    }
  }
}

function installVueComps ({ entry, vues }) {
  const path = require('path')
  const mainId = path.resolve(__dirname, entry)

  return { transform }

  function transform (source, id) {
    if (id !== mainId) return

    const components = require('glob')
      .sync(vues)
      .map(file => path.relative('src/js', file))
      .map(file => {
        const { name, dir } = path.parse(file)
        const componentName = name === 'index' ? path.basename(dir) : name
        return {
          path: file.replace(/\\/g, '/'),
          comp: pascalCase(componentName),
          name: componentName
        }
      })

    return `${source}
${components.map(({ path, comp }) => `import ${comp} from '${path}'`).join('\n')}

export default {
  install (Vue) {
    main.install(Vue)
    const comps = [${components.map(c => c.comp).join(', ')}]
    comps.forEach(comp => comp.name && Vue.component(comp.name, comp))
  }
}
`
  }

  function pascalCase (name) {
    return name
      .replace(/-([0-9a-zA-Z])/g, (m, g1) => g1.toUpperCase())
      .replace(/^[a-z]/, m => m.toUpperCase())
  }
}

/* eslint-disable no-param-reassign */
function readDirFiles (dir, encoding, recursive) {
  const fs = require('fs')
  const path = require('path')

  const result = {}

  if (typeof encoding === 'boolean') {
    recursive = encoding
    encoding = null
  }
  typeof recursive === 'undefined' && (recursive = true)
  typeof encoding === 'string' || (encoding = null)

  const entries = fs.readdirSync(dir)

  entries.forEach(function (entry) {
    const entryPath = path.join(dir, entry)
    if (fs.statSync(entryPath).isDirectory()) {
      return recursive && (result[entry] = readDirFiles(entryPath, encoding))
    }

    result[entry] = fs.readFileSync(entryPath, encoding).toString()
  })
  return result
}
