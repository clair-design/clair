---
title: 更新日志
---

# 更新日志

## 0.11.1

`2020-09-21`

修复了一些问题

- ESM 格式重新启用 bundle 模式

## 0.11.0

`2020-09-21`

新增一些功能

- Table 的 column width 支持 `string` 类型

修复一些问题

- Radio box 可能被意外压扁的问题
- Table 固定表头时，阴影将在 `thead` 元素下边缘展示，而非上边缘

做了一些优化

- Table 固定列时，使用伪元素进行阴影渲染
- ~~为了避免 tree shake 的边界场景，ESM 格式不再打包，只提供编译~~

## 0.10.1

`2020-08-26`

修复一些问题

- 幽灵按钮意外显示边框的问题

## 0.10.0

`2020-08-25`

新增一些功能

- Button 新增 `ghost` 类型（幽灵按钮）
- Pagination 支持配置「每页数据个数」的下拉选择器
- Popover 类组件会根据关联元素的尺寸改变，重新定位。需要浏览器支持 `ResizeObserver`

修复一些问题

- 调整了 MenuItem 激活状态下的 `border-width`，使之更为明显
- Tooltip 的箭头位置，可能超出内容区域的问题
- Popover 多级嵌套时，阴影重复叠加的问题

做了一些优化

- 组件按需引用时，样式的加载更为完整

## 0.9.0

`2020-07-16`

新增一些功能

- 增加 Tree 组件

修复一些问题

- Cascader 关闭再展开，可能出现面板展示错误的问题（显示上次未完成操作对应的内容）
- Cascader 遗漏触发 `visibility-change` 事件的问题
- Modal 的 `header`/`footer` slot 为空时，样式的错位问题
- Table 的阴影，未能根据 `columns` 的配置，响应式更新的问题
- Timeline 组件 `solid` 配置未生效的问题

## 0.8.1

`2020-06-25`

修复一些问题

- SSR 时，props 类型验证导致的错误问题

## 0.8.0

`2020-06-23`

新增/调整一些功能

- Table 选中的行（row）增加了背景颜色
- 增大 Popover 类组件中的箭头尺寸，使之更为明显
- 缩小 FormItem 之间的垂直距离，视觉上更为紧凑
- 缩小 Checkbox/Radio 中 box 和 label 之间的距离，加强关联感
- 统一了 Button disabled 的样式，视觉上更为明确

修复一些问题

- Modal 弹出后，Confirm 按钮不能自动获取 focus 的问题
- Table 表头中，行（row）的全选/部分选择状态，可能不准确的问题

## 0.7.0

`2020-05-21`

修复一些问题

- Checkbox 的 label 如果含有表单控件，不再意外触发 Checkbox 的 `change` 事件
- Pagination 会对 float 型进行向下取整
- 当初始值为 `null` 时，InputNumber 不再根据 `min` `max` 区间，对 `value` 进行调整，而是保留原样
- Select 选中的 Option 会自动滚动进入视野（针对复选，则为第一个真实选中的 Option）
- Tag `color` props 为 HEX 格式时失效的问题
- Popover DOM 中使用 `classname` 的问题
- Switch 和 Checkbox 可能存在重复 id，导致点击行为互相影响的问题

新增一些功能

- 各类弹出层组件（Popover），会根据容器（`append-target`）的剩余空间，自动调整 `placement`
- Modal 支持自定义的 confirm 和 cancel 按钮

做了一些优化

- 不再依赖 `regenerator-runtime`

## 0.6.0

`2020-04-30`

修复一些问题

- 当 DropdownItem 使用 slot 时，`item-click` 事件依旧传入正确的 `itemKey`
- 当没有设置 `value`/`v-model` 时，Input 的 `press-enter` 事件依旧传入正确的 `value`
- 当初始 `visible` 为 `true` 时，Popover 依旧能够正确响应 `resize`/`scroll` 事件（更新位置）
- 动态修改 `options` 时，Cascader 能够正确更新 panel 的展示
- Cascader 中，选项激活时的背景色，会随着 `$--primary-color` 而改变
- 当 Select 宽度小于 Option 的内容宽度时，Windows 的 FireFox 中，不再出现 Option 文字重叠的情况

新增一些功能

- Input 支持 `input-attrs` props，可用于添加 HTMLInputElement 支持的属性（如 `maxlength` 等）

## 0.5.0

`2020-04-16`

修复一些问题

- 使用 `use-router` 时，若目标路由和当前路由不一致，激活态的 `c-menu-item` 依旧可以成功点击
- 蒙层触发 Modal 关闭的机制，从 `click` 调整为 `mousedown`，避免意外的关闭行为

新增一些功能

- Cascader 支持 `append-target` props

## 0.4.0

`2020-04-09`

修复一些问题

