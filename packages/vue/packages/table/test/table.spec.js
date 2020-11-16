/* eslint-disable max-lines */
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Table from '../src/index'
import CTableColumn from '../src/column'

const createDefer = () => {
  const ret = {
    resolve: null,
    reject: null,
    then: null
  }
  const p = new Promise((resolve, reject) => {
    ret.reject = reject
    ret.resolve = resolve
  })
  ret.then = p.then.bind(p)
  return ret
}
const originalConsoleError = console.error
beforeAll(() => {
  console.error = () => void 0
})

afterAll(() => {
  console.error = originalConsoleError
})

const getTestData = () => {
  return [
    {
      type: '直接访问1',
      pv: 1,
      uv: 2,
      nv: 3,
      du: 4,
      cv: 5,
      ip: 8
    },
    {
      type: '搜索引擎1',
      pv: 11,
      uv: 21,
      nv: 31,
      du: 141,
      cv: 51,
      ip: 81
    },
    {
      type: '直接访问1',
      pv: 1,
      uv: 2,
      nv: 3,
      du: 4,
      cv: 5,
      ip: 8,
      order: 78
    },
    {
      type: '搜索引擎1',
      pv: 11,
      uv: 21,
      nv: 31,
      du: 141,
      cv: 51,
      ip: 81,
      order: 90
    },
    {
      type: '直接访问1',
      pv: 1,
      uv: 2,
      nv: 3,
      du: 4,
      cv: 5,
      ip: 8,
      order: 78
    },
    {
      type: '搜索引擎1',
      pv: 11,
      uv: 21,
      nv: 31,
      du: 141,
      cv: 51,
      ip: 81,
      order: 90
    }
  ].map((item, index) => {
    return {
      ...item,
      key: `${index}`
    }
  })
}

const defaultColumns = () => {
  return [
    { title: '来源类型', prop: 'type' },
    { title: '浏览量', prop: 'pv' },
    { title: '访客数', prop: 'uv' },
    { title: '转化次数', prop: 'cv' },
    { title: 'IP 数', prop: 'ip' }
  ]
}

