exports.boilerpate = {
  // where to place generated components
  dir: 'src/components',

  // prefix of the tag of a component
  prefix: 'c'
}

exports.md2vue = {
  // markdown globs identifying those
  // documents to be transformed into `.vue` files
  globs: [
    './src/components/**/index.md',
    './docs/content/**/*.md'
  ],

  // where to write generated `.vue` files
  output: './docs/pages'
}

exports.rollup = {
  // module name
  name: 'Clair',

  // entry
  input: './src/js/main.js',

  // scripts output
  output: [
    {
      format: 'umd',
      file: './dist/clair.js'
    },
    {
      format: 'es',
      file: './dist/clair.esm.js'
    },
    {
      format: 'cjs',
      file: './dist/clair.common.js'
    }
  ],

  plugins: [
    installVueComps({
      entry: './src/js/main.js',
      vues: './src/components/**/index.vue'
    }),
    require('rollup-plugin-node-resolve')({
      jsnext: true,
      main: true
    }),
    require('rollup-plugin-vue')(),
    require('rollup-plugin-postcss')({
      plugins: [
        require('postcss-import')(),
        require('postcss-for')(),
        require('postcss-cssnext')({
          warnForDuplicates: false
        })
      ],
      extract: './dist/clair.css'
    }),
    require('rollup-plugin-buble')()
  ]
}

exports.nuxt = {
  generate: {
    dir: '.site',
    // avoid error with pre/code
    minify: false
  },
  srcDir: './docs',
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

function installVueComps ({ entry, vues }) {
  const path = require('path')
  const mainId = path.resolve(__dirname, entry)

  return { transform }

  function transform (source, id) {
    if (id !== mainId) return

    const components = require('glob')
      .sync(vues)
      .map(file => path.relative('./src/js', file))
      .map(file => {
        const [, name] = file.split(path.sep).reverse()
        return {
          path: file.replace(/\\/g, '/'),
          comp: pascalCase(name),
          name: name
        }
      })

    return `${source}
${components.map(({ path, comp }) => `import ${comp} from '${path}'`).join('\n')}

export default {
  install (Vue) {
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
