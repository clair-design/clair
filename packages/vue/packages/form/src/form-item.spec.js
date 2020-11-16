import { mount } from '@vue/test-utils'
import Form from './index'
import FormItem from './form-item'
import CInput from '../../input'
import Vue from 'vue'

describe('[Form Item] basics', () => {
  it('should accept no label', () => {
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem>Hello</FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    expect(wrapper.find('.c-form-item__label').element).toBeFalsy()
  })

  it('should accept label prop', () => {
    const label = 'Username'
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem label={label}>Hello</FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__label').element
    expect(formItemLabel.innerHTML).toEqual(label)
  })

  it('should support number with label width', () => {
    const DemoApp = {
      render(h) {
        return (
          <Form label-width={120}>
            <FormItem label="Username">Hello</FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__label').element
    expect(formItemLabel.style.width).toEqual('120px')
  })

  it('should accept label slot', () => {
    const label = 'Username'
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem>
              <template slot="label">{label}</template>
              Hello
            </FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__label').element
    expect(formItemLabel.innerHTML).toEqual(label)
  })

  it('should accept label width and priority is higher than form', () => {
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem label="Username" label-width="120px">
              Hello
            </FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__label').element
    expect(formItemLabel.style.width).toEqual('120px')
  })

  it('should accept helper-text prop', () => {
    const text = 'Helper Text'
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem label="Username" helper-text={text}>
              Hello
            </FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__helper-text').element
    expect(formItemLabel.innerHTML).toEqual(text)
  })

  it('should accept helper-text slot', () => {
    const text = 'Helper Text'
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem label="Username">
              Hello
              <template slot="helper-text">{text}</template>
            </FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__helper-text').element
    expect(formItemLabel.innerHTML).toEqual(text)
  })
})

describe('[Form Item] validate', () => {
  const projectTip = '请输入项目名称'
  const DemoApp = {
    data() {
      return {
        form: {
          projectName: ''
        }
      }
    },
    render(h) {
      return (
        <Form ref="form" props={{ model: this.form }}>
          <FormItem
            prop="projectName"
            ref="formItem"
            rules={[
              {
                required: true,
                message: projectTip,
                trigger: 'blur'
              },
              {
                min: 6,
                max: 12,
                message: '项目名称必须是 6 ~ 12 位字符',
                trigger: 'change'
              }
            ]}
          >
            <CInput ref="input" vModel={this.form.projectName} />
          </FormItem>
        </Form>
      )
    }
  }

  it('should accept rules prop', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.vm.$refs.formItem.rules[0].required).toBe(true)
  })

  it('should show error message when validate failed', async () => {
    const wrapper = mount(DemoApp)
    await wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    const errorElement = wrapper.find('.c-form-item__error').element
    expect(errorElement.innerHTML).toEqual(projectTip)

    const isErrorElement = wrapper.find('.is-error').element
    expect(isErrorElement).not.toBeNull()
  })

  it('should show required symbol when rules include required', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.vm.$refs.formItem.isRequired).toBe(true)
    expect(wrapper.find('.is-required').element).toBeVisible()
  })

  it('support prop as a path', async () => {
    const App = {
      data() {
        return {
          form: {
            layer: {
              prop: ''
            }
          },
          rules: {
            layer: {
              prop: [
                {
                  required: true,
                  type: 'string',
                  trigger: 'blur'
                }
              ]
            }
          }
        }
      },
      render() {
        return (
          <Form ref="form" props={{ model: this.form }} rules={this.rules}>
            <FormItem prop="layer.prop">
              <CInput vModel={this.form.layer.prop}></CInput>
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(App)
    const input = wrapper.findComponent(CInput)
    input.trigger('blur')
    await Vue.nextTick()
    expect(wrapper.find('.is-error').element).toBeTruthy()
    wrapper.setData({
      form: {
        layer: {
          prop: '1'
        }
      }
    })
    await Vue.nextTick()
    input.trigger('blur')
    await Vue.nextTick()
    expect(wrapper.find('.is-error').element).toBeFalsy()
    // reset also works with prop path
    wrapper.vm.$refs.form.resetFields()
    await Vue.nextTick()
    expect(input.find('input').element.value).toBe('')
  })
})
