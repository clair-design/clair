---
title: Form
layout: component
route: /component/form
---

# Form 表单

## 基本用法

```html
<c-form @submit.prevent="onSubmit" ref="form">
  <c-form-item label="用户名:" required>
    <c-input v-model="userName" />
  </c-form-item>
  <c-form-item label="密码:" required>
    <c-input v-model="password" type="password" />
  </c-form-item>
  <c-form-item label=" ">
    <c-button primary type="submit">登录</c-button>
    <c-button type="button">忘记密码?</c-button>
  </c-form-item>
</c-form>

<script>
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      return this.$refs.form.isValid()
    }
  }
}
</script>
```

## 行内显示

```html
<c-form inline>
  <c-form-item label="用户名" required>
    <c-input v-model="userName" />
  </c-form-item>
  <c-form-item label="密码" required>
    <c-input v-model="password" type="password" />
  </c-form-item>
</c-form>

<script>
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  }
}
</script>
```

## 设置表单尺寸

Clair 提供了一些属性让你可以定制标签和表单项的大小。

### 指定 label 宽度

在 `c-form` 组件上设置 `label-width` 属性即可设置 `label` 宽度，它的值可以是任何有效的 CSS 长度值。默认的 `label` 宽度为 `4em`。

```html
<c-form label-width="8em">
  <c-form-item label="目标网页URL：">
    <c-input />
  </c-form-item>
  <c-form-item label="转化目标名称：">
    <c-input />
  </c-form-item>
</c-form>
```

### 设置宽度和大小

Clair 中的某些表单控件提供了 `size` 和 `width` 属性来指定大小和宽度。你可以在 `c-form` 上统一为表单内的所有控件设置统一规格的尺寸。

```html
<template demo-only>
  <c-form label-width="5em" :size="size" :width="width">
    <c-form-item label="控件大小：">
      <c-radio-group
        :options="sizes"
        v-model="size"
        button
      />
    </c-form-item>
    <c-form-item label="控件宽度：">
      <c-select
        :options="widths"
        v-model="width"
      />
    </c-form-item>
    <c-form-item label="文本框：">
      <c-input />
    </c-form-item>
    <c-form-item label="单选：">
      <c-radio-group
        :options="sizes"
        v-model="size"
      />
    </c-form-item>
    <c-form-item label="多选：">
      <c-checkbox-group
        :options="sizes"
      />
    </c-form-item>
    <c-form-item label=" ">
      <c-button primary>提交按钮</c-button>
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

## 响应式布局


```html
<c-form>
  <c-box>
    <c-box-item xs="12" sm="6" md="4">
      <c-form-item label="用户名" required flex>
        <c-input v-model="userName" width="flex" />
      </c-form-item>
    </c-box-item>
    <c-box-item xs="12" sm="6" md="4">
      <c-form-item label="密码" required flex>
        <c-input v-model="password" type="password" width="flex" />
      </c-form-item>
    </c-box-item>
  </c-box>
</c-form>

<script>
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  }
}
</script>

<style>
.c-form {
  font-size: 14px;
}
</style>
```

## 自定义 label

```html
<c-form label-width="1em">
  <c-form-item>
    <c-icon name="globe" slot="label" />
    <c-input size="sm" placeholder="公司地址" />
  </c-form-item>
  <c-form-item>
    <c-icon name="smartphone" slot="label" />
    <c-input size="sm" placeholder="手机号码" />
  </c-form-item>
</c-form>
```

## 监听用户提交

```html
<c-form @submit="onSubmit" ref="form">
  <c-form-item label="用户名" required>
    <c-input v-model="userName" />
  </c-form-item>
  <c-form-item label="密码" required>
    <c-input v-model="password" />
  </c-form-item>
  <c-form-item label=" ">
    <c-button type="submit" primary>登录</c-button>
  </c-form-item>
</c-form>

<script>
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      const form = this.$refs.form
      if (form.isValid()) {
        alert('登录成功')
        form.resetValidity()
        this.userName = ''
        this.password = ''
      }
    }
  }
}
</script>
```

## 属性说明

### `c-form` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| inline | Boolean | false | 是否将表单项在一行内显示 |
| labelWidth | String | 4em | 标签宽度，可以为任何有效的 CSS 长度 |
| size | String | md | 表单中的控件尺寸，可以取 `xs` `sm` `md` `lg` `xl` |
| width | String | normal | 表单中的控件宽度，可以取 `shortest` `shorter` `short` `normal` `long` `longer` `longest` |

### `c-form-item` 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| label | String | 无 | 标签 |
| labelWidth | String | 4em | 标签宽度，可以为任何有效的 CSS 长度 |
| required | Boolean | false | 是否必填项 |

### `c-form` 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| submit | Event | 原生的表单提交事件 |

