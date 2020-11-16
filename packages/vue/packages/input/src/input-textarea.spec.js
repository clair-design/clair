import { mount } from '@vue/test-utils'
import Vue from 'vue'
import InputTextArea from './input-textarea'
import Input from './input'

describe('CInputTextarea', () => {
  it('should work with v-model', async () => {
    const demo = {
      data() {
        return {
          value: ''
        }
      },
      render() {
        return <InputTextArea vModel={this.value} />
      }
    }

    const wrapper = mount(demo)
    const textarea = wrapper.find('textarea')
    const textareaEl = textarea.element
    expect(textareaEl.value).toBe('')
    wrapper.setData({
      value: '1'
    })
    await Vue.nextTick()
    expect(textareaEl.value).toBe('1')
    textareaEl.value = '2'
    textarea.trigger('input')
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('2')
  })
  it('should accept different sizes', async () => {
    const wrapper = mount(InputTextArea)
    expect(wrapper.find('.c-input--normal').element).toBeTruthy()

    wrapper.setProps({ size: 'normal' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--normal').element).toBeTruthy()

    wrapper.setProps({ size: 'small' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--small').element).toBeTruthy()

    wrapper.setProps({ size: 'large' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--large').element).toBeTruthy()
  })

  it('should works with c-input-textarea', async () => {
    const placeholder = 'input search text'
    const wrapper = mount(InputTextArea, {
      propsData: {
        placeholder
      }
    })
    expect(wrapper.find('textarea').element.placeholder).toBe(placeholder)

    wrapper.setProps({
      autoSize: { minRows: 2, maxRows: 6 }
    })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputTextArea).vm.autoSize.minRows).toBe(2)
    expect(wrapper.findComponent(InputTextArea).vm.autoSize.maxRows).toBe(6)
  })

  it('should works with props.disabled', () => {
    const wrapper = mount(InputTextArea, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.c-textarea--disabled').element).toBeTruthy()
    expect(wrapper.find('textarea').element.disabled).toBe(true)
  })

  it('should emit input & change events', () => {
    const changeFn = jest.fn()
    const inputFn = jest.fn()
    const keydownFn = jest.fn()
    const pressEnterFn = jest.fn()
    const value = 'value'
    const wrapper = mount(InputTextArea, {
      listeners: {
        change: changeFn,
        input: inputFn,
        keydown: keydownFn,
        [`press-enter`]: pressEnterFn
      },
      propsData: {
        value
      }
    })
    wrapper.find('textarea').trigger('input')
    expect(inputFn).toBeCalledTimes(1)

    wrapper.find('textarea').trigger('change')
    expect(changeFn).toBeCalledTimes(1)
    const [[{ target, nativeEvent }]] = changeFn.mock.calls
    expect(target).toMatchObject({ value })
    expect(nativeEvent.target.value).toBe(value)

    wrapper.find('textarea').trigger('keydown')
    expect(keydownFn).toBeCalledTimes(1)
    const [[{ nativeEvent: keyDownEvent }]] = keydownFn.mock.calls
    expect(keyDownEvent).toBeUndefined()

    wrapper.find('textarea').trigger('keydown', {
      code: 'Enter'
    })
    expect(keydownFn).toBeCalledTimes(2)
    expect(pressEnterFn).toBeCalledTimes(1)
  })

  it('should add attributes by props like "readonly"', async () => {
    // test the way how user would actually use it
    const wrapper = mount(Input, {
      propsData: {
        htmlType: 'textarea',
        readonly: true,
        autocomplete: 'on',
        autofocus: true
      }
    })
    await Vue.nextTick()
    const textarea = wrapper.find('textarea').element
    expect(textarea.readOnly).toBe(true)
    expect(textarea.autocomplete).toBe('on')
    expect(textarea.autofocus).toBe(true)
  })

  it('should add attributes by "input-attrs"', async () => {
    const inputAttrs = {
      attr: '1'
    }
    const wrapper = mount(Input, {
      propsData: {
        htmlType: 'textarea',
        inputAttrs
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('textarea').element.getAttribute('attr')).toBe(
      inputAttrs.attr
    )
  })

  test('"input-attrs" should take lower priority compare to corresponding props', async () => {
    const inputAttrs = {
      readonly: true,
      disabled: true,
      autocomplete: 'on',
      autofocus: true
    }
    const wrapper = mount(Input, {
      propsData: {
        htmlType: 'textarea',
        inputAttrs
      }
    })
    await Vue.nextTick()
    // even the default value of specific props take precedence over input-attrs
    const input = wrapper.find('textarea').element
    expect(input.readOnly).toBe(false)
    expect(input.disabled).toBe(false)
    expect(input.autocomplete).toBe('off')
    expect(input.autofocus).toBe(false)
    // update specific props
    wrapper.setProps({
      ...inputAttrs
    })
    await Vue.nextTick()
    expect(input.readOnly).toBe(true)
    expect(input.disabled).toBe(true)
    expect(input.autocomplete).toBe('on')
    expect(input.autofocus).toBe(true)
  })
})
