---
group: Form 表单
---

# Rating 评分

## 定义

展示评价，或进行快速评级操作

## 使用场景

- 用户可通过手动选中来表达对产品的评价或者评级
- 用户可预设评分来显示产品的评分或者评级

## 基本样式

简单的常规用法。

```html
<c-rating />
```

## 文案辅助

用辅助文字直接地表达对应分数，这里唯有只读`readonly`属性开启的时候才显示小数数值。

```html
<div class="rating-group-example">
  <!-- 用户自定义文案内容，hover时更新 -->
  <c-rating v-model="value" @hover-change="handleHoverChange"></c-rating>
  <span class="rating-desc">{{ descTxt }}</span>
  <!-- 辅助文案内容是当前值，hover时不变 -->
  <c-rating
    :value="defaultValue"
    @change="handleDefaultChange"
    @hover-change="handleDefaultHoverChange"
  ></c-rating>
  <span class="rating-desc">{{ defaultValue }}</span>
  <!-- 当前值是浮点数的文案展示 -->
  <c-rating :value="floatValue" readonly></c-rating>
  <span class="rating-desc desc-color">{{ floatValue }}</span>
</div>

<script>
  export default {
    data() {
      return {
        value: 3,
        hoverValue: 3,
        defaultValue: 2,
        floatValue: 2.3,
        descInfo: ['极差', '很差', '一般', '优秀', '极好']
      }
    },

    computed: {
      descTxt() {
        return this.descInfo[Math.round(this.hoverValue) - 1] || ''
      }
    },

    methods: {
      handleChange(e) {
        this.value = e.target.value
      },
      handleHoverChange(e) {
        this.hoverValue = e.target.value || this.value
      },
      handleDefaultChange(e) {
        this.defaultValue = e.target.value
      },
      handleDefaultHoverChange(e) {
        this.defaultHoverValue = e.target.value
      }
    }
  }
</script>

<style scoped>
  .rating-group-example {
    width: 200px;
  }
  .rating-desc {
    margin-left: 20px;
  }
  .desc-color {
    color: #ffb409;
  }
</style>
```

## 只读样式

只能读取评分，无法进行交互操作。

```html
<c-rating :value="3" readonly />
```

## 其他样式

可以将星星替换为其他字符。

```html
<div class="custom-group-example">
  <!-- 预设字符类型展示 -->
  <c-rating :value="3" type="heart" />
  <!-- 自定义字符类型展示 -->
  <c-rating :value="3" type="custom" :size="20">
    <span slot="customChar">C</span>
  </c-rating>
</div>

<style scoped>
  .custom-group-example {
    width: 200px;
  }
</style>
```

### Props

| Name          | Description              | Type                            | Required | Default                               |
| ------------- | ------------------------ | ------------------------------- | -------- | ------------------------------------- |
| count         | 显示的星星数量           | `number`                        | `false`  | `5`                                   |
| value/v-model | 显示的选中星星数量       | `number`                        | `false`  | `0`                                   |
| type          | 评分图标类型             | `'star'`\|`'heart'`\|`'custom'` | `false`  | `star`                                |
| color         | 自定义字符被选中时的颜色 | `string`                        | `false`  | `star：#FFB409` <br> `heart: #FF6860` |
| size          | 自定义字符大小           | `number`                        | `false`  | `16`                                  |
| readonly      | 只读，无法交互           | `boolean`                       | `false`  | `false`                               |

### Events

| Name         | Description | Parameters                                           |
| ------------ | ----------- | ---------------------------------------------------- |
| change       | 选择时回调  | `{ target: { value: number }, nativeEvent?: Event }` |
| hover-change | 悬浮时回调  | `{ target: { value: number }, nativeEvent?: Event }` |

### Slots

| Name       | Description                                        |
| ---------- | -------------------------------------------------- |
| customChar | 自定义图标字符类型，唯有`type`为`custom`时，才生效 |
