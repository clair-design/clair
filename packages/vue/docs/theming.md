---
title: 定制主题
group: Basic 基础
---

# 定制主题

Clair design 默认使用蓝色系的配色，可以使用在大部分场合使用。未来，我们还会增加几种内置的配色。

我们使用 SASS 变量来定制系统配色。你可以写一个自定义的 SASS 变量文件来覆盖默认的配色、尺寸等样式。

```sass
// 主题色
$--primary-color: #006bff;
// 成功色
$--success-color: #52b818;
// 警告色
$--warning-color: #fea119;
// 危险操作颜色
$--danger-color: #f84e44;
```
