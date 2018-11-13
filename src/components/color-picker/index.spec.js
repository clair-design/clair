import { mount, createLocalVue } from '@vue/test-utils'
import ColorPicker from './index.vue'

// TODO: resolve issue with $clair
const localVue = createLocalVue()
localVue.prototype.$clair = {
  defaultThrottleTime: 150
}

// TODO: further work needed
it('should render ColorPicker correctly', () => {
  const wrapper = mount(ColorPicker, {
    localVue,
    propsData: {
      mode: 'rgb',
      value: '#2f85da'
    }
  })
  const colorPicker = wrapper.vm.$refs.panel
  expect(wrapper).toMatchSnapshot()
  // show portal
  wrapper.vm.$refs.trigger.click()
  expect(colorPicker.$el.innerHTML).toMatchSnapshot()
})

it('should render inline ColorPicker correctly', () => {
  const wrapper = mount(ColorPicker, {
    localVue,
    propsData: {
      mode: 'rgb',
      value: '#ff7b00',
      inline: true
    }
  })

  expect(wrapper).toMatchSnapshot()
})
