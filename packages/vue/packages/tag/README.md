---
group: Data 数据展示
---

# Tag 标签

## 定义

进行标记和分类的小标签。

## 使用场景

用于标记事物的属性和维度，对事物进行分类。

## 基础样式

常规标签，允许做点击跳转或关闭操作。

```html
<c-tag>标签1</c-tag>
<c-tag>标签2</c-tag>
<c-tag>标签3</c-tag>
<c-tag>标签4</c-tag>
<c-tag closable v-if="!closed" @close="closeTag">标签5</c-tag>

<script>
  export default {
    data() {
      return { closed: false }
    },
    methods: {
      closeTag() {
        this.closed = true
      }
    }
  }
</script>
```

## 动态编辑

可动态添加和删除标签。

```html
<c-tag
  v-for="(tag, index) in tags"
  :key="index"
  closable
  @close="closeTag(tag)"
>
  {{ tag.label }}
</c-tag>

<!-- 
  Todo: use c-input instead
-->
<input
  class="c-input c-input--small"
  v-model="value"
  v-if="visible"
  @keyup.enter="handleConfirm"
  @blur="handleConfirm"
  ref="input"
  style="width: 80px; min-width:0"
/>
<c-button
  v-else
  type="default"
  @click="toggleInput"
  style="border-style: dashed;"
  size="small"
>
  + New Tag
</c-button>

<script>
  export default {
    data() {
      return {
        tags: [
          { label: 'red' },
          { label: 'orange' },
          { label: 'yellow' },
          { label: 'green' },
          { label: 'cyan' },
          { label: 'blue' },
          { label: 'indigo' },
          { label: 'purple' },
          { label: 'pink' }
        ],
        visible: false,
        value: ''
      }
    },
    methods: {
      closeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },

      toggleInput() {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },

      handleConfirm() {
        const value = this.value
        if (value) {
          this.tags.push({ label: value })
        }
        this.visible = false
        this.value = ''
      }
    }
  }
</script>

<style>
  .c-tag {
    margin: 5px;
  }
</style>
```

## 不同尺寸

大中小三种组合，可选值"large"、"normal"、"small"，可以和表单输入框进行对应配合。

```html
<c-tag size="large">大号标签</c-tag>
<c-tag size="normal">正常标签</c-tag>
<c-tag size="small">小号标签</c-tag>
```

## 自定义色彩

多色彩标签以供不同场景使用。可以使用我们内置的颜色：

```html
<c-tag color="blue">blue</c-tag>
<c-tag color="green">green</c-tag>
<c-tag color="orange">orange</c-tag>
<c-tag color="red">red</c-tag>
<c-tag color="purple">purple</c-tag>
<c-tag color="grey">grey</c-tag>
<c-tag color="cyan">cyan</c-tag>
<c-tag color="magenta">magenta</c-tag>
```

也可以自定义字体颜色：

```html
<c-tag color="#000098">#000098</c-tag>
<c-tag color="#ec0aa0">#ec0aa0</c-tag>
<c-tag color="#666">#666</c-tag>
<c-tag color="#fad908">#fad908</c-tag>
```

## Props

| Name     | Description | Type      | Required | Default    |
| -------- | ----------- | --------- | -------- | ---------- |
| size     | 标签尺寸    | `string`  | `false`  | `'normal'` |
| color    | 标签颜色    | `string`  | `false`  | -          |
| closable | 可否关闭    | `boolean` | `false`  | `false`    |

## Events

| Event Name | Description | Parameters               |
| ---------- | ----------- | ------------------------ |
| close      | 关闭时触发  | `{ nativeEvent: Event }` |
