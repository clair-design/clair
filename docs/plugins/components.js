import Header from './components/header.vue'
import Footer from './components/footer.vue'
import VueDemoTool from './components/vue-demo-tool.vue'

export default {
  install (Vue) {
    Vue.component('c-header', Header)
    Vue.component('c-footer', Footer)
    Vue.component('vue-demo-tools', VueDemoTool)
  }
}
