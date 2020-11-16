import { mount } from '@vue/test-utils'
import Vue from 'vue'
import InputNumber from './index'
import Form, { FormItem } from 'packages/form'
import {
  LONG_PRESS_DELAY,
  LONG_PRESS_INTERVAL
} from 'packages/input-number/src/directive'

const TIME_OF_LONG_PRESS = 2

function getWrapper(props) {
  return mount(InputNumber, {
    propsData: props
  })
}

function getParentWrapper(props) {
  const { value } = props
  const Demo = {
    data() {
      return {
        value
      }
    },
    render(h) {
      return <InputNumber vModel={this.value} {...{ attrs: props }} />
    }
  }
  return mount(Demo)
}

describe('[InputNumber] basics', () => {
  it('v-model works', async () => {
    const wrapper = getParentWrapper({ value: 1 })
    expect(wrapper.findComponent(InputNumber).vm.value).toBe(1)
    wrapper.vm.value = 2
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.value).toBe(2)
  })

  it('v-model works', () => {
    const wrapper = getParentWrapper({ value: 1 })
    expect(wrapper.findComponent(InputNumber).vm.$emit('update:inputNumber', 4))
    expect(wrapper.vm.value).toBe(4)
  })

  it('id attribute works', () => {
    const id = 'test'
    const wrapper = mount(InputNumber, {
      propsData: {
        id
      }
    })
    expect(wrapper.find('input').element.getAttribute('id')).toBe(id)
  })

  it('should accept different sizes', () => {
    const wrapper = getWrapper({
      size: 'large'
    })
    expect(wrapper.find('.c-input-number--large').element).toBeTruthy()
  })

  it('should accept different sizes', () => {
    const wrapper = getWrapper({
      size: 'small'
    })
    expect(wrapper.find('.c-input-number--small').element).toBeTruthy()
  })

  it('should accept different sizes', () => {
    const wrapper = getWrapper({
      size: 'normal'
    })
    expect(wrapper.find('.c-input-number--normal').element).toBeTruthy()
  })

  it('should accept different control positions', () => {
    const wrapper = getWrapper({
      controlPosition: 'up-down'
    })
    expect(wrapper.find('.c-input-number--up-down').element).toBeTruthy()
  })
  it('should accept different control positions', () => {
    const wrapper = getWrapper({
      controlPosition: 'left-right'
    })
    expect(wrapper.find('.c-input-number--left-right').element).toBeTruthy()
  })
})

describe('[InputNumber] increase & decrease control clickable', () => {
  it('should increase control disabled if input value equal or greater than max value', async () => {
    const wrapper = getWrapper({
      value: 10,
      max: 10
    })

    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeTruthy()
    wrapper.setProps({ value: 9 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeFalsy()
  })
  it('should decrease control disabled if input value equal or less than min value', async () => {
    const wrapper = getWrapper({
      value: 0,
      min: 1
    })

    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeTruthy()
    wrapper.setProps({ value: 2 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeFalsy()
  })
})

describe('[InputNumber] disabled attribute check', () => {
  it('should not decrease if disabled attr is set true', async () => {
    const wrapper = getWrapper({
      value: 2,
      min: 1,
      disabled: true
    })

    wrapper.find('.c-input-number__decrease').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.inputValueFormatted).toBe(2)
  })
})

describe('[InputNumber] input value in range', () => {
  it('should input value between min and max', async () => {
    const wrapper = getWrapper({
      min: 1,
      max: 10,
      value: 3
    })

    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeFalsy()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeFalsy()

    wrapper.setProps({ value: 10 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeFalsy()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeTruthy()

    wrapper.setProps({ value: 5 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeFalsy()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeFalsy()

    wrapper.setProps({ value: 1 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeTruthy()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeFalsy()

    wrapper.setProps({ value: 0 })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-input-number__decrease[aria-disabled="true"]').element
    ).toBeTruthy()
    expect(
      wrapper.find('.c-input-number__increase[aria-disabled="true"]').element
    ).toBeFalsy()
  })
})

describe('[InputNumber] steps check', () => {
  it('should input value changed by each step', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(6)
  })
  it('should input value changed by each step and less than max value', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, max: 5 })
    wrapper.find('.c-input-number__increase').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(5)
  })
  it('should input value changed by each step', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(-4)
  })
  it('should input value changed by each step and great than min value', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, min: 0 })
    wrapper.find('.c-input-number__decrease').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(0)
  })
})

