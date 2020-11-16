import Select from './src/index'
import Option from './src/option'
import OptionGroup from './src/group'

Select.install = Vue => Vue.component(Select.name, Select)
Option.install = Vue => Vue.component(Option.name, Option)
OptionGroup.install = Vue => Vue.component(OptionGroup.name, OptionGroup)

export { Select, Option, OptionGroup }
