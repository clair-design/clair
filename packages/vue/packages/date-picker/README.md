---
group: Form 表单
---

# Datepicker 日期选择器

## 基本用法

```html
<div class="date-picker-demo">
  <c-date-picker
    v-model="value"
    @change="change"
    @clear="clear"
    @visibility-change="vChange"
    :setCellClassName="setCellClassNameDate"
    :setCellDisabled="setCellDisabledDate"
  />
  <c-date-picker
    v-model="value1"
    @change="change"
    type="week"
    placeholder="选择周"
    :first-day-of-week="1"
    :setCellClassName="setCellClassNameWeek"
    :setCellDisabled="setCellDisabledWeek"
  />
  <c-date-picker
    v-model="value2"
    @change="change"
    type="month"
    placeholder="选择月"
    :setCellClassName="setCellClassNameMonth"
    :setCellDisabled="setCellDisabledMonth"
  />
  <c-date-picker
    v-model="value3"
    @change="change"
    type="quarter"
    placeholder="选择季度"
    :setCellClassName="setCellClassNameQuarter"
    :setCellDisabled="setCellDisabledQuarter"
  />
  <c-date-picker
    v-model="value4"
    @change="change"
    type="year"
    placeholder="选择年"
    style="margin-top: 20px"
    :setCellClassName="setCellClassNameYear"
    :setCellDisabled="setCellDisabledYear"
  />
</div>

<script>
  export default {
    data() {
      return {
        value: '',
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      }
    },
    methods: {
      change(e) {
        console.log('date change: ', e)
      },
      clear(e) {
        console.log('date clear')
      },
      vChange(status) {
        console.log('visibility change to', status)
      },
      setCellClassNameDate(value) {
        return {
          wed: value.getDay() === 3
        }
      },
      setCellClassNameWeek(value) {
        const [year, week] = value.split('w')
        if (year === '2019' && week >= '52') return ['lastWeekOfYear', '2019']
      },
      setCellClassNameMonth(value) {
        return {
          dec: value.getMonth() === 11
        }
      },
      setCellClassNameQuarter(value) {
        const [year, quarter] = value.split('q')
        if (quarter === '4') return 'lastQuarterOfYear'
      },
      setCellClassNameYear(value) {
        return {
          nextYear: value >= new Date()
        }
      },
      setCellDisabledDate(value) {
        const date = value.getDate()
        return date > 25 && date < 30
      },
      setCellDisabledWeek(value) {
        const [year, week] = value.split('w')
        return year === '2019' && week === '52'
      },
      setCellDisabledMonth(value) {
        return value.getMonth() === 11
      },
      setCellDisabledQuarter(value) {
        const [year, quarter] = value.split('q')
        return quarter === '3' && Number(year) > 2019
      },
      setCellDisabledYear(value) {
        return value >= new Date('2025')
      }
    }
  }
</script>

<style>
  .date-picker-demo .c-date-picker {
    margin: 10px;
  }
</style>
```

## 自定义 输入框/选择结果 的格式

```html
<c-date-picker
  v-model="value"
  @change="change"
  format="yyyy-M-d"
  value-format="yyyy/MM/dd"
/>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    methods: {
      change(date) {
        console.log('date change: ', date)
      }
    }
  }
</script>
```

## 禁用样式

```html
<c-date-picker v-model="value" disabled />

<script>
  export default {
    data() {
      return {
        value: '2019-11-11'
      }
    }
  }
</script>
```

## 选择日期范围

```html
<c-date-picker v-model="value" @change="change" type="daterange" />
<script>
  export default {
    data() {
      return {
        value: []
      }
    },
    methods: {
      change(date) {
        console.log('date change: ', date)
      }
    }
  }
</script>
```

## 带快捷方式

