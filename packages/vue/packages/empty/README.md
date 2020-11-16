---
group: Data 数据展示
---

# Empty 空状态

## 定义

空状态通常在初次使用、完成或清空内容、软件出错等情境下出现的页面状态。

## 使用场景

- 页面无数据、用户未进行操作、用户操作结果、出错。
- 空状态应该达成三个目标：教育用户、取悦用户、引导用户。每个空状态都有其核心需要达成的目标。

## 基础样式

提供两种尺寸，中号用于卡片容器级加载，大号用于页面级加载。
默认为中号。

```html
<c-row>
  <c-col :span="6"><c-empty /></c-col>
  <c-col :span="6"><c-empty size="large" /></c-col>
</c-row>
```

## 自定义图片和文字

```html
<c-empty
  size="large"
  img-url="https://p2.ssl.qhimg.com/d/inn/b8c9e688/null.png"
>
  <div slot="description">
    <p>您当前还没有项目。</p>
    <c-button size="small" type="primary">
      <c-icon-plus />
      立即创建
    </c-button>
  </div>
</c-empty>
```

## Props

| Name        | Description    | Type                | Required | Default      |
| ----------- | -------------- | ------------------- | -------- | ------------ |
| size        | 尺寸           | `string`            | `false`  | -            |
| description | 描述内容       | `string` \| `vnode` | `false`  | `'暂无数据'` |
| img-style   | 图片样式       | `object`            | `false`  | -            |
| img-url     | 自定义图片地址 | `string`            | `false`  | -            |
