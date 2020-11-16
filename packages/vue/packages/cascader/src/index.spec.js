/* eslint-disable no-magic-numbers */
import { mount, createLocalVue, createWrapper } from '@vue/test-utils'
import Vue from 'vue'
import CCascader from '../index'
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const options = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'chaoyang',
        label: '朝阳区'
      },
      {
        value: 'dongcheng',
        label: '东城区'
      },
      {
        value: 'xicheng',
        label: '西城区'
      },
      {
        value: 'haidian',
        label: '海淀区'
      },
      {
        value: 'fengtai',
        label: '丰台区'
      },
      {
        value: 'shunyi',
        label: '顺义区'
      },
      {
        value: 'huairou',
        label: '怀柔区'
      },
      {
        value: 'tongzhou',
        label: '通州区'
      },
      {
        value: 'changping',
        label: '昌平区'
      },
      {
        value: 'shijingshan',
        label: '石景山区'
      },
      {
        value: 'daxing',
        label: '大兴区'
      },
      {
        value: 'yanqing',
        label: '延庆区'
      },
      {
        value: 'fangshan',
        label: '房山区',
        disabled: true
      },
      {
        value: 'miyun',
        label: '密云区'
      },
      {
        value: 'mentougou',
        label: '门头沟区'
      },
      {
        value: 'pinggu',
        label: '平谷区'
      }
    ]
  },
  {
    value: 'tianjin',
    label: '天津市',
    children: [
      {
        value: 'heping',
        label: '和平区'
      },
      {
        value: 'hedong',
        label: '河东区'
      },
      {
        value: 'hexi',
        label: '河西区'
      },
      {
        value: 'hongqiao',
        label: '红桥区'
      }
    ]
  }
]

const options2 = [
  {
    key: 'beijing',
    name: '北京市',
    subs: [
      {
        key: 'chaoyang',
        name: '朝阳区',
        unavailable: true,
        noSub: true
      },
      {
        key: 'dongcheng',
        name: '东城区',
        noSub: true
      },
      {
        key: 'xicheng',
        name: '西城区',
        noSub: true
      },
      {
        key: 'haidian',
        name: '海淀区',
        noSub: true
      },
      {
        key: 'fengtai',
        name: '丰台区',
        noSub: true
      },
      {
        key: 'shunyi',
        name: '顺义区',
        noSub: true
      }
    ]
  },
  {
    key: 'tianjin',
    name: '天津市',
    subs: [
      {
        key: 'heping',
        name: '和平区'
      },
      {
        key: 'hedong',
        name: '河东区'
      },
      {
        key: 'hexi',
        name: '河西区',
        unavailable: true
      },
      {
        key: 'hongqiao',
        name: '红桥区'
      }
    ]
  }
]

describe('[cascader panel operations]', () => {
  const demo = {
    data() {
      return {
        options: options,
        disabled: false,
        val: []
      }
    },
    render(h) {
      return (
        <div>
          <CCascader
            v-model={this.val}
            options={this.options}
            ref="cascader"
            changeOnSelect
            clearable
            disabled={this.disabled}
            customStyle={{ maxHeight: '250px' }}
          />
        </div>
      )
    }
  }

  let wrapper
  const body = createWrapper(document.body)
  const animationTime = 100

  beforeEach(() => {
    wrapper = mount(demo)
  })
  afterEach(() => {
    wrapper.vm.$destroy()
    document.body.innerHTML = ''
  })
  afterAll(() => {
    wrapper.destroy()
  })

  it('should render as expected', async () => {
    const panel = body.find('.c-cascader__panel')
    expect(panel.element).not.toBeVisible()
    wrapper.find('.c-input-affix-container').trigger('click')
    await sleep(animationTime)
    expect(
      panel
        .find('li[role="option"][aria-level="1"]')
        .find('.c-cascader__label')
        .text()
    ).toBe('北京市')
    expect(panel.element).toBeVisible()
  })

  it('should change value when click', async () => {
    const panel = body.find('.c-cascader__panel')
    wrapper.find('.c-input-affix-container').trigger('click')
    await sleep(animationTime)
    const level1 = panel.find('li[role="option"][aria-level="1"]')
    level1.trigger('focus')
    level1.trigger('click')
    await sleep(animationTime)
    expect(wrapper.vm.$refs.cascader.value).toContain('beijing')
    const level2 = panel.find('li[role="option"][aria-level="2"]')
    level2.trigger('focus')
    level2.trigger('click')
    await sleep(animationTime)
    expect(wrapper.vm.$refs.cascader.value).toContain('chaoyang')
    expect(panel.element).not.toBeVisible()
  })

  it('should clear value when click clear icon', async () => {
    wrapper.find('.c-input-affix-container').trigger('click')
    await sleep(animationTime)
    const container = wrapper.find('.c-input-affix-container')
    container.trigger('mouseenter')
    await Vue.nextTick()
    expect(wrapper.find('.c-cascader__suffix').element).toBeVisible()
    wrapper.find('.c-cascader__suffix').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.$refs.cascader.value).toEqual([])
    container.trigger('mouseleave')
  })

  it('should be disabled as expected', async () => {
    expect(wrapper.vm.$refs.cascader.$refs.cPanel.bordered).toBeFalsy()
    wrapper.vm.disabled = true
    await sleep(animationTime)
    expect(wrapper.vm.$refs.cascader.$refs.cPanel).toBeUndefined()
    expect(wrapper.vm.$refs.cascader.cascaderTriggerType).toBe('none')
    // keydown when disabled
    wrapper.find('.c-input').trigger('keydown', {
      code: 'Enter'
    })
    wrapper.find('.c-cascader__suffix').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.$refs.cascader.popoverVisible).toBeFalsy()
  })
})

