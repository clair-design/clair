---
title: Timepicker
route: /component/timepicker
layout: component
---

# Timepicker

选择或者输入时间

## 基本用法

```html
<c-timepicker
  v-model="time"
  @change="timeChange"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        time: '10:12:45',
      }
    },
    methods: {
      timeChange (time) {
        console.log('time changed')
      }
    }
  }
</script>
```

## 设置禁用

```html
<c-timepicker
  v-model="time"
  :readonly="readonly"
  :defaultValue="defaultTime"
  @change="timeChange"
></c-timepicker>
<c-timepicker
  v-model="time"
  :disabled="disabled"
  :defaultValue="defaultTime"
  @change="timeChange"
></c-timepicker>
<script>
  export default {
    data () {
      return {
        readonly: true,
        disabled: true,
        time: '10:12:45',
        defaultTime: '12:23:45'
      }
    },
    methods: {
      timeChange (time) {
        console.log('time changed')
      }
    }
  }
</script>
```

## 设置大小

```html
<c-timepicker
  v-model="time"
  :size="small"
  @change="timeChange"
></c-timepicker>
<c-timepicker
  v-model="time"
  @change="timeChange"
></c-timepicker>
<c-timepicker
  v-model="time"
  :size="big"
  @change="timeChange"
></c-timepicker>
<script>
  export default {
    data () {
      return {
        time: '',
        small: 'sm',
        big: 'lg'
      }
    },
    methods: {
      timeChange (time) {
        console.log('time changed')
      }
    }
  }
</script>
```

## 设置步长用法

```html
<c-timepicker
  v-model="time"
  :defaultValue="defaultTime"
  :secondStep="secondStep"
  :minuteStep="minuteStep"
  :hourStep="hourStep"
  @change="timeChange"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        hourStep: 2,
        minuteStep: 10,
        secondStep: 5,
        time: ''
      }
    },
    methods: {
      timeChange (time) {
        console.log('second time changed')
      }
    }
  }
</script>
```

## 选择时分

```html
<c-timepicker
  v-model="time"
  :format="format"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        time: '',
        format: 'HH:mm'
      }
    }
  }
</script>
```


## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| placeholder | String | 请输入时间 | 未进行选择时的提示 |
| disabled | Boolean | false | 时间框是否被禁用 |
| readonly | Boolean | false | 是否可以输入日期 |
| size | String | normal | 尺寸大小 |
| defaultValue | String |  | 默认显示的时间 |