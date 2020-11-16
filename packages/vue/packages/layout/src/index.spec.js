import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Layout from './index'
import Header from './header'
import Aside from './aside'
import Main from './main'
import Footer from './footer'

const components = {
  'c-layout': Layout,
  'c-header': Header,
  'c-main': Main,
  'c-aside': Aside,
  'c-footer': Footer
}

describe('[Layout] basics layout', () => {
  it('should throw with no content', () => {
    const testApp = {
      components,
      render(h) {
        return <c-layout />
      }
    }
    // eslint-disable-next-line
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})
    try {
      mount(testApp)
    } catch (err) {
      expect(err.message).toBeTruthy()
    } finally {
      spy.mockRestore()
    }
  })

  it('should stack vertically without aside', () => {
    const testApp = {
      components,
      render(h) {
        return (
          <c-layout>
            <c-header>header</c-header>
            <c-main>main</c-main>
            <c-footer>footer</c-footer>
          </c-layout>
        )
      }
    }
    const wrapper = mount(testApp)
    const layout = wrapper.find('.c-layout')
    const header = wrapper.find('.c-layout__header')
    const main = wrapper.find('.c-layout__main')
    const footer = wrapper.find('.c-layout__footer')
    expect(layout).toBeTruthy()
    expect(layout.classes('c-layout--has-aside')).toBe(false)
    expect(header).toBeTruthy()
    expect(footer).toBeTruthy()
    expect(main).toBeTruthy()
  })
})

describe('[Aside] sidebar', () => {
  it('should display horizontally with sidebar', async () => {
    const testApp = {
      components,
      render(h) {
        return (
          <c-layout>
            <c-aside>aside</c-aside>
            <c-main>main</c-main>
          </c-layout>
        )
      }
    }
    const wrapper = mount(testApp)
    const layout = wrapper.find('.c-layout')
    expect(layout).toBeTruthy()
    expect(layout.classes('c-layout--has-aside')).toBe(true)
  })

  it('should be collapsed by prop', async () => {
    const testApp = {
      components,
      data() {
        return { collapsed: false }
      },
      render(h) {
        return (
          <c-layout>
            <c-aside collapsed={this.collapsed}>aside</c-aside>
            <c-main>main</c-main>
          </c-layout>
        )
      }
    }
    const wrapper = mount(testApp)
    const aside = wrapper.find('.c-layout__aside')
    expect(aside.classes('c-layout__aside--collapsed')).toBe(false)

    wrapper.setData({ collapsed: true })
    await Vue.nextTick()
    expect(aside.classes('c-layout__aside--collapsed')).toBe(true)
  })

  it('should be toggle collapse by click button', async () => {
    const testApp = {
      components,
      data() {
        return { collapsed: false }
      },
      render(h) {
        return (
          <c-layout>
            <c-aside vModel={this.collapsed} collapsible>
              aside
            </c-aside>
            <c-main>main</c-main>
          </c-layout>
        )
      }
    }
    const wrapper = mount(testApp)
    const aside = wrapper.find('.c-layout__aside')
    expect(aside.classes('c-layout__aside--collapsed')).toBe(false)

    const trigger = wrapper.find('.c-layout__collapse-trigger')
    trigger.trigger('click')
    await Vue.nextTick()
    expect(aside.classes('c-layout__aside--collapsed')).toBe(true)
  })

  it('should make main scrolling when header and aside fixed', async () => {
    const testApp = {
      components,
      data() {
        return { showHeader: true }
      },
      render(h) {
        const header = this.showHeader ? (
          <c-header fixed>header</c-header>
        ) : null
        return (
          <c-layout>
            {header}
            <c-layout>
              <c-aside fixed>aside</c-aside>
              <c-main>main</c-main>
            </c-layout>
          </c-layout>
        )
      }
    }
    const wrapper = mount(testApp)
    await Vue.nextTick()
    const layout = wrapper.find('.c-layout')
    expect(layout.classes('c-layout--scroll-main')).toBe(true)

    wrapper.setData({ showHeader: false })
    await Vue.nextTick()
    expect(layout.classes('c-layout__aside--collapsed')).toBe(false)
  })
})
