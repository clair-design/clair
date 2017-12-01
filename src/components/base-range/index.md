---
title: Ctrl
layout: component
scrollTop: true
route: component/base-range
---

# Base Range

抽象的范围滚动组件。

## 横向

注意取值范围为 `[0, 1]`。

```html
<template>
  <c-base-range direction="h" :throttle="80" @change="onChange" class="h-slider">
    <div class="track"></div>
    <div slot="thumb" class="thumb" :style="{ left: percentage }"></div>
    <div class="progress" :style="{ width: percentage }"></div>
  </c-base-range>
  <div>输入值为：{{value.toPrecision(3)}}</div>
</template>

<script>
  const num2percentage = (n, precision = 3) => {
  // eslint-disable-next-line
    const num = (n * 100).toPrecision(precision | 0)
    return `${num}%`
  }

  export default {
    data () {
      return {
        value: 0.2
      }
    },
    computed: {
      percentage () {
        return num2percentage(this.value)
      }
    },
    methods: {
      onChange (e) {
        this.value = e
      }
    }
  }
</script>

<style>
  .h-slider {
    max-width: 500px;
    height: 10px;
    margin-bottom: 20px;
    background: #e6edf2;
    border-radius: 8px;
    cursor: pointer;
  }
  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    border-radius: 50%;
    margin-top: -5px;
    transform: translateX(-50%);
    background-color: #fff;
    box-shadow: 0 0 10px -2px #aaa;
  }
  .thumb::after,
  .thumb::before {
    content: ' ';
    position: absolute;
    left: 8px;
    top: 6px;
    height: 8px;
    border-left: 1px solid #2196f3;
  }
  .thumb::before {
    left: 11px;
  }

  .progress {
    width: 0;
    height: 10px;
    border-radius: 8px;
    background: #2196f3;
  }
</style>
```

## 纵向

需要注意 Y 轴正方向为从上到下。遇到 Y 轴正方向向上的情况，需要自己变换。

```html
<template>
  <c-base-range direction="v" :throttle="80" @change="onChange" class="v-slider">
    <div class="track"></div>
    <div slot="thumb" class="thumb" :style="{ bottom: percentage }"></div>
    <div class="progress" :style="{ height: percentage }"></div>
  </c-base-range>
  <div>三位有效数字：{{percentage}}</div>
</template>

<script>
  const num2percentage = (n, precision = 3) => {
    // eslint-disable-next-line
    const num = (n * 100).toPrecision(precision | 0)
    return `${num}%`
  }

  export default {
    data () {
      return {
        value: 1 - 0.2
      }
    },
    computed: {
      percentage () {
        return num2percentage(1 - this.value)
      }
    },
    methods: {
      onChange (e) {
        this.value = e
      }
    }
  }
</script>

<style>
  .v-slider {
    width: 10px;
    height: 300px;
    margin-bottom: 20px;
    background: #e6edf2;
    border-radius: 8px;
    cursor: pointer;
  }
  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: -5px;
    transform: translateY(50%);
    background-color: #fff;
    box-shadow: 0 0 10px -2px #aaa;
  }
  .thumb::after,
  .thumb::before {
    content: ' ';
    position: absolute;
    left: 8px;
    top: 6px;
    height: 8px;
    border-left: 1px solid #2196f3;
  }
  .thumb::before {
    left: 11px;
  }

  .progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: #2196f3;
  }
</style>
```


## 双向

```html
<template>
  <c-base-range direction="vh" :throttle="80" @change="onChange" class="h-slider">
    <div slot="thumb" class="thumb" :style="thumbPos"></div>
    <div class="cordinate" :style="thumbPos">{{cordinate}}</div>
  </c-base-range>
</template>

<script>
  const num2percentage = (n, precision = 3) => {
  // eslint-disable-next-line
    const num = (n * 100).toPrecision(precision | 0)
    return `${num}%`
  }

  export default {
    data () {
      return {
        value: { x: 0.52, y: 0.52 }
      }
    },
    computed: {
      thumbPos () {
        return {
          left: num2percentage(this.value.x),
          top: num2percentage(this.value.y)
        }
      },
      cordinate () {
        const { value } = this
        const x = value.x.toFixed(2)
        const y = value.y.toFixed(2)
        return `(${x}, ${y})`
      }
    },
    methods: {
      onChange (e) {
        this.value = e
      }
    }
  }
</script>

<style>
  .h-slider {
    width: 300px;
    height: 300px;
    margin: 20px;
    background: #e6edf2;
    cursor: pointer;
  }

  .thumb {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 0;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 0 10px -2px #aaa;
  }

  .cordinate {
    position: absolute;
    width: 100px;
  }
</style>
```

