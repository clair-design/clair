import Collapse from './src/index'
import CollapseItem from './src/collapse-item'

Collapse.install = Vue => Vue.component(Collapse.name, Collapse)

CollapseItem.install = Vue => Vue.component(CollapseItem.name, CollapseItem)

export default Collapse

export { CollapseItem }
