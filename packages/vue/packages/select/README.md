---
group: Form 表单
---

# Select 下拉选择

## 定义

以条形菜单栏和下拉的菜单项窗口两部分组成，供使用者选择目标项。

## 使用场景

- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。
- 单选框超过 7 个时使用下拉选择器组件，下拉选择组件内容超过十个后出现滚动条展示。
- 对于暂不可用的选项进行灰化处理。
- 除特殊情况外，下拉框必须提供默认选项。说明：特殊情况包括涉及法律、可靠性、安全性的选择，需要用户明确作出选择，不提供默认选项。
- 已选对象必须处于选中状态，选项数据必须按照一定规则进行有效排序（字典排序、选择的频繁度、重要性）。
- 尽量让用户直接读懂选项的含义，而不需要配合其他途径来理解。
- 可以再选项之后的括号中指定单位。
- 有常用选项的将常用选项设为默认值，没有常用选项的，默认展示位“请选择…”，并列为第一选项。
- 将表示“全部”或“无”的选项放在列表开头，而无需考虑它与其他项目的顺序关系。

## 基本用法

使用 `v-model` 绑定用户选择的值, `<c-option>` 标签指定所有的选项。

```html
<c-select v-model="value">
  <c-option value="1">选项 1</c-option>
  <c-option value="2">选项 2</c-option>
  <c-option value="3">选项 3</c-option>
  <c-option value="4">选项 4</c-option>
  <c-option value="5">选项 5</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>
```

## 禁用状态

选择器不可用。

```html
<c-select disabled />
```

## 禁用选项

在 `<c-option>` 上设置 `disabled` 属性可将该选项禁用。

```html
<c-select v-model="value">
  <c-option value="1">选项 1</c-option>
  <c-option value="2">选项 2</c-option>
  <c-option value="3" disabled>选项 3</c-option>
  <c-option value="4">选项 4</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
```

## 可清空样式

设置 `clearable` 允许用户清空已选中的内容。

```html
<c-select v-model="value" clearable>
  <c-option value="1">选项 1</c-option>
  <c-option value="2">选项 2</c-option>
  <c-option value="3">选项 3</c-option>
  <c-option value="4">选项 4</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: '2'
      }
    }
  }
</script>
```

## 多选

设置 `multiple` 属性可以使选择器支持多选。

> 注意：多选时，`v-model` 绑定的值必须为数组。

```html
<c-select v-model="value" multiple>
  <c-option value="1">选项 1</c-option>
  <c-option value="2">选项 2</c-option>
  <c-option value="3" disabled>选项 3</c-option>
  <c-option value="4">选项 4</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: ['2', '3']
      }
    }
  }
</script>
```

## 分组

可以使用 `<c-option-group>` 将选项进行分组，方便用户查找。

```html
<c-select v-model="value">
  <c-option-group title="水果">
    <c-option>香蕉</c-option>
    <c-option>苹果</c-option>
  </c-option-group>
  <c-option-group title="蔬菜">
    <c-option>白菜</c-option>
    <c-option>萝卜</c-option>
  </c-option-group>
</c-select>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
```

## 自定义选项的展示

在 `<c-option>` 的默认 `slot` 中可以写自定义的内容。

此时需要设置 `option` 的 `label` 属性, 否则选中值可能不会正确显示。

```html
<c-select v-model="value">
  <c-option label="北京">
    <div class="option">
      <div class="city">北京</div>
      <div class="code">PEK</div>
    </div>
  </c-option>
  <c-option label="上海">
    <div class="option">
      <div class="city">上海</div>
      <div class="code">PVG</div>
    </div>
  </c-option>
  <c-option label="广州">
    <div class="option">
      <div class="city">广州</div>
      <div class="code">CAN</div>
    </div>
  </c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<style scoped>
  .option {
    display: flex;
  }
  .city {
    flex: 1;
  }
  .code {
    color: #90959f;
  }
</style>
```

## 允许筛选选项

设置 `filterable` 可以根据用户输入对选项进行筛选，默认根据 label 的值进行筛选。

```html
<c-select v-model="value" filterable>
  <c-option v-for="option in options" :key="option">{{option}}</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          'Beijing',
          'Shanghai',
          'Guangzhou',
          'Shenzhen',
          'Chengdu',
          'Chongqing',
          'Wuhan'
        ]
      }
    }
  }
</script>
```

## 自定义筛选条件

你可以传入自己的 `filter` 函数来自定义  对选项的筛选。

```html
<c-select
  v-model="value"
  filterable
  :filter="filter"
  placeholder="输入拼音或汉字进行筛选"
>
  <c-option
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
  />
</c-select>

<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          { value: 'Beijing', label: '北京' },
          { value: 'Shanghai', label: '上海' },
          { value: 'Guangzhou', label: '广州' },
          { value: 'Shenzhen', label: '深圳' },
          { value: 'Chengdu', label: '成都' },
          { value: 'Chongqing', label: '重庆' },
          { value: 'Wuhan', label: '武汉' }
        ]
      }
    },
    methods: {
      filter(option, query) {
        return (
          option.label.includes(query) ||
          option.value.toLowerCase().includes(query.toLowerCase())
        )
      }
    }
  }
</script>
```

## 远程筛选

