import { createWrapper, mount } from '@vue/test-utils'
import Vue from 'vue'
import Collapse from './index'
import collapseItem from './collapse-item'

const collapseApp = {
  render(h) {
    return (
      <Collapse accordion={this.accordion} vModel={this.value} ref="collapse">
        <collapseItem title="折叠面板1" name="a" ref="item1">
          <div>折叠面板内容1</div>
        </collapseItem>
        <collapseItem
          title="折叠面板2"
          disabled={this.disabled}
          name="b"
          ref="item2"
        >
          <div>折叠面板内容2</div>
        </collapseItem>
        <collapseItem title="折叠面板3" name="c" ref="item3">
          <div>折叠面板内容3</div>
        </collapseItem>
        <collapseItem title="折叠面板4" name="d">
          <div>折叠面板内容4</div>
        </collapseItem>
      </Collapse>
    )
  },
  data() {
    return {
      value: ['a'],
      accordion: true,
      disabled: false
    }
  }
}

const clickItem = item => {
  createWrapper(item).find('.c-collapse-item__header').trigger('click')
}

const isActive = vm => {
  const expandable = createWrapper(vm).find('[aria-expanded]')
  return expandable.element.getAttribute('aria-expanded') === 'true'
}

it('should be accordion mode when accordion is `true`', async () => {
  const wrapper = mount(collapseApp)
  wrapper.setData({ accordion: true, value: [] })
  await Vue.nextTick()
  const { item1, item3 } = wrapper.vm.$refs
  expect(isActive(item1)).toBe(false)
  clickItem(item3)
  await Vue.nextTick()
  expect(isActive(item1)).toBe(false)
  expect(isActive(item3)).toBe(true)
})

it('should respond to keyboard event', async () => {
  const wrapper = mount(collapseApp)
  const items = wrapper.findAll('.c-collapse-item__header')
  const item = items.at(2)
  const isItemActive = wrap =>
    wrap.element.getAttribute(`aria-expanded`) === 'true'
  expect(isItemActive(item)).toBe(false)
  expect(item.element.getAttribute('tabindex')).toBe('0')
  // Used to call `item.element.focus()` first
  // to gain focus so that keyboard event can be triggered.
  // After updating the test library, such step is no longer needed,
  // which is double-edged
  item.trigger('keydown', {
    key: 'Enter'
  })
  await Vue.nextTick()
  expect(isItemActive(item)).toBe(true)
  item.trigger('keydown', {
    key: ' '
  })
  await Vue.nextTick()
  expect(isItemActive(item)).toBe(false)
})

it('should not be accordion mode when accordion is `false`', async () => {
  const wrapper = mount(collapseApp)
  wrapper.setData({ accordion: false, value: ['a', 'b'] })
  await Vue.nextTick()
  const { item1, item2, item3 } = wrapper.vm.$refs

  expect(isActive(item1)).toBe(true)
  expect(isActive(item2)).toBe(true)
  expect(isActive(item3)).toBe(false)
  clickItem(item2)
  await Vue.nextTick()
  clickItem(item3)
  await Vue.nextTick()
  expect(isActive(item1)).toBe(true)
  expect(isActive(item2)).toBe(false)
  expect(isActive(item3)).toBe(true)

  const isActiveNames =
    wrapper.vm.$refs.collapse.value.includes('a') &&
    wrapper.vm.$refs.collapse.value.includes('c')
  expect(isActiveNames).toBeTruthy()
})

it('cannot open when disabled is true', async () => {
  const wrapper = mount(collapseApp)
  const { item1, item2 } = wrapper.vm.$refs
  wrapper.setData({ disabled: true })
  await Vue.nextTick()
  expect(isActive(item1)).toBe(true)
  expect(isActive(item2)).toBe(false)

  clickItem(item1)
  await Vue.nextTick()
  clickItem(item2)
  await Vue.nextTick()
  expect(isActive(item2)).toBe(false)
  const isDisabled = item2.$el.querySelector('.c-collapse-item--disabled')
  expect(isDisabled).toBeTruthy()
})

const collapseApp1 = {
  render(h) {
    return (
      <Collapse ref="collapse">
        <collapseItem name="test">
          <div>折叠面板内容1</div>
        </collapseItem>
      </Collapse>
    )
  }
}
it('test value', () => {
  const wrapper = mount(collapseApp1)
  expect(wrapper.findAll('[aria-expanded=true]').length).toBe(0)
})
