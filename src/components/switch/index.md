---
title: Switch
route: /component/switch
layout: component
---

# 开关 - Switch
用于状态间的切换，作为开关使用。


## 基本用法

```html
<c-switch></c-switch>
```

## 设置自定义颜色
通过`checkedColor`属性，自定义`checked`状态颜色，通过`uncheckedColor`属性，自定义`unchecked`状态颜色。
```html
<c-switch
  checkedColor="#C7543A"
  uncheckedColor="#E9CD4C"
></c-switch>
```

## 设置大小
通过设置`size`属性为`small`，定义小开关。

```html
<c-switch size="small"></c-switch>
```

## 禁止开关
通过设置`disabled`，禁止开关。

```html
<c-switch disabled></c-switch>
```

## 给开关传值
通过`checkedValue`属性和`uncheckedValue`属性，给开关传值。

```html
<c-switch
  @change="change"
  checkedColor="#00AA90"
  uncheckedColor="#E98B2A"
  checkedValue="倚栏杆处"
  uncheckedValue="正恁凝愁"
></c-switch>

<div style="margin-top: 10px">当前值：<span>{{ value }}</span></div>

<script>
export default {
  data () {
    return {
      value: "倚栏杆处"
    }
  },
  methods : {
    change (msg) {
      this.value = msg
    }
  }
}
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 | 可选值 |
|-----|------|-------|-----|-------|
| disabled | Boolean | false | 是否禁用 | true / false |
| size | String | - | 大小 | small / - |
| checkedColor | String | - | checked状态背景色 | - |
| uncheckedColor | String | - | unchecked状态背景色 | - |
| checkedValue | - | true | checked状态代表值 | - |
| uncheckedValue | - | false | unchecked状态代表值 | - |
