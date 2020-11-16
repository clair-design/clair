# Clair Styles

Common styles for ClairDesign.

## 使用指南

### 直接引入

```js
import '@clair/dist/index.css'
```

如果希望启用一系列 `focus-visible` 的样式，需要使用 [focus-visible](https://github.com/WICG/focus-visible) polyfill。

### 自定义主题

```scss
// 可以参照 `src/_variable.scss` 文件覆盖变量
$--primary-color: #f0f;

@import '~@clair/scss/index';
```

如果希望启用一系列 `focus-visible` 的样式，请自行引入 [polyfill。](https://github.com/WICG/focus-visible)，并使用 [PostCSS 插件](https://github.com/jonathantneal/postcss-focus-visible) 进行处理。

### 相关链接

- https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- https://css-tricks.com/keyboard-only-focus-styles/
- https://github.com/WICG/focus-visible
- https://nelo.is/writing/styling-better-focus-states/

## 开发指南

### 1. 启动

开发新组件时，请在 `html/` 目录下新建一个 HTML 文件，如 `html/component.html`，内容复制 `html/_template.html` 即可。

然后执行命令：

```sh
# 注意替换文件名
npx parcel ./html/component.html
# OR
yarn dev component
```

### 2. 构建

采用 `dart-sass` 编译，因为安装快。（PS: parcel 现在也是使用 `dart-sass` 哟）

使用下面的命令可完成构建：

```sh
npm run build
# OR
./scripts/build.sh
```

### Resources

- [SCSS official site](https://sass-lang.com)
- [Documentation on SCSS Functions](https://sass-lang.com/documentation/Sass/Script/Functions.html)
- [Sass Guidelines](https://sass-guidelin.es/zh/)
- [W3CPlus Posts](https://www.w3cplus.com/blog/tags/302.html)
