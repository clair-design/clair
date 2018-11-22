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
  :minTime="minTime"
  @change="timeChange"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        minTime: '20:40:03',
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

## 时间范围

```html
<c-timepicker
  v-model="time"
  :timeType="type"
  :readonly="readonly"
  :disabled="disabled"
  :format="format"
  @change="timeChange"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        small: 'sm',
        big: 'lg',
        type: 'timerange',
        readonly: false,
        disabled: false,
        format: 'HH:mm',
        time: ['10:12', '12:32'],
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

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| timeType | String | timepicker | 时间选择timepicker， 时间范围timerange |
| placeholder | String | 请输入时间 | 时间选择默认提示 |
| disabled | Boolean | false | 时间框是否被禁用 |
| readonly | Boolean | false | 是否可以输入日期 |
| minTime | String |  | 设置最小时间 |
| maxTime | String |  | 设置最大时间 |
| size | String |  | 尺寸大小，可以设置为sm, lg|
| defaultValue | String |  | 默认显示的时间，针对时间选择设置 |
| hourStep | Number | 1 | 小时的间隔步长 |
| minuteStep | Number | 1 | 分钟的间隔步长 |
| secondStep | Number | 1 | 秒的间隔步长 |