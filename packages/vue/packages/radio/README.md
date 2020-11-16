---
group: Form 表单
---

# Radio 单选框

## 定义

单个选中。

## 使用场景

用于在多个备选项中选中单个状态。 在一般的表单操作中，方便用户在比较中选择，因此选项不宜过多。

## 基本用法

简单的常规用法。

```html
<c-radio name="fruit" value="1" defaultChecked>选项 1</c-radio>
<c-radio name="fruit" value="2">选项 2</c-radio>
<c-radio name="fruit" value="3">选项 3</c-radio>
```

## 禁用状态

单选框不可用的状态。

```html
<c-radio name="fruit2" value="1" defaultChecked>选项 1</c-radio>
<c-radio name="fruit2" value="2" disabled>选项 2</c-radio>
<c-radio name="fruit2" value="3">选项 3</c-radio>
```

## Radio Group

使用 Radio Group 可以通过 `v-model` 对一组 Radio 中选中的值进行双向绑定。

```html
<c-radio-group v-model="fruit">
  <c-radio
    v-for="(item, i) in options"
    :key="i"
    :value="item.value"
    :disabled="item.disabled"
  >
    {{item.label}}
  </c-radio>
</c-radio-group>

<p>
  您选择的是:
  <code>{{ fruit || 'none' }}</code>
</p>

<script>
  export default {
    data() {
      return {
        fruit: '香蕉',
        options: [
          { label: '香蕉', value: '香蕉' },
          { label: '苹果', value: '苹果' },
          { label: '橘子', value: '橘子' },
          { label: '梨子', value: '梨子', disabled: true }
        ]
      }
    }
  }
</script>
```

当然你也可以直接传入一个 `options` 数组 ——

```html
<c-radio-group :options="options" v-model="fruit"></c-radio-group>
<p>您选择的是: {{ fruit || 'none' }}</p>

<script>
  export default {
    data() {
      return {
        fruit: '香蕉',
        options: [
          { label: '香蕉', value: '香蕉' },
          { label: '苹果', value: '苹果' },
          { label: '橘子', value: '橘子' },
          { label: '梨子', value: '梨子', disabled: true }
        ]
      }
    }
  }
</script>
```

## 按钮样式

在 Radio Group 中嵌套 `<c-radio-button>` 可以实现按钮样式的单选组合。

```html
<c-radio-group v-model="fruit">
  <c-radio-button
    v-for="(item, i) in options"
    :key="i"
    :value="item.value"
    :disabled="item.disabled"
  >
    {{item.label}}
  </c-radio-button>
</c-radio-group>

<script>
  export default {
    data() {
      return {
        fruit: '香蕉',
        options: [
          { label: '香蕉', value: '香蕉' },
          { label: '苹果', value: '苹果' },
          { label: '橘子', value: '橘子' },
          { label: '梨子', value: '梨子', disabled: true }
        ]
      }
    }
  }
</script>
```

## 尺寸

如果是按钮样式，你还可以通过 `size` 属性控制按钮的大小。

```html
<div class="radio-group-demo">
  <c-radio-group v-model="fruit" size="large">
    <c-radio-button
      v-for="(item, i) in options"
      :key="i"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{item.label}}
    </c-radio-button>
  </c-radio-group>
</div>
<div class="radio-group-demo">
  <c-radio-group v-model="fruit" size="normal">
    <c-radio-button
      v-for="(item, i) in options"
      :key="i"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{item.label}}
    </c-radio-button>
  </c-radio-group>
</div>
<div class="radio-group-demo">
  <c-radio-group v-model="fruit" size="small">
    <c-radio-button
      v-for="(item, i) in options"
      :key="i"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{item.label}}
    </c-radio-button>
  </c-radio-group>
</div>

<script>
  export default {
    data() {
      return {
        fruit: '香蕉',
        options: [
          { label: '香蕉', value: '香蕉' },
          { label: '苹果', value: '苹果' },
          { label: '橘子', value: '橘子' },
          { label: '梨子', value: '梨子', disabled: true }
        ]
      }
    }
  }
</script>

<style>
  .radio-group-demo:not(:first-child) {
    margin-top: 30px;
  }
</style>
```

## 自定义布局

你可以将 `<c-radio>` 组件嵌套在其它布局容器中，实现自定义布局。

```html
<c-radio-group style="display: block">
  <div class="container">
    <div class="item" v-for="item in options">
      <c-radio :value="item.value">{{item.label}}</c-radio>
    </div>
  </div>
</c-radio-group>

<script>
  export default {
    data() {
      return {
        options: [
          { label: '选项 A', value: 'A' },
          { label: '选项 B', value: 'B' },
          { label: '选项 C', value: 'C' },
          { label: '选项 D', value: 'D' },
          { label: '选项 E', value: 'E' },
          { label: '选项 F', value: 'F' },
          { label: '选项 G', value: 'G' },
          { label: '选项 H', value: 'H' },
          { label: '选项 I', value: 'I' }
        ]
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 25%;
    min-width: 120px;
    flex-grow: 1;
    padding-bottom: 20px;
  }
</style>
```

## Radio Props

| Name            | Description          | Type                                 | Required | Default    |
| --------------- | -------------------- | ------------------------------------ | -------- | ---------- |
| name            | 字段名               | `string`                             | `false`  | 内部实现   |
| disabled        | 是否禁用             | `boolean`                            | `false`  |            |
| value/v-model   | 该项目对应的值       | `number` \| `string` \| `boolean`    | `false`  |            |
| default-checked | 初始化时是否默认选中 | `boolean`                            | `false`  | `false`    |
| size            | 尺寸大小             | `'large'` \| `'normal'` \| `'small'` | `false`  | `'normal'` |

## Radio Events

| Event Name | Description                                         | Parameters                                                |
| ---------- | --------------------------------------------------- | --------------------------------------------------------- |
| change     | 类似于原生的 `input[type=radio]` 元素的 change 事件 | `{ target: { value: typeof value }, nativeEvent: Event }` |

## RadioGroup Props

| Name     | Description          | Type                                                          | Required | Default  |
| -------- | -------------------- | ------------------------------------------------------------- | -------- | -------- |
| name     | 字段名               | `string`                                                      | `false`  | 内部实现 |
| disabled | 禁用                 | `boolean`                                                     | `false`  |          |
| value    | 选中的值             | `number` \| `string` \| `boolean`                             | `false`  |          |
| options  | 以配置形式设置子元素 | `Array<{ label: string, value: string, disabled?: boolean }>` | `false`  | `false`  |

## RadioGroup Events

| Event Name | Description      | Parameters                                                |
| ---------- | ---------------- | --------------------------------------------------------- |
| change     | 选项变化时的事件 | `{ target: { value: typeof value }, nativeEvent: Event }` |
