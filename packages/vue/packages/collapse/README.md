---
group: Basic 基础
---

# Collapse 折叠面板

## 定义

内容区可以展开/收起。

## 使用场景

- 明确用户在此场景中完成的主要任务和需获取的决策信息。
- 明确决策信息和操作的优先级及内容特点，选择合理尺寸。
- 可以多层 panel 嵌套使用。

## 基础样式

可同时展开多个面板。

```html
<template>
  <c-collapse v-model="value" @change="change">
    <c-collapse-item title="折叠面板 1" name="a">
      这是一段关于折叠面板内容的描述，可能会很长，也可以是很短，同样也可以带标点。
    </c-collapse-item>
    <c-collapse-item title="折叠面板 2" name="b">
      折叠面板内容
    </c-collapse-item>
    <c-collapse-item title="折叠面板 3" name="c" disabled>
      折叠面板内容
    </c-collapse-item>
  </c-collapse>
</template>
<script>
  export default {
    data() {
      return {
        value: []
      }
    },
    methods: {
      change({ detail: { name, isActive } }) {
        console.log(name, isActive)
      }
    }
  }
</script>
```

## 手风琴样式

每次只打开一个面板。

```html
<template>
  <c-collapse accordion v-model="value">
    <c-collapse-item title="折叠面板 1" name="a">
      折叠面板内容
    </c-collapse-item>
    <c-collapse-item title="折叠面板 2" name="b">
      折叠面板内容
    </c-collapse-item>
    <c-collapse-item title="折叠面板 3" name="c">
      折叠面板内容
    </c-collapse-item>
  </c-collapse>
</template>

<script>
  export default {
    data() {
      return {
        value: ['a']
      }
    }
  }
</script>
```

## 自定义面板

可以根据需要，通过 `slot="title"` 自定义面板标题的内容。

```html
<template>
  <c-collapse v-model="value">
    <c-collapse-item name="a">
      <template slot="title">
        <div class="custom-title">
          <span>折叠面板 1</span>
          <c-icon-setting
            @click.stop="$message({message:'hello'})"
            class="icon"
          />
        </div>
      </template>
      这是一段关于折叠面板内容的描述，可能会很长，也可以是很短，同样也可以带标点。
    </c-collapse-item>
    <c-collapse-item title="折叠面板 2" name="b">
      折叠面板内容
    </c-collapse-item>
  </c-collapse>
</template>

<script>
  export default {
    data() {
      return {
        value: []
      }
    }
  }
</script>

<style scoped>
  .custom-title {
    display: flex;
    align-items: center;
  }

  .custom-title span {
    flex: 1;
  }

  .custom-title .icon {
    line-height: 1;
    padding: 10px;
  }

  .custom-title .icon:hover {
    background: #006bff;
    color: #fff;
  }
</style>
```

## Collapse Props

| Name          | Description                | Type       | Required | Default |
| ------------- | -------------------------- | ---------- | -------- | ------- |
| value/v-model | 当前激活面板 `name` 的集合 | `string[]` | `false`  | `[]`    |
| accordion     | 是否为手风琴模式           | `boolean`  | `false`  | `false` |

## Events

| Event Name | Description            | Parameters                                                                                                       |
| ---------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| change     | 面板展开状态改变时触发 | `{ detail: { name: string, isActive: boolean } }` <br>`name`: 当前 Item name；<br>`isActive`: 当前 Item 是否展开 |

## CollapseItem Props

| Name     | Description  | Type      | Required | Default |
| -------- | ------------ | --------- | -------- | ------- |
| name     | 唯一标识符   | `string`  | `true`   | -       |
| title    | 面板标题     | `string`  | `false`  | -       |
| disabled | 没有折叠内容 | `boolean` | `false`  | `true`  |
