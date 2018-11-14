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
  :disabled="disabled"
  :defaultValue="defaultTime"
  @change="timeChange"
></c-timepicker>

<script>
  export default {
    data () {
      return {
        disabled: false,
        time: '',
        defaultTime: '12:23:45'
      }
    },
    methods: {
      timeChange (time) {
        this.time = time
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
| placeholder | String | 请选择时间 | 未进行选择时的提示 |
| disabled | Boolean | false | 时间框是否被禁用 |
| format | String | hh:mm:ss | 时间格式，如果使用12小时制，可设置'hh:mm:ss a' |
| size | String |  | 尺寸大小 |
| defaultValue | moment |  | 默认显示的时间 |