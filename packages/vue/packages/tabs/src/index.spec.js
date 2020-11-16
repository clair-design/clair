import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { Tabs, TabPane } from './index'

const BaseDemo = {
  props: ['tabPosition'],
  data() {
    return {
      list: ['0', '1', '2']
    }
  },
  render(h) {
    return (
      <Tabs activeKey={'1'} tabPosition={this.tabPosition}>
        {this.list.map(item => (
          <TabPane tabKey={item} key={item}>
            {item}
          </TabPane>
        ))}
      </Tabs>
    )
  }
}

describe('[Tabs] basics', () => {
  it('should render a tab width several tab panes', () => {
    const tabsDemo = {
      render(h) {
        return (
          <Tabs activeKey="1">
            <TabPane label="Tab1" tabKey="1">
              Pane 1
            </TabPane>
            <TabPane label="Tab2" tabKey="2">
              Pane 2
            </TabPane>
            <TabPane label="Tab3" tabKey="3">
              Pane 3
            </TabPane>
          </Tabs>
        )
      }
    }
    const wrapper = mount(tabsDemo)
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    expect(wrapper.find('[aria-labelledby="tab-2"]').text()).toBe('Pane 2')
  })

  it('should show as card type', () => {
    const wrapper = mount(Tabs, {
      propsData: {
        type: 'card',
        activeKey: '1'
      }
    })
    expect(wrapper.find('.c-tabs--card').exists()).toBe(true)
  })

  it('should act as disabled when set a property "disabled"', async () => {
    const tabsDemo = {
      render(h) {
        return (
          <Tabs activeKey="1">
            <TabPane label="Tab1" tabKey="1">
              Pane 1
            </TabPane>
            <TabPane label="Tab2" tabKey="2" disabled>
              Pane 2
            </TabPane>
            <TabPane label="Tab3" tabKey="3">
              Pane 3
            </TabPane>
          </Tabs>
        )
      }
    }
    const wrapper = mount(tabsDemo)
    await Vue.nextTick()
    expect(
      wrapper.find('#tab-2').find('.c-tabs__item-disabled').exists()
    ).toBeTruthy()
    wrapper.find('#tab-2').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('#tab-2').find('.c-tabs__item-active').exists()).toBe(
      false
    )
    expect(wrapper.find('#tab-1').find('.c-tabs__item-active').exists()).toBe(
      true
    )
  })

  it('should support dynamic tabs', async () => {
    const wrapper = mount(BaseDemo)
    await Vue.nextTick()
    expect(wrapper.findAll('[role="tabpanel"]').wrappers.length).toBe(3)
    const { list } = wrapper.vm
    const { length } = list
    list.splice(1, 0, `${length ** length}`)
    await Vue.nextTick()
    expect(wrapper.findAll('[role="tabpanel"]').wrappers.length).toBe(4)
    expect(
      wrapper.findAll('[role="tab"]').at(2).attributes('aria-selected')
    ).toBe('true')
  })

  it('should support multiple direction', () => {
    const wrapper = mount(BaseDemo, {
      propsData: {
        tabPosition: 'left'
      }
    })
    expect(wrapper.classes('c-tabs--left')).toBeTruthy()
  })
})

