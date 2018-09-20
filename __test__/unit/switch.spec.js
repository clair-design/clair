import { mount, shallowMount } from '@vue/test-utils'
import Switch from '@/components/switch'
import SwitchVModelFixture from './fixtures/switch/v-model.vue'

describe('switch', function () {
  it('should trigger v-model changes', () => {
    const wrapper = mount(SwitchVModelFixture)
    expect(wrapper.vm.checked).toEqual(true)

    wrapper.find('.c-switch__layoutbox').trigger('click')
    expect(wrapper.vm.checked).toEqual(false)

    expect(wrapper).toMatchSnapshot()
  })

  it('should not trigger changes if disabled', () => {
    const wrapper = shallowMount(Switch, {
      propsData: { disabled: true }
    })

    // before click: false
    expect(wrapper.vm.currentValue).toEqual(false)
    // trigger click
    wrapper.find('.c-switch__layoutbox').trigger('click')
    // after click: false
    expect(wrapper.vm.currentValue).toEqual(false)

    expect(wrapper).toMatchSnapshot()
  })

  it('should use given value instead of boolean values', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        value: 'checked',
        checkedValue: 'checked',
        uncheckedValue: 'unchecked'
      }
    })

    wrapper.find('.c-switch__layoutbox').trigger('click')
    expect(wrapper.vm.currentValue).toEqual('unchecked')
    wrapper.find('.c-switch__layoutbox').trigger('click')
    expect(wrapper.vm.currentValue).toEqual('checked')

    expect(wrapper).toMatchSnapshot()
  })

  it('should transform undefined values to boolean', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        value: 'checked',
        checkedValue: 'checked',
        uncheckedValue: undefined
      }
    })

    wrapper.find('.c-switch__layoutbox').trigger('click')
    expect(wrapper.vm.currentValue).toEqual(false)
    wrapper.find('.c-switch__layoutbox').trigger('click')
    expect(wrapper.vm.currentValue).toEqual('checked')

    expect(wrapper).toMatchSnapshot()
  })
})