下面使用我们的基础组件实现的 Color picker：

```html
<div class="color-picker">
  <c-base-range @change="onChange" direction="vh" :throttle="80" class="color-picker__saturation">
    <div class="saturation-mask__hue" :style="saturationPanelStyle"></div>
    <div class="saturation-mask__white"></div>
    <div class="saturation-mask__black"></div>
    <div slot="thumb" class="color-picker__thumb" :style="saturationThumbStyle"></div>
  </c-base-range>

  <div class="color-picker__ctrl-pane">
    <div class="flex-row">
      <div class="flex-item__w32">
        <div class="color-picker__previewer">
          <div class="color-picker__previewer__inner" :style="previewStyle"></div>
        </div>
      </div>

      <div class="flex-item__autofill">
        <c-base-range v-model="hue" direction="h" :throttle="80" class="color-picker__ctrl-bar controller-bar__hue">
          <div slot="thumb" class="color-picker__thumb" :style="hueThumbStyle"></div>
        </c-base-range>

        <c-base-range v-model="alpha" direction="h" :throttle="80" class="color-picker__ctrl-bar controller-bar__alpha" @change="onAlphaChange">
          <div slot="thumb" class="color-picker__thumb" :style="alphaThumbStyle"></div>
          <div class="color-picker__ctrl-bar" :style="alphaTrackStyle"></div>
        </c-base-range>
      </div>
    </div>
  </div>
</div>

<script>
  const num2percentage = (n, precision = 3) => {
  // eslint-disable-next-line
    const num = (n * 100).toPrecision(precision | 0)
    return `${num}%`
  }

  export default {
    data () {
      return {
        hue: 1,
        alpha: 1,
        saturation: { x: 1, y: 0 }
      }
    },

    computed: {
      hsva () {
        const { hue, alpha, saturation: { x, y }  } = this
        return [
          hue * 360,
          x * 100,
          (1 - y) * 100,
          alpha
        ]
      },
      hsla () {
        const { alpha, hsva } = this
        const [h, s, l] = hsv2hsl(hsva)
        return [
          h,
          num2percentage(s / 100),
          num2percentage(l / 100),
          alpha
        ]
      },
      rgba () {
        const { alpha, hsva } = this
        return hsv2rgb(hsva).concat(alpha)
      },
      hex () {
        return rgb2hex(this.rgba.slice(0, 3))
      },

      saturationThumbStyle () {
        const { saturation: { x, y }  } = this
        return {
          left: num2percentage(this.saturation.x),
          top: num2percentage(this.saturation.y)
        }
      },
      hueThumbStyle () {
        return {
          left: num2percentage(this.hue)
        }
      },
      alphaThumbStyle () {
        return {
          left: num2percentage(this.alpha)
        }
      },
      saturationPanelStyle () {
        return {
          backgroundColor: `hsl(${this.hue * 360}, 100%, 50%)`
        }
      },
      alphaTrackStyle () {
        const [h, s, l, a] = this.hsla
        const hsl = [h, s, l].join(', ')
        return {
          background: `linear-gradient(`
            + `to right, hsla(${hsl}, 0) 0%, hsl(${hsl}) 100%)`
        }
      },
      previewStyle () {
        return {
          backgroundColor: `hsla(${this.hsla.join(', ')})`
        }
      }
    },

    methods: {
      onChange (e) {
        this.saturation = e
      }
    }
  }

  // https://unpkg.com/pure-color@1.3.0/convert/hsv2hsl.js
  function hsv2hsl(hsv) {
    var h = hsv[0],
        s = hsv[1] / 100,
        v = hsv[2] / 100,
        sl, l;

    l = (2 - s) * v;
    sl = s * v;
    sl /= (l <= 1) ? l : 2 - l;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  }

  // https://unpkg.com/pure-color@1.3.0/convert/hsv2rgb.js
  function hsv2rgb(hsv) {
    var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

    var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  }


  function rgb2hex(rgb) {
    var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]) + alpha;
  }

  function componentToHex(c) {
    var value = Math.round(clamp(c, 0, 255));
    var hex = value.toString(16);

    return hex.length == 1 ? "0" + hex : hex;
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
</script>

<style>
  .flex-row {
    display: flex;
    align-items: center;
  }
  .flex-item__autofill {
    flex: 1 0 0;
  }
  .flex-item__w32 {
    width: 32px;
  }

  .color-picker {
    width: 250px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
    font-family: Menlo,Microsoft Yahei,sans-serif;
    user-select: none;
    margin-bottom: 20px;
  }

  .color-picker__thumb {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 0;
    border-radius: 50%;
    margin-top: -1px;
    transform: translateX(-50%);
    background-color: #f8f8f8;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.368627);
    cursor: default;
  }

  .color-picker__saturation {
    position: relative;
    width: 100%;
    padding-bottom: 55%;
    border-radius: 2px 2px 0 0;
    overflow: hidden;
  }
  .saturation-mask__hue,
  .saturation-mask__white,
  .saturation-mask__black {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .saturation-mask__white {
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
  }
  .saturation-mask__black {
    background: linear-gradient(0deg,#000,transparent);
  }

  .color-picker__saturation > .color-picker__thumb {
    background-color: transparent;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
  }

  .color-picker__ctrl-bar {
    height: 10px;
  }

  .color-picker__ctrl-bar + .color-picker__ctrl-bar {
    margin-top: 8px;
  }

  .controller-bar__hue {
    background: linear-gradient(90deg, red, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
  }
  .controller-bar__alpha {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) left center;
  }

  .color-picker__ctrl-pane {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 16px 12px;
  }

  .color-picker__previewer {
    position: relative;
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 50%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) 0 0
  }
  .color-picker__previewer__inner {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
</style>
```

