---
title: 自定义样式
layout: component
route: /component/theme
---

# 自定义样式

Clair 默认使用蓝色系的配色，可以使用在大部分场合使用。未来，我们还会增加几种内置的配色。

## 定制主题

**如果你想对样式进行自定义，推荐你使用 [Clair 项目模版](https://github.com/clair-design/template)。**

当然，你也可以从头开始按照如下步骤配置自定义样式：

### 1. 修改 CSS 变量

在项目的 CSS 目录创建一个 `custom.css` 文件，根据需要修改 CSS 变量。比如：

```css
:root {
  --primary-color: #2196f3;
  --grid-gap: 1em;
}
```

Clair 使用的完整 CSS 变量列表，请 [查看 github 代码](https://github.com/clair-design/clair/blob/master/src/css/default.css)

### 2. 在你的项目中引入 Clair 的样式

在你的项目 CSS 入口文件（比如 `main.css`）中，引入 Clair 及其组件样式。

```css
@import url('clair/src/css/main.css');
@import url('clair/src/components/**/*.css');
```

### 3. 配置 PostCSS 插件

使用 npm 安装 PostCSS 及其插件：

```shell
npm install postcss postcss-cssnext postcss-each postcss-for postcss-import
```

在 PostCSS 的配置文件 `postcss.config.js` 中添加如下配置：

```javascript
const { resolve, join } = require('path')
const glob = require('glob')

module.exports = {
  plugins: {
    'postcss-import': {
      resolve (id, basedir) {
        const cwd = process.cwd()
        // 将 theme.css 指向你的项目中的 CSS 变量配置文件
        if (id === './theme.css') return resolve(cwd, 'src/css/theme.css')
        if (/^clair/.test(id)) return glob.sync(join(cwd, 'node_modules', id))
        return id
      }
    },
    'postcss-for': {},
    'postcss-each': {},
    'postcss-cssnext': {}
  }
}
```
