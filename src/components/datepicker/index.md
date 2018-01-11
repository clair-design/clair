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
        date: '2017-01-25'
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
    @change="dateChange"
  ></c-datepicker>

</template>

<script>
  export default {
    data () {
      return {
        daterange: ['2017-01-02', '2017-01-15'],
        date: ''
      }
    },
    methods: {
      dateChange (date) {
        this.daterange = date
      }
    }
  }
</script>
```
