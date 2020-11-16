---
group: Basic 基础
---

# Icon 图标

## 定义

图标能在视觉上简洁有效的指引用户操作。请根据图标不同的用法，选择合适的图标。

## 业务类图标

业务快捷操作类图标，用在业务释义的快捷方式上，搭配操作使用。设计风格：线性，安全区域为 `64*64px`，`2px` 粗细。

```html
<template demo-only>
  <div class="icon-demo1">
    <img
      src="https://p2.ssl.qhimg.com/t017a371a11badce61a.png"
      alt="print icon"
    />
    <img
      src="https://p1.ssl.qhimg.com/t0180044b8f6465bc05.png"
      alt="print icon 2"
    />
  </div>
</template>

<style scoped>
  .icon-demo1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 2.5em;
  }
  .icon-demo1 img {
    width: 430px;
    height: 128px;
    margin: 1em;
  }
</style>
```

## 工具功能类图标

功能图标用在工具栏或者操作栏上。 设计风格：线性，安全区域为 `16*16px`，绘制区域 `14*14px`，`1.5px` 粗细。

<p style="text-align: center; margin: 4em 0;">
  <img width="430" src="https://p2.ssl.qhimg.com/t01ac3b21bb8231435f.png" alt="tool">
</p>

## 表单图标

在表单内部使用，默认为 `70%` 透明度，禁用为 `40%` 透明度，鼠标移入为变色且透明度为 `100%`。 设计风格：线性，安全区域为 `14*14px`，`1px` 粗细。

<p style="text-align: center; margin: 4em 0;">
  <img width="430" src="https://p0.ssl.qhimg.com/t01fa2a03a1b86f86fd.png" alt="delete">
</p>

## 线性图标设计规范

在网格中，保持不同图表视觉上的均衡与规范。

```html
<template demo-only>
  <div class="icon-demo2">
    <img
      src="https://p2.ssl.qhimg.com/t01d6f78110bef8a7e5.png"
      alt="print icon"
    />
    <img
      src="https://p2.ssl.qhimg.com/t012148e384810d6c9d.png"
      alt="print icon 2"
    />
  </div>

  <div role="list" class="icon-examples">
    <figure role="listitem">
      <img
        src="https://p1.ssl.qhimg.com/t0149dcd1465353b7fd.png"
        alt="正方形图标"
      />
      <figcaption>正形图标(方)</figcaption>
    </figure>
    <figure role="listitem">
      <img
        src="https://p0.ssl.qhimg.com/t011d130b827bd9a892.png"
        alt="正形图标(圆)"
      />
      <figcaption>正形图标(圆)</figcaption>
    </figure>
    <figure role="listitem">
      <img
        src="https://p1.ssl.qhimg.com/t01f98ebd5c68136ef4.png"
        alt="宽形图标"
      />
      <figcaption>宽形图标</figcaption>
    </figure>
    <figure role="listitem">
      <img
        src="https://p5.ssl.qhimg.com/t01c8ec74172d73dc17.png"
        alt="长形图标"
      />
      <figcaption>长形图标</figcaption>
    </figure>
    <figure role="listitem">
      <img
        src="https://p4.ssl.qhimg.com/t015bbd874a395381dc.png"
        alt="无法完全套用框架图标"
      />
      <figcaption>无法完全套用框架图标</figcaption>
    </figure>
  </div>
</template>

<style scoped>
  .icon-demo2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 2.5em;
  }
  .icon-demo2 img {
    width: 378px;
    height: 233px;
    margin: 1em;
  }
  .icon-examples {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 2.5em;
  }
  .icon-examples figure {
    margin: 1em;
    font-size: 12px;
    text-align: center;
    color: #555;
  }
  .icon-examples img {
    display: block;
    width: 113px;
    margin-bottom: 1em;
  }
</style>
```

## 图标组件

使用图标时，可以使用 `c-icon-图标名` 作为组件名来使用图标。例如：

```html
<c-button type="primary" class="c-button--icon">
  <c-icon-search />
</c-button>

<c-button disabled type="primary">
  <c-icon-spin />
  提交中...
</c-button>

<c-button>
  <c-icon-arrow-left style="stroke-width:2px" />
  返回
</c-button>

<style scoped>
  .c-button + .c-button {
    margin-left: 20px;
  }
  .c-icon--svg {
    vertical-align: -0.15em;
  }
</style>
```

可以按需加载，单独引入单个图标：

