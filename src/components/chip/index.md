---
title: Chip
route: /component/chip
layout: component
---

# 标签 - Chip

用来进行分类和标记的标签

## 基础用法

设置`label`属性，或直接在标签内填写标签内容。

```html
<c-chip label="chip1"></c-chip>
<c-chip>chip2</c-chip>
```

## 自定义标签颜色

设置`color`属性，自定义标签颜色。可从以下颜色当中选取。

```html
<c-chip label="red" color="red"></c-chip>
<c-chip label="orange" color="orange"></c-chip>
<c-chip label="yellow" color="yellow"></c-chip>
<c-chip label="green" color="green"></c-chip>
<c-chip label="cyan" color="cyan"></c-chip>
<c-chip label="blue" color="blue"></c-chip>
<c-chip label="indigo" color="indigo"></c-chip>
<c-chip label="purple" color="purple"></c-chip>
<c-chip label="pink" color="pink"></c-chip>
<c-chip label="default"></c-chip>
<c-chip label="dark" color="dark"></c-chip>
<c-chip label="black" color="black"></c-chip>

<style>
.c-chip__wrapper {
  margin-bottom: 10px;
}
</style>
```

也可自定义背景色。

```html
<c-chip color="#336774">#336774</c-chip>
<c-chip label="#724832" color="#724832"></c-chip>
<c-chip label="#516E41" color="#516E41"></c-chip>
```

## 标签的动态添加和删除

添加`closable`属性，设置为可关闭标签。通过对数组的操作，实现对标签的添加和删除。

```html
<c-chip
  v-for="(chip, index) in chips"
  :key="index"
  closable
  :color="chip.color"
  :label="chip.label"
  @close="closeChip(chip)"
  style="margin-bottom:10px;"
></c-chip>

<c-input
  v-if="inputVisible"
  v-model="inputValue"
  width="short"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
  autofocus
>
</c-input>
<c-button v-else primary outline @click="showInput" style="height:28px;">+ New Chip</c-button>

<script>
  export default {
    data() {
      return {
        chips: [
          { label: 'red', color: 'red' },
          { label: 'orange', color: 'orange' },
          { label: 'yellow', color: 'yellow' },
          { label: 'green', color: 'green' },
          { label: 'cyan', color: 'cyan' },
          { label: 'blue', color: 'blue' },
          { label: 'indigo', color: 'indigo' },
          { label: 'purple', color: 'purple' },
          { label: 'pink', color: 'pink' },
          { label: 'default', color: ''},
          { label: 'dark', color: 'dark' },
          { label: 'black', color: 'black' },
        ],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      closeChip(chip) {
        this.chips.splice(this.chips.indexOf(chip), 1)
      },

      showInput() {
        this.inputVisible = true
      },

      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.chips.push({label: inputValue, type: 'primary'})
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>
```

## 设置标签大小

设置`size`属性，定义标签大小。

```html
<c-chip size="xs" label="超小号"></c-chip>
<c-chip size="sm" label="小号"></c-chip>
<c-chip label="正常"></c-chip>
<c-chip size="lg" label="大号"></c-chip>
<c-chip size="xl" label="超大号"></c-chip>
```

## 标签长度的限制

结合`<c-tip>`，通过设置标签的最大宽度，或者通过内容的长度的限制，来控制标签的宽度。可在hover时显示完整内容。

```html
<c-tip :content="value" position="top">
  <c-chip :label="value" :style="styleObj"></c-chip>
</c-tip>
<c-tip :content="value" position="top">
  <c-chip :label="chipLabel"></c-chip>
</c-tip>

<script>
  export default {
    data () {
      return {
        value : "我是一个超级超级超级超级超级超级超级超级超级长的标签",
        styleObj : {
          maxWidth: '150px'
        }
      }
    },
    computed: {
      chipLabel () {
        return this.value.length > 20 ? this.value.slice(0, 20) : this.value
      }
    }
  }
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 | 可选值 |
|-----|------|-------|-----|-------|
| label | String | - | 标签内容 | - |
| color | String | - | 自定义标签颜色 | red / orange / yellow / green / cyan / blue / indigo / purple / pink / dark / black... |
| size | String | - | 标签大小 | xs / sm / lg / xl |
| closable | Boolean | false | 是否有关闭按钮 | - |
