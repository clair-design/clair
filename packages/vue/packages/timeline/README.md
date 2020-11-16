---
group: Basic 基础
---

# Timeline 时间轴

## 定义

按事件时间线展示信息、数据

## 使用场景

使用垂直展示的时间流信息； 当有一系列信息需要从上至下按时间排列时；
需要由一条时间轴进行视觉上的串联时。

## 基础样式

最基础的时间轴

```html
<template>
  <c-timeline>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item solid>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## 最后一个节点

当数量过多时，在最后位置添加一个幽灵节点，表示时间轴未完成，还在记录过程中。

```html
<template>
  <c-timeline>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新中......</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## 自定义时间轴节点

可自定义更换图标和其他元素

```html
<template>
  <c-timeline>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <template v-slot:icon>
        <c-icon-clock />
      </template>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## 带状态的时间轴

颜色表示不同状态，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。

```html
<template>
  <c-timeline>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## 交替展现

内容在时间轴两侧交替展现

```html
<template>
  <c-timeline placement="center">
    <c-timeline-item>
      <template v-slot:icon>
        <c-icon-clock />
      </template>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>成功上传按钮组件 2019-02-21</div>
      <div>成功上传选择器组件1</div>
      <div>成功上传选择器组件2 2019-02-21</div>
      <div>成功上传选择器组件1</div>
      <div>成功上传选择器组件2 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>成功上传选择器组件1</div>
      <div>成功上传选择器组件2 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <template v-slot:icon>
        <c-icon-clock />
      </template>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .c-timeline {
    width: 600px;
  }
</style>
```

## 右侧时间轴

时间轴点在右侧

```html
<template>
  <c-timeline placement="right">
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <template v-slot:icon>
        <c-icon-clock />
      </template>
      <div>修复了图标显示不正确 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>更新日志描述 2019-02-21</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## 自定义时间轴

时间轴点在右侧

```html
<template>
  <c-timeline>
    <c-timeline-item>
      <div>正在同步数据 30分钟前</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>完成缓存清理 6小时前</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>成功修复系统漏洞 09:54:30</div>
      <div>成功上传数据包</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <div>设备检修暂停访问 2019-07-30</div>
      <div>系统升级维护</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>成功修复系统漏洞 2019-07-29</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>正在更新日志 2019-07-28</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>完成阶段性目标 2019-07-27</div>
      <div>成功上传数据包</div>
    </c-timeline-item>
    <c-timeline-item>
      <div>正在同步数据 2019-07-26</div>
    </c-timeline-item>
    <c-timeline-item color="#F84E44">
      <div>设备检修暂停访问 2019-07-25</div>
    </c-timeline-item>
    <c-timeline-item color="#52B818">
      <div>成功修复系统漏洞 2019-07-24</div>
    </c-timeline-item>
  </c-timeline>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

## Timeline Props

| Name      | Description | Type                                | Required | Default  |
| --------- | ----------- | ----------------------------------- | -------- | -------- |
| placement | 方位        | `'left'` \| `'center'` \| `'right'` | `false`  | `'left'` |

## TimelineItem Props

| Name  | Description     | Type      | Required | Default |
| ----- | --------------- | --------- | -------- | ------- |
| color | icon 节点的颜色 | `string`  | `false`  | -       |
| solid | 节点实心        | `boolean` | `false`  | `false` |
