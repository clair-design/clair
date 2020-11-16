// only for site usage

import Vue from 'vue'
import ClairDesignVue from 'src/main'

// utils
import mixColor from './scripts/mix-color'

// components
import ColorSwatch from './components/color-swatch.vue'

import './global.scss'

Vue.prototype.$mixColor = mixColor

Vue.use(ClairDesignVue)
Vue.component(ColorSwatch.name, ColorSwatch)
