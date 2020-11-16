import Vue from 'vue'
import DemoTool from './components/demo-tool.vue'
import './core'

// styles
import '@clair/theme-default/styles/index.scss'
import './styles/github-markdown.scss'
import './styles/demo.css'
import './styles/theme.css'

Vue.component(DemoTool.name, DemoTool)
