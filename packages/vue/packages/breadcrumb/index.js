import Breadcrumb from './src'
export { default as BreadcrumbItem } from './src/breadcrumb-item'

Breadcrumb.install = Vue => Vue.component(Breadcrumb.name, Breadcrumb)

export default Breadcrumb
