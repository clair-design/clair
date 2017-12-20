---
title: Form
layout: component
scrollTop: true
route: component/form
---

# Form 表单

## 基本用法

```html
<c-form>
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

<style>
.c-form {
  font-size: 14px;
}
</style>
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

<style>
.c-form {
  font-size: 14px;
}
</style>
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

## 指定 label 宽度

```html
<c-form label-width="8em">
  <c-form-item label="目标网页URL：">
    <c-input />
  </c-form-item>
  <c-form-item label="转化目标名称：">
    <c-input />
  </c-form-item>
</c-form>

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




