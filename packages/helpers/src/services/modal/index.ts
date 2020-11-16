import { onModalEnter, onModalLeave, onModalLeaveDone } from './mask'

export const modalService = {
  onEnter(modalDOM: HTMLElement) {
    onModalEnter(modalDOM)
  },

  onLeave(modalDOM: HTMLElement) {
    onModalLeave(modalDOM)
  },

  onAfterLeave() {
    onModalLeaveDone()
  }
}
