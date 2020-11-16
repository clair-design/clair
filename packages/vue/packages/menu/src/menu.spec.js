import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Menu from './index'
import Submenu from './submenu'
import MenuItem from './menu-item'

describe('[Menu] basics', () => {
  const DemoApp = {
    render(h) {
      return (
        <Menu mode="horizontal" active-name="1" theme="dark" width="200px">
          <MenuItem name="1">一级导航 1</MenuItem>
          <MenuItem name="3">一级导航 2</MenuItem>
          <MenuItem name="4" disabled>
            一级导航 3
          </MenuItem>
        </Menu>
      )
    }
  }

  it('should accept theme prop', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.find('.c-menu--dark')).toBeTruthy()
  })

  it('should accept mode prop', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('should render default slot', () => {
    const wrapper = mount(DemoApp)
    expect(wrapper.findComponent(MenuItem)).toBeTruthy()
  })

  it('should collapsed when vertical mode and set collapsed prop', () => {
    const App = {
      render(h) {
        return <Menu mode="vertical" collapsed={true} />
      }
    }
    const wrapper = mount(App)
    expect(wrapper.classes('c-menu--collapsed')).toBeTruthy()
  })

  it('should not collapsed when horizontal mode and set collapsed prop', () => {
    const App = {
      render(h) {
        return <Menu mode="horizontal" collapsed={true} />
      }
    }
    const wrapper = mount(App)
    expect(wrapper.classes('c-menu--collapsed')).toBeFalsy()
  })

  it('should default expanded submenu when set expandedNames prop', async () => {
    const wrapper = mount({
      components: {
        Menu,
        Submenu,
        MenuItem
      },
      template: `
        <Menu mode="vertical" :expanded-names="['2']">
          <MenuItem name="1">一级导航 1</MenuItem>
          <Submenu class="demo-submenu" name="2">
            <template v-slot:title>一级导航 2</template>
            <MenuItem name="2-1">二级导航 1</MenuItem>
            <Submenu>
              <template v-slot:title>二级导航 2</template>
              <MenuItem name="2-2-1">三级导航 1</MenuItem>
              <MenuItem name="2-2-2">三级导航 2</MenuItem>
              <MenuItem name="2-2-3">三级导航 3</MenuItem>
            </Submenu>
            <MenuItem name="2-3">二级导航 3</MenuItem>
          </Submenu>
          <MenuItem class="demo-item3" name="3" disabled>
            一级导航 3
          </MenuItem>
        </Menu>
      `
    })
    await Vue.nextTick()

    expect(
      wrapper
        .find('.demo-submenu')
        .find('.c-submenu__dropdown')
        .classes('c-submenu__dropdown--open')
    ).toBeTruthy()
  })
})
