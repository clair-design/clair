import { mount, createWrapper } from '@vue/test-utils'
import Vue from 'vue'
import Dropdown from './index'
import DropdownMenu from './dropdown-menu'
import DropdownItem from './dropdown-item'

const basicDropdownMenu = {
  render(h) {
    return (
      <DropdownMenu>
        <DropdownItem>item</DropdownItem>
        <DropdownItem>item2</DropdownItem>
        <DropdownItem>item3</DropdownItem>
      </DropdownMenu>
    )
  }
}

beforeEach(() => {
  document.body.innerHTML = ''
})
beforeAll(jest.useFakeTimers)
afterAll(jest.useRealTimers)

describe('[Dropdown] Basics', () => {
  it('should render dropdown and dropdownMenu', () => {
    const dropdownMenuDemo = {
      data() {
        return {
          // eslint-disable-next-line no-magic-numbers
          list: [1, 2, 3],
          visible: true
        }
      },
      render(h) {
        return (
          <Dropdown visible={this.visible}>
            <div class="button" />
            <DropdownMenu slot="menu">
              {this.list.map(item => (
                <DropdownItem item-key={item}>item{item}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )
      }
    }

    const wrapper = mount(dropdownMenuDemo)
    const body = createWrapper(document.body)
    const dropdownMenuElm = body.find('.c-dropdown-menu')

    expect(body.find('.c-dropdown-menu').element).toBeTruthy()
    expect(body.find('.c-dropdown-menu__item').text()).toBe('item1')

    expect(wrapper.find('.button').element).toBeTruthy()
    expect(wrapper.find('.c-dropdown-link').element).toBeFalsy()

    expect(dropdownMenuElm.element).toBeVisible()
  })

  it('should work with different props', async () => {
    const DEFAULT_DELAY_TIME = 100

    const wrapper = mount(Dropdown, {
      slots: {
        menu: basicDropdownMenu
      },
      propsData: {
        placement: 'top',
        showDelay: DEFAULT_DELAY_TIME,
        hideDelay: DEFAULT_DELAY_TIME
      }
    })
    const body = createWrapper(document.body)
    await Vue.nextTick()

    expect(wrapper.props('placement')).toBe('top')
    expect(body.find('[x-placement=top-center]').element).toBeTruthy()

    expect(wrapper.props('showDelay')).toBe(DEFAULT_DELAY_TIME)
    expect(wrapper.props('hideDelay')).toBe(DEFAULT_DELAY_TIME)
  })

  it('should contain item with props', () => {
    const dropdownMenuDemo = {
      render(h) {
        return (
          <DropdownMenu>
            <DropdownItem item-key="item-key">item</DropdownItem>
            <DropdownItem>item2</DropdownItem>
            <DropdownItem disabled>item3</DropdownItem>
            <DropdownItem divided>item4</DropdownItem>
          </DropdownMenu>
        )
      }
    }
    const itemLength = 4
    const disabledIndex = 2
    const dividedIndex = 3

    const wrapper = mount(Dropdown, {
      slots: {
        menu: dropdownMenuDemo
      }
    })
    // the hack way to find component in tree
    const body = createWrapper(wrapper.vm.$refs.popover.$children[0])
    expect(body.findAllComponents(DropdownItem).length).toBe(itemLength)
    expect(body.findAllComponents(DropdownItem).at(0).props('itemKey')).toBe(
      'item-key'
    )

    expect(
      body.findAllComponents(DropdownItem).at(disabledIndex).props('disabled')
    ).toBe(true)
    expect(
      body
        .findAllComponents(DropdownItem)
        .at(disabledIndex)
        .find('.is-disabled').element
    ).toBeTruthy()

    expect(
      body.findAllComponents(DropdownItem).at(dividedIndex).props('divided')
    ).toBe(true)
    expect(
      body
        .findAllComponents(DropdownItem)
        .at(dividedIndex)
        .find('.c-dropdown-menu__item--divided').element
    ).toBeTruthy()
  })
})

describe('[Dropdown] Events', () => {
  it('should showMenu and hideMenu with different trigger', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        menu: basicDropdownMenu
      },
      propsData: {
        transition: 'none'
      }
    })

    const body = createWrapper(document.body)
    const dropdownMenuElm = body.find('.c-dropdown-menu')
    const triggerElm = wrapper.find('.c-dropdown')

    triggerElm.trigger('click')

    jest.runAllTimers()
    await Vue.nextTick()
    expect(dropdownMenuElm.element).not.toBeVisible()

    triggerElm.trigger('focus')
    jest.runAllTimers()
    await Vue.nextTick()
    expect(dropdownMenuElm.element).not.toBeVisible()

    triggerElm.trigger('mouseenter')
    jest.runAllTimers()
    await Vue.nextTick()
    expect(dropdownMenuElm.element).toBeVisible()

    triggerElm.trigger('mouseleave')
    jest.runAllTimers()
    await Vue.nextTick()
    expect(dropdownMenuElm.element).not.toBeVisible()
  })

  it('trigger and menuItem keydown events', async () => {
    const list = [
      {
        disabled: false,
        name: 'item1'
      },
      {
        disabled: true,
        name: 'item2'
      },
      {
        disabled: false,
        name: 'item3'
      }
    ]

    const dropdownMenuDemo = {
      data() {
        return {
          visible: true
        }
      },
      render(h) {
        return (
          <Dropdown visible={this.visible}>
            <DropdownMenu slot="menu">
              {list.map(item => (
                // eslint-disable-next-line max-len
                <DropdownItem item-key={item.name} disabled={item.disabled}>
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )
      }
    }
    const body = createWrapper(document.body)
    const wrapper = mount(dropdownMenuDemo)
    const triggerElm = wrapper.find('.c-dropdown-link')
    const dropdownMenuElm = body.find('.c-dropdown-menu')
    const items = body.findAll('.c-dropdown-menu__item').wrappers
    const menuItems = body.findAll('.c-dropdown-menu__item')
    const prefix = 'c-dropdown__item'

    triggerElm.trigger('keydown', {
      code: 'ArrowDown'
    })
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(document.activeElement).toBe(items[0].element)
    expect(dropdownMenuElm.attributes('aria-activedescendant')).toBe(
      `${prefix}-1`
    )
    // eslint-disable-next-line no-magic-numbers
    expect(menuItems.at(0).attributes('aria-selected')).toBe('true')

    triggerElm.trigger('keydown', {
      code: 'ArrowUp'
    })
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(document.activeElement).toBe(items[0].element)
    expect(dropdownMenuElm.attributes('aria-activedescendant')).toBe(
      `${prefix}-1`
    )
    // eslint-disable-next-line no-magic-numbers
    expect(menuItems.at(0).attributes('aria-selected')).toBe('true')
    // eslint-disable-next-line no-magic-numbers
    menuItems.at(0).trigger('keydown', {
      code: 'ArrowDown'
    })
    await Vue.nextTick()
    expect(document.activeElement).toBe(items[2].element)
    // eslint-disable-next-line no-magic-numbers
    menuItems.at(2).trigger('keydown', {
      code: 'ArrowDown'
    })
    await Vue.nextTick()
    expect(document.activeElement).toBe(items[2].element)
    // eslint-disable-next-line no-magic-numbers
    menuItems.at(2).trigger('keydown', {
      code: 'ArrowUp'
    })
    await Vue.nextTick()
    expect(document.activeElement).toBe(items[0].element)
    // eslint-disable-next-line no-magic-numbers
    menuItems.at(0).trigger('keydown', {
      code: 'ArrowUp'
    })
    await Vue.nextTick()
    expect(document.activeElement).toBe(items[0].element)
  })

  it('trigger and menuItems click should emit different events', async () => {
    const visibleChange = jest.fn()
    const itemClickHandler = jest.fn()

    const dropdownMenuDemo = {
      data() {
        return {
          // eslint-disable-next-line no-magic-numbers
          list: [1, 2, 3],
          visible: true,
          trigger: 'hover'
        }
      },
      render(h) {
        return (
          <Dropdown
            trigger={this.trigger}
            visible={this.visible}
            on-item-click={itemClickHandler}
            on-visibility-change={visibleChange}
          >
            <DropdownMenu slot="menu">
              {this.list.map(item => (
                <DropdownItem item-key={item}>item{item}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )
      }
    }
    const body = createWrapper(document.body)
    const wrapper = mount(dropdownMenuDemo)
    const triggerElm = wrapper.find('.c-dropdown')
    const menuItem = body.findAll('.c-dropdown-menu__item').at(0)

    triggerElm.trigger('mouseenter')
    triggerElm.trigger('mouseleave')
    jest.runAllTimers()

    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(1)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    triggerElm.trigger('keydown', {
      code: 'Enter'
    })
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(2)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    wrapper.setData({ trigger: 'click' })
    await Vue.nextTick()
    triggerElm.trigger('click')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(3)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    wrapper.setData({ visible: false })
    await Vue.nextTick()
    //如果trigger为click，则mouseenter和focus并不触发

    triggerElm.trigger('mouseenter')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(3)

    triggerElm.trigger('focus')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(3)

    wrapper.setData({ trigger: 'click' })
    await Vue.nextTick()
    triggerElm.trigger('click')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(4)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: true }
    })

    // //如果trigger为focus，则mouseenter和click并不触发
    wrapper.setData({ trigger: 'focus' })
    await Vue.nextTick()
    triggerElm.trigger('click')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(4)

    triggerElm.trigger('mouseenter')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(4)

    triggerElm.trigger('focus')
    jest.runAllTimers()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(5)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: true }
    })

    wrapper.setData({ visible: true })
    await Vue.nextTick()
    menuItem.trigger('click')
    jest.runAllTimers()
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(itemClickHandler).toHaveBeenCalledTimes(1)
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(6)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    menuItem.trigger('keydown', {
      code: 'Enter'
    })
    jest.runAllTimers()
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(itemClickHandler).toHaveBeenCalledTimes(2)
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(7)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    menuItem.trigger('keydown', {
      code: 'Tab'
    })
    jest.runAllTimers()
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(8)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    menuItem.trigger('keydown', {
      code: 'Escape'
    })
    jest.runAllTimers()
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(9)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })

    //handleClickOutside
    body.find(':not(.c-dropdown-link, .c-dropdown-menu__item)').trigger('click')
    jest.runAllTimers()
    await Vue.nextTick()
    // eslint-disable-next-line no-magic-numbers
    expect(visibleChange).toHaveBeenCalledTimes(10)
    expect(visibleChange).toHaveBeenLastCalledWith({
      detail: { visible: false }
    })
  })

  test('if dropdown destroy dropdownMenu should remove', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        menu: basicDropdownMenu
      }
    })

    const body = createWrapper(document.body)
    const dropdownMenuElm = body.find('menu')
    expect(document.contains(dropdownMenuElm.element)).toBe(true)
    wrapper.destroy()
    await Vue.nextTick()
    expect(document.contains(dropdownMenuElm.element)).toBe(false)
  })

  test('if slot have element', async () => {
    const itemKey = jest.fn(({ detail: { itemKey } }) => itemKey)

    const dropdownMenuDemo = {
      render(h) {
        return (
          <Dropdown on-item-click={itemKey}>
            <DropdownMenu slot="menu">
              <DropdownItem item-key="beijing">
                <div class="c-dropdown-menu__div">北京</div>
              </DropdownItem>
              <DropdownItem item-key="shanghai">
                <div>
                  <span class="c-dropdown-menu__span">上海</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      }
    }
    const body = createWrapper(document.body)
    mount(dropdownMenuDemo)
    const menuItem = body.find('.c-dropdown-menu__div')
    menuItem.trigger('click')
    jest.runAllTimers()
    await Vue.nextTick()
    expect(itemKey).toHaveReturnedWith('beijing')
    const span = body.find('.c-dropdown-menu__span')
    span.trigger('click')
    jest.runAllTimers()
    await Vue.nextTick()
    expect(itemKey).toHaveReturnedWith('shanghai')
  })
})
