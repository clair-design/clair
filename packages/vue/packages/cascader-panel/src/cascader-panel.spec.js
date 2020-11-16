/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import CCascaderPanel from '../index'
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

it('vue.use: vue.use function and the default trigger is "click"', async () => {
  const localVue = createLocalVue()
  localVue.use(CCascaderPanel)

  const cascader = {
    data() {
      return {
        myOptions: options,
        val: []
      }
    },
    render(h) {
      return (
        <c-cascader-panel
          ref="cascader"
          options={this.myOptions}
          v-model={this.val}
        />
      )
    }
  }

  const wrapper = mount(cascader, {
    localVue
  })

  wrapper.find('li[role="option"]').trigger('mouseenter')
  await Vue.nextTick()
  // 默认展开方法为click
  expect(wrapper.vm.$refs.cascader.$refs.menu.length).toBe(1)

  wrapper.find('li[role="option"]').trigger('focus')
  wrapper.find('li[role="option"]').trigger('click')

  await sleep(160)
  expect(wrapper.vm.$refs.cascader.$refs.menu.length).toBe(2)

  wrapper.vm.val = ['beijing', 'chaoyang']
  await Vue.nextTick()
  expect(wrapper.vm.$refs.cascader.checkedValue).toEqual([
    'beijing',
    'chaoyang'
  ])

  wrapper.vm.val = []
  await Vue.nextTick()
  expect(wrapper.vm.$refs.cascader.checkedValue).toEqual([])
})

it('trigger: hover', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'hover',
      options: options
    }
  })
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('click')
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('mouseenter')

  await sleep(20)
  wrapper.find('li[role="option"]').trigger('mouseenter')
  wrapper.find('.c-cascader__list').trigger('mouseleave')

  await sleep(160)
  wrapper.find('.c-cascader__list').trigger('mouseleave')
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('mouseenter')
  wrapper.find('li[role="option"]').trigger('focus')

  await sleep(160)
  expect(wrapper.vm.$refs.menu.length).toBe(1 + 1)
})

it('trigger: click', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options
    }
  })
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('mouseenter')

  await sleep(160)
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('focus')
  wrapper.find('li[role="option"]').trigger('click')
  await Vue.nextTick()
  expect(wrapper.vm.$refs.menu.length).toBe(1 + 1)
})

it('lazy load and lazy method', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      lazy: true,
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            node.children = node.children.concat([
              {
                value: 'clair',
                label: 'clair',
                isLeaf: true
              }
            ])
            resolve()
          }, 50)
        })
      }
    }
  })
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  const node = wrapper.find('li[role="option"]')
  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  expect(node.find('.c-icon--spin').element).toBeTruthy()

  await sleep(60)
  expect(wrapper.vm.$refs.menu.length).toBe(1 + 1)
})

it('lazy: lazy mode with initial value data', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      lazy: true,
      value: ['beijing', 'chaoyang'],
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            node.children = node.children.concat([
              {
                value: 'clair',
                label: 'clair'
              },
              {
                key: 'clair1',
                name: 'clair1'
              }
            ])
            resolve()
          }, 50)
        })
      }
    }
  })
  const node = wrapper.find('li[role="option"]')
  node.trigger('focus')
  node.trigger('click')

  await sleep(60)

  //被选中
  expect(wrapper.vm.checkedNode.valuePath.toString()).toBe('beijing,chaoyang')
  expect(wrapper.emitted().change).toBeFalsy()
})

it('lazy: lazy method returned empty data or illegal data', async () => {
  const funs = [
    [],
    [
      {
        sd: 'clair',
        dd: 'clair'
      }
    ],
    1,
    '',
    null,
    undefined
  ].map(item => {
    return node => {
      return new Promise(resolve => {
        node.children = item
        resolve()
      })
    }
  }, [])

  funs.forEach(fun => {
    const wrapper = mount(CCascaderPanel, {
      propsData: {
        trigger: 'click',
        lazy: true,
        lazyMethod: fun
      }
    })
    expect(wrapper.find('.c-cascader__empty-text').exists()).toBeTruthy()
  })
})

