import { mount, createWrapper } from '@vue/test-utils'
import Vue from 'vue'
import Datepicker from './index'

const clear = () => {
  document
    .querySelectorAll('.c-date-picker-popup')
    ?.forEach(dom => dom.remove())
}
const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
const waitTime = 100
const TWO = 2
const THREE = 3
const FORE = 4
const SIX = 6
const EIGHT = 8

describe('[Datepicker] type date', () => {
  const demo = {
    data() {
      return {
        value: '2019-12-12'
      }
    },
    render(h) {
      return (
        <Datepicker vModel={this.value} ref="datepicker">
          <div slot="shortcut">
            <button>今天</button>
          </div>
        </Datepicker>
      )
    }
  }

  it('basic create', async () => {
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)
    expect(wrapper.vm.type).toBe('date')
    expect(wrapper.find('.c-date-picker').element).toBeTruthy()
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    await sleep(waitTime)
    const daysBody = document.querySelector(
      '.c-date-picker-popup .c-date-picker-calendar__days__body'
    )
    expect(daysBody).toBeTruthy()
    expect(
      daysBody.querySelector('.c-date-picker__day--selected').innerHTML
    ).toBe('12')
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.vm.isOpened).toBeFalsy()
  })
  it('keyboard event', async () => {
    clear()
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    picker.trigger('keydown', { code: 'Escape' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeFalsy()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active')?.innerHTML
    ).toBe('19')
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active')?.innerHTML
    ).toBe('20')
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active')?.innerHTML
    ).toBe('13')
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active')?.innerHTML
    ).toBe('11')
    const popup = document.querySelector('.c-date-picker-popup')
    popup.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }))
  })
})
describe('[Datepicker] wrong input value', () => {
  it('invalid input value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: '2019/10~15'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    const daysBody = document.querySelector(
      '.c-date-picker-popup .c-date-picker-calendar__days__body'
    )
    expect(daysBody.querySelector('.c-date-picker__day--selected')).toBeFalsy()
  })
  it('create with empty value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: '',
        type: 'week'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(document.querySelectorAll('.c-date-picker-week-row').length).toBe(
      SIX
    )
    expect(
      document.querySelectorAll('.c-date-picker__week--active').length
    ).toBe(0)
  })
})
describe('[Datepicker] type week', () => {
  const demo = {
    data() {
      return {
        value: '2021w01'
      }
    },
    render(h) {
      return (
        <Datepicker
          vModel={this.value}
          type="week"
          firstDayOfWeek={1}
          ref="weekpicker"
        />
      )
    }
  }
  it('create with value', async () => {
    clear()

    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.weekpicker)
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    const selected = document.querySelectorAll(
      '.c-date-picker-popup [aria-selected=true]'
    )
    expect(selected.length).toBe(1)
    expect(selected[0].querySelector('span').innerHTML).toBe('4')
    wrapper.find('.c-date-picker').trigger('keydown', { code: 'ArrowDown' })
  })
  it('keyboard event', async () => {
    clear()

    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.weekpicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    const active = document.querySelectorAll('.c-date-picker__week--active')
    expect(active.length).toBe(1)
    expect(active[0].querySelector('span').innerHTML).toBe('11')
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__week--active span').innerHTML
    ).toBe('18')
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__week--active span').innerHTML
    ).toBe('28')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('2020w53')
  })
})
describe('[Datepicker] type month', () => {
  it('create with empty value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: '',
        type: 'month'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    expect(
      document.querySelectorAll('.c-date-picker__month--current').length
    ).toBe(1)
    wrapper.find('.c-date-picker').trigger('keydown', { code: 'ArrowDown' })
  })
  it('keyboard event', async () => {
    clear()

    const demo = {
      data() {
        return {
          value: '2020-02'
        }
      },
      render(h) {
        return <Datepicker vModel={this.value} type="month" ref="monthpicker" />
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.monthpicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()

    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    const active = document.querySelectorAll('.c-date-picker__month--active')
    expect(active.length).toBe(1)
    expect(active[0].innerHTML).toBe('五月')
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__month--active').innerHTML
    ).toBe('六月')
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__month--active').innerHTML
    ).toBe('一月')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('2020-01')
  })
})
describe('[Datepicker] type quarter', () => {
  it('create with empty value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: '',
        type: 'quarter'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    expect(
      document.querySelectorAll('.c-date-picker__quarter--current').length
    ).toBe(1)
    wrapper.find('.c-date-picker').trigger('keydown', { code: 'ArrowDown' })
  })
  it('keyboard event', async () => {
    clear()

    const demo = {
      data() {
        return {
          value: '2020q1'
        }
      },
      render(h) {
        return (
          <Datepicker vModel={this.value} type="quarter" ref="quarterpicker" />
        )
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.quarterpicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()

    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    const active = document.querySelectorAll(
      '.c-date-picker__quarter--active span'
    )
    expect(active.length).toBe(THREE)
    expect(active[0].innerHTML).toBe('四月')
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__quarter--active span').innerHTML
    ).toBe('七月')
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__quarter--active span').innerHTML
    ).toBe('十月')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('2019q4')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()

    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    const active2 = document.querySelector('.c-date-picker__quarter--active')
    expect(active2.querySelector('span').innerHTML).toBe('一月')

    active2.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    active2.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
})
describe('[Datepicker] type year', () => {
  it('create with empty value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: '',
        type: 'year'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    expect(
      document.querySelectorAll('.c-date-picker__year--current').length
    ).toBe(1)
    wrapper.find('.c-date-picker').trigger('keydown', { code: 'ArrowDown' })
  })
  it('keyboard event', async () => {
    clear()

    const demo = {
      data() {
        return {
          value: '2020'
        }
      },
      render(h) {
        return <Datepicker vModel={this.value} type="year" ref="yearpicker" />
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.yearpicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()

    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    const active = document.querySelectorAll('.c-date-picker__month--active')
    expect(active.length).toBe(1)
    expect(active[0].innerHTML).toBe('2023')
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__month--active').innerHTML
    ).toBe('2024')
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__month--active').innerHTML
    ).toBe('2020')
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('2019')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    document
      .querySelector('.c-date-picker__month--active')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
})
describe('[Datepicker] type daterange', () => {
  it('create with empty value', async () => {
    clear()

    const wrapper = mount(Datepicker, {
      propsData: {
        value: [],
        type: 'daterange'
      }
    })
    wrapper.find('.c-date-picker').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()
    expect(document.querySelectorAll('.c-date-picker-calendar').length).toBe(
      TWO
    )
    const curr = new Date().getDate()
    expect(
      document.querySelector('.c-date-picker__day--current').innerHTML
    ).toBe(`${curr}`)
  })
  it('keyboard event', async () => {
    clear()

    const demo = {
      data() {
        return {
          value: ['2019-11-25', '2020-11-27']
        }
      },
      render(h) {
        return (
          <Datepicker vModel={this.value} type="daterange" ref="rangepicker" />
        )
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.rangepicker)
    const picker = wrapper.find('.c-date-picker')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(wrapper.vm.isOpened).toBeTruthy()

    expect(
      document.querySelectorAll('.c-date-picker__day--selected').length
    ).toBe(TWO)

    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active').innerHTML
    ).toBe('2')
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active').innerHTML
    ).toBe('8')
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(
      document.querySelectorAll('.c-date-picker__day--selected').length
    ).toBe(1)
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--active').innerHTML
    ).toBe('10')
    document
      .querySelector('.c-date-picker__day--active')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    expect(wrapper.vm.value[0]).toBe('2019-12-08')
    expect(wrapper.vm.value[1]).toBe('2019-12-10')

    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(document.querySelectorAll('svg').length).toBe(FORE)
    // 面板展示2019-12 & 2020-01
    picker.trigger('keydown', { code: 'ArrowUp' }) // 12-01
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' }) // 11-24
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' }) // 11-17
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' }) // 11-10
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' }) // 11-03
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' }) // 10-27
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(
      document.querySelector('.c-date-picker__day--selected').innerHTML
    ).toBe('27')
    expect(document.querySelectorAll('svg').length).toBe(EIGHT)

    const calendar1 = document.querySelector('.c-date-picker-calendar')
    const [, calendar2] = document.querySelectorAll('.c-date-picker-calendar')

    calendar2
      .querySelectorAll('.c-date-picker-calendar__header button')[0]
      .dispatchEvent(new MouseEvent('click', { bubbles: true })) // 2020 -> 2020
    await Vue.nextTick()
    calendar2
      .querySelectorAll('.c-date-picker-calendar__header button')[1]
      .dispatchEvent(new MouseEvent('click', { bubbles: true })) // 2019-12
    await Vue.nextTick()
    const ym2 = calendar2.querySelectorAll(
      '.c-date-picker-calendar__header > div button'
    )
    expect(ym2[0].innerHTML).toBe('2019年')
    expect(ym2[1].innerHTML).toBe('12月')

    calendar1
      .querySelectorAll('.c-date-picker-calendar__header button')[0]
      .dispatchEvent(new MouseEvent('click', { bubbles: true })) // 2019->2018
    await Vue.nextTick()
    calendar1
      .querySelectorAll('.c-date-picker-calendar__header button')[1]
      .dispatchEvent(new MouseEvent('click', { bubbles: true })) // 2018-09
    await Vue.nextTick()
    calendar1
      .querySelectorAll('.c-date-picker-calendar__header button')[2]
      .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    const ym1 = calendar1.querySelectorAll(
      '.c-date-picker-calendar__header > div button'
    )
    expect(ym1[0].innerHTML).toBe('2010年 - 2019年')
    picker.trigger('keydown', { code: 'ArrowUp' }) // 2019->2016
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(
      calendar1.querySelector('.c-date-picker-calendar__header > div button')
        .innerHTML
    ).toBe('2016年')
  })
})
describe('[Datepicker] same value can not emit change event', () => {
  it('for type date ', async () => {
    const changeFn = jest.fn()
    const demo = {
      data() {
        return {
          value: '2019-12-12'
        }
      },
      render(h) {
        return (
          <Datepicker
            vModel={this.value}
            ref="datepicker"
            onchange={changeFn}
          />
        )
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)

    const picker = wrapper.find('.c-date-picker')
    picker.trigger('click')
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowLeft' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(changeFn).toHaveBeenCalledTimes(1)
    picker.trigger('click')
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(changeFn).toHaveBeenCalledTimes(1)
  })
  it('for type daterange', async () => {
    const changeFn = jest.fn()
    const demo = {
      data() {
        return {
          value: ['2019-12-12', '2019-12-14']
        }
      },
      render(h) {
        return (
          <Datepicker
            vModel={this.value}
            ref="datepicker"
            onchange={changeFn}
            type="daterange"
          />
        )
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)

    const picker = wrapper.find('.c-date-picker')
    picker.trigger('click')
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'ArrowRight' })
    await Vue.nextTick()
    picker.trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(changeFn).toHaveBeenCalledTimes(0)
  })
})
describe('[Datepicker issue] clear event not emit in daterange', () => {
  it('for type date ', async () => {
    const demo = {
      data() {
        return {
          value: '2019-12-12'
        }
      },
      render(h) {
        return <Datepicker vModel={this.value} ref="datepicker" />
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)

    const picker = wrapper.find('.c-date-picker')
    picker.trigger('mouseenter')
    await Vue.nextTick()
    expect(wrapper.vm.shouldShowClearIcon).toBeTruthy()
    wrapper.find('.c-icon--svg').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.value).toBe('')
  })
  it('for type daterange', async () => {
    const demo = {
      data() {
        return {
          value: ['2019-12-12', '2019-12-14']
        }
      },
      render(h) {
        return (
          <Datepicker vModel={this.value} ref="datepicker" type="daterange" />
        )
      }
    }
    const app = mount(demo)
    const wrapper = createWrapper(app.vm.$refs.datepicker)

    const picker = wrapper.find('.c-date-picker')
    picker.trigger('mouseenter')
    await Vue.nextTick()
    expect(wrapper.vm.shouldShowClearIcon).toBeTruthy()
    wrapper.find('.c-icon--svg').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.value.length).toBeFalsy()
  })
})
