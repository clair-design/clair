# Dependencies

## VSCode Plugins

- `eslint`
- `stylelint`
- `vue-vscode-extensionpack`

## Coding Style

### Eslint

- `eslint`
- `babel-eslint`
- `eslint-plugin-vue`
- `eslint-plugin-prettier`
- `eslint-config-prettier`

```bash
yarn add --dev \
  eslint \
  babel-eslint \
  eslint-plugin-vue \
  eslint-plugin-prettier \
  eslint-config-prettier
```

### Prettier

- `prettier`

```bash
yarn add --dev prettier
```

## Git 相关

- `husky`: git hooks 支持
- `lint-staged`: 用于 `pre-commit` 阶段 `eslint` 检查
- `pretty-quick`: 主要用于 `pre-commit` 阶段强行格式化
- `@commitlint/cli`: 规范 commit message ([link](https://github.com/conventional-changelog/commitlint))
- `@commitlint/config-conventional`: 建议阅读([文档](https://github.com/conventional-changelog/commitlint))
- `commitizen` 和 `cz-conventional-changelog`: commit 工具

```bash
yarn add --dev \
 husky \
 lint-staged \
 pretty-quick \
 @commitlint/cli \
 @commitlint/config-conventional \
 commitizen \
 cz-conventional-changelog
```

## Bundling System

- `buble`
- `rollup`
- `rollup-plugin-alias`
- `rollup-plugin-babel`
- `rollup-plugin-commonjs`
- `rollup-plugin-node-resolve`

```bash
yarn add --dev \
  buble \
  rollup \
  rollup-plugin-alias \
  rollup-plugin-babel \
  rollup-plugin-commonjs \
  rollup-plugin-node-resolve
```

## Babel Transpilation

### Vue JSX support

Vue JSX 支持。

- `@vue/babel-preset-jsx`
- `@vue/babel-plugin-transform-vue-jsx`
- `@vue/babel-helper-vue-jsx-merge-props`

```bash
yarn add --dev \
  @vue/babel-preset-jsx \
  @vue/babel-plugin-transform-vue-jsx \
  @vue/babel-helper-vue-jsx-merge-props
```

相关链接：

- [babel-preset-jsx](https://github.com/vuejs/jsx/blob/master/packages/babel-preset-jsx/README.md)
- [Vue Render Functions & JSX](https://vuejs.org/v2/guide/render-function.html)

## Storybook

Follow [storybook docs](https://storybook.js.org/basics/guide-vue/) and [vue-loader docs](https://vue-loader.vuejs.org/guide):

- `@storybook/vue`
- `babel-loader`
- `vue-loader`
- `css-loader`
- `sass-loader`
- `vue-template-compiler`
- `@babel/core`
- `babel-preset-vue`

Storybook addons:

- `@storybook/addon-options`
- `@storybook/addon-viewport`

Markdown transformer:

- `md2vue`

```bash
yarn add --dev \
  @storybook/vue \
  babel-loader \
  vue-loader \
  css-loader \
  vue-template-compiler \
  @babel/core \
  babel-preset-vue \
  @storybook/addon-options \
  @storybook/addon-viewport \
  md2vue
```
