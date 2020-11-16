export default {
  name: 'CCard',

  props: {
    title: String,
    raised: Boolean,
    bordered: {
      type: Boolean,
      default: true
    },
    bodyStyle: Object
  },

  computed: {
    classNames() {
      return {
        'c-card': true,
        'c-card--bordered': this.bordered && !this.raised,
        'c-card--raised': this.raised
      }
    }
  },

  render(h) {
    const { $scopedSlots } = this
    const titleContent = $scopedSlots.title?.() || this.title
    const actionsContent = $scopedSlots.actions?.()
    const bodyContent = $scopedSlots.default?.()
    const coverContent = $scopedSlots.cover?.()

    // wrap content with `div` if it's not empty
    const wrapWithContainer = (content, classNames) => {
      if (!content) return
      return <div class={classNames}>{content}</div>
    }
    const title = wrapWithContainer(titleContent, 'c-card__title')
    const actions = wrapWithContainer(actionsContent, 'c-card__actions')
    const cover = wrapWithContainer(coverContent, 'c-card__cover')

    const header = title ? (
      <div class="c-card__header">
        {title}
        {actions}
      </div>
    ) : null

    const body = (
      <div class="c-card__body" style={this.bodyStyle}>
        {bodyContent}
      </div>
    )

    return (
      <div class={this.classNames}>
        {cover}
        {header}
        {body}
      </div>
    )
  }
}
