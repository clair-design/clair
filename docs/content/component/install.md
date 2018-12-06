---
title: 安装和使用
layout: component
route: /component/install
---

# 安装和使用

## 运行环境

* 现代浏览器和 IE 10+
* Vue.js 服务器端渲染

## 使用 Clair 项目模版 （Deprecated）

<del>

为了更快速地使用 Clair 开发项目，你可以使用我们提供的项目模版，免去繁琐的配置环节。项目模版提供了以下功能：

- eslint 和 stylelint
- git 配置
  - 针对 Node.js 和现代开发工具的 `.gitignore`
  - 使用 husky 对提交的代码进行检查
- Vue-router
- PostCSS 以及自定义主题的配置

使用方式：

```shell
$ npm install vue-cli -g
$ vue init clair-design/template my-project
```
</del>

## 使用 vue-cli 3 (@vue/cli) 开发

强烈建议使用 vue-cli3 进行项目开发。我们为此专门开发了插件 [vue-cli-plugin-clair](https://github.com/clair-design/vue-cli-plugin-clair)。

整个流程大致分为以下三步：

1. [@vue/cli 的全局安装](https://cli.vuejs.org/zh/guide/installation.html)
2. [使用 @vue/cli 创建项目](https://cli.vuejs.org/zh/guide/creating-a-project.html)
3. [添加 vue-cli-plugin-clair 组件](https://github.com/clair-design/vue-cli-plugin-clair)

以上步骤，直接点击阅读对应的文档即可了解更多。

## 直接使用我们的CDN地址

对于简单并且不需要自定义样式的项目，你可以直接在页面中引入我们的 CDN 地址来使用 Clair。

```xml
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Clair Project</title>
  <link rel="stylesheet" href="https://unpkg.com/clair/dist/clair.css">
</head>
<body>
  <div id="app">
    <c-modal title="Clair" visible>
      <p>Hello World!</p>
    </c-modal>
  </div>
  <script src="https://lib.baomitu.com/vue/2.5.13/vue.min.js"></script>
  <script src="https://unpkg.com/clair/dist/clair.js"></script>
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
import 'clair/dist/clair.css'

Vue.use(Clair)
```

## 关于 polyfill，兼谈在 vue-cli 3 项目中的使用

因为 Clair 项目中使用到了一些新的 ES201x 特性（主要是 Array 和 Object 的一些拓展），在构建时我们并未对这些特性（如`Array#findIndex` `Object.assign`等）进行 polyfill。我们认为，对这些特性的 polyfill 工作应该交给开发者/使用者。

下面以 `vue-cli@3` 生成的项目，说明如何解决 polyfill 问题。在 vue-cli 3 的默认配置中，babel 并不会对 node_modules 中的模块进行处理（transpile），关于这一点，可参阅[vue-cli 官方文档](https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill)。

你需要在 `vue.config.js` 文件中，添加如下配置：

```js
  // .... other configurations
  transpileDependencies: ['clair']
  // ...
```
