import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Input from '../index'
import TextArea from './input-textarea'

describe('[Input] basics', () => {
  it('v-model works', async () => {
    const Demo = {
      data() {
        return {
          value: '1'
        }
      },
      render(h) {
        return <Input vModel={this.value} />
      }
    }

    const wrapper = mount(Demo)
    expect(wrapper.find('input').element.value).toBe('1')
    wrapper.vm.value = '2'
    await Vue.nextTick()
    expect(wrapper.find('input').element.value).toBe('2')
  })

  it('id attribute works', () => {
    const id = 'test'
    const wrapper = mount(Input, {
      propsData: {
        id
      }
    })
    expect(wrapper.find('input').element.getAttribute('id')).toBe(id)
  })

  it('name attribute works', () => {
    const name = 'test'
    const wrapper = mount(Input, {
      propsData: {
        name
      }
    })
    expect(wrapper.find('input').element.getAttribute('name')).toBe(name)
  })

  it('should accept different sizes', async () => {
    const wrapper = mount(Input, {
      propsData: {
        size: 'normal'
      }
    })

    expect(wrapper.find('.c-input--normal').element).toBeTruthy()

    wrapper.setProps({ size: 'small' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--small').element).toBeTruthy()

    wrapper.setProps({ size: 'large' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--large').element).toBeTruthy()
  })

  it('should accept different type', async () => {
    const wrapper = mount(Input, {
      propsData: {
        type: 'success'
      }
    })

    expect(wrapper.find('.c-input--success').element).toBeTruthy()

    wrapper.setProps({ type: 'warning' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--warning').element).toBeTruthy()

    wrapper.setProps({ type: 'error' })
    await Vue.nextTick()
    expect(wrapper.find('.c-input--error').element).toBeTruthy()
  })

  it('should works with props.disabled', () => {
    const wrapper = mount(Input, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('htmlType attribute works', async () => {
    const type = 'text'
    const wrapper = mount(Input)

    expect(wrapper.find('input').element.getAttribute('type')).toBe(type)

    wrapper.setProps({ htmlType: 'password' })
    await Vue.nextTick()
    expect(wrapper.find('input').element.getAttribute('type')).toBe('password')

    wrapper.setProps({ htmlType: 'textarea' })
    await Vue.nextTick()
    expect(wrapper.find('.c-textarea').element).toBeTruthy()
  })

  it('placeholder attribute works', () => {
    const text = '请输入内容'
    const wrapper = mount(Input, {
      propsData: {
        placeholder: text
      }
    })
    expect(wrapper.find('input').element.getAttribute('placeholder')).toBe(text)
  })

  it('should works with block', () => {
    const wrapper = mount(Input, {
      propsData: {
        block: true
      }
    })
    expect(wrapper.find('.c-input--block').element).toBeTruthy()
  })

  it('should work with clearable', async () => {
    const Demo = {
      data() {
        return {
          value: ''
        }
      },
      render(h) {
        return <Input vModel={this.value} clearable />
      }
    }

    const wrapper = mount(Demo)
    expect(wrapper.find('.c-input-suffix').element).toBeFalsy()

    wrapper.vm.value = '123'
    await Vue.nextTick()
    expect(wrapper.find('.c-input-suffix').element).toBeTruthy()
    expect(wrapper.find('input').element.value).toBe('123')
    wrapper.find('.c-input-suffix i').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('.c-input-suffix').element).toBeFalsy()
  })

  it('should works with prefix-icon or suffix-icon', () => {
    const DemoApp = {
      render() {
        return (
          <Input id="demo" size="small" value="demo" placeholder="请输入内容">
            <div slot="prefix-icon">prefix</div>
            <div slot="suffix-icon">suffix</div>
          </Input>
        )
      }
    }
    const wrapper = mount(DemoApp)
    expect(wrapper.find('.c-input-prefix').element).toBeTruthy()
    expect(wrapper.find('.c-input-suffix').element).toBeTruthy()
  })

  it('prefix or suffix works', async () => {
    const wrapper = mount(Input, {
      propsData: {
        suffixIcon: 'A'
      }
    })
    expect(wrapper.find('.c-input-suffix').element.innerHTML).toBe('A')

    wrapper.setProps({
      prefixIcon: 'A'
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-input-prefix').element.innerHTML).toBe('A')
  })
  it('should works with group', () => {
    const DemoApp = {
      render() {
        return (
          <Input placeholder="请输入内容">
            <em class="prefix-text" slot="prefix">
              Http1://
            </em>
            <em class="suffix-text" slot="suffix">
              .com
            </em>
          </Input>
        )
      }
    }
    const wrapper = mount(DemoApp)
    expect(wrapper.find('.prefix-text').element).toBeTruthy()
    expect(wrapper.find('.suffix-text').element).toBeTruthy()
  })

  it('should works with autoSize', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlType: 'textarea',
        autoSize: { minRows: 2, maxRows: 6 }
      }
    })
    expect(wrapper.findComponent(TextArea).vm.autoSize.minRows).toBe(2)
    expect(wrapper.findComponent(TextArea).vm.autoSize.maxRows).toBe(6)
  })

  it('should emit input & change events', async () => {
    const changeFn = jest.fn()
    const inputFn = jest.fn()
    const keydownFn = jest.fn()
    const pressEnterFn = jest.fn()
    const value = 'value'
    const wrapper = mount(Input, {
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
    wrapper.find('input').trigger('input')
    expect(inputFn).toBeCalledTimes(1)

    wrapper.find('input').trigger('change')
    expect(changeFn).toBeCalledTimes(1)
    const [[{ target, nativeEvent }]] = changeFn.mock.calls
    expect(target).toMatchObject({ value })
    expect(nativeEvent.target.value).toBe(value)

    wrapper.find('input').trigger('keydown')
    expect(keydownFn).toBeCalledTimes(1)

    wrapper.find('input').trigger('keydown', {
      key: 'Enter'
    })
    expect(keydownFn).toBeCalledTimes(2)
    expect(pressEnterFn).toBeCalledTimes(1)
    const [[{ target: pressTarget }]] = pressEnterFn.mock.calls.slice(-1)
    expect(pressTarget).toMatchObject({ value })
  })

  it('should emit correct value with "press-enter" without "props.value"', async () => {
    const pressEnterFn = jest.fn()
    const wrapper = mount(Input, {
      listeners: {
        ['press-enter']: e => pressEnterFn(e.target.value)
      }
    })

    await Vue.nextTick()
    const input = wrapper.find('input').element
    input.value = '1'
    wrapper.find('input').trigger('keydown', {
      key: 'Enter'
    })
    expect(pressEnterFn).lastCalledWith('1')
  })

  it('should work with `autocomplete`, `autofocus` and `readonly`', () => {
    const Demo = {
      render() {
        return <Input autocomplete="on" autofocus readonly />
      }
    }

    const wrapper = mount(Demo)
    const input = wrapper.find('input').element
    expect(input.readOnly).toBe(true)
    expect(input.autocomplete).toBe('on')
    expect(input.autofocus).toBe(true)
  })

  it('should apply attributes by "input-attrs"', async () => {
    const inputAttrs = {
      attr: '1'
    }
    const wrapper = mount(Input, {
      propsData: {
        inputAttrs
      }
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.getAttribute('attr')).toBe(
      inputAttrs.attr
    )
  })

  test('specific props should take precedence over "input-attrs"', async () => {
    const inputAttrs = {
      readonly: true,
      disabled: true,
      autocomplete: 'on',
      autofocus: true
    }
    const wrapper = mount(Input, {
      propsData: {
        inputAttrs
      }
    })
    await Vue.nextTick()
    // even the default value of specific props take precedence over input-attrs
    const input = wrapper.find('input').element
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
