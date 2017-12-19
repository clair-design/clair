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
  :columns="columns"
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
        { title: '来源类型', key: 'type' },
        { title: '浏览量', key: 'pv' },
        { title: '访客数', key: 'uv' },
        { title: '新访客数', key: 'nv' },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' }
      ]
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
  >
    <template slot="opt-td" scope="props">
      <div class="c-table__opt">
        <a @click="showIp(props.item.ip)" href="#">  查看ip
        </a>
      </div>
    </template>
  </c-table>
</template>


<script>
export default {
  methods: {
    showIp (ip) {
      alert('ip 为 ' + ip)
    }
  },
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
        {
          title: '来源类型',
          key: 'type',
          render(index, value, item) {
            return `<a href="#">${value}</a>`
          }
        },
        { title: '浏览量', key: 'pv' },
        { title: '访客数', key: 'uv' },
        { title: '新访客数', key: 'nv' },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' },
        { title: '操作', key: 'opt' }
      ]
    }
  }
}
</script>
```

## 多级表头

对于结构复杂的数据可以使用多级表头来展现，更好的体现数据的层级关系


```html
<c-table
  :columns="columns"
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
        { title: '来源类型', key: 'type' },
        { title: '基础流量',
          key: '',
          children: [
            { title: '浏览量', key: 'pv' },
            { title: '访客数', key: 'uv' },
          ]
        },
        { title: '新访客数', key: 'nv' },
        { title: '访问时长', key: 'du' },
        { title: '转化次数', key: 'cv' },
        { title: 'IP 数', key: 'ip' }
      ]
    }
  }
}
</script>
```
