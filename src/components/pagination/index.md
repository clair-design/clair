---
title: Pagination
route: /component/pagination
layout: component
---

# 分页 - Pagination

`c-pagination`提供带有展示页码的分页组件，默认从第一页开始。

## 基础用法

通过 `total` 属性指定总条数，默认每页 20 条。

```html
<c-pagination :total="1160" />
```
### 高级用法

* **span**：当页码太多时，我们希望省略显示一部分页码，只显示当前页码前后的几个页码及起始和结束页码即可。`span`提供此功能，默认为`3`，即除了起始页码和结束页码，当前页码前后最多显示3个页码。

下面这个例子，是设置`total=200`、`pn=13`、`ps=10`、`span=2`时的显示
```html
<c-pagination :total="200" :pn="13" :ps="10" :span="2"></c-pagination>
```

### 事件

* **change**：切换页面时，触发该事件。一般用来异步获取当前页数据。

```html
<c-pagination :total="200" :pn="pn" :ps="10" @change="getPageData"></c-pagination>

<script>
  export default {
    data() {
      return {
        pn: 1
      }
    },
    methods: {
      getPageData(pn) {
        this.pn = pn || 1;  //此处需要手动更新pn
        // Ajax 获取 pn 页的数据
        alert(`获取第${this.pn}页数据。`);
      }
    }
  }
</script>
```