- 在 Modal 消失过程中，创建新 Modal，导致蒙层（mask）消失的问题
- InputNumber 触发两次 change validation 的问题
- InputNumber 的 `change` 事件触发时机问题（调整为和原生一致）
- Pagination 的 jumper 中输入为非数字字符时，导致显示错乱、交互不正常的问题
- 通过键盘选择 Select 的 Option 时，不能自动滚动到视野范围的问题
- Tabs 不能动态 insert 的问题

新增一些功能

- Message 和 Notification 新增 `custom-class` 和 `custom-style` props

其他值得注意的变化

- Select 下拉框的动画进行了调整
- Modal 容器的类名，由 `c-modal-wrapper` 调整为 `c-modal-container`

## 0.3.3

`2020-03-26`

修复一些问题：

- TimePicker 支持表单校验
- DatePicker 在 `disabled` 状态时，不再能够获取焦点
- MenuItem 在使用 `use-router` 时，若已经选中，不会重复调用 `router.push`
- package.json 中的 `browser` 字段，调整为 ESM 的 bundle，便于二次打包时获得更小的代码体积。为了向前兼容，仍旧提供 `index.browser.js`

额外的改动：

- 提供 `index.modern.mjs`。保留了 ES6+ 的语法，为**目标是现代浏览器**的项目，提供更小的代码体积。

## 0.3.2

`2020-03-05`

修复一些问题：

- Modal `title` slot 能够正确渲染内容

进行一些优化

- 更好的 tree-shake 支持
- UMD/CommonJS 的 bundle 中，不再包含 vue package

## 0.3.1

`2020-02-27`

修复一些问题：

- 支持初始化 `v-loading` 后立即修改 loading 状态
- Checkbox 不再每次 render 时候更新 id

## 0.3.0

`2020-02-20`

新增如下功能：

- Modal 支持 `custom-class` 和 `custom-style`

修复一些问题：

- `stroke-color` 能够对圆形 Progress 生效
- Input textarea 去除不必要的 `max-height`，确保 `auto-size` 生效
- Dropdown 去除多余的 `box-shadow`
- TimePicker 去除不必要的 `position` 属性

## 0.2.0

`2020-02-06`

新增如下功能：

- Notification 的 `description` 支持 Vue 组件格式

修复一些问题：

- 内容过长时，Modal 支持全屏滚动
- TimePicker 只有在 blur 之后，才会触发 `change` 事件，以及更新 `v-model`
- Collapse 展开后，不再使用固定高度
- 当 Option 使用 slot 且动态更新时，正确更新 Select 显示的选中值

## 0.1.0

`2020-01-09`

新增如下功能：

- Table 可以主动控制选中/展开的行

修复一些 bug：

- DatePicker 和 TimePicker 在验证不通过时，展示 border 错误的问题
- 优化 Select `cursor` 和 `font-size` 的展示逻辑

## 0.0.14

`2019-12-26`

修复一些 bug：

- Input[html-type=textarea] 的 `v-model` 失效问题
- Select cursor 的显示策略

进行一些优化：

- 使用 `lodash-es`，~~弃用 `lodash`~~
- esm 的打包体积减小 40%，利于项目二次开发时的 tree-shaking

## 0.0.13

`2019-12-19`

修复一些 bug：

- esm 入口中，DatePicker 引用路径错误

## 0.0.12

`2019-12-19`

修复一些 bug：

- DatePicker 在 range 模式下，更统一的 emit `focus` 和 `blur` 事件
- Loading 组件在全屏模式下，确保一直处于页面最上方
- Input 的 `input` 事件调整为原生 `<input />` 的 `input` 事件
- Grid 组件的响应式匹配采用「移动优先」原则
- 当 TimePicker 处于 `disabled` 时，不显示 clear 按钮
- Tooltip 响应 `visible` props
- 当初始 `visible` 为 `true` 时，确保 Popover panel 定位的准确性
- CheckboxGroup 可以通过 `line-height` 控制其 block-size 的表现
- FormItem 内容区域不再允许回行
- 使用 flexbox 对 FormItem 进行布局
- 调整 Cascader inputbox 部分的颜色展示策略
- 当 Cascader 为只读时，`cursor` 调整为 `default`
- TimelineItem 添加 `flex-grow: 1`，确保能够填充父容器

## 0.0.11

`2019-12-16`

单纯版本 bump，发布到 npm

## 0.0.10

`2019-12-15`

新增如下功能：

- Input 支持 `readonly`

修复一些 bug：

- Cascader 设置了默认宽度，同 Select
- Timeline 中的自定义 icon 调整为 16px
- 通过 `this.$modal` 方式调用 modal，关闭后直接销毁 Modal 实例
- 当 `'focus'` 是 trigger 时，用户点击 Popover 的面板后，面板不再消失
- 优化 TimePicker 的 clear 按钮展示逻辑
- 当 TimePicker 处于范围选择模式下，点击面板选择时间后，正确更新 UI + value

