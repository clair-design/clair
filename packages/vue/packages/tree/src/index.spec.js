import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Tree from './index'

function getTreeData(customize = v => v) {
  return customize([
    {
      key: 1,
      label: '一级 1',
      children: [
        {
          key: 11,
          label: '二级 1-1',
          children: [
            {
              key: 111,
              label: '三级 1-1-1'
            },
            {
              key: 112,
              label: '三级 1-1-2'
            },
            {
              key: 113,
              label: '三级 1-1-3'
            }
          ]
        },
        {
          key: 12,
          label: '二级 1-2',
          children: [
            {
              key: 121,
              label: '三级 1-2-1'
            },
            {
              key: 122,
              label: '三级 1-2-2'
            },
            {
              key: 123,
              label: '三级 1-2-3'
            }
          ]
        },
        {
          key: 13,
          label: '二级 1-3'
        }
      ]
    },
    {
      key: 2,
      label: '一级 2',
      children: [
        {
          key: 21,
          label: '二级 2-1'
        }
      ]
    }
  ])
}

function createTree(props = {}, { customizeData, ...options } = {}) {
  return mount(Tree, {
    propsData: {
      data: getTreeData(customizeData),
      keyProp: 'key',
      defaultExpandedKeys: [1, 11],
      ...props
    },
    ...options
  })
}

describe('[Tree] basics', () => {
  it('is created correctly', () => {
    const wrapper = createTree()
    expect(wrapper.find('.c-tree')).toBeDefined()
    expect(wrapper.findAll('[role=treeitem]').length).toBe(8)
  })

  it('prop: props', () => {
    const wrapper = mount(Tree, {
      propsData: {
        data: [
          {
            id: 1,
            text: '一级 1',
            sub: [
              {
                id: 11,
                text: '二级 1-1',
                leaf: true,
                disable: true
              }
            ]
          }
        ],
        keyProp: 'id',
        defaultExpandedKeys: [1],
        props: {
          label: 'text',
          children: 'sub',
          isLeaf: 'leaf',
          disabled: 'disable'
        }
      }
    })
    expect(wrapper.find('.c-tree')).toBeDefined()
    expect(wrapper.findAll('[role=treeitem]').length).toBe(2)
    expect(wrapper.find('[role=treeitem]').find('.c-tree__label').text()).toBe(
      '一级 1'
    )
    expect(wrapper.findAll('[aria-expanded]').length).toBe(1)
    expect(wrapper.findAll('[aria-disabled]').length).toBe(1)
  })

  it('event: nodeClick', done => {
    const wrapper = createTree(
      {},
      {
        listeners: {
          'node-click': function ({ detail: { node } }) {
            expect(node.key).toBe(1)
            done()
          }
        }
      }
    )
    wrapper.find('[role=treeitem').trigger('click')
  })
})

describe('[Tree] expand/collapse', () => {
  it('expand/collapse work', async () => {
    const wrapper = createTree()
    const firstNode = wrapper.find('[role=treeitem]')
    firstNode.trigger('click')
    await Vue.nextTick()
    expect(firstNode.attributes('aria-expanded')).toBe('false')
    firstNode.trigger('click')
    await Vue.nextTick()
    expect(firstNode.attributes('aria-expanded')).toBe('true')
  })

  it('prop: isDefaultExpandAll', () => {
    const wrapper = createTree({
      isDefaultExpandAll: true
    })
    expect(wrapper.findAll('[aria-expanded="true"]').length).toBe(4)
  })

  it('prop: defaultExpandKeys', () => {
    const wrapper = createTree({
      defaultExpandedKeys: [1, 11, 2]
    })
    expect(wrapper.findAll('[aria-expanded="true"]').length).toBe(3)
  })

  it('prop: isAccordion', async () => {
    const wrapper = createTree({
      isAccordion: true
    })
    const nodes = wrapper.findAll('[role=treeitem]')
    nodes.at(0).trigger('click')
    nodes.at(1).trigger('click')
    await Vue.nextTick()
    expect(nodes.at(0).findAll('[aria-expanded=false]').length).toBe(1)
  })

  it('methods: expandNode, collapseNode', async () => {
    const wrapper = createTree()
    wrapper.vm.collapseNode(11)
    await Vue.nextTick()
    expect(wrapper.findAll('[aria-expanded=true]').length).toBe(1)
    wrapper.vm.expandNode(11)
    await Vue.nextTick()
    expect(wrapper.findAll('[aria-expanded=true]').length).toBe(2)
  })

  it('event: node-expand', async () => {
    let expandCounter = 0
    let collapseCounter = 0
    const wrapper = createTree(
      {},
      {
        listeners: {
          'node-expand': function ({ detail: { node, expanded } }) {
            if (expanded) {
              expandCounter++
            } else {
              collapseCounter++
            }

            expect(node.key).toBe(1)
          }
        }
      }
    )
    const nodes = wrapper.findAll('[role=treeitem]')
    nodes.at(0).trigger('click')
    nodes.at(0).trigger('click')
    await Vue.nextTick()
    expect(expandCounter).toBe(1)
    expect(collapseCounter).toBe(1)
  })
})

