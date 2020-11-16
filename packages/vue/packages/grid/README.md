---
group: Basic 基础
---

# Grid 栅格

## 定义

对整体页面的信息的类型、重要性、操作性进行分层归类，协助进行页面级整体布局。

## 使用场景

页面根据用户终端环境（系统、分辨率、屏幕尺寸等），通过基础的 12 分栏，迅速简便地创建布局。进行自发式调整，提供一致的信息呈现和适合当前环境的阅读和操作体验。

## 栅格原理

本系统使用了 12 栅格，将每一行（`c-row`）分割为 12 个等宽盒子（`c-col`）。栅格的使用方式为：

- 用 `c-row` 包裹 n 个 `c-col`；
- 具体内容放在 `c-col` 中；
- 根据布局需求，调整 `c-row` 或者 `c-col` 的 `props`。

## 基础栅格

从堆叠到水平排列，使用 `span` 属性来设置每一列占的栅格数。

```html
<div class="custom-grid-example">
  <c-row>
    <c-col :span="3">span 3</c-col>
    <c-col :span="4">span 4</c-col>
    <c-col :span="5">span 5</c-col>
  </c-row>
</div>
```

## 分栏间隔

使用 `gutter` 属性设置栅格之间的间隔。值的设置参考 [`grid-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)。

```html
<c-row class="custom-grid-example" gutter="24px">
  <c-col :span="4">span 4</c-col>
  <c-col :span="4">span 4</c-col>
  <c-col :span="4">span 4</c-col>
</c-row>
```

## 偏移栅格

使用 `start` 属性设置栅格的起点位置（格数）。

```html
<c-row class="custom-grid-example">
  <c-col :start="1" :span="3">start 0 span 3</c-col>
  <c-col :start="6" :span="4">start 6 span 4</c-col>
</c-row>
```

## 水平对齐

使用 `justify` 属性设置水平方向的布局行为。

> 含义与 `Flexbox` 中的 `justify-content` 不同。具体表现形式参考 Props 表格。

```html
<c-row class="custom-grid-example custom-grid-row" justify="end">
  <c-col :span="2">A</c-col>
  <c-col :span="2">B</c-col>
  <c-col :span="2">C</c-col>
</c-row>

<style>
  .custom-grid-row {
    grid-template-columns: repeat(12, 30px);
  }
</style>
```

## 垂直对齐

使用 `align` 属性设置垂直方向的布局行为。

```html
<c-row class="custom-grid-example" align="center" style="height:200px;">
  <c-col :span="3">
    <div style="height:100px;">span 3</div>
  </c-col>
  <c-col :span="3">
    <div style="height:60px;">span 3</div>
  </c-col>
  <c-col :span="3">
    <div style="height:120px;">span 3</div>
  </c-col>
  <c-col :span="3">
    <div style="height:150px;">span 3</div>
  </c-col>
</c-row>
```

## Order

动态改变盒子的展示顺序（ascending）。

> 使用 `order` 会导致 DOM 结构和实际展示不符，导致潜在的无障碍（accessibility）问题。

```html
<c-row class="custom-grid-example">
  <c-col :order="1">1</c-col>
  <c-col>2</c-col>
  <c-col :order="-1">3</c-col>
</c-row>
```

## 响应式布局

响应式字段的对应的屏幕尺寸，如下所示：

| 字段 | 屏幕尺寸        |
| ---- | --------------- |
| xs   | < 600px         |
| sm   | 600px ~ 960px   |
| md   | 960px ~ 1200px  |
| lg   | 1200px ~ 1920px |
| xl   | 1920px ~ 2560px |
| xxl  | > 2560px        |

通过传入 类 `props` 的 `object` ，可以实现分别响应式控制 `c-row` 和 `c-col` 的表现形式。

> `object` 的配置信息，参考 Props 表格。

> 本着移动优先的原则，当视口尺寸和设置的 `prop` 不能匹配时，（例如当前视口是 `'lg'`，但只配置了 `:span={ sm: 6 }`），会尝试向下（尺寸更小的方向）匹配（`'lg'` 会匹配到 `'sm'` 的配置）。
>
> 推荐至少填写 `xs`，以保证小屏幕下的适配。

```html
<c-row
  class="custom-grid-example"
  gutter="5px"
  :sm='{ gutter: "2px" }'
  :lg='{ gutter: "10px " }'
  :xxl='{ gutter: "18px" }'
>
  <c-col
    :xs="{ span: 12 }"
    :sm="{ span: 6 }"
    :xl="{ span: 3 }"
    :xxl="{ span: 2 }"
  >
    1
  </c-col>
  <c-col
    :xs="{ span: 12 }"
    :sm="{ span: 6 }"
    :xl="{ span: 3 }"
    :xxl="{ span: 2 }"
  >
    2
  </c-col>
  <c-col
    :xs="{ span: 12 }"
    :sm="{ span: 6 }"
    :xl="{ span: 3 }"
    :xxl="{ span: 2 }"
  >
    3
  </c-col>
</c-row>
```

## <i></i> Props

### Row

| Name    | Description                                                                                                                    | Type                                                    | Required | Default        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | -------- | -------------- |
| gutter  | 列间距。可取 CSS 中有效的长度，比如 `1px` `1em` `6%` 。                                                                        | `string`                                                | `false`  | -              |
| justify | 控制子元素在水平方向的分布方式。取值参考 [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)。 | `string`                                                | `false`  | `'flex-start'` |
| align   | 控制子元素在垂直方向的对齐方式。取值参考 [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)。         | `string`                                                | `false`  | `'stretch'`    |
| xs      | 响应式 row。响应式调整 `gutter`，`justify` 以及 `align`。                                                                      | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |
| sm      | 同上                                                                                                                           | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |
| md      | 同上                                                                                                                           | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |
| lg      | 同上                                                                                                                           | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |
| xl      | 同上                                                                                                                           | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |
| xxl     | 同上                                                                                                                           | `{ gutter?: string; justify?: string; align?: string }` | `false`  | -              |

### Col

| Name  | Description                                                                                | Type                                                            | Required | Default |
| ----- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | -------- | ------- |
| span  | 指定该列所占栅格数。取值范围 0-12。                                                        | `number`                                                        | `false`  | `1`     |
| start | 指定该列从几个栅格开始。取值范围 0-12。                                                    | `number`                                                        | `false`  | -       |
| order | 调整该列的在水平方向的顺序。                                                               | `number`                                                        | `false`  | -       |
| xs    | 响应式 col。为 `number` 类型时表示 `span` 值，为 `object` 类型时可以分别指定其他属性的值。 | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
| sm    | 同上                                                                                       | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
| md    | 同上                                                                                       | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
| lg    | 同上                                                                                       | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
| xl    | 同上                                                                                       | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
| xxl   | 同上                                                                                       | `number` \| `{ span?: number; start?: number; order?: number }` | `false`  | -       |
