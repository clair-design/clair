---
title: Popover 气泡弹出框
group: Basic 基础
---

# Popover 气泡弹出框

## 定义

可以承载一切元素的气泡弹出框

## 使用场景

用法基本与 `tooltip` 一致，不过与之相比，不仅仅可以承载一定的文字，还可以发挥创造力，满足更高级的基于弹出方式的交互形式。

## 触发方式

默认触发方式为点击和聚焦，可根据使用场景分别定义三种不同触发方式：鼠标悬浮、点击、聚焦。亦或者将 trigger 设置为 `none`，通过变量控制气泡展示。

Popover 组件的`默认 slot`必须设定，且只能有单一根节点，否则可能会带来预期之外的效果。

```html
<template>
  <div class="popover-basic-demo">
    <c-popover
      :custom-class="customClass"
      :content="content"
      placement="right-top"
      @after-leave="handleAfterLeave"
    >
      <c-button class="btn">默认trigger</c-button>
    </c-popover>
    <c-popover
      :custom-class="customClass"
      :content="content"
      trigger="hover"
      placement="bottom"
    >
      <c-button class="btn">trigger: hover</c-button>
    </c-popover>
    <c-popover :custom-class="customClass" trigger="click" placement="top-left">
      <template #content>
        <div>
          <div>
            标题
          </div>
          <div>
            {{content}}
          </div>
        </div>
      </template>
      <c-button class="btn">trigger: click</c-button>
    </c-popover>
    <c-popover
      :custom-class="customClass"
      trigger="focus"
      placement="bottom-left"
    >
      <template #content>
        <div>
          <div>
            标题
          </div>
          <div>
            {{content}}
          </div>
        </div>
      </template>
      <c-button class="btn">trigger: focus</c-button>
    </c-popover>
    <c-popover
      :custom-class="customClass"
      trigger="none"
      v-model="visible"
      placement="bottom-left"
    >
      <template #content>
        <div>
          <div>
            标题
          </div>
          <div>
            {{content}}
          </div>
        </div>
      </template>
      <c-button>trigger: none</c-button>
    </c-popover>
    <c-button @click="visible = !visible">
      {{visible? '隐藏':'显示'}}Popover
    </c-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customClass: 'custom-popover-content',
        visible: false,
        content:
          'Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it.'
      }
    },
    methods: {
      handleAfterLeave() {
        console.log('after-leave')
      }
    }
  }
</script>

<style scoped>
  .popover-basic-demo .c-button {
    margin: 10px;
  }
</style>
```

## 高级用法

使用 slots，使 Popover 承载更复杂的内容元素。

一般地，Popover 高宽会根据内容进行自适应，当您不方便规定内容的高宽，并且想将其内容区域折叠展示时，可使用`custom-style`或`custom-class`来规定 Popover 的高、宽，或者最大高、最大宽等，见下方示例。

```html
<template>
  <div>
    <c-popover
      :custom-class="customClass"
      placement="top-left"
      trigger="click"
      v-model="visible"
    >
      <c-button type="danger">确认删除</c-button>
      <template v-slot:content>
        <h4>确认删除此项？</h4>
        <div style="margin-top: 16px;">
          <c-button
            type="default"
            size="small"
            @click="visible=false"
            style="margin-right: 8px;"
          >
            取消
          </c-button>
          <c-button type="primary" size="small" @click="visible=false">
            确定
          </c-button>
        </div>
      </template>
    </c-popover>
  </div>
  <div style="margin-top: 20px">
    <c-popover
      :custom-class="customClass"
      :content="content"
      placement="right"
      :custom-style="{ minWidth: '50px' }"
    >
      <c-checkbox>选项</c-checkbox>
      <template v-slot:content>
        <c-table :columns="columns" :data-source="dataSource"></c-table>
      </template>
    </c-popover>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customClass: 'custom-popover-content',
        visible: false,
        content:
          'Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it.',
        dataSource: [
          { type: '直接访问', pv: 13, uv: 9, ip: 8 },
          { type: '搜索引擎', pv: 11, uv: 7, ip: 6 },
          { type: '外部网站', pv: 32, uv: 27, ip: 22 }
        ],
        columns: [
          { title: '来源类型', prop: 'type' },
          { title: '浏览量', prop: 'pv' },
          { title: '访客数', prop: 'uv' },
          { title: 'IP 数', prop: 'ip' }
        ]
      }
    }
  }
</script>
```

