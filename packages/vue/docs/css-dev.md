# 样式开发

样式开发指引。

## 颜色

为了统一组件库中的颜色，我们提取出来了以下公共的颜色变量，以便大家在组件中使用。

### 基础颜色

```html
<template demo-only>
  <div class="color-list">
    <color-swatch
      v-for="color in colors"
      :key="color.hex"
      :name="color.name"
      :color="color.hex"
    >
      <div class="hsl">{{ color.hsl }}</div>
      <div class="var">{{ color.var }}</div>
      <div class="desc">{{ color.desc }}</div>
    </color-swatch>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: [
        {
          name: '主色',
          var: '$--primary-color',
          hex: '#006bff',
          hsl: 'hsl(215, 100%, 50%)',
          desc: '用在主操作按钮、链接、选中状态等很多地方'
        },
        {
          name: '成功色',
          var: '$--success-color',
          hex: '#52b818',
          hsl: 'hsl(98, 77%, 41%)',
          desc: '用在成功提示、进度条等'
        },
        {
          name: '警告色',
          var: '$--warning-color',
          hex: '#fea119',
          hsl: 'hsl(36, 100%, 55%)',
          desc: '用在警告提示'
        },
        {
          name: '危险色',
          var: '$--danger-color',
          hex: '#f84e44',
          hsl: 'hsl(3, 93%, 62%)',
          desc: '用在危险操作按钮、错误提示'
        }
      ]
    })
  }
</script>

<style>
  .color-swatch {
    flex: 1;
    display: block;
    line-height: 2;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  }
  .color-swatch .desc {
    line-height: 1.5;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }
  .color-swatch ::v-deep div:first-child {
    font-size: 16px;
    font-weight: 500;
  }
  .color-swatch + .color-swatch {
    margin-left: 2em;
  }
  .color-list {
    display: flex;
  }
</style>
```

### 文字颜色

```html
<template demo-only>
  <div class="color-list">
    <color-swatch
      v-for="color in colors"
      :key="color.hex"
      :name="color.name"
      :color="color.hex"
      :style="{ color: color.hex, backgroundColor: '#fff' }"
    >
      <div class="hsl">{{ color.hsl }}</div>
      <div class="var">{{ color.var }}</div>
      <div class="desc">{{ color.desc }}</div>
    </color-swatch>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: [
        {
          name: '基础文本',
          var: '$--base-text-color',
          hex: '#202020',
          hsl: 'hsl(0, 0%, 13%)',
          desc: '用作正文、标题、默认按钮、输入框等场合的默认文字颜色'
        },
        {
          name: '次要文本',
          var: '$--secondary-text-color',
          hex: '#555555',
          hsl: 'hsl(0, 0%, 33%)',
          desc: '用作弹出框、警示框的文字颜色'
        },
        {
          name: '辅助性文本',
          var: '$--tertiary-text-color',
          hex: '#999999',
          hsl: 'hsl(0, 0%, 60%)',
          desc:
            '用作进度条文字、面包屑分隔符、空状态提示、表单引导提示、选项分组标题等文字颜色'
        },
        {
          name: '禁用文本',
          var: '$--disabled-text-color',
          hex: '#c7c7c7',
          hsl: 'hsl(0, 0%, 78%)',
          desc: '用作被禁用的表单元素上的文本颜色'
        }
      ]
    })
  }
</script>

<style>
  .color-swatch {
    display: block;
    flex-grow: 1;
    line-height: 2;
    border: 1px solid #ccc;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  }
  .color-swatch + .color-swatch {
    margin-left: 2em;
  }
  .color-swatch .desc {
    line-height: 1.5;
    margin-top: 8px;
    font-size: 14px;
  }
  .color-swatch ::v-deep div:first-child {
    font-size: 16px;
    font-weight: 500;
  }
  .color-list {
    display: flex;
  }
</style>
```

### 背景色

系统中默认背景颜色为纯白色（`#FFF`）。如果在使用到纯白色的地方，请使用 `$--base-background-color`。

