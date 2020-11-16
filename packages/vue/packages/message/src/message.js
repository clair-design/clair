import { IconStatus } from 'packages/icon'
import { PortalLike } from 'packages/portal-like'

/** Supported message types */
export const messageTypes = ['success', 'warning', 'error', 'info']

export default {
  name: 'CMessage',

  extends: PortalLike,

  props: {
    type: {
      type: String,
      default: 'info',
      validator(val) {
        return messageTypes.includes(val)
      }
    },
    duration: {
      type: Number,
      default: 3000
    },
    dangerouslySetInnerHTML: {
      type: Boolean,
      default: false
    },
    message: {
      // here `Object` refers to VNode
      type: [String, Object],
      required: true
    },
    // internal use
    id: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      timer: null,
      closed: false
    }
  },

  computed: {
    classes() {
      return ['c-message', this.customClass]
    }
  },

  render(h) {
    const props = this.dangerouslySetInnerHTML
      ? {
          domProps: {
            innerHTML: this.message
          }
        }
      : null

    return (
      <transition appear name="c-message" on-after-enter={this.onAfterEnter}>
        <div
          class={this.classes}
          style={this.customStyle}
          on-mouseenter={this.clearTimeout}
          on-mouseleave={this.setTimeout}
        >
          <IconStatus type={this.type} class={`c-icon--${this.type}`} />
          <div class="c-message__content" {...props}>
            {this.message}
          </div>
        </div>
      </transition>
    )
  },

  methods: {
    close() {
      if (!this.closed) {
        this.closed = true
        this.$emit('close', this)
        this.$destroy()
      }
    },

    setTimeout() {
      const { duration } = this

      // if duration is a positive number, set a timer
      if (duration > 0) {
        this.timer = setTimeout(_ => this.close(), duration)
      }
    },

    clearTimeout() {
      clearTimeout(this.timer)
    },

    onAfterEnter() {
      this.setTimeout()
    }
  },

  destroyed() {
    this.clearTimeout()
  }
}