it('vue.use: vue.use function and the default trigger is "click"', async () => {
  const localVue = createLocalVue()
  localVue.use(CCascader)

  const cascader = {
    data() {
      return {
        myOptions: options,
        value: ['beijing']
      }
    },
    render(h) {
      return (
        <c-cascader
          ref="cascader"
          options={this.myOptions}
          v-model={this.value}
          change-on-select
        />
      )
    }
  }

  const wrapper = mount(cascader, {
    localVue
  })
  await sleep(100)
  wrapper.find('.c-input-affix-container').trigger('click')
  await sleep(16)
  expect(wrapper.vm.$refs.cascader.popoverVisible).toBeTruthy()
})

it('should trigger keyboard events as expected', async () => {
  const wrapper = mount(CCascader, {
    propsData: {
      trigger: 'click',
      options: options,
      changeOnSelect: true,
      transition: 'none',
      clearable: true,
      customStyle: { height: '400px', maxHeight: '250px' }
    }
  })

  await sleep(100)
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeFalsy()
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowUp'
  })
  wrapper.find('.c-input').trigger('keydown', {
    code: 'Enter'
  })
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowUp'
  })
  wrapper.find('.c-input').trigger('keydown', {
    code: 'Enter'
  })
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeFalsy()
  wrapper.find('.c-input').trigger('keydown', {
    code: 'Space'
  })
  wrapper.find('.c-input').trigger('focus')
  wrapper.find('.c-input').trigger('blur')
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  wrapper.find('.c-input-affix-container').trigger('keydown', {
    code: 'Escape'
  })
  await sleep(100)
  expect(wrapper.vm.popoverVisible).toBeFalsy()
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowDown'
  })
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowDown'
  })
})

it('should load custom property as expected', async () => {
  const wrapper = mount(CCascader, {
    propsData: {
      trigger: 'click',
      options: options2,
      changeOnSelect: true,
      transition: 'none',
      size: 'large',
      separator: '/',
      clearable: true,
      filterable: true,
      disabled: false,
      placeholder: '请选择',
      filterMethod: (node, query) => {
        return (
          node.label.toLowerCase().includes(query.toLowerCase()) ||
          node.value.toString().toLowerCase().includes(query.toLowerCase())
        )
      },
      lazy: true,
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            resolve([
              {
                value: 'clair',
                label: 'clair'
              }
            ])
          }, 50)
        })
      },
      dataMap: {
        label: 'name',
        value: 'key',
        children: 'subs',
        leaf: 'noSub',
        disabled: 'unavailable'
      },
      hideDelay: 0,
      showDelay: 0,
      customStyle: { height: '400px' },
      value: ['beijing']
    }
  })

  wrapper.setProps({
    value: ['tianjin']
  })
  await Vue.nextTick()
  expect(wrapper.vm.lazy).toBeTruthy()
  expect(wrapper.vm.$refs.cPanel.$el.style.height).toBe('400px')
})

it('should change value and showText when options changed(definitely different)', async () => {
  const wrapper = mount(CCascader, {
    propsData: {
      trigger: 'click',
      options: options,
      transition: 'none',
      size: 'large',
      separator: '/',
      clearable: true,
      filterable: true,
      disabled: false,
      placeholder: '请选择',
      value: ['beijing', 'chaoyang']
    }
  })
  expect(wrapper.vm.showText).toBe('北京市/朝阳区')

  wrapper.setProps({
    options: options.slice(1)
  })
  await Vue.nextTick()
  expect(wrapper.emitted().change).toBeTruthy()
  expect(wrapper.vm.showText).toBe('')
})

