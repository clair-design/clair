---
title: Input 文本输入框
layout: component
scrollTop: true
route: component/input
---

# Input 文本输入框

文本框用来让用户输入单行或多行文字。Clair 为文本输入框提供了不同的状态以及输入校验等功能。

## 文字输入

最简单的使用场景下，只需通过 `v-model` 属性给 `c-input` 绑定一个模型即可。

```html
<c-input v-model="userName" placeholder="请输入用户名" />
<span v-if="userName" class="is-text-sm">Hello {{userName}} !</span>

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

## 改变输入框大小

通过 `size` 属性，你可以对输入框大小进行整体缩放，文字大小、内变局都会随之改变。如果你只想改变输入框宽度，可以设置 `width` 属性。

```html
<div class="input-items">
  <c-input size="xs" width="shortest" />
  <c-input size="xs" width="shorter" />
  <c-input size="xs" width="short" />
  <c-input size="xs" />
  <c-input size="xs" width="long" />
  <c-button size="xs" primary>提交</c-button>
</div>
<div class="input-items">
  <c-input size="sm" width="shortest" />
  <c-input size="sm" width="shorter" />
  <c-input size="sm" width="short" />
  <c-input size="sm" />
  <c-input size="sm" width="long" />
  <c-button size="sm" primary>提交</c-button>
</div>
<div class="input-items">
  <c-input width="shortest" />
  <c-input width="shorter" />
  <c-input width="short" />
  <c-input width="long" />
  <c-button primary outline>提交</c-button>
</div>
<div class="input-items">
  <c-input size="lg" width="shortest" />
  <c-input size="lg" width="shorter" />
  <c-input size="lg" width="short" />
  <c-input size="lg" width="long" />
  <c-button size="lg" primary outline>提交</c-button>
</div>
<div class="input-items">
  <c-input size="xl" width="shortest" />
  <c-input size="xl" width="shorter" />
  <c-input size="xl" width="short" />
  <c-input size="xl" />
  <c-button size="xl" outline icon="arrow-right" round></c-button>
</div>

<style>
.input-items {
  margin-bottom: 1em;
}
</style>
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
<c-input type="textarea" multi-line :rows="3" width="longer" />
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
        mobNum: ''
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
