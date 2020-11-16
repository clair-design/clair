---
group: Basic 基础
---

# Tooltip 文字提示

## 定义

简单的文字提示框。

## 使用场景

鼠标 hover 出现提示，移走则提示消失。

## 基础样式

简单的文字提示。

```html
<c-tooltip content="一段文字提示内容">
  <span class="tooltip-trigger">移入鼠标查看提示</span>
</c-tooltip>

<style>
  .tooltip-trigger {
    color: #006bff;
  }
</style>
```

## 提示位置

根据使用场景，提供 12 种不同方向。

```html
<div class="demo-placement">
  <div v-for="(item, key) in directions" :class="key" :key="key">
    <c-tooltip
      v-for="dir in item"
      :key="dir[0]"
      :placement="dir[0]"
      content="深院静，小庭空。"
    >
      <c-button>{{dir[1]}}</c-button>
    </c-tooltip>
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

<style scoped>
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
    width: 120px;
    line-height: 3;
  }
  .right {
    float: right;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .right {
    text-align: right;
  }
</style>
```

## 不同的触发形式

通过 `trigger` 属性可以改变触发方式，其默认值为 `['hover', 'focus']`。

```html
<template>
  <div class="demo-tooltip-trigger">
    <c-tooltip>
      <c-button>default</c-button>
      <template v-slot:content>
        <div>深院静，小庭空，断续寒砧断续风。</div>
      </template>
    </c-tooltip>

    <c-tooltip trigger="hover">
      <c-button>hover</c-button>
      <template v-slot:content>
        <div>深院静，小庭空，断续寒砧断续风。</div>
      </template>
    </c-tooltip>

    <c-tooltip trigger="focus">
      <c-button>focus</c-button>
      <template v-slot:content>
        <div>深院静，小庭空，断续寒砧断续风。</div>
      </template>
    </c-tooltip>

    <c-tooltip trigger="click">
      <c-button>click</c-button>
      <template v-slot:content>
        <div>深院静，小庭空，断续寒砧断续风。</div>
      </template>
    </c-tooltip>

    <c-tooltip :trigger="['hover', 'focus']">
      <c-button>hover/focus</c-button>
      <template v-slot:content>
        <div>深院静，小庭空，断续寒砧断续风。</div>
      </template>
    </c-tooltip>
  </div>
</template>

<style scoped>
  .demo-tooltip-trigger .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## 控制显示状态

组件内部默认维护了一个控制显示隐藏的状态。当然，你也可以通过 `visible` 属性自行控制。

```html
<template>
  <c-tooltip
    :visible="true"
    placement="right"
    content="深院静，小庭空，断续寒砧断续风。"
  >
    <c-button>visible</c-button>
  </c-tooltip>
</template>
```

## 事件与状态同步

当 tooltip 的展示状态发生变化时（理论上），我们会向外 emit 一个 `visibility-change` 事件。

```html
<template>
  <c-tooltip
    :visible="visible"
    content="深院静，小庭空，断续寒砧断续风。"
    @visibility-change="onVisibilityChange"
  >
    <c-button style="width: 180px;">
      tooltip {{visible ? 'visible' : 'invisible' }}
    </c-button>
  </c-tooltip>
</template>

<script>
  export default {
    data() {
      return { visible: false }
    },

    methods: {
      onVisibilityChange({ detail: { visible } }) {
        this.visible = visible
      }
    }
  }
</script>
```

另外，还可以使用 `sync` 修饰符实现状态自动同步。

```html
<template>
  <c-tooltip :visible.sync="visible" content="深院静，小庭空，断续寒砧断续风。">
    <c-button style="width: 180px;">
      tooltip {{visible ? 'visible' : 'invisible' }}
    </c-button>
  </c-tooltip>
</template>

<script>
  export default {
    data() {
      return { visible: false }
    }
  }
</script>
```

## 自定义 tooltip 内容

在多数场景下，为 `content` 属性设置字符串就够用了。但实际上，也可以传入 `VNode`。

```html
<c-tooltip :content="vnode">
  <c-button>using vnode</c-button>
