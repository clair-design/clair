---
group: Form 表单
---

# Input 文本框

## 定义

获取用户输入的内容。

## 基础用法

简单的常规用法。

```html
<c-input placeholder="请输入内容" />
```

## 禁用样式

输入框不可用状态。

```html
<c-input placeholder="请输入内容" disabled />
```

## 可清空

设置 `clearable` 属性时，输入内容可一键清空。

```html
<c-input placeholder="请输入内容" v-model="value" clearable />

<script>
  export default {
    data() {
      return { value: 'Hello' }
    }
  }
</script>
```

## 密码输入框

输入密码分可见、不可见两种状态。

```html
<c-input v-model="value" :html-type="type" placeholder="请输入密码">
  <c-icon-eye @click="toggle" slot="suffix-icon" v-if="eyeVisible" />
  <c-icon-eye-closed @click="toggle" slot="suffix-icon" v-else />
</c-input>

<script>
  export default {
    data() {
      return {
        eyeVisible: false,
        type: 'password',
        value: ''
      }
    },
    methods: {
      toggle() {
        this.eyeVisible = !this.eyeVisible
        this.type = this.eyeVisible ? 'text' : 'password'
      }
    }
  }
</script>
```

## 文本域

用于输入多行文本信息。

```html
<c-input placeholder="请输入内容" html-type="textarea" />
```

## 自适应高度的文本域

用于输入多行文本信息，可以根据输入的内容自动调整输入框高度。

```html
<c-input
  placeholder="请输入内容"
  html-type="textarea"
  v-model="value"
  :auto-size="{minRows: 1, maxRows: 6}"
/>

<script>
  export default {
    data() {
      return { value: '' }
    }
  }
</script>
```

## 不同的状态

根据输入内容提示不同状态。

```html
<div class="input-status">
  <c-input type="success" placeholder="请输入内容" />
  <c-input type="warning" placeholder="请输入内容" />
  <c-input type="error" placeholder="请输入内容" />
</div>

<style scoped>
  .input-status {
    margin-bottom: -1em;
  }
  .c-input {
    margin-bottom: 1em;
  }
  .c-input:not(:last-child) {
    margin-right: 20px;
  }
</style>
```

## 带图标的输入框

输入框可以前置或者后置一个图标。

```html
<div class="input-with-icons">
  <c-input placeholder="请输入">
    <c-icon-search slot="prefix-icon" />
  </c-input>
  <c-input placeholder="请输入">
    <c-icon-spin slot="suffix-icon" />
  </c-input>
  <c-input placeholder="请输入" disabled>
    <c-icon-setting slot="suffix-icon" />
  </c-input>
</div>

<style scoped>
  .input-with-icons {
    margin-bottom: -1em;
  }
  .input-with-icons > div {
    margin-bottom: 1em;
  }
  .input-with-icons > div:not(:last-child) {
    margin-right: 20px;
  }
</style>
```

## 组合样式

可前置或者后置元素，一般为标签或按钮。

```html
<div class="input-groups">
  <c-input placeholder="请输入内容">
    <em class="prefix-text" slot="prefix">http://</em>
  </c-input>
  <c-input placeholder="请输入内容">
    <em class="suffix-text" slot="suffix">.com</em>
  </c-input>
  <c-input placeholder="请输入内容">
    <c-select slot="prefix" v-model="type" class="inner-select">
      <c-option value="1">用户名</c-option>
      <c-option value="2">用户ID</c-option>
      <c-option value="3">订单编号</c-option>
    </c-select>
    <c-button type="primary" slot="suffix">搜索</c-button>
  </c-input>
</div>

<script>
  export default {
    data() {
      return {
        type: '1'
      }
    }
  }
</script>

<style scoped>
  .input-groups {
    margin-bottom: -1em;
  }
  .input-groups > div {
    margin-bottom: 1em;
  }
  .input-groups > div:not(:last-child) {
    margin-right: 20px;
  }
  .prefix-text,
  .suffix-text {
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    padding: 0 10px;
    font-size: 14px;
    font-style: normal;
    line-height: 30px;
  }
  .prefix-text {
    border-right: 0;
  }
  .suffix-text {
    border-left: 0;
  }
  .inner-select {
    border: 1px solid #dcdfe6;
    border-right: 0;
    width: 110px;
  }
  .inner-select:focus-within {
    box-shadow: none;
  }
</style>
```

