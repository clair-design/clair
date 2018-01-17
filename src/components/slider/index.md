---
title: Slider
layout: component
route: /component/slider
---

# Slider

## 基本用法

使用 `<c-slider />` 标签即可。拖拽移动时即会触发 `change` 事件。

<!-- TODO: 是否有必要区分`input` 与 `change`？ -->

<style>
.c-slider {
  margin: 2em 1em 3em;
}
</style>

```html
<c-slider @change="onChange" :value="33"/>

<script>
  export default {
    methods: {
      onChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

## 双向数据绑定

可以通过 `v-model` 属性进行双向绑定。

```html
<c-slider v-model="value" />
<c-input v-model="value" />
<script>
  export default {
    data () {
      return {
        value: 22
      }
    }
  }
</script>
```

## 自定义取值范围、步长

可以自定义 `min` `max` `step` 等。默认情况下，取值范围是 0 ~ 100，步长为 1。

```html
<c-slider
  v-model="value"
  :min="-10"
  :max="10"
  :step="0.2"
/>

<script>
  export default {
    data () {
      return {
        value: 5
      }
    },
    mounted () {
      setTimeout(() => {
        this.value = -5
      }, 300)
    }
  }
</script>
```

## 设置刻度

可以通过 `marks` 属性指定一个数组，其中每个值对应着一个刻度点。

```html
<c-slider
  v-model="value"
  :min="1"
  :max="5"
  :step="1"
  :marks="marks"
  style="max-width: 500px;"
/>

<script>
  export default {
    data () {
      return {
        value: 3,
        marks: [1, 2, 3, 4, 5]
      }
    }
  }
</script>
```

通过传入一个 `formmater` 函数，还可以设置 tooltip 和刻度值的单位；

```html
<c-slider
  v-model="value"
  :min="1"
  :max="5"
  :step="1"
  :marks="marks"
  :formmater="formmater"
  style="max-width: 500px;"
/>

<script>
  export default {
    data () {
      return {
        value: 3,
        marks: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      // type: 'scale' OR 'tip'
      formmater (num, type) {
        console.log(type)
        return type === 'tip' ? `温度：${num}°C` : `${num}°C`
      }
    }
  }
</script>
```

## 禁用状态

```html
<c-slider
  v-model="value"
  :min="50"
  :max="200"
  :step="5"
  :marks="marks"
  :formmater="formmater"
  disabled
/>

<script>
  export default {
    data () {
      return {
        value: 50,
        marks: [20, 80, 120, 160, 160, 180, 200]
      }
    },
    mounted () {
      setTimeout(() => {
        this.value = 100
      }, 300)
    },
    methods: {
      formmater (num) {
        return num + '%'
      }
    }
  }
</script>
```

## 垂直方向

使用　`vertical` 属性即可使用垂直方向模式，请注意务必设置 `height` 属性。

```html
<c-slider
  v-model="value"
  :min="-10"
  :max="40"
  :step="1"
  :marks="marks"
  :formmater="formmater"
  vertical
  height="300px"
/>

<script>
  export default {
    data () {
      return {
        value: 5,
        marks: [-10, 0, 10, 20, 30, 40]
      }
    },
    methods: {
      formmater (num) {
        return `${num}°C`
      }
    }
  }
</script>
```

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| value | Number | 无，必填 | 可使用 `v-model` |
| min | Number |  0 | 取值下限 |
| max | Number |  0 | 取值上限 |
| step | Number |  0 | 步长 |
| marks | Number[] | 无 | 需要标注刻度的位置的数组 |
| formmater | Function | `num => num` | 设置刻度和 tooltip 的格式 |
| disabled | Boolean | false | 是否禁用 |
| vertical | Boolean | false | 垂直模式 |
| height | String | 无 | 垂直模式下必须设置高度 |

### 事件

|事件名| 参数 | 说明 |
|------|-------|-------|
| change | e | 数值 |