describe('[Table] basic', () => {
  const wrapper = mount(Table, {
    propsData: {
      columns: defaultColumns(),
      dataSource: []
    }
  })

  it('no data list', () => {
    expect(wrapper.contains('.c-table')).toBeTruthy()
    expect(wrapper.contains('.c-table--normal')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('custom no result message', async () => {
    wrapper.setProps({
      emptyText: '暂无数据'
    })
    await Vue.nextTick()
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('base data list', async () => {
    wrapper.setProps({
      dataSource: getTestData()
    })
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table tbody tr')).toHaveLength(
      getTestData().length
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('data table small size', async () => {
    wrapper.setProps({
      size: 'small'
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-table--small'))
  })

  it('table with fullScreen', () => {
    wrapper.vm.fullScreen()
    wrapper.vm.exitFullScreen()
    expect(wrapper).toMatchSnapshot()
  })

  it('no column', async () => {
    wrapper.setProps({
      columns: []
    })
    await Vue.nextTick()
    expect(wrapper.findAll('td')).toHaveLength(0)
    expect(wrapper.findAll('colgroup')).toHaveLength(1)
  })
})

describe('[Table] fixed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Table, {
      propsData: {
        columns: defaultColumns(),
        dataSource: getTestData(),
        height: '200px'
      }
    })
  })
  it('thead fixed', async () => {
    await Vue.nextTick()
    expect(wrapper.find('.c-table--content').attributes().style).toBe(
      'height: 200px;'
    )
    expect(wrapper.contains('.c-table--with-height')).toBeTruthy()
    expect(wrapper.contains('.c-table__thead--sticky')).toBeTruthy()
    wrapper.vm.topShadowShown = true
    await Vue.nextTick()
    expect(wrapper.contains('.c-table__shadow--sticky-top')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('thead fixed width height string', async () => {
    wrapper.setProps({
      height: 150
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-table--content').attributes().style).toBe(
      'height: 150px;'
    )
  })

  it('column fixed left', async () => {
    const rowFixedNum = 2
    const leftFixedColumns = defaultColumns().map((item, index) => {
      if (index < rowFixedNum) {
        item.fixed = 'left'
      }
      item.width = 200
      return item
    })
    wrapper.setProps({
      columns: leftFixedColumns
    })
    await Vue.nextTick()

    wrapper.vm.leftShadowShown = true
    await Vue.nextTick()
    const allSticky = wrapper.findAll('.c-table tbody .c-table__cell--sticky')
    expect(allSticky).toHaveLength(rowFixedNum * getTestData().length)
    allSticky.wrappers.forEach(w =>
      expect(w.classes('c-table__cell--sticky-left')).toBeTruthy()
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('column fixed right', async () => {
    const rowFixedNum = 1
    const columns = defaultColumns()
    const startIndex = columns.length - rowFixedNum
    const rightFixedColumns = columns.map((item, index) => {
      if (index === startIndex) {
        item.fixed = 'right'
      }
      item.width = 200
      return item
    })
    wrapper.setProps({
      columns: rightFixedColumns
    })
    await Vue.nextTick()
    wrapper.trigger('scroll')
    await Vue.nextTick()
    wrapper.vm.rightShadowShown = true
    await Vue.nextTick()
    const allSticky = wrapper.findAll(
      '.c-table tbody tr .c-table__cell--sticky'
    )
    expect(allSticky).toHaveLength(rowFixedNum * getTestData().length)
    allSticky.wrappers.forEach(w =>
      expect(w.classes('c-table__cell--sticky-right')).toBeTruthy()
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('column fixed both left and right', async () => {
    const leftFixedNum = 1
    const rightFixedNum = 1
    const columns = defaultColumns()
    const startIndex = columns.length - rightFixedNum
    const rightFixedColumns = columns.map((item, index) => {
      if (index === startIndex) {
        item.fixed = 'right'
      } else if (index < leftFixedNum) {
        item.fixed = 'left'
      }
      item.width = 200
      return item
    })
    wrapper.setProps({
      columns: rightFixedColumns
    })
    await Vue.nextTick()

    wrapper.trigger('scroll')
    await Vue.nextTick()
    wrapper.vm.rightShadowShown = true
    await Vue.nextTick()
    wrapper.vm.leftShadowShown = true
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table__cell--sticky-left')).toHaveLength(
      leftFixedNum * getTestData().length + 1
    )
    expect(wrapper.findAll('.c-table__cell--sticky-right')).toHaveLength(
      rightFixedNum * getTestData().length + 1
    )
    expect(
      wrapper.findAll('.c-table tbody tr .c-table__cell--sticky')
    ).toHaveLength((leftFixedNum + rightFixedNum) * getTestData().length)
    expect(wrapper).toMatchSnapshot()
  })

  it('should remove shadow when content is fully displayed', async () => {
    const leftFixedNum = 2
    const rightFixedNum = 1
    const descriptor = (defaultValue = 0) => {
      let value = defaultValue
      return {
        set(v) {
          value = v
        },
        get() {
          return value
        }
      }
    }
    const scrollContainer = wrapper.find('.c-table--content')
    const containerDOM = scrollContainer.element
    Object.defineProperties(containerDOM, {
      scrollLeft: descriptor(),
      scrollWidth: descriptor(1000),
      scrollRight: descriptor(),
      offsetWidth: descriptor(400)
    })
    const fixedColumns = defaultColumns().map((item, index, array) => {
      if (index < leftFixedNum) {
        item.fixed = 'left'
      }
      if (index >= array.length - rightFixedNum) {
        item.fixed = 'right'
      }
      item.width = 200
      return item
    })
    wrapper.setProps({
      columns: fixedColumns
    })
    await Vue.nextTick()
    containerDOM.scrollLeft = 1
    scrollContainer.trigger('scroll')
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table__cell--sticky-left').length).toBe(
      (getTestData().length + 1) * leftFixedNum
    )
    expect(wrapper.findAll('.c-table__cell--sticky-right').length).toBe(
      (getTestData().length + 1) * rightFixedNum
    )
    wrapper.setProps({
      columns: []
    })
    // update columns
    await Vue.nextTick()
    // update shadow, which is one tick after update columns
    await Vue.nextTick()
    // td + th
    expect(wrapper.findAll('.c-table__cell--sticky-left').length).toBe(0)
    // td + th
    expect(wrapper.findAll('.c-table__cell--sticky-right').length).toBe(0)
  })
})

describe('[Table] setting row column class', () => {
  const wrapper = mount(Table, {
    propsData: {
      columns: defaultColumns(),
      dataSource: getTestData(),
      rowClassName: function ({ row, index }) {
        return index === 1 ? 'test' : ''
      }
    }
  })
  test('row class setting', async () => {
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table tbody .test')).toHaveLength(
      defaultColumns().length
    )
  })

  it('column class setting', async () => {
    const customColumns = defaultColumns().map(item => {
      if (item.prop === 'pv') {
        item.className = 'redBg'
      }
      return item
    })
    wrapper.setProps({
      columns: customColumns
    })
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table tbody .redBg')).toHaveLength(
      getTestData().length
    )
  })
})

describe('custom thead, tbody td', () => {
  const wrapper = mount(Table, {
    propsData: {
      columns: defaultColumns(),
      dataSource: getTestData()
    },
    scopedSlots: {
      type_title: vm => `<span class="custom-th">pv replace th</span>`,
      pv_cell: function (props) {
        return `<span>浏览量---pv</span>`
      }
    }
  })
  test('thead th', async () => {
    expect(wrapper.text()).toContain(`pv replace th`)
  })
  test('tbody td', async () => {
    await Vue.nextTick()
    expect(wrapper.text()).toContain('浏览量---pv')
  })
})

describe('[Table] thead group', () => {
  test('thead with columns', async () => {
    const groupColumns = [
      { title: '来源类型', prop: 'type', fixed: 'left', width: 200 },
      { title: '转化', prop: 'du', fixed: 'left', width: 200 },
      {
        title: '基础流量',
        children: [
          { title: '浏览量', prop: 'pv', width: 300 },
          {
            title: '转化量',
            children: [
              { title: '访客数', prop: 'uv', width: 200 },
              { title: '转化次数', prop: 'cv', width: 200 }
            ]
          }
        ]
      },
      { title: 'IP 数', prop: 'ip', width: 300, fixed: 'right' }
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: groupColumns,
        dataSource: getTestData()
      }
    })
    await Vue.nextTick()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('[Table] events test', () => {
  test('table with checked', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 2)
      },
      scopedSlots: {
        selected_title: function (props) {
          return `<span>$$</span>`
        }
      }
    })
    // 全选input的点击
    wrapper.find('thead tr input').trigger('click')
    await Vue.nextTick()
    wrapper.vm.$on('selected-change', function (obj) {
      expect(obj.currentIndex).toBe(0)
    })
    wrapper.find('tbody tr:first-child input').trigger('click')
    await Vue.nextTick()
    expect(wrapper.text()).toContain('$$')
    expect(
      wrapper.element.querySelectorAll('input[type=checkbox]:checked')
    ).toHaveLength(1)
  })

  test('table event selectedChange for tbody', async () => {
    const defer = createDefer()
    const wrapper = mount(Table, {
      propsData: {
        columns: defaultColumns(),
        dataSource: []
      },
      listeners: {
        'selected-change'(obj) {
          expect(obj.currentIndex).toBe(8)
          defer.resolve()
        }
      }
    })
    wrapper.vm.selectedChange({ currentIndex: 8 })
    await Vue.nextTick()
    return defer
  })
  test('table init checked isAllSelected false', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 1) // 仅用一条数据测试
      }
    })
    await Vue.nextTick()
    expect(wrapper.vm.isAllSelected).toBe(false)
  })

  test('table set isAllSelected true', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 1) // 仅用一条数据测试
      }
    })
    wrapper.vm.selectAll()
    await Vue.nextTick()
    expect(wrapper.vm.isAllSelected).toBe(true)
  })

  test('table call clearSelection then isAllSelected false', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 1) // 仅用一条数据测试
      }
    })
    wrapper.vm.clearSelection()
    await Vue.nextTick()
    expect(wrapper.vm.isAllSelected).toBe(false)
  })

  test('`table.selectRow` method', async () => {
    const inputSelector = 'input[type=checkbox]'
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData(),
        columns: customColumns
      }
    })
    const findChecked = () =>
      wrapper.findAll(inputSelector).wrappers.filter(w => w.element.checked)
    expect(findChecked().length).toBe(0)
    wrapper.vm.selectRow('0', true)
    await Vue.nextTick()
    expect(findChecked().length).toBe(1)
    expect(
      wrapper.findAll('tbody input[type=checkbox]').at(0).is(':checked')
    ).toBe(true)
  })

  test('`selected-row-keys.sync`', async () => {
    // TODO
    // `argument_sync` seems to be not working with `@vue/babel-preset-jsx`
    // probably need to make a PR
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const Demo = {
      data() {
        return {
          selectedRowKeys: []
        }
      },
      render() {
        return (
          <Table
            dataSource={getTestData()}
            columns={customColumns}
            selectedRowKeys={this.selectedRowKeys}
            on={{
              'update:selected-row-keys': value => {
                // mimic `.sync`
                this.selectedRowKeys = value
              }
            }}
          />
        )
      }
    }
    const wrapper = mount(Demo)
    const inputSelector = 'input[type=checkbox]'
    const findChecked = () =>
      wrapper.findAll(inputSelector).wrappers.filter(w => w.element.checked)
    expect(findChecked().length).toBe(0)
    // props controls UI
    wrapper.setData({
      selectedRowKeys: ['0']
    })
    await Vue.nextTick()
    expect(findChecked().length).toBe(1)
    expect(
      wrapper.findAll('tbody input[type=checkbox]').at(0).is(':checked')
    ).toBe(true)
    // User interaction controls props
    wrapper.findAll('tbody input[type=checkbox]').at(1).trigger('change')
    await Vue.nextTick()
    expect(findChecked().length).toBe(2)
    const haveAllKeys = ['0', '1'].every(key =>
      wrapper.vm.selectedRowKeys.includes(key)
    )
    expect(haveAllKeys).toBe(true)
  })

  test('`default-selected-row-keys`', async () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData(),
        columns: [{ type: 'selection', prop: 'selected' }, ...defaultColumns()],
        defaultSelectedRowKeys: ['0']
      }
    })
    expect(wrapper.findAll('input[type=checkbox]:checked').length).toBe(1)
    expect(
      wrapper.findAll('tbody input[type=checkbox]').at(0).is(':checked')
    ).toBe(true)
    // nothing would change
    wrapper.setProps({
      defaultSelectedRowKeys: ['1', '2']
    })
    await Vue.nextTick()
    expect(wrapper.findAll('input[type=checkbox]:checked').length).toBe(1)
    expect(
      wrapper.findAll('tbody input[type=checkbox]').at(0).is(':checked')
    ).toBe(true)
  })

  test('avoid false positive of all selected state', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 1),
        rowKey: 'type',
        selectedRowKeys: ['1', '2']
      }
    })
    await Vue.nextTick()
    const allSelectedCheckbox = wrapper.find('thead input[type="checkbox"]')
    expect(allSelectedCheckbox.element.checked).toBe(false)
  })

  test('avoid false positive indeterminate', async () => {
    const customColumns = [
      { type: 'selection', prop: 'selected' },
      ...defaultColumns()
    ]
    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData().slice(0, 4),
        rowKey: 'type',
        selectedRowKeys: ['1', '2']
      }
    })
    await Vue.nextTick()
    const allSelectedCheckbox = wrapper.find('thead input[type="checkbox"]')
    expect(allSelectedCheckbox.element.indeterminate).toBe(false)
  })
  it('table with sort descending', async () => {
    const defer = createDefer()
    const customColumns = [
      { title: '来源类型', prop: 'type' },
      { title: '浏览量', prop: 'pv', sortable: true }
    ]

    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData(),
        defaultSort: {
          column: 'pv',
          order: 'descending'
        }
      },
      listeners: {
        'sort-change'({ detail }) {
          const { column, order } = detail
          expect(column).toBe('pv')
          expect(order).toBe('ascending')
          defer.resolve()
        }
      }
    })

    wrapper.find('.c-table__sort--asc-icon').trigger('click')
    await Vue.nextTick()
    return defer
  })

  test('table with sort ascending', async () => {
    const defer = createDefer()
    const customColumns = [
      { title: '来源类型', prop: 'type' },
      { title: '浏览量', prop: 'pv', sortable: true }
    ]

    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData(),
        defaultSort: {
          column: 'pv',
          order: 'ascending'
        }
      },
      listeners: {
        'sort-change'({ detail }) {
          const { column, order } = detail
          expect(column).toBe('pv')
          expect(order).toBe('descending')
          defer.resolve()
        }
      }
    })
    wrapper.find('.c-table__sort--desc-icon').trigger('click')
    await Vue.nextTick()
    return defer
  })
  it('table with no sort ', async () => {
    const defer = createDefer()
    const customColumns = [
      { title: '来源类型', prop: 'type' },
      { title: '浏览量', prop: 'pv', sortable: true }
    ]

    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData(),
        defaultSort: {
          column: 'pv',
          order: 'descending'
        }
      },
      listeners: {
        'sort-change': ({ column, order }) => {
          expect(column).toBe('')
          expect(order).toBe('')
          defer.resolve()
        }
      }
    })

    wrapper.find('.c-table__sort--desc-icon').trigger('click')
    await Vue.nextTick()
  })

  test('table with update default sort info', async () => {
    const customColumns = [
      { title: '来源类型', prop: 'type' },
      { title: '浏览量', prop: 'pv', sortable: true }
    ]

    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData(),
        defaultSort: {
          column: 'pv',
          order: 'ascending'
        }
      }
    })
    wrapper.setProps({
      defaultSort: {
        column: 'pv',
        order: 'descending'
      }
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-table__sort--descending')).toBeTruthy()
  })

  test('table with no update default sort info', async () => {
    const customColumns = [
      { title: '来源类型', prop: 'type' },
      { title: '浏览量', prop: 'pv', sortable: true }
    ]

    const wrapper = mount(Table, {
      propsData: {
        columns: customColumns,
        dataSource: getTestData(),
        defaultSort: {
          column: 'pv',
          order: 'ascending'
        }
      }
    })
    wrapper.setProps({
      defaultSort: {
        column: 'pv',
        order: 'ascending'
      }
    })
    await Vue.nextTick()
    expect(wrapper.contains('.c-table__sort--ascending')).toBeTruthy()
  })

  test('table with expand', async () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData().slice(0, 1),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()]
      },
      scopedSlots: {
        expand: function ({ row, index }) {
          expect(index).toBe(0)
          return 'hello'
        }
      }
    })

    wrapper.find('tbody tr .c-table__expand--arrow').trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted()['expand-change']).toBeTruthy()
  })
  test('table with expand, but no expand slots', async () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData().slice(0, 1),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()]
      }
    })

    wrapper.find('tbody tr .c-table__expand--arrow').trigger('click')
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table__expand')).toHaveLength(0)
  })

  test('`table.expandRow` method', async () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData(),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()]
      },
      scopedSlots: {
        expand: function ({ row, index }) {
          return 'hello'
        }
      }
    })

    wrapper.vm.expandRow('0', true)
    await Vue.nextTick()
    expect(wrapper.emitted()['expand-change']).toBeTruthy()
    expect(wrapper.findAll('tbody tr').at(1).classes()).toContain(
      'c-table__expand'
    )
  })

  test('`expandedRowKeys.sync`', async () => {
    const Demo = {
      data() {
        return {
          expandedRowKeys: []
        }
      },
      render() {
        return (
          <Table
            dataSource={getTestData()}
            columns={[{ type: 'expand', width: 60 }, ...defaultColumns()]}
            scopedSlots={{
              expand: () => 'hello'
            }}
            expandedRowKeys={this.expandedRowKeys}
            on={{
              // mimic `.sync`
              'update:expanded-row-keys': value => {
                this.expandedRowKeys = value
              }
            }}
          />
        )
      }
    }
    const wrapper = mount(Demo)
    expect(wrapper.findAll('.c-table__expand').length).toBe(0)
    wrapper.setData({
      expandedRowKeys: ['0']
    })
    await Vue.nextTick()
    // prop controls UI
    expect(wrapper.findAll('.c-table__expand').length).toBe(1)
    expect(wrapper.findAll('tbody tr').at(1).classes()).toContain(
      'c-table__expand'
    )
    // User interaction controls props
    wrapper.findAll('.c-table__expand--arrow').at(0).trigger('click')
    await Vue.nextTick()
    expect(wrapper.findAll('.c-table__expand').length).toBe(0)
    expect(wrapper.vm.expandedRowKeys.length).toBe(0)
  })

  test('`default-expanded-row-keys`', () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData(),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()],
        defaultExpandedRowKeys: ['1']
      },
      scopedSlots: {
        expand: () => 'expand'
      }
    })
    expect(wrapper.findAll('.c-table__expand').length).toBe(1)
    expect(wrapper.findAll('tr').at(3).is('.c-table__expand')).toBe(true)
    wrapper.setProps({
      defaultExpandedRowKeys: ['0']
    })
    // nothing would change
    expect(wrapper.findAll('.c-table__expand').length).toBe(1)
    expect(wrapper.findAll('tr').at(3).is('.c-table__expand')).toBe(true)
  })
})

