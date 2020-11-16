import { mount } from '@vue/test-utils'
import Vue from 'vue'
import {
  IconStatusDanger,
  IconStatusSuccess,
  IconClose,
  IconChecked
} from 'packages/icon'
import Progress from './'

function getWrapper(props) {
  return mount(Progress, {
    propsData: props
  })
}

describe('[Progress] basics', () => {
  it('when give value, line progress style should be set correctly', () => {
    const wrap = getWrapper({
      value: 50
    })
    expect(wrap.find('.c-progress__inner').attributes('style')).toContain(
      'width: 50%'
    )
  })

  it('when give value, circle progress style should be set correctly', () => {
    const wrap = getWrapper({
      value: 50,
      type: 'circle'
    })
    expect(wrap.find('.c-progress__inner').attributes('stroke-dasharray')).toBe(
      '149.226 298.451'
    )
  })

  it('percent should be computed correctly when max is not 100', () => {
    const wrap = getWrapper({
      value: 100,
      max: 200
    })
    expect(wrap.find('.c-progress__inner').attributes('style')).toContain(
      'width: 50%'
    )
  })

  it('should accept different types', async () => {
    const wrap = getWrapper()
    expect(wrap.find('.c-progress--line').element).toBeTruthy()
    wrap.setProps({ type: 'circle' })
    await Vue.nextTick()
    expect(wrap.find('.c-progress--circle').element).toBeTruthy()
  })

  it('should accept different size', () => {
    const wrap = getWrapper({
      size: 'small'
    })
    expect(wrap.find('.c-progress--small').element).toBeTruthy()
  })
})

describe('[Progress] circle progress compute', () => {
  it('normal circle progress computed attributes\
  should be computed correctly', () => {
    const wrap = getWrapper({
      type: 'circle',
      value: 50
    })
    const attrs = wrap.find('.c-progress__inner').attributes()
    expect(attrs['stroke-width']).toBe('5')
    expect(attrs.r).toBe('47.5')
    expect(attrs['stroke-dasharray']).toBe('149.226 298.451')
  })

  it('small circle progress computed attributes\
  should be computed correctly', () => {
    const wrap = getWrapper({
      type: 'circle',
      size: 'small',
      value: 50
    })
    const attrs = wrap.find('.c-progress__inner').attributes()
    expect(attrs['stroke-width']).toBe('4.762')
    expect(attrs.r).toBe('47.619')
    expect(attrs['stroke-dasharray']).toBe('149.6 299.199')
  })

  it('after customizing the width,\
  computed attributes should be computed correctly ', () => {
    const wrap = getWrapper({
      type: 'circle',
      value: 50,
      width: 200
    })
    const attrs = wrap.find('.c-progress__inner').attributes()
    expect(attrs['stroke-width']).toBe('3')
    expect(attrs.r).toBe('48.5')
    expect(attrs['stroke-dasharray']).toBe('152.367 304.734')
  })

  it('after customizing the stroke width,\
  computed attributes should be computed correctly ', () => {
    const wrap = getWrapper({
      type: 'circle',
      value: 50,
      strokeWidth: 10
    })
    const attrs = wrap.find('.c-progress__inner').attributes()
    expect(attrs['stroke-width']).toBe('8.333')
    expect(attrs.r).toBe('45.834')
    expect(attrs['stroke-dasharray']).toBe('143.992 287.984')
  })
})