it('should append to specified container with `appendTarget`', async () => {
  document.body.innerHTML = ''
  const div = document.createElement('div')
  mount(CCascader, {
    propsData: {
      options,
      appendTarget: div
    }
  })
  await Vue.nextTick()
  expect(document.body.querySelector('.c-cascader__popover')).toBeFalsy()
  expect(div.querySelector('.c-cascader__popover')).toBeTruthy()
})

it('should recover panel when reopen', async () => {
  document.body.innerHTML = ''
  const div = document.createElement('div')
  const animationTime = 100
  const wrapper = mount(CCascader, {
    propsData: {
      options,
      appendTarget: div,
      trigger: 'click',
      hideDelay: 0,
      clearable: false
    }
  })
  await Vue.nextTick()
  await sleep(100)
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  expect(wrapper.vm.showText).toBe('')
  // expanded but not select,then close panel.
  const divWrapper = createWrapper(div)
  const menu = divWrapper.findAll('.c-cascader__list').at(0)
  const node = menu.findAll('li[role="option"]').at(1)
  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  await sleep(animationTime)
  const menu1 = divWrapper.findAll('.c-cascader__list').at(1)
  expect(menu1.findAll('li[role="option"]').at(0).text()).toBe('和平区')
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  await sleep(animationTime)
  expect(wrapper.vm.showText).toBe('')
  expect(wrapper.vm.popoverVisible).toBeFalsy()
  // 再次展开，需要恢复本来面板。
  wrapper.find('.c-cascader__suffix').trigger('click')
  await sleep(animationTime)
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  expect(divWrapper.findAll('.c-cascader__list').length).toBe(1)
})

it('should recover panel when reopen in lazy mode', async () => {
  document.body.innerHTML = ''
  const div = document.createElement('div')
  const animationTime = 100
  const wrapper = mount(CCascader, {
    propsData: {
      options,
      lazy: true,
      value: ['beijing'],
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            resolve([
              {
                value: 'clair',
                label: 'clair'
              }
            ])
          }, 50)
        })
      },
      appendTarget: div,
      trigger: 'click',
      hideDelay: 0,
      clearable: false
    }
  })
  await Vue.nextTick()
  await sleep(100)
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  expect(wrapper.vm.showText).toBe('北京市')
  // expanded but not select,then close panel.
  const divWrapper = createWrapper(div)
  const menu = divWrapper.findAll('.c-cascader__list').at(0)
  const node = menu.findAll('li[role="option"]').at(1)
  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  await sleep(animationTime)
  expect(divWrapper.findAll('.c-cascader__list').length).toBe(2)
  wrapper.find('.c-cascader__suffix').trigger('click')
  await Vue.nextTick()
  await sleep(animationTime)
  expect(wrapper.vm.showText).toBe('北京市')
  expect(wrapper.vm.popoverVisible).toBeFalsy()
  // 再次展开，需要恢复本来面板。
  wrapper.find('.c-cascader__suffix').trigger('click')
  await sleep(animationTime)
  await Vue.nextTick()
  expect(wrapper.vm.popoverVisible).toBeTruthy()
  expect(divWrapper.findAll('.c-cascader__list').length).toBe(1)
})

it('should trigger the visibility-change event as expected', async () => {
  document.body.innerHTML = ''
  const div = document.createElement('div')
  const wrapper = mount(CCascader, {
    propsData: {
      trigger: 'click',
      options: options,
      transition: 'none',
      size: 'large',
      separator: '/',
      clearable: true,
      placeholder: '请选择',
      value: ['beijing', 'chaoyang'],
      appendTarget: div
    }
  })
  wrapper.find('.c-cascader__suffix').trigger('click')
  expect(wrapper.emitted()['visibility-change'].length).toBe(1)
  wrapper.find('.c-cascader__suffix').trigger('click')
  expect(wrapper.emitted()['visibility-change'].length).toBe(2)
  wrapper.find('.c-input-affix-container').trigger('click')
  await Vue.nextTick()
  await sleep(100)
  expect(wrapper.emitted()['visibility-change'].length).toBe(3)

  const divWrapper = createWrapper(div)
  const menu = divWrapper.findAll('.c-cascader__list').at(1)
  const node = menu.findAll('li[role="option"]').at(1)
  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  expect(wrapper.emitted()['visibility-change'].length).toBe(4)
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowUp'
  })
  wrapper.find('.c-input').trigger('keydown', {
    code: 'Enter'
  })
  await Vue.nextTick()
  expect(wrapper.emitted()['visibility-change'].length).toBe(5)
  wrapper.find('.c-input').trigger('keydown', {
    code: 'ArrowUp'
  })
  wrapper.find('.c-input').trigger('keydown', {
    code: 'Enter'
  })
  expect(wrapper.emitted()['visibility-change'].length).toBe(6)
})
