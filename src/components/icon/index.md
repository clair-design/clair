---
title: 图标
layout: component
scrollTop: true
route: component/icon
---

# 字体图标

字体图标默认类型为 [FontAwesome](http://fontawesome.io/icons/)。如需使用，请**自行引入** fontawsome CSS 文件，如：

```xml
<link href="https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css" />
```

PS: 带动画效果的 FontAwesome，可参考 [font-awesome-animation](https://github.com/l-lin/font-awesome-animation)。

## 效果展示

```html
<c-icon type="fa" name="github" color="#498ff2" size="1.5em" />
<c-icon type="fa" name="github" color="#498ff2" size="3ch" />
<c-icon type="fa" name="github" color="#498ff2" size="32px" />
<c-icon type="fa" name="github" color="#498ff2" size="220%" />
<br>
<c-icon type="fa" name="github" color="#498ff2" size="1.5em" valign="middle" />
<c-icon type="fa" name="github" color="#498ff2" size="3ch" valign="middle" />
<c-icon type="fa" name="github" color="#498ff2" size="32px" valign="middle" />
<c-icon type="fa" name="github" color="#498ff2" size="220%" valign="middle" />
```

FontAwesome 图标通过 `<i>` 标签及其 class 值 `{类型} {类型}-{图标名}` 实现。使用其他图标系统时，请自行引入相关 CSS 和 Font。例如，根据 [font-mfizz](http://fizzed.com/oss/font-mfizz/) 的文档，图标使用方式为 `<i class="icon-angular"></i>`，则使用方法如下：

```html
<template>
  <c-icon type="icon" name="angular" color="red" size="3em" valign="middle" />
  <c-icon type="icon" name="reactjs" color="blue" size="3em" valign="middle" />
  <c-button primary>
    <c-icon type="icon" name="angular" />
    <span>测试</span>
  </c-button>
</template>

<style>
  /* 这里使用 import 只是为了方便 */
  @import 'https://lib.baomitu.com/font-mfizz/2.4.1/font-mfizz.min.css';

  .c-icon {
    margin-right: 20px;
  }
</style>

```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| type | String | fa | 图标类型（ class 前缀） |
| name | String | 无，必填 | 图标名称 |
| color | String | inherit | 默认来自继承 |
| size | String | 1em | 字体大小，可使用合法单位 |
| valign | String | baseline | vertical align |

## FontAwesome 图标列表

下面列出了 FontAwesome 中的全部图标，点击可复制对应标签：

```html
<style>
  .icon-item {
    display: block;
    padding: 10px 0;
  }
  p {
    margin: 0
  }
</style>

<template>
  <c-box gap="5%" class="is-text-center">
    <c-box-item v-if="icons.length === 0" xs="12">
      数据加载中....
    </c-box-item>

    <c-box-item
      xs="12"
      sm="3"
      v-for="ico in icons"
      :key="ico"
      style="transition: all 0.5s"
    >
      <a
        class="icon-item"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        :data-clipboard-text='`<c-icon color="#498ff2" name="${ico}" />`'
      >
        <c-icon color="#498ff2" :name="ico" />
        <p>{{ico}}</p>
      </a>
    </c-box-item>
  </c-box>
</template>

<script>
  const hoverClass = 'is-bg-gray-1'
  const fetchText = url => fetch(url).then(r => r.text())
  const loadScript = function (src) {
    var s = document.createElement('script')
    s.async = true
    s.src = src
    document.body.appendChild(s)
    return new window.Promise(function (resolve, reject) {
      s.onload = resolve
      s.onerror = reject
    })
  }

  export default {
    data () {
      return {
        icons: []
      }
    },

    created () {
      if (process.BROWSER_BUILD) {
        window.Promise.all([
          fetchText('https://raw.githubusercontent.com/' +
            'FortAwesome/Font-Awesome/master/src/icons.yml'),
          loadScript('http://lib.baomitu.com/yamljs/0.3.0/yaml.min.js'),
          loadScript('https://lib.baomitu.com/clipboard.js/1.7.1/clipboard.min.js')
        ]).then(([text]) => {
          this.icons = window.YAML.parse(text).icons.map(i => i.id)
          new window.Clipboard('.icon-item')
        })
      }
    },

    mounted () {
      if (process.BROWSER_BUILD) {
        const container = this.$el.parentNode
        container.classList.add('hide-source')
      }
    },

    methods: {
      mouseEnter(e) {
        e.currentTarget.parentNode.classList.add(hoverClass)
      },
      mouseLeave(e) {
        e.currentTarget.parentNode.classList.remove(hoverClass)
      }
    }
  }
</script>
```