describe('[InputNumber] precision check', () => {
  it('should input value keep its precision when increase', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 0.05, precision: 3 })
    wrapper.find('.c-input-number__increase').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      '1.050'
    )
  })
  it('should input value keep its precision when decrease', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 0.05, precision: 3 })
    wrapper.find('.c-input-number__decrease').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      '0.950'
    )
  })
  it('should emit number when precision is set', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 0.05, precision: 3 })
    wrapper.find('.c-input-number__decrease').trigger('click')
    await Vue.nextTick()
    expect(
      wrapper.findComponent(InputNumber).emitted().change?.[0]?.[0]?.target
        ?.value
    ).toBe(0.95)
  })
})

describe('[InputNumber] input value check', () => {
  it('display value should be the last value, if passing value(props) is a string or contains alphabet', () => {
    const wrapper = getWrapper({
      value: 1
    })
    wrapper.setProps({
      value: 'abc'
    })
    expect(wrapper.vm.inputValueFormatted).toBe(1)
  })
  it('should be the min value, if input value less than the min value', async () => {
    const wrapper = getParentWrapper({ value: 1, min: 10 })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(10)
  })
  it('should be the max value, if input value greater than the max value', async () => {
    const Demo = {
      data() {
        return {
          iptValue: 10
        }
      },
      render(h) {
        return <InputNumber vModel={this.iptValue} max={5} />
      }
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(5)
  })
  it('value should be keep its precision if precision value was set, and the value should be greater than the min value at the same time', async () => {
    const wrapper = getParentWrapper({ value: 1, min: 10, precision: 2 })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      '10.00'
    )
  })
  it('value should be keep its precision if precision value was set, and the value should be less than the max value at the same time', async () => {
    const wrapper = getParentWrapper({ value: 10, max: 5, precision: 2 })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      '5.00'
    )
  })
  it('should plus or minus step each time, if stepFixed is set true and we use Math.round to get the final value at the same time', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, stepFixed: true })
    const inputEle = wrapper
      .findComponent(InputNumber)
      .find('.c-input-number__inner')
    inputEle.element.value = '9'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('11')
  })

  it('should plus or minus step each time, if stepFixed is set true and we use Math.round to get the final value at the same time', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, stepFixed: true })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = '15'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('16')
  })

  it('should be the input value, if stepFixed is set false', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = '8'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('8')
  })

  it('should plus or minus step each time, if stepFixed is set true', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, stepFixed: true })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = '7'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('6')
  })

  it('should use `min` as stepOrigin when it is not Infinity-ish', async () => {
    const wrapper = getParentWrapper({
      value: 1,
      min: 0,
      step: 5,
      stepFixed: true
    })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = '6'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('5')
  })

  it('should use `0` as stepOrigin when both `min` and `value` are Infinity-ish', async () => {
    const wrapper = getParentWrapper({
      value: -Infinity,
      step: 5,
      stepFixed: true
    })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = '7'
    inputEle.trigger('input')
    inputEle.trigger('change')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('5')
  })
})

describe('[InputNumber] input value type check', () => {
  it('value should be empty string, if input value is not a number', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, stepFixed: true })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = 'vagr'
    inputEle.trigger('input')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('')
  })

  it('display value should be empty, if input value is empty', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5, stepFixed: true })
    const inputEle = wrapper.find('.c-input-number__inner')
    inputEle.element.value = ''
    inputEle.trigger('input')
    await Vue.nextTick()
    expect(inputEle.element.value).toBe('')
    // expect(wrapper).toBe(null)
  })

  it('leave nullish default value untouched and display like empty', async () => {
    const Demo = {
      data() {
        return {
          min: 0,
          max: 10,
          value: null
        }
      },
      render() {
        return <InputNumber vModel={this.value} min={this.min} max={this.max} />
      }
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    const inputElement = wrapper.find('input').element
    expect(inputElement.value).toBe('')
    wrapper.setData({
      value: 11
    })
    await Vue.nextTick()
    expect(inputElement.value).toBe('10')
    // set to `null` later
    wrapper.setData({
      value: null
    })
    await Vue.nextTick()
    expect(inputElement.value).toBe('')
  })
})

