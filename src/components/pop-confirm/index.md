---
title: PopConfirm
route: /component/pop-confirm
layout: component
---

# 气泡确认框 PopConfirm

根据 `tip` 组件封装的气泡确认框。

## 在不同位置显示

```html
<c-pop-confirm v-for="pos in types" :key="pos" :position="pos" style="margin-right: 1em">
  <div slot="content">
    真的真的真的要删除我吗？
  </div>

  <c-button primary>{{pos}}</c-button>
</c-pop-confirm>

<script>
export default {
  data () {
    return {
      types: ['top', 'bottom', 'left', 'right']
    }
  }
}
</script>
```

## 自定义按钮文字

你还可以自定义确认按钮和取消按钮的文字 ——

```html
<c-pop-confirm ok-text="参与活动" cancel-text="放弃">
  <div slot="content">
    参加活动，成为最炫锦鲤~
  </div>

  <c-button primary>点我</c-button>
</c-pop-confirm>
```

## 事件

点击确认按钮和取消按钮将分别触发 `confirm` 和 `cancel` 事件。

```html
<c-pop-confirm
  ok-text="参与活动"
  cancel-text="放弃"
  @cancel="handleCancel"
  @confirm="handleConfirm"
>
  <div slot="content">
    参加活动，成为最炫锦鲤~
  </div>

  <c-button primary>点我</c-button>
</c-pop-confirm>

<script>
export default {
  methods: {
    handleCancel () {
      this.$warning('真可惜，与一个亿擦肩而过..')
    },
    handleConfirm () {
      this.$success('下一个锦鲤就是你！')
    }
  }
}
</script>
```

## 方法调用

在某些情况下，还可以手动调用 PopConfirm 实例上面的 `hide` 和 `show` 方法。

下面的例子展示了如何通过 `blur` 和 `focus` 事件实现 PopConfirm 的隐藏和显示。

```html
<c-pop-confirm
  ok-text="参与活动"
  cancel-text="放弃"
  @cancel="handleCancel"
  @confirm="handleConfirm"
  ref="popconfirm"
>
  <div slot="content">
    参加活动，成为最炫锦鲤~
  </div>

  <a href="#" @focus="handleFocus" @blur="handleBlur">点我</a>
</c-pop-confirm>

<script>
export default {
  methods: {
    handleCancel () {
      this.$warning('真可惜，与一个亿擦肩而过..')
    },
    handleConfirm () {
      this.$success('下一个锦鲤就是你！')
    },
    handleFocus () {
      this.$refs.popconfirm.show()
    },
    handleBlur () {
      this.$refs.popconfirm.hide()
    }
  }
}
</script>
```

## API

| 属性 | 类型  |  说明 | 默认值 |
|-----|-------|------|-------|
| position | top \| right \| bottom \| left | 位置 | bottom |
| disabled | Boolean | 是否禁用 | false |
| okText |  String | 确认按钮文字 | 确定 |
| cancelText | String | 取消按钮文字 |  取消 |

## 事件

| 名称 |   说明   |
|-----|-----------|
| confirm |  点击确定按钮  |
| cancel |  点击取消按钮  |
