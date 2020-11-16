---
title: Notification 通知
group: Basic 基础
---

# Notification 通知

## 定义

全局展示操作反馈信息。

## 使用场景

在系统四个角显示通知提醒信息。一般应用于以下场景：

1. 较为复杂的通知内容。
2. 带有交互的通知，给出用户下一步的行动点。
3. 系统主动推送。

## 基础样式

从屏幕边角滑出，4.5 秒后自动关闭。

```html
<c-button type="default" @click="open('')">默认提示</c-button>
<c-button type="default" @click="open('info')">信息提示</c-button>
<c-button type="success" @click="open('success')">成功提示</c-button>
<c-button type="danger" @click="open('danger')">失败提示</c-button>
<c-button type="warning" @click="open('warning')">警告提示</c-button>

<script>
  export default {
    methods: {
      open(type) {
        this.$notification({
          title: '通知',
          description:
            '我是一条通知。此处是一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。',
          type
        })
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

## 自定义消失时间

设置 `duration` 可以指定通知多长时间后自动消失，单位为毫秒。当 `duration` 设置为 `0` 时，通知不主动消失，用户点击关闭才能消失。

```html
<c-button @click="open(10000)">10 秒后关闭</c-button>
<c-button @click="open(0)">不自动关闭</c-button>

<script>
  export default {
    methods: {
      open(duration) {
        const description =
          duration === 0
            ? '不自动关闭的通知。此处是一系列信息描述，可能会很长，也可以很短。'
            : '10 秒后自动关闭的通知。此处是一系列的信息描述，可能会很长，也可以是很短。'
        this.$notification({
          title: '通知',
          description,
          duration
        })
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

## 自定义方位

默认出现在右上角，可设置 `placement` 属性，修改通知出现的方位。

```html
<c-button @click="open('top-right')">右上角</c-button>
<c-button @click="open('bottom-right')">右下角</c-button>
<c-button @click="open('top-left')">左上角</c-button>
<c-button @click="open('bottom-left')">左下角</c-button>

<script>
  export default {
    methods: {
      open(placement) {
        this.$notification({
          title: '通知',
          type: 'info',
          description: `我是一条通知，展示在 ${placement}。此处是一系列信息描述。`,
          placement
        })
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

## <i></i> 不含标题或内容

自定义`title`为空，即可不展示标题。自定义`description`为空，即可不展示内容。

```html
<c-button primary @click="openNotification1">不含标题</c-button>
<c-button primary @click="openNotification2">只含标题</c-button>

<script>
  export default {
    methods: {
      openNotification1() {
        this.$notification({
          type: 'danger',
          description: '我是一条不含标题、只含内容的提示。'
        })
      },
      openNotification2() {
        this.$notification({
          type: 'info',
          title: '只含标题、不含内容的提示。'
        })
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

## <i></i> 使用 HTML 片段

将`dangerouslySetInnerHTML`设置为 true，即可将`description`作为 HTML 片段。

```html
<c-button primary @click="openNotification">使用HTML片段</c-button>

<script>
  export default {
    methods: {
      openNotification() {
        this.$notification({
          description:
            '<span style="color: #f84e44">我是一条HTML片段，请谨慎使用。</span>',
          type: 'danger',
          dangerouslySetInnerHTML: true
        })
      }
    }
  }
</script>
```

> 为避免 XSS 攻击，请确保传入 description 的 HTML 片段是可信的。

## 使用 Vue Component

```html
<template>
  <c-button @click="open">使用 component</c-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$notification({
          description: {
            template: `<div>Component</div>`
          }
        })
      }
    }
  }
</script>
```

> 仅 `description` 支持使用 Vue Component。

> 开发环境中，想使用 `template` 方式，请注意选择正确的 [vue 构建版本](https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds)

## Options

| Name                    | Description                       | Type                                                                 | Required | Default       |
| ----------------------- | --------------------------------- | -------------------------------------------------------------------- | -------- | ------------- |
| title                   | 通知标题                          | `string`                                                             | `false`  | -             |
| description             | 通知内容                          | `string` \| `Vue Component Object`                                   | `true`   | -             |
| duration                | 消息显示时间（`ms`）              | `number`                                                             | `false`  | `4500`        |
| type                    | 类型                              | `'success'` \| `'warning'` \| `'error'` \| `'info'`                  | `false`  | `'info'`      |
| placement               | 方位                              | `'top-right'` \| `'top-left'` \| `'bottom-right'` \| `'bottom-left'` | `false`  | `'top-right'` |
| dangerouslySetInnerHTML | 是否将 description 作为 HTML 片段 | `boolean`                                                            | `false`  | `false`       |
| onClose                 | 点击关闭按钮时触发的回调函数      | `(e: Event) => void`                                                 | `false`  | -             |
| onClick                 | 点击通知时触发的回调函数          | `(e: Event) => void`                                                 | `false`  | -             |
| customClass             | 自定义类名                        | `string` \| `Array<string`\|`object>` \| `object`                    | `false`  | -             |
| customStyle             | 自定义样式                        | `object`                                                             | `false`  | -             |

## 全局方法

### 关闭全部消息

调用 `this.$notification.closeAll()` 可以关掉所有 notification。

```html
<c-button primary @click="openNotifications">展开十条通知</c-button>
<c-button primary @click="closeAll">关闭全部</c-button>

<script>
  export default {
    methods: {
      openNotifications() {
        let i = 10
        while (i > 0) {
          this.$notification({
            title: '通知',
            description: '我是一条长相标准的提示。',
            type: 'info',
            duration: 0
          })
          i--
        }
      },
      closeAll() {
        this.$notification.closeAll()
      }
    }
  }
</script>
```
