import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Card from './index'

describe('[card] Basics', () => {
  const cardTitle = 'Card Title'
  const cardContent = 'Card content'
  const wrapper = mount(Card, {
    scopedSlots: {
      default: `<p>${cardContent}</p>`
    }
  })

  it('should have a container with class name c-card', () => {
    expect(wrapper.classes()).toContain('c-card')
  })

  it('should display card content', () => {
    expect(wrapper.find('.c-card__body > p').text()).toEqual(cardContent)
  })

  it('should hide header if no title is set', () => {
    expect(wrapper.find('.c-card__header').exists()).toBe(false)
  })

  it('should show title after set title', async () => {
    wrapper.setProps({
      title: cardTitle
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-card__title').text()).toEqual(cardTitle)
  })

  it('should show border by default', async () => {
    expect(wrapper.classes()).toContain('c-card--bordered')
    wrapper.setProps({
      bordered: false
    })
    await Vue.nextTick()
    expect(wrapper.classes('c-card--bordered')).toBe(false)
  })

  it('should show shadow with raised true', async () => {
    wrapper.setProps({
      raised: true
    })
    await Vue.nextTick()
    expect(wrapper.classes()).toContain('c-card--raised')
  })

  it('should apply custom body style', async () => {
    const padding = '2px'
    wrapper.setProps({
      bodyStyle: { padding }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-card__body').element.style.padding).toBe(padding)
  })
})

describe('[card] Slots', () => {
  it('should show customized title', () => {
    const wrapper = mount(Card, {
      scopedSlots: {
        default: `<p>Card content</p>`,
        title: `<div class="fancy-title">Card title</div>`
      }
    })
    expect(wrapper.find('.fancy-title').exists()).toBe(true)
  })

  it('should show actions button', () => {
    const wrapper = mount(Card, {
      propsData: {
        title: 'Card Title'
      },
      scopedSlots: {
        default: `<p>Card content</p>`,
        actions: `<a class="fancy-actions">Action Button</a>`
      }
    })
    expect(wrapper.find('.fancy-actions').exists()).toBe(true)
  })
})
