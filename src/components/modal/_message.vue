<script>
export default {
  props: {
    title: String,
    msg: {
      type: [String, Function],
      require: true
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data () {
    return { visible: true }
  },
  computed: {
    icon () {
      switch (this.type) {
        case 'success':
          return 'check-circle'
        case 'warning':
          return 'alert-circle'
        case 'error':
          return 'alert-triangle'
        case 'info':
        default:
          return 'info'
      }
    }
  },
  methods: {
    onCancel () {
      this.visible = false
      this.$emit('cancel')
    },
    onConfirm () {
      this.visible = false
      this.$emit('confirm')
    },
    destroyVM () {
      this.$emit('destroy')
    }
  },
  render (h) {
    const { onCancel, onConfirm, destroyVM } = this
    const icon = h('c-icon', {
      attrs: {
        name: this.icon,
        type: 'feather'
      },
      class: this.type
    })
    const cancelBtn = h('c-button', {
      on: { click: onCancel },
      attrs: { outline: true }
    }, '取消')
    const confirmBtn = h('c-button', {
      on: { click: onConfirm },
      attrs: { primary: true, autofocus: true }
    }, '确定')

    const { title, msg, visible } = this
    const attrs = { title, visible, width: '400px' }
    const message = typeof msg === 'function' ? msg(h) : msg
    const handlers = {
      close: onCancel,
      'after-leave': destroyVM
    }

    return h('c-modal',
      {
        attrs,
        on: handlers
      },
      [
        h('div', { slot: 'footer' }, [cancelBtn, confirmBtn]),
        h('div', { staticClass: 'c-modal-message' }, [
          icon,
          h('div', null, [message])
        ])
      ]
    )
  }
}
</script>
