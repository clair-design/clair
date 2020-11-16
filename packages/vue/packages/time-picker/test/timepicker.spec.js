import { mount, createWrapper } from '@vue/test-utils'
import Vue from 'vue'
import Popover from 'packages/popover'
import TimePicker from '../src/index'
import { getSplitTime, createArr, checkTime } from '../src/utils'
import Form, { FormItem } from '../../form'

const {
  props: { hideDelay }
} = Popover

const originalConsoleError = console.error
beforeAll(() => {
  console.error = () => void 0
})

afterAll(() => {
  console.error = originalConsoleError
})

describe('[TimePicker] test utils function', () => {
  it('works with createArr', () => {
    const arr = createArr(5)
    expect(['00', '01', '02', '03', '04']).toEqual(expect.arrayContaining(arr))
  })
  it('works with checkTime without hour', () => {
    const { valid } = checkTime({
      value: '14:34',
      format: 'mm:ss',
      minTime: '10:23',
      maxTime: '12:32'
    })
    expect(valid).toBeFalsy()
  })
  it('works with checkTime without minute', () => {
    const { valid } = checkTime({
      value: '14:54',
      format: 'hh:ss'
    })
    expect(valid).toBeTruthy()
  })
  it('works with checkTime about hour out of range', () => {
    const { valid } = checkTime({
      value: '34:77:88',
      format: 'hh:mm:ss'
    })
    expect(valid).toBeFalsy()
  })
  it('works with getSplitTime with hh:mm:ss', () => {
    const hour = 13
    const minute = 25
    const second = 36
    const [splitHour, splitMinute, splitSecond] = getSplitTime(
      `${hour}:${minute}:${second}`,
      'hh:mm:ss'
    )
    expect(splitHour).toBe(hour)
    expect(splitMinute).toBe(minute)
    expect(splitSecond).toBe(second)
  })
  it('works with getSplitTime with hh:mm', () => {
    const hour = 13
    const minute = 25
    const [splitHour, splitMinute] = getSplitTime(`${hour}:${minute}`, 'hh:mm')
    expect(splitHour).toBe(hour)
    expect(splitMinute).toBe(minute)
  })
  it('works with getSplitTime with mm:ss', () => {
    const second = 13
    const minute = 25
    const [splitHour, splitMinute, splitSecond] = getSplitTime(
      `${minute}:${second}`,
      'mm:ss'
    )
    expect(splitHour).toBe('')
    expect(splitSecond).toBe(second)
    expect(splitMinute).toBe(minute)
  })
  it('works with getSplitTime with single', () => {
    const num = 13
    const [splitHour] = getSplitTime(`${num}`, 'hh')
    expect(splitHour).toBe(num)
    const [noHour, splitMinute] = getSplitTime(`${num}`, 'mm')
    expect(noHour).toBe('')
    expect(splitMinute).toBe(num)
    const [withoutHour, withoutMinute, splitSecond] = getSplitTime(
      `${num}:${num}`,
      'ss'
    )
    expect(withoutHour).toBe('')
    expect(withoutMinute).toBe('')
    expect(splitSecond).toBe(num)
    const [hour1, minute1, second1] = getSplitTime(`${num}`, 'ss')
    expect(hour1).toBe('')
    expect(minute1).toBe('')
    expect(second1).toBe(num)
  })
  it('works with getSplitTime with mm:ss', () => {
    const minute = 32
    const second = 45
    const [splitHour, splitMinute, splitSecond] = getSplitTime(
      `${minute}:${second}`,
      'mm:ss'
    )
    expect(splitHour).toBe('')
    expect(splitMinute).toBe(minute)
    expect(splitSecond).toBe(second)
  })
  it('works with null', () => {
    const [hour, minute, second] = getSplitTime('', 'hh:mm:ss')
    expect(hour).toBe('')
    expect(minute).toBe('')
    expect(second).toBe('')
  })
})

