---
group: Basic 基础
---

# InputNumber 计数器

## 定义

允许输入标准的数字值，可定义范围

## 使用场景

- 通过预配置的数值区间内逐级进行数值变更
- 数值可直接输入，也可在数值区间内逐级变更

## 基础样式

```html
<c-input-number v-model="iptnumber" />
<script>
  export default {
    data() {
      return { iptnumber: 1 }
    }
  }
</script>
```

## 禁用样式

```html
<c-input-number v-model="iptnumber" :disabled="true" />
<c-input-number
  v-model="iptnumber"
  :disabled="true"
  control-position="up-down"
/>
<script>
  export default {
    data() {
      return { iptnumber: 1 }
    }
  }
</script>
<style scoped>
  .c-input-number + .c-input-number {
    margin-left: 20px;
  }
</style>
```

## 精度控制

用来控制数值精度

```html
<c-input-number v-model="iptnumber" :step="0.05" :precision="3" />
<script>
  export default {
    data() {
      return { iptnumber: 1 }
    }
  }
</script>
```

## 步长

计数器变更的步数

```html
<c-input-number v-model="iptnumber" :step="5" />
<script>
  export default {
    data() {
      return { iptnumber: 5 }
    }
  }
</script>
```

## 固定步数

仅允许步长倍数的变化

> 如何判定值的变化是否符合「步长倍数」，参考 [这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#attr-step)

```html
<c-input-number v-model="iptnumber" :step-fixed="true" :step="5" />
<script>
  export default {
    data() {
      return { iptnumber: 1 }
    }
  }
</script>
```

## 值区间

可设置最大值最小值

```html
<c-input-number v-model="iptnumber" :max="20" :min="0" />
<script>
  export default {
    data() {
      return { iptnumber: -1 }
    }
  }
</script>
```

## 按钮样式

按钮在右边的样式

```html
<c-input-number
  v-model="iptnumber"
  control-position="up-down"
  :max="5"
  :min="1"
/>
<script>
  export default {
    data() {
      return { iptnumber: 1 }
    }
  }
</script>
```

## 尺寸

分大中小三种尺寸可选

```html
<c-input-number v-model="iptnumber1" size="large" />
<c-input-number v-model="iptnumber2" size="normal" />
<c-input-number v-model="iptnumber3" size="small" />
<br />
<br />
<c-input-number v-model="iptnumber4" size="large" control-position="up-down" />
<c-input-number v-model="iptnumber5" size="normal" control-position="up-down" />
<c-input-number v-model="iptnumber6" size="small" control-position="up-down" />
<script>
  export default {
    data() {
      return {
        iptnumber1: 1,
        iptnumber2: 1,
        iptnumber3: 1,
        iptnumber4: 1,
        iptnumber5: 1,
        iptnumber6: 1
      }
    }
  }
</script>
<style scoped>
  .c-input-number + .c-input-number {
    margin-left: 20px;
  }
</style>
```

## Props

| Name             | Description                                                                                                                                                   | Type                                 | Required | Default        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- | -------------- |
| value/v-model    | 绑定值                                                                                                                                                        | `number`                             | `true`   | `0`            |
| min              | 计数器的最小值                                                                                                                                                | `number`                             | `false`  | `-Infinity`    |
| max              | 计数器的最大值                                                                                                                                                | `number`                             | `false`  | `Infinity`     |
| step             | 计数器变更的步长                                                                                                                                              | `number`                             | `false`  | `1`            |
| step-fixed       | 是否仅允许步长倍数的变化，如何判定值的变化是否符合「步长倍数」，参考 [这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#attr-step) | `boolean`                            | `false`  | `false`        |
| precision        | 数值精度                                                                                                                                                      | `number`                             | `false`  | -              |
| disabled         | 是否禁用计数器                                                                                                                                                | `boolean`                            | `false`  | `false`        |
| size             | 尺寸大小                                                                                                                                                      | `'large'` \| `'normal'` \| `'small'` | `false`  | `'normal'`     |
| control-position | 按钮位置(左右/上下)                                                                                                                                           | `'left-right'` \| `'up-down'`        | `false`  | `'left-right'` |

## Events

| Name   | Description          | Parameter                                              |
| ------ | -------------------- | ------------------------------------------------------ |
| change | 输入值改变时触发     | `{ target: { value: number } }`                        |
| focus  | input 获取焦点时触发 | `{ target: { value: number }, nativeEvent: Event; } }` |
| blur   | input 失去焦点时触发 | `{ target: { value: number }, nativeEvent: Event; } }` |
