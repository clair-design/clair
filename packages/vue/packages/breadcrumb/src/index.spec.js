import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Breadcrumb from './index'
import BreadcrumbItem from './breadcrumb-item'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('[Breadcrumb] basics', () => {
  it('should accept different separators', () => {
    const wrapper = mount(Breadcrumb, {
      propsData: {
        separator: '>'
      },
      slots: {
        default: BreadcrumbItem
      }
    })
    expect(wrapper.find('.c-breadcrumb__separator').text()).toEqual('>')
    wrapper.find('.c-breadcrumb__item span').trigger('click')
  })

  it('should support VueRouter', async () => {
    const DemoApp = {
      render(h) {
        return (
          <Breadcrumb separator=">">
            <BreadcrumbItem to={{ path: '/home' }} replace={true}>
              首页
            </BreadcrumbItem>
            <BreadcrumbItem to={{ path: '/model' }}>数据模型</BreadcrumbItem>
            <BreadcrumbItem>
              <span>
                <a href="/display">数据展示</a>
              </span>
            </BreadcrumbItem>
          </Breadcrumb>
        )
      }
    }
    const wrapper = mount(DemoApp, {
      localVue,
      router
    })

    expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3)
    expect(wrapper.find('.c-breadcrumb__separator').text()).toEqual('>')

    wrapper.findAll('[role="link"]').at(0).trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.$route.path).toEqual('/home')

    wrapper.findAll('[role="link"]').at(1).trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.$route.path).toEqual('/model')
  })
})
