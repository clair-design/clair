---
title: Icon
layout: component
scrollTop: true
route: component/icon
---

# Icon

图标默认使用 [fontawsome](http://fontawesome.io/)。

> **注意**：
> 请自行引入 fontawsome CSS 文件，如：
> https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css

## Demo

```html
<p><c-icon name="s15"/> s15 (alias)</p>
<p><c-icon name="shower"/> shower</p>
<p><c-icon name="snowflake-o"/> snowflake-o</p>
<p><c-icon name="superpowers"/> superpowers</p>
<p><c-icon name="telegram"/> telegram</p>
<p><c-icon name="thermometer"/> thermometer (alias)</p>
```

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| type | String | 'fa' | 图标类型 |
| name | String | 无，必填 | 图标名称 |
