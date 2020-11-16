export default {
  name: 'CTimelineItem',
  props: {
    color: {
      type: String,
      default: ''
    },
    solid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasIcon() {
      return Boolean(this.$scopedSlots.icon)
    },
    itemClass() {
      return {
        'c-timeline-item': true,
        'c-timeline-item--has-icon': this.hasIcon
      }
    },
    itemNodeClass() {
      return {
        'c-timeline-item__node': true,
        'c-timeline-item__node--solid': this.solid
      }
    },
    nodeStyle() {
      return {
        color: this.color
      }
    }
  },
  render(h) {
    return (
      <li class={this.itemClass}>
        <div class={this.itemNodeClass} style={this.nodeStyle}>
          {this.$scopedSlots.icon?.()}
        </div>
        <div class="c-timeline-item__content">
          {this.$scopedSlots.default?.()}
        </div>
      </li>
    )
  }
}
