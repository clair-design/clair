---
group: Navigation 导航
---

# Steps 步骤条

## 定义

步骤条是引导用户按照流程完成任务的导航条，帮助用户对操作流程长度和步骤有个预期，明确当前步骤和进度。建议多于 2 步少于 5 步。

## 使用场景

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

对于只有两步就能操作完成的进程不需要使用此组件。

一般位于页面顶部，头部导航下面。

## 基础样式

通用的基础步骤条。

可以通过给`c-step`设置`status`属性，展示每一步的状态。

```html
<template>
  <c-steps>
    <c-step step-key="1" title="第一步" status="finish" />
    <c-step step-key="2" title="第二步" status="process" />
    <c-step step-key="3" title="第三步" />
    <c-step step-key="4" title="完成" />
  </c-steps>
</template>
```

也可以通过给`c-steps`设置`active-key`，展示当先执行步骤。

```html
<template>
  <c-steps active-key="3">
    <c-step step-key="1" title="第一步" />
    <c-step step-key="2" title="第二步" />
    <c-step step-key="3" title="第三步" />
    <c-step step-key="4" title="完成" />
  </c-steps>
</template>
```

都不设置，则默认为第一步。

```html
<template>
  <c-steps>
    <c-step step-key="1" title="第一步" />
    <c-step step-key="2" title="第二步" />
    <c-step step-key="3" title="第三步" />
    <c-step step-key="4" title="完成" />
  </c-steps>
</template>
```

可监听`active-key`的变化。

```html
<template>
  <c-steps :activeKey="currentKey">
    <c-step step-key="1" title="第一步" />
    <c-step step-key="2" title="第二步" />
    <c-step step-key="3" title="第三步" />
    <c-step step-key="4" title="完成" />
  </c-steps>
  <c-button style="margin-top: 20px;" @click="onClickToNext">下一步</c-button>
</template>
<script>
  export default {
    data() {
      return {
        currentKey: '1'
      }
    },
    methods: {
      onClickToNext() {
        const currentStep = Number(this.currentKey)
        if (currentStep > 4) {
          return
        }
        this.currentKey = currentStep + 1 + ''
      }
    }
  }
</script>
```

## 描述样式

每个步骤带描述信息的样式。

```html
<template>
  <c-steps>
    <c-step
      step-key="1"
      title="第一步"
      status="finish"
      description="第一步的描述"
    />
    <c-step
      step-key="2"
      title="第二步"
      status="process"
      description="第二步的描述"
    />
    <c-step step-key="3" title="第三步" description="第三步的描述" />
    <c-step
      step-key="4"
      title="完成"
      description="更多的描述更多的描述更多的描述更多的描述更多的描述更多的描述"
    />
  </c-steps>
</template>
```

## 竖状样式

简单的竖直方向的步骤。

```html
<template>
  <c-steps is-vertical style="height: 400px">
    <c-step
      step-key="1"
      title="第一步"
      status="finish"
      description="第一步的描述"
    />
    <c-step
      step-key="2"
      title="第二步"
      status="process"
      description="第二步的描述"
    />
    <c-step step-key="3" title="第三步" description="第三步的描述" />
    <c-step step-key="4" title="完成" description="第四步的描述" />
  </c-steps>
</template>
```

## 步骤错误/驳回样式

步骤条某一步错误。

```html
<template>
  <c-steps>
    <c-step
      step-key="1"
      title="第一步"
      status="finish"
      description="第一步的描述"
    />
    <c-step
      step-key="2"
      title="第二步"
      status="error"
      description="第二步的描述"
    />
    <c-step step-key="3" title="第三步" description="第三步的描述" />
    <c-step step-key="4" title="完成" description="第四步的描述" />
  </c-steps>
</template>
```

## 点状步骤条

点状步骤条。

```html
<template>
  <c-steps is-dot>
    <c-step
      step-key="1"
      title="第一步"
      status="finish"
      description="本步骤相关的文字内容描述"
    />
    <c-step
      step-key="2"
      title="第二步"
      status="process"
      description="本步骤相关的文字内容描述"
    />
    <c-step
      step-key="3"
      title="第三步"
      description="本步骤相关的文字内容描述"
    />
    <c-step step-key="4" title="完成" description="本步骤相关的文字内容描述" />
  </c-steps>
</template>
```

## 点状步骤错误/驳回样式

```html
<template>
  <c-steps is-dot>
    <c-step
      step-key="1"
      title="第一步"
      status="finish"
      description="本步骤相关的文字内容描述"
    />
    <c-step
      step-key="2"
      title="第二步"
      status="error"
      description="本步骤相关的文字内容描述"
    />
    <c-step step-key="4" title="完成" description="本步骤相关的文字内容描述" />
  </c-steps>
</template>
```

## 自定义

可自定义`icon`、`title`、以及`description`。

```html
<template>
  <c-steps>
    <c-step step-key="1" title="第一步" status="finish">
      <template v-slot:icon>
        <c-icon-home class="icon" />
      </template>
    </c-step>
    <c-step step-key="2" status="process">
      <template v-slot:title>
        <span style="color: purple">自定义 title</span>
      </template>
      <template v-slot:description>
        <span style="color: brown">自定义 description</span>
      </template>
    </c-step>
    <c-step step-key="3">
      <template v-slot:title>
        <span style="color: purple">自定义 title</span>
      </template>
    </c-step>
    <c-step step-key="4" title="完成" />
  </c-steps>
</template>
```

## Steps Props

| Name        | Description          | Type      | Required | Default |
| ----------- | -------------------- | --------- | -------- | ------- |
| active-key  | 当前步骤索引         | `string`  | `false`  | '1'     |
| is-vertical | 步骤条是否纵向排列   | `boolean` | `false`  | `false` |
| is-dot      | 步骤条是否为点状样式 | `boolean` | `false`  | `false` |

## Step Props

| Name        | Description      | Type                                         | Required | Default  |
| ----------- | ---------------- | -------------------------------------------- | -------- | -------- |
| step-key    | 对应`active-key` | `string`                                     | `true`   | -        |
| title       | 标题             | `string`                                     | `true`   | -        |
| description | 描述文字         | `string`                                     | `false`  | -        |
| status      | 当前步骤状态     | `"wait"`\|`"process"`\|`"finish"`\|`"error"` | `false`  | `"wait"` |

## Step Slots

| Name        | Description |
| ----------- | ----------- |
| icon        | 自定义图标  |
| title       | 自定义标题  |
| description | 自定义描述  |