describe('[Progress] customize', () => {
  it('line progress should allow custom colors', () => {
    const wrap = getWrapper({
      strokeColor: '#000'
    })
    expect(wrap.find('.c-progress__inner').attributes('style')).toContain(
      'background-color: rgb(0, 0, 0)'
    )
  })

  it('circle progress should allow custom colors', () => {
    const wrap = getWrapper({
      type: 'circle',
      strokeColor: '#000'
    })
    expect(wrap.find('.c-progress__inner').element.style.stroke).toContain(
      '#000'
    )
  })

  it('line progress should allow custom width', () => {
    const wrap = getWrapper({
      width: 500
    })
    expect(wrap.attributes('style')).toContain('width: 500px')
  })

  it('circle progress should allow custom width', () => {
    const wrap = getWrapper({
      type: 'circle',
      width: 500
    })
    expect(wrap.attributes('style')).toContain('width: 500px')
    expect(wrap.attributes('style')).toContain('height: 500px')
  })

  it('circle progress text font size should be 1/6 of width', () => {
    const wrap = getWrapper({
      type: 'circle',
      width: 180
    })
    expect(wrap.find('.c-progress__text').attributes('style')).toContain(
      'font-size: 30px'
    )
  })

  it('line progress should allow custom stroke width', () => {
    const wrap = getWrapper({
      strokeWidth: 10
    })
    expect(wrap.find('.c-progress__bg').attributes('style')).toContain(
      'height: 10px'
    )
  })

  it('circle progress should allow custom stroke width', () => {
    const wrap = getWrapper({
      type: 'circle',
      strokeWidth: 10
    })
    expect(wrap.find('.c-progress__bg').attributes('stroke-width')).toBe(
      '8.333'
    )
  })

  it('line progress should allow custom info with slot', () => {
    const wrap = mount({
      components: {
        [Progress.name]: Progress
      },
      template: `
        <c-progress
          :value="20"
          :max="50"
          label-width="80px"
          v-slot="{ value, max }"
        >
          Loading({{value}}/{{max}})
        </c-progress>`
    })
    expect(wrap.find('.c-progress__text').text()).toBe('Loading(20/50)')
  })

  it('circle progress should allow custom info with slot', () => {
    const wrap = mount({
      components: {
        [Progress.name]: Progress
      },
      template: `
        <c-progress
          type="circle"
          :value="20"
          :max="50"
          label-width="80px"
          v-slot="{ value, max }"
        >
          Loading({{value}}/{{max}})
        </c-progress>`
    })
    expect(wrap.find('.c-progress__text').text()).toBe('Loading(20/50)')
  })

  it('line progress should allow custom info width', () => {
    const wrap = getWrapper({
      infoWidth: 80
    })
    expect(wrap.find('.c-progress__text').attributes('style')).toContain(
      'width: 80px'
    )
  })

  it('should allow hide info', () => {
    const wrap = getWrapper({
      showInfo: false
    })
    expect(wrap.find('.c-progress__text').element).toBeFalsy()
  })
})

const status = ['active', 'exception', 'success']
describe('[Progress] status', () => {
  it('should allow different status', async () => {
    const wrap = getWrapper()
    for (const v of status) {
      wrap.setProps({
        status: v,
        type: 'line'
      })

      // eslint-disable-next-line
      await Vue.nextTick()
      expect(wrap.find(`.c-progress--${v}`).element).toBeTruthy()
      expect(wrap.find('.c-progress__text')).not.toBe('0%')
      wrap.setProps({
        type: 'circle'
      })
      // eslint-disable-next-line
      await Vue.nextTick()
    }
  })

  it('exception-status line progress should have correct icon', () => {
    const wrap = getWrapper({
      status: 'exception'
    })
    expect(wrap.findComponent(IconStatusDanger).exists()).toBeTruthy()
  })

  it('success-status line progress should have correct icon', () => {
    const wrap = getWrapper({
      status: 'success'
    })
    expect(wrap.findComponent(IconStatusSuccess).exists()).toBeTruthy()
  })

  it('exception-status circle progress should have correct icon', () => {
    const wrap = getWrapper({
      status: 'exception',
      type: 'circle'
    })
    expect(wrap.findComponent(IconClose).exists()).toBeTruthy()
  })

  it('success-status circle progress should have correct icon', () => {
    const wrap = getWrapper({
      status: 'success',
      type: 'circle'
    })
    expect(wrap.findComponent(IconChecked).exists()).toBeTruthy()
  })

  it('status info should be overriden by custom info', () => {
    status.forEach(v => {
      const wrap = mount({
        components: {
          [Progress.name]: Progress
        },
        template: `
          <c-progress status="${v}">
            custom
          </c-progress>`
      })
      expect(wrap.find('.c-progress__text').text()).toBe('custom')
    })
  })
})
