import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Radio from './radio'
import RadioGroup from './radio-group'
import Form, { FormItem } from 'packages/form'

describe('[Radio-group]', () => {
  it('should auto get an auto-generated name', () => {
    const wrapper = shallowMount(RadioGroup)
    const { name } = wrapper.vm
    expect(name.length > 0).toBeTruthy()
    expect(typeof name).toBe('string')
  })

  it('should pass props down', async () => {
    const DemoApp = {
      render(h) {
        return (
          <RadioGroup name="test" value="a">
            <Radio value="a">A</Radio>
            <Radio value="B">B</Radio>
          </RadioGroup>
        )
      }
    }

    const wrapper = mount(DemoApp)
    expect(wrapper.findAllComponents(Radio).length).toBe(2)

    const radioGroup = wrapper.findAllComponents(RadioGroup)
    const firstInput = wrapper.find('input').element

    expect(firstInput.name).toBe('test')
    expect(firstInput.checked).toBe(true)

    radioGroup.setProps({ disabled: true })
    await Vue.nextTick()
    expect(firstInput.disabled).toBe(true)

    radioGroup.setProps({ disabled: false })
    await Vue.nextTick()
    expect(firstInput.disabled).toBe(false)
  })

  it('should render child nodes using props.options', () => {
    const wrapper = mount(RadioGroup, {
      propsData: {
        value: 'b',
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]
      }
    })
    expect(wrapper.findAllComponents(Radio).length).toBe(2)
    expect(wrapper.findAll('input').at(1).element.checked).toBe(true)
  })

  it('should emit `update:value` & change events', () => {
    const mockFn = jest.fn()
    const wrapper = mount(RadioGroup, {
      propsData: {
        value: 'b',
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ]
      },
      listeners: {
        change: mockFn,
        ['update:value']: mockFn
      }
    })
    wrapper.find('input').setChecked(true)
    expect(mockFn).toBeCalledTimes(2)
  })

  it('should work with form validation', async () => {
    const message = 'need to have 0'
    const Demo = {
      data() {
        return {
          model: {
            checked: 1
          },
          rules: {
            checked: [
              {
                trigger: 'blur',
                type: 'number',
                validator(rule, value) {
                  if (value !== 0) {
                    return new Error(message)
                  }
                  return true
                }
              }
            ]
          },
          options: [
            { label: 0, value: 0 },
            { label: 1, value: 1 }
          ]
        }
      },
      render() {
        return (
          <Form props={{ model: this.model }} rules={this.rules}>
            <FormItem prop="checked">
              <RadioGroup
                name="test"
                options={this.options}
                vModel={this.model.checked}
              />
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Demo)
    const firstRadio = wrapper.findAll('input').at(0)
    const getErrElement = () => wrapper.find('.c-form-item__error')
    expect(getErrElement().element).toBeFalsy()
    firstRadio.trigger('blur')
    await Vue.nextTick()
    expect(getErrElement().text()).toBe(message)
    firstRadio.trigger('click')
    await Vue.nextTick()
    expect(getErrElement().text()).toBe(message)
    firstRadio.trigger('blur')
    await Vue.nextTick()
    expect(getErrElement().element).toBeFalsy()
  })
})
