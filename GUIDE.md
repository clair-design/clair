#  开发指南

## 依赖安装

**请务必使用 [yarn](https://yarnpkg.com/) 进行操作。**

## 代码风格

本项目使用 2 个空格缩进，`UTF-8` 编码。你可以为你的编辑器下载 [EditorConfig](http://editorconfig.org/) 插件，让你的编辑器自动应用这些配置。

项目分别使用 [ESLint](https://eslint.org/) 和 [StyleLint](https://stylelint.io/) 对 JavaScript 和 CSS 代码进行风格检查。你可以为你的编辑器安装一些插件来辅助开发：

### VSCode

* [vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
* [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### vim
[posva/vim-vue](https://github.com/posva/vim-vue)
[w0rp/ale](https://github.com/w0rp/ale)

## 文件目录结构

`src` 为项目源码的目录，所有的组件代码都在其下的 `components` 目录中。

`build` 是项目构建脚本所在目录。

`dist` 中存放构建后要发布的文件。

`document` 中是项目文档存放的目录，文档使用 `vue` 和 `markdown` 书写，并通过脚本构建成静态文件存放到 到 `site` 目录。

## 构建脚本

* `npm start`：开启 rollup 以及 PostCSS 编译，并启动文档页面的服务器。