describe('[InputNumber] keydown button check', () => {
  it('value should be added by the number of step, if ArrowUp is pressed', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper
      .find('.c-input-number__inner')
      .trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(6)
  })
  it('value should be deducted by the number of step, if ArrowDown is pressed', async () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper
      .find('.c-input-number__inner')
      .trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(5)
  })

  it('value should be no change, if keydown.insert key is pressed', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper
      .find('.c-input-number__inner')
      .trigger('keydown', { code: 'insert' })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(1)
  })
})

describe('[InputNumber] enter&space button check', () => {
  it('value should be added by the number of step, if enter is pressed on increase button', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('keydown.enter')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(6)
  })
  it('value should be deducted by the number of step, if enter is pressed on decrease button', async () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('keydown.enter')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(5)
  })

  it('value should be plus, if space is pressed on increase button', async () => {
    const wrapper = getParentWrapper({ value: 1 })
    wrapper.find('.c-input-number__increase').trigger('keydown.space')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(2)
  })
  it('value should be minus, if space is pressed on decrease button', async () => {
    const wrapper = getParentWrapper({ value: 10 })
    wrapper.find('.c-input-number__decrease').trigger('keydown.space')
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(9)
  })
})

describe('[InputNumber] out of [up, down, enter, space] button check', () => {
  it('value should be no change, if backspace is pressed on increase button', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('keydown', { code: 8 })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(1)
  })

  it('value should be no change, if insert is pressed on increase button', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('keydown', { code: 45 })
    await Vue.nextTick()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(1)
  })
})

describe('[InputNumber] unbind the longpress directive', () => {
  const wrapper = getParentWrapper({ value: 1, step: 5 })
  wrapper.findComponent(InputNumber).vm.$destroy()
})

describe('[InputNumber] increase and decrease longpress check', () => {
  beforeAll(jest.useFakeTimers)
  afterAll(jest.useRealTimers)
  it('value should increase, if pressing on increase button is long and event.button equals 0', async () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('mousedown', {
      button: 0
    })
    // forward timer so trigger one add operation
    jest.advanceTimersByTime(LONG_PRESS_DELAY + LONG_PRESS_INTERVAL)
    // make sure UI get updated
    await Vue.nextTick()
    // trigger for another add operation
    jest.advanceTimersByTime(LONG_PRESS_INTERVAL)
    // make sure UI get updated
    await Vue.nextTick()
    wrapper.find('.c-input-number__increase').trigger('mouseleave')

    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      1 + TIME_OF_LONG_PRESS * 5
    )
  })

  it('value should be decrease, if pressing on decrease button is long and event.button equals 0', async () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('mousedown', {
      button: 0
    })

    await Vue.nextTick()
    // forward timer so trigger one add operation
    jest.advanceTimersByTime(LONG_PRESS_DELAY + LONG_PRESS_INTERVAL)
    // make sure UI get updated
    await Vue.nextTick()
    // trigger for another add operation
    jest.advanceTimersByTime(LONG_PRESS_INTERVAL)
    // make sure UI get updated
    await Vue.nextTick()
    wrapper.find('.c-input-number__decrease').trigger('mouseleave')
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(
      10 - TIME_OF_LONG_PRESS * 5
    )
  })

  it('value should be no change, if pressing on decrease button is long and event.button equals 0, but the time is less than min interval', () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('mousedown', {
      button: 0
    })

    setTimeout(_ => {
      wrapper.find('.c-input-number__decrease').trigger('mouseout')
    }, 5)

    jest.runOnlyPendingTimers()
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(10)
  })

  it('value should be no change, when mouseout event triggered before mousedown', async () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('mouseout', {
      button: 0
    })
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(10)
  })

  it('value should be no change, if pressing on increase button is mousedown, but event.button equals 1', () => {
    const wrapper = getParentWrapper({ value: 1, step: 5 })
    wrapper.find('.c-input-number__increase').trigger('mousedown', {
      button: 1
    })
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(1)
  })
  it('value should be no change, if pressing on decrease button is mousedown, but event.button equals 1', () => {
    const wrapper = getParentWrapper({ value: 10, step: 5 })
    wrapper.find('.c-input-number__decrease').trigger('mousedown', {
      button: 1
    })
    expect(wrapper.findComponent(InputNumber).vm.inputValueFormatted).toBe(10)
  })

  it('should increase value based on last edit from `<input />`', async () => {
    const wrapper = getParentWrapper({ precision: 3, value: 1 })
    const input = wrapper.find('input')
    input.element.value = '2'
    await Vue.nextTick()
    wrapper.find('.c-input-number__increase').trigger('click')
    await Vue.nextTick()
    expect(input.element.value).toBe('3.000')
  })
})

