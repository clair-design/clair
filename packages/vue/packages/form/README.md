---
group: Form 表单
---

# Form 表单

## 定义

表单是进行信息收集、校验和提交功能的重要组件，包含复选框、单选框、输入框、下拉选择等其它表单组件元素。

## 使用场景

- 能提供默认或选择的，就不要让用户输入
- 尽量使用单列设计
- 顶部标签对齐
- 关联标签和输入框
- 避免字母全大写
- 低于 6 个选项就全部展示
- 避免将标签作为占位符使用
- 指明出错的内容
- 在用户填写完后再验证
- 不要隐藏基本的帮助文本
- 区分主要操作和次要操作
- 正确区分必填字段和选填字段
- 对表单信息进行归类整合

## 典型表单

包括多种表单项。

```html
<template>
  <c-form label-width="80px" class="demo-form">
    <c-form-item label="项目名称">
      <c-input placeholder="请输入名称" v-model="form.projectName" />
    </c-form-item>
    <c-form-item>
      <template v-slot:label>
        <span>联系电话</span>
      </template>
      <c-input placeholder="请输入电话" v-model="form.phoneNumber" />
    </c-form-item>
    <c-form-item label="项目地点">
      <c-select v-model="form.location">
        <c-option value="1">北京</c-option>
        <c-option value="2">上海</c-option>
      </c-select>
    </c-form-item>
    <c-form-item label="项目属性">
      <c-checkbox-group v-model="form.projectType">
        <c-checkbox value="1">大数据</c-checkbox>
        <c-checkbox value="2">高科技</c-checkbox>
        <c-checkbox value="3">城市安全</c-checkbox>
      </c-checkbox-group>
    </c-form-item>
    <c-form-item label="项目风险">
      <c-radio-group v-model="form.projectRisk">
        <c-radio v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </c-radio>
      </c-radio-group>
    </c-form-item>
    <c-form-item label="项目说明">
      <c-input
        placeholder="请输入内容"
        html-type="textarea"
        v-model="form.projectDesc"
      />
    </c-form-item>
    <c-form-item label="">
      <c-button type="primary" style="margin-right: 8px;">立即提交</c-button>
      <c-button>取消</c-button>
    </c-form-item>
  </c-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          projectName: '',
          phoneNumber: '',
          location: '',
          projectType: [],
          projectRisk: '',
          projectDesc: ''
        },
        projectRisk: 'gw',
        options: [
          { label: '高危', value: 'gw' },
          { label: '一般', value: 'yb' },
          { label: '低', value: 'd' },
          { label: '极低', value: 'jd' }
        ]
      }
    }
  }
</script>
<style>
  .demo-form .c-input,
  .demo-form .c-select {
    width: 300px;
  }
  .demo-form .c-checkbox {
    margin-right: 20px;
  }
  .demo-form .c-button + .c-button {
    margin-left: 10px;
  }
</style>
```

## 水平表单

适用于当垂直空间有限，表单比较简单的情况。

```html
<template>
  <c-form inline>
    <c-form-item label="项目名称">
      <c-input placeholder="请输入名称" />
    </c-form-item>
    <c-form-item label="项目地点">
      <c-input placeholder="请输入地点" />
    </c-form-item>
    <c-form-item>
      <c-button type="primary">查询</c-button>
    </c-form-item>
  </c-form>
</template>
```

## 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

```html
<template>
  <c-radio-group class="radio-group" :options="options" v-model="position" />
  <c-form :label-position="position" label-width="80px">
    <c-form-item label="名称">
      <c-input placeholder="请输入名称" />
    </c-form-item>
    <c-form-item label="联系电话">
      <c-input placeholder="请输入电话" />
    </c-form-item>
    <c-form-item label="联系人">
      <c-input placeholder="请输入联系人" />
    </c-form-item>
  </c-form>
</template>
<script>
  export default {
    data() {
      return {
        position: 'right',
        options: [
          { label: '右对齐', value: 'right' },
          { label: '左对齐', value: 'left' },
          { label: '上对齐', value: 'top' }
        ]
      }
    }
  }
</script>
<style>
  .radio-group {
    margin-bottom: 24px;
  }
</style>
```

## 动态增减表单项

动态增加、减少表单项。

