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
    placeholder="请输入或者选择日期"
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
## 带快捷方式
支持两种方式：一种设置在名为`dateSidebar`的`slot`中进行设置，通过`slot-scope`获取`datepicker`对象，调用`close`方法进行弹窗关闭， `$emit('change', date)`修改日期；
另一种方式通过`extra-option`中设置`optionList`，具体查看示例

##### 注：`date`是字符串，默认快捷键在左侧展现，可以通过复写css(flex-direction)来进行控制

```html
<style scoped>
li {
  padding-left: 12px;
}
</style>
<template>
  <p>通过extra-option的方式:</p>
  <c-datepicker
    v-model="date"
    placeholder="请输入或者选择日期"
    @change="dateChange"
    :format="format"
    :extra-option="extraOption"
  ></c-datepicker>
  <p>通过slot的方式:</p>
  <c-datepicker
    v-model="date"
    placeholder="请输入或者选择日期"
    @change="dateChange"
    :format="format"
  >
  <ul slot="dateSideBar" slot-scope="{datepicker}">
    <li
    @click="testClick(datepicker)"
    >close</li>
  </ul>
  </c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        date: '2017-01-25',
        extraOption: {
          optionList: [
            {
              text: '今天',
              onClick(picker) {
                const date = new Date().format('yyyy-MM-dd')
                console.log(date)
                picker.$emit('change', date)
                picker.close()
              }
            }, {
              text: '昨天',
              onClick(picker) {
                let date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                date = date.format('yyyy-MM-dd');
                console.log(date)
                picker.$emit('change', date);
              }
            }
          ]
        }
      }
    },
    methods: {
      testClick (props) {
        props.datepicker.close()
      },
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
    placeholder="请输入或者选择日期"
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
快捷方式支持两种方式：一种设置在名为`dateSidebar`的`slot`中进行设置，通过`slot-scope`获取`datepicker`对象，调用`setDateRange`方法进行日期修改并关闭弹窗；
另一种方式通过`extra-option`中设置`optionList`，具体查看示例

##### 注：`daterange`是字符串数组

```html
<style scoped>
li {
  padding: 0 12px;
}
</style>
<template>
  <c-datepicker
    v-model="dateRange"
    type="daterange"
    :minDate="minDate"
    :maxDate="maxDate"
    placeholder="请选择日期"
    @change="dateRangeChange"
  ></c-datepicker>
  <p>通过slot的方式:</p>
  <c-datepicker
    v-model="daterange"
    type="daterange"
    placeholder="请选择日期"
    :maxDate="today"
    size="sm"
    @change="dateChange"
  >
  <ul slot="dateSideBar" slot-scope="{datepicker}">
    <li @click="nearMonth(datepicker)"
    >近一个月</li>
  </ul>
  </c-datepicker>
  <p>通过extra-option的方式:</p>
  <c-datepicker
    v-model="dateRange"
    type="daterange"
    placeholder="请选择日期"
    @change="dateRangeChange"
    :extra-option="extraOption"
  ></c-datepicker>
</template>

<script>
  export default {
    data () {
      return {
        daterange: [],
        today: new Date().format('yyyy-MM-dd'),
        minDate: '2018-01-01',
        maxDate: '2019-02-15',
        dateRange: ['2018-01-02', '2018-02-15'],
        extraOption: {
          optionList: [
            {
              text: '本周',
              onClick(datepicker) {
                let date = new Date();
                const end = date.format('yyyy-MM-dd')
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                const dateRange = [date.format('yyyy-MM-dd'), end]
                datepicker.setDateRange(dateRange)
              }
            }, {
              text: '近一个月',
              onClick(datepicker) {
                let date = new Date();
                const end = date.format('yyyy-MM-dd')
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
                const dateRange = [date.format('yyyy-MM-dd'), end]
                datepicker.setDateRange(dateRange)
              }
            }
          ]
        }
      }
    },
    methods: {
      nearMonth (datepicker) {
        let date = new Date();
        const end = date.format('yyyy-MM-dd')
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
        const dateRange = [date.format('yyyy-MM-dd'), end]
        datepicker.setDateRange(dateRange)
      },
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
    type="month"
    placeholder="请输入或者选择月份"
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
    type="monthrange"
    placeholder="请选择日期"
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

### 注：

父级可以通过$ref来获取当前组件，调用响应的方法。
resize 方法可以重新计算更新日历弹窗的位置；
close 方法可以直接关闭日历弹窗


## API

> 注意：当type为daterange时，v-model需要传递起始时间和终止时间的数组

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| type | String | date | 日历类别：单日历（date），日期范围（daterange） |
| placeholder | String | '请选择日期' | 未进行选择时的提示 |
| disabled | Boolean | false | 日期框是否被禁用 |
| minDate | String | 1970-01-01 | 可选日期的最小值 |
| maxDate | String | 2099-12-31 | 可选日期的最大值 |
| extraOption | Array | [] | 快捷键设置显示文案及操作方法 |

### 方法

| 参数 | 说明 | 类型 | 默认值|
|-----|------|-------|-----|
| change | 时间发生变化的回调，发生在用户选择时间时 | function(String: date) | - |
