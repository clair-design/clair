import { mount, createLocalVue } from '@vue/test-utils'
import DatePicker from './index.vue'

// TODO: resolve issue with $clair
const localVue = createLocalVue()
localVue.prototype.$clair = {
  defaultThrottleTime: 150
}

// TODO: more cases
it('should render basic DatePicker', () => {
  let val = ''
  const wrapper = mount(DatePicker, {
    localVue,
    propsData: {
      placeholder: '请输入或者选择日期',
      value: '2017-01-25'
    },
    listeners: {
      change (e) {
        val = e
      }
    }
  })

  expect(wrapper).toMatchSnapshot()
  wrapper.vm.$emit('change', '2018-01-12')
  expect(val).toEqual('2018-01-12')
})
