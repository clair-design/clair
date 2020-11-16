---
group: Data 数据展示
---

# Table 表格

## 定义

表格用于查看或操作一个数据对象集合的详细信息。表格作为多维信息展示的载体，使复杂的信息更易于阅读与理解，常和排序、搜索、筛选、分页等其他元素一起协同，提升信息接收效率和理解过程。

## 使用场景

- 为适应多分辨率的要求，表格默认采用百分比布局；
- 单位统一放在表头内，表头文本不建议换行显示，对于单行文本的单元格，文字超过表格的最大字符数时，显示头部和尾部字段，中间用“…”，如“ABABA…123”来表示更多，且鼠标移上后出现 tips 信息；
- 表格没有数据的情况显示“没有数据”居中显示，且此时不显示分页组件；
- 如果表格中有操作按钮，大于 3 个时，采用下拉或者“…”的呈现更多操作入口；
- 树形表格的树形节点不得超过 3 层，一般尽量避免横向滚动条，如无法避免横向滚动条时，需冻结主信息列及操作列，其它列滚动；
- 不同内容采用合理的对齐方式，能够提升阅读和填写效率：
  - 左对齐：数字／链接／名称／信息/日期
  - 居中对齐：姓名/操作
  - 右对齐：金额

## 基础表格

表格的最基本用法。通过 `columns` 属性指定表格每一列的设置，`data-source` 属性指定表格数据。

```html
<template>
  <c-table :columns="columns" :data-source="dataSource"></c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 无数据表格

当传入表格的数据为空时，会展示无数据的样式。通过 `empty-text` 属性可以指定无数据时的文字提示。

```html
<template>
  <c-table :columns="columns" :data-source="dataSource"></c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [],
        columns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 自定义数据展示

表格每一列的展示，除了使用 `columns` 属性传入外，也可以使用 `<c-table-column>` 传入。自定义展示列的 `<template>` 可以通用 `v-slot` 指令获取到这一行数据。数据格式为：

```typescript
interface CellData {
  value // 当前单元格的值
  index // 第几列
  row // 所在行的数据
}
```

```html
<template>
  <c-table :data-source="dataSource">
    <c-table-column prop="date" title="日期" />
    <c-table-column prop="name" title="名称" />
    <c-table-column prop="tags" title="标签">
      <template v-slot="{value}">
        <div>
          <c-tag v-for="tag in value" :key="tag" color="blue" size="small">
            {{ tag }}
          </c-tag>
        </div>
      </template>
    </c-table-column>
    <c-table-column title="操作">
      <template v-slot="{value, index, row}">
        <div class="actions">
          <a href="#" @click.prevent="edit(row)">编辑</a>
          |
          <a href="#" @click.prevent="view(row)">查看</a>
          |
          <a href="#" @click.prevent="remove(row)">删除</a>
        </div>
      </template>
    </c-table-column>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { date: '2019-01-01', name: '项目名称 1', tags: ['标签1'] },
          { date: '2019-01-02', name: '项目名称 2', tags: ['标签1', '标签2'] },
          { date: '2019-01-03', name: '项目名称 3', tags: ['标签3'] }
        ]
      }
    },

    methods: {
      edit(row) {
        this.$message({
          type: 'success',
          message: `${row.name} 修改成功!`
        })
      },
      view(row) {
        this.$info({
          title: row.name,
          content: `${row.name} 的详细信息。`
        })
      },
      remove(row) {
        const index = this.dataSource.indexOf(row)
        this.dataSource.splice(index, 1)
      }
    }
  }
</script>
<style scoped>
  .c-tag + .c-tag {
    margin-left: 8px;
  }

  .actions {
    color: #999;
  }

  .actions a {
    color: #006bff;
    text-decoration: none;
  }

  .actions a:not(:first-child) {
    margin-left: 6px;
  }

  .actions a:not(:last-child) {
    margin-right: 8px;
  }
</style>
```