describe('[table] td opt', () => {
  const customColumns = defaultColumns()
  const rowNum = 2
  const wrapper = mount(Table, {
    propsData: {
      columns: customColumns,
      dataSource: getTestData().slice(0, rowNum),
      spanMethod: function ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 1) {
            return [1, 2]
          } else if (columnIndex === 2) {
            return [0, 0]
          }
        }
      }
    }
  })
  test('colspan, rowspan array test', () => {
    const tdSum = customColumns.length * rowNum - 1
    expect(wrapper.findAll('tbody td')).toHaveLength(tdSum)
  })
  test('colspan, rowspan object test', async () => {
    wrapper.setProps({
      spanMethod: function ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          }
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    })
    await Vue.nextTick()
    const tdSum = customColumns.length * rowNum - 1
    expect(wrapper.findAll('tbody td')).toHaveLength(tdSum)
  })
  test('columns has column hidden', async () => {
    const hiddenNum = 1
    wrapper.setProps({
      columns: customColumns.map((item, index) => {
        if (index < hiddenNum) {
          item.hidden = true
        }
        return item
      })
    })
    await Vue.nextTick()
    expect(wrapper.findAll('thead th')).toHaveLength(
      customColumns.length - hiddenNum
    )
  })
})

describe('[Table] with header , footer slot', () => {
  it('setting table title', () => {
    const wrapper = mount(Table, {
      propsData: {
        columns: defaultColumns(),
        dataSource: [],
        title: 'TABLE TITLE'
      }
    })
    expect(wrapper.text()).toContain('TABLE TITLE')
  })
  it('with action', () => {
    const wrapper = mount(Table, {
      propsData: {
        columns: defaultColumns(),
        dataSource: []
      },
      slots: {
        action: `<span>here is action slot!</span>`
      }
    })
    expect(wrapper.text()).toContain('here is action slot!')
  })
  it('with header', () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData().slice(0, 1),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()]
      },
      slots: {
        header: `<p>I am table header !</p>`
      }
    })
    expect(wrapper.text()).toContain('I am table header')
  })
  it('with footer', () => {
    const wrapper = mount(Table, {
      propsData: {
        dataSource: getTestData().slice(0, 1),
        columns: [{ type: 'expand', width: 60 }, ...defaultColumns()]
      },
      slots: {
        footer: `<p>I am table footer</p>`
      }
    })
    expect(wrapper.text()).toContain('I am table footer')
  })
})

describe('[table] with pagination', () => {
  const wrapper = mount(Table, {
    propsData: {
      columns: defaultColumns(),
      dataSource: getTestData(),
      pagination: {
        pn: 1,
        total: 50,
        ps: 20
      }
    }
  })

  it('default shown', () => {
    expect(wrapper.contains('.c-pagination')).toBeTruthy()
  })

  it('page change event', () => {
    wrapper.find('.c-pagination__next').trigger('click')
    expect(wrapper.emitted()['page-change']).toBeTruthy()
  })
})

describe('[table-column] throw error', () => {
  it('not in table', () => {
    expect(() => {
      mount(CTableColumn, {
        propsData: {
          prop: 'ip',
          title: 'IP'
        }
      })
    }).toThrowError()
  })
})