describe('[InputNumber] form validation', () => {
  it('should throw error with given validation setup', async () => {
    const maxNumber = 10
    const minNumber = 5
    const maxErrorMessage = `over ${maxNumber}`
    const minErrorMessage = `less than ${minNumber}`
    const Demo = {
      data() {
        return {
          form: {
            number: 6
          },
          rules: {
            number: [
              {
                trigger: 'change',
                validator(rule, value) {
                  if (value > maxNumber) {
                    return new Error(maxErrorMessage)
                  }
                  if (value < minNumber) {
                    return new Error(minErrorMessage)
                  }
                  return true
                }
              },
              {
                trigger: 'blur',
                validator(rule, value) {
                  if (value > maxNumber) {
                    return new Error(maxErrorMessage)
                  }
                  if (value < minNumber) {
                    return new Error(minErrorMessage)
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
          <Form props={{ model: this.form }} rules={this.rules}>
            <FormItem prop="number">
              <InputNumber vModel={this.form.number} />
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Demo)
    const input = wrapper.find('input')
    const getError = () => wrapper.find('.c-form-item__error')
    expect(getError().element).toBeFalsy()
    wrapper.vm.form.number = minNumber - 1
    input.trigger('blur')
    await Vue.nextTick()
    expect(getError().text()).toBe(minErrorMessage)
    wrapper.vm.form.number = minNumber + 1
    input.trigger('blur')
    await Vue.nextTick()
    expect(getError().element).toBeFalsy()
    wrapper.vm.form.number = maxNumber + 1
    input.trigger('change')
    await Vue.nextTick()
    // for 'change' event
    // input-number will auto-correct value for min and max
    expect(getError().element).toBeFalsy()
  })
})

describe('[InputNumber] change event', () => {
  it('should emit `change` event properly', async () => {
    const Demo = {
      data() {
        return {
          value: 1
        }
      },
      render() {
        return (
          <InputNumber
            vModel={this.value}
            on-change={() => this.$emit('change')}
          />
        )
      }
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    expect(wrapper.emitted().change).toBeFalsy()
    // spin button should trigger `change`
    const increaseButton = wrapper.find('.c-input-number__increase')
    increaseButton.trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted().change.length).toBe(1)

    // shouldn't emit `change` if the input.value is unchanged
    const inputField = wrapper.find('input')
    inputField.trigger('change')
    await Vue.nextTick()
    expect(wrapper.emitted().change.length).toBe(1)

    // should emit `change` if the input.value is changed
    inputField.element.value = `${wrapper.vm.value + 1}`
    inputField.trigger('change')
    await Vue.nextTick()
    expect(wrapper.emitted().change.length).toBe(2)
    inputField.element.value = ''
    inputField.trigger('change')
    await Vue.nextTick()
    expect(wrapper.emitted().change.length).toBe(3)
  })
  it('should not emit `change` event when the formatted value is the same as last emitted one', async () => {
    const wrapper = mount(InputNumber, {
      propsData: {
        precision: 2,
        value: 1
      }
    })

    await Vue.nextTick()
    const input = wrapper.find('input')
    input.element.value = '1.001'
    input.trigger('change')
    // due to the `precision` setup
    // input.element.value should be changed back to `1.00`
    // which is the same as original one
    // therefore no `change` event should be emitted
    await Vue.nextTick()
    expect(wrapper.emitted().change).toBeFalsy()
    // input.element.value will get updated to `1.01`
    // `change` event should be emitted
    input.element.value = '1.01'
    input.trigger('change')
    await Vue.nextTick()
    expect(wrapper.emitted().change.length).toBe(1)
  })
})
