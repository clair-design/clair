import Vue from 'vue'

import Modal from './modal'
import { CancelButton } from './cancelButton'
import { ConfirmButton } from './confirmButton'

const generateModal = (option, resolve) => {
  const { footer = () => void 0, ...restOption } = option

  return {
    name: 'CModalContainer',

    data() {
      return {
        visible: true
      }
    },

    methods: {
      confirm() {
        resolve(true)
        this.visible = false
      },
      cancel() {
        resolve(false)
        this.visible = false
      },
      close() {
        option.onClose?.call(this.$refs.modal)
        this.$nextTick(this.$destroy)
      },
      getScopedSlot() {
        const scopedSlots = {}
        const footerNode = footer({
          confirm: (children, data) => (
            <ConfirmButton {...data}>{children}</ConfirmButton>
          ),
          cancel: (children, data) => (
            <CancelButton {...data}>{children}</CancelButton>
          )
        })
        if (footerNode) {
          scopedSlots.footer = () => footerNode
        }
        return scopedSlots
      }
    },

    render(h) {
      const { visible } = this
      return (
        <Modal
          ref="modal"
          {...{ props: { ...restOption, visible } }}
          onConfirm={this.confirm}
          onCancel={this.cancel}
          onClose={this.close}
          scopedSlots={this.getScopedSlot()}
        />
      )
    }
  }
}

const modal = function (modalOption) {
  return new Promise(resolve => {
    const container = new Vue(generateModal(modalOption, resolve)).$mount()
    document.body.appendChild(container.$el)
  })
}

const info = function (modalOption) {
  return modal({ ...modalOption, type: 'info', light: true })
}

const success = function (modalOption) {
  return modal({ ...modalOption, type: 'success', light: true })
}

const warning = function (modalOption) {
  return modal({ ...modalOption, type: 'warning', light: true })
}

const error = function (modalOption) {
  return modal({ ...modalOption, type: 'error', light: true })
}

export { Modal }

export const install = Vue => {
  Vue.prototype.$modal = modal
  Vue.prototype.$info = info
  Vue.prototype.$success = success
  Vue.prototype.$warning = warning
  Vue.prototype.$error = error
}
