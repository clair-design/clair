---
group: Form 表单
---

# Checkbox 多选框

## 定义

多选或状态切换标记。

## 使用场景

单个或多个选项中使用。单独使用时可以表示两种状态之间的切换，与“开关”类似，区别在于“开关”组件会直接触发状态改变，而 Checkbox 一般用于状态标记，需要和提交操作配合。

## 基础用法

单独使用，表示状态的开和关。

```html
<c-checkbox name="fruit" v-model="isChecked">选项1</c-checkbox>

<script>
  export default {
    data() {
      return {
        isChecked: true
      }
    }
  }
</script>
```

## 多选框组

也可以将多个 Checkbox 放入一组，表示从一个集合中选择若干项。

```html
<c-checkbox-group v-model="selected">
  <c-checkbox value="1">选项1</c-checkbox>
  <c-checkbox value="2">选项2</c-checkbox>
  <c-checkbox value="3" disabled>选项3</c-checkbox>
</c-checkbox-group>

<script>
  export default {
    data() {
      return {
        selected: ['1']
      }
    }
  }
</script>
```

## 全选样式

`indeterminate` 通常用于展示一组**未全部被选中**（部分选中）的多选框组状态。

```html
<c-checkbox
  v-model="allChecked"
  :indeterminate="indeterminate"
  @change="onCheckAllChange"
>
  全部选中
</c-checkbox>
<br />
<br />
<c-checkbox-group
  v-model="selected"
  :options="options"
  @change="onCheckedResultChange"
/>

<script>
  export default {
    data() {
      return {
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' },
          { label: '选项4', value: '4' }
        ],
        selected: ['2'],
        allChecked: false
      }
    },
    computed: {
      indeterminate() {
        const total = this.options.length
        const checked = this.selected.length
        return 0 < checked && checked < total
      }
    },
    methods: {
      onCheckAllChange({ target: { checked } }) {
        this.selected = !checked
          ? []
          : this.options.map(item => {
              return item.value
            })
      },
      onCheckedResultChange({ target: { value } }) {
        const total = this.options.length
        this.allChecked = value.length === total
      }
    }
  }
</script>
```

## Checkbox Props

| Name          | Description             | Type                                          | Required | Default    |
| ------------- | ----------------------- | --------------------------------------------- | -------- | ---------- |
| value         | 对应值                  | `string` \| `boolean` \| `number` \| `object` | `false`  | -          |
| checked       | 初始化时是否默认选中    | `boolean`                                     | `false`  | `false`    |
| disabled      | 是否禁用                | `boolean`                                     | `false`  | -          |
| size          | 尺寸                    | `'large'` \| `'normal'` \| `'small'`          | `false`  | `'normal'` |
| indeterminate | 设置 indeterminate 状态 | `boolean`                                     | `false`  | -          |

## Checkbox Events

| Event Name | Description          | Parameters                                                                  |
| ---------- | -------------------- | --------------------------------------------------------------------------- |
| change     | checkbox change 事件 | `{ target: { checked: boolean, value: typeof value }, nativeEvent: Event }` |

## CheckboxGroup Props

| Name     | Description          | Type                                                                            | Required | Default |
| -------- | -------------------- | ------------------------------------------------------------------------------- | -------- | ------- |
| disabled | 整组禁用             | `boolean`                                                                       | `false`  | -       |
| name     | 字段名               | `string`                                                                        | `false`  | -       |
| value    | 指定选中的选项       | `Array<string` \| `boolean` \| `number` \| `object>`                            | `false`  | -       |
| options  | 以配置形式设置子元素 | `Array<{ label: string, value: string, disabled?: boolean, checked: boolean }>` | `false`  | `false` |

## CheckboxGroup Events

| Event Name | Description                | Parameters                                                             |
| ---------- | -------------------------- | ---------------------------------------------------------------------- |
| change     | checkbox group change 事件 | `{ target: { value: Array<typeof value> } }`，`value` 对应当前选中的值 |
