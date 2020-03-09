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

    <c-form-item label="颜色：">
      <c-color-picker />
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
<c-form label-width="10em">
  <c-form-item>
    <c-icon name="globe" slot="label" />
    <c-input placeholder="公司地址" />
  </c-form-item>
  <c-form-item>
    <c-select :options="['手机', '座机']" width="shorter" slot="label" />
    <c-input placeholder="号码" />
  </c-form-item>
</c-form>
```

## 监听用户提交

```html
<c-form @submit.prevent="onSubmit" ref="form">
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

## 输入验证

Clair 内置了输入验证的功能，可以对用户的输入实时进行校验，并给出错误提示。验证规则通过 `rules` 属性指定，它的值是一个对象。

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
<div class="form-item">
  <c-input v-model="mail" :rules="{type: 'email'}" placeholder="邮箱" />
</div>

<div class="form-item">
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
.form-item {
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

### 自定义验证规则

除了 Clair 内置的验证规则之外，你也可以自定义验证规则。只需要提供一个规则名和一个验证函数即可。验证函数的参数为用户输入的值，如果验证失败，返回 `{ valid: false, msg: '错误提示内容' }`；验证通过则返回 `{ valid: true }` 即可。

在自定义验证函数中，可以使用 `this` 访问触发验证的 Vue 组件实例。

```html
设置密码：<c-input v-model="password" :rules="rules" />

<script>
  export default {
    data () {
      return {
        password: '',
        rules: {
          required: true,
          minlength: 6,
          strength: function (val) {
            console.log(this) // this 是 c-input 实例
            const hasNumber = /\d/.test(val)
            const hasLetter = /[a-z]/i.test(val)
            const hasSpecialChar = /\W/.test(val)
            if (hasNumber && hasLetter && hasSpecialChar) {
              return { valid: true }
            } else {
              return { valid: false, msg: '密码中必须包含数字、字母和特殊符号' }
            }
          }
        }
      }
    }
  }
</script>
```

### 异步验证

某些情况下，输入的验证过程是异步的（比如需要调用服务器端接口去验证）。你可以自定义一个异步的验证函数，让这个函数返回一个 `Promise` 即可。

对于需要访问 HTTP 接口进行异步校验的场景，我们通常需要对验证函数进行节流处理。通过 `validate-throttle` 属性可以指定进行验证的最小时间间隔。

```html
<c-input v-model="user" :rules="rules" placeholder="请输入用户名" :validate-throttle="500" />

<script>
  const rules = {
    available: function (val) {
      console.log(`validating value ${val}`)
      return new Promise((resolve, reject) => {
        // 这里模拟一个异步验证
        setTimeout(() => {
          const valid = val.length > 3
          const msg = valid ? '' : `用户名 ${val} 被占用`
          resolve({ valid, msg })
        }, 1000 * Math.random())
      })
    }
  }

  export default {
    data () {
      return { user: '', rules }
    }
  }
</script>
```

### 验证整个表单

每个表单项在用户操作过程中会实时验证并给出错误提示。如果要验证整个表单是否全部填写正确，可以调用表单组件的 `validate()` 方法。该方法会返回 `true` 或 `false`。

**注意：如果表单项中含有异步验证，那么 `validate()` 方法会返回一个 `Promise`。这个 `Promise` 被 `resolve` 之后才能知道验证结果是 `true` 还是 `false`。**

如果要重置表单的验证结果，也就是清除错误提示，可以调用表单的 `resetValidity()` 方法。另外，表单还有一个 `reset()` 方法，可以将表单重置为用户修改之前的状态，同时清除错误提示。**`reset()` 是重置表单项为初始值，而不是清空其内容。**

```html
<c-form @submit.prevent="onSubmit" ref="form" label-width="6em" width="long">
  <c-form-item label="任务名称：" required>
    <c-input v-model="name" :rules="rules.name" />
  </c-form-item>
  <c-form-item label="统计时段：" required>
    <c-checkbox-group
      v-model="timespan"
      :options="[
        { label: '最近7天', value: 1 },
        { label: '最近14天', value: 2 },
        { label: '最近30天', value: 3 },
        { label: '自然月', value: 4 },
        { label: '自然季', value: 5 }
      ]"
    />
  </c-form-item>
  <c-form-item label="移动端：" required>
    <c-switch v-model="hasMobile" />
  </c-form-item>
  <c-form-item label="移动版本：" required v-if="hasMobile">
    <c-input v-model="version" :rules="rules.version" />
  </c-form-item>
  <c-form-item label="开始日期：" required>
    <c-datepicker v-model="startDate" />
  </c-form-item>
  <c-form-item label="运行范围：" required>
    <c-datepicker type="daterange" v-model="range" />
  </c-form-item>
  <c-form-item label="发送周期：" required>
    <c-radio-group
      button
      :options="[
        { label: '每天', value: 1 },
        { label: '每周', value: 2 },
        { label: '每月', value: 3 },
      ]"
      v-model="frequency"
    />
  </c-form-item>
  <c-form-item label="地域：" required>
    <c-select
      :options="[
        { label: '东北', value: 1 },
        { label: '华北', value: 2 },
        { label: '西北', value: 3 },
        { label: '华中', value: 4 },
        { label: '华南', value: 5 },
        { label: '华东', value: 6 },
        { label: '西南', value: 7 }
      ]"
      v-model="zone"
    />
  </c-form-item>
  <c-form-item label="每页条数：" required>
    <c-slider v-model="num" />
  </c-form-item>
  <c-form-item label=" ">
    <c-button type="submit" primary>生成报告</c-button>
    <c-button type="button" @click.prevent="onReset">重置表单</c-button>
  </c-form-item>
</c-form>

<script>
export default {
  data () {
    return {
      name: '',
      timespan: [2],
      hasMobile: false,
      startDate: '',
      range: [],
      frequency: 1,
      zone: '',
      num: 10,
      version: '',
      rules: {
        name: {
          checkavailable (name) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({
                  valid: name.length > 3,
                  msg: '任务名称已经存在'
                })
              }, Math.random() * 1000)
            })
          }
        },
        version: {
          pattern: /^\d{2,6}$/,
          required: true
        }
      }
    }
  },
  methods: {
    onSubmit (e) {
      const form = this.$refs.form
      form.isValid().then(valid => {
        if (!valid) return
        alert('提交成功')
        form.reset()
      })
    },
    onReset (e) {
      this.$refs.form.reset()
    }
  }
}
</script>
```

### 扩展表单组件

在复杂的业务场景下，我们需要自定义表单组件，这些组件可以使用 [`v-model` 进行双向绑定](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)。

Clair 也提供了一些方法，让你开发的自定义组件也可以使用 Clair 的表单验证机制。

```javascript
import Clair from clair

/**
 * 自定义表单组件使用Clair的表单验证系统
 */
Vue.component('fancy-input', {
  mixins: [Clair.mixins.validatable],
  props: ['value'],
  data () {
    return {
      // 这里可以内置一些验证规则
      builtinRules: {
        ruleA (val) {
          // ...
        }
      }
    }
  }
  // ...
})

/**
 * 使用 `rules` 属性传入验证规则
 */
new Vue({
  el: '#app',
  template: '<fancy-input v-model="val" :rules="rules">',
  data () {
    return {
      val: '',
      rules: {
        required: true,
        maxLength: 12
      }
    }
  }
})
```
## 跳过组件验证

在复杂的业务场景下，我们自定义了一些表单组件以便于组件的复用，我们在自定义组件中做了验证规则，然后我们在各处调用该组件，但在某些场景下调用该组件并不需要执行验证操作，这时我们可以添加skipValidate属性来跳过本次组件的验证功能

```html
<c-form @submit.prevent="onSubmit" ref="form">
  <c-form-item label="用户名:" required>
    <c-input v-model="username" :rules="rules" />
  </c-form-item>
  <c-form-item label="密码:" required>
    <c-input v-model="password" skipValidate :rules="rules" />
  </c-form-item>
  <c-button type="submit" primary>提交</c-button>
</c-form>

<script>
export default {
  data () {
    return {
      password: '',
      username: '',
      rules: {
        customFunction: () => {
          return {
            valid: false,
            msg: '未通过验证'
          }
        }
      }
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

