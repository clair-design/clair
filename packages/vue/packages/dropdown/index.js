import Dropdown from './src/index'
import DropdownMenu from './src/dropdown-menu'
import DropdownItem from './src/dropdown-item'

Dropdown.install = Vue => Vue.component(Dropdown.name, Dropdown)
DropdownMenu.install = Vue => Vue.component(DropdownMenu.name, DropdownMenu)
DropdownItem.install = Vue => Vue.component(DropdownItem.name, DropdownItem)

export default Dropdown
export { DropdownMenu, DropdownItem }
