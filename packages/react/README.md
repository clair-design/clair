# clair-react

## 各类选择

### 依赖管理

[`yarn`](https://yarnpkg.com/en/docs/install)

### 开发语言

[`TypeScript`](https://www.typescriptlang.org/) + [`Sass`](https://sass-lang.com/)

### 代码风格

[`Prettier`](https://prettier.io/) + [`BEM`](http://getbem.com/)

### 测试工具

[`Jest`](https://jestjs.io/) + [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro) + [`enzyme`](https://airbnb.io/enzyme/)

> 请优先使用 `@testing-library/react`。

### 样式布局

使用 [`grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)

> 意味着 IE 10+ 。其中 IE 10 和 IE 11 支持的是[旧规范](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/)，可能需要留意。

### 补充资料

[A11y](https://inclusive-components.design/)

### 目录结构

简单介绍

```txt
- src: 源文件
  - components: 各个组件
    - __test__: 组件测试目录
      - index.spec.tsx: 测试文件
    - index.tsx: 组件入口文件
    - lib: 凡是不想放入 index.tsx 的逻辑，统统放入这里，且组件文件，首字母大写
  - index.ts: 项目入口文件
  - setupTests.ts: 测试配置文件，通常不需要修改
- examples: 放置文档中的 demo
  - [Component]: 具体组件
    - index.mdx: 组件文档入口，可以理解为具体的文档文件
    - demo1.mdx: demo1 以此类推
- .storybook: storybook 相关。webpack 的配置在这里存放
- test: 项目级别的 e2e 测试，暂时没有组织好
- types: ts 相关的类型文件，主要指不提供 typings 的第三方模块
```

### 开发流程

1. 看 `@clair/theme-default` 下有没有组件样式，有 -> 4 没有 -> 2；
1. 参照 `@clair/theme-default` readme 进行[样式开发](###样式开发)，同时最好创建 issue 占个位置；
1. 开发好样式之后，提交 merge request，并 assign liuyuchen-iri/fujun-iri；
1. 提交组件 API issue，assign liuyuchen-iri，并 @zhaowenbo；
1. 等待 zhaowenbo/liuyuchen-iri 回复（可能是直接点赞）；
1. API 通过 且 样式被 merge 之后，进行[组件开发](###组件开发)；
1. 开发完毕后（需要有测试用例，覆盖度别太磕碜），提交 merge request，assign liuyuchen-iri；
1. 无休止的扯皮，直到 merge。

### 样式开发

- 如果有对应的原生 `HTMLElement`，尽量只在该 `HTMLElement` 上添加样式（不强求）；
- 想要使用 div 嵌套前，先想想伪元素能否实现效果，原则是少用嵌套；
- 多翻阅 `function` + `mixins` 目录，以及 `_variable.scss`，避免重复劳动。

### 组件开发

样式开发完毕后，在 `src/components` 下创建新的组件目录（**首字母大写**），开发具体组件。

`site/pages/component` 中创建对应的 `[component].mdx` （**首字母小写**，写法可参照 [`button.mdx`](./site/pages/component/button.mdx)），并在 [`site/nav.json`](./site/nav.json) 中添加路由配置，之后可以在浏览器中看到具体效果。

> `[component.mdx]` 中，应该只是 `src/examples/[Component]/index.mdx` 的直接引用，更多信息参见[这里](###写examples)。

### 组件风格

- named export
- stateless > stateful, hooks > class，可以用 class，可以用 class，可以用 class。
- 函数式组件，可以用函数声明，也可以用箭头函数
  - 用箭头函数时候，建议备注类型 `React.FC<Props>`，例如 `const Component: React.FC<Props> = props => {}`，此时 `props` 无需在标明类型
- 每个组件同时使用 `prop-types` 标明类型，所以是 `typescript` + `prop-types`。但是**不使用** `defaultProps`。现阶段 `defaultProps` 的类型推导尚不完善。

### 写 examples

组件的具体使用示例，都放在 `src/examples` 下。

使用 `mdx` 格式。

正确 `export` 的组件（指在 `src/index.ts` 中 export），可以在 `jsx` 或者 `tsx` 代码块中直接使用（实际上是提前注入为 `react-live` 中 `scope` 变量），参见 [button](./examples/Button/type.mdx)。

使用 `mdx` + 代码块 时，添加 `live=true` 会显示源码。也可以添加 `className=xxx` 控制代码块真实 DOM 的类名（控制样式用），同样参见 [button](./examples/Button/type.mdx)。

### 提交代码

```bash
yarn commit
```

### 合并代码

先执行两个命令：

```bash
yarn workspace @clair/react test
yarn workspace @clair/react build
```

前者检验新代码是否会 break 他人组件。

~~后者主要用于验证，新的组件是否支持 SSR。~~

两者验证通过后，提交 PR/MR，以便 review。

> 提交新组件时，**不接受**没有 `__test__` 的 PR/MR

## todo

- [x] export in ES Module
- [x] 用 `gatsby` 搭建 site 页面
- [ ] ~~更丰富的覆盖样式变量方式~~
- [x] react-a11y
- [ ] ~~集中式管理 snapshot~~
- [ ] ~~复用 `clair-vue` 的 test suites~~
- [x] ci clean 的环境中，`gatsby` 和 `node-sass` 的安装时长问题。（ci 中不一定需要 `gatsby`，before script 修改 package.json ?）
- [ ] ~~样式使用 `git Submodules` 分离出去~~
- [ ] 项目级别的 e2e test
- [x] 样式 和 js 分开输出，同时输出编译后的 css 文件
- [x] ES Module 下，path alias 问题（tsc 编译保留了开发时的 alias 路径）
- [x] hooks 管理全局 z-index ？

> 当下，ES Module 模式，需要使用者自行编译 scss 文件。`antd` 采用的方式是，不在源文件中 import 样式文件，而是通过 `babel-import-plugin` 动态加载样式。使用者可以直接可使用 css 文件，也可以改用 less 文件。