```javascript
import { IconHome } from '@clair/icon'
```

## 图标列表

```html
<template demo-only>
  <c-form inline>
    <c-form-item label="图标大小：">
      <c-input-number v-model.number="fontSize" :min="10" :max="72" />
    </c-form-item>
    <c-form-item label="线条粗细：">
      <c-input-number v-model.number="strokeWidth" :min="1" :max="maxStroke" />
    </c-form-item>
  </c-form>
  <div class="icons">
    <div class="icon-group" v-for="group in icons">
      <h3>{{ group.title }}</h3>
      <ul class="icon-list">
        <li v-for="name in group.names">
          <component :is="`c-icon-${name}`" :style="style" />
          <p>{{ name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        strokeWidth: 2,
        fontSize: 42,
        observer: null,
        icons: [
          {
            title: '方向类图标',
            names: [
              'arrow-up',
              'arrow-right',
              'arrow-down',
              'arrow-left',
              'double-arrow-left',
              'double-arrow-right',
              'caret-up',
              'caret-right',
              'caret-down',
              'caret-left'
            ]
          },
          {
            title: '状态类图标',
            names: [
              'status-info',
              'status-success',
              'status-warning',
              'status-danger',
              'checked',
              'exclamation'
            ]
          },
          {
            title: '其它图标',
            names: []
          }
        ]
      }
    },
    computed: {
      style() {
        return {
          strokeWidth: this.strokeWidth,
          fontSize: `${this.fontSize}px`
        }
      },
      maxStroke() {
        return Math.ceil(this.fontSize / 14)
      }
    },
    methods: {
      updateWidth($el, callback) {
        const svg = $el.querySelector('svg')
        const viewBox = svg.getAttribute('viewBox')
        const size = Number(viewBox.split(' ').pop())
        const style = getComputedStyle($el)
        const [fontSize, strokeWidth] = ['font-size', 'stroke-width']
          .map(propertyName => style.getPropertyValue(propertyName))
          .map(value => value.replace(/px$/, ''))
          .map(value => Number(value))
        const { width } = $el.getBoundingClientRect()
        const { width: svgWidth } = svg.getBoundingClientRect()
        const widthRatio = svgWidth / width
        const value = strokeWidth * (size / (fontSize * widthRatio))

        callback(value)
      }
    },
    mounted() {
      // dynamically get icons
      const allComponents = Object.getPrototypeOf(this.$options.components)
      // from `CIcon${Name}${Name}` -> `${name}-${name}`
      let iconComponents = Object.keys(allComponents)
        .filter(name => /^CIcon/.test(name))
        .map(name =>
          name
            .replace(/^CIcon/, '')
            .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
            .replace(/^-/, '')
        )
      this.icons.forEach(item => {
        if (item.title !== '其它图标') {
          iconComponents = iconComponents.filter(name => {
            return !item.names.includes(name)
          })
          return
        }
        item.names.push(...iconComponents)
      })
      if (!MutationObserver) {
        return
      }
      const observeCallback = list => {
        list.forEach(mutation => {
          const { target, attributeName } = mutation
          if (mutation.type !== 'attributes') return
          if (!target.matches('.c-icon--svg')) return
          switch (attributeName) {
            case 'style':
            case 'class': {
              this.updateWidth(target, value => {
                target.querySelector('svg').style.strokeWidth = value
              })
              const circle = target.querySelector('circle')
              if (circle && circle.getAttribute('stroke-width') === '0') {
                this.updateWidth(target, value => {
                  circle.setAttribute('r', value / 2)
                })
              }
              break
            }
            default:
              break
          }
        })
      }
      this.observer = new MutationObserver(observeCallback)
      this.observer.observe(this.$el.querySelector('.icons'), {
        attributes: ['style', 'class'],
        subtree: true
      })
    },
    beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect()
      }
    }
  }
</script>

<style scoped>
  .icon-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 1.5em 1px;
  }
  .icon-list li {
    display: block;
    box-sizing: border-box;
    width: 140px;
    height: 140px;
    padding: 2em 1em 1em;
    color: #7d8085;
    text-align: center;
    border: 1px solid #eee;
    margin: -1px 0 0 -1px;
  }
  .icon-list li:hover {
    background: #f0f2f4;
    color: #333;
  }
  .icon-list li p {
    min-width: 7.5em;
    font-size: 14px;
    margin: 1em 0;
  }
</style>
```
