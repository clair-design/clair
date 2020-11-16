import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Message, { messageTypes } from './message'

beforeAll(jest.useFakeTimers)
afterAll(jest.useRealTimers)

describe('[Message basics]', () => {
  it('should render content correctly', async () => {
    const message = 'test'
    const wrapper = mount(Message, {
      propsData: {
        message
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-message__content').text()).toBe(message)
  })

  it('should render different icons based on `type`', async () => {
    for (const type of messageTypes) {
      const wrapper = mount(Message, {
        propsData: {
          type,
          message: 'text'
        }
      })
      // eslint-disable-next-line no-await-in-loop
      await Vue.nextTick()
      expect(wrapper.find(`.c-icon--${type}`)).toBeTruthy()
    }
  })

  it('should render html shim correctly', async () => {
    const textContent = 'test'
    const wrapper = mount(Message, {
      propsData: {
        message: `<div>${textContent}</div>`,
        dangerouslySetInnerHTML: true
      }
    })
    const divInsideContent = wrapper.find('.c-message__content div')
    expect(divInsideContent).toBeTruthy()
    expect(divInsideContent.text()).toBe(textContent)
  })

  it('should disappear after given duration', async () => {
    const duration = 1000
    const controller = {
      events: ['after-enter']
    }
    const wrapper = mount(Message, {
      propsData: {
        duration,
        message: 'test'
      },
      stubs: {
        transition: global.transitionStub(controller)
      }
    })
    await Vue.nextTick()
    jest.advanceTimersByTime(duration)
    await Vue.nextTick()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  it('should never disappear if duration is 0 or negative', async () => {
    const duration = 0
    const controller = {
      events: ['after-enter']
    }
    const wrapper = mount(Message, {
      propsData: {
        duration,
        message: 'test'
      },
      stubs: {
        transition: global.transitionStub(controller)
      }
    })
    await Vue.nextTick()
    jest.advanceTimersByTime(duration + 1)
    await Vue.nextTick()
    expect(wrapper.emitted().close).toBeFalsy()
  })

  it('should render custom-class and custom-style when provided', async () => {
    const customClass = 'custom'
    const customStyle = {
      color: 'red'
    }
    const wrapper = mount(Message, {
      propsData: {
        customStyle,
        customClass,
        message: 'test'
      }
    })
    await Vue.nextTick()
    const message = wrapper.find('.c-message')
    expect(message.classes(customClass)).toBe(true)
    expect(message.element.style.color).toBe(customStyle.color)
  })
})

describe('[Message events]', () => {
  it('should react to mouseenter and mouseleave events', async () => {
    const duration = 1000
    const message = 'test'
    const controller = {
      events: ['after-enter']
    }
    const wrapper = mount(Message, {
      propsData: {
        duration,
        message
      },
      stubs: {
        transition: global.transitionStub(controller)
      }
    })
    await Vue.nextTick()
    wrapper.trigger('mouseenter')
    jest.advanceTimersByTime(duration + 1)
    await Vue.nextTick()
    expect(wrapper.emitted().close).toBeFalsy()
    wrapper.trigger('mouseleave')
    jest.advanceTimersByTime(duration + 1)
    await Vue.nextTick()
    expect(wrapper.emitted().close.length).toBe(1)
  })
})
