---
title: Table
layout: component
route: /component/table
---

# Table 表格

用于展示多条结构类似的数据，可对数据进行排序或其他自定义操作

## 基础表格

基础表格用于展示信息列表，随屏幕宽度进行自适应调节
使用 `columns` 属性指定所有列，`datasource` 绑定表格展现信息


```html
<c-table
  :size="size"
  :columns="columns"
  :datasource="datasource1"
  :rowClassName="getRowClassName"
/>
<c-button
  @click.native="changeData()"
>获取数据</c-button>


<script>
export default {
  data () {
    return {
      size: 'sm',
      datasource1: [],
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { title: '来源类型', key: 'type', align: 'center', width: '20%' },
        { title: '浏览量', key: 'pv', className: 'test' },
        { title: '访客数', key: 'uv' },
        { title: '新访客数', key: 'nv' },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip', align: 'right ' }
      ]
    }
  },
  methods: {
    getRowClassName (rowItem, rowIndex) {
      return 'test--row'
    },
    changeData () {
      console.log('ddd')
      this.datasource1 = this.datasource
    }
  }
}
</script>

```

## 可选择的表格

在 `columns`设置第一列的`type`为`selection`， 即可支持第一列展现可选框, 数据中通过`disabled`字段可以控制数据

```html
<c-table
  :columns="columns"
  border="vertical"
  :datasource="datasource"
  :allSelected="allSelected"
  @selectChange="onSelectChange"
/>
<p/>
<c-button
  @click.native="updateData()"
>更新数据
</c-button>
<c-button
  @click.native="allSelected = !allSelected"
>修改全选状态
</c-button>
<c-button
  @click="resetData()"
>重置数据
</c-button>

<script>
export default {
  data () {
    return {
      allSelected: false,
      datasource: [],
      data: [
        {
          type: '直接访问',
          _disabled: true,
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      datasource1: [
        {
          type: '直接访问1',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎1',
          _disabled: true,
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { type: 'selection', align: 'center', width: 60 },
        { title: '来源类型', key: 'type' },
        { title: '浏览量', key: 'pv' },
        { title: '访客数', key: 'uv' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' }
      ]
    }
  },
  created () {
    this.datasource = this.data
  },
  methods: {
    onSelectChange (selection) {
      console.log(selection)
    },
    updateData () {
      this.datasource = this.datasource1
    },
    resetData () {
      this.datasource = []
    }
  }
}
</script>
```

## 自定义单元格内容

通过 `render` 进行函数定义返回单元格的内容，也可以通过 [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) 特性来获取数据进行其他的交互


```html
<template>
  <c-table
    :columns="columns"
    :datasource="datasource"
    :sortkey="sortKey"
    border="all"
    :sortorder="sortOrder"
    @sort="sorter"
  >
    <template slot="opt-td" slot-scope="props">
      <div class="c-table__opt">
        <a href="javascript:;" @click="showIp(props.item.ip)">  查看ip
        </a>
      </div>
    </template>
  </c-table>
</template>


<script>
export default {
  data () {
    return {
      sortKey: 'pv',
      sortOrder: 'asc',
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        {
          title: '来源类型',
          width: 200,
          key: 'type',
          render(index, value, item) {
            return `<a href="#">${value}</a>`
          }
        },
        { title: '浏览量', key: 'pv', sorter: true },
        { title: '访客数', key: 'uv', sorter: true },
        { title: '新访客数', key: 'nv', sorter: true },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' },
        { title: '操作', key: 'opt' }
      ]
    }
  },
  methods: {
    showIp (ip) {
      alert('ip 为 ' + ip)
    },
    sorter (sortObj) {
      this.sortKey = sortObj.key
      this.sortOrder = sortObj.order
      this.datasource = this.datasource.sort((a,b) => {
          return this.sortOrder === 'asc' ? a[this.sortKey] - b[this.sortKey] > 0
            : a[this.sortKey] - b[this.sortKey] < 0
        })
    }
  }
}
</script>
```

## 多级表头

对于结构复杂的数据可以使用多级表头来展现，更好的体现数据的层级关系


```html
<c-table
  :sortkey="sortKey"
  :sortorder="sortOrder"
  :columns="columns"
  :datasource="datasource"
  border="group"
  @sort="sorter"
/>

<script>
export default {
  data () {
    return {
      sortKey: 'pv',
      sortOrder: 'asc',
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { title: '来源类型', key: 'type' },
        { title: '基础流量',
          key: '',
          children: [
            { title: '浏览量', key: 'pv', sorter: true },
            { title: '访客数', key: 'uv' },
          ]
        },
        { title: '新访客数', key: 'nv', sorter: true },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' }
      ]
    }
  },
  methods: {
    sorter (sortObj) {
      this.sortKey = sortObj.key
      this.sortOrder = sortObj.order
      this.datasource = this.datasource.sort((a,b) => {
        return this.sortOrder === 'asc' ? a[this.sortKey] - b[this.sortKey] > 0
          : a[this.sortKey] - b[this.sortKey] < 0
      })
    }
  }
}
</script>
```

