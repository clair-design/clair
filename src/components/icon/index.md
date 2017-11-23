---
title: 图标
layout: component
scrollTop: true
route: component/icon
---

# 字体图标

图标默认使用 [feather](https://feathericons.com/) 所提供的 SVG icon。

如需使用其他类型的图标，请**自行引入** 相关 CSS 和字体，如 [FontAwesome](http://fontawesome.io/icons/)：

```xml
<link href="https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css" />
```

## 效果展示

下面两个图标，分别是内置的 feather 和另外引入的 FontAwesome 效果。

```html
<c-icon type="feather" name="github" color="#498ff2" size="36" valign="middle" />
<c-icon type="fa" name="github" color="#498ff2" size="40px" valign="middle" />
```

像 FontAwesome 这种外部图标的使用，是通过 `<i>` 标签及其 class 值 `{类型} {类型}-{图标名}` 实现的。例如，根据 [font-mfizz](http://fizzed.com/oss/font-mfizz/) 的文档，图标使用方式为 `<i class="icon-angular"></i>`，则使用方法如下：

<!-- 引入 CSS -->
<link href="https://lib.baomitu.com/font-mfizz/2.4.1/font-mfizz.min.css" rel="stylesheet" />

```html
<c-icon type="icon" name="angular" color="red" size="3em" valign="middle" />
<c-icon type="icon" name="reactjs" color="blue" size="3em" valign="middle" />
<c-button primary>
  <c-icon type="icon" name="angular" />
  <span>测试</span>
</c-button>

<style>
  /* 请自行引入 font-mfizz.css */
  .c-icon, button {
    margin-right: 20px;
  }
</style>
```

另外，还能兼容使用了 [ligature](https://alistapart.com/article/the-era-of-symbol-fonts) 技术的字体图标（如 [Material Icons](https://google.github.io/material-design-icons/#what-are-material-icons-)）。

<!-- 引入 CSS -->
<link href="https://lib.baomitu.com/material-design-icons/3.0.1/iconfont/material-icons.css" rel="stylesheet" />

```html
<c-icon
  ligature
  type="material-icons"
  name="face"
  color="#212121"
  size="3em"
  valign="middle"
/>

<style>
/* 请自行引入 material-icons.css */
</style>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| type | String | feather | 标识图标类型，一般是公共类名或公共类名前缀 |
| name | String | 无，必填 | 图标名称 |
| color | String | - | 默认继承 |
| size | String | 1em | 字体大小，可使用合法单位 |
| valign | String | baseline | vertical align |
| ligature | Boolean | false | 是否是 ligature |


## Feather 图标集合

下面列出了 feather 中的全部图标，点击可复制对应标签：

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

<template demo-only>
  <c-box gap="5%" class="is-text-center">
    <c-box-item v-if="icons.length === 0" xs="12">
      数据加载中....
    </c-box-item>

    <c-box-item
      xs="12"
      sm="3"
      v-for="ico in icons"
      :key="$index"
      style="transition: all 0.5s"
    >
      <a
        class="icon-item"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        :data-clipboard-text='`<c-icon type="feather" color="#498ff2" name="${ico}" size="24" />`'
      >
        <c-icon type="feather" color="#498ff2" :name="ico" size="24" />
        <p>{{ico}}</p>
      </a>
    </c-box-item>
  </c-box>
</template>

<script>
  const hoverClass = 'is-bg-gray-1'
  const fetchJSON = url => fetch(url).then(r => r.json())
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
          fetchJSON('https://unpkg.com/feather-icons/dist/icons.json'),
          loadScript('https://lib.baomitu.com/clipboard.js/1.7.1/clipboard.min.js')
        ]).then(([obj]) => {
          this.icons = window.Object.keys(obj)
          new window.Clipboard('.icon-item')
        })
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

<template demo-only>
  <c-box gap="5%" class="is-text-center" v-effect>
    <c-box-item v-if="icons.length === 0" xs="12">
      数据加载中....
    </c-box-item>

    <c-box-item
      xs="12"
      sm="3"
      v-for="ico in icons"
      :key="$index"
      style="transition: all 0.5s"
    >
      <a
        class="icon-item"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        :data-clipboard-text='`<c-icon type="fa" color="#498ff2" name="${ico}" />`'
      >
        <c-icon type="fa" color="#498ff2" :name="ico" />
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
