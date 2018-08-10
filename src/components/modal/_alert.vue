<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    msg: {
      type: [String, Function],
      require: true
    }
  },
  data () {
    return {
      visible: true
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
    const button = h('c-button', {
      on: { click: onConfirm },
      attrs: {
        primary: true,
        autofocus: true
      }
    }, '确定')

    const { title, msg, visible } = this
    const attrs = { title, visible, width: '400px' }
    const message = typeof msg === 'function' ? msg(h) : msg
    const handlers = {
      close: onCancel,
      'after-leave': destroyVM
    }

    return h('c-modal', { attrs, on: handlers }, [
      h('div', null, [message]),
      h('div', { slot: 'footer' }, [button])
    ])
  }
}
</script>