## 不同尺寸

大中小三种组合，可以和表单输入框进行对应。

```html
<div class="input-size">
  <c-input size="small" placeholder="请输入内容" />
  <c-input size="normal" placeholder="请输入内容" />
  <c-input size="large" placeholder="请输入内容" />
</div>

<style scoped>
  .input-size {
    display: flex;
    flex-direction: column;
  }
  .c-input:not(:last-child) {
    margin-bottom: 20px;
  }
</style>
```

## Props

| Name          | Description                                                                                                                                                                                                                  | Type                                     | Required | Default    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- | ---------- |
| value/v-model | 输入框的值                                                                                                                                                                                                                   | `string`                                 | `false`  | `''`       |
| id            | 输入框的 id                                                                                                                                                                                                                  | `string`                                 | `false`  | -          |
| html-type     | input 类型                                                                                                                                                                                                                   | `'text'` \| `'password'` \| `'textarea'` | `false`  | `'text'`   |
| size          | 按钮尺寸                                                                                                                                                                                                                     | `'large'` \| `'normal'` \| `'small'`     | `false`  | `'normal'` |
| placeholder   | 输入框占位文本                                                                                                                                                                                                               | `string`                                 | `false`  | -          |
| disabled      | 是否禁用                                                                                                                                                                                                                     | `boolean`                                | `false`  | `false`    |
| type          | input 状态类型                                                                                                                                                                                                               | `'success'` \| `'warning'` \| `'error'`  | `false`  | -          |
| block         | 自适应父级元素宽度                                                                                                                                                                                                           | `boolean`                                | `false`  | `false`    |
| prefix-icon   | 输入框头部图标                                                                                                                                                                                                               | `string` \| `vNode`                      | `false`  | -          |
| suffix-icon   | 输入框尾部图标                                                                                                                                                                                                               | `string` \| `vNode`                      | `false`  | -          |
| clearable     | 可以点击清除图标删除内容                                                                                                                                                                                                     | `boolean`                                | `false`  | `false`    |
| auto-size     | 针对 `c-input[html-type="textarea"]` 自适应内容高度                                                                                                                                                                          | `{ minRows: number; maxRows: number; }`  | `false`  | -          |
| autocomplete  | 同原生`<input />` 的 autocomplete                                                                                                                                                                                            | `'on'` \| `'off'`                        | `false`  | `'off'`    |
| autofocus     | 同原生 `<input />` 的 autofocus                                                                                                                                                                                              | `boolean`                                | `false`  | `false`    |
| readonly      | 同原生 `<input />` 的 readonly                                                                                                                                                                                               | `boolean`                                | `false`  | `false`    |
| input-attrs   | 同 `<input />` `<textarea />` 的 [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#Attributes)，优先级低于本表中的 `autocomplete`，`autofocus`，`readonly`，`disabled`（以及以上 props 的默认值） | `object`                                 | `false`  | `{}`       |

## Events

| Event Name  | Description                                                | Parameters                                           |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| change      | 内容变化，触发机制同原生 `<input />`                       | `{ target: { value: string }, nativeEvent?: Event }` |
| blur        | 失去焦点，触发机制同原生 `<input />`                       | `{ target: { value: string }, nativeEvent?: Event }` |
| press-enter | 拥有焦点时，按下回车                                       | `{ target: { value: string }, nativeEvent?: Event }` |
| clear       | `htmlType` 是 `'input'`，或者 `'passwrod'`时，清空内容触发 | -                                                    |

> 同时支持原生 `<input />` 以及 `<textarea />` 元素具有的其他事件。

## Slots

| Name        | Description                            |
| ----------- | -------------------------------------- |
| prefix-icon | 输入框内，头部内容，主要用于 icon 展示 |
| suffix-icon | 输入框内，尾部内容，主要用于 icon 展示 |
| prefix      | 输入框外，头部内容                     |
| suffix      | 输入框外，尾部内容                     |
