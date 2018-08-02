import Header from './components/header.vue'
import Footer from './components/footer.vue'
import VueDemoTool from './components/vue-demo-tool.vue'
import '../styles/main.css'

export default {
  install (Vue) {
    Vue.component('c-header', Header)
    Vue.component('c-footer', Footer)
    Vue.component('vue-demo-tools', VueDemoTool)

    // SEE https://github.com/rstacruz/nprogress
    Vue.prototype.$nprogress.configure({
      speed: 1000,
      showSpinner: false
    })
  }
}
