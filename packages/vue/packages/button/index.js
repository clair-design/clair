import Button from './src/index'
export { default as ButtonGroup } from './src/button-group'

Button.install = Vue => Vue.component(Button.name, Button)

export default Button
