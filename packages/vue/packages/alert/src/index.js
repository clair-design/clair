import { IconStatus, IconClose } from 'packages/icon'

const CAlertTitle = ({ children }) => {
  if (children && children.length) {
    return <div class="c-alert__title">{children}</div>
  }
  return null
}

const CAlertContent = ({ children }) => (
  <div class="c-alert__content">{children}</div>
)

export default {
  name: 'CAlert',

  props: {
    type: {
      type: String,
      default: 'info',
      validator(type) {
        return ['success', 'warning', 'error', 'info'].includes(type)
      }
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: true
    }
  },

  methods: {
    close(event) {
      this.$emit('close', { nativeEvent: event })
      this.visible = false
    },
    show() {
      this.visible = true
    },
    toggle() {
      this.visible = !this.visible
    }
  },

  render(h) {
    const { title } = this.$scopedSlots
    const children = this.$scopedSlots.default

    const hasTitle = Boolean(title || this.title)
    const classes = [
      'c-alert',
      `c-alert--${this.type}`,
      hasTitle ? 'c-alert--has-title' : ''
    ]

    // TODO
    // 1. [x] transition
    // 2. [ ] a11y for close button
    // 3. [ ] support for custom close button/text
    const vnode = !this.visible ? null : (
      <div role="alert" class={classes}>
        {this.showIcon ? (
          <IconStatus
            type={this.type}
            class={`c-icon--${this.type}`}
            style={{
              strokeWidth: hasTitle ? 1.5 : 1
            }}
          />
        ) : null}

        <CAlertContent>
          {hasTitle ? (
            <CAlertTitle>{title ? title() : this.title}</CAlertTitle>
          ) : null}
          {children ? children() : this.content}
        </CAlertContent>

        {this.closable ? (
          <IconClose
            class="c-icon--close"
            role="button"
            aria-label="关闭"
            onClick={this.close}
          />
        ) : null}
      </div>
    )
    return <transition name="c-alert-fade">{vnode}</transition>
  }
}