```html
<c-form label-width="80px">
  <c-form-item label="用户姓名" v-for="(item, index) in users" :key="index">
    <c-input
      placeholder="请输入姓名"
      style="width: 320px"
      v-model="item.username"
    />
    <c-button
      class="c-button--icon"
      size="small"
      style="margin-left: 16px;"
      @click="removeHandler(index)"
    >
      <c-icon-minus></c-icon-minus>
    </c-button>
  </c-form-item>
  <c-form-item label="">
    <c-button class="demo-button-add" @click="addHandler">
      <c-icon-plus style="margin-right: 8px;"></c-icon-plus>
      添加用户
    </c-button>
  </c-form-item>
  <c-form-item label="">
    <c-button type="primary" @click="submit">提交</c-button>
  </c-form-item>
</c-form>

<script>
  export default {
    data() {
      return {
        users: [
          {
            username: ''
          }
        ]
      }
    },
    methods: {
      submit() {
        this.$message({
          type: 'success',
          message: this.users.map(user => user.username).join(', ')
        })
      },
      addHandler() {
        this.users.push({
          username: ''
        })
      },
      removeHandler(index) {
        this.users.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
  .demo-button-add {
    width: 320px;
    border-style: dashed;
  }
  .c-icon--svg {
    stroke-width: 1.5px;
    vertical-align: -0.15em;
    color: #666;
  }
</style>
```

## 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误

> **如何进行校验**：若设置了 `trigger` 选项，当 `trigger` 触发时，会清空前一次校验错误信息（若有），并且仅执行相应 `trigger` 类型的校验，若相应 `trigger` 类型校验通过，则不显示错误信息。

> 针对 `string` 类型的 `required: true`，空白符也会通过校验（因为非空），可能不符合使用习惯。
> 可以使用 `pattern: /\S+/`，进行替换。

```html
<template>
  <c-form
    ref="form"
    label-width="120px"
    :model="form"
    :rules="rules"
    class="demo-form"
  >
    <c-form-item label="项目名称" prop="projectName">
      <c-input v-model="form.projectName" placeholder="请输入名称" />
    </c-form-item>
    <c-form-item label="联系电话" prop="phoneNumber">
      <c-input v-model="form.phoneNumber" placeholder="请输入电话" />
    </c-form-item>
    <c-form-item label="项目地点" prop="location">
      <c-select v-model="form.location">
        <c-option value="beijing">北京</c-option>
        <c-option value="shanghai">上海</c-option>
      </c-select>
    </c-form-item>
    <c-form-item label="项目风险" prop="projectRisk">
      <c-radio-group v-model="form.projectRisk">
        <c-radio v-for="(item, i) in options" :key="i" :value="item.value">
          {{item.label}}
        </c-radio>
      </c-radio-group>
    </c-form-item>
    <c-form-item
      label="项目说明"
      prop="projectDesc"
      :rules="[
      { required: true, message: '请输入项目说明', trigger: 'blur' }
    ]"
    >
      <c-input
        v-model="form.projectDesc"
        placeholder="请输入内容"
        html-type="textarea"
      />
    </c-form-item>
    <c-form-item label="">
      <c-button type="primary" @click="submit">提交</c-button>
      <c-button @click="reset">重置</c-button>
      <c-button type="primary" @click="validateProjectName">
        只校验项目名称
      </c-button>
      <c-button @click="resetProjectName">只重置项目名称</c-button>
    </c-form-item>
  </c-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          projectName: '',
          phoneNumber: '',
          location: '',
          projectRisk: '',
          projectDesc: ''
        },
        options: [
          { label: '高危', value: 'gw' },
          { label: '一般', value: 'yb' },
          { label: '低', value: 'd' },
          { label: '极低', value: 'jd' }
        ],
        rules: {
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min: 6, message: '请输入大于 6 位的数字', trigger: 'change' }
          ],
          location: [
            { required: true, message: '请选择地点', trigger: 'blur' }
          ],
          projectRisk: [
            { required: true, message: '请选择项目风险等级', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async submit() {
        const res = await this.$refs.form.validate()
        console.log('res', res)
      },
      async validateProjectName() {
        const res = await this.$refs.form.validate(['projectName'])
        console.log('res', res)
      },
      reset() {
        this.$refs.form.resetFields()
      },
      resetProjectName() {
        this.$refs.form.resetFields(['projectName'])
      }
    }
  }
</script>

<style>
  .demo-form .c-input,
  .demo-form .c-select {
    width: 300px;
  }
  .demo-form .c-checkbox-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .demo-form .c-checkbox {
    margin-right: 20px;
  }
  .demo-form .c-button + .c-button {
    margin-left: 10px;
  }
</style>
```

## 自定义校验

自己定义校验的时机和内容

