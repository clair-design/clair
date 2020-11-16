import { mount, createWrapper } from '@vue/test-utils'
import { Modal, install } from './index'
import { registerVShow, transition } from 'src/utils/transition'
import Vue from 'vue'

// ovrride v-show in order to mimic transition
registerVShow(Vue)
install(Vue)
beforeAll(jest.useFakeTimers)
afterAll(jest.useRealTimers)
afterEach(() => {
  document.body.innerHTML = ''
})

const refs = {
  eventEmitter: new Vue()
}

describe('[Modal Closes]', () => {
  const demo = {
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      showModal() {
        this.isVisible = true
      }
    },
    render(h) {
      return (
        <div>
          <button onClick={this.showModal}>trigger</button>
          <Modal
            title="Modal Title"
            visible={this.isVisible}
            onConfirm={() => {
              this.isVisible = false
            }}
            onCancel={() => (this.isVisible = false)}
            onClose={() => {
              this.isVisible = false
              refs.eventEmitter.$emit('close')
            }}
          >
            <div>Modal Content</div>
          </Modal>
        </div>
      )
    }
  }

  const init = async () => {
    const wrapper = mount(demo, {
      stubs: { transition }
    })
    const body = createWrapper(document.body)
    let modalBox = null

    const updateModal = () => {
      jest.runAllTimers()
      modalBox = body.find('.c-modal__container')
    }
    await Vue.nextTick()
    const show = () => {
      wrapper.setData({ isVisible: true })
      jest.runAllTimers()
    }

    updateModal()
    show()

    const closePromise = new Promise(resolve => {
      refs.eventEmitter.$on('close', resolve)
    })

    return {
      modalBox,
      closePromise
    }
  }
  it('should close the modal on click confirm button', async () => {
    const { modalBox, closePromise } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    expect(modalBox.find('.c-modal__confirmBtn').element).toBeTruthy()
    modalBox.find('.c-modal__confirmBtn').trigger('click')
    await closePromise
    expect(modalBox.element).not.toBeVisible()
  })

  it('should close the modal on click cancel button', async () => {
    const { modalBox, closePromise } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    modalBox.find('.c-modal__cancelBtn').trigger('click')
    await closePromise
    expect(modalBox.element).not.toBeVisible()
  })

  it('should close the modal on click close icon', async () => {
    const { modalBox, closePromise } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    modalBox.find('.c-modal__closeBtn').trigger('click')
    await closePromise
    expect(modalBox.element).not.toBeVisible()
  })

  it('should close the modal on click the mask', async () => {
    const { modalBox, closePromise } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    modalBox.trigger('mousedown')
    await closePromise
    expect(modalBox.element).not.toBeVisible()
  })
})

describe(`[Model v-model]`, () => {
  const demo = {
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      showModal() {
        this.isVisible = true
      }
    },
    render(h) {
      return (
        <div>
          <button onClick={this.showModal}>trigger</button>
          <Modal
            title="Modal Title"
            vModel={this.isVisible}
            onClose={() => {
              refs.eventEmitter.$emit('close')
            }}
          >
            <div>Modal Content</div>
          </Modal>
        </div>
      )
    }
  }
  it('should work with v-model', async () => {
    const wrapper = mount(demo, {
      stubs: {
        transition
      }
    })
    const body = createWrapper(document.body)
    const modal = body.find('.c-modal')
    const mask = body.find('.c-modal__container')
    const button = wrapper.find('button')
    await Vue.nextTick()
    expect(modal.element).not.toBeVisible()
    button.trigger('click')
    await Vue.nextTick()
    expect(modal.element).toBeVisible()
    mask.trigger('mousedown')
    await new Promise(resolve => {
      refs.eventEmitter.$on('close', resolve)
    })
    expect(modal.element).not.toBeVisible()
    expect(wrapper.vm.isVisible).toBe(false)
  })
})

