import { resolve } from 'path'
import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-alias'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import requireContext from 'rollup-plugin-require-context'
import buble from 'rollup-plugin-buble'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'
import pkg from '../../package.json'

function cssNoop () {
  return {
    transform (code, id) {
      if (/\.css$/.test(id)) {
        return 'export default {}'
      }
    }
  }
}

const rootDir = resolve(__dirname, '../..')

const resolveAlias = pkg.resolveAlias || {}
Object.keys(resolveAlias).forEach(key => {
  resolveAlias[key] = resolve(rootDir, resolveAlias[key])
})

export default [
  process.env.IS_CI ? {} : progress(),
  alias({
    resolve: ['.js', '.vue', '.json'],
    ...resolveAlias
  }),
  cssNoop(),
  vue({ css: false }),
  buble({
    objectAssign: 'Object.assign'
  }),
  commonjs(),
  nodeResolve({
    module: true,
    jsnext: true,
    main: true,
    extensions: ['.js', '.vue', '.json']
  }),
  requireContext(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]