如果你是使用 `columns` 属性而不是 `<c-table-column>` 来设置表格列，你可以直接在 `c-table` 里嵌套 `<template v-slot:列名_cell="props">` 这种方式来自定义指定列的数据展示。下面的例子就展示了如何自定义项目标签（`tags`）这一列：

```html
<template>
  <c-table :data-source="dataSource" :columns="columns">
    <template v-slot:tags_cell="{value, row}">
      <c-tag v-for="tag in value" :key="tag" color="blue" size="small">
        {{ tag }}
      </c-tag>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { date: '2019-01-01', name: '项目名称 1', tags: ['标签1'] },
          { date: '2019-01-02', name: '项目名称 2', tags: ['标签1', '标签2'] },
          { date: '2019-01-03', name: '项目名称 3', tags: ['标签3'] }
        ],
        columns: [
          { title: '日期', prop: 'date' },
          { title: '项目名称', prop: 'name' },
          { title: '项目标签', prop: 'tags' }
        ]
      }
    }
  }
</script>
<style scoped>
  .c-tag + .c-tag {
    margin-left: 8px;
  }
</style>
```

## 自定义表头

在 `<c-table-column>` 中嵌套 `<template v-slot="title">` 可以实现表头的定制。

```html
<template>
  <c-table :data-source="dataSource">
    <c-table-column prop="date" title="日期" />
    <c-table-column prop="name" title="名称" />
    <c-table-column prop="rating">
      <template v-slot:title>
        <div>
          评级
          <c-tooltip content="评级根据活跃度、质量等多个指标计算得出">
            <c-icon-status-info class="tip-icon" />
          </c-tooltip>
        </div>
      </template>

      <template v-slot="{row}">
        <span>{{ row.rating }}</span>
      </template>
    </c-table-column>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { date: '2019-01-01', name: '项目名称 1', rating: 4.5 },
          { date: '2019-01-02', name: '项目名称 2', rating: 3.9 },
          { date: '2019-01-03', name: '项目名称 3', rating: 4.2 }
        ]
      }
    }
  }
</script>
<style scoped>
  .tip-icon {
    color: #888;
    vertical-align: -0.15em;
    cursor: pointer;
  }
</style>
```

## 可选择

可以选择一些数据或者全选后进行批量操作。

```html
<template>
  <c-table
    ref="table"
    class="table"
    row-key="type"
    :columns="columns"
    :data-source="dataSource"
    :selected-row-keys.sync="selectedRowKeys"
    @selected-change="onSelectedChange"
  >
    <template #action>
      <div class="toolbar">
        <c-button @click="processData" :disabled="!hasSelection" type="primary">
          操作选中数据
        </c-button>
        <c-button @click="selectType('搜索引擎',!selectedState)">
          {{selectedState ? '取消选中' : '选中'}} "搜索引擎"
        </c-button>
      </div>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        selectedRowKeys: ['直接访问'],
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { type: 'selection', prop: 'selected', width: 25, align: 'center' },
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    },
    computed: {
      hasSelection() {
        return this.selectedRowKeys.length > 0
      },
      selectedState() {
        return this.selectedRowKeys.includes('搜索引擎')
      }
    },
    watch: {
      selectedRowKeys(val) {
        console.log('changed', val)
      }
    },
    methods: {
      onSelectedChange({ detail }) {
        console.log(detail.selectedDataList)
      },
      processData() {
        this.$message({
          type: 'success',
          message: `${this.selectedRowKeys.length} 条数据操作成功!`
        })
      },
      selectType(type, state) {
        this.$refs.table.selectRow(type, state)
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    margin-bottom: 1em;
  }
</style>
```

## 表格排序

对表格进行排序，可快速查找或对比数据。

