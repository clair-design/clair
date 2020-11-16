---
group: Form 表单
---

# Slider 滑动输入条

## 基本样式

常见的输入条

```html
<template>
  <c-slider v-model="value1"></c-slider>
  <c-slider v-model="value1" :tipFormat="tipFormat"></c-slider>
  <c-slider v-model="value2" @change="handleChange"></c-slider>
</template>

<script>
  export default {
    data() {
      return {
        value1: 50,
        value2: [10, 50]
      }
    },
    methods: {
      tipFormat(value) {
        return `${value} %`
      },
      handleChange(value) {
        console.log(value)
      }
    }
  }
</script>
```

## 只读与禁用

```html
<template>
  <c-slider v-model="value" readonly></c-slider>
  <c-slider v-model="value" disabled></c-slider>
</template>

<script>
  export default {
    data() {
      return {
        value: 50
      }
    }
  }
</script>
```

## 固定刻度样式

只能滑动到固定的刻度点上

```html
<template>
  <c-slider
    v-model="value"
    :min="0"
    :max="1"
    :step="0.1"
    show-step-mark
  ></c-slider>
</template>

<script>
  export default {
    data() {
      return {
        value: 0.3
      }
    }
  }
</script>
```

## 带输入框样式

可直接输入数值，滑动输入条与数字输入框保持一致

```html
<template>
  <c-row gutter="24px" align="center">
    <c-col :span="8">
      <c-slider v-model="value" :min="0" :max="10" :step="1"></c-slider>
    </c-col>
    <c-col :span="4">
      <c-input-number
        v-model="value"
        control-position="up-down"
        :max="10"
        :min="0"
      />
    </c-col>
  </c-row>
</template>

<script>
  export default {
    data() {
      return {
        value: 3
      }
    }
  }
</script>
```

## 垂直样式

垂直方向的滑动输入条

```html
<template>
  <c-row style="height: 300px;">
    <c-col :span="3" justify="space-around">
      <c-slider
        v-model="value1"
        :min="-40"
        :max="40"
        :step="5"
        mode="vertical"
        :tipFormat="value => `${value} ℃`"
      ></c-slider>
    </c-col>
    <c-col :span="3">
      <c-slider
        v-model="value2"
        :min="-40"
        :max="40"
        :step="5"
        mode="vertical"
        show-step-mark
        :tipFormat="value => `${value} ℃`"
      ></c-slider>
    </c-col>
    <c-col :span="3" justify="space-around">
      <c-slider
        v-model="value3"
        :min="-40"
        :max="40"
        :step="5"
        mode="vertical"
        :tipFormat="value => `${value} ℃`"
      ></c-slider>
    </c-col>
    <c-col :span="3">
      <c-slider
        v-model="value4"
        :min="-40"
        :max="40"
        :step="5"
        mode="vertical"
        show-step-mark
        :tipFormat="value => `${value} ℃`"
      ></c-slider>
    </c-col>
  </c-row>
</template>

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 0,
        value3: [-10, 10],
        value4: [-10, 10]
      }
    }
  }
</script>
```

### Slider Props

| Name            | Description                    | Type                             | Required | Default              |
| --------------- | ------------------------------ | -------------------------------- | -------- | -------------------- |
|  mode           |   排版模式                     |  `'horizontal'` \| `'vertical'`  | `false`  |  `horizontal`        |
|  step           |   步长                         |  `number`                        | `false`  |  `1`                 |
| show-step-mark  |   是否显示步进标记             |  `boolean`                       | `false`  |  `false`             |
|  value          |   绑定值（可使用  `v-model`）  |  `number` \| `number[]`          | `false`  | -                    |
|  min            |   最小值                       |  `number`                        | `false`  |  `1`                 |
|  max            |   最大值                       |  `number`                        | `false`  |  `100`               |
|  readonly       |   是否只读                     |  `boolean`                       | `false`  |  `false`             |
|  disabled       |   是否禁用                     |  `boolean`                       | `false`  |  `false`             |
| tipFormat       | Slider tip 格式化函数          |  `Function`                      | `false`  |  `(value) => value`  |

### Slider Events

| Name     | Description              | Parameters                                     |
| -------- | ------------------------ | ---------------------------------------------- |
|  change  |   绑定值发生变化时触发   |  `{ target: { value: number` \| `number[] }}`  |