## 列固定

对于结构复杂的数据可以使用列固定来展现重要信息，需要在`columns`中指定每列的宽度，其他数据可以滑动查看


```html
<c-table
  :columns="columns"
  border="horizon"
  :datasource="datasource"
/>

<script>
export default {
  data () {
    return {
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { title: '来源类型', key: 'type', fixed: 'left', width: 150},
        { title: '浏览量', key: 'pv', fixed: 'left', width: 150 },
        { title: '访客数', key: 'uv', width: 200 },
        { title: '新访客数', key: 'nv', width: 200 },
        { title: '访问时长', key: 'du', width: 200 },
        { title: '转化次数', key: 'cv', width: 200 },
        { title: 'IP 数', key: 'ip', fixed: 'right', width: 100 }
      ]
    }
  }
}
</script>
```

## 表头固定

对于数目较多的数据可以使用表头固定来展现数据信息，需要在组件中传递表格的高度


```html
<c-table
  :columns="columns"
  height="200"
  border="horizon"
  :datasource="datasource"
/>

<script>
export default {
  data () {
    return {
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        },
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        },{
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { title: '来源类型', key: 'type', width: 150},
        { title: '浏览量', key: 'pv', width: 150 },
        { title: '访客数', key: 'uv', width: 200 },
        { title: '新访客数', key: 'nv', width: 200 },
        { title: 'IP 数', key: 'ip', width: 100 }
      ]
    }
  }
}
</script>
```

## 表头和列都固定

对于数目较多的数据可以使用表头固定，重要的列固定来展现数据信息


```html
<c-table
  :columns="columns"
  height="200"
  border="horizon"
  :datasource="datasource"
/>

<script>
export default {
  data () {
    return {
      datasource: [
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        },
        {
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        },{
          type: '直接访问',
          pv: 1,
          uv: 2,
          nv: 3,
          du: 4,
          cv: 5,
          ip: 8
        }, {
          type: '搜索引擎',
          pv: 11,
          uv: 21,
          nv: 31,
          du: 141,
          cv: 51,
          ip: 81
        }
      ],
      columns: [
        { title: '来源类型', key: 'type', width: 150, fixed: 'left'},
        { title: '浏览量', key: 'pv', width: 150 },
        { title: '访客数', key: 'uv', width: 200 },
        { title: '新访客数', key: 'nv', width: 200 },
        { title: '访问时长', key: 'du', width: 200 },
        { title: '转化次数', key: 'cv', width: 200 },
        { title: 'IP 数', key: 'ip', fixed: 'right', width: 100 }
      ]
    }
  }
}
</script>
```


## API

> 注意： 在 `columns`设置第一列的`type`为`selection`， 即可支持第一列展现可选框；横向或者纵向出现滚动条时需要设置单元格的宽度，否则无法保证表头和内容的对齐性

### columns

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| key | String | - | - |
| title | String | - | 表头展现 |
| width | Number, String | - | number会自动转化为像素，string会直接用来展现 |
| className | String | - | 列的类名 |
| fixed | String | - | 可以设置left，right进行定位 |
| sorter | Boolean | false | 是否支持排序 |


### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| columns | Object | {} | 详情见上表 |
| datasource | Array | [] | 数据源 |
| border | String | 'none' | all:全边框，horizon:水平边框，vertical:垂直边框，box: 仅有外边框，group：针对多级表头分组边框 |
| height | Number | - | 设置为具体的值，tbody出滚动条 |
| sortKey | String | - | 默认排序的key |
| sortOrder | String | - | 默认排序的升降顺序：asc 和 desc |
| rowClassName | Function | function(rowItem: Object, rowIndex: Number) | 设置行的类名 |

### 方法

| 参数 | 类型 | 默认值| 说明 |
|-----|------|-------|-----|
| selectChange | Function | function(selection: Array) | checkbox勾选后触发，返回已勾选的数组 |
| sort | Function | function(sortObj: Object) | 排序按钮点击触发，返回{key, order} |
| rowEnter | Function | function(index： Number) | 行进入事件 |
| rowLeave | Function | - | 行离开事件 |