```html
<div class="date-picker-demo">
  <c-date-picker v-model="value" @change="change">
    <div slot="shortcut">
      <button @click="pickToday">今天</button>
      <button @click="pickLastWeek">一周前</button>
      <button @click="pickNextMonth">一个月后</button>
    </div>
  </c-date-picker>
  <c-date-picker v-model="daterange" @change="change" type="daterange">
    <div slot="shortcut">
      <button @click="pickPassWeek">最近一周</button>
      <button @click="pickPassMonth">最近一个月</button>
      <button @click="pickPassThreeMonth">最近三个月</button>
    </div>
  </c-date-picker>
</div>

<script>
  export default {
    data() {
      return {
        value: '',
        daterange: []
      }
    },
    methods: {
      change(date) {
        console.log('date change: ', date)
      },
      pickToday() {
        this.value = new Date()
      },
      pickLastWeek() {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        this.value = date
      },
      pickNextMonth() {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
        this.value = date
      },
      pickPassWeek() {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        this.daterange = [start, end]
      },
      pickPassMonth() {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        this.daterange = [start, end]
      },
      pickPassThreeMonth() {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        this.daterange = [start, end]
      }
    }
  }
</script>
```

## 不同尺寸

大中小三种组合，可以和表单输入框进行对应。

```html
<div class="date-picker-size-demo">
  <c-date-picker v-model="value" size="small" />
  <c-date-picker v-model="value" />
  <c-date-picker v-model="value" size="large" />
</div>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<style>
  .date-picker-size-demo .c-date-picker {
    display: flex;
    margin: 10px;
  }
</style>
```

## Props

| Name                | Description                                                                                                                                        | Type                                                                     | Required | Default            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- | ------------------ |
| value/v-model       | 绑定值                                                                                                                                             | `Date` \| `Array` \| `string`                                            | `true`   | -                  |
| disabled            | 是否被禁用                                                                                                                                         | `boolean`                                                                | `false`  | `false`            |
| size                | 尺寸                                                                                                                                               | `'large'` \| `'normal'` \| `'small'`                                     | `false`  | `'normal'`         |
| placeholder         | 未进行选择时的提示                                                                                                                                 | `string`                                                                 | `false`  | -                  |
| start-placeholder   | 开始日期输入框提示                                                                                                                                 | `string`                                                                 | `false`  | -                  |
| end-placeholder     | 结束日期输入框提示                                                                                                                                 | `string`                                                                 | `false`  | -                  |
| type                | 类型                                                                                                                                               | `'date'`\| `'week'` \|`'month'`\| `'quarter'` \|`'year'`\| `'daterange'` | `false`  | `'date'`           |
| readonly            | 不可在文本框编辑                                                                                                                                   | `boolean`                                                                | `false`  | `false`            |
| clearable           | 是否可以清空选项                                                                                                                                   | `boolean`                                                                | `false`  | `true`             |
| format              | 显示在输入框中的格式(week 不支持)                                                                                                                  | `string`                                                                 | `false`  | `'yyyy-MM-dd'`     |
| value-format        | 绑定值的格式 (week 不支持)                                                                                                                         | `string`                                                                 | `false`  | -                  |
| first-day-of-week   | 周几作为第一天                                                                                                                                     | `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`                            | `false`  | `0` (`0` 表示周日) |
| set-cell-class-name | 设置日期的 className, [返回值参考](https://vuejs.org/v2/guide/class-and-style.html)，日期/月/年面板, 参数为 Date 类型, 周 '2019w34', 季度 '2019q4' | `(current: Date` \| `string) => string`                                  | `false`  | -                  |
| set-cell-disabled   | 设置单个日期是否 disabled, 参数同上                                                                                                                | `(current: Date` \| `string) => boolean`                                 | `false`  | -                  |
| append-target       | 插入日期面板的容器元素                                                                                                                             | `Element`                                                                | `false`  | `document.body`    |

## Events

| Event Name        | Description               | Parameters                                                           |
| ----------------- | ------------------------- | -------------------------------------------------------------------- |
| change            | 选中值发生变化时触发      | `{ target: { value: Date \| Array \| string }, nativeEvent: Event }` |
| visibility-change | 日期下拉框出现/隐藏时触发 | `visibility: boolean`                                                |
| clear             | 用户点击清空按钮时触发    | -                                                                    |
| focus             | 获取焦点                  | -                                                                    |
| blur              | 失去焦点，并隐藏          | -                                                                    |
