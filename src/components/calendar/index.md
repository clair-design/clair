---
title: Calendar
layout: component
route: /component/calendar
---

# Calendar 日历

以卡片日历的形式进行数据展现，支持月份的选择

## 基本展现


```html
<c-calendar />
```


## 日期限制

通过`value`可以传入默认显示的日期，`minDate`和`maxDate`可以对日期的选择进行限制， `pattern`指定返回的日期格式

```html
<c-calendar
  :value="'2017-9-15'"
  :maxDate="'2018-8-15'"
  :minDate="'2017-8-15'"
  @update="dateChange"
  :pattern="'yyyy/MM/dd'"
>
</c-calendar>

<script>
export default {
  methods: {
    dateChange (date) {
      alert('您选择的日期是：' + date)
    }
  }
}
</script>
```
