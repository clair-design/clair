<script>
export default {
  name: 'c-menu-item',
  props: {
    mode: String,
    active: Boolean
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isLevel1 () {
      return this.$parent.$options.name === 'c-menu'
    },
    classNames () {
      const classNames = []
      if (this.isActive) classNames.push('is-active')
      return classNames
    }
  },
  mounted () {
    if (this.active) this.isActive = true
  },

  /**
   * write render function to avoid duplicate default slots error message
   */
  render (c) {
    const content = this.$slots.default
    const tips = c('c-tip', {
      attrs: { position: 'right' }
    }, [
      content,
      c('template', {
        slot: 'content'
      }, [content])
    ])
    const needTips = this.isLevel1 && this.$parent.collapsed
    const children = [needTips ? tips : content]
    return c('div', {
      staticClass: 'c-menu__item',
      class: this.classNames
    }, children)
  }
}
</script>
