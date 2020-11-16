import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Menu from './index'
import Submenu from './submenu'
import MenuItem from './menu-item'
import { VERTICAL_MENU_PADDING_LEFT } from './utils'

describe('[Submenu] basics', () => {
  const wrapper = mount({
    components: {
      Menu,
      Submenu,
      MenuItem
    },
    template: `
      <Menu mode="vertical" :expanded-names="['2']">
        <MenuItem name="1">一级导航 1</MenuItem>
        <Submenu class="demo-submenu1" name="2">
          <template v-slot:title>一级导航 2</template>
          <MenuItem class="demo-item1" name="2-1">二级导航 1</MenuItem>
          <MenuItem name="2-3">二级导航 3</MenuItem>
        </Submenu>
        <MenuItem name="3" disabled>
          一级导航 3
        </MenuItem>
        <Submenu class="demo-submenu2" name="4" disabled>
          <template v-slot:title>一级导航 4</template>
          <MenuItem name="4-1">二级导航 1</MenuItem>
        </Submenu>
      </Menu>
    `
  })

  it('should accept disabled prop', () => {
    const demoSubmenu = wrapper.find('.demo-submenu2')

    expect(demoSubmenu.attributes('aria-disabled')).toBe('true')
    expect(
      demoSubmenu.find('.c-submenu__title').attributes('aria-disabled')
    ).toBe('true')
  })

  it('should open or close submenu,\
    when click submenu title in vertical mode', async () => {
    const demoSubmenu = wrapper.find('.demo-submenu1')

    expect(
      demoSubmenu
        .find('.c-submenu__dropdown')
        .classes('c-submenu__dropdown--open')
    ).toBe(true)

    demoSubmenu.find('.c-submenu__title').trigger('click')
    await Vue.nextTick()
    expect(
      demoSubmenu
        .find('.c-submenu__dropdown')
        .classes('c-submenu__dropdown--open')
    ).toBe(false)
  })

  it('menu item should has padding in submenu according nest level,\
    when menu mode is vertical', () => {
    const demoItem = wrapper.find('.demo-item1')
    const demoItemLevel = 2

    expect(
      demoItem.element.style.paddingLeft ===
        `${VERTICAL_MENU_PADDING_LEFT * demoItemLevel}px`
    ).toBe(true)
  })
})
