import { mount } from '@vue/test-utils'
import Calendar from './index.vue'

it('should works in basic mode', () => {
  const wrapper = mount(Calendar, {
    propsData: {
      // specify date, or test could fail
      value: '2017-09-14'
    }
  })
  expect(wrapper).toMatchSnapshot()
})

it('should work with defined props', () => {
  const wrapper = mount(Calendar, {
    propsData: {
      value: '2017-9-15',
      maxDate: '2018-8-15',
      minDate: '2017-8-15',
      pattern: 'yyyy/MM/dd'
    }
  })

  expect(wrapper).toMatchSnapshot()
})

it('should work as month selector', () => {
  const wrapper = mount(Calendar, {
    propsData: {
      type: 'month',
      value: '2017-9-15',
      maxDate: '2018-8-15',
      minDate: '2017-8-15',
      pattern: 'yyyy/MM'
    }
  })

  expect(wrapper).toMatchSnapshot()
})
