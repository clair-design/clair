---
group: Data 数据展示
---

# Progress 进度条

## 定义

展示当前任务、事件及操作的进展，具体的状态值。

## 使用场景

- 当需要显示一个操作完成的百分比时，需要给用户反馈当前操作的状态反馈；
- 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态，提供更友好的提示时；
- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时。

## 基础样式

基础标准化的进度条。

```html
<div class="custom-progress-example">
  <c-progress :value="50"></c-progress>
  <c-progress :value="63" status="active">加载中…</c-progress>
  <c-progress :value="86" status="exception"></c-progress>
  <c-progress :value="100" status="success"></c-progress>
</div>
```

## 小型样式

适用于区域较小的情况。

```html
<div class="custom-progress-example custom-progress-example-smallbox">
  <c-progress :value="50" size="small"></c-progress>
  <c-progress :value="63" size="small" status="active">加载中…</c-progress>
  <c-progress :value="86" size="small" status="exception"></c-progress>
  <c-progress :value="100" size="small" status="success"></c-progress>
</div>
<style>
  .custom-progress-example-smallbox {
    width: 200px;
  }
</style>
```

## 进度圈样式

圆形的进度条。

```html
<div class="custom-progress-example">
  <c-progress :value="68" type="circle"></c-progress>
  <c-progress :value="84" type="circle" status="exception"></c-progress>
  <c-progress :value="100" type="circle" status="success"></c-progress>
</div>
```

## 小型进度圈样式

小一号的圆形进度条。

```html
<div class="custom-progress-example">
  <c-progress :value="68" type="circle" size="small"></c-progress>
  <c-progress
    :value="84"
    type="circle"
    size="small"
    status="exception"
  ></c-progress>
  <c-progress
    :value="100"
    type="circle"
    size="small"
    status="success"
  ></c-progress>
</div>
```

## 自定义颜色

使用 `stroke-color` 可以为进度条指定已完成部分的颜色。

```html
<div class="custom-progress-example">
  <div>
    <c-progress :value="50" :stroke-color="colors[colorIndex]"></c-progress>
  </div>
  <div>
    <c-progress
      :value="50"
      :stroke-color="colors[colorIndex]"
      type="circle"
    ></c-progress>
  </div>
  <c-button @click="changeColor" style="margin-top: 2em;">换个颜色</c-button>
</div>

<script>
  export default {
    data() {
      return {
        colors: [
          '#006bff',
          '#3cae11',
          '#fd8c13',
          '#fa4136',
          '#7748a7',
          '#777',
          '#0facab',
          '#ea2e94'
        ],
        colorIndex: 0
      }
    },
    methods: {
      changeColor() {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length
      }
    }
  }
</script>
```

## 自定义尺寸

```html
<div class="custom-progress-example">
  <div class="custom-progress-section">
    <c-form inline>
      <c-form-item label="线条粗细：">
        <c-input-number v-model="lineStrokeWidth" :min="1" :max="30" />
      </c-form-item>
      <c-form-item label="整体宽度：">
        <c-input-number v-model="lineWidth" :step="10" :min="100" :max="500" />
      </c-form-item>
    </c-form>
    <div class="progress-container">
      <c-progress
        :value="68"
        type="circle"
        :stroke-width="lineStrokeWidth"
        :width="lineWidth"
      ></c-progress>
      <c-progress
        :value="68"
        :stroke-width="lineStrokeWidth"
        :width="lineWidth"
      ></c-progress>
    </div>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        lineStrokeWidth: 6,
        lineWidth: 200
      }
    }
  }
</script>

<style>
  .progress-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
```

## 自定义文本

```html
<div class="custom-progress-example">
  <!-- 使用slot自定义文本 -->
  <c-progress :value="68" stroke-color="#fea119" :info-width="14">
    <c-icon-status-warning></c-icon-status-warning>
  </c-progress>

  <!-- 通过作用域插槽传递当前值和最大值 -->
  <c-progress :value="84" v-slot="{ value, max }">
    ({{value}}/{{max}})
  </c-progress>

  <!-- 隐藏文本 -->
  <c-progress :value="100" :show-info="false"></c-progress>
</div>
```

## Props

| Name                    | Description          | Type                                                     | Required | Default    |
| ----------------------- | -------------------- | -------------------------------------------------------- | -------- | ---------- |
| max                     | 最大值               | `number`                                                 | `false`  | `100`      |
| value                   | 进度条当前值         | `number` \| `Array<number>`                              | `false`  | `0`        |
| type                    | 进度条类型           | `'line'` \| `'circle'`                                   | `false`  | `'line'`   |
| size                    | 进度条尺寸           | `'normal'` \| `'small'`                                  | `false`  | `'normal'` |
| status                  | 进度条状态           | `'normal'` \| `'active'` \| `'success'` \| `'exception'` | `false`  | `'normal'` |
| width[type="line"]      | 线形进度条整体宽度   | `number`                                                 | `false`  | -          |
| width[type="circle"]    | 圆形进度条画布宽度   | `number`                                                 | `false`  | -          |
| stroke-width            | 进度条线的宽度       | `number`                                                 | `false`  | -          |
| stroke-color            | 进度条线的颜色       | `string` \| `Array<string>`                              | `false`  | -          |
| show-info               | 是否展示进度条内容   | `boolean`                                                | `false`  | `true`     |
| info-width[type="line"] | 线形进度条内容的宽度 | `number`                                                 | `false`  | -          |
