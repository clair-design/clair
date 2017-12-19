---
title: Select 下拉选择框
layout: component
route: /component/select
---

# Select 下拉选择框

下拉选择框用来在**较多**的选项中选择一项或多项。如果选项数量少于 5 ，建议使用 [单选框](radio) 或 [多选框](checkbox) 组件。

## 基本用法

使用 `options` 属性指定所有的选项，`v-model` 绑定用户选择的值。

```html
<c-select
  v-model="dim"
  :options="options"
/>

<span v-if="dim">您选择的是 {{ dim }}</span>

<script>
export default {
  data () {
    return {
      dim: '',
      options: [
        { label: '浏览量', value: 'pv' },
        { label: '访客数', value: 'uv' },
        { label: '新访客数', value: 'nv' },
        { label: '访问时长', value: 'du' },
        { label: '转化次数', value: 'cv' },
        { label: 'IP 数', value: 'ip' }
      ]
    }
  }
}
</script>
```

### 多选

给 `c-select` 添加 `multiple` 属性可以将其设置为多选。在多选时，`v-model` 绑定的值是一个数组。

```html
<c-select
  v-model="dim"
  :options="options"
  width="long"
  multiple
/>

<span v-if="dim">您选择的是 {{ dim }}</span>

<script>
export default {
  data () {
    return {
      dim: ['pv', 'nv'],
      options: [
        { label: '浏览量', value: 'pv' },
        { label: '访客数', value: 'uv' },
        { label: '新访客数', value: 'nv' },
        { label: '访问时长', value: 'du' },
        { label: '转化次数', value: 'cv' },
        { label: 'IP 数', value: 'ip' }
      ]
    }
  }
}
</script>
```

## 禁用状态

### 禁用某些选项

给 `options` 数组中的项添加 `disabled` 属性可将该选项禁用。

```html
<c-select
  v-model="dim"
  :options="options"
  width="long"
  multiple
/>

<span v-if="dim">您选择的是 {{ dim }}</span>

<script>
export default {
  data () {
    return {
      dim: ['pv', 'nv'],
      options: [
        { label: '浏览量', value: 'pv' },
        { label: '访客数', value: 'uv' },
        { label: '新访客数', value: 'nv', disabled: true },
        { label: '访问时长', value: 'du' },
        { label: '转化次数', value: 'cv', disabled: true },
        { label: 'IP 数', value: 'ip' }
      ]
    }
  }
}
</script>
```

### 禁用整个下拉框

给 `c-select` 添加 `disabled` 属性将整个下拉框禁用。

```html
<c-select
  v-model="dim"
  :options="options"
  disabled
/>

<span v-if="dim">您选择的是 {{ dim }}</span>

<script>
export default {
  data () {
    return {
      dim: 'pv',
      options: [
        { label: '浏览量', value: 'pv' },
        { label: '访客数', value: 'uv' },
        { label: '新访客数', value: 'nv' },
        { label: '访问时长', value: 'du' },
        { label: '转化次数', value: 'cv' },
        { label: 'IP 数', value: 'ip' }
      ]
    }
  }
}
</script>
```

## 不同尺寸的下拉框

使用 `width` 属性控制输入框的长度，`size` 属性控制输入框的整体大小。

```html
<c-select v-model="dim" :options="options" width="shortest" size="sm" />
<c-select v-model="dim" :options="options" width="shorter" size="sm" />
<c-select v-model="dim" :options="options" width="short" size="sm" />
<c-select v-model="dim" :options="options" width="medium" size="sm" />
<c-select v-model="dim" :options="options" width="long" size="sm" />
<c-select v-model="dim" :options="options" width="flex" size="sm" />
<c-select v-model="dim" :options="options" width="flex" />
<c-select v-model="dim" :options="options" width="flex" size="lg" />

<script>
export default {
  data () {
    return {
      dim: 'ip',
      options: [
        { label: '浏览量', value: 'pv' },
        { label: '访客数', value: 'uv' },
        { label: '新访客数', value: 'nv' },
        { label: '访问时长', value: 'du' },
        { label: '转化次数', value: 'cv' },
        { label: 'IP 数', value: 'ip' }
      ]
    }
  }
}
</script>

<style>
.c-select {
  margin-bottom: 1em;
}
</style>
```


## 自定义展示

通过 Vue.js 的 [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) 特性，我们可以写一个模版替换内置的菜单项展示。

