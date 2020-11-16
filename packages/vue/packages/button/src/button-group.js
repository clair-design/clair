import { buttonSizeProp } from './util'

export default {
  name: 'CButtonGroup',
  props: { size: buttonSizeProp },
  provide() {
    return { buttonGroup: this }
  },
  render(h) {
    return <div class="c-button-group">{this.$slots.default}</div>
  }
}
