---
group: Basic 基础
---

# Message 消息提示

## 定义

全局展示操作反馈信息。

## 使用场景

可以提供全局的成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 基础样式

全局提示信息，信从顶部渐隐出现，3 秒后消失。

```html
<c-button @click="showMsg('info')">展示消息通知</c-button>

<script>
  export default {
    methods: {
      showMsg(type) {
        this.$message({
          type: 'info',
          message: '这是一条消息提示'
        })
      }
    }
  }
</script>
```

## 自定义延时

通过修改配置的 `duration` 字段可以实现自定义时长（单位 `ms`）。

```html
<c-button @click="showMsg">5 秒后消失的消息提示</c-button>

<script>
  export default {
    methods: {
      showMsg(type) {
        this.$message({
          type: 'info',
          duration: 5 * 1000,
          message: '这是一条消息提示，5 秒后消失'
        })
      }
    }
  }
</script>
```

## 不同的消息类型

通过 `type` 属性可以指定成功、失败等不同类型的消息提示。

```html
<c-button type="success" @click="showMsg('success')">成功提示</c-button>
<c-button type="warning" @click="showMsg('warning')">警示提示</c-button>
<c-button type="danger" @click="showMsg('error')">错误提示</c-button>

<script>
  export default {
    methods: {
      showMsg(type) {
        this.$message({
          type,
          message: '这是一条消息提示'
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

## 全局方法

在 Vue 组件中调用 `this.$message.config(option)`，可以实现对消息通知组件的全局配置。

```js
this.$message.config({
  top: '10%',
  zIndex: 9999,
  duration: 1500
})
```

> 针对 `zIndex`，可以通过 `{ zIndex: null }` 恢复成组件内部自动调整的状态。

调用 `this.$message.closeAll()` 可以关掉所有消息提示。

```html
<c-button @click="showMsg">展示十条消息</c-button>
<c-button @click="closeAll">关闭所有消息</c-button>

<script>
  export default {
    methods: {
      showMsg() {
        let i = 10
        while (i--) {
          this.$message({
            message: '这是一条消息提示'
          })
        }
      },
      closeAll() {
        this.$message.closeAll()
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

## Options

| Name                    | Description              | Type                                                | Required | Default  |
| ----------------------- | ------------------------ | --------------------------------------------------- | -------- | -------- |
| type                    | 类型                     | `'success'` \| `'warning'` \| `'error'` \| `'info'` | `false`  | `'info'` |
| duration                | 消息显示时间（`ms`）     | `number`                                            | `false`  | `3000`   |
| message                 | 消息内容                 | `string` \| `vnode`                                 | `true`   | -        |
| dangerouslySetInnerHTML | 是否将 message 作为 HTML | `boolean`                                           | `false`  | `false`  |
| customClass             | 自定义类名               | `string` \| `Array<string`\|`object>` \| `object`   | `false`  | -        |
| customStyle             | 自定义样式               | `object`                                            | `false`  | -        |
