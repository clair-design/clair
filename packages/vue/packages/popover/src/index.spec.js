/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
import { mount, createLocalVue, createWrapper } from '@vue/test-utils'
import Vue from 'vue'
import Popover from '../index'
const sleep = time => {
  jest.advanceTimersByTime(time)
  return Vue.nextTick()
}
beforeAll(jest.useFakeTimers)
afterAll(jest.useRealTimers)
const HIDE_DELAY = 100

it('should manually control by "visible"', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容',
      trigger: 'none',
      visible: false
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })

  await Vue.nextTick()
  wrapper.find('.trigger').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.isVisible).toBeFalsy()

  wrapper.setProps({
    visible: true
  })
  await Vue.nextTick()
  expect(wrapper.vm.isVisible).toBeTruthy()
})

it('should render nothing when not set default slot', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容',
      trigger: 'click'
    }
  })

  await sleep(HIDE_DELAY)

  expect(wrapper.vm.vm).toBeUndefined()
})

it("should trigger the visibility-change event when the popover's visibility is changed", async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容',
      trigger: 'click',
      hideDelay: 0
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })

  await Vue.nextTick()
  wrapper.find('.trigger').trigger('click')
  await sleep(0)
  expect(wrapper.emitted()['visibility-change'].length).toBe(1)
  wrapper.find('.trigger').trigger('click')
  await sleep(0)
  expect(wrapper.emitted()['visibility-change'].length).toBe(2)
})

it('should render slots correctly', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容1',
      title: 'title',
      hideDelay: 0
    },
    slots: {
      default: '<button class="trigger">trigger</button>',
      content: '内容2'
    }
  })

  expect(wrapper.vm.$refs.content.innerHTML).toContain('内容2')
})

it('should set class or style as the custom property', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      title: 'title',
      hideDelay: 0,
      customStyle: { width: '500px' },
      customClass: 'my-popover'
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })

  expect(wrapper.vm.$refs.content.style.width).toBe('500px')
  expect(wrapper.vm.$refs.content.className).toContain('my-popover')
})

it('should accept custom delay time of showing or hiding', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      title: 'title',
      hideDelay: 100,
      showDelay: 100
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })
  await sleep(HIDE_DELAY)
  wrapper.find('.trigger').trigger('mouseenter')
  await sleep(0)
  expect(wrapper.emitted()['visibility-change']).toBeFalsy()
  await sleep(HIDE_DELAY)
  expect(wrapper.emitted()['visibility-change'].length).toBe(1)
  wrapper.find('.trigger').trigger('mouseleave')
  expect(wrapper.emitted()['visibility-change'].length).toBe(1)
  await sleep(HIDE_DELAY)
  expect(wrapper.emitted()['visibility-change'].length).toBe(2)
})
it('should accept custom property: trigger ', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      title: 'title',
      trigger: 'click',
      hideDelay: 0
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })
  await Vue.nextTick()
  wrapper.find('.trigger').trigger('click')
  await sleep(0)
  wrapper.setProps({ trigger: 'hover' })
  await Vue.nextTick()
  wrapper.find('.trigger').trigger('mouseleave')
  await sleep(HIDE_DELAY)
  wrapper.setProps({ trigger: 'focus' })
  await Vue.nextTick()
  wrapper.find('.trigger').trigger('focus')
  await sleep(0)
  wrapper.find('.trigger').trigger('keydown', {
    code: 'Enter'
  })
  await sleep(0)
  wrapper.find('.trigger').trigger('keydown', {
    code: 'Escape'
  })
  await sleep(HIDE_DELAY)
  wrapper.find('.trigger').trigger('keydown', {
    code: 'Tab'
  })
  await sleep(HIDE_DELAY)
  expect(wrapper.vm.isVisible).toBeFalsy()
  expect(wrapper.emitted()['visibility-change'].length).toBe(4)
})

it('vue.use: vue.use function and handle click outside', async () => {
  const localVue = createLocalVue()
  localVue.use(Popover)

  const popover = {
    render(h) {
      return (
        <div>
          <c-popover
            ref="popover"
            content="content"
            placement="top-left"
            trigger="hover"
          >
            <button class="btn">trigger</button>
          </c-popover>
          <button id="clickOutSide" />
        </div>
      )
    }
  }

  const wrapper = mount(popover, {
    localVue
  })
  await Vue.nextTick()

  expect(wrapper.find('.btn').element).toBeTruthy()
  wrapper.find('.btn').trigger('mouseenter')
  await sleep(HIDE_DELAY)
  expect(wrapper.vm.$refs.popover.isVisible).toBeTruthy()

  wrapper.find('.btn').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.$refs.popover.isVisible).toBeTruthy()

  wrapper.find('#clickOutSide').trigger('click')
  document.body.click()
  await sleep(HIDE_DELAY)
  expect(wrapper.vm.$refs.popover.isVisible).toBeFalsy()
})

it('should destroy everything when destroyed', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容',
      trigger: 'none'
    },
    slots: {
      default: '<button class="trigger">trigger</button>'
    }
  })
  wrapper.destroy()
  expect(wrapper.$refs).toBeUndefined()
})

it('should wrap Text Node with span Element and handle custom property "transition"', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容',
      transition: 'none',
      maxHeight: 200
    },
    slots: {
      default: '纯文字'
    }
  })

  await sleep(HIDE_DELAY)
  expect(wrapper.vm.transition).toBe('none')
  expect(wrapper.find('span').element).toBeTruthy()
})

it('should wrap multiple Elements with span', async () => {
  const wrapper = mount(Popover, {
    propsData: {
      content: '内容'
    },
    slots: {
      default: '<span>请选择</span><input type="checkbox"/>'
    }
  })

  expect(wrapper.find('span').element).toBeTruthy()
})

describe('[popover panel]', () => {
  const demo = {
    data() {
      return {
        title: '标题'
      }
    },
    render(h) {
      return (
        <div>
          <Popover title={this.title}>
            <button id="trigger" />
          </Popover>
        </div>
      )
    }
  }

  const wrapper = mount(demo)
  const body = createWrapper(document.body)
  const animationTime = 100

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', async () => {
    const popover = body.find('.c-popover')
    expect(popover.element).not.toBeVisible()
    wrapper.find('#trigger').trigger('mouseenter')
    await sleep(animationTime)
    expect(popover.element).toBeVisible()
  })
})

describe('[popover append-target]', () => {
  it('should append to specified DOM if `append-target` is set', () => {
    const newContainer = document.createElement('div')
    document.body.appendChild(newContainer)
    const demo = {
      render() {
        return (
          <Popover visible appendTarget={newContainer}>
            <span>test</span>
          </Popover>
        )
      }
    }
    mount(demo)
    expect(createWrapper(newContainer).find('c-popover')).toBeTruthy()
  })
})
