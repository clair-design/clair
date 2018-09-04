import { resolve } from 'path'
import pkg from '../../package.json'
import plugins from './plugins'

const input = resolve(__dirname, '../../src/entry.js')
const dest = name => resolve(__dirname, '../../dist', name)

const external = function (id) {
  return id in pkg.dependencies || /^lodash/.test(id)
}

const banner = `/*!
 * Clair v${pkg.version}
 * (c) 2017-present clair-design@75team
 * Released under the MIT License.
 */
`

export default [
  {
    input,
    plugins,
    output: {
      name: 'Clair',
      file: dest('clair.js'),
      format: 'umd',
      banner
    }
  },
  {
    input,
    plugins,
    external,
    output: {
      name: 'Clair',
      file: dest('clair.cjs.js'),
      format: 'cjs',
      banner
    }
  },
  {
    input,
    plugins,
    external,
    output: {
      name: 'Clair',
      file: dest('clair.es.js'),
      format: 'es',
      banner
    }
  }
]