```html
<template>
  <c-table
    :columns="columns"
    :dataSource="dataSource"
    @sort-change="sortChange"
  ></c-table>
</template>
<script>
  export default {
    data() {
      const random = () => Math.round(Math.random() * 1000)
      const dataSource = [...new Array(5)].map((_, i) => ({
        date: `2019-07-${10 + i}`,
        pv: random(),
        uv: random(),
        ip: random()
      }))
      return {
        dataSource,
        columns: [
          { title: '日期', prop: 'date' },
          { title: '浏览量', prop: 'pv', sortable: true },
          { title: '访客数', prop: 'uv', sortable: true },
          { title: 'IP 数', prop: 'ip', sortable: true }
        ]
      }
    },
    methods: {
      sortChange({ detail }) {
        const { column, order } = detail
        if (!column) {
          // 取消排序
          this.dataSource.sort((a, b) => {
            if (a.date > b.date) return 1
            if (a.date < b.date) return -1
            return 0
          })
          return
        }
        this.dataSource.sort((a, b) => {
          const sign = order === 'ascending' ? 1 : -1
          return (a[column] - b[column]) * sign
        })
      }
    }
  }
</script>
```

## 紧凑型

紧凑型的表格，用于在弹窗等尺寸较小的容器内。

```html
<template>
  <c-table size="small" :columns="columns" :data-source="dataSource"></c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 带边框

默认表格只显示横向的边框，将表格的 `bordered` 属性设置为 `true` 可以使表格带完整的边框。

> 注意：使用了单元格合并、表头分组或列固定功能后，会强制展示完整边框。

```html
<template>
  <c-table bordered :columns="columns" :data-source="dataSource"></c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 固定表头

纵向内容过多时，可选择固定表头。

```html
<template>
  <c-table :columns="columns" :dataSource="dataSource" :height="190"></c-table>
</template>
<script>
  export default {
    data() {
      const random = () => Math.round(Math.random() * 1000)
      const dataSource = [...new Array(20)].map((_, i) => ({
        date: `2019-07-${10 + i}`,
        pv: random(),
        uv: random(),
        ip: random()
      }))
      return {
        dataSource,
        columns: [
          { title: '日期', prop: 'date' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 固定列

横向内容过多时，可选择固定列。

> 鉴于 `<table />` 的布局特点，当使用固定列特性时，推荐将 `column` 的 `width` 设置为 `number`，能够更符合预期。

```html
<template>
  <c-table
    class="fixed-column-table"
    :columns="columns"
    :data-source="dataSource"
  >
    <template v-slot:name_cell="{row}">
      <span v-if="!row.edit">{{row.name}}</span>
      <c-input v-else v-model="row.name" @keydown.enter="updateName(row)" />
    </template>
    <template v-slot:actions_cell="{row}">
      <a @click.prevent="show(row)">查看</a>
      <a @click="edit(row)">编辑</a>
      <c-popConfirm
        content="确定要删除这条数据么？"
        trigger="click"
        placement="left"
        @confirm="remove(row)"
      >
        <a>删除</a>
      </c-popConfirm>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          {
            date: '2019-01-01',
            uid: '00089757',
            name: '企业名称 1',
            addr: '北京市朝阳区酒仙桥路6号',
            amount: 9873,
            status: '已生效',
            edit: false
          },
          {
            date: '2019-01-02',
            uid: '0008933',
            name: '企业名称 2',
            addr: '北京市朝阳区酒仙桥路7号',
            amount: 432334,
            status: '已生效',
            edit: false
          },
          {
            date: '2019-01-03',
            uid: '00089876',
            name: '企业名称 3',
            addr: '北京市朝阳区酒仙桥路9号',
            amount: 875445,
            status: '未生效',
            edit: false
          }
        ],
        columns: [
          { title: '日期', prop: 'date', width: 120, fixed: 'left' },
          { title: '用户 ID', prop: 'uid', width: 120 },
          { title: '名称', prop: 'name', width: 200 },
          { title: '地址', prop: 'addr', width: 300 },
          { title: '金额(元)', prop: 'amount', align: 'right', width: 150 },
          { title: '状态', prop: 'status', width: 100 },
          { title: '操作', prop: 'actions', width: 160, fixed: 'right' }
        ]
      }
    },
    methods: {
      updateName(row) {
        row.edit = false
        this.dataSource = this.dataSource.map(item => {
          if (item.uid === row.uid) {
            item.name = row.name
          }
          return item
        })
      },
      edit(row) {
        this.$nextTick(() => {
          row.edit = true
        })
        console.log(row)
      },
      show(row) {
        this.$message({
          type: 'info',
          duration: 5 * 1000,
          message: `${row.name} 消费 ${row.amount} 元`
        })
      },
      remove(row) {
        this.dataSource = this.dataSource.filter(item => item.uid !== row.uid)
      }
    }
  }
