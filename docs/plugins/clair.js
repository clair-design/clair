import Vue from 'vue'
import '../../dist/clair.css'
import Clair from '../../'

import Header from '../layouts/includes/header.vue'
import Footer from '../layouts/includes/footer.vue'

Vue.use(Clair)
Vue.component('c-header', Header)
Vue.component('c-footer', Footer)
