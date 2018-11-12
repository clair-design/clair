import { mount, shallowMount } from '@vue/test-utils'
import Breadcrumb from './index.vue'
import BreadcrumbItem from './breadcrumb-item.vue'

const components = {
  'c-breadcrumb': Breadcrumb,
  'c-breadcrumb-item': BreadcrumbItem
}

describe('breadcrumb-item', function () {
  it('should works', () => {
    const wrapper = shallowMount(BreadcrumbItem, {
      slots: { default: '<div>Content</div>' }
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.text()).toContain('Content')
  })
})

describe('breadcrumb', function () {
  it('should works', () => {
    const template = `<c-breadcrumb>
  <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
  <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
  <c-breadcrumb-item>修改密码</c-breadcrumb-item>
</c-breadcrumb>`

    const wrapper = mount({
      template,
      components
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('works with custom divider', () => {
    const template = `<c-breadcrumb divider="▹">
  <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
  <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
  <c-breadcrumb-item>修改密码</c-breadcrumb-item>
</c-breadcrumb>`

    const wrapper = mount({ template, components })
    expect(wrapper.findAll('i').length).toBe(2)
    expect(wrapper).toMatchSnapshot()
  })

  it('works with scoped slot as custom divider', () => {
    const template = `<c-breadcrumb>
  <template slot="divider" slot-scope="props">
    <span class="divider">$</span>
  </template>
  <c-breadcrumb-item><a href="#">首页</a></c-breadcrumb-item>
  <c-breadcrumb-item><a href="#">个人信息</a></c-breadcrumb-item>
  <c-breadcrumb-item>修改密码</c-breadcrumb-item>
</c-breadcrumb>`

    const wrapper = mount({ template, components })
    expect(wrapper.text()).toContain('$')
    expect(wrapper).toMatchSnapshot()
  })
})