## 动画与展示延迟

可以自定义 Vue transition，将其传入 transition 字段即可，或者将此字段设为`none`，气泡展示会变为无动画状态。

```html
<template>
  <c-popover
    :custom-class="customClass"
    :content="content"
    placement="top-left"
    transition="none"
  >
    <c-checkbox>选项3</c-checkbox>
  </c-popover>
  <c-popover
    :custom-class="customClass"
    :content="content"
    placement="top-left"
    :show-delay="1000"
    :hide-delay="1000"
  >
    <c-checkbox>选项4</c-checkbox>
  </c-popover>
</template>
<script>
  export default {
    data() {
      return {
        customClass: 'custom-popover-content',
        content:
          'Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it.'
      }
    }
  }
</script>
```

## 事件

当气泡框的可见性发生变化时，会触发`visibility-change`事件。

```html
<template>
  <c-popover
    :custom-class="customClass"
    :content="content"
    placement="top-left"
    transition="none"
    @visibility-change="onVisibilityChange"
  >
    <span>
      是否可见：
      <c-tag color="orange">{{isVisible}}</c-tag>
    </span>
  </c-popover>
</template>
<script>
  export default {
    data() {
      return {
        customClass: 'custom-popover-content',
        content:
          'Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it.',
        isVisible: false
      }
    },
    methods: {
      onVisibilityChange(e) {
        console.log('onVisibilityChange', e.detail.visible)
        this.isVisible = !!e.detail.visible
      }
    }
  }
</script>
```

## Props

| Name            | Description                                            | Type                                                                                                                                                                                           | Required | Default              |
| --------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| visible/v-model | Popover 气泡框是否可见                                 | `boolean`                                                                                                                                                                                      | `false`  | -                    |
| content         | 内容，如果规定了名为 `content` 的 slot，此属性会被忽略 | `string`                                                                                                                                                                                       | `false`  | -                    |
| trigger         | 触发方式，设为`none`时不主动触发                       | `'hover'` \| `'click'` \| `'focus'` \| `'none'` \| `Array<'hover'`\|`'click'`\|`'focus'>`                                                                                                      | `false`  | `['hover', 'focus']` |
| placement       | 出现位置，参考 tooltip 组件                            | `'top'` \| `'right'` \| `'bottom'` \| `'left'` \| `'top-left'` \| `'top-right'` \| `'right-top'` \| `'right-bottom'` \| `'bottom-right'` \| `'bottom-left'` \| `'left-bottom'` \| `'left-top'` | `false`  | `top`                |
| custom-class    | Popover 气泡框的自定义类名                             | `string` \| `Array` \| `object`                                                                                                                                                                | `false`  | -                    |
| custom-style    | Popover 气泡框的自定义 style                           | `object`                                                                                                                                                                                       | `false`  | -                    |
| transition      | 动画方式，设置为`none`，Popover 的出入场动画会被取消   | `string`                                                                                                                                                                                       | `false`  | `c-popover-fade`     |
| show-delay      | trigger 为非`none`时的显示延迟，单位为毫秒             | `number`                                                                                                                                                                                       | `false`  | `0`                  |
| hide-delay      | trigger 为非`none`时的关闭延迟，单位为毫秒             | `number`                                                                                                                                                                                       | `false`  | `100`                |
| append-target   | 插入 Popover 的容器元素                                | `Element`                                                                                                                                                                                      | `false`  | `document.body`      |

## Events

| Event Name        | Description                             | Parameters                        |
| ----------------- | --------------------------------------- | --------------------------------- |
| visibility-change | 当前 Popover 气泡框可见性发生变化时触发 | `{ detail: { visible: boolean }}` |
| after-enter       | 显示动画播放完毕后触发                  | -                                 |
| after-leave       | 隐藏动画播放完毕后触发                  | -                                 |

## Slots

| Name    | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| content | Popover 气泡框内容，若规定了此 slot，组件的 `content` 属性会被忽略      |
| default | 触发 Popover 气泡框的元素，如果不规定此 slot，则 Popover 气泡框无法展示 |