</c-tooltip>

<script>
  export default {
    computed: {
      vnode() {
        const h = this.$createElement
        return h(
          'span',
          {
            style: { fontSize: '12px', color: '#75C936' }
          },
          '使用 VNode 传入的内容'
        )
      }
    }
  }
</script>
```

如果你觉得使用 `VNode` 还是不够灵活，也可以使用 `slot`。

```html
<template>
  <c-tooltip>
    <c-button>using slot</c-button>
    <template v-slot:content>
      <span>
        深院静，小庭空，断续寒砧断续风。
        <a href="/" target="_blank" style="color:#398CFF">查看详情</a>
      </span>
    </template>
  </c-tooltip>
</template>
```

## 自定义样式

可以通过 `customStyle` 和 `customClass` 为 tooltip 的 DOM 元素设置样式。

```html
<template>
  <c-tooltip
    :custom-style="{ color: '#FE5A52' }"
    custom-class="custom-tooltip-example"
  >
    <c-button>using scopedSlot</c-button>
    <template v-slot:content>
      <span>深院静，小庭空，断续寒砧断续风。</span>
    </template>
  </c-tooltip>
</template>
```

## 自定义延时

可以通过 `showDelay` `hideDelay` 分别设置显示、隐藏两种状态时的延时时间（毫秒）。默认值均为 100 ms。

```html
<div class="demo-delay">
  <c-tooltip content="深院静，小庭空，断续寒砧断续风。">
    <c-button>default</c-button>
  </c-tooltip>

  <c-tooltip
    :show-delay="300"
    :hide-delay="300"
    content="深院静，小庭空，断续寒砧断续风。"
  >
    <c-button>延时 300ms</c-button>
  </c-tooltip>
</div>

<style scoped>
  .demo-delay .c-button + .c-button {
    margin-left: 20px;
  }
</style>
```

## Props

| Name          | Description                  | Type                                                                                                                                                                                           | Required | Default              |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| content       | tooltip 的文字内容           | `string` \| `vnode`                                                                                                                                                                            | `false`  | -                    |
| placement     | 位置                         | `'top'` \| `'right'` \| `'bottom'` \| `'left'` \| `'top-left'` \| `'top-right'` \| `'right-top'` \| `'right-bottom'` \| `'bottom-right'` \| `'bottom-left'` \| `'left-bottom'` \| `'left-top'` | `false`  | `'top'`              |
| visible       | 展示状态，支持 `sync` 修饰符 | `boolean`                                                                                                                                                                                      | `false`  | -                    |
| trigger       | 触发形式                     | `'hover'` \| `'click'` \| `'focus'` \| `Array<'hover'`\|`'click'`\|`'focus'>`                                                                                                                  | `false`  | `['hover', 'focus']` |
| show-delay    | 出现延时，毫秒               | `number`                                                                                                                                                                                       | `false`  | `100`                |
| hide-delay    | 消失延时，毫秒               | `number`                                                                                                                                                                                       | `false`  | `100`                |
| custom-class  | 自定义类名                   | `string`                                                                                                                                                                                       | `false`  | -                    |
| custom-style  | 自定义样式                   | `object`                                                                                                                                                                                       | `false`  | -                    |
| append-target | 插入 tooltip 的容器元素      | `Element`                                                                                                                                                                                      | `false`  | `document.body`      |

## Events

| Event Name        | Description                    | Parameters                         |
| ----------------- | ------------------------------ | ---------------------------------- |
| visibility-change | tooltip 展示状态发生变化时触发 | `{ detail: { visible: boolean } }` |

## Slots

| Name    | Description                             |
| ------- | --------------------------------------- |
| content | tooltip 内容，优先级高于 `content` prop |

<!--
## <i></i>Methods

| Method | Description                     | Parameters |
| ------ | ------------------------------- | ---------- |
| clear  | Used to manually clear the form | -          | -->