describe('[Modal simple operation]', () => {
  it('should close the modal on click confirm button', async () => {
    return new Promise(resolve => {
      const demo = {
        mounted() {
          this.$modal({
            title: `Modal Title`,
            content: `Modal content`
          }).then(resolve)
        },
        render(h) {
          return <div />
        }
      }
      mount(demo)

      const body = createWrapper(document.body)
      const confirmButton = body.find('.c-modal__confirmBtn')
      expect(body.findAll('.c-modal__confirmBtn').wrappers.length).toBe(1)
      confirmButton.trigger('click')
    }).then(result => {
      expect(result).toBe(true)
    })
  })

  it('should focus on confirm button by default after enter viewport', async () => {
    const id = 'confirm'
    mount(Modal, {
      propsData: {
        visible: true
      },
      scopedSlots: {
        footer({ confirm: Confirm, cancel: Cancel }) {
          return (
            <div>
              <Confirm id={id}>confirm</Confirm>
              <Cancel>cancel</Cancel>
            </div>
          )
        }
      },
      stubs: {
        transition
      }
    })
    await Vue.nextTick()
    expect(document.activeElement.id).toBe(id)
  })
})

describe('[Modal props]', () => {
  const demo = {
    data() {
      return {
        title: undefined,
        isVisible: false,
        light: false,
        type: 'success',
        center: false,
        width: null,
        top: null
      }
    },
    methods: {
      showModal() {
        this.isVisible = true
      }
    },
    render(h) {
      return (
        <div>
          <button onClick={this.showModal}>trigger</button>
          <Modal
            title={this.title}
            visible={this.isVisible}
            light={this.light}
            type={this.type}
            center={this.center}
            width={this.width}
            top={this.top}
          >
            <div>Modal Content</div>
          </Modal>
        </div>
      )
    }
  }

  const init = () => {
    const wrapper = mount(demo)
    const body = createWrapper(document.body)
    let modalBox = null

    const updateModal = () => {
      jest.runAllTimers()
      modalBox = body.find('.c-modal__container')
    }

    const show = () => {
      wrapper?.setData({ isVisible: true })
      jest.runAllTimers()
    }
    updateModal()
    show()
    return {
      wrapper,
      modalBox
    }
  }

  it('should be a light mode when set props light', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    expect(modalBox.find('.c-modal--light').element).toBeFalsy()
    wrapper.setData({ light: true })
    await Vue.nextTick()
    expect(modalBox.find('.c-modal--light').element).toBeTruthy()
  })

  it('should have different type icons when set props type', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    expect(modalBox.find('.c-icon--success').element).toBeTruthy()
    wrapper.setData({ type: 'warning' })
    await Vue.nextTick()
    expect(modalBox.find('.c-icon--success').element).toBeFalsy()
    expect(modalBox.find('.c-icon--warning').element).toBeTruthy()
  })

  it('should show vertically center when set props center', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    wrapper.setData({ center: true })
    await Vue.nextTick()
    expect(modalBox.find('.c-modal').attributes('style')).toBe(
      'top: 50%; transform: translateY(-50%);'
    )
  })

  it('should change title when set props title', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    const updatedModalTitle = 'Updated Modal Title'
    expect(modalBox.element).toBeVisible()
    expect(modalBox.find('.c-modal__header').text()).toBe('')
    wrapper.setData({ title: updatedModalTitle })
    await Vue.nextTick()
    expect(modalBox.find('.c-modal__header').text()).toBe(updatedModalTitle)
  })

  it('should have different layout style when set width or top', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    expect(modalBox.element).toBeVisible()
    wrapper.setData({ width: '50%', top: '50%', center: true })
    await Vue.nextTick()
    const modalElement = modalBox.find('.c-modal').element
    expect(modalElement.style.top).toBe('50%')
    expect(modalElement.style.transform).toBe('translateY(-50%)')
  })

  it('should render custom-class', async () => {
    const customClass = 'test'
    const customClassObj = {
      'test-obj': true
    }
    const customClassArray = [
      'test-array1',
      {
        'test-array2': true
      }
    ]
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    const modal = wrapper.findComponent(Modal)
    const modalBody = modalBox.find('.c-modal')
    // string
    modal.setProps({
      customClass
    })
    await Vue.nextTick()
    expect(modalBody.classes(customClass)).toBe(true)
    // object
    modal.setProps({
      customClass: customClassObj
    })
    await Vue.nextTick()
    Object.keys(customClassObj).forEach(className => {
      if (customClassObj[className]) {
        expect(modalBody.classes(className)).toBe(true)
      }
    })
    expect(modalBody.classes(customClass)).toBe(false)
    // array
    modal.setProps({
      customClass: customClassArray
    })
    await Vue.nextTick()
    customClassArray.forEach(function traverse(className) {
      if (typeof className === 'string') {
        expect(modalBody.classes(className)).toBe(true)
      }
      if (Array.isArray(className)) {
        className.forEach(traverse)
      }
      Object.keys(className).keys(classNameKey => {
        if (className[classNameKey]) {
          expect(modalBody.classes(classNameKey)).toBe(true)
        }
      })
    })
  })

  it('should render custom-style', async () => {
    const { wrapper, modalBox } = await init()
    await Vue.nextTick()
    const modal = wrapper.findComponent(Modal)
    const modalBody = modalBox.find('.c-modal')
    // object
    const customStyle = {
      fontSize: '40px'
    }
    modal.setProps({
      customStyle
    })
    await Vue.nextTick()
    expect(modalBody.element.style.fontSize).toBe(customStyle.fontSize)
    // array
    const customStyleArray = [
      {
        fontSize: '30px'
      },
      {
        color: 'red'
      }
    ]
    modal.setProps({
      customStyle: customStyleArray
    })
    await Vue.nextTick()
    customStyleArray.forEach(style => {
      Object.keys(style).forEach(propertyName => {
        expect(modalBody.element.style[propertyName]).toBe(style[propertyName])
      })
    })
  })
})