it('lazy: illegal lazy method', async () => {
  const fun = r => {
    return true
  }
  ;['', 1, fun].forEach(async item => {
    const wrapper = mount(CCascaderPanel, {
      propsData: {
        trigger: 'click',
        options: [],
        lazy: true,
        lazyMethod: item
      }
    })
    expect(wrapper.find('.c-cascader__empty-text').exists()).toBeTruthy()
  })
})

it('lazy load and lazy method: without initial data', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      lazy: true,
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            node.children = node.children.concat([
              {
                value: 'clair',
                label: 'clair'
              }
            ])
            resolve()
          }, 50)
        })
      }
    }
  })
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeTruthy()
  await sleep(60)
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeFalsy()
})

it('change-on-select', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      changeOnSelect: true
    }
  })
  await Vue.nextTick()

  expect(wrapper.vm.$refs.menu.length).toBe(1)
  wrapper.find('li[role="option"]').trigger('focus')
  await Vue.nextTick()
  wrapper.find('li[role="option"]').trigger('click')
  await Vue.nextTick()
  expect(wrapper.findAll('[role="listbox"]').length).toBe(1 + 1)

  expect(wrapper.emitted().change).toBeTruthy()
  expect(wrapper.emitted()['expand-change']).toBeTruthy()
})

it('filter: filter leaf nodes when change-on-select=false, filter all nodes when change-on-select=true', async () => {
  const Demo = {
    data() {
      return {
        trigger: 'click',
        options: options,
        query: '北京',
        changeOnSelect: false
      }
    },
    render() {
      return (
        <CCascaderPanel
          ref="panel"
          trigger={this.trigger}
          options={this.options}
          query={this.query}
          changeOnSelect={this.changeOnSelect}
        />
      )
    }
  }

  const wrapper = mount(Demo)

  expect(wrapper.vm.$refs.panel.$refs.menu).toBeUndefined()
  expect(wrapper.find('.c-cascader__list [role="option"]').text()).toBe(
    '北京市/朝阳区'
  )

  wrapper.setData({
    query: null
  })
  await Vue.nextTick()

  expect(wrapper.vm.$refs.panel.$refs.menu.length).toBe(1)
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeFalsy()
  wrapper.setData({
    changeOnSelect: true,
    query: '北京'
  })

  await Vue.nextTick()

  expect(wrapper.find('.c-cascader__list [role="option"]').text()).toBe(
    '北京市'
  )
})

it('filter: disabled node could not be checked', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: '房山'
    }
  })
  expect(wrapper.vm.searchMode).toBeTruthy()
  wrapper.find('li[role="option"]').trigger('click')
  expect(wrapper.vm.checkedNode).toBeNull()
})

it('filter and filter-method: the user-defined filter-method', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: 'chaoyang',
      filter: (node, query) => {
        return (
          node.label.toLowerCase().includes(query.toLowerCase()) ||
          node.value.toString().toLowerCase().includes(query.toLowerCase())
        )
      }
    }
  })

  expect(wrapper.vm.$refs.menu).toBeUndefined()
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeFalsy()
  expect(wrapper.vm.searchMode).toBeTruthy()
})

it('filter and lazy: in lazy mode, just the loaded options can be filter', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: '朝阳区',
      lazy: true,
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            node.children = node.children.concat([
              {
                value: 'clair',
                label: 'clair'
              }
            ])
            resolve()
          }, 50)
        })
      },
      changeOnSelect: true
    }
  })

  expect(wrapper.vm.$refs.menu).toBeUndefined()
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeTruthy()

  wrapper.setProps({
    query: '北京'
  })

  await Vue.nextTick()

  expect(wrapper.vm.searchMode).toBeTruthy()
  expect(wrapper.findAll('li[role="option"]').length).toBe(1)
})

