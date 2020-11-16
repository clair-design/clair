import { IconClose, IconStatus } from 'packages/icon'
import { PortalLike } from 'packages/portal-like'
import { isObject } from 'lodash-es'

/** Supported notification types */
export const notificationTypes = ['success', 'warning', 'error', 'info']
export const notificationPlacements = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left'
]

export default {
  name: 'CNotification',

  extends: PortalLike,

  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: [String, Object],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 4500
    },
    placement: {
      type: String,
      default: 'top-right',
      validator(val) {
        return notificationPlacements.includes(val)
      }
    },
    dangerouslySetInnerHTML: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    onClose: {
      type: Function
    },
    onClick: {
      type: Function
    }
  },

  data() {
    return {
      timer: null,
      closed: false
    }
  },

  computed: {
    description2Use() {
      if (isObject(this.description)) {
        const Component = this.description
        return <Component />
      }
      return this.description
    },

    classes() {
      return ['c-notification', this.customClass]
    }
  },

  methods: {
    close(e) {
      if (!this.closed) {
        if (e) e.stopPropagation()
        this.closed = true
        this.$emit('close', this)
        if (typeof this.onClose === 'function') {
          this.onClose()
        }
      }
    },
    click() {
      if (typeof this.onClick === 'function') {
        this.onClick()
      }
    },
    setTimeout() {
      const { duration } = this

      if (duration > 0) {
        this.timer = setTimeout(this.close, duration)
      }
    },
    clearTimeout() {
      clearTimeout(this.timer)
    },
    onAfterEnter() {
      this.setTimeout()
    },
    onBeforeEnter() {
      // hook to update zIndex
      this.$emit('before-enter')
    }
  },

  render(h) {
    const props = this.dangerouslySetInnerHTML
      ? {
          domProps: {
            innerHTML: this.description
          }
        }
      : null

    const hasBothTitleAndDesc = this.description && this.title
    const extraTitleStyle = hasBothTitleAndDesc ? '' : 'margin-bottom: 0;'

    return (
      <transition
        appear
        name="c-notification"
        on-after-enter={this.onAfterEnter}
        on-before-enter={this.onBeforeEnter}
      >
        <div
          class={this.classes}
          style={this.customStyle}
          role="alert"
          on-mouseenter={this.clearTimeout}
          on-mouseleave={this.setTimeout}
          onClick={this.click}
        >
          {this.type ? (
            <IconStatus type={this.type} class="c-icon--type" />
          ) : null}
          <div class="c-notification__content">
            {this.title ? (
              <div class="c-notification__title" style={extraTitleStyle}>
                {this.title}
              </div>
            ) : null}
            {this.description && (
              <div class="c-notification__desc" {...props}>
                {this.description2Use}
              </div>
            )}
          </div>
          <IconClose class="c-icon--close" onClick={this.close} />
        </div>
      </transition>
    )
  },

  destroyed() {
    this.clearTimeout()
  }
}
