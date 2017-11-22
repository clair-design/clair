import Vue from 'vue'
import '../../dist/clair.css'
import Clair from '../../'

import Header from '../layouts/includes/header.vue'
import Footer from '../layouts/includes/footer.vue'

import RunOnline from '../assets/vue/run-online.vue'

Vue.use(Clair)
Vue.component('c-header', Header)
Vue.component('c-footer', Footer)
Vue.component('c-run-online', RunOnline)
Vue.directive('effect', {
  inserted (el) {
    let node = el.parentNode

    while (node) {
      if (node.classList.contains('vue-demo-block')) {
        node.classList.add('vue-demo-block-demo-only')
        break
      }
      node = node.parentNode
    }
  }
})
