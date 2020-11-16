import { mount, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Rating from './index'

describe('Rating', () => {
  const wrapper = mount(Rating, {
    propsData: {
      value: 3
    }
  })

  it('should work', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('assert event has been emitted', () => {
    wrapper.find('.c-rating__unit').trigger('click')
    expect(wrapper.emitted().change).toBeTruthy()
    wrapper.find('.c-rating__unit').trigger('mouseenter')
    expect(wrapper.emitted()['hover-change']).toBeTruthy()
    wrapper.find('.c-rating').trigger('mouseleave')
    expect(wrapper.emitted()['hover-change']).toBeTruthy()
    expect(wrapper.emitted().checked).toBeTruthy()
  })

  it('should set default count to 5', () => {
    expect(wrapper.vm.count).toBe(5)
  })

  it('should set default value to 3', () => {
    expect(wrapper.vm.value).toBe(3)
  })

  it('should set default type to star', () => {
    expect(wrapper.vm.type).toBe('star')
    expect(
      wrapper.find('.c-rating__unit--star i').find('.c-icon--svg').exists()
    ).toBeTruthy()
  })

  it('should set default color to #FFB409', () => {
    expect(wrapper.vm.color).toBe('#FFB409')
  })

  it('should set default size to 16', () => {
    expect(wrapper.vm.size).toBe(16)
  })

  it('should be heart when set heart type', () => {
    const wrapper = mount(Rating, {
      propsData: {
        type: 'heart'
      }
    })

    expect(
      wrapper.find('.c-rating__unit--heart i').find('.c-icon--svg').exists()
    ).toBeTruthy()
  })

  it('set readonly is true', () => {
    const wrapper = mount(Rating, {
      propsData: {
        readonly: true
      }
    })
    expect(wrapper.find('.c-rating--readonly').exists()).toBeTruthy()
    wrapper.find('.c-rating__unit').trigger('click')
    expect(wrapper.emitted().change).toBeFalsy()
    wrapper.find('.c-rating__unit').trigger('mouseenter')
    expect(wrapper.emitted()['hover-change']).toBeFalsy()
    wrapper.find('.c-rating').trigger('mouseleave')
    expect(wrapper.emitted()['hover-change']).toBeFalsy()
  })

  it('set value is a float type', () => {
    const wrapper = mount(Rating, {
      propsData: {
        readonly: true,
        value: 2.3,
        type: 'star'
      }
    })
    expect(wrapper.vm.valueToUse).toBe(2.3)
    expect(wrapper.vm.percentToUse).toBe('30%')
    expect(wrapper.find('.c-rating__part').exists()).toBeTruthy()
  })

  it('activeIndex is changed when change value to 2', async () => {
    wrapper.setProps({
      value: 2
    })
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe(2)
    expect(wrapper.vm.activeIndex).toBe(2)
  })

  it('customChar slot is rendered with custom type', () => {
    const wrapper = shallowMount(Rating, {
      propsData: {
        type: 'custom'
      },
      slots: {
        customChar: '<span>customChar</span>'
      }
    })

    expect(wrapper.find('.c-rating__unit span').text().trim()).toBe(
      'customChar'
    )
  })
})
