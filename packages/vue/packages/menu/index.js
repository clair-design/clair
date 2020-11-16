import Menu from './src/index'
import MenuItem from './src/menu-item'
import SubMenu from './src/submenu'

Menu.install = Vue => Vue.component(Menu.name, Menu)

export default Menu

export { MenuItem, SubMenu }
