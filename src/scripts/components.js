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
      module.name && Vue.component(module.name, module)
    }
  }
}

// function importAll (r) {
//   return reqs.keys().map(key => {
//     return getModule(reqs(key))
//   })
// }

function getModule (module) {
  return (module.__esModule && module.default) || module
}
