---
title: Input 文本输入框
layout: component
route: /component/input
meta:
  style:
  - cssText: >
      .vue-demo .input-items { margin-bottom: 1em; }
      .vue-demo .input-items inpu { margin-bottom: 1em; }
---

# Input 文本输入框

文本框用来让用户输入单行或多行文字。Clair 为文本输入框提供了不同的状态以及输入校验等功能。

## 文字输入

最简单的使用场景下，只需通过 `v-model` 属性给 `c-input` 绑定一个模型即可。

```html
<c-input v-model="userName" placeholder="请输入用户名" />
<span v-if="userName" class="is-size-sm">Hello {{userName}} !</span>

<script>
  export default {
    data() {
      return {
        userName: ''
      }
    }
  }
</script>
```

## 改变输入框高度

通过 `size` 属性，你可以对输入框大小进行整体缩放，文字大小、内边距都会随之改变。

```html
<div class="input-items">
  <c-input size="xs" />
  <c-button size="xs" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="sm" />
  <c-button size="sm" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input />
  <c-button primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="lg" />
  <c-button size="lg" primary>确定</c-button>
</div>
<div class="input-items">
  <c-input size="xl" />
  <c-button size="xl" primary>确定</c-button>
</div>
```

## 宽度设置

Clair 中的输入框默认宽度为 `15em`，你可以通过 `width` 属性设置不同宽度的输入框。在下面的例子中，你可以选择不同的 `size` 和 `width` 查看文本输入框的大小：

```html
<template demo-only>
<c-form :size="size">
  <c-form-item label="Size:">
    <c-radio-group
      :options="sizes"
      v-model="size"
      button
    />
  </c-form-item>
  <c-form-item label="Width:">
    <c-radio-group
      :options="widths"
      v-model="width"
      button
    />
  </c-form-item>
  <c-form-item label="输入框:">
    <c-input :size="size" :width="width" />
  </c-form-item>
</c-form>
</template>

<script>
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    .map(w => ({
      label: w,
      value: w
    }))
  const widths = ['shortest', 'shorter', 'short', 'normal', 'long', 'longer', 'longest', 'flexible']
    .map(w => ({
      label: w,
      value: w
    }))
  export default {
    data() {
      return {
        width: 'normal',
        size: 'md',
        sizes,
        widths
      }
    }
  }
</script>
```

## 禁用和只读状态

`disabled` 和 `readonly` 属性分别表示输入框的禁用和只读状态。

```html
<c-input disabled value="我被禁用了" />
<c-input readonly value="我是只读的" />
```

## 多行文本框

类似于 `textarea`，可以通过 `rows` 属性指定显示的高度。

```html
<c-input
  type="textarea"
  multi-line
  :rows="3"
  width="longer"
/>
```

配合 `autosize` 属性，还可以随着输入行数的增加自动调整高度。

```html
<c-input
  type="textarea"
  multi-line
  :autosize="[3, 10]"
  placeholder="多行文本"
  width="longer"
/>
```

## 输入验证


文本输入框内置了输入验证的功能，可以对用户的输入实时进行校验，并给出错误提示。验证规则通过 `rules` 属性指定，它的值是一个对象。

### required 必填验证

```html
<c-input v-model="userName" :rules="rules" />

<script>
  export default {
    data() {
      return {
        userName: '删了我试试~',
        rules: {
          required: true
        }
      }
    }
  }
</script>
```

### 使用 minlength 和 maxlength 验证输入长度

```html
<c-input v-model="userName" :rules="rules" placeholder="输入2到8位字符" />

<script>
  export default {
    data() {
      return {
        userName: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 8
        }
      }
    }
  }
</script>
```

### 常用数据格式验证

一些常用的数据格式，比如邮箱、URL、手机号码等，可以通过指定 `type` 来验证。

```html
<div class="c-form-item">
  <c-input v-model="mail" :rules="{type: 'email'}" placeholder="邮箱" />
</div>

<div class="c-form-item">
  <c-input v-model="mobile" :rules="{type: 'mobile'}" placeholder="手机号" />
</div>

<script>
  export default {
    data() {
      return {
        mail: '',
        mobile: ''
      }
    }
  }
</script>

<style>
.c-form-item {
  margin-bottom: 1em;
}
</style>
```

Clair 目前支持验证的 `type` 有：

- email：邮箱
- mobile：手机号码
- tel：固定电话号码
- number：数字
- integer：整数

### 正则表达式验证

用来验证用户输入是否符合通过 `pattern` 属性指定的正则表达式。例如：

```html
<c-input v-model="id" :rules="rules" placeholder="请输入六位数字" />

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          pattern: /^\d{6}$/
        }
      }
    }
  }
</script>
```

### 自定义错误提示

在指定规则时，可以通过给规则对象添加 msg 属性来实现自定义消息。

```html
<c-input v-model="id" :rules="rules" placeholder="2-6个字" />

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 6,
          msg: '请输入2-6个字符哦～'
        }
      }
    }
  }
</script>
```

在上面的例子中，不管发生了哪种类型的格式错误，都会显示固定的错误消息。你也可以针对不同类型的错误，显示不同的消息：

```html
<c-input v-model="id" :rules="rules" placeholder="2-6个字" />

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          minlength: 2,
          maxlength: 6,
          msg: {
            required: '不填可不行哦～',
            minlength: '一个字太少了吧～',
            maxlength: '不能超过6个字～'
          }
        }
      }
    }
  }
</script>
```

### 手动调用验证

如果你想通过 JavaScript 获取到某个输入框的输入有效性，可以获取到 `c-input` 组件的引用，然后调用该组件的 `validate` 方法。

该方法返回结果是一个对象，包括 `valid` 和 `msg` 两个字段，分别表示是否合法以及错误提示。

```html
<c-input v-model="id" :rules="rules" placeholder="请输入六位数字" ref="input" />
<c-button @click="onClick" primary>检查输入有效性</c-button>

<script>
  export default {
    data() {
      return {
        id: '',
        rules: {
          required: true,
          pattern: /^\d{6}$/
        }
      }
    },
    methods: {
      onClick: function(e) {
        var validity = this.$refs.input.validate();
        if (validity.valid) {
          alert('输入正确');
        } else {
          alert('输入错误：' + validity.msg)
        }
      }
    }
  }
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| value | String, Number | 无 | 默认值 |
| placeholder | String | 无 | 同 HTML input 元素的 placeholder |
| size | String | md | 输入框整体大小，可以取 `xs`、`sm`、`md`、`lg`、`xl` |
| width | String | normal | 输入框宽度，可以取 `shortest`、`shorter`、`normal`、`long`、`longer` 等 |
| readonly | Boolean | false | 是否只读 |
| disabled | Boolean | false | 是否禁用 |
| multi-line | Boolean | false | 是否可以输入多行文字 |
| autosize | Array | null | `[minRows, maxRows]` 输入多行文字时，是否允许根据内容自动调整高度 |
| wrap | String | 空 | `on` `off` 控制换行 |
| type | String | text | 参考 HTML input 元素的 type 属性 |
| name | String | 无 | 参考 HTML input 元素的 name 属性 |
| rows | Number | 3 | 输入框展示的高度 |
| cols | Number | 60 | 输入框展示的宽度 |
| maxlength | Number | 无 | 最多输入多少字符 |
| rules | Object | 无 | 输入验证规则，详见上面「输入验证」部分 |
