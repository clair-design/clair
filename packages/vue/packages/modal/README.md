---
group: Basic 基础
---

# Modal 对话框

## 定义

对话框分为「系统对话框」和「用户对话框」：

- 系统对话框为容器组件，用于承载补充当前页面的一些交互、信息内容呈现。
- 用户对话框用于即时通讯，彼此交流信息的承载内容，内容一般包括文字、语音、视频和文件等。

## 使用场景

- **系统对话框**：使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。另外当需要一个简洁的确认框询问用户时，拥有较为复杂的表单、表格或其它数据内容。 带有交互的通知，给出用户下一步的行动点。最大宽度不超过 800px，最大高度不超过 600px，内容超过时出现纵向细滚动条。
- **用户对话框**：采用气泡形状，指向发言者头像，指明发言内容归属性。一般对话框伴随发言时间，如果连续发言交流，时间较为相近，可分时段标明时间。文件对话框内容包含文件类型 icon，文件名称，大小，接收/发送状态和速度自己和对方发言内容，利用不同气泡对话框颜色进行区分。

## 基础样式

最基本的系统对话框。

```html
<template>
  <c-button type="primary" @click="visible = true">打开对话框</c-button>

  <c-modal
    title="模态框标题"
    v-model="visible"
    width="520px"
    @close="eventHandler"
  >
    <div>
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
    </div>
  </c-modal>
</template>
<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      eventHandler(args) {
        console.log(args)
      }
    }
  }
</script>
```

## 销毁模式

设置`destroyAfterClose`，可关闭后销毁 Modal。

```html
<template>
  <c-button type="primary" @click="visible = true">打开对话框</c-button>

  <c-modal
    title="模态框标题"
    :visible="visible"
    width="520px"
    @cancel="visible = false"
    @confirm="visible = false"
    @close="visible = false"
    destroyAfterClose
  >
    <div>
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
      需要的模态框内容。
      <br />
    </div>
  </c-modal>
</template>
<script>
  export default {
    data() {
      return {
        visible: false
      }
    }
  }
</script>
```

## 确认对话框

系统确认对话框。

```html
<template>
  <c-button type="primary" @click="visible = true">删除数据</c-button>
  <c-button type="danger" @click="visible2 = true">二次确认</c-button>

  <c-modal
    title="模态框标题"
    :visible="visible"
    :center="false"
    width="520px"
    type="warning"
    light
    @cancel="visible = false"
    @confirm="visible = false"
    @close="visible = false"
  >
    <template v-slot>
      <div>
        删除当前数据。
        <br />
        删除当前数据。
      </div>
    </template>

    <template v-slot:header="vm">
      <div>{{ vm.title }}</div>
    </template>
  </c-modal>

  <c-modal
    title="标题"
    :visible="visible2"
    :center="false"
    width="520px"
    @cancel="visible2 = false"
    @confirm="visible3 = true"
    @close="visible2 = false"
  >
    <template v-slot>
      <div>
        取消当前操作。
        <br />
        取消当前操作。
        <br />
        取消当前操作。
        <br />
        取消当前操作。
        <br />
      </div>
    </template>

    <template v-slot:header="vm">
      <div>{{ vm.title }}</div>
    </template>
  </c-modal>

  <c-modal
    title="确认要取消当前操作吗？"
    :visible="visible3"
    width="520px"
    type="warning"
    light
    center
    @cancel="visible3 = false"
    @confirm="visible3 = false"
  >
    <template v-slot>
      <div>
        无法撤回，请谨慎操作。
        <a href="https://www.so.com/" target="_blank">详情</a>
      </div>
    </template>
    <template v-slot:footer="vm">
      <c-button @click="visible3 = false">返回</c-button>
      <c-button type="danger" @click="handleConfirm2">确认取消</c-button>
    </template>
  </c-modal>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        visible2: false,
        visible3: false
      }
    },
    methods: {
      handleConfirm2() {
        this.visible3 = false
        this.visible2 = false
      }
    }
  }
</script>

<style scoped>
  .c-button:not(:last-child) {
    margin-right: 20px;
  }
  a:focus {
    outline: 2px solid #006bff;
  }
</style>
```

## 信息提示

各类型的信息提示，只提供一个按钮用于关闭。

```html
<template>
  <c-button
    v-for="(type, index) in types"
    :key="index"
    :type="type.name"
    :data-type="type.name"
    @click="showModal(type)"
  >
    {{ type.label }}
  </c-button>

  <c-modal
    :title="modalTitle"
    :visible="visible"
    :center="false"
    width="520px"
    :type="modalType"
    light
    @cancel="visible = false"
  >
    <template v-slot>
      <div>
        需要的模态框内容。 需要的模态框内容。 需要的模态框内容。
        需要的模态框内容。
      </div>
    </template>

    <template v-slot:header="vm">
      <div>{{ vm.title }}</div>
    </template>

    <template v-slot:footer="vm">
      <c-button type="primary" @click="visible = false">知道了</c-button>
    </template>
  </c-modal>
</template>

<script>
  export default {
    data() {
      return {
        types: [
          {
            label: '信息提示',
            name: 'primary',
            icon: 'info'
          },
          {
            label: '成功提示',
            name: 'success'
          },
          {
            label: '警告提示',
            name: 'warning'
          },
          {
            label: '失败提示',
            name: 'danger',
            icon: 'error'
          }
        ],
        visible: false,
        modalType: null,
        modalTitle: ''
      }
    },
    methods: {
      showModal(type) {
        this.modalType = type.icon || type.name
        this.modalTitle = `这是一条${type.label}`
        this.visible = true
      }
    }
  }
</script>

<style scoped>
  .c-button:not(:last-child) {
    margin-right: 20px;
  }
</style>
```

