import * as ClairNamedExports from './esm/namedExport'

const Clair = {
  ...ClairNamedExports,
  install: (Vue, option) => {
    Object.values(ClairNamedExports).forEach(componentAsPlugin => {
      if (typeof componentAsPlugin?.install === 'function') {
        Vue.use(componentAsPlugin, option)
      }
    })
  }
}

export default Clair
