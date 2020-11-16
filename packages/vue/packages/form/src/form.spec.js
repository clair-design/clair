import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Form from './index'
import FormItem from './form-item'
import CInput from '../../input'

describe('[Form] basics', () => {
  it('should accept different label position', async () => {
    const wrapper = mount(Form, {
      propsData: {
        labelPosition: 'right'
      }
    })

    expect(wrapper.find('.c-form--label-right').element).toBeTruthy()

    wrapper.setProps({ labelPosition: 'top' })
    await Vue.nextTick()
    expect(wrapper.find('.c-form--label-top').element).toBeTruthy()

    wrapper.setProps({ labelPosition: 'left' })
    await Vue.nextTick()
    expect(wrapper.find('.c-form--label-left').element).toBeTruthy()
  })

  it('should accept inline', () => {
    const wrapper = mount(Form, {
      propsData: {
        inline: true
      }
    })

    expect(wrapper.find('.c-form--inline').element).toBeTruthy()
  })

  it('form label width can control form item label width', () => {
    const DemoApp = {
      render(h) {
        return (
          <Form label-width="80px">
            <FormItem label="Username">Hello</FormItem>
          </Form>
        )
      }
    }

    const wrapper = mount(DemoApp)
    const formItemLabel = wrapper.find('.c-form-item__label').element
    expect(formItemLabel.style.width).toEqual('80px')
  })
})

describe('[Form] validate', () => {
  const DemoApp = {
    data() {
      return {
        form: {
          projectName: '',
          phoneNumber: ''
        },
        rules: {
          projectName: [
            {
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            }
          ],
          phoneNumber: [
            {
              required: true,
              message: '请输入联系电话',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    render(h) {
      return (
        <Form ref="form" props={{ model: this.form }} rules={this.rules}>
          <FormItem prop="projectName">
            <CInput vModel={this.form.projectName} />
          </FormItem>
          <FormItem prop="phoneNumber">
            <CInput vModel={this.form.phoneNumber} />
          </FormItem>
        </Form>
      )
    }
  }

  it('should accept rules prop', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.vm.$refs.form.rules.projectName[0].required).toBe(true)
  })

  it('shoud accept model prop', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.vm.$refs.form.model).not.toBeNull()
  })

  it('should return all errors array when validate all fields', async () => {
    const wrapper = mount(DemoApp)
    const res = await wrapper.vm.$refs.form.validate()
    const rulesLength = Object.keys(wrapper.vm.$refs.form.rules).length
    expect(res.errors.length).toEqual(rulesLength)
  })

  it('should return one error when validate one field', async () => {
    const wrapper = mount(DemoApp)
    const res = await wrapper.vm.$refs.form.validate(['projectName'])
    expect(res.errors.length).toEqual(1)
  })

  it('should reset all fields', () => {
    const wrapper = mount(DemoApp)
    wrapper.vm.form.projectName = 'Project Name'
    wrapper.vm.form.phoneNumber = '1234567890'
    wrapper.vm.$refs.form.resetFields()
    expect(wrapper.vm.form.projectName === '').toBe(true)
    expect(wrapper.vm.form.phoneNumber === '').toBe(true)
  })

  it('should reset one field when reset one field', () => {
    const wrapper = mount(DemoApp)
    wrapper.vm.form.projectName = 'Project Name'
    wrapper.vm.form.phoneNumber = '1234567890'
    wrapper.vm.$refs.form.resetFields(['projectName'])
    expect(wrapper.vm.form.projectName === '').toBe(true)
    expect(wrapper.vm.form.phoneNumber === '1234567890').toBe(true)
  })
})
