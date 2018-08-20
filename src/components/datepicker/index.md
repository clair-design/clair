---
title: Datepicker
route: /component/datepicker
layout: component
---

# Datepicker 日期选择器

选择或者输入日期

## 基本用法

```html
<template>
  <c-datepicker
    v-model="date"
    :placeholder="'请输入或者选择日期'"
    @change="dateChange"
  ></c-datepicker>
  <c-datepicker
    v-model="date"
    :disabled="disabled"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        date: '2017-01-25',
        disabled: true
      }
    },
    methods: {
      dateChange (date) {
        this.date = date
      }
    }
  }
</script>

```

## 设置日期的最大值，最小值

```html
<template>
  <c-datepicker
    v-model="date"
    :placeholder="'请输入或者选择日期'"
    size="lg"
    :minDate="minDate"
    :maxDate="maxDate"
    @change="dateChange"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        minDate: '2017-01-01',
        maxDate: '2018-02-15',
        date: ''
      }
    },
    methods: {
      dateChange (date) {
        this.date = date
      }
    }
  }
</script>

```

## 设置日期的范围

```html
<template>
  <c-datepicker
    v-model="daterange"
    :type="'daterange'"
    :placeholder="'请选择日期'"
    size="sm"
    @change="dateChange"
  ></c-datepicker>
  <c-datepicker
    v-model="dateRange"
    :type="'daterange'"
    :placeholder="'请选择日期'"
    @change="dateRangeChange"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        daterange: [],
        dateRange: ['2018-01-02', '2018-02-15']
      }
    },
    methods: {
      dateChange (date) {
        this.daterange = date
      },
      dateRangeChange (date) {
        this.dateRange = date
      }
    }
  }
</script>
```

## 月份选择

```html
<template>
  <c-datepicker
    v-model="date"
    :type="'month'"
    :placeholder="'请输入或者选择月份'"
    @change="dateChange"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        date: '2017-01',
        disabled: true
      }
    },
    methods: {
      dateChange (date) {
        this.date = date
        console.log('month change', date)
      }
    }
  }
</script>

```

## 设置月份的范围

```html
<template>
  <c-datepicker
    v-model="monthrange"
    :type="'monthrange'"
    :placeholder="'请选择日期'"
    size="sm"
    @change="monthChange"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        monthrange: ['2018-01', '2018-02']
      }
    },
    methods: {
      monthChange (date) {
        this.daterange = date
      }
    }
  }
</script>
```

## API

> 注意：当type为daterange时，v-model需要传递起始时间和终止时间的数组

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| type | String | date | 日历类别：单日历（date），日期范围（daterange） |
| placeholder | String | '请选择日期' | 未进行选择时的提示 |
| disabled | Boolean | false | 日期框是否被禁用 |
| mixDate | String | 1970-01-01 | 可选日期的最小值 |
| mixDate | String | 2099-12-31 | 可选日期的最大值 |

### 方法

| 参数 | 说明 | 类型 | 默认值|
|-----|------|-------|-----|
| change | 时间发生变化的回调，发生在用户选择时间时 | function(String: date) | - |