describe('[Tabs] event', () => {
  it('should change tab panes visibility when tab is clicked', async () => {
    const tabsDemo = {
      render(h) {
        return (
          <Tabs activeKey="1">
            <TabPane label="Tab1" tabKey="1">
              Pane 1
            </TabPane>
            <TabPane label="Tab2" tabKey="2">
              Pane 2
            </TabPane>
            <TabPane label="Tab3" tabKey="3">
              Pane 3
            </TabPane>
          </Tabs>
        )
      }
    }

    const wrapper = mount(tabsDemo)
    await Vue.nextTick()
    wrapper.find('#tab-2').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('#panel-2').attributes('hidden')).toBeFalsy()
    expect(wrapper.find('#panel-2').element).toBeVisible()
    wrapper.find('#tab-3').trigger('click')
    await Vue.nextTick()
    expect(wrapper.find('#panel-2').attributes('hidden')).toBe('hidden')
    expect(wrapper.find('#panel-3').element).toBeVisible()
  })

  // eslint-disable-next-line max-len
  it('calls onClose when close-tag is clicked, but tabs\' type should be "card"', async () => {
    const onClose = jest.fn()
    const tabsDemo = {
      render(h) {
        return (
          <Tabs activeKey="1" type="card" onClose={onClose}>
            <TabPane label="Tab1" tabKey="1" closable>
              Pane 1
            </TabPane>
            <TabPane label="Tab2" tabKey="2" closable>
              Pane 2
            </TabPane>
            <TabPane label="Tab3" tabKey="3" closable>
              Pane 3
            </TabPane>
          </Tabs>
        )
      }
    }
    const wrapper = mount(tabsDemo)
    await Vue.nextTick()
    wrapper.find('#tab-1').find('.c-icon--close-tab').trigger('click')
    await Vue.nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('adds new tag when add-btn is clicked', () => {
    const tabsDemo = {
      render(h) {
        return (
          <Tabs activeKey="1" type="card" addable>
            <TabPane label="Tab1" tabKey="1" closable>
              Pane 1
            </TabPane>
            <TabPane label="Tab2" tabKey="2" closable>
              Pane 2
            </TabPane>
          </Tabs>
        )
      }
    }
    const wrapper = mount(tabsDemo)
    expect(wrapper.find('.c-tabs-addable').exists()).toBe(true)
  })

  it('should change active tab to respond to keyboard event', async () => {
    const div = document.createElement('div')
    document.body.append(div)
    const wrapper = mount(BaseDemo, {
      attachTo: div
    })
    await Vue.nextTick()
    const tabs = wrapper.findAll('[role="tab"]')
    tabs.at(2).trigger('click')
    tabs.at(2).element.focus()
    await Vue.nextTick()

    expect(tabs.at(2).attributes('aria-selected')).toBe('true')
    tabs.at(2).trigger('keydown', {
      code: 'ArrowRight'
    })
    await Vue.nextTick()
    expect(tabs.at(0).attributes('aria-selected')).toBe('true')
    tabs.at(0).trigger('keydown', {
      code: 'ArrowLeft'
    })
    await Vue.nextTick()
    expect(tabs.at(2).attributes('aria-selected')).toBe('true')
    wrapper.destroy()
  })

  it('should remove tab when hit BackSpace', async () => {
    const onClose = jest.fn()
    const Demo = {
      data() {
        return {
          list: ['0', '1', '2']
        }
      },
      render(h) {
        return (
          <Tabs activeKey={'2'} type="card" onClose={onClose}>
            {this.list.map(item => (
              <TabPane tabKey={item} key={item} closable>
                {item}
              </TabPane>
            ))}
          </Tabs>
        )
      }
    }
    const div = document.createElement('div')
    document.body.append(div)
    const wrapper = mount(Demo, {
      attachTo: div
    })
    await Vue.nextTick()
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.at(2).attributes('aria-selected')).toBe('true')
    tabs.at(2).element.focus()
    await Vue.nextTick()
    tabs.at(2).trigger('keydown', {
      code: 'Backspace'
    })
    await Vue.nextTick()
    expect(onClose).toBeCalledTimes(1)
    expect(onClose.mock.calls.slice(-1)[0][0]).toMatchObject({
      detail: { key: '2' }
    })
    wrapper.destroy()
  })
})

describe('[Tabs] programmatic update', () => {
  it('should handle programmatic update properly', async () => {
    const TWO = 2
    const THREE = 3
    const Demo = {
      data() {
        return {
          list: [1, TWO, THREE]
        }
      },
      computed: {
        max() {
          return Math.max(...this.list)
        },
        activeKey() {
          return `${this.list[0]}`
        }
      },
      methods: {
        slice() {
          this.list.splice(0, 1)
        },
        add() {
          this.list.push(this.max + 1)
        },
        insert() {
          this.list = [
            ...this.list.slice(0, 1),
            this.max + 1,
            ...this.list.slice(1)
          ]
        }
      },
      render() {
        return (
          <Tabs activeKey={this.activeKey}>
            {this.list.map(item => {
              const key = `${item}`
              return (
                <TabPane label={key} tabKey={key} key={key}>
                  <div class="content">content{key}</div>
                </TabPane>
              )
            })}
          </Tabs>
        )
      }
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    wrapper.vm.insert()
    await Vue.nextTick()
    const getPanes = () => wrapper.findAll(`[role="tabpanel"] .content`)
    const getTabItems = () => wrapper.findAll(`[role="tab"]`)
    expect(getPanes().at(1).element.textContent).toBe(
      `content${wrapper.vm.max}`
    )
    expect(getTabItems().at(1).element.textContent).toBe(`${wrapper.vm.max}`)

    wrapper.vm.add()
    await Vue.nextTick()
    let panes = getPanes()
    let items = getTabItems()
    expect(panes.at(panes.length - 1).element.textContent).toBe(
      `content${wrapper.vm.max}`
    )
    expect(items.at(items.length - 1).element.textContent).toBe(
      `${wrapper.vm.max}`
    )

    wrapper.setData({
      list: [0, 1, TWO]
    })
    wrapper.vm.slice()
    await Vue.nextTick()
    panes = getPanes()
    items = getTabItems()
    expect(panes.length).toBe(TWO)
    expect(items.length).toBe(TWO)
    expect(panes.at(1).element.textContent).toBe(`content${TWO}`)
    expect(items.at(1).element.textContent).toBe(`${TWO}`)
  })
})