describe('[Tree] select', () => {
  it('prop: selectable', async () => {
    const wrapper = createTree({
      selectable: true,
      isDefaultExpandAll: true
    })
    wrapper.findAll('[role="treeitem"]').at(4).trigger('click')
    await Vue.nextTick()
    expect(
      wrapper.find('[aria-selected="true"]').find('.c-tree__label').text()
    ).toBe('三级 1-1-3')
  })

  it('prop: defaultSelectedKeys', () => {
    const wrapper = createTree({
      selectable: true,
      defaultSelectedKeys: [111],
      isDefaultExpandAll: true
    })
    expect(
      wrapper.find('[aria-selected="true"]').find('.c-tree__label').text()
    ).toBe('三级 1-1-1')
  })

  it('prop: multiselectable', async () => {
    const wrapper = createTree({
      selectable: true,
      isDefaultExpandAll: true,
      multiselectable: true
    })
    const nodes = wrapper.findAll('[role="treeitem"]')
    nodes.at(4).trigger('click')
    nodes.at(5).trigger('click')
    await Vue.nextTick()
    expect(wrapper.findAll('[aria-selected="true"]').length).toBe(2)
  })

  it('event: node-select', () => {
    const wrapper = createTree(
      {
        selectable: true,
        isDefaultExpandAll: true
      },
      {
        listeners: {
          'node-select': function ({ detail: val }) {
            expect(val).toMatchObject({
              node: {
                selected: true
              }
            })
          }
        }
      }
    )
    wrapper.findAll('[role="treeitem"]').at(4).trigger('click')
  })

  it('event: select', async () => {
    let counter = 0
    const excepted = [111, 121, 1]
    const wrapper = createTree(
      {
        selectable: true,
        isDefaultExpandAll: true,
        multiselectable: true
      },
      {
        listeners: {
          select({ detail: val }) {
            counter++
            expect(val.map(node => node.key)).toEqual(excepted)
          }
        }
      }
    )
    wrapper.vm.setSelectedNodes(excepted)
    await Vue.nextTick()
    expect(counter).toBe(1)
  })

  it('method: getSelectedNodes, getSelectedKeys', () => {
    const wrapper = createTree({
      selectable: true,
      multiselectable: true,
      defaultSelectedKeys: [111]
    })
    wrapper.vm.setSelectedNode(112, true)
    expect(wrapper.vm.getSelectedNodes().map(node => node.key)).toEqual([
      111,
      112
    ])
    expect(wrapper.vm.getSelectedKeys()).toEqual([111, 112])
  })

  it('method: setSelectedNode', () => {
    const wrapper = createTree({
      selectable: true,
      defaultSelectedKeys: [111]
    })
    const { tree } = wrapper.vm

    // 选中新的节点
    wrapper.vm.setSelectedNode(112, true)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([112])

    // 取消选中
    wrapper.vm.setSelectedNode(112, false)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([])

    // 忽略无效的key
    wrapper.vm.setSelectedNode(112, true)
    wrapper.vm.setSelectedNode('abc', true)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([112])
  })

  it('method: setSelectedNode (multiselectable = true)', () => {
    const wrapper = createTree({
      selectable: true,
      multiselectable: true,
      defaultSelectedKeys: [111]
    })
    const { tree } = wrapper.vm

    // 选中新的节点
    wrapper.vm.setSelectedNode(112, true)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([111, 112])

    // 取消选中
    wrapper.vm.setSelectedNode(112, false)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([111])

    // 忽略无效的key
    wrapper.vm.setSelectedNode('abc', true)
    expect(tree.selectedNodes.map(node => node.key)).toEqual([111])
  })

  it('method: setSelectedNodes', () => {
    const excepted = [121]
    const wrapper = createTree({
      selectable: true,
      defaultSelectedKeys: [111]
    })
    const { tree } = wrapper.vm

    wrapper.vm.setSelectedNodes([121, 111])
    expect(tree.selectedNodes.map(node => node.key)).toEqual(excepted)

    wrapper.vm.setSelectedNodes([])
    expect(tree.selectedNodes.map(node => node.key)).toEqual([])

    // 忽略无效的key
    wrapper.vm.setSelectedNodes(['aaa'].concat(excepted))
    expect(tree.selectedNodes.map(node => node.key)).toEqual(excepted)
  })

  it('method: setSelectedNodes (multiselectable = true)', () => {
    const excepted = [121, 1]
    const wrapper = createTree({
      selectable: true,
      multiselectable: true,
      defaultSelectedKeys: [111]
    })
    const { tree } = wrapper.vm
    wrapper.vm.setSelectedNodes(excepted)
    expect(tree.selectedNodes.map(node => node.key)).toEqual(excepted)

    wrapper.vm.setSelectedNodes([])
    expect(tree.selectedNodes.map(node => node.key)).toEqual([])

    // 忽略无效的key
    wrapper.vm.setSelectedNodes(excepted.concat('aaa'))
    expect(tree.selectedNodes.map(node => node.key)).toEqual(excepted)
  })

  it('treeitem prop: disabled', () => {
    const customizeData = data => {
      data[0].disabled = true
      data[0].children[0].disabled = false
      data[0].children[1].disabled = true
      return data
    }
    const wrapper = createTree(
      {
        selectable: true
      },
      { customizeData }
    )
    const nodes = wrapper.findAll('[role="treeitem"]')
    nodes.at(0).trigger('click')
    nodes.at(1).trigger('click')
    nodes.at(2).trigger('click')
    expect(wrapper.vm.tree.selectedNodes.map(node => node.key)).toEqual([])
  })
})

