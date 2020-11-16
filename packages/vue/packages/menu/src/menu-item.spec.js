import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Menu from './index'
import MenuItem from './menu-item'

describe('[Menu Item] basics', () => {
  const DemoApp = {
    render(h) {
      return (
        <Menu mode="horizontal" active-name="1" theme="dark" width="200px">
          <MenuItem name="1">一级导航 1</MenuItem>
          <MenuItem class="demo-item2" name="2">
            一级导航 2
          </MenuItem>
          <MenuItem class="demo-item3" name="3" disabled>
            一级导航 3
          </MenuItem>
        </Menu>
      )
    }
  }

  /** Because set aria-activedescendant affect this test case */
  // it('should active when click', () => {
  //   const wrapper = mount(DemoApp)
  //   const demoItem = wrapper.find('.demo-item2')

  //   demoItem.trigger('click')
  //   expect(demoItem.classes('c-menu-item--active')).toBeTruthy()
  // })

  it('should accept disabled prop and ignore click event', async () => {
    const wrapper = mount(DemoApp)
    const demoItem = wrapper.find('.demo-item3')

    expect(demoItem.attributes('aria-disabled')).toBe('true')

    demoItem.trigger('click')
    await Vue.nextTick()
    expect(demoItem.classes('c-menu-item--active')).toBeFalsy()
  })
})
