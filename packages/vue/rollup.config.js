import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
const { alias: aliases } = require('./build/alias')

// @ts-ignore
import pkg from './package.json'

// shared config
const banner = `
/*! @clair-design */
/* eslint-disable */
`
const globals = {
  vue: 'Vue'
}
const deps = Object.keys(pkg.dependencies)
// for module id like `module-name/path/to/file`
// need to use function to detect
const external = id =>
  [...new Set(['vue', ...deps])].some(dep => id.startsWith(dep))

// plugins setup
const aliasOptions = {
  // SEE https://github.com/rollup/rollup-plugin-alias/issues/26
  resolve: ['.js', '.json', '.vue', '/index.js', '/index.vue', '/index.jsx'],
  entries: Object.entries(aliases).map(([shorthand, fullPath]) => {
    return {
      find: shorthand,
      replacement: fullPath
    }
  })
}
const pathAlias = alias(aliasOptions)

// set babel config for different type of bundle
class Babel {
  constructor(config) {
    this.setConfig(config)
  }

  setConfig(config) {
    if (typeof config === 'function') {
      this.config = config(this.config)
    } else {
      this.config = config
    }
  }

  get value() {
    return babel(this.config)
  }
}
class PluginsProvider {
  get plugins() {
    return [this.path, this.babel, this.resolve, this.commonjs]
  }

  constructor(babelInstance = commonBabel) {
    this.setBabel(babelInstance)
    this.path = pathAlias
    this.resolve = resolve({ extensions: ['.mjs', '.js', '.jsx', '.json'] })
    this.commonjs = commonjs()
  }

  setBabel(babelInstance) {
    this.babel =
      babelInstance instanceof Babel ? babelInstance.value : babelInstance
  }
}
const commonBabel = new Babel({
  exclude: [/node_modules/],
  babelHelpers: 'runtime',
  skipPreflightCheck: true
})
const esmBabel = new Babel({
  ...commonBabel.config,
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true
      }
    ]
  ]
})
const modernBabel = new Babel({
  ...esmBabel.config,
  babelrc: false,
  presets: [
    ['@vue/babel-preset-jsx'],
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false,
        targets: {
          esmodules: true
        }
      }
    ]
  ]
})
const commonPluginsProvider = new PluginsProvider(commonBabel)
const modernPluginsProvider = new PluginsProvider(modernBabel)
const { plugins } = commonPluginsProvider
const { plugins: modernPlugins } = modernPluginsProvider
export default [
  {
    input: 'src/main.js',
    output: {
      name: 'ClairDesignVue',
      file: pkg.unpkg,
      format: 'umd',
      banner,
      globals
    },

    plugins,
    external: ['vue']
  },
  {
    input: 'src/main.js',
    output: { file: pkg.main, format: 'cjs', banner, globals, exports: 'auto' },
    plugins,
    external
  },
  {
    input: 'src/esm/index.js',
    output: {
      file: 'dist/index.modern.mjs',
      format: 'es',
      banner
    },
    plugins: modernPlugins,
    external
  }
]