describe('[TimePicker] basic', () => {
  const text = 'test'
  const wrapper = mount(TimePicker, {
    propsData: {
      placeholder: text,
      value: '12:23:45',
      minTime: '00:00:00',
      maxTime: '23:59:59'
    }
  })
  it('works with placeholder', () => {
    expect(wrapper.contains('.c-time-picker')).toBeTruthy()
    expect(wrapper.contains('input')).toBeTruthy()
    expect(wrapper.find('input').element.getAttribute('placeholder')).toBe(text)
  })
  it('works with value', async () => {
    expect(wrapper.find('input').element.value).toBe('12:23:45')
    const hour = '10'
    const minute = '10'
    const second = '10'
    wrapper.setProps({
      value: `${hour}:${minute}:${second}`
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.value).toBe(
      `${hour}:${minute}:${second}`
    )
    wrapper.find('.c-time-picker').trigger('click')
    await Vue.nextTick()
    const body = createWrapper(document.body)

    const ulList = body.findAll('ul')
    expect(ulList.at(0).find('li[aria-selected="true"]').text()).toBe(hour)
    expect(ulList.at(1).find('li[aria-selected="true"]').text()).toBe(minute)
  })
  it('works with size', async () => {
    wrapper.setProps({
      size: 'small'
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-input--small')).toBeTruthy()
    const body = createWrapper(document.body)
    expect(body.find('.c-time-picker-popup')).toBeTruthy()
    expect(body.find('.c-time-picker-popup--small')).toBeTruthy()
    wrapper.setProps({
      size: 'large'
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-input--large')).toBeTruthy()
    expect(body.find('.c-time-picker-popup--large')).toBeTruthy()
  })
  it('works with container clicked', () => {
    jest.useFakeTimers()
    wrapper.find('.c-time-picker').trigger('click')
    jest.advanceTimersByTime(1)
    expect(wrapper.vm.isVisible).toBe(true)
    jest.useRealTimers()
  })
  it('works with disabled', async () => {
    wrapper.setProps({
      disabled: true
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.disabled).toBe(true)
  })
  it('works with format hh:mm', async () => {
    const hour = `0${new Date().getHours()}`.slice(-2)
    const minute = `0${new Date().getMinutes()}`.slice(-2)
    wrapper.setData({
      isVisible: false
    })
    await Vue.nextTick()
    wrapper.setProps({
      disabled: false,
      format: 'hh:mm',
      value: `${hour}:${minute}`
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.value).toBe(`${hour}:${minute}`)
    wrapper.find('.c-time-picker').trigger('click')
    const body = createWrapper(document.body)
    const ulList = body.findAll('ul')
    await Vue.nextTick()
    expect(ulList.at(0).find('li[aria-selected="true"]').text()).toBe(hour)
  })
  it('works with format mm:ss', async () => {
    const minute = `0${new Date().getMinutes()}`.slice(-2)
    const second = `0${new Date().getSeconds()}`.slice(-2)
    wrapper.setData({
      isVisible: false
    })
    await Vue.nextTick()
    wrapper.setProps({
      disabled: false,
      format: 'mm:ss',
      value: `${minute}:${second}`
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.value).toBe(`${minute}:${second}`)
    wrapper.find('.c-time-picker').trigger('click')
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const ulList = body.findAll('ul')
    await Vue.nextTick()
    expect(ulList.at(0).find('li[aria-selected="true"]').text()).toBe(minute)
  })
  it('works with format ss', async () => {
    const second = `0${new Date().getSeconds()}`.slice(-2)
    wrapper.setData({
      isVisible: false
    })
    await Vue.nextTick()
    wrapper.setProps({
      disabled: false,
      format: 'ss',
      value: `${second}`
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.value).toBe(`${second}`)
    wrapper.find('.c-time-picker').trigger('click')
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const ulList = body.findAll('ul')
    await Vue.nextTick()
    expect(ulList.at(0).find('li[aria-selected="true"]').text()).toBe(second)
  })
  it('works with clear button', async () => {
    wrapper.setData({ isVisible: true })
    wrapper.find('.c-icon--svg-circle').trigger('click')
    expect(wrapper.vm.time).toBe('')
    expect(wrapper.vm.canBeCleared).toBe(false)

    // hide panel after click
    const panel = createWrapper(wrapper.vm.$refs.timePanel)
    expect(panel.isVisible()).toBe(false)
  })
  it('works with time item clicked in panel', async () => {
    jest.useFakeTimers()
    wrapper.setProps({
      format: 'hh',
      maxTime: '12:12:12'
    })
    wrapper.find('.c-time-picker').trigger('click')
    await Vue.nextTick()
    const body = createWrapper(document.body)
    const ulList = body.findAll('ul')
    const position = 9
    ulList.at(0).findAll('li').at(position).trigger('click')
    await Vue.nextTick()
    jest.runAllTimers()
    expect(ulList.at(0).find('li[aria-selected="true"]').text()).toBe(
      `0${position}`
    )
    expect(wrapper.vm.time).toBe(`0${position}`)
    const maxNum = 15
    ulList.at(0).findAll('li').at(maxNum).trigger('click')
    await Vue.nextTick()
    jest.runAllTimers()
    expect(wrapper.vm.time).toBe(`0${position}`)
  })
  it('works with time gt maxTime', async () => {
    const mockedDate = new Date('2020-03-03 15:34:22')
    global.Date = jest.fn(() => mockedDate)
    const Demo = {
      data() {
        return {
          value: '00:00:00',
          maxTime: '12:34:45'
        }
      },
      render() {
        return (
          <TimePicker
            vModel={this.value}
            maxTime={this.maxTime}
            on-change={() => this.$emit('change')}
          />
        )
      }
    }
    const newTime = '23:12:34'
    const customWrapper = mount(Demo)
    // update time
    customWrapper.setData({ value: newTime })
    await Vue.nextTick()
    expect(customWrapper.vm.value).toBe(newTime)
    global.Date = Date
  })
  it('works with time lt minTime', async () => {
    const mockedDate = new Date('2020-03-03 12:34:22')
    global.Date = jest.fn(() => mockedDate)
    const Demo = {
      data() {
        return {
          value: '',
          minTime: '18:00:00'
        }
      },
      render() {
        return (
          <TimePicker
            vModel={this.value}
            minTime={this.minTime}
            on-change={() => this.$emit('change')}
          />
        )
      }
    }
    const newTime = '11:23:56'
    const customWrapper = mount(Demo)
    await Vue.nextTick()
    const input = customWrapper.find('input')
    input.trigger('click')
    await Vue.nextTick()
    input.setValue(newTime)
    await Vue.nextTick()

    expect(customWrapper.vm.time).toBeUndefined()
    global.Date = Date
  })
  it('should work with form validation', async () => {
    const message = 'fail'
    const Component = {
      data() {
        return {
          form: {
            time: ''
          },
          rules: {
            time: [
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
            <FormItem prop="time" label="">
              <TimePicker vModel={this.form.time} />
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Component)
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
    wrapper.vm.form.time = '10:23:21'
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').element).toBeFalsy()
  })
})

describe('[TimePicker] event', () => {
  beforeAll(() => {
    document.body.innerHTML = ''
    jest.useFakeTimers()
  })
  afterAll(jest.useRealTimers)
  it('should emit `change` as design', async () => {
    const clickArea = document.createElement('div')

    document.body.append(clickArea)
    const Demo = {
      data() {
        return {
          value: '00:00:00'
        }
      },
      render() {
        return (
          <TimePicker
            vModel={this.value}
            on-change={() => this.$emit('change')}
          />
        )
      }
    }
    const wrapper = mount(Demo)
    const newTime = '01:00:00'
    await Vue.nextTick()
    const popover = wrapper.find(Popover)
    // cancel transition
    popover.setProps({
      transition: 'none'
    })
    const input = wrapper.find('input')
    input.trigger('click')
    jest.advanceTimersByTime(1)
    await Vue.nextTick()
    expect(popover.vm.isVisible).toBeTruthy()

    // update time
    input.setValue(newTime)
    await Vue.nextTick()

    // trigger close
    clickArea.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    jest.advanceTimersByTime(hideDelay.default)
    await Vue.nextTick()

    expect(popover.vm.isVisible).toBeFalsy()
    expect(wrapper.emitted().change.length).toBe(1)

    // repeat and won't trigger another `change`
    input.trigger('click')
    jest.advanceTimersByTime(1)
    await Vue.nextTick()
    expect(popover.vm.isVisible).toBeTruthy()

    // update time
    input.setValue(newTime)
    await Vue.nextTick()

    // trigger close
    clickArea.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    jest.advanceTimersByTime(hideDelay.default)
    await Vue.nextTick()

    expect(popover.vm.isVisible).toBeFalsy()
    expect(wrapper.emitted().change.length).toBe(1)
  })
})

describe('[TimePicker] range', () => {
  const startPlaceholder = 'start time'
  const endPlaceholder = 'end time'
  const start = '10:11:45'
  const end = '14:23:45'
  const wrapper = mount(TimePicker, {
    propsData: {
      startPlaceholder,
      endPlaceholder,
      isRange: true,
      value: [start, end]
    }
  })
  const inputArr = wrapper.findAll('input')
  const inputStart = inputArr.at(0)
  const inputEnd = inputArr.at(1)
  it('works with placeholder', () => {
    expect(wrapper.contains('.c-time-picker-range')).toBeTruthy()
    expect(inputArr).toHaveLength(2)
    expect(inputStart.element.getAttribute('placeholder')).toBe(
      startPlaceholder
    )
    expect(inputEnd.element.getAttribute('placeholder')).toBe(endPlaceholder)
    const body = createWrapper(document.body)
    expect(body.findAll('.c-time-picker-list-group')).toBeTruthy()
  })
  it('works with value', () => {
    expect(inputStart.element.value).toBe(start)
    expect(inputEnd.element.value).toBe(end)
  })
  it('works with size', async () => {
    wrapper.setProps({
      size: 'small'
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-time-picker-range--small')).toBeTruthy()
    wrapper.setProps({
      size: 'large'
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-time-picker-range--large')).toBeTruthy()
  })
  it('works with value', async () => {
    const startTime = '10:12:23'
    const endTime = '15:23:45'
    wrapper.setProps({
      value: [startTime, endTime]
    })
    await Vue.nextTick()
    expect(inputStart.element.value).toBe(startTime)
    expect(inputEnd.element.value).toBe(endTime)
    wrapper.find('.c-time-picker-range').trigger('mouseenter')
    expect(wrapper.vm.isHovering).toBe(true)
  })
  it('works with container clicked', async () => {
    jest.useFakeTimers()
    expect(wrapper.vm.isVisible).toBeFalsy()
    wrapper.find('.c-time-picker-range').trigger('click')
    await Vue.nextTick()
    jest.runAllTimers()
    expect(wrapper.vm.isVisible).toBe(true)
    // trigger watcher to run
    await Vue.nextTick()
    expect(wrapper.find('.c-time-picker-popup')).toBeTruthy()
    document.body.dispatchEvent(new Event('click'))
    await Vue.nextTick()
    jest.runAllTimers()
    expect(wrapper.vm.isVisible).toBe(false)
    jest.useRealTimers()
  })
  it('works with clear', async () => {
    wrapper.setData({ isVisible: false })
    await Vue.nextTick()
    wrapper.find('.c-icon--svg-circle').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.startTime).toBe('')
    expect(wrapper.vm.endTime).toBe('')
    expect(wrapper.emitted().change.length).toBe(1)
  })
  it('should update value when startTime and endTime are both valid', async () => {
    wrapper.setData({ isVisible: true, value: [] })
    await Vue.nextTick()
    const timeArr = ['00:00:00', '01:00:00']
    const [start, end] = timeArr
    const startInput = wrapper.findAll('input').at(0)
    const endInput = wrapper.findAll('input').at(1)
    startInput.element.value = start
    endInput.element.value = end
    document.body.dispatchEvent(new Event('click'))
    await Vue.nextTick()
    expect(wrapper.vm.value.every((time, i) => time === timeArr[i])).toBe(true)
  })
  it('should not update value when only one of time-range is valid', async () => {
    wrapper.setData({ isVisible: true, value: [] })
    await Vue.nextTick()
    const timeArr = ['00:00:00', '']
    const [start, end] = timeArr
    const startInput = wrapper.findAll('input').at(0)
    const endInput = wrapper.findAll('input').at(1)
    startInput.element.value = start
    endInput.element.value = end
    document.body.dispatchEvent(new Event('click'))
    await Vue.nextTick()
    expect(wrapper.vm.value.length).toBe(0)
  })
  it('works with disabled', async () => {
    wrapper.setProps({
      disabled: true
    })
    await Vue.nextTick()
    expect(wrapper.find('input').element.disabled).toBe(true)
    expect(inputStart.element.getAttribute('disabled')).toBe('disabled')
    expect(inputEnd.element.getAttribute('disabled')).toBe('disabled')
  })
  it('should work with form validation when value change', async () => {
    const message = 'fail'
    const Component = {
      data() {
        return {
          form: {
            timeRange: ''
          },
          rules: {
            timeRange: [
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
            <FormItem prop="timeRange" label="">
              <TimePicker vModel={this.form.timeRange} />
            </FormItem>
          </Form>
        )
      }
    }
    const wrapper = mount(Component)
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').text()).toBe(message)
    wrapper.vm.form.timeRange = ['10:23:21', '12:34:22']
    wrapper.vm.$refs.form.validate()
    await Vue.nextTick()
    expect(wrapper.find('.c-form-item__error').element).toBeFalsy()
  })
})
