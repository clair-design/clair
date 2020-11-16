export default {
  name: 'CTimeline',
  props: {
    placement: {
      type: String,
      default: 'left',
      validator: placement => ['left', 'center', 'right'].includes(placement)
    }
  },
  computed: {
    timelineClass() {
      return ['c-timeline', `c-timeline--${this.placement}`]
    }
  },
  render(h) {
    return <ul class={this.timelineClass}>{this.$scopedSlots.default?.()}</ul>
  }
}
