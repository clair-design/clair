import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Form, { FormItem } from 'packages/form'

describe('[CheckboxGroup]', () => {
  it('should auto get an auto-generated name', () => {
    const wrapper = shallowMount(CheckboxGroup)
    const { name } = wrapper.vm
    expect(name.length > 0).toBeTruthy()
    expect(typeof name).toBe('string')
  })

  it('should pass props down', async () => {
    const DemoApp = {
      render(h) {
        return (
          <CheckboxGroup name="test" value={['a']}>
            <Checkbox value="a">A</Checkbox>
            <Checkbox value="B">B</Checkbox>
          </CheckboxGroup>
        )
      }
    }

    const wrapper = mount(DemoApp)
    expect(wrapper.findAllComponents(Checkbox).length).toBe(2)

    const checkboxGroup = wrapper.findAllComponents(CheckboxGroup)
    const firstInput = wrapper.find('input').element

    expect(firstInput.name).toBe('test')
    expect(firstInput.checked).toBe(true)

    checkboxGroup.setProps({ disabled: true })
    await Vue.nextTick()
    expect(firstInput.disabled).toBe(true)

    checkboxGroup.setProps({ disabled: false })
    await Vue.nextTick()
    expect(firstInput.disabled).toBe(false)
  })

  it('should render child nodes using props.options', () => {
    const wrapper = mount(CheckboxGroup, {
      propsData: {
        value: ['b'],
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]
      }
    })
    const checkboxLength = 2
    expect(wrapper.findAllComponents(Checkbox).length).toBe(checkboxLength)
    expect(wrapper.findAll('input').at(1).element.checked).toBe(true)
    expect(wrapper.findAll('input').at(0).element.checked).toBe(false)
    wrapper.findAll('input').at(0).setChecked()
    expect(wrapper.findAll('input').at(0).element.checked).toBe(true)
  })

  it('should emit change events', () => {
    const mockFn = jest.fn()
    const wrapper = mount(CheckboxGroup, {
      propsData: {
        value: ['b'],
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]
      },
      listeners: {
        change: mockFn
      }
    })
    wrapper.find('input').setChecked(true)
    expect(mockFn).toBeCalled()
  })

  it('should work with form validation', async () => {
    const message = 'fail'
    const Component = {
      data() {
        return {
          form: {
            checked: [2]
          },
          rules: {
            checked: [
              {
                trigger: 'change',
                validator(rule, value) {
                  if (!value.includes(1)) {
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
              <CheckboxGroup vModel={this.form.checked}>
                <Checkbox value={1} />
                <Checkbox value={2} />
              </CheckboxGroup>
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Component)
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
    wrapper.vm.form.checked = [1]
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').element).toBeFalsy()
    wrapper.findAllComponents(Checkbox).at(0).trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
  })
})
