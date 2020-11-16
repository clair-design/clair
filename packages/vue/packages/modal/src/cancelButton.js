import Button from 'packages/button'

export const CancelButton = {
  name: 'CModalCancelButton',
  inject: {
    $modal: {
      default: null
    }
  },
  methods: {
    onCancel(e) {
      this.$modal?.onCancel(e)
    }
  },
  render() {
    return (
      <Button class="c-modal__cancelBtn" onClick={this.onCancel}>
        {this.$scopedSlots.default?.() ?? '取消'}
      </Button>
    )
  }
}