```html
<template>
  <c-select
    v-model="device"
    :options="options"
  >
    <template
      slot="menu-item"
      slot-scope="menuItem"
      scope="menuItem"
    >
      <c-icon :name="menuItem.option.icon" />
      <span>{{ menuItem.label }}</span>
    </template>
  </c-select>
</template>

<script>
export default {
  data () {
    return {
      device: '',
      options: [
        { label: '打印机', icon: 'printer', value: 1 },
        { label: '显示器', icon: 'monitor', value: 2 },
        { label: '智能手机', icon: 'smartphone', value: 3 },
        { label: 'CPU', icon: 'cpu', value: 4 },
        { label: '头戴式耳机', icon: 'headphones', value: 5 },
        { label: '数码相机', icon: 'camera', value: 6 }
      ]
    }
  }
}
</script>

<style>
.c-icon {
  vertical-align: middle;
  margin-right: 0.4em;
}
</style>
```

使用类似的方式，也可以实现对已选内容的自定义：

```html
<template>
  <c-select
    v-model="device"
    :options="options"
    width="long"
    multiple
  >
    <template
      slot="selection"
      slot-scope="data"
      scope="data"
    >
      <c-icon :name="data.option.icon" />
    </template>
  </c-select>
</template>

<script>
export default {
  data () {
    return {
      device: [1, 2, 3],
      options: [
        { label: '打印机', icon: 'printer', value: 1 },
        { label: '显示器', icon: 'monitor', value: 2 },
        { label: '智能手机', icon: 'smartphone', value: 3 },
        { label: 'CPU', icon: 'cpu', value: 4 },
        { label: '头戴式耳机', icon: 'headphones', value: 5 },
        { label: '数码相机', icon: 'camera', value: 6 }
      ]
    }
  }
}
</script>

<style>
.c-icon {
  vertical-align: middle;
  margin-right: 0.4em;
}
</style>
```

## 选项筛选

给 `c-select` 设置 `autocomplete` 属性可以允许用户输入筛选条件对选项进行过滤。

默认情况下，搜索规则是将用户输入和每个选项的 `label` 进行匹配，大小写不敏感。如果你想自定义过滤规则，可以通过 `filter` 属性传入一个过滤函数。

```html
<c-select
  v-model="state"
  :options="options"
  :filter="filter"
  autocomplete
/>

<script>
const options = [
  { "label": "Alabama", "value": "al" },
  { "label": "Alaska", "value": "ak" },
  { "label": "Arizona", "value": "az" },
  { "label": "Arkansas", "value": "ar" },
  { "label": "California", "value": "ca" },
  { "label": "Colorado", "value": "co" },
  { "label": "Connecticut", "value": "ct" },
  { "label": "Delaware", "value": "de" },
  { "label": "Florida", "value": "fl" },
  { "label": "Georgia", "value": "ga" },
  { "label": "Hawaii", "value": "hi" },
  { "label": "Idaho", "value": "id" },
  { "label": "Illinois", "value": "il" },
  { "label": "Indiana", "value": "in" },
  { "label": "Iowa", "value": "ia" },
  { "label": "Kansas", "value": "ks" },
  { "label": "Kentucky", "value": "ky" },
  { "label": "Louisiana", "value": "la" },
  { "label": "Maine", "value": "me" },
  { "label": "Maryland", "value": "md" },
  { "label": "Massachusetts", "value": "ma" },
  { "label": "Michigan", "value": "mi" },
  { "label": "Minnesota", "value": "mn" },
  { "label": "Mississippi", "value": "ms" },
  { "label": "Missouri", "value": "mo" },
  { "label": "Montana", "value": "mt" },
  { "label": "Nebraska", "value": "ne" },
  { "label": "Nevada", "value": "nv" },
  { "label": "New Hampshire", "value": "nh" },
  { "label": "New Jersey", "value": "nj" },
  { "label": "New Mexico", "value": "nm" },
  { "label": "New York", "value": "ny" },
  { "label": "North Carolina", "value": "nc" },
  { "label": "North Dakota", "value": "nd" },
  { "label": "Ohio", "value": "oh" },
  { "label": "Oklahoma", "value": "ok" },
  { "label": "Oregon", "value": "or" },
  { "label": "Pennsylvania", "value": "pa" },
  { "label": "Rhode Island", "value": "ri" },
  { "label": "South Carolina", "value": "sc" },
  { "label": "South Dakota", "value": "sd" },
  { "label": "Tennessee", "value": "tn" },
  { "label": "Texas", "value": "tx" },
  { "label": "Utah", "value": "ut" },
  { "label": "Vermont", "value": "vt" },
  { "label": "Virginia", "value": "va" },
  { "label": "Washington", "value": "wa" },
  { "label": "West Virginia", "value": "wv" },
  { "label": "Wisconsin", "value": "wi" },
  { "label": "Wyoming", "value": "wy" }
]

export default {
  data () {
    return {
      state: '',
      options,
      // 如果需要，可以自定义过滤函数
      // filter: (option, query) => option.label.includes(query)
    }
  }
}
</script>
```