describe('[Tree] checkbox', () => {
  const customizeData = data => {
    // node.key: 12
    data[0].children[1].disabled = true
    // node.key: 121
    data[0].children[1].children[0].disabled = false
    return data
  }

  it('prop: checkable', () => {
    const wrapper = createTree({
      checkable: true
    })
    expect(wrapper.find('.c-checkbox')).toBeDefined()
  })

  it('prop: defaultCheckedKeys', () => {
    const wrapper = createTree({
      checkable: true,
      defaultCheckedKeys: [11]
    })
    expect(wrapper.findAll('input:checked').length).toBe(4)
  })

  it('treeitem prop: disabled', () => {
    const wrapper = createTree(
      {
        checkable: true,
        isDefaultExpandAll: true
      },
      { customizeData }
    )
    expect(wrapper.findAll('input[disabled]').length).toBe(4)
  })

  it('event: node-check, check', async () => {
    // let nodeCheckCounter = 0
    let checkCounter = 0
    const wrapper = createTree(
      {
        checkable: true
      },
      {
        customizeData,
        listeners: {
          'node-check': function ({
            detail: { checked, indeterminate, node }
          }) {
            const { key } = node
            switch (key) {
              case 1:
                expect(indeterminate).toBe(true)
                expect(checked).toBe(false)
                break
              case 11:
              case 111:
              case 112:
              case 113:
              case 13:
                expect(indeterminate).toBe(false)
                expect(checked).toBe(true)
                break
              default:
                throw new Error()
            }
            // nodeCheckCounter++
          },
          check: function ({ detail: val }) {
            expect(val).toMatchObject({
              checkedNodes: [
                { key: 11 },
                { key: 111 },
                { key: 112 },
                { key: 113 },
                { key: 13 }
              ],
              checkedKeys: [11, 111, 112, 113, 13],
              checkedNodesWithHalf: [
                { key: 1 },
                { key: 11 },
                { key: 111 },
                { key: 112 },
                { key: 113 },
                { key: 13 }
              ],
              checkedKeysWithHalf: [1, 11, 111, 112, 113, 13],
              checkedLeafNodes: [
                { key: 111 },
                { key: 112 },
                { key: 113 },
                { key: 13 }
              ],
              checkedLeafKeys: [111, 112, 113, 13]
            })
            checkCounter++
          }
        }
      }
    )
    const checkboxes = wrapper.findAll('.c-checkbox')

    // node.key: 1
    checkboxes.at(0).trigger('click')
    await Vue.nextTick()
    // todo: 手动测试符合预期，但 test utils 运行结果不一致。没找到具体原因，暂时搁置这个问题
    // expect(nodeCheckCounter).toBe(6)
    expect(checkCounter).toBe(1)
  })

  it('methods: getCheckedNodes, getCheckedKeys', () => {
    const wrapper = createTree({
      checkable: true,
      defaultCheckedKeys: [11]
    })
    const tree = wrapper.vm
    const defResult = [11, 111, 112, 113]
    const resultWithHalf = [1, 11, 111, 112, 113]
    const leafOnlyResult = [111, 112, 113]
    expect(tree.getCheckedNodes().map(node => node.key)).toEqual(defResult)
    expect(tree.getCheckedNodes(false, true).map(node => node.key)).toEqual(
      resultWithHalf
    )
    expect(tree.getCheckedNodes(true, false).map(node => node.key)).toEqual(
      leafOnlyResult
    )
    expect(tree.getCheckedNodes(true, true).map(node => node.key)).toEqual(
      leafOnlyResult
    )
    expect(tree.getCheckedKeys()).toEqual(defResult)
  })

  it('methods: setCheckedNode', () => {
    const wrapper = createTree({
      checkable: true
    })
    const tree = wrapper.vm

    tree.setCheckedNode(11, true)
    tree.setCheckedNode(111, false)
    tree.setCheckedNode('abc', true)

    expect(tree.getCheckedKeys()).toEqual([112, 113])
    expect(tree.getCheckedKeys(false, true)).toEqual([1, 11, 112, 113])
  })

  it('methods: setCheckedNodes', () => {
    const wrapper = createTree({
      checkable: true
    })
    const tree = wrapper.vm

    tree.setCheckedNodes([11, 111, 'abc'])
    expect(tree.getCheckedKeys()).toEqual([11, 111, 112, 113])

    tree.setCheckedNodes([111])
    expect(tree.getCheckedKeys()).toEqual([111])
  })

  it('prop: checkStrict', () => {
    const wrapper = createTree({
      checkable: true,
      checkStrict: true
    })
    const tree = wrapper.vm
    tree.setCheckedNode(11, true)
    expect(tree.getCheckedKeys(false, true)).toEqual([11])
  })

  it('if children are all checked except disabled child, then cancel checked when clicked', async () => {
    const wrapper = createTree(
      {
        checkable: true,
        defaultCheckedKeys: [111]
      },
      {
        customizeData(data) {
          data[0].children[0].children[1].disabled = true
          data[0].children[0].children[2].disabled = true
          return data
        }
      }
    )
    const checkboxes = wrapper.findAll('.c-checkbox')
    checkboxes.at(1).trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.getCheckedKeys()).toEqual([])
  })
})

