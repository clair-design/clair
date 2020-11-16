function hasTag(node, tag = 'a') {
  if (!node) return false
  if (node.tag === tag) return true
  if (!Array.isArray(node.children)) return false
  return node.children.some(child => hasTag(child, tag))
}

export default {
  name: 'CBreadcrumbItem',

  props: {
    to: [String, Object],
    replace: Boolean
  },

  inject: ['$breadcrumb'],

  methods: {
    clickHandler() {
      const { to, $router } = this
      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    }
  },

  render(h) {
    const content = this.$slots.default
    const separator =
      this.$breadcrumb.$slots.separator || this.$breadcrumb.separator
    const hasATag = content && content.some(c => hasTag(c))
    const tabIndex = this.to && !hasATag ? '0' : false
    const role = this.to || hasATag ? 'link' : false

    return (
      <span class="c-breadcrumb__item">
        <span role={role} tabIndex={tabIndex} onClick={this.clickHandler}>
          {content}
        </span>
        <span class="c-breadcrumb__separator">{separator}</span>
      </span>
    )
  }
}
