---
title: Checkbox 复选框
layout: component
route: /component/checkbox
---

# Checkbox 复选框

## 单独使用

单独使用复选框表示在「是」、「否」两种状态之前进行选择，使用时给 `c-checkbox` 的 `v-model` 提供一个 `Boolean` 类型的值即可。

```html
<c-checkbox
  v-model="autoUpdate"
  label="开启自动更新"
/>

<script>
  export default {
    data () {
      return { autoUpdate: false }
    }
  }
</script>
```

## 禁用状态

给 `c-checkbox` 添加 `disabled` 属性即可将其禁用，用户不能再修改它的状态。

```html
<c-checkbox
  disabled
  v-model="autoUpdate"
  label="自动更新(开发中)"
/>

<c-checkbox
  disabled
  v-model="basic"
  label="基础套餐(必选)"
/>

<script>
  export default {
    data () {
      return {
        autoUpdate: false,
        basic: true
      }
    }
  }
</script>
```

## 多选框组

```html
<c-checkbox-group
  v-model="selected"
  :options="options"
/>

<p>你选择了 {{ selected }}</p>

<script>
  export default {
    data () {
      return {
        options: [
          { value: 1, label: '选项1' },
          { value: 2, label: '选项2' },
          { value: 3, label: '选项3', disabled: true }
        ],
        selected: [3]
      }
    }
  }
</script>
```

## 多选框组自定义内容

```html
<c-checkbox-group
  v-model="selected"
>
  <c-checkbox label="a" >选项1</c-checkbox>
  <c-checkbox label="选项2" ></c-checkbox>
  <c-checkbox label="选项3" ></c-checkbox>
</c-checkbox-group>

<p>你选择了 {{ selected }}</p>

<c-button primary @click="resetSelected">重置</c-button>

<script>
  export default {
    data () {
      return {
        selected: ["选项2"]
      }
    },
    methods: {
      resetSelected () {
        this.selected = []
      }
    }
  }
</script>
```

### indeterminate 状态

`indeterminate` 通常用于展示一组**未全部被选中**（部分选中）的多选框组状态。

```html
<c-checkbox
  v-model="allChecked"
  :indeterminate="indeterminate"
  label="全部选中"
  @change="onCheckAllChange"
/>
<br/>
<c-checkbox-group
  v-model="selected"
  :options="options"
  @change="onCheckedResultChange"
/>

<p>你选择了 {{ selected }}</p>

<script>
  export default {
    data () {
      return {
        options: [ 'Node', 'Nginx', 'Vue' ],
        selected: ['Node'],
        allChecked: false,
        indeterminate: true
      }
    },
    methods: {
      onCheckAllChange (e) {
        this.selected = !e ? [] : this.options
        this.indeterminate = false
      },
      onCheckedResultChange (e) {
        const total = this.options.length
        const checked = this.selected.length
        this.allChecked = e.length === total
        this.indeterminate = 0 < checked && checked < total
      }
    }
  }
</script>
```

## 多选验证

Clair 可以帮助你限制用户最少或最多选择多少项。

```html
<span>请选择2-4项：</span>
<c-checkbox-group
  v-model="selected"
  :options="options"
  :min-items="2"
  :max-items="4"
/>

<p v-if="selected.length">你选择了 {{ selected.join(', ') }}</p>

<script>
  export default {
    data () {
      return {
        options: [
          { value: 1, label: '香蕉' },
          { value: 2, label: '苹果' },
          { value: 3, label: '梨'},
          { value: 4, label: '芒果'},
          { value: 5, label: '木瓜'},
          { value: 6, label: '榴莲'}
        ],
        selected: []
      }
    }
  }
</script>
```

## API

## c-checkbox 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| label | String | 无 | 复选框关联的标签 |
| disabled | Boolean | false | 复选框是否被禁用 |
| indeterminate | Boolean | false | indeterminate 状态 |
| size | String | 'md' | 复选框尺寸 |

## c-checkbox-group 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| options | Array | 无 | 复选框组提供的选项列表 |
| required | Boolean | false | 该选项组是否必须选择一个 |
| min-items | Number | 无 | 最少选择几项 |
| max-items | Number | 无 | 最多选择几项 |

