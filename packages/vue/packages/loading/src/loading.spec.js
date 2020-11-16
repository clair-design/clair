import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Loading from './loading'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('[Loading]', () => {
  it('should render `customClass`', async () => {
    const customClass = 'test'
    const wrapper = mount(Loading, {
      data() {
        return {
          options: {
            customClass
          }
        }
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-mask').classes(customClass)).toBe(true)
  })

  it('should render specified text', async () => {
    const text = 'test'
    const wrapper = mount(Loading, {
      data() {
        return {
          options: {
            text
          }
        }
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-spin__text').text()).toBe(text)
  })

  it('should render `spinClass`', async () => {
    const spinClass = 'test'
    const wrapper = mount(Loading, {
      data() {
        return {
          options: {
            spinClass
          }
        }
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-icon--svg').classes(spinClass)).toBe(true)
  })

  it('should be able to adjust position', async () => {
    const top = '1px'
    const wrapper = mount(Loading, {
      data() {
        return {
          options: {
            top
          }
        }
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-mask').element.style.top).toBe(top)
  })

  it('should update `z-index` after multiple show/hide when append to `document.body`', async () => {
    const wrapper = mount(Loading, {
      data() {
        return {
          options: {
            visible: false,
            target: 'body',
            targetDom: document.body
          }
        }
      }
    })
    await Vue.nextTick()
    const loadingDom = wrapper.find('.c-loading-mask').element
    const { zIndex } = loadingDom.style
    wrapper.setData({
      options: {
        visible: true
      }
    })

    await Vue.nextTick()
    const { zIndex: newZIndex } = loadingDom.style
    expect(Number(newZIndex)).toBeGreaterThan(Number(zIndex))
  })
})
