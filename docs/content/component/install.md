---
title: 安装和使用
layout: component
route: /component/install
---

# 安装和使用

## 运行环境

* 现代浏览器和 IE 10+
* Vue.js 服务器端渲染

## 使用 Clair 项目模版

为了更快速地使用 Clair 开发项目，你可以使用我们提供的项目模版，免去繁琐的配置环节。项目模版提供了以下功能：

- eslint 和 stylelint
- git 配置
  - 针对 Node.js 和现代开发工具的 `.gitignore`
  - 使用 husky 对提交的代码进行检查
- Vue-router
- PostCSS 以及自定义主题的配置

使用方式：

```shell
npm install vue-cli -g
vue init clair-design/template my-project
```

## 直接使用我们的CDN地址

对于简单并且不需要自定义样式的项目，你可以直接在页面中引入我们的 CDN 地址来使用 Clair。

```xml
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Clair Project</title>
  <link rel="stylesheet" href="https://s0.ssl.qhres.com/static/376df7fef5e73d29/0.2.0/clair.css">
</head>
<body>
  <div id="app">
    <c-modal title="Clair" visible>
      <p>Hello World!</p>
    </c-modal>
  </div>
  <script src="https://lib.baomitu.com/vue/2.5.13/vue.min.js"></script>
  <script src="https://s0.ssl.qhres.com/static/3c877682712a75a8/0.2.0/clair.js"></script>
  <script>
    new Vue({ el: '#app' })
  </script>
</body>
</html>
```

## 使用 npm

```shell
$ npm install clair
```

或者

```shell
$ yarn add clair
```

使用：

```javascript
import Vue from 'vue'
import Clair from 'clair'

Vue.use(Clair)
```
