import Button from 'packages/button'

export const ConfirmButton = {
  name: 'CModalConfirmButton',
  inject: {
    $modal: {
      default: null
    }
  },
  methods: {
    onConfirm(e) {
      this.$modal?.onConfirm(e)
    }
  },
  created() {
    this.$modal?.setConfirmButtonInstance?.(this)
  },
  render() {
    return (
      <Button
        ref="confirm"
        class="c-modal__confirmBtn"
        type="primary"
        onClick={this.onConfirm}
      >
        {this.$scopedSlots.default?.() ?? '确定'}
      </Button>
    )
  }
}
