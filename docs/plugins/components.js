import Header from '../assets/vue/header.vue'
import Footer from '../assets/vue/footer.vue'

export default {
  install (Vue) {
    Vue.component('c-header', Header)
    Vue.component('c-footer', Footer)
  }
}
