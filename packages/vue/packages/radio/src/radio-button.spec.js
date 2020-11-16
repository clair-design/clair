import { mount } from '@vue/test-utils'
import RadioButton from './radio-button'

it('should has the classname c-radio--button', () => {
  const wrapper = mount(RadioButton, {
    propsData: {}
  })
  expect(wrapper.classes()).toContain('c-radio--button')
})