## Transformation

```html
<template>
  <c-base-range direction="h" @change="onChange" class="h-slider">
    <div class="track"></div>
    <div slot="thumb" class="thumb" :style="{ left: percentage }"></div>
    <div class="progress" :style="{ width: percentage }"></div>
  </c-base-range>
  <div>输入值为：{{output}}</div>
</template>

<script>
  export default {
    data () {
      // maybe from props at which we can observe...
      const propVal = 12

      // from configs perhaps...
      const min = 10
      const max = 14
      const step = 0.02

      // val => [0, 1]
      const normalize = val => {
        return (val - min) / Math.abs(max - min)
      }

      // [0, 1] => [10, 14]
      const denormalize = val => {
        return min + Math.round(Math.abs(max - min) * val / step) * step
      }

      return {
        value: normalize(propVal),
        denormalize,
        normalize
      }
    },

    computed: {
      output () {
        return this.denormalize(this.value)
      },
      percentage () {
        const value = this.normalize(this.output)
        this.value = value
        return `${value * 100}%`
      }
    },

    methods: {
      onChange (e) {
        this.value = e
      }
    }
  }
</script>

<style>
  .h-slider {
    max-width: 500px;
    height: 10px;
    margin-bottom: 20px;
    background: #e6edf2;
    border-radius: 8px;
    cursor: pointer;
  }
  .thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    border-radius: 50%;
    margin-top: -5px;
    transform: translateX(-50%);
    background-color: #fff;
    box-shadow: 0 0 10px -2px #aaa;
  }
  .thumb::after,
  .thumb::before {
    content: ' ';
    position: absolute;
    left: 8px;
    top: 6px;
    height: 8px;
    border-left: 1px solid #2196f3;
  }
  .thumb::before {
    left: 11px;
  }

  .progress {
    width: 0;
    height: 10px;
    border-radius: 8px;
    background: #2196f3;
  }
</style>
```


## API

### Attributes

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| direction | String | h | h/v/vh 三个之一|
| throttle | Number | 80 | mousemove 事件节流的默认时间 |

### Events

| 事件名 | 说明 | 参数 |
|-------|------|-------|
|change | mouse: down -> move -> up | 单一方向时候为数字，否则为 { x, y } |
