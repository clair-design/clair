import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Alert from './index'

describe('[Alert] basics', () => {
  it('should accept different types', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        type: 'error',
        content: 'some error message'
      }
    })

    expect(wrapper.find('.c-icon--error').element).toBeTruthy()

    wrapper.setProps({ type: 'success' })
    await Vue.nextTick()
    expect(wrapper.find('.c-icon--success').element).toBeTruthy()
  })

  // TODO
})

describe('[Alert] visibility', () => {
  it('should allow toggling', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        type: 'success',
        closable: true,
        content: 'hello world'
      }
    })

    expect(wrapper.vm.visible).toBe(true)
    wrapper.vm.toggle()
    await Vue.nextTick()
    expect(wrapper.vm.visible).toBe(false)
  })

  it('should be invisible when close icon is clicked', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        type: 'success',
        closable: true,
        content: 'hello world'
      }
    })

    wrapper.find('.c-icon--close').trigger('click')
    await Vue.nextTick()
    expect(wrapper.element.innerHTML).toBeFalsy()

    wrapper.vm.show()
    await Vue.nextTick()
    expect(wrapper.element.innerHTML).toBeTruthy()
  })
})
