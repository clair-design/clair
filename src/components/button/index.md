# Button 按钮

Button 组件提供了不同的按钮风格以及状态、尺寸等选项。

## 示例

```html
<c-button>默认按钮</c-button>
<c-button primary>主操作按钮</c-button>
<c-button disabled></c-button>
```

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| primary | Boolean | false | 是否主要操作按钮 |
| size | String | 'normal' | 尺寸，可以取 `x-small` `small` `normal` `large` `x-large` |
