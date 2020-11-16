import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Notification from './notification'
import notification from './index'

jest.useFakeTimers()

describe('[Notification basics]', () => {
  it('may allow no type', () => {
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A notification without any type icons.'
      }
    })
    expect(wrapper.find('.c-icon--type').element).toBeFalsy()
  })

  it('allows four different types: info / success / error / warning .', async () => {
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A notification of information.',
        type: 'info'
      }
    })

    expect(wrapper.find('.is-info').element).toBeTruthy()

    wrapper.setProps({ type: 'success' })
    await Vue.nextTick()
    expect(wrapper.find('.is-success').element).toBeTruthy()
  })

  it('allows an empty title or an empty description', async () => {
    const wrapper = mount(Notification, {
      propsData: {
        type: 'error',
        description: 'A notification without any titles'
      }
    })
    expect(wrapper.find('.c-notification__title').element).toBeFalsy()

    wrapper.setProps({ title: 'Notice You', description: '' })
    await Vue.nextTick()
    expect(wrapper.find('.c-notification__desc').element).toBeFalsy()
  })

  it('should accept html string as description', () => {
    const html = '<strong>A dangerous html</strong>'
    const wrapper = mount(Notification, {
      propsData: {
        type: 'warning',
        description: html,
        dangerouslySetInnerHTML: true
      }
    })
    expect(wrapper.find('.c-notification__desc strong').html()).toBe(html)
  })

  it('should accept component as description', () => {
    const text = 'this is description'
    const description = {
      render() {
        return <div class="test">{text}</div>
      }
    }
    const wrapper = mount(Notification, {
      propsData: {
        type: 'warning',
        description
      }
    })
    expect(wrapper.find('.c-notification__desc .test').text()).toBe(text)
  })
})

describe('[Notification visibility]', () => {
  jest.useFakeTimers()
  it('automatically closes', () => {
    const duration = 4500
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A default notification',
        onClose: () => {
          wrapper.element.style.display = 'none'
        }
      }
    })
    expect(wrapper.element).toBeVisible()
    // need to trigger manually since jsdom doesn't support transition
    wrapper.vm.setTimeout()
    jest.advanceTimersByTime(duration)
    expect(wrapper.element).not.toBeVisible()
  })

  it("won't close when mouse enter", () => {
    const duration = 1000
    const wrapper = mount(Notification, {
      propsData: {
        title: 'title',
        description: 'description',
        duration,
        onClose: () => {
          wrapper.element.style.display = 'none'
        }
      }
    })
    wrapper.find('.c-notification').trigger('mouseenter')
    jest.advanceTimersByTime(duration)
    expect(wrapper.element).toBeVisible()
  })

  it('manually closes', async () => {
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A default notification'
      }
    })
    expect(wrapper.element).toBeVisible()
    wrapper.find('.c-icon--close').trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  it('will not close if timer is set to be 0', () => {
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A default notification',
        duration: 0,
        onClose: () => {
          wrapper.element.style.display = 'none'
        }
      }
    })
    expect(wrapper.element).toBeVisible()
    jest.advanceTimersByTime(10000)
    expect(wrapper.element).toBeVisible()
  })

  it('accepts reset timer', () => {
    const duration = 1000
    const wrapper = mount(Notification, {
      propsData: {
        title: 'Notice You',
        description: 'A default notification',
        duration,
        onClose: () => {
          wrapper.element.style.display = 'none'
        }
      }
    })
    expect(wrapper.element).toBeVisible()
    wrapper.vm.setTimeout()
    jest.advanceTimersByTime(duration)
    expect(wrapper.element).not.toBeVisible()
  })

  it('should render `custom-class` and `custom-style` correctly', async () => {
    const customClass = 'test'
    const customStyle = {
      fontSize: '20px'
    }
    const wrapper = mount(Notification, {
      propsData: {
        customClass,
        customStyle
      }
    })
    await Vue.nextTick()
    const notification = wrapper.find('.c-notification')
    expect(notification.classes(customClass)).toBe(true)
    expect(notification.element.style.fontSize).toBe(customStyle.fontSize)
  })
})

describe('[Notification zIndex]', () => {
  it(`should update container's zIndex when a new Notification has been pushed`, async () => {
    notification({})
    const container = document.querySelector('.c-notification-container')
    jest.runAllTimers()
    await Vue.nextTick()
    const oldZIndex = Number(container.style.zIndex)
    notification({})
    jest.runAllTimers()
    await Vue.nextTick()
    const newZIndex = Number(container.style.zIndex)
    expect(newZIndex).toBeGreaterThan(oldZIndex)
  })
})
