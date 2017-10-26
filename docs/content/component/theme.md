---
title: 自定义样式
layout: component
scrollTop: true
route: component/theme
---

# 自定义样式

您可以使用内置的主题：

* [default]()
* [dark]()
* [light]()
* [material]()

## 定制主题

定制主题需要在项目中使用 [PostCSS](http://postcss.org/) 进行构建。 

### 1. 修改 CSS 变量

在项目的 CSS 目录创建一个 `custom.css` 文件，根据需要修改以下 CSS 变量：

```css
:root {
  --primary-color: #2196f3;
  --grid-gap: 1em;
}
```

### 2. 在你的项目中引入 Clair 的样式

```css
@import url('node_modules/clair/src/css/main.css')
```

### 3. 配置 PostCSS 插件




