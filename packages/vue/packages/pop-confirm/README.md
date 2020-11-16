---
title: PopConfirm 气泡确认框
group: Basic 基础
---

# PopConfirm 气泡确认框

## 定义

通过点击/鼠标移入元素，触发气泡确认框。

## 使用场景

当目标元素需要进一步描述和相关操作时，通过气泡弹出框进行展现。 用户可以对浮层上的元素进行操作，例如链接、按钮等。

## 基础样式

默认触发方式为点击/聚焦，可根据使用场景分别定义三种不同触发方式：鼠标悬浮、点击、聚焦。

```html
<c-popConfirm :content="content" placement="top-left">
  <c-button class="btn">默认触发</c-button>
</c-popConfirm>
<c-popConfirm :content="content" trigger="hover" placement="bottom">
  <c-button class="btn">Hover 触发</c-button>
</c-popConfirm>
<c-popConfirm :content="content" trigger="click" placement="top-left">
  <c-button class="btn">Click 触发</c-button>
</c-popConfirm>
<c-popConfirm :content="content" trigger="focus" placement="bottom-left">
  <c-button class="btn">Focus 触发</c-button>
</c-popConfirm>

<script>
  export default {
    data() {
      return {
        content:
          'Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it.'
      }
    }
  }
</script>

<style scoped>
  .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## 确认框显示位置

```html
<div class="demo-placement">
  <div v-for="(item, key) in directions" :class="key" :key="key">
    <c-popConfirm
      v-for="dir in item"
      :key="dir[0]"
      :placement="dir[0]"
      :content="`这是一条${dir[1]}的确认框。`"
    >
      <c-button>{{dir[1]}}</c-button>
    </c-popConfirm>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        directions: {
          top: [
            ['top-left', '上左'],
            ['top', '上边'],
            ['top-right', '上右']
          ],
          left: [
            ['left-top', '左上'],
            ['left', '左边'],
            ['left-bottom', '左下']
          ],
          right: [
            ['right-top', '右上'],
            ['right', '右边'],
            ['right-bottom', '右下']
          ],
          bottom: [
            ['bottom-left', '下左'],
            ['bottom', '下边'],
            ['bottom-right', '下右']
          ]
        }
      }
    }
  }
</script>

<style>
  .demo-placement {
    width: 500px;
  }

  .demo-placement .c-button {
    margin: 10px;
  }

  .top {
    text-align: center;
  }

  .left,
  .right {
    float: left;
    width: 100px;
    line-height: 3;
  }
  .right {
    float: right;
  }

  .bottom {
    clear: both;
    text-align: center;
  }
</style>
```

## 自定义确认框

可通过 `slot="content"` 自定义确认框内容，通过 `slot="footer"` 自定义确认框底部。

```html
<template>
  <c-pop-confirm ref="popconfirm">
    <c-button>自定义</c-button>
    <template #content>
      <div>
        确定要删除该项目吗？
      </div>
    </template>
    <template #footer>
      <div class="test">
        <c-button @click="onConfirm" size="small" type="danger">
          确认删除
        </c-button>
        <c-button @click="onCancel" size="small">取消</c-button>
      </div>
    </template>
  </c-pop-confirm>
</template>

<style>
  .colored h2 {
    color: #a36e0d;
    border-bottom: 1px solid;
    line-height: 2;
    margin-bottom: 0;
  }
  .colored p {
    color: #bc841c;
  }
</style>

<script>
  export default {
    methods: {
      onConfirm(e) {
        this.$refs.popconfirm.confirmHandler(e)
        this.$notification({
          type: 'success',
          description: '删除成功！'
        })
      },
      onCancel(e) {
        this.$refs.popconfirm.cancelHandler(e)
      }
    }
  }
</script>
```

## 接收回调

在确认框展示或隐藏时，会触发 `visibility-change` 事件。 点击确认或取消按钮后，也会相应的触发 `confirm` 和 `cancel` 事件。

```html
<c-popConfirm
  content="确认弹出框内容"
  placement="right"
  @confirm="handleConfirm"
  @cancel="handleCancel"
  @visibility-change="handleChange"
>
  <c-button>点击打开确认框</c-button>
</c-popConfirm>

<script>
  export default {
    methods: {
      handleCancel() {
        this.$notification({
          type: 'info',
          description: '你点击了取消'
        })
      },
      handleConfirm() {
        this.$notification({
          type: 'info',
          description: '你点击了确认'
        })
      },
      handleChange({ detail: { visible } }) {
        const description = visible ? '显示弹出框' : '隐藏弹出框'
        this.$notification({
          type: 'info',
          description
        })
      }
    }
  }
</script>
```

## Props

| Name            | Description                | Type                                                                                                                                                                                           | Required | Default         |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| content         | 气泡内容                   | `string`                                                                                                                                                                                       | `true`   | -               |
| visible/v-model | 默认是否显示               | `boolean`                                                                                                                                                                                      | `false`  | `false`         |
| placement       | 悬浮位置                   | `'top'` \| `'right'` \| `'bottom'` \| `'left'` \| `'top-left'` \| `'top-right'` \| `'right-top'` \| `'right-bottom'` \| `'bottom-right'` \| `'bottom-left'` \| `'left-bottom'` \| `'left-top'` | `false`  | `'top'`         |
| trigger         | 触发显示方式               | `'hover'` \| `'click'` \| `'focus'`                                                                                                                                                            | `false`  | `click`         |
| show-delay      | 显示延迟                   | `number`                                                                                                                                                                                       | `false`  | `0`             |
| hide-delay      | 隐藏延迟                   | `number`                                                                                                                                                                                       | `false`  | `100`           |
| append-target   | 插入 PopConfirm 的容器元素 | `Element`                                                                                                                                                                                      | `false`  | `document.body` |

## Slots

| Name    | Description                         |
| ------- | ----------------------------------- |
| content | 气泡内容，优先级高于 `content` prop |
| footer  | 气泡底部内容                        |

## Events

| Event Name        | Description    | Parameters                         |
| ----------------- | -------------- | ---------------------------------- |
| visibility-change | 显示改变的回调 | `{ detail: { visible: boolean } }` |
| confirm           | 确认回调       | `{ nativeEvent: Event }`           |
| cancel            | 取消回调       | `{ nativeEvent: Event }`           |