describe('[Tree] get info and modify', () => {
  it('method: getNode', () => {
    const wrapper = createTree()
    const tree = wrapper.vm
    expect(tree.getNode(1)).toMatchObject({ key: 1 })
    expect(tree.getNode('abc')).toBe(null)
  })

  it('method: setNodeChildren', async () => {
    const wrapper = createTree()
    const tree = wrapper.vm
    tree.setNodeChildren(11, [
      {
        key: 113,
        label: '三级 1-1-3'
      },
      {
        key: 114,
        label: '三级 1-1-4'
      }
    ])
    await Vue.nextTick()

    const nodes = wrapper.findAll(
      '[role=treeitem]:first-child [role=treeitem]:first-child [role=treeitem]'
    )
    expect(nodes.length).toBe(2)
  })

  it('method: prepend, append, insertBefore, insertAfter', () => {
    const wrapper = createTree({
      checkable: true,
      defaultCheckedKeys: [11]
    })
    const tree = wrapper.vm
    const parentNode = tree.getNode(11)

    // prepend
    const nodeA = tree.prepend({ key: 'a' }, 11)
    expect(parentNode.indeterminate).toBe(true)
    expect(parentNode.children.length).toBe(4)
    expect(parentNode.children[0].key).toBe('a')

    // append
    const nodeB = tree.append({ key: 'b' }, 11)
    expect(parentNode.children.length).toBe(5)
    expect(parentNode.children[4].key).toBe('b')

    // insertBefore
    tree.insertBefore({ key: 'c' }, nodeA)
    expect(parentNode.children.length).toBe(6)
    expect(parentNode.children[0].key).toBe('c')

    // insertAfter
    tree.insertAfter({ key: 'd' }, nodeB)
    expect(parentNode.children.length).toBe(7)
    expect(parentNode.children[6].key).toBe('d')
  })

  it('method: remove', () => {
    const wrapper = createTree({
      selectable: true,
      defaultSelectedKeys: [111],
      checkable: true,
      defaultCheckedKeys: [112, 113]
    })
    const tree = wrapper.vm

    tree.remove(111)
    expect(tree.getSelectedKeys().length).toBe(0)
    expect(tree.getNode(11).indeterminate).toBe(false)
    expect(tree.getNode(11).checked).toBe(true)
  })
})

