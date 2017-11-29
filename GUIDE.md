#  开发指南

## 依赖安装

```bash
$ yarn install
```

## 代码风格

本项目使用 2 个空格缩进，`UTF-8` 编码。你可以为你的编辑器下载 [EditorConfig](http://editorconfig.org/) 插件，让你的编辑器自动应用这些配置。

项目分别使用 [ESLint](https://eslint.org/) 和 [StyleLint](https://stylelint.io/) 对 JavaScript 和 CSS 代码进行风格检查。你可以为你的编辑器安装一些插件来辅助开发：

### VSCode
* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
* [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### vim
* [posva/vim-vue](https://github.com/posva/vim-vue)
* [w0rp/ale](https://github.com/w0rp/ale)

### 提交修改

建议按照以下两篇文章的风格来书写 commit message：

* [Git Commit Guidelines](https://gist.github.com/brianclements/841ea7bffdb01346392c)
* [利用commitizen来规范化你的commit-message](http://www.jianshu.com/p/55f681604fca)
* [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

## 文件目录结构
- `clair.config.js` 用于设置项目开发、构建工作的各种配置项
- `src` 为项目源码的目录，所有的组件代码都在其下的 `components` 目录中
- `docs` 用于存放项目文档，文档使用 `vue` 和 `markdown` 书写，并通过脚本构建成静态文件存放到 到 `.site` 目录
- `dist` 中存放构建后要发布的文件（无需同步到 Git）

## 构建脚本

日常组件开发建议使用 `yarn dev [name]`，速度相对较快。

* `yarn start` 或 `npm start`：开启 rollup 以及 PostCSS 编译，并启动 nuxt.js 文档服务
* `yarn build` 或 `npm run build`：rollup 以及 PostCSS 编译、打包，并生成 nuxt 静态文档
* `yarn new <name>` 或 `npm run new <name>`：根据 boilerplate 文件夹中的模板自动创建新组件
* `yarn dev [name]` 或 `npm run dev [name]`：开启单一组件开发模式（如果组件不存在则根据模板新建）

## 构建工具

- [clair-design/clair-scripts](https://github.com/clair-design/clair-scripts)

## 文档工具相关

- [nuxt.js](https://github.com/nuxt/nuxt.js)
- [nuxt.js 0.10.7 中文文档](https://zh.nuxtjs.org)