```html
<template demo-only>
  <div class="color-list">
    <color-swatch
      v-for="color in colors"
      :key="color.hex"
      :name="color.name"
      :color="color.hex"
    >
      <div class="hsl">{{ color.hsl }}</div>
      <div class="var">{{ color.var }}</div>
      <div class="desc">{{ color.desc }}</div>
    </color-swatch>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: [
        {
          name: '基础背景',
          var: '$--base-background-color',
          hex: '#ffffff',
          hsl: 'hsl(0, 0%, 100%)',
          desc: '用作页面默认背景、默认按钮、各种弹窗和输入框的背景色'
        },
        {
          name: '淡灰背景',
          var: '$--light-background-color',
          hex: '#f6f7fb',
          hsl: 'hsl(215, 38%, 97%)',
          desc: '用作表头、折叠面板的背景色'
        },
        {
          name: '淡彩背景',
          var: '$--pastel-background-color',
          hex: '#f2f7ff',
          hsl: 'hsl(215, 100%, 97%)',
          desc: '用作下拉框选项、表格行在 hover 时的背景色'
        },
        {
          name: '浅灰背景',
          var: '$--light-gray-background-color',
          hex: '#F0F2F5',
          hsl: 'hsl(216, 20%, 95%)',
          desc: '用作标签(Tag)背景色'
        },
        {
          name: '禁用态背景',
          var: '$--disbled-background-color',
          hex: '#f2f2f2',
          hsl: 'hsl(0, 0%, 95%)',
          desc: '用作输入、选择、勾选等表单控件禁用时的背景'
        },
        {
          name: '灰色背景',
          var: '$--gray-background-color',
          hex: '#e6e6e6',
          hsl: 'hsl(0, 0%, 90%)',
          desc: '用作标签(Tag)背景色'
        }
      ]
    })
  }
</script>

<style>
  .color-swatch {
    display: block;
    width: 30%;
    margin: 1em;
    flex-grow: 1;
    line-height: 2;
    color: #202020;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  }
  .color-swatch .desc {
    line-height: 1.5;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
  }
  .color-swatch ::v-deep div:first-child {
    font-size: 16px;
    font-weight: 500;
  }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    margin: -1em;
  }
</style>
```

### 边框色

```html
<template demo-only>
  <div class="color-list">
    <color-swatch
      v-for="color in colors"
      :key="color.hex"
      :name="color.name"
      :color="color.hex"
    >
      <div class="hsl">{{ color.hsl }}</div>
      <div class="var">{{ color.var }}</div>
      <div class="desc">{{ color.desc }}</div>
    </color-swatch>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: [
        {
          name: '主边框',
          var: '$--primary-border-color',
          hex: '#dddddd',
          hsl: 'hsl(0, 0%, 87%)',
          desc: '用作各种表单元素和 Tab 的边框颜色'
        },
        {
          name: '二级边框',
          var: '$--secondary-border-color',
          hex: '#EFF0F2',
          hsl: 'hsl(220, 10%, 94%)',
          desc: '用作下拉框选项分割线、弹窗的边框等'
        }
      ]
    })
  }
</script>

<style>
  .color-swatch {
    display: block;
    width: 30%;
    margin: 1em;
    flex-grow: 1;
    line-height: 2;
    color: #202020;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  }
  .color-swatch .desc {
    line-height: 1.5;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
  }
  .color-swatch ::v-deep div:first-child {
    font-size: 16px;
    font-weight: 500;
  }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    margin: -1em;
  }
</style>
```

## 生成颜色

> 请务必要优先使用上面列出来的颜色变量，它们也应该能够满足大部分场景的需要。

如果你确实需要在组件中使用其它颜色，请考虑以下问题：

- 这个颜色如何从背景色、文本色、主色或其它基本颜色生成出来的？比如调整亮度、叠加等。以主要操作按钮为例，在 hover 时，它的颜色会变浅。变化后的颜色是从主色 `primary-color` 衍生出来的，只需要通过 SASS 函数调节主色的亮度就可以。
- 要考虑到用户定制主题的场景，尤其是暗色系主题下，颜色生成的规则是什么样的。还是以主操作按钮 hover 时为例，我们会下意识地认为增加主色的亮度生成 hover 时的颜色。但是，请想一下暗色系主题。为了兼容亮色和暗色两种风格，我们可以这样思考：hover 时，其实是让主色更接近了背景色。

为了方便大家在兼容明暗两种风格去衍生各种颜色，我们写了一些 SASS 函数让大家使用。

### `get-lightness($diff)`

指定一个和背景颜色的亮度差，返回合适的亮度值。

比如在纯白色背景下，`get-lightness(10%)` 会返回 `90%`，而纯黑色背景下会返回 `10%`。

### `text-color($bg-color)`

根据背景颜色  返回文字的颜色。在深色背景下，返回白色；浅色背景下，返回深色。

在背景颜色可以被定制的场景下，一定要记得使用这个函数来获取文字颜色。例如，主操作按钮的背景色是主色，项目开发者可以自己定制主色。如果定制的主色很浅，那么按钮就会以深色文字显示。

### `tint($color, $amount)`

让指定颜色更接近背景颜色。`$amount` 表示在接近背景颜色的方向上的亮度变化。

比如主操作按钮在 hover 时，可以通过 `tint(10%)` 使它在浅色背景下亮度增加 `10%`，即变浅；而深色背景下，亮度减少 `10%`。

### `shade($color, $amount)`

让指定颜色更接近文字颜色。因为通常默认的背景色和文字颜色有较大的反差，所以更接近文字颜色意味着它在背景上被“突出显示”。

比如主操作按钮在 active 时，可以通过 `shade(10%)` 使它在浅色背景下亮度减小 `10%`，即变深；而深色背景下，亮度增加 `10%`。