```html
<template>
  <c-form
    ref="form"
    label-width="120px"
    :model="form"
    :rules="rules"
    class="demo-form"
  >
    <c-form-item label="设置密码" prop="password">
      <c-input v-model="form.password" placeholder="请输入密码" />
    </c-form-item>
    <c-form-item label="再次确认密码" prop="confirmPassword">
      <c-input v-model="form.confirmPassword" placeholder="请再次输入密码" />
    </c-form-item>
    <c-form-item label="身份证号" prop="idNumber">
      <c-input v-model="form.idNumber" placeholder="请输入身份证号" />
    </c-form-item>
    <c-form-item label="">
      <c-button type="primary" @click="submit">提交</c-button>
      <c-button @click="reset">重置</c-button>
    </c-form-item>
  </c-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          password: '',
          confirmPassword: '',
          idNumber: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 6,
              max: 16,
              message: '密码必须是 6 ~ 16 位的字符',
              trigger: 'blur'
            }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {
              validator: (rule, value) => value === this.form.password,
              message: '两次输入密码不一致',
              trigger: 'blur'
            }
          ],
          idNumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async submit() {
        const res = await this.$refs.form.validate()
        console.log('res', res)
      },
      reset() {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style>
  .demo-form .c-input,
  .demo-form .c-select {
    width: 300px;
  }
  .demo-form .c-checkbox-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .demo-form .c-checkbox {
    margin-right: 20px;
  }
  .demo-form .c-button + .c-button {
    margin-left: 10px;
  }
</style>
```

## Form Props

| Name           | Description                                                                                 | Type                             | Required | Default   |
| -------------- | ------------------------------------------------------------------------------------------- | -------------------------------- | -------- | --------- |
| label-position | 表单 Label 对齐方式                                                                         | `'right'` \| `'left'` \| `'top'` | `false`  | `'right'` |
| label-width    | 表单 Label 的宽度                                                                           | `number` \| `string`             | `false`  | -         |
| inline         | 是否是行内表单                                                                              | `boolean`                        | `false`  | `false`   |
| model          | 表单校验所绑定数据对象                                                                      | `object`                         | `false`  | -         |
| rules          | 表单校验规则对象，具体可参阅 [async-validator](https://github.com/yiminghe/async-validator) | `object`                         | `false`  | -         |

## FormItem Props

| Name        | Description                                                           | Type     | Required | Default |
| ----------- | --------------------------------------------------------------------- | -------- | -------- | ------- |
| label       | 表单 Item 标签文本                                                    | `string` | `false`  | -       |
| prop        | 表单 `model` 对象的属性，使用校验时设置，支持 `'path.to.prop'` 的写法 | `string` | `false`  | -       |
| label-width | 表单 Item Label 的宽度，优先级高于 Form 的 label-width                | `string` | `false`  | -       |
| helper-text | 表单 Item 帮助内容                                                    | `string` | `false`  | -       |
| rules       | 表单 Item 校验规则对象，优先级高于 Form 的 rules 对应规则设置         | `object` | `false`  | -       |

> 当 `prop` 使用 `'path.to.prop'` 的写法，并且搭配 `<c-form :rules="rules">`，需要留意，`rules` 的结构，要和 `model` 一一对应。

## FormItem Slots

| Name        | Description        |
| ----------- | ------------------ |
| default     | 表单 Item 内容     |
| label       | 标签文本内容       |
| helper-text | 表单 Item 帮助内容 |

## Form Methods

| Name        | Description                                                                                        | Parameters                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| validate    | 对表单（全部或部分字段）进行校验，返回一个 Promise，结果包含 `{ success: boolean, errors: Array }` | `prop[]` <br />`prop` 参考 FormItem Props 中的定义 |
| resetFields | 对表单（全部或部分字段）进行重置，包括移除表单值和校验结果                                         | `prop[]` <br />`prop` 参考 FormItem Props 中的定义 |

## Rule Object

例子：

```javascript
rules1 = [
  { required: true, message: '此项是必填项', trigger: 'blur' },
  { min: 6, message: '请至少输入6个字符', trigger: 'change' }
]
rule2 = [
  { required: true, message: '此项是必填项', trigger: 'blur' },
  { type: 'email', message: '请检查邮箱格式', trigger: 'change' }
]
```

Rule object 常用属性：

- **Type** `{ type: 'email' }`

- **Required** `{ required: true }`

- **Length** `{ min: 3, max: 16 }`

- **Message** `{ message: '名字是必填项' }`

- **Validator** `{ validator: (rule, value, callback) => { return value === 'test' } }`

更详尽的校验规则，请参阅 [async-validator](https://github.com/yiminghe/async-validator)
