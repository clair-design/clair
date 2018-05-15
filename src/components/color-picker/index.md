---
title: ColorPicker
route: /component/color-picker
layout: component
---

# ColorPicker

简单取色器。如需更加复杂的取色器功能，建议使用 [vue-color](https://github.com/xiaokaike/vue-color)。

## 示例

```html
<c-portal>
  <c-color-picker
    initial="rgba(225, 21, 22, 0.41)"
    mode="rgba"
    @change="onChange"
  />
</c-portal>
<div :style="barStyle"></div>

<script>
  export default {
    data () {
      return {
        color: 'rgba(225, 21, 22, 0.41)'
      }
    },
    computed: {
      barStyle () {
        return {
          width: '80px',
          height: '30px',
          backgroundColor: this.color
        }
      }
    },
    methods: {
      onChange(color) {
        this.color = color
      }
    }
  }
</script>
```

## API

### Attributes

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| initial | String | #ff0000 | 初始颜色值 |
| mode | String | rgba | 颜色模式：rgb, rgba, hsl, hsla, hex |

**重要说明：`mode` 一定要区分清楚是否带有 `a` 成分。如 `rgb` 和 `rgba` 是不同的。如果传入的初始颜色值经过转换之后得到的 alpha 值小于 1 而 `mode` 为 `rgb`，则会报错（反之不会）。**

### Events

| 事件名 | 说明 | 参数 |
|-------|------|-------|
|change | - | 与 mode 对应的颜色字符串 |