it('filter: click filtered items, then clear the filter query, the selected node will be auto checked', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: '朝阳区'
    }
  })

  expect(wrapper.vm.searchMode).toBeTruthy()
  expect(wrapper.vm.checkedNode).toBe(null)
  wrapper.find('li[role="option"]').trigger('click')
  expect(wrapper.vm.checkedNode.valuePath.join(',')).toBe('beijing,chaoyang')
  expect(wrapper.emitted().change).toBeTruthy()
})

it('filter:in lazy mode, click filtered items, then clear filter query, the selected node will be auto checked and auto load child', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      lazy: true,
      query: '',
      changeOnSelect: true,
      lazyMethod: node => {
        return new Promise(resolve => {
          setTimeout(_ => {
            node.children = node.children.concat([
              {
                value: 'clair',
                label: 'clair'
              }
            ])
            resolve()
          }, 50)
        })
      }
    }
  })

  expect(wrapper.findAll('[role="listbox"]').length).toBe(1)
  const node = wrapper.findAll('li[role="option"]').at(0)
  node.trigger('focus')
  await Vue.nextTick()
  expect(node.find('.c-icon--spin').exists()).toBeTruthy()

  await sleep(60)
  expect(wrapper.findAll('[role="listbox"]').length).toBe(1 + 1)

  wrapper
    .findAll('.c-cascader__list')
    .at(1)
    .find('li[role="option"]')
    .trigger('click')

  wrapper.setProps({
    query: '顺义区'
  })
  await Vue.nextTick()

  expect(wrapper.vm.searchMode).toBeTruthy()

  const searchNode = wrapper.findAll('li[role="option"]').at(0)
  expect(searchNode.find('em').text()).toBe('顺义区')
  wrapper.vm.focusFirstNode()
  searchNode.trigger('click')

  wrapper.setProps({
    query: ''
  })
  await Vue.nextTick()

  expect(wrapper.vm.searchMode).toBeFalsy()
  expect(wrapper.find('.c-icon--spin').exists()).toBeTruthy()

  await sleep(60)
  expect(wrapper.findAll('[role="listbox"]').length).toBe(1 + 1 + 1)
})

it('initial: when set a legal initial value, should auto expand and scroll into view', async () => {
  const div = document.createElement('div')
  document.body.append(div)
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      value: ['beijing', 'pinggu']
    },
    attachTo: div
  })

  await Vue.nextTick()

  expect(wrapper.vm.$refs.menu.length).toBe(2)
  expect(wrapper.vm.checkedNode.valuePath.toString()).toBe('beijing,pinggu')
  expect(wrapper.emitted().change).toBeFalsy()

  // 选项需要展示在可视区域内 这里获取不到元素的高宽，无法测试
  wrapper.destroy()
})

it('initial: when set a illegal initial value, nothing will happen', async () => {
  ;[['balabala', 'xiaomoxian'], null, []].forEach(item => {
    const wrapper = mount(CCascaderPanel, {
      propsData: {
        trigger: 'click',
        options: options,
        value: item
      }
    })
    expect(wrapper.vm.$refs.menu.length).toBe(1)
    expect(wrapper.vm.checkedNode).toBeUndefined()
  })
})

