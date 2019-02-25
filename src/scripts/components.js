import { pascalCase } from './utils/index'
// NOTE
// `require.context` must be treated as a whole. by
// NO means you should split them up, as is required
// by the rollup plugin, rollup-plugin-require-context
// SEE https://github.com/elcarim5efil/rollup-plugin-require-context
const reqs = require.context('../components', true, /\/[^_]+\.vue$/)

export default {
  install (Vue) {
    const keys = reqs.keys()
    for (let i = 0; i < keys.length; i++) {
      const module = getModule(reqs(keys[i]))
      if (typeof module.install === 'function') {
        Vue.use(module)
      } else if (module && module.name) {
        // turn components' names to Pascal Case
        // so that we can use markups like `<CSelect />`
        // which would meet the needs of those PascalCase fans
        // TODO
        // we will turn all `name` fields in SFC into pacal case in the future
        Vue.component(pascalCase(module.name), module)
      }
    }
  }
}

function getModule (module) {
  return (module.__esModule && module.default) || module
}
