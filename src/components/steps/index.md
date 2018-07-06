---
title: Steps
route: /component/steps
layout: component
---

# 步骤条 - Steps

引导用户按流程完成任务的导航条

## 基本用法
简单的步骤条，默认当前处于第一步。

```html
<c-steps>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    iconPos="top"
    :status="step.status"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1'
        },{
          title: 'step2',
          description: 'description2'
        },{
          title: 'step3',
          description: 'description3'
        },{
          title: 'step4',
          description: 'description'
        }
      ]
    }
  }
}
</script>
```


## 设置当前所处步骤
通过给`c-steps`设置`active`属性，表示当前处于第几步骤。

```html
<c-steps
  :active="currentActive"
>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    iconPos="top"
    :status="step.status"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      currentActive: 2,
      stepsData : [
        {
          title: 'step1',
          description: 'description1'
        },{
          title: 'step2',
          description: 'description2'
        },{
          title: 'step3',
          description: 'description3'
        }
      ]
    }
  }
}
</script>
```


## 设置步骤条排列方式
通过`c-steps`的`directive`属性，设置水平或垂直分布，默认水平。

```html
<c-steps
  direction="vertical"
>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    :status="step.status"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1'
        },{
          title: 'step2',
          description: 'description2'
        },{
          title: 'step3',
          description: 'description3'
        }
      ]
    }
  }
}
</script>
```

## 给步骤条添加图标
通过设置`c-step`的`icon`属性，添加步骤图标。

```html
<c-steps>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    :icon="step.icon"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1',
          icon: 'eye'
        },{
          title: 'step2',
          description: 'description2',
          icon: 'film'
        },{
          title: 'step3',
          description: 'description3',
          icon: 'camera'
        }
      ]
    }
  }
}
</script>
```

## 设置图标位置
在横向步骤条中，通过`c-step`的`iconPos`属性，设置步骤图标位置。`left`表示图标在左，`top`表示图标在上。

```html
<c-steps>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    iconPos="left"
    :status="step.status"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1'
        },{
          title: 'step2',
          description: 'description2'
        },{
          title: 'step3',
          description: 'description3'
        }
      ]
    }
  }
}
</script>
```

## 给步骤条添加状态
设置`c-step`的`status`属性，可为当前步骤添加状态：成功、警告、失败，或loading。可同时设置图标。

```html
<c-steps>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    iconPos="left"
    :status="step.status"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1',
          status: 'success'
        },{
          title: 'step2',
          description: 'description2',
          status: 'loading'
        },{
          title: 'step3',
          description: 'description3',
          status: 'warning'
        },{
          title: 'step4',
          description: 'description4',
          status: 'error'
        }
      ]
    }
  }
}
</script>
```

```html
<c-steps>
  <c-step
    v-for="step in stepsData"
    :title="step.title"
    :description="step.description"
    :status="step.status"
    :icon="step.icon"
  >
  </c-step>
</c-steps>

<script>
export default {
  data() {
    return {
      stepsData : [
        {
          title: 'step1',
          description: 'description1',
          status: 'success',
          icon: 'check'
        },{
          title: 'step2',
          description: 'description2',
          status: 'loading',
          icon: 'loader'
        },{
          title: 'step3',
          description: 'description3',
          icon: 'clock'
        }
      ]
    }
  }
}
</script>
```
