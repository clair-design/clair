import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Badge from './index'

describe('[badge]', () => {
  it('should show dot when isDot is true', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      isDot: true
    })
    await Vue.nextTick()
    expect(wrapper.text() === '').toBeTruthy()
    expect(wrapper.find('.c-badge__content--dot').exists()).toBeTruthy()
  })

  it('should show value when isDot is false', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      isDot: false,
      value: 'new'
    })
    await Vue.nextTick()
    expect(wrapper.text() === 'new').toBeTruthy()
  })

  it('should show value when max is not defined', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      value: 24
    })
    await Vue.nextTick()
    expect(wrapper.text() === '24').toBeTruthy()
  })

  it('should show max+ when value is bigger than max', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      max: 14,
      value: 24
    })
    await Vue.nextTick()
    expect(wrapper.text() === '14+').toBeTruthy()
  })

  it('should show value when max is bigger than value', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      max: 10,
      value: 9
    })
    await Vue.nextTick()
    expect(wrapper.text() === '9').toBeTruthy()
  })

  const rgbToHex = rgb => {
    // eslint-disable-next-line no-magic-numbers
    const hex = parseInt(rgb).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  it('should be a new background-color when backgroundColor is exist', async () => {
    const wrapper = mount(Badge)
    wrapper.setProps({
      backgroundColor: '#52B818'
    })
    await Vue.nextTick()
    const { backgroundColor } = wrapper.vm.$el.querySelector(
      '.c-badge__content'
    ).style
    const [a, b, c] = backgroundColor.toString().match(/\d+/g)
    const hexBackgroundColor = `#${rgbToHex(a)}${rgbToHex(b)}${rgbToHex(c)}`
    expect(hexBackgroundColor.toUpperCase() === `#52B818`).toBeTruthy()
  })
})
