import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Switch from './'

describe('Switch: Base', () => {
  const wrapper = shallowMount(Switch)
  it('should contain label element with right className', () => {
    expect(
      wrapper.find('label.c-switch.c-switch--normal').exists()
    ).toBeTruthy()
  })
  it('should contain input element with right type/className', () => {
    expect(
      wrapper.find('input.c-switch__input[type="checkbox"]').exists()
    ).toBeTruthy()
  })
  it('should contain span element as switchBox', () => {
    expect(wrapper.find('span.c-switch__box').exists()).toBeTruthy()
  })
  it('should not contain span element as switchLabel', () => {
    expect(wrapper.find('span.c-switch__label').exists()).toBe(false)
  })
})

describe('Switch: Set slots', () => {
  it('should contain checked slot', () => {
    const wrapper = shallowMount({
      render() {
        return (
          <Switch>
            <template slot="checked">on</template>
          </Switch>
        )
      }
    })
    expect(wrapper.text()).toContain('on')
  })
  it('should contain unChecked slot', () => {
    const wrapper = shallowMount({
      render() {
        return (
          <Switch>
            <template slot="unChecked">off</template>
          </Switch>
        )
      }
    })
    expect(wrapper.text()).toContain('off')
  })
})

describe('Switch: Set size', () => {
  it('should contain label element with right className', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        size: 'small'
      }
    })
    expect(wrapper.find('label.c-switch.c-switch--small').exists()).toBeTruthy()
  })
  it('should not add className to label element with wrong size', () => {
    const wrapper = shallowMount(Switch, {
      propsData: {
        size: 'large'
      }
    })
    expect(wrapper.find('label.c-switch').exists()).toBeTruthy()
    expect(wrapper.find('label.c-switch.c-switch--large').exists()).toBe(false)
  })
})

describe('Switch: Set disabled', () => {
  const wrapper = shallowMount(Switch, {
    propsData: {
      disabled: true
    }
  })
  it('should contain input element with right type/className/disabled', () => {
    expect(
      wrapper.find('input.c-switch__input[type="checkbox"][disabled]').exists()
    ).toBeTruthy()
  })
})

describe('Switch: Set checked/unChecked backgroundColor', () => {
  const checkedColor = 'rgb(0, 107, 255)'
  const unCheckedColor = 'rgb(207, 208, 211)'
  const Demo = {
    data() {
      return {
        checkedColor,
        unCheckedColor,
        checked: false
      }
    },
    render(h) {
      return (
        <Switch
          vModel={this.checked}
          unCheckedColor={this.unCheckedColor}
          checkedColor={this.checkedColor}
        />
      )
    }
  }
  const wrapper = mount(Demo)
  const label = wrapper.find('label')
  test('switchBox checked/unChecked should get right backgroundColor', async () => {
    label.trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('.c-switch__box').element.style.background).toBe(
      checkedColor
    )
    label.trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('.c-switch__box').element.style.background).toBe(
      unCheckedColor
    )
  })
})

describe('Switch: Set callback of change', () => {
  const changeFn = jest.fn()
  const wrapper = shallowMount(Switch, {
    listeners: {
      change: changeFn
    }
  })
  it('should emit change event', () => {
    wrapper.find('input[type="checkbox"]').trigger('change')
    expect(changeFn).toBeCalledTimes(1)
  })
})
