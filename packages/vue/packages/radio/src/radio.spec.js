import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Radio from './radio'

it('should contain input element with right type', () => {
  const wrapper = shallowMount(Radio)
  expect(wrapper.find('input[type="radio"]').exists()).toBeTruthy()
})

it('should pass the right name to input element', () => {
  const wrapper = shallowMount(Radio, {
    propsData: { name: 'test-input' }
  })
  expect(wrapper.find('input').element.name).toBe('test-input')
})

it('should works with props.defaultChecked', () => {
  const wrapper = shallowMount(Radio, {
    propsData: {
      defaultChecked: true
    }
  })
  expect(wrapper.find('input').element.checked).toBe(true)
})

it('should emit value when checked', async () => {
  const mockVal = 12345
  const mockFn = jest.fn()
  const wrapper = shallowMount(Radio, {
    propsData: {
      value: mockVal
    },
    listeners: {
      change(e) {
        mockFn()
        expect(e.target.value).toBe(mockVal)
        expect(e.nativeEvent && typeof e.nativeEvent === 'object').toBe(true)
      }
    }
  })
  const radioEl = wrapper.find('input')
  radioEl.setChecked()
  await Vue.nextTick()
  expect(mockFn).toBeCalledTimes(1)
  expect(radioEl.element.checked).toBe(true)
})

it('should not emit value when disabled', () => {
  const mockVal = 12345
  const mockFn = jest.fn()
  const wrapper = shallowMount(Radio, {
    propsData: {
      value: mockVal,
      disabled: true
    },
    listeners: {
      change: mockFn
    }
  })

  const radioEl = wrapper.find('input')
  radioEl.setChecked()

  expect(mockFn).not.toHaveBeenCalled()
})