it('change-on-select=false: event "change" should trigger when click leaf nodes', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options
    }
  })
  const menu = wrapper.findAll('.c-cascader__list').at(0)
  const node = menu.find('li[role="option"]')

  node.trigger('focus')
  node.trigger('click')
  expect(wrapper.emitted().change).toBeFalsy()

  await Vue.nextTick()
  const menu1 = wrapper.findAll('.c-cascader__list').at(1)
  const node1 = menu1.find('li[role="option"]')

  node1.trigger('focus')
  node1.trigger('click')
  expect(wrapper.emitted().change).toBeTruthy()
})
it('change-on-select=true: event "change" should trigger when click all nodes and change-on-select=true', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      changeOnSelect: true
    }
  })
  const menu = wrapper.findAll('.c-cascader__list').at(0)
  const node = menu.find('li[role="option"]')

  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  expect(wrapper.emitted().change).toBeTruthy()
  expect(wrapper.vm.checkedNode.valuePath.toString()).toBe('beijing')

  const menu1 = wrapper.findAll('.c-cascader__list').at(1)
  const node1 = menu1.find('li[role="option"]')

  node1.trigger('click')
  await Vue.nextTick()
  expect(wrapper.emitted().change).toBeTruthy()
  expect(wrapper.vm.checkedNode.valuePath.toString()).toBe('beijing,chaoyang')
})

it('close: event "close" should trigger when click leaf nodes or press [esc] key when focused', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options
    }
  })
  const menu = wrapper.findAll('.c-cascader__list').at(0)
  const node = menu.find('li[role="option"]')

  node.trigger('focus')
  node.trigger('click')
  await Vue.nextTick()
  expect(wrapper.emitted().close).toBeFalsy()

  const menu1 = wrapper.findAll('.c-cascader__list').at(1)
  const node1 = menu1.find('li[role="option"]')

  node1.trigger('focus')
  node1.trigger('click')
  await Vue.nextTick()
  expect(wrapper.emitted().close).toBeTruthy()

  menu1.trigger('keydown', {
    code: 'Escape'
  })

  expect(wrapper.emitted().close.length).toBe(2)
})

it('expand-change: event "expand-change" should trigger when expanded menu has changed', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      changeOnSelect: true
    }
  })
  const menu = wrapper.findAll('.c-cascader__list').at(0)
  const node = menu.find('li[role="option"]')

  node.trigger('focus')
  expect(wrapper.emitted()['expand-change']).toBeTruthy()
})

it('slot:empty: empty slot should be used when options data is not set', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: []
    },
    slots: {
      empty: 'xixi'
    }
  })
  expect(wrapper.find('.c-cascader__list').exists()).toBeFalsy()
  expect(wrapper.text()).toBe('xixi')
})

it('slot:search-empty: empty slot should be used when search result is empty', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: 'xiqbd'
    },
    slots: {
      'filter-empty': '没有搜索结果'
    }
  })
  expect(wrapper.find('.c-cascader__list').exists()).toBeFalsy()
  expect(wrapper.text()).toBe('没有搜索结果')
})

it('slot:node: node slot should be used when rendering', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options
    },
    scopedSlots: {
      node: '<p slot-scope="node">{{node.label}}({{node.children.length}})</p>'
    }
  })

  const node = wrapper
    .find('.c-cascader__list')
    .find('li[role="option"]')
    .find('.c-cascader__label')

  expect(node.text()).toBe('北京市(16)')
})

it('slot:filter-node: filter-node slot should be used when rendering', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: '天津'
    },
    scopedSlots: {
      'filter-node': '<p slot-scope="node">{{node.label}}</p>'
    }
  })

  const node = wrapper.find('.c-cascader__list').find('li[role="option"]')

  expect(node.text()).toBe('和平区')
})

it('disabled: disabled options', () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: [{ value: '1', label: '被禁止的node', disabled: true }]
    }
  })

  const node = wrapper
    .find('.c-cascader__list')
    .find('li[role="option"][aria-disabled]')
  expect(node.find('.c-cascader__label').text()).toBe('被禁止的node')
  expect(node.attributes('aria-disabled')).toBe('true')
})

it('data-map: then user-defined options key', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      dataMap: {
        label: 'name',
        value: 'key',
        children: 'subs',
        isLeaf: 'noSub',
        disabled: 'unavailable'
      }
    }
  })
  await Vue.nextTick()
  expect(wrapper.find('.c-cascader__empty-text').exists()).toBeTruthy()

  wrapper.setProps({
    options: options2
  })

  await Vue.nextTick()
  expect(wrapper.vm.$refs.menu.length).toBe(1)
  expect(wrapper.vm.nodes.getNodes().length).toBe(2)
})

