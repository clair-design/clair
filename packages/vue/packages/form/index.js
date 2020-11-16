import Form from './src/index'
import FormItem from './src/form-item'

Form.install = Vue => Vue.component(Form.name, Form)

export default Form

export { FormItem }