对于可以多选的下拉框，也可以让用户过滤选项。

```html
<c-select
  v-model="state"
  :options="options"
  width="long"
  multiple
  autocomplete
/>

<script>
const options = [
  { "label": "Alabama", "value": "al" },
  { "label": "Alaska", "value": "ak" },
  { "label": "Arizona", "value": "az" },
  { "label": "Arkansas", "value": "ar" },
  { "label": "California", "value": "ca" },
  { "label": "Colorado", "value": "co" },
  { "label": "Connecticut", "value": "ct" },
  { "label": "Delaware", "value": "de" },
  { "label": "Florida", "value": "fl" },
  { "label": "Georgia", "value": "ga" },
  { "label": "Hawaii", "value": "hi" },
  { "label": "Idaho", "value": "id" },
  { "label": "Illinois", "value": "il" },
  { "label": "Indiana", "value": "in" },
  { "label": "Iowa", "value": "ia" },
  { "label": "Kansas", "value": "ks" },
  { "label": "Kentucky", "value": "ky" },
  { "label": "Louisiana", "value": "la" },
  { "label": "Maine", "value": "me" },
  { "label": "Maryland", "value": "md" },
  { "label": "Massachusetts", "value": "ma" },
  { "label": "Michigan", "value": "mi" },
  { "label": "Minnesota", "value": "mn" },
  { "label": "Mississippi", "value": "ms" },
  { "label": "Missouri", "value": "mo" },
  { "label": "Montana", "value": "mt" },
  { "label": "Nebraska", "value": "ne" },
  { "label": "Nevada", "value": "nv" },
  { "label": "New Hampshire", "value": "nh" },
  { "label": "New Jersey", "value": "nj" },
  { "label": "New Mexico", "value": "nm" },
  { "label": "New York", "value": "ny" },
  { "label": "North Carolina", "value": "nc" },
  { "label": "North Dakota", "value": "nd" },
  { "label": "Ohio", "value": "oh" },
  { "label": "Oklahoma", "value": "ok" },
  { "label": "Oregon", "value": "or" },
  { "label": "Pennsylvania", "value": "pa" },
  { "label": "Rhode Island", "value": "ri" },
  { "label": "South Carolina", "value": "sc" },
  { "label": "South Dakota", "value": "sd" },
  { "label": "Tennessee", "value": "tn" },
  { "label": "Texas", "value": "tx" },
  { "label": "Utah", "value": "ut" },
  { "label": "Vermont", "value": "vt" },
  { "label": "Virginia", "value": "va" },
  { "label": "Washington", "value": "wa" },
  { "label": "West Virginia", "value": "wv" },
  { "label": "Wisconsin", "value": "wi" },
  { "label": "Wyoming", "value": "wy" }
]

export default {
  data () {
    return {
      state: [],
      options
    }
  }
}
</script>
```

## 异步搜索

某些场景下，你会需要根据用户的输入从服务器端获取相关选项。你可以指定 `filter` 函数返回一个 `Promise` 即可。

```html
<c-select
  v-model="choice"
  :options="options"
  :filter="search"
  autocomplete
  multiple
>
</c-select>

<script>
const rdn = _ => Math.random().toString(36).substr(-3)
const defaultOptions = ['option 1', 'option 2', 'option 3']
  .map(value => ({label: value, value}))
export default {
  data () {
    return {
      choice: '',
      options: []
    }
  },
  methods: {
    search (options, query) {
      if (!query) return defaultOptions
      return new window.Promise((resolve, reject) => {
        setTimeout(_ => {
          resolve([1, 2, 3].map(i => `${query}-${rdn()}`))
        }, 500)
      })
    }
  }
}
</script>
```

> 注意：用户在输入时，Select 组件会自动调用 `filter` 属性传入的函数。这个函数的调用没有经过任何的防抖和节流操作，开发者需要根据具体的场景自行处理。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| options | Array | 无 | 选项列表 |
| disabled | Boolean | false | 下拉框是否被禁用 |
| placeholder | String | '请选择...' | 未进行选择时的提示 |
| multiple | Boolean | false | 是否允许多选 |
| autocomplete | Boolean | false | 是否允许用户对选项进行搜索 |
| filter | Function | 按label过滤 | 自定义对选项过滤函数，异步时可返回 `Promise` |

### slots

| 名称 | 是否 Scoped | 说明 |
|-----|------|-------|-----|
| menu-item | 是 | 自定义下拉菜单项的展示，scope 为菜单项的数据 |
| no-match | 否 | 自定义无法找到用户搜索的选项时的提示 |

