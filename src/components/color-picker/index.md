---
title: ColorPicker
route: /component/color-picker
layout: component
---

# ColorPicker

简单取色器。如需更加复杂的取色器功能，建议使用 [vue-color](https://github.com/xiaokaike/vue-color)。

## 示例

```html
Mode: <c-radio-group :options="modes" v-model="mode"/>

<p>Color is: <b>{{color}}</b></p>

<c-color-picker :mode="mode" v-model="color" :inline="false"/>

<script>
  export default {
    data () {
      return {
        color: '#2f85da',
        mode: 'rgb',
        modes: [
          { value: 'rgb', label: 'rgb'},
          { value: 'hsl', label: 'hsl'},
          { value: 'hex', label: 'hex'}
        ]
      }
    },
    computed: {
      barStyle () {
        return {
          width: '30px',
          height: '30px',
          backgroundColor: this.color
        }
      }
    }
  }
</script>
```

## 示例 2

也可以使用行内形式。

```html
Mode: <c-radio-group :options="modes" v-model="mode"/>

<p>Color is: <b>{{color}}</b></p>

<c-color-picker :mode="mode" v-model="color" :inline="true" />

<script>
  export default {
    data () {
      return {
        color: '#2f85da',
        mode: 'rgb',
        modes: [
          { value: 'rgb', label: 'rgb'},
          { value: 'hsl', label: 'hsl'},
          { value: 'hex', label: 'hex'}
        ]
      }
    },
    computed: {
      barStyle () {
        return {
          width: '30px',
          height: '30px',
          backgroundColor: this.color
        }
      }
    }
  }
</script>
```

## API

### Attributes

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| mode | String | hex | 颜色模式：rgb, hsl, hex |
| inline | Boolean | false | 是否行内展示 |
| size | String | md | 'xs', 'sm', 'md', 'lg', 'xl' |

### Events

| 事件名 | 说明 | 参数 |
|-------|------|-------|
|change | - | 与 mode 对应的颜色字符串 |
