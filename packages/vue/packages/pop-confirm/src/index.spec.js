import { createWrapper, mount } from '@vue/test-utils'
import Vue from 'vue'
import PopConfirm from './index'
beforeAll(jest.useFakeTimers)
afterAll(jest.useRealTimers)
beforeEach(() => {
  document.body.innerHTML = ''
})

describe('PopConfirm', () => {
  it('should be visible when triggered', async () => {
    const mockFn = jest.fn()
    const wrapper = mount(PopConfirm, {
      listeners: {
        [`visibility-change`]: mockFn
      },
      propsData: {
        content: 'Hello Clair',
        transition: 'none'
      },
      slots: {
        default: '<button class="trigger">trigger</button>'
      }
    })
    const DEFAULT_DELAY_TIME = 100
    const body = createWrapper(document.body)
    const popConfirm = body.find('.c-popconfirm')
    expect(wrapper.vm.showDelay).toBe(DEFAULT_DELAY_TIME)
    expect(wrapper.vm.hideDelay).toBe(DEFAULT_DELAY_TIME)
    expect(popConfirm.element).not.toBeVisible()

    wrapper.find('.trigger').trigger('click')
    jest.advanceTimersByTime(DEFAULT_DELAY_TIME)
    await Vue.nextTick()
    expect(popConfirm.element).toBeVisible()

    document.body.click()
    jest.runAllTimers()
    await Vue.nextTick()

    expect(popConfirm.element).not.toBeVisible()
    const [
      [
        {
          detail: { visible }
        }
      ]
    ] = mockFn.mock.calls.slice(-1)
    expect(visible).toBe(false)
  })

  it('has different placements', () => {
    const wrapper = mount(PopConfirm, {
      propsData: {
        content: 'Hello Clair',
        placement: 'bottom'
      },
      slots: {
        default: '<button class="trigger">trigger</button>'
      }
    })
    expect(wrapper.vm.placement).toBe('bottom')

    wrapper.setProps({
      placement: 'right-top'
    })
    expect(wrapper.vm.placement).toBe('right-top')
  })

  it('has different trigger types', async () => {
    const mockFn = jest.fn()
    const wrapper = mount(PopConfirm, {
      listeners: {
        ['visibility-change']: mockFn
      },
      propsData: {
        content: 'Hello Clair',
        trigger: 'hover',
        transition: 'none'
      },
      slots: {
        default: '<button class="trigger">trigger</button>'
      }
    })
    const DEFAULT_DELAY_TIME = 100
    const body = createWrapper(document.body)
    const popConfirm = body.find('.c-popconfirm')
    expect(wrapper.vm.showDelay).toBe(DEFAULT_DELAY_TIME)
    expect(wrapper.vm.hideDelay).toBe(DEFAULT_DELAY_TIME)
    expect(popConfirm.element).not.toBeVisible()

    wrapper.find('.trigger').trigger('click')
    jest.runAllTimers()
    await Vue.nextTick()

    expect(popConfirm.element).not.toBeVisible()
    wrapper.find('.trigger').trigger('mouseenter')
    jest.runAllTimers()
    await Vue.nextTick()

    expect(popConfirm.element).toBeVisible()
    const [
      [
        {
          detail: { visible }
        }
      ]
    ] = mockFn.mock.calls.slice(-1)
    expect(visible).toBe(true)
  })

  it('accepts custom delay time of showing or hiding', () => {
    const wrapper = mount(PopConfirm, {
      propsData: {
        content: 'Hello Clair'
      },
      slots: {
        default: '<button class="trigger">trigger</button>'
      }
    })
    const DEFAULT_DELAY_TIME = 100
    const CUSTOM_DELAY_TIME = 500
    expect(wrapper.vm.showDelay).toBe(DEFAULT_DELAY_TIME)

    wrapper.setProps({
      showDelay: CUSTOM_DELAY_TIME
    })
    expect(wrapper.vm.showDelay).toBe(CUSTOM_DELAY_TIME)
  })
})