describe('[Modal shortcut]', () => {
  it('should return a Promise with shortcut mode', async () => {
    const ref = {
      current: null
    }
    const Demo = {
      render() {
        return null
      },
      mounted() {
        ref.current = this.$modal({
          content: 'modal'
        })
      }
    }
    mount(Demo)
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const cancelButton = body.find('.c-modal__cancelBtn')
    cancelButton.trigger('click')
    await Vue.nextTick()
    const cancelResult = await ref.current
    expect(cancelResult).toBe(false)
    document.body.innerHTML = ''
    mount(Demo)
    await Vue.nextTick()
    const confirmButton = body.find('.c-modal__confirmBtn')
    confirmButton.trigger('click')
    await Vue.nextTick()
    const confirmResult = await ref.current
    expect(confirmResult).toBe(true)
  })
})

describe('[Modal footer]', () => {
  it('should render custom footer with slot', async () => {
    mount(Modal, {
      propsData: {
        visible: true
      },
      scopedSlots: {
        footer({ confirm: Confirm, cancel: Cancel }) {
          return (
            <div>
              <Confirm style={{ color: 'red' }}>confirm</Confirm>
              <Cancel>cancel</Cancel>
            </div>
          )
        }
      }
    })
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const buttons = body.findAll('.c-button')
    expect(buttons.at(0).text()).toBe('confirm')
    expect(buttons.at(0).element.style.color).toBe('red')
    expect(buttons.at(1).text()).toBe('cancel')
  })

  it('should render custom footer with shortcut', async () => {
    const Demo = {
      render() {
        return null
      },
      mounted() {
        this.$modal({
          footer({ confirm, cancel }) {
            return [
              cancel('cancel', { style: { color: 'red' } }),
              confirm('confirm')
            ]
          }
        })
      }
    }
    mount(Demo)
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const buttons = body.findAll('.c-button')
    expect(buttons.at(0).text()).toBe('cancel')
    expect(buttons.at(0).element.style.color).toBe('red')
    expect(buttons.at(1).text()).toBe('confirm')
  })
})
