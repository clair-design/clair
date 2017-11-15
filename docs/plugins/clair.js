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

