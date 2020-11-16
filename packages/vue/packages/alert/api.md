## Props

| Name      | Description   | Type                                                | Required | Default  |
| --------- | ------------- | --------------------------------------------------- | -------- | -------- |
| type      | 类型          | `'success'` \| `'warning'` \| `'error'` \| `'info'` | `false`  | `'info'` |
| title     | 标题内容      | `string`                                            | `false`  | -        |
| content   | 正文内容      | `string`                                            | `false`  | -        |
| show-icon | 是否显示 Icon | `boolean`                                           | `false`  | `true`   |
| closable  | 是否可关闭    | `boolean`                                           | `false`  | `true`   |

## Events

| Event Name | Description | Parameters               |
| ---------- | ----------- | ------------------------ |
| close      | 关闭时触发  | `{ nativeEvent: Event }` |

## Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| title   | 标题内容，优先级高于 `props.title`    |
| default | 正文内容， 优先级高于 `props.content` |

## Methods

| Method | Description     | Parameters |
| ------ | --------------- | ---------- |
| show   | 展现 alert      | -          |
| close  | 关闭 alert      | -          |
| toggle | 切换 alert 展现 | -          |
