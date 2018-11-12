import { mount } from '@vue/test-utils'
import Button from '../button/index.vue'
import ButtonGroup from './index.vue'

it('should works with size', () => {
  const wrapper = mount(ButtonGroup, {
    propsData: { size: 'md' },
    stubs: {
      'c-button': Button
    },
    slots: {
      default: [
        `
<c-button primary outline>A</c-button>
<c-button primary outline>B</c-button>
<c-button primary outline>C</c-button>
`
      ]
    }
  })

  expect(wrapper.classes()).toContain('is-md')
  expect(wrapper.findAll(Button).length).toBe(3)
  expect(wrapper).toMatchSnapshot()
})
