import { IconClose } from './close'
import { registerIconComponent } from './utils/icon-wrapper'

export const IconClear = /*@__PURE__*/ registerIconComponent({
  name: 'CIconClear',
  render(h) {
    return (
      <IconClose
        class="c-icon--svg-circle c-icon--svg-light c-icon--clear"
        on={this.$listeners}
      />
    )
  }
})
