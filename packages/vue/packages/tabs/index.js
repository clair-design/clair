import { Tabs, TabPane } from './src/index'

Tabs.install = Vue => Vue.component(Tabs.name, Tabs)
TabPane.install = Vue => Vue.component(TabPane.name, TabPane)

export { Tabs, TabPane }