</script>

<style>
  a {
    color: #006bff;
    text-decoration: none;
  }
  a + a {
    margin-left: 1em;
  }
  .c-input {
    width: 160px;
  }
</style>
```

## 表头分组

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

```html
<template>
  <c-table bordered :columns="columns" :dataSource="dataSource"></c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          {
            date: '2019-01-01',
            name: '企业名称 1',
            city: '北京市',
            district: '朝阳区',
            street: '酒仙桥路',
            amount: 12234,
            note: ''
          },
          {
            date: '2019-01-02',
            name: '企业名称 2',
            city: '广东省 广州市',
            district: '越秀区',
            street: '东湖路',
            amount: 8734,
            note: ''
          },
          {
            date: '2019-01-03',
            name: '企业名称 3',
            city: '上海市',
            district: '黄浦区',
            street: '南京东路',
            amount: 44654,
            note: '提交信息不完整'
          }
        ],
        columns: [
          { title: '日期', prop: 'date' },
          {
            title: '基础信息',
            children: [
              { title: '名称', prop: 'name' },
              {
                title: '地址',
                children: [
                  { title: '省市', prop: 'city' },
                  { title: '区县', prop: 'district' },
                  { title: '街道', prop: 'street' }
                ]
              }
            ]
          },
          {
            title: '附加信息',
            children: [
              { title: '金额(元)', prop: 'amount' },
              { title: '备注', prop: 'note' }
            ]
          }
        ]
      }
    }
  }
</script>
```

## 可展开

```html
<template>
  <c-table :columns="columns" :dataSource="dataSource">
    <template v-slot:expand="{row, index}">
      <div class="expand-content">这里是展开后的内容</div>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { type: 'expand', width: 20, align: 'right' },
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
<style scoped>
  .expand-content {
    padding: 24px 14px;
  }
</style>
```

## 选择性展示列

```html
<template>
  <c-table :columns="columns" :dataSource="dataSource">
    <template #action>
      <div class="col-controller">
        <div class="col-controller__label" id="col-controller__label">
          选择隐藏何列：
        </div>
        <c-checkbox-group
          v-model="hiddenColumns"
          aria-labelledby="col-controller__label"
        >
          <c-checkbox v-for="title in checkboxList" :value="title" :key="title">
            {{title}}
          </c-checkbox>
        </c-checkbox-group>
      </div>
    </template>
    <template v-slot:expand="{row, index}">
      <div class="expand-content">这里是展开后的内容</div>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      return {
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        rawColumns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ],
        hiddenColumns: []
      }
    },
    computed: {
      columns() {
        return this.rawColumns.map(item => {
          return {
            ...item,
            hidden: this.hiddenColumns.includes(item.title)
          }
        })
      },
      checkboxList() {
        return this.rawColumns.map(item => item.title)
      }
    }
  }
</script>
<style scoped>
  .col-controller,
  .col-controller__label {
    margin-bottom: 1em;
  }
</style>
```

## 全屏展示

对于数据较多的表格，可以调用组件的 `fullScreen()` 方法使表格全屏展示。

```html
<template>
  <c-table
    ref="table"
    :columns="columns"
    :dataSource="dataSource"
    :height="200"
  >
    <template #action>
      <div class="toolbar">
        <c-button @click="$refs.table.fullScreen()">全屏展示</c-button>
      </div>
    </template>
  </c-table>
