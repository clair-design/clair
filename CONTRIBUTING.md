# Contributing

## 开发须知

### Requirements

请使用 **VSCode** 开发，并安装以下插件 ——

- `eslint`
- `stylelint`
- `vue-vscode-extensionpack`

### 注意事项

1. 对于 **bug**，请先**创建 issue**，然后再走 PR 流程。

2. 对于**新特性** ——

- 已经讨论过的特性，请先确定是否有人正在开发，避免重复开发。

- 暂未纳入开发计划的新需求，请**创建 issue**。

- 请遵守开发规范，**不要擅自添加项目依赖**（如有必要，请先联系项目负责人）。

3. 关于 **Commit Message**：

- 请描述清楚，**可以使用中文**。
- 请使用 `yarn commit` (`npm run commit`) 或者 `npx git-cz` 替代 `git commit`。

## Code of Conduct

### 组件开发指南

下面是一些 UI 组件在开发时需要考虑的通用原则：

#### 可用性

- HTML 代码是否符合语义，包括标题的使用
- 键盘操作，如果是模拟原生的实现，比如 `select`，尽量与浏览器原生的组件交互保持一致
- ARIA
- WCAG 2.0

具体每个组件的要求可以参考 https://inclusive-components.design/

#### 事件

某些可以交互的组件会触发事件，比如 `change`等，请考虑以下事件是否有必要实现：

- change / input
- blur
- focus
- error

对于 `change`/`input` 事件，我们希望 `callback` 函数的参数为一个 `Event` 对象，其结构如下：

```javascript
{
  target: {
    value: 'some value'
  }
}
```

#### 可定制性

- 不要在组件样式种直接出现颜色、长度等值，把这些值提取成 CSS 变量，让使用组件的人可以配置
- 考虑 prop 的合理性，通过 slot / 高阶组件实现定制

