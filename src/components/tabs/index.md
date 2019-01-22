---
title: Tabs
route: /component/tabs
layout: component
---

# Tabs

页面内容器切换组件。

## 基础标签

给`<c-tabs>`设置属性`activeIndex`的值，可指定当前展示容器，默认值为1。

`activeIndex`的值不要超出`<c-tab-pane`的个数，否则重置该值为1。

```html
<c-tabs>
  <c-tab-pane label="Tab1">
    惜诵以致愍兮，发愤以抒情。<br>
    所作忠而言之兮，指苍天以为正。
  </c-tab-pane>
  <c-tab-pane label="Tab2">
    屈原既放，三年不得复见。<br>
    竭知尽忠而蔽障于谗。<br>
    心烦虑乱，不知所从。
  </c-tab-pane>
  <c-tab-pane label="Tab3">
    桂树丛生兮山之幽，偃蹇连蜷兮枝相缭。<br>
    山气巄嵷兮石嵯峨，溪谷崭岩兮水曾波。
  </c-tab-pane>
</c-tabs>
<br><br>
<c-tabs activeIndex="2">
  <c-tab-pane label="Tab1">
    惜诵以致愍兮，发愤以抒情。<br>
    所作忠而言之兮，指苍天以为正。
  </c-tab-pane>
  <c-tab-pane label="Tab2">
    屈原既放，三年不得复见。<br>
    竭知尽忠而蔽障于谗。<br>
    心烦虑乱，不知所从。
  </c-tab-pane>
  <c-tab-pane label="Tab3">
    桂树丛生兮山之幽，偃蹇连蜷兮枝相缭。<br>
    山气巄嵷兮石嵯峨，溪谷崭岩兮水曾波。
  </c-tab-pane>
</c-tabs>
```

## 自定义标签

通过添加`slot="label"`给标签添加自定义内容。

```html
<c-tabs>
  <c-tab-pane>
    <span slot="label">
      <c-icon name="video" size="1em" valign="middle"></c-icon>
      video
    </span>
    It's not what happens to you, but how you react to it that matters.
  </c-tab-pane>
  <c-tab-pane>
    <span slot="label">
      <c-icon name="sun" size="1em" valign="middle"></c-icon>
      sun
    </span>
    Be the type of person you want to meet.
  </c-tab-pane>
  <c-tab-pane>
    <span slot="label">
      <c-icon name="slack" size="1em" valign="middle"></c-icon>
      slack
    </span>
    Imagination is more important than knowledge. <br>
    Knowledge is limited. <br>
    Imagination encircles the world.
  </c-tab-pane>
</c-tabs>
```

## 使标签不可用
通过给`<c-tab-pane>`设置`disabled`，使当前标签页呈现不可点击状态。

```html
<c-tabs activeIndex="3">
  <c-tab-pane label="video">
    It's not what happens to you, but how you react to it that matters.
  </c-tab-pane>
  <c-tab-pane label="sun" disabled>
    Be the type of person you want to meet.
  </c-tab-pane>
  <c-tab-pane label="slack">
    Imagination is more important than knowledge. <br>
    Knowledge is limited. <br>
    Imagination encircles the world.
  </c-tab-pane>
</c-tabs>
```

## 标签位置
通过给`<c-tabs>`设置`position`值，更换标签位置。
```html
<div style="margin-bottom: 2em;">
  <c-radio-group
    :options="options"
    v-model="position"
    button
  />
</div>

<c-tabs :position="position" activeIndex="3">
  <c-tab-pane label="Tab1">
    惜诵以致愍兮，发愤以抒情。<br>
    所作忠而言之兮，指苍天以为正。
  </c-tab-pane>
  <c-tab-pane label="Tab2">
    屈原既放，三年不得复见。<br>
    竭知尽忠而蔽障于谗。<br>
    心烦虑乱，不知所从。
  </c-tab-pane>
  <c-tab-pane label="Tab3">
    桂树丛生兮山之幽，偃蹇连蜷兮枝相缭。<br>
    山气巄嵷兮石嵯峨，溪谷崭岩兮水曾波。
  </c-tab-pane>
</c-tabs>

<script>
export default {
  data(){
    return {
      position: 'top',
      options: [
        { label: 'top', value: 'top' },
        { label: 'bottom', value: 'bottom' },
        { label: 'left', value: 'left' },
        { label: 'right', value: 'right' }
      ]
    }
  }
}
</script>
```

## 事件捕捉
`@change`可捕捉触发切换标签事件。
```html
<c-tabs activeIndex="2" @change="onClick">
  <c-tab-pane label="video" disabled>
    It's not what happens to you, but how you react to it that matters.
  </c-tab-pane>
  <c-tab-pane label="sun">
    Be the type of person you want to meet.
  </c-tab-pane>
  <c-tab-pane label="slack">
    Imagination is more important than knowledge. <br>
    Knowledge is limited. <br>
    Imagination encircles the world.
  </c-tab-pane>
</c-tabs>

<script>
export default {
  methods: {
    onClick (value) {
      alert(`第${value}个标签，有幸被点...`)
    }
  }
}
</script>
```

## 选项卡形式标签
在`<c-tabs>`上设置`mode="card"`，更换为选项卡模式（不支持位置变换）。

```html
<c-tabs mode="card">
  <c-tab-pane label="九章">
    惜诵以致愍兮，发愤以抒情。<br>
    所作忠而言之兮，指苍天以为正。
  </c-tab-pane>
  <c-tab-pane label="卜居">
    屈原既放，三年不得复见。<br>
    竭知尽忠而蔽障于谗。<br>
    心烦虑乱，不知所从。
  </c-tab-pane>
  <c-tab-pane label="招隐士">
    桂树丛生兮山之幽，偃蹇连蜷兮枝相缭。<br>
    山气巄嵷兮石嵯峨，溪谷崭岩兮水曾波。
  </c-tab-pane>
</c-tabs>
```

## c-tabs属性说明

| 属性 | 类型 | 默认值 | 说明 | 可选值 |
|-----|------|-------|-----|-------|
| activeIndex | String | 1 | 当前展示项索引 | 1,2,3... |
| position | String | top | 标签位置 | top / bottom / left / right |
| mode | String | - | 标签形式 | - / 'card' |

## c-tabs事件说明

| 事件 | 类型 | 说明 | 回调参数 |
|-----|-----|-----|-------|
| change | Function(activeKey) {} | 切换tab时的回调 | 被选中标签的index值 |


## c-tab-pane属性说明

| 属性 | 类型 | 默认值 | 说明 | 可选值 |
|-----|------|-------|-----|-------|
| label | String | - | 标签页标题 | - |
| disabled | Boolean | false | 禁用某一项 | false / true |
