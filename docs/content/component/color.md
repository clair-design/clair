---
title: 颜色
layout: component
scrollTop: true
route: component/color
---

# 颜色

色彩，在界面设计中的使用应同时具备品牌识别性以及界面设计功能性，任何颜色的选取和使用应该是有意义的。尽管同一种颜色传达的含义会受到文化和地域的影响。

为了避免视觉传达差异，统一使用一套特定的调色板来规定颜色，定义不同基色并衍生出九宫格色板，再配以黑白叠加的方式实现色彩明暗的效果，可为产品提供一致的外观视觉感受。

## 色板

```html
<c-box class="no-gap">
  <c-box-item v-for="color in colors" xs="4" sm="2" lg="flex">
    <h3 class="is-text-align-center">{{ color }}</h3>
    <div
      class="color-block"
      v-for="i in 12"
      :class="className(color, i)"
    >
      {{ color + '-' + i }}
    </div>
  </c-box-item>
</c-box>
<script>
export default {
  data () {
    return {
      colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray']
    }
  },
  methods: {
    className (color, i) {
      return [`is-bg-${color}-${i}`]
    }
  }
}
</script>

<style>
.color-block {
  flex-basis: 10em;
  font-size: 0.8em;
  white-space: nowrap;
  padding: 1em 0.5em;
}
</style>
```

## 颜色使用

Clair 提供了一些 CSS 类，让你可以将这些颜色使用在背景色或文字颜色中。

### 背景颜色

可以给一个元素加上 CSS 类 `is-bg-red-7` 使其背景色为上面色板中的 `red-7` 号颜色。文字的颜色会根据背景色的深浅自动调整为黑色或白色，除非你自己设置了其它的文字颜色。例如：

<div class="c-box">
  <div class="c-box__item is-offset-1 is-bg-red-4">.is-bg-red-4</div>
  <div class="c-box__item is-bg-pink-4">.is-bg-pink-4</div>
</div>

### 文字颜色

给一段文字加 CSS 类 `is-text-blue-8` 会让这段文字显示为上面色板中的 `blue-8` 号颜色。

<p class="is-text-blue-8">这是一 blue-8 号颜色显示的文字</p>


