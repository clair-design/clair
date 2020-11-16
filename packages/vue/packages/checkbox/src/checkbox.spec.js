import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Checkbox from './checkbox'
import Form, { FormItem } from '../../form'

describe('[Checkbox]', () => {
  it('should contain input element with right type', () => {
    const wrapper = shallowMount(Checkbox)
    expect(wrapper.find('input[type="checkbox"]').element).toBeTruthy()
  })

  it('should have different sizes', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: { size: 'large' }
    })
    expect(wrapper.find('.c-checkbox--large').element).toBeTruthy()
  })

  it('should works with props.checked', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true
      }
    })
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('should emit value when checked', async () => {
    const mockVal = 12345
    const mockFn = jest.fn()
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: mockVal
      },
      listeners: {
        change({ target: { checked } }) {
          mockFn()
          expect(checked).toBe(true)
        }
      }
    })
    const checkboxEl = wrapper.find('input')
    checkboxEl.setChecked()
    await Vue.nextTick()
    expect(mockFn).toBeCalledTimes(1)
    expect(checkboxEl.element.checked).toBe(true)
  })

  it('should not emit value when disabled', () => {
    const mockVal = 12345
    const mockFn = jest.fn()
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        value: mockVal,
        disabled: true
      },
      listeners: {
        change: mockFn
      }
    })

    const checkboxEl = wrapper.find('input')
    checkboxEl.setChecked()

    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should work with v-model', () => {
    const Demo = {
      data() {
        return {
          checked: false
        }
      },
      render() {
        return <Checkbox vModel={this.checked} />
      }
    }
    const wrapper = mount(Demo)
    wrapper.find('input').trigger('click')
    expect(wrapper.vm.checked).toBeTruthy()
  })

  it('should work with form validation', async () => {
    const message = 'fail'
    const Component = {
      data() {
        return {
          form: {
            checked: false
          },
          rules: {
            checked: [
              {
                trigger: 'change',
                validator(rule, value) {
                  if (!value) {
                    return new Error(message)
                  }
                  return true
                }
              }
            ]
          }
        }
      },
      render() {
        return (
          <Form ref="form" props={{ model: this.form }} rules={this.rules}>
            <FormItem prop="checked" label="">
              <Checkbox vModel={this.form.checked} />
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Component)
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
    wrapper.vm.form.checked = true
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').element).toBeFalsy()
    wrapper.find('input').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('input').checked).toBeFalsy()
    expect(wrapper.vm.form.checked).toBeFalsy()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
  })

  it("won't trigger unwanted change event", async () => {
    const Demo = {
      render() {
        return (
          <Checkbox onChange={() => this.$emit('change')}>
            <input ref="input" onChange={() => this.$emit('input-change')} />
          </Checkbox>
        )
      }
    }
    await Vue.nextTick()
    const wrapper = mount(Demo)
    const inputElement = wrapper.vm.$refs.input
    inputElement.value = '1'
    inputElement.dispatchEvent(new Event('change'))
    await Vue.nextTick()
    expect(wrapper.emitted()['input-change'].length).toBe(1)
    expect(wrapper.emitted().change).toBeFalsy()
  })
})
