import { isEqual } from 'lodash-es'

export const VERTICAL_MENU_PADDING_LEFT = 24
export const HORIZONTAL_MENU_PADDING_LEFT = 20
export const SUBMENU_OPEN_TIME = 500

export function findComponentsDownward({
  context,
  componentName,
  components = [],
  level = 1
}) {
  const children = context.$children

  if (children.length) {
    children.forEach(child => {
      const subChildren = child.$children
      const { name } = child.$options

      if (name === componentName) {
        components.push({
          component: child,
          level
        })
      }
      if (subChildren.length) {
        const findChildren = findComponentsDownward({
          context: child,
          componentName,
          components,
          level: level + 1
        })
        if (findChildren) {
          components.concat(findChildren)
        }
      }
    })
  }

  return components
}

/**
 * two routes have same value?
 * @see https://github.com/vuejs/vue-router/blob/dev/src/util/route.js#L73
 */
export function isSameRoute(a, b) {
  const removeTrailingSlash = path => path.replace(/\/?$/, '')
  if (a.path && b.path) {
    return (
      removeTrailingSlash(a.path) === removeTrailingSlash(b.path) &&
      a.hash === b.hash &&
      isEqual(a.query, b.query)
    )
  }
  if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isEqual(a.query, b.query) &&
      isEqual(a.params, b.params)
    )
  }
  return false
}