it('keyboard events: a few keyboard events', async () => {
  const div = document.createElement('div')
  document.body.append(div)
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options
    },
    attachTo: div
  })
  const menu = wrapper.findAll('.c-cascader__list').at(0)
  let node = menu.find('li[role="option"]')

  node.element.focus()
  node.trigger('click') // beijing
  node.trigger('keydown', {
    code: 'ArrowDown'
  }) // tianjin

  await Vue.nextTick()
  node = menu.find('li[role="option"][aria-expanded="true"]')
  node.trigger('keydown', {
    code: 'ArrowDown'
  }) // beijing

  await Vue.nextTick()
  node = menu.find('li[role="option"][aria-expanded="true"]')
  node.trigger('keydown', {
    code: 'ArrowLeft'
  }) // tianjin

  await Vue.nextTick()
  node = menu.find('li[role="option"][aria-expanded="true"]')
  node.trigger('keydown', {
    code: 'ArrowLeft'
  }) // beijing
  await Vue.nextTick()

  expect(wrapper.emitted()['expand-change'].length).toBe(5)

  node = menu.find('li[role="option"][aria-expanded="true"]')
  node.trigger('keydown', {
    code: 'ArrowRight'
  }) // chaoyang

  await Vue.nextTick()
  expect(wrapper.vm.checkedNode).toBeUndefined()
  node = wrapper.findAll('.c-cascader__list').at(1).find('li[role="option"]')
  node.trigger('keydown', {
    code: 'Enter'
  }) // chaoyang
  await Vue.nextTick()
  node.trigger('keydown', {
    code: 'Enter'
  })

  await Vue.nextTick()
  expect(wrapper.emitted().change.length).toBe(1)
  expect(wrapper.vm.checkedNode.valuePath.toString()).toBe('beijing,chaoyang')

  node.trigger('keydown', {
    code: 'ArrowRight'
  })
  node.trigger('click')
  node.trigger('keydown', {
    code: 'ArrowLeft'
  })
  node.trigger('keydown', {
    code: 'ArrowUp'
  })
  node.trigger('keydown', {
    code: 'Escape'
  })
  node.trigger('keydown', {
    code: 'Tab'
  })
  node.trigger('keydown', {
    code: 'Space'
  })

  expect(wrapper.emitted()['expand-change'].length).toBe(8)
  expect(wrapper.emitted().change.length).toBe(1)

  expect(wrapper.emitted().close.length).toBe(3)
  wrapper.destroy()
})

it('keyboard events in search mode: a few keyboard events', async () => {
  const wrapper = mount(CCascaderPanel, {
    propsData: {
      trigger: 'click',
      options: options,
      query: '北京',
      changeOnSelect: true
    }
  })

  const node = wrapper.find('li[role="option"]')

  node.trigger('keydown', {
    code: 'Enter'
  })
  await Vue.nextTick()
  expect(wrapper.emitted().close.length).toBe(1)
  node.trigger('keydown', {
    code: 'ArrowDown'
  })
  node.trigger('keydown', {
    code: 'ArrowUp'
  })
  node.trigger('keydown', {
    code: 'Tab'
  })
  node.trigger('keydown', {
    code: 'Escape'
  })
  node.trigger('keydown', {
    code: 'Space'
  })
  await Vue.nextTick()
  expect(wrapper.emitted()['expand-change']).toBeUndefined()
  expect(wrapper.emitted().change).toBeTruthy()

  expect(wrapper.emitted().close.length).toBe(3)

  node.trigger('click')
  await Vue.nextTick()

  expect(wrapper.emitted().change.length).toBe(1)
})
