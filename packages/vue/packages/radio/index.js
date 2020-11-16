import Radio from './src/radio'
import RadioButton from './src/radio-button'

Radio.install = Vue => Vue.component(Radio.name, Radio)

RadioButton.install = Vue => Vue.component(RadioButton.name, RadioButton)

export { Radio, RadioButton }
