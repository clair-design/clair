import { BreadcrumbItem } from '../breadcrumb/index'

BreadcrumbItem.install = Vue =>
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)

export default BreadcrumbItem