</template>
<script>
  export default {
    data() {
      const random = () => Math.round(Math.random() * 1000)
      const dataSource = [...new Array(100)].map((_, i) => ({
        date: '2019-07-05',
        pv: random(),
        uv: random(),
        ip: random()
      }))
      return {
        dataSource,
        columns: [
          { title: '日期', prop: 'date' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
<style scoped>
  .toolbar {
    margin-bottom: 1em;
  }
</style>
```

## 可翻页

```html
<template>
  <c-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="pagination"
    @page-change="onPageChange"
  />
</template>
<script>
  const generateData = () => {
    const random = () => Math.round(Math.random() * 1000)
    return [...new Array(5)].map((_, i) => ({
      date: '2019-07-05',
      pv: random(),
      uv: random(),
      ip: random()
    }))
  }
  export default {
    data() {
      return {
        dataSource: generateData(),
        pagination: {
          pn: 1,
          total: 20,
          ps: 5
        },
        columns: [
          { title: '日期', prop: 'date' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    },
    methods: {
      onPageChange({ detail }) {
        this.pagination.pn = detail.pn
        this.dataSource = generateData()
      }
    }
  }
</script>
```

## Table Props

| Name                      | Description                                                                     | Type                                                                         | Required | Default                                  |
| ------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- | ---------------------------------------- |
| columns                   | 详情见下表                                                                      | `Array`                                                                      | `false`  | 使用 c-table-column 时不用传，否则必须传 |
| data-source               | 数据源                                                                          | `Array`                                                                      | `true`   | `[]`                                     |
| empty-text                | 自定义无数据时显示文案                                                          | `string`                                                                     | `false`  | `'暂无数据'`                             |
| bordered                  | 是否含有边框                                                                    | `boolean`                                                                    | `false`  | `false`                                  |
| height                    | 表格的高度                                                                      | `number`                                                                     | `false`  | -                                        |
| size                      | 表格的尺寸                                                                      | `'large'` \| `'normal'` \| `'small'`                                         | `false`  | `'normal'`                               |
| default-sort              | 默认排序的 key 和顺序( `'ascending'` 和 `'descending'` )                        | `{ column: string, order: 'ascending' \| 'descending'}`                      | `false`  | -                                        |
| rowClassName              | 设置行的类名                                                                    | `(rowItem: object, rowIndex: number) => string`                              | `false`  | -                                        |
| row-key                   | 每行数据对应的唯一标识字段                                                      | `string` \| `(rowItem: object) => string`                                    | `false`  | `'key'`                                  |
| default-selected-row-keys | 默认选中的行                                                                    | `string[]`                                                                   | `false`  | `[]`                                     |
| default-expanded-row-keys | 默认展开的行                                                                    | `string[]`                                                                   | `false`  | `[]`                                     |
| selected-row-keys         | 配合 `.sync` 可以动态控制选中的行（vue@3 时可改用 `v-model:selected-row-keys`） | `string[]`                                                                   | `false`  | -                                        |
| expanded-row-keys         | 配合 `.sync` 可以动态控制展开的行（vue@3 时可改用 `v-model:expanded-row-keys`） | `string[]`                                                                   | `false`  | -                                        |
| spanMethod                | 合并单元格                                                                      | `(row: Array, column: Array, rowIndex: number, columnIndex: number) => void` | `false`  | -                                        |
| pagination                | 设置分页的相关设置                                                              | `{pn, ps, layout, span, total, size}` 详情参见 pagination 组件               | `false`  | -                                        |

## 列描述数据结构

| Name      | Description    | Type                                | Required | Default  |
| --------- | -------------- | ----------------------------------- | -------- | -------- |
| type      | 首列类型       | `'selection'` \| `'expand'`         | `false`  | -        |
| prop      | 数据字段       | `string`                            | `true`   | -        |
| title     | 表头展现       | `string`                            | `true`   | -        |
| width     | 单元格宽度     | `number`                            | `false`  | -        |
| className | 列的类名       | `string`                            | `false`  | -        |
| fixed     | 固定           | `'left'` \| `'right'`               | `false`  | -        |
| children  | 用于表头分组   | `Array<column>`                     | `false`  | -        |
| hidden    | 隐藏列         | `boolean`                           | `false`  | `false`  |
| align     | 单元格对齐方式 | `'left'` \| `'right'` \| `'center'` | `false`  | `'left'` |
| sortable  | 是否支持排序   | `boolean`                           | `false`  | `false`  |

## Table Methods

| Name           | Description                                           | Parameter                                              | Return |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------ | ------ |
| selectRow      | 选中某行/多行（也可以使用 `:selected-row-keys.sync`） | `(rowKey: string`\|`string[], state?: boolean = true)` | `void` |
| expandRow      | 展开某行/多行（也可以使用 `:expanded-row-keys.sync`） | `(rowKey: string`\|`string[], state?: boolean = true)` | `void` |
| clearSelection | 取消全部的选中态                                      | -                                                      | `void` |

## Table Slots

| Name   | Description                                                                                                            | Parameter |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | --------- |
| header | 自定义表格标题，概念可类比 [`<caption />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)          | -         |
| action | 可用于放置操控表格的控件，会在表格标题位置展示（如果传递了 `props.title`，则在 `props.title` 对应的 DOM 节点之后展示） | -         |

## Table Events

| Event Name      | Description        | Parameters                                                                                                           |
| --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| selected-change | 选择时触发         | `{ detail: { currentItem: object, currentIndex: number, selectedDataList: object[], selectedIndexList: number[] } }` |
| sort-change     | 排序事触发         | `{ detail: { column: string, order: 'ascending' \| 'descending' } }`                                                 |
| expand-change   | 折叠展开子行时触发 | `{ detail: { row: object, index: number, isExpanded: boolean } }`                                                    |
| page-change     | 页码改变时触发     | `{ detail: { pn: number, ps: number } }`                                                                             |

## TableColumn Props

| Name      | Description    | Type                               | Required | Default  |
| --------- | -------------- | ---------------------------------- | -------- | -------- |
| type      | 首列类型       | `'selection'` \| `'expand'`        | `false`  | -        |
| prop      | 数据字段       | `string`                           | `true`   | -        |
| title     | 表头展现       | `string`                           | `true`   | -        |
| width     | 单元格宽度     | `number` \| `string`               | `false`  | -        |
| className | 列的类名       | `string`                           | `false`  | -        |
| fixed     | 固定           | `'left'` \| `'right'`              | `false`  | -        |
| sortable  | 是否支持排序   | `boolean`                          | `false`  | `false`  |
| hidden    | 隐藏列         | `boolean`                          | `false`  | `false`  |
| align     | 单元格对齐方式 | `'left'` \| `'right'` \| `‘center` | `false`  | `'left'` |

## TableColumn Slots

| Name            | Description                                                                               | Parameter                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| title           | 自定义表头，即每一列的表头，优先级高于 `${prop}_title`                                    | -                                                                                                                   |
| `${prop}_title` | 自定义表头，可针对不同 `prop` 进行更细粒度的控制。`prop` 的含义参见 `TableColumn Props`   | -                                                                                                                   |
| default         | 自定义单元格，优先级高于 `${prop}_cell`                                                   | `{ row: object, value: any, index: number }` 其中 `value` 是单元格对应的数据，`index` 是列对应的索引（从 `0` 开始） |
| `${prop}_cell`  | 自定义单元格，可针对不同 `prop` 进行更细粒度的控制。`prop` 的含义参见 `TableColumn Props` | `{ row: object, value: any, index: number }` 其中 `value` 是单元格对应的数据，`index` 是列对应的索引（从 `0` 开始） |
