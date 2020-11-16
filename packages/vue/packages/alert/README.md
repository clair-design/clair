---
group: Basic 基础
---

# Alert 警示提示

## 定义

展示需要关注的信息。

## 使用场景

当某个页面或者操作信息需要用户重点关注时； 警告提示是一种非阻碍式的信息展示，它不打断用户的当前操作，一般停留至页面某个位置（优先顶部），非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 基础样式

简单的常规用法。

```html
<template>
  <div>
    <c-alert
      type="error"
      content="这是一条失败的提示信息。"
      :closable="false"
    ></c-alert>
    <c-alert
      type="warning"
      content="这是一条警告的提示信息。"
      :closable="false"
    ></c-alert>
    <c-alert
      type="info"
      content="这是一条普通的提示信息。"
      :closable="false"
    ></c-alert>
    <c-alert
      type="success"
      content="这是一条成功的提示信息。"
      :closable="false"
    ></c-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return { visible: true }
    },
    methods: {
      handleClose() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .c-alert {
    width: 520px;
  }
  .c-alert + .c-alert {
    margin-top: 20px;
  }
</style>
```

## 不带图标的样式

Alert 默认展示状态图标，设置 `showIcon` 为 `false` 可不展示图标。

```html
<template>
  <div>
    <c-alert
      type="error"
      content="这是一条失败的提示信息。"
      :closable="false"
      :show-icon="false"
    ></c-alert>
    <c-alert
      type="warning"
      content="这是一条警告的提示信息。"
      :closable="false"
      :show-icon="false"
    ></c-alert>
    <c-alert
      type="info"
      content="这是一条普通的提示信息。"
      :closable="false"
      :show-icon="false"
    ></c-alert>
    <c-alert
      type="success"
      content="这是一条成功的提示信息。"
      :closable="false"
      :show-icon="false"
    ></c-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return { visible: true }
    },
    methods: {
      handleClose() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .c-alert {
    width: 520px;
  }
  .c-alert + .c-alert {
    margin-top: 20px;
  }
</style>
```

## 带删除操作

显示关闭按钮，点击可删除。

```html
<template>
  <div>
    <c-alert type="error" content="这是一条失败的提示信息。" closable></c-alert>
    <c-alert
      type="warning"
      content="这是一条警告的提示信息。"
      closable
    ></c-alert>
    <c-alert type="info" content="这是一条普通的提示信息。" closable></c-alert>
    <c-alert
      type="success"
      content="这是一条成功的提示信息。"
      closable
    ></c-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return { visible: true }
    },
    methods: {
      handleClose() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .c-alert {
    width: 520px;
  }
  .c-alert + .c-alert {
    margin-top: 20px;
  }
</style>
```

## 含有标题和辅助文字

含有标题及辅助性文字介绍的警告提示，让信息类型更加醒目。

```html
<template>
  <div>
    <c-alert
      type="error"
      title="错误提示的标题"
      content="一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。"
      closable
    ></c-alert>
    <c-alert
      type="warning"
      title="警告提示的标题"
      content="一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。"
      closable
    ></c-alert>
    <c-alert
      type="info"
      title="信息提示的标题"
      content="一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。"
      closable
    ></c-alert>
    <c-alert
      type="success"
      title="成功提示的标题"
      content="一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。"
      closable
    ></c-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return { visible: true }
    },
    methods: {
      handleClose() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .c-alert {
    width: 520px;
  }
  .c-alert + .c-alert {
    margin-top: 20px;
  }
</style>
```

## 使用 Slot 自定义内容

```html
<template>
  <c-alert type="info" title="信息提示的标题" :closable="false" ref="alert">
    <p style="text-align:justify">
      一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。一系列的信息描述，可能会很长，也可以是很短，同样也可以带标点。
    </p>
    <p style="text-align:right">
      <c-button @click="$refs.alert.close()">不再提示</c-button>
      <c-button type="primary" @click="$refs.alert.close()">关闭</c-button>
    </p>
  </c-alert>
</template>
<style>
  .c-alert {
    width: 520px;
  }
  .c-alert + .c-alert {
    margin-top: 20px;
  }
  .c-button + .c-button {
    margin-left: 10px;
  }
</style>
```

!include @vue/alert/api.md
