---
title: 快速上手
group: Basic 基础
---

# 快速上手

## 运行环境

- 现代浏览器和 IE 11+
- Vue.js 服务器端渲染

## 安装

```shell
npm install @clair/vue vue
```

## 使用

### 全量引用

在项目的入口文件中使用：

```javascript
import Vue from 'vue'
import Clair from '@clair/vue'
import '@clair/theme-default/styles/index.scss'
// 或者 import '@clair/theme-default/dist/index.css'

Vue.use(Clair)
```

### 按需引用

```markup
<template>
  <Alert>this is alert</Alert>
</template>

<script>
  import { Alert } from '@clair/vue'
  import '@clair/theme-default/styles/alert.scss'
  export default {
    name: 'MyComponent',
    components: {
      Alert
    }
  }
</script>
```

按需引用时，Clair 支持自动引用对应的样式文件。只需要：

```shell
npm install @clair/babel-plugin-inject-style
```

并在你的 `.babelrc` 中，加上：

```json
{
  "plugins": ["@clair/babel-plugin-inject-style"]
}
```

如此一来，无需再额外引用样式：

```markup
<template>
  <Alert>This is alert</Alert>
</template>

<script>
  // 样式文件会被自动引入
  import { Alert } from '@clair/vue'
  export default {
    name: 'MyComponent',
    components: { Alert }
  }
</script>
```

### SSR

以 Nuxt 项目为例，需要做两处处理。

首先，需要使用 commonjs 版本：

```js
import Clair from '@clair/vue/dist/index.cjs'
```

其次，在配置项中，开启对 `lodash-es` 的编译（`webpack` 或 `vue-cli` 均有类似配置）

```js
export default {
  build: {
    transpile: ['lodash-es']
  }
}
```

## 关于兼容性

因为 Clair 项目中使用到了一些新的 ES201x 特性（主要是 Array 和 Object 的一些拓展），在构建时我们并未对这些特性（如 Array#findIndex Object.assign 等）进行 polyfill。我们认为，对这些特性的 polyfill 工作应该交给开发者/使用者。

> 推荐安装 `core-js`。

下面以 vue-cli@3 生成的项目，说明如何解决 polyfill 问题。在 vue-cli 3 的默认配置中，babel 并不会对 node_modules 中的模块进行处理（transpile），关于这一点，可参阅 [vue-cli 官方文档](https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill)。

你需要在 vue.config.js 文件中，添加如下配置：

```javascript
// .... other configurations
transpileDependencies: ['clair']
// ...
```

## 关于事件参数格式

出于：

- 统一事件接口；
- 尽可能接近原生浏览器；
- 避免参数调整导致的 breaking change。

我们对事件的接口进行了规范，可以参考如下描述。

针对通用组件：

```typescript
interface CustomEvent {
  detail?: {
    [key: string]: any
  }
  nativeEvent?: Event
}
```

针对表单类组件：

```typescript
interface BaseFormEvent {
  target: {
    value: any
  }
}

type FormEvent = BaseFormEvent & CustomEvent
```

这是一个主观选择。

同时，我们也听到了反馈，希望简化参数获取的方式，以更符合长期形成的使用习惯。

因此，提供了 `registerEmitDirective` 的方法。

在项目的入口文件中：

```js
import { registerEmitDirective } from '@clair/vue'

registerEmitDirective()
```

> 以上语法，需要 bundler 支持 [esm 格式](https://tc39.es/ecma262/#sec-modules)。

> Webpack, parcel 等常见 bundler，均支持 esm 格式的打包。

假如 bundler 不支持 esm，则需要如下使用方式：

```js
import Clair from '@clair/vue'

Clair.registerEmitDirective()
```

注册之后，在组件上使用 `v-emit` 指令，即可简化获取参数的方式。

```markup
<template>
  <c-input v-emit @change='change'></c-input>
</template>

<script>
export default {
  name: 'demo',
  methods: {
    change(value) {
      // 此时 value 相当于之前的 event.target.value
      console.log(value)
    }
  }
}
</script>
```

详情参考 [API](/vue/api)。
