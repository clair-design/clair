---
group: Data 数据展示
---

# Pagination 分页

## 定义

对表格、卡片列表的内容进行分页，每页可定。

## 使用场景

用户访问一个网页或者查看某些数据，如果数据量过大肯定需要按页查看，不可能一个页面显示 N 条数据内容这里就用到了分页器。

## 基础样式

常用的分页样式，超过 7 页以 `…` 展示。

```html
<template>
  <c-pagination :total="230" :pn="pn" :ps="ps" @page-change="pageChange" />
</template>
<script>
  export default {
    data() {
      return {
        pn: 6,
        ps: 20
      }
    },
    methods: {
      pageChange({ detail }) {
        this.pn = detail.pn
        this.ps = detail.ps
      }
    }
  }
</script>
```

## 附加功能

根据使用场景，可自定义添加所需功能，比如每页展示数据条数、总页数、页面跳转框等。

```html
<template>
  <p>
    <c-pagination
      :total="23"
      :pn="pn"
      :ps="ps"
      @page-change="pageChange"
      layout="pages,jump,size-select"
    />
  </p>
  <p>
    <c-pagination
      :total="23"
      :pn="pn"
      :ps="20"
      @page-change="pageChange"
      layout="pages,total,jump"
    />
  </p>
</template>
<script>
  export default {
    methods: {
      pageChange({ detail }) {
        this.pn = detail.pn
        this.ps = detail.ps
      }
    },
    data() {
      return {
        pn: 1,
        ps: 20
      }
    }
  }
</script>
```

## 迷你样式

用户空间狭小的情况。

```html
<template>
  <c-pagination
    :total="81"
    :pn="pn"
    :ps="20"
    size="small"
    @page-change="pageChange"
  />
</template>
<script>
  export default {
    data() {
      return {
        pn: 1
      }
    },
    methods: {
      pageChange({ detail }) {
        this.pn = detail.pn
      }
    }
  }
</script>
```

## 简易样式

一般用于卡片或表格等，不超过 10 页。

```html
<template>
  <c-pagination
    :total="81"
    :pn="pn"
    :ps="20"
    :simple="true"
    @page-change="pageChange"
  />
</template>
<script>
  export default {
    data() {
      return {
        pn: 1
      }
    },
    methods: {
      pageChange({ detail }) {
        this.pn = detail.pn
      }
    }
  }
</script>
```

## 单页时可以隐藏

```html
<template>
  <p>
    <c-checkbox name="hideOnSinglePage" v-model="isHide">单页隐藏</c-checkbox>
  </p>
  <c-pagination
    :total="0"
    :pn="pn"
    :ps="20"
    size="small"
    @page-change="pageChange"
    :hide-on-single-page="isHide"
  />
</template>
<script>
  export default {
    data() {
      return {
        pn: 1,
        isHide: false
      }
    },
    methods: {
      pageChange({ detail }) {
        this.pn = detail.pn
      }
    }
  }
</script>
```

## Props

| Name                | Description                                                      | Type                                                                                 | Required | Default            |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------- | ------------------ |
| total               | 数据总数                                                         | `number`                                                                             | `true`   | -                  |
| pn                  | 当前页码                                                         | `number`                                                                             | `false`  | `1`                |
| ps                  | 每页中数据数                                                     | `number`                                                                             | `false`  | `20`               |
| ps-options          | 每页数据个数的选择范围（请留意 `ps` 需要在 `ps-options` 中存在） | `number[]`                                                                           | `false`  | `[20, 30, 40, 50]` |
| span                | 左右展示个数                                                     | `number`                                                                             | `false`  | `2`                |
| layout              | 布局                                                             | `string` (`pages`, `total`, `jump`, `size-select` 任意个数，且任意顺序，以 `,` 分割) | `false`  | `'pages'`          |
| size                | 尺寸大小(normal, small)                                          | `string ('normal', 'small')`                                                         | `false`  | `'normal'`         |
| simple              | 简易模式                                                         | `boolean`                                                                            | `false`  | `false`            |
| hide-on-single-page | 只有一页时是否隐藏                                               | `boolean`                                                                            | `false`  | `false`            |

## Events

| Event Name  | Description    | Parameters                               |
| ----------- | -------------- | ---------------------------------------- |
| page-change | 页码改变时触发 | `{ detail: { pn: number, ps: number } }` |  |
