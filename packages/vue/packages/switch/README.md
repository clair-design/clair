---
group: Form 表单
---

# Switch 开关

## 定义

开关选择器。

## 使用场景

需要表示开关状态/两种状态之间的切换时使用，切换 switch 会直接触发状态的改变。

## 基础样式

单独使用，表示两种状态之间的切换

```html
<template>
  <c-switch v-model="isCheckedBase" />
  <br />
  <c-switch v-model="isCheckedSlot">
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
</template>

<script>
  export default {
    data() {
      return {
        isCheckedBase: true,
        isCheckedSlot: true
      }
    }
  }
</script>
```

## 禁用样式

添加 disabled 属性禁用状态的切换

```html
<template>
  <c-switch v-model="isCheckedBase">
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
  <br />
  <c-switch v-model="isCheckedDisabled" disabled>
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
</template>

<script>
  export default {
    data() {
      return {
        isCheckedBase: true,
        isCheckedDisabled: true
      }
    }
  }
</script>
```

## 尺寸样式

size 属性控制开关的尺寸，可选值：'normal' | 'small' ，默认为 'normal'

```html
<template>
  <c-switch v-model="isCheckedBase">
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
  <br />
  <c-switch v-model="isCheckedSize" size="small">
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
</template>

<script>
  export default {
    data() {
      return {
        isCheckedBase: true,
        isCheckedSize: true
      }
    }
  }
</script>
```

## 自定义背景色

- checkedColor 定义开关 on 状态的背景色
- unCheckedColor 定义开关 off 状态的背景色

```html
<template>
  <c-switch v-model="isCheckedBase">
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
  <br />
  <c-switch
    v-model="isCheckedColor"
    checkedColor="#30C89B"
    unCheckedColor="#FFC473"
  >
    <template v-slot:checked>
      on
    </template>
    <template v-slot:unChecked>
      off
    </template>
  </c-switch>
</template>

<script>
  export default {
    data() {
      return {
        isCheckedBase: true,
        isCheckedColor: true
      }
    }
  }
</script>
```

## 状态切换事件触发

```html
<template>
  <c-switch v-model="isChecked" @change="handleChange" />
</template>

<script>
  export default {
    data() {
      return {
        isChecked: true
      }
    },
    methods: {
      handleChange(e) {
        const {
          target: { value: checked }
        } = e
        const message = `I'll be ${checked ? 'checked' : 'unChecked'}!`
        alert(message)
      }
    }
  }
</script>
```

## Switch props

| Name             | Description       | Type                    | Required | Default    |
| ---------------- | ----------------- | ----------------------- | -------- | ---------- |
| disabled         | 是否禁用          | `boolean`               | `false`  | `false`    |
| size             | 开关尺寸          | `'normal'` \| `'small'` | `false`  | `'normal'` |
| checked-color    | 状态 on 时背景色  | `string`                | `false`  | -          |
| un-checked-color | 状态 off 时背景色 | `string`                | `false`  | -          |

## Switch slots

| Name      | Description           | Required | Default |
| --------- | --------------------- | -------- | ------- |
| checked   | 状态 on 时显示的内容  | `false`  | -       |
| unChecked | 状态 off 时显示的内容 | `false`  | -       |

## Switch events

| Name   | Description          | Parameters                                           |
| ------ | -------------------- | ---------------------------------------------------- |
| change | 状态改变时的回调函数 | `{ target: { value: checked }, nativeEvent: Event }` |
