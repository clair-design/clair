import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-alias'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import requireContext from 'rollup-plugin-require-context'
import buble from 'rollup-plugin-buble'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'

function cssNoop () {
  return {
    transform (code, id) {
      if (/\.css$/.test(id)) {
        return 'export default {}'
      }
    }
  }
}

export default [
  progress({
    clearLine: !process.env.IS_CI
  }),
  alias({}),
  cssNoop(),
  vue({ css: false }),
  buble({
    objectAssign: 'Object.assign'
  }),
  commonjs(),
  nodeResolve(),
  requireContext(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]
