import { Modal, install } from './src'

Modal.install = Vue => {
  Vue.component(Modal.name, Modal)
  install(Vue)
}

export default Modal
