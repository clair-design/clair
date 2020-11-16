import { createPortal, destroyPortal } from 'src/utils/createPortal'

export const portal = {
  methods: {
    createPortal(renderFn, target) {
      createPortal(renderFn, this, target)
    }
  },
  destroyed() {
    destroyPortal(this)
  }
}