## 0.0.9

`2019-12-12`

新增如下功能：

- Modal 支持 `v-model` (`.sync`)
- 提供 `registerEmitDirective` 方法

修复一些 bug：

- 当 Table 数据源为空时，禁止「全选」功能
- 当 value 没有变化时（`Object.is`），DatePicker 和 Select 不再触发 `'change'` 事件
- Select 的位置重置为 `'bottom-left'`
- Checkbox 的盒子部分，不再因为 label 过长而缩小
- DatePicker，Input，Select 的一些样式细节调整

## 0.0.8

`2019-12-06`

修复一些 bug：

- 解决 `0.0.7` 版本中，由于存在 `require(relative_path)` 导致无法使用的问题

## 0.0.7

`2019-12-05`

新增如下组件：

- Timeline 时间轴
- TimePicker 时间选择器
- DatePicker 日期选择器

修复一些 bug：

- Step 数字垂直不居中
- Popover 响应 `mouseenter` + `mouseleave` 多于预期
- Popover `trigger` 是 `'focus'` 时，panel 获取焦点后会直接消失

进行了如下调整：

- Alert `close` 事件参数改为 `{ nativeEvent: Event }`
- Tag `close` 事件参数改为 `{ nativeEvent: Event }`

## 0.0.6

`2019-11-29`

修复一些 bug：

- Popover 的 `customClass` 支持 `Array` 和 `Object`
- 当手动将 `value` 设置为 falsy 值，且该 falsy 值不在 Options 中存在时，Select 显示 `placeholder` 而非上次选中的 Option
- 使用 `v-model` 时，InputNumber 不会显示超出范围的值
- Slider 中的 Tooltip 内容能够实时更新
- 特殊场景下，Popover 的触发元素会被设置为 `display: inline-block;`，以确保 popup 的正确定位
- 当 Popover 的 `append-target` 是 positioned element 时，popup 依旧能够正确定位
- 将部分组件的 `flex: 1;` 调整为 `flex-grow: 1`，以确保自定义的尺寸样式能够直接生效

## 0.0.5

`2019-11-22`

新增了如下功能：

- 增加 CIconStarFilled 组件
- Rating 将 CIconStarFilled 作为默认 icon

修复一些 bug：

- 指定 `append-target` 时，Popover 内容区域不跟随滚动
- Grid 在 destroyed 时解除事件绑定失败
- Step 的 `status` 属性不能响应式作用于 DOM
- Tooltip 的默认 `placement` 重置成 `'top'`
- Table 的「选择所有行」功能失效
- Upload 内部传递给 HTTP 请求的参数错误

## 0.0.4

`2019-11-15`

新增了如下功能：

- Popover 支持指定嵌入的 DOM
- Radio, Checkbox 支持更多的 DOM 事件
- Checkbox 的事件参数格式，更加接近原生事件
- Card 增加无边框样式，以及支持自定义 body 样式

修复一些 bug：

- Submenu 展开/收起时，可能出现的动画错误
- 当选中值为 `0` 或者其他 falsy 值时，Select 仍然展示对应的 Option
- 规范 Popover 触发 `visibility-change` 的场景
- Table 阴影的展示，不具备响应式的问题
- 在 ESM 入口中 export DropDown
- Switch z-index 过低的问题

重构了如下内容：

- Select, Tooltip, PopConfirm, DropDown 的弹层部分，现已全部使用 Popover 实现

## 0.0.3

`2019-11-08`

修复一些 bug：

- 调整 Wifi icon 的文件名
- 修复 Step icon slot 中文字的垂直居中

## 0.0.2

`2019-11-08`

新增如下组件：

- Steps 步骤条
- Rating 评分
- Slider 滑动输入条

对已有组件更新：

- 增加一些图标，并对已有图标设计进行了优化
- 增加使用 `v-model` 控制 Collapse 组件展开状态
- Input 组件新增 `autocomplete` 和 `autofocus` 属性

修复一些 bug：

- 修复 PopConfirm 组件内容不是响应式的 bug
- 修复 Message 组件 `z-index` 层级问题
- 更新 Tabs、Collapse 组件的事件回调函数的参数
- 修复 Radio 和 Checkbox 在 label 为空时的 bug
- 修复 InputNumber 组件体验上的 bug

## 0.0.1

`2019-10-21`

新增如下组件：

- Menu 导航菜单
- Cascader 级联选择器
- Upload 文件上传
- Switch 开关
- Avatar 头像
- Card 卡片
- Loading 加载中
- Popover 气泡弹出框

另外，还修复了 Input、Form、InputNumber、Select、Table、Pagination、Dropdown 等组件的一些 bug。

## 0.0.0

`2019-06-28`

- Clair design 预览版发布。
