---
title: Select 下拉选择框
layout: component
scrollTop: true
route: component/select
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

## 自定义选项

## 选项分组

## 选项筛选

## Tag 展示

## API

### `c-select` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| options | Array | 无 | 选项列表 |
| disabled | Boolean | false | 下拉框是否被禁用 |
| placeholder | String | '请选择...' | 未进行选择时的提示 |
| multiple | Boolean | false | 是否允许多选 |

### `c-option` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| label | String | 无 | 选项显示的文字 |
| value | String, Number, Object | 无 | 选项关联的值 |
| disabled | Boolean | false | 选项是否被禁用 |