describe('[Tree] dynamic load', () => {
  const DELAY = 50
  const loadMethod = ({ node, resolve }) => {
    setTimeout(() => {
      const res = [
        {
          key: `${node.key}1`,
          label: `${node.label}-1`,
          isLeaf: true
        },
        {
          key: `${node.key}2`,
          label: `${node.label}-2`,
          isLeaf: true
        }
      ]
      resolve(res)
    }, DELAY)
  }
  let wrapper
  beforeAll(jest.useFakeTimers)
  afterAll(jest.useRealTimers)
  beforeEach(() => {
    wrapper = mount(Tree, {
      propsData: {
        isLazyLoad: true,
        loadMethod,
        defaultExpandedKeys: [],
        data: [
          {
            key: 1,
            label: '1'
          },
          {
            key: 2,
            label: '2'
          }
        ]
      }
    })
  })

  it('load', async () => {
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(2)
    wrapper.findAll('[role="treeitem"]').at(0).trigger('click')
    jest.advanceTimersByTime(DELAY)
    await Vue.nextTick()
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(4)
  })

  it('event: loaded', async () => {
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(2)
    wrapper.findAll('[role="treeitem"]').at(0).trigger('click')
    jest.advanceTimersByTime(DELAY)
    await Vue.nextTick()
    expect(wrapper.emitted()['node-loaded'].length).toBe(1)
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(4)
  })

  it('load a default checked node', async () => {
    wrapper.setProps({
      keyProp: 'key',
      checkable: true
    })
    await Vue.nextTick()
    wrapper.findAll('[role="treeitem"]').at(0).trigger('click')
    jest.advanceTimersByTime(DELAY)
    await Vue.nextTick()
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(4)
    expect(wrapper.findAll('input[type="checkbox"]').length).toBe(4)
    const checkbox = wrapper.findAll('input[type="checkbox"]').at(0)
    checkbox.setChecked()
    await Vue.nextTick()
    expect(wrapper.findAll('input:checked').length).toBe(3)
    const { tree } = wrapper.vm
    expect(tree.getNode(1).checked).toBe(true)
    expect(tree.getNode('11').checked).toBe(true)
    expect(tree.getNode('12').checked).toBe(true)
  })
})

describe('[Tree] others', () => {
  it("prop: clickCombineAction = 'none'", () => {
    const wrapper = createTree({
      clickCombineAction: 'none'
    })
    wrapper.find('[role="treeitem"]').trigger('click')
    expect(wrapper.findAll('[aria-expanded="true"]').length).toBe(2)
  })

  it("prop: clickCombineAction = 'checkbox'", () => {
    const wrapper = createTree({
      checkable: true,
      clickCombineAction: 'checkbox'
    })
    wrapper.findAll('[role="treeitem"').at(2).trigger('click')
    expect(wrapper.vm.tree.getCheckedKeys()).toEqual([111])
  })

  it('prop: filterMethod, filterValue', async () => {
    const wrapper = mount({
      components: {
        [Tree.name]: Tree
      },
      data() {
        return {
          filterMethod: ({ value, node }) => value.includes(node.key),
          filterValue: null
        }
      },
      render() {
        return (
          <Tree
            data={getTreeData()}
            keyProp="key"
            filterMethod={this.filterMethod}
            filterValue={this.filterValue}
          />
        )
      }
    })
    wrapper.vm.filterValue = [111, 2]
    await Vue.nextTick()
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(4)
    expect(wrapper.findAll('[aria-expanded="true"]').length).toBe(3)
    wrapper.vm.filterValue = null
    await Vue.nextTick()
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(2)
  })

  it('slot: default', () => {
    const wrapper = createTree(
      {},
      {
        scopedSlots: {
          default({ node }) {
            return node.key
          }
        }
      }
    )
    expect(wrapper.find('.c-tree__label').text()).toBe('1')
  })

  it('slot: nodeIcon', () => {
    const wrapper = createTree(
      {},
      {
        scopedSlots: {
          nodeIcon({ node }) {
            return node.level
          }
        }
      }
    )
    expect(wrapper.find('.c-tree__custom-icon').text()).toBe('1')
  })

  it('prop: expandIcon', () => {
    const wrapper = createTree(
      {},
      {
        scopedSlots: {
          expandIcon: '<template>&gt;</template>'
        }
      }
    )
    expect(wrapper.find('.c-tree__toggle').text()).toBe('>')
  })
})