## 便捷写法

在 Vue 组件内，使用 `this.$modal(options)` 可以快捷打开一个对话框。该对话框关闭后会自动销毁。

> 传递的 `options` 参数是 Modal 的 props（除了 `visible`） + `onClose`（对应 `close` 事件）+ `footer`（见自定义 footer）。
>
> 调用方法会返回一个 Promise。resolve `true` 表示触发了 `confirm`，resolve `false` 表示触发了 `cancel`。

```html
<template>
  <c-button type="primary" @click="open">打开对话框</c-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$modal({
          title: '对话框标题',
          content: '对话框内容',
          width: '400px'
        })
      }
    }
  }
</script>
```

也可以使用 `$info`、`$success`、`$warning` 和 `$error` 方法打开不同类型的弹出框。

```html
<template>
  <c-button type="primary" @click="open('info')">信息提示</c-button>
  <c-button type="success" @click="open('success')">成功提示</c-button>
  <c-button type="warning" @click="open('warning')">警告提示</c-button>
  <c-button type="danger" @click="open('error')">失败提示</c-button>
</template>

<script>
  export default {
    methods: {
      open(type) {
        this[`$${type}`]({
          title: `${type} title`,
          content: `${type} content`,
          width: '400px'
        })
      }
    }
  }
</script>

<style scoped>
  .c-button:not(:last-child) {
    margin-right: 20px;
  }
</style>
```

## 自定义 footer

如果想在保留 footer 原本功能的基础上（触发 `confirm` `cancel` 事件），对 footer UI 进行自定义，则可以利用 slot 中传递的 `confirm` + `cancel` 变量，或者便捷写法中 `footer` 函数传递的变量。

```html
<template>
  <div>
    <c-button @click="showSlotModal">slot 自定义 footer</c-button>
    <c-button @click="showShortcutModal">便捷写法自定义 footer</c-button>
    <c-modal v-model="visible">
      <template #title>自定义 footer</template>
      通过 slot 进行自定义 footer
      <template v-slot:footer="{confirm, cancel}">
        <component :is="confirm">自定义确认</component>
        <component :is="cancel">自定义取消</component>
      </template>
    </c-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      showSlotModal() {
        this.visible = true
      },
      showShortcutModal() {
        this.$modal({
          title: '自定义 footer',
          content: '便捷写法自定义 footer',
          footer({ confirm, cancel }) {
            return [cancel('取消在前'), confirm('确认在后')]
          }
        })
      }
    }
  }
</script>
```

## Props

| Name                | Description                                                   | Type                                                | Required | Default |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------- | -------- | ------- |
| visible/v-model     | 控制显示隐藏                                                  | `boolean`                                           | `false`  | `false` |
| mask-closable       | 是否可以通过点击遮罩层关闭模态框                              | `boolean`                                           | `false`  | `true`  |
| destroy-after-close | 关闭后是否销毁实例                                            | `boolean`                                           | `false`  | `false` |
| top                 | 顶部距离                                                      | `string` \| `number`                                | `false`  | `'15%'` |
| width               | 内容宽度                                                      | `string` \| `number`                                | `false`  | `'50%'` |
| center              | 是否垂直居中                                                  | `boolean`                                           | `false`  | `false` |
| title               | 标题，可以通过文本传递                                        | `string`                                            | `false`  | -       |
| content             | 内容，可以通过文本传递                                        | `string` \| `vnode`                                 | `false`  | -       |
| light               | 轻量级样式                                                    | `boolean`                                           | `false`  | `false` |
| type                | 确认框类型                                                    | `'info'` \| `'success'` \| `'warning'` \| `'error'` | `false`  | -       |
| custom-class        | modal 自定义类名                                              | `string` \| `Array<string`\|`object>`\|`object`     | `false`  | -       |
| custom-style        | modal 自定义样式，会覆盖 `top` + `width`，并可能影响 `center` | `Array<object>`\|`object`                           | `false`  | -       |

## Events

| Event Name | Description                                          | Parameters                                                                                     |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| confirm    | 确认回调                                             | `{ nativeEvent: Event }`                                                                       |
| cancel     | 取消回调                                             | `{ detail: { sourceType: 'cancel'` \| `'close'` \| `'mask'` \| `'esc' }, nativeEvent: Event }` |
| close      | 关闭时的钩子函数，和用户交互无关，类似生命周期的概念 | -                                                                                              |

## Slots

| Name    | Description                     |
| ------- | ------------------------------- |
| default | 内容，优先级高于 `content` prop |
| title   | 标题，优先级高于 `title` prop   |
| footer  | 底部，覆盖默认底部              |
