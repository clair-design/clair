---
group: Form 表单
---

# TimePicker 时间选择

## 定义

选择或者输入时间

## 使用场景

选择或者输入时间

## 基础样式

```html
<c-timePicker v-model="time" @change="timeChange" />
<script>
  export default {
    data() {
      return {
        time: ''
      }
    },
    methods: {
      timeChange(time) {
        console.log(time)
      }
    }
  }
</script>
```

## 设置步长

```html
<c-timePicker v-model="time" :hourStep="2" @change="timeChange" />
<script>
  export default {
    data() {
      return {
        time: '06:23:54'
      }
    },
    methods: {
      timeChange(time) {
        console.log(time)
      }
    }
  }
</script>
```

## 不同尺寸

```html
<p>
  <c-timePicker v-model="time" size="small" />
</p>
<p>
  <c-timePicker v-model="time" size="normal" />
</p>
<p>
  <c-timePicker v-model="time" size="large" />
</p>
<script>
  export default {
    data() {
      return {
        time: '12:23:54'
      }
    }
  }
</script>
```

## 设置最大，最小时间

```html
<c-timePicker
  v-model="time"
  minTime="06:10:10"
  maxTime="20:40:30"
  @change="timeChange"
/>
<script>
  export default {
    data() {
      return {
        time: '10:23:54'
      }
    },
    methods: {
      timeChange(time) {
        console.log(time)
      }
    }
  }
</script>
```

## 设置时分

```html
<c-timePicker format="hh:mm" @change="timeChange" />
<script>
  export default {
    methods: {
      timeChange(time) {
        console.log(time)
      }
    }
  }
</script>
```

## 禁用样式

```html
<c-timePicker :disabled="true" value="06:23:54" />
```

## 时间范围

```html
<c-timePicker :isRange="true" v-model="defaultValue" @change="timeChange" />
<p>
  <c-button @click="updateTime">修改时间为 12:34:56 - 21:23:45</c-button>
</p>
<script>
  export default {
    data() {
      return {
        defaultValue: ['12:21:11', '14:21:34']
      }
    },
    methods: {
      updateTime() {
        this.defaultValue = ['12:34:56', '21:23:45']
      },
      timeChange(value) {
        console.log(value)
      }
    }
  }
</script>
```

## 不同尺寸

```html
<p>
  <c-timePicker :isRange="true" size="small" />
</p>
<p>
  <c-timePicker :isRange="true" size="normal" />
</p>
<c-timePicker :isRange="true" size="large" />
```

## 禁用样式

```html
<c-timePicker
  :isRange="true"
  :disabled="true"
  @change="timeChange"
  v-model="time"
/>
<script>
  export default {
    data() {
      return {
        time: ['12:12:12', '23:14:45']
      }
    },
    methods: {
      timeChange(time) {
        console.log(time)
      }
    }
  }
</script>
```

## Props

| Name              | Description                                   | Type                                 | Required | Default        |
| ----------------- | --------------------------------------------- | ------------------------------------ | -------- | -------------- |
| id                | id                                            | `string`                             | `false`  | -              |
| name              | name                                          | `string`                             | `false`  | -              |
| value / v-model   | 绑定值                                        | `string`                             | -        | -              |
| format            | 绑定值格式                                    | `string`                             | -        | -              |
| size              | 尺寸                                          | `'large'` \| `'normal'` \| `'small'` | `false`  | `'normal'`     |
| placeholder       | 非范围选择时占位文本                          | `string`                             | `false`  | `'请输入时间'` |
| start-placeholder | 范围选择时开始日期的占位内容                  | `string`                             | `false`  | `'开始时间'`   |
| end-placeholder   | 范围选择时结束日期的占位内容                  | `string`                             | `false`  | `'结束时间'`   |
| disabled          | 是否禁用                                      | `boolean`                            | `false`  | `false`        |
| is-range          | 是否为时间范围选择，仅对`<c-time-picker>`有效 | `boolean`                            | `false`  | `false`        |
| min-time          | 最小时间                                      | `string`                             | `false`  | -              |
| max-time          | 最大时间                                      | `string`                             | `false`  | -              |
| hour-step         | 小时步长                                      | `number`                             | `false`  | -              |
| minute-step       | 分钟步长                                      | `number`                             | `false`  | -              |
| second-step       | 秒步长                                        | `number`                             | `false`  | -              |

## Events

| Event Name | Description         | Parameters                      |
| ---------- | ------------------- | ------------------------------- |
| change     | time 发生变化时触发 | `{ target: { value: string } }` |
