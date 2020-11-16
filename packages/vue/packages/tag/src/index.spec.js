import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Tag from './index'

describe('[Tag] basics', () => {
  it('should accept different sizes', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        size: 'large'
      }
    })

    expect(wrapper.find('.c-tag--large').exists()).toBeTruthy()

    wrapper.setProps({ size: 'medium' })
    await Vue.nextTick()
    expect(wrapper.find('.c-tag--medium').exists()).toBeTruthy()
  })

  it('should accept different colors', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: 'blue'
      }
    })

    expect(wrapper.find('.c-tag--blue').exists()).toBeTruthy()

    wrapper.setProps({ color: 'red' })
    await Vue.nextTick()
    expect(wrapper.find('.c-tag--red').exists()).toBeTruthy()
  })

  it('should render with valid `color`', async () => {
    const color = '#000000'
    const inValidColor = '#1sd'
    const wrapper = mount(Tag, {
      propsData: {
        color
      }
    })
    await Vue.nextTick()
    const div = document.createElement('div')
    div.style.color = color
    const tagDom = wrapper.find('.c-tag').element
    expect(tagDom.style.color).toBe(div.style.color)
    wrapper.setProps({
      color: inValidColor
    })
    await Vue.nextTick()
    // won't render text with invalid color
    expect(tagDom.style.color).toBeFalsy()
  })
})

describe('[Tag] visibility', () => {
  it('should be invisible when close icon is clicked', () => {
    const mockFn = jest.fn()
    const wrapper = mount(Tag, {
      propsData: {
        closable: true
      },
      listeners: {
        close: mockFn
      }
    })

    wrapper.find('.c-icon--close-tag').trigger('click')
    expect(mockFn).toHaveBeenCalled()
  })
})