用户在输入过滤条件时，向服务器发送请求获取过滤后的选项。

```html
<c-select
  v-model="value"
  @query-change="queryChange"
  async
  :loading="loading"
  loading-text="正在查找..."
  :filter-throttle="300"
>
  <c-option v-for="option in options" :key="option" :value="option+'-value-'">
    {{option}}
  </c-option>
</c-select>

<script>
  // 模拟异步请求，返回5条随机数据
  const randomString = () => Math.random().toString(36).substr(4)
  const getOptions = query => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          [...new Array(5)].map(() => {
            return `${query}-${randomString()}`
          })
        )
      }, 500)
    })
  }
  const defaultOptions = ['选项1', '选项2']

  export default {
    data() {
      return {
        value: '',
        loading: false,
        options: defaultOptions
      }
    },
    methods: {
      queryChange(query) {
        if (!query) {
          return
        }
        this.loading = true
        getOptions(query).then(options => {
          this.options = options
          this.loading = false
        })
      }
    }
  }
</script>
```

## 不同尺寸

大中小三种组合，可以和表单输入框进行对应。

```html
<c-select size="small" v-model="small">
  <c-option>北京</c-option>
  <c-option>上海</c-option>
  <c-option>广州</c-option>
</c-select>
<c-select size="normal" v-model="normal">
  <c-option>北京</c-option>
  <c-option>上海</c-option>
  <c-option>广州</c-option>
</c-select>
<c-select size="large" v-model="large">
  <c-option>北京</c-option>
  <c-option>上海</c-option>
  <c-option>广州</c-option>
</c-select>

<script>
  export default {
    data() {
      return {
        small: '',
        normal: '',
        large: ''
      }
    }
  }
</script>

<style scoped>
  .c-select {
    display: flex;
  }

  .c-select:not(:last-child) {
    margin-bottom: 1em;
  }
</style>
```

## Select Props

| Name            | Description                                                                                  | Type                                                                | Required | Default         |
| --------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- | --------------- |
| value/v-model   | 绑定值                                                                                       | `string` \| `number` \| `object`                                    | `true`   | -               |
| multiple        | 是否允许多选                                                                                 | `boolean`                                                           | `false`  | `false`         |
| disabled        | 下拉框是否被禁用                                                                             | `boolean`                                                           | `false`  | `false`         |
| size            | 输入框尺寸                                                                                   | `'large'` \| `'normal'` \| `'small'`                                | `false`  | `normal`        |
| placeholder     | 未进行选择时的提示                                                                           | `string`                                                            | `false`  | `'请选择'`      |
| loading         | 是否正在从远程获取数据                                                                       | `boolean`                                                           | `false`  | `false`         |
| loading-text    | 远程加载时显示的文字                                                                         | `string`                                                            | `false`  | `'加载中'`      |
| filterable      | 是否允许用户对选项进行搜索                                                                   | `boolean`                                                           | `false`  | `false`         |
| filter          | 自定义对选项过滤函数(异步返回 Promise)                                                       | `(options: Array<option>, query: string) => Promise<Array<option>>` | `false`  | -               |
| filter-throttle | 调用 filter 函数的最短间隔                                                                   | `number`                                                            | `false`  | `0`             |
| async           | 是否允许用户远程搜索, 若允许 则可监听`query-change`事件, 结合 loading 字段进行数据的远程获取 | `boolean`                                                           | `false`  | `false`         |
| no-data-text    | 选项为空时显示的文字                                                                         | `string`                                                            | `false`  | `'无数据'`      |
| no-match-text   | 搜索条件无匹配时显示的文字                                                                   | `string`                                                            | `false`  | `'无匹配数据'`  |
| clearable       | 是否可以清空选项                                                                             | `boolean`                                                           | `false`  | `false`         |
| append-target   | 插入 Option 面板的容器元素                                                                   | `Element`                                                           | `false`  | `document.body` |

## Option Props

| Name     | Description                             | Type                         | Required | Default |
| -------- | --------------------------------------- | ---------------------------- | -------- | ------- |
| label    | 选项的标签，若不设置则默认与 value 相同 | `string`                     | `false`  | -       |
| value    | 选项的值                                | `string`\|`number`\|`object` | `false`  | -       |
| disabled | 下拉框是否被禁用                        | `boolean`                    | `false`  | `false` |

## Group Props

| 名称  | 描述       | 类型     | 必填   | 默认值 |
| ----- | ---------- | -------- | ------ | ------ |
| title | 分组的组名 | `string` | `true` | -      |

## Select Events

| Event Name        | Description                              | Parameters                                                             |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| change            | 选中值发生变化时触发                     | `{ targe: { value: string \| number \| object }, nativeEvent: Event` } |
| query-change      | 远程搜索时,输入框内容发生变化时触发      | `query: string`                                                        |
| visibility-change | 下拉框出现/隐藏时触发                    | `visibility: boolean`                                                  |
| remove-tag        | 删除多选的某一项                         | 被删除的选项 `option: { label, value }`                                |
| clear             | 可清空的单选模式下用户点击清空按钮时触发 | `e: Event`                                                             |
| focus             | 获取焦点                                 | `e: Event`                                                             |
| blur              | 失去焦点，并隐藏下拉框                   | `e: Event`                                                             |
