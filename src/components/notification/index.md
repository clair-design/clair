---
title: Notification
route: /component/notification
layout: component
---

# 通知框 - Notification

自定义展示的全局通知弹窗。

## 基础使用方法

### 自定义标题和内容
通过`title`设置通知标题，通过`message`设置通知内容。

默认右上角弹出，4秒后自动关闭。

```html
<c-button primary @click="createNtf">通知</c-button>

<script>
  export default {
    methods: {
      createNtf () {
        this.$notify({
          title: '《菩萨蛮（其四）》',
          message: '珍重主人心，酒深情亦深。'
        })
      }
    }
  }
</script>
```

### 指定关闭时间
通过`duration`设置通知显示时间，值为0时表示通知不会自动关闭。

```html
<c-button primary @click="createNtf1">不消失</c-button>
<c-button primary @click="createNtf2">2秒后消失</c-button>

<script>
  export default {
    methods: {
      createNtf1 () {
        this.$notify({
          title: '《长安秋望》',
          message: '云雾凄清拂曙流，汉家宫阙动高秋。',
          duration: 0
        })
      },
      createNtf2 () {
        this.$notify({
          title: '《长安秋望》',
          message: '残星几点燕横塞，长笛一声人倚楼。',
          duration: 2000
        })
      }
    }
  }
</script>
```

### 指定弹出方位
通过`position`设置通知弹出方位，可分别设置为右上角、右下角、左下角、左上角。

```html
<c-button primary @click="createNtf1">右上角</c-button>
<c-button primary @click="createNtf2">右下角</c-button>
<c-button primary @click="createNtf3">左下角</c-button>
<c-button primary @click="createNtf4">左上角</c-button>

<script>
  export default {
    methods: {
      createNtf1 () {
        this.$notify({
          title: '《道德经》',
          message: '万物持之以生而不辞，功成而不有。',
          position: 'topRight'
        })
      },
      createNtf2 () {
        this.$notify({
          title: '《道德经》',
          message: '衣养万物而不为主，可名于小。',
          position: 'bottomRight'
        })
      },
      createNtf3 () {
        this.$notify({
          title: '《道德经》',
          message: '万物归焉而不为主，可名为大。',
          position: 'bottomLeft'
        })
      },
      createNtf4 () {
        this.$notify({
          title: '《道德经》',
          message: '以其终不自为大，故能成其大。',
          position: 'topLeft'
        })
      }
    }
  }
</script>
```


### 设置通知类型
通过`type`设置通知类型，用来显示成功 / 警告 / 消息 / 错误型系统消息。

```html
<c-button primary @click="createNtf1">成功</c-button>
<c-button primary @click="createNtf2">警告</c-button>
<c-button primary @click="createNtf3">消息</c-button>
<c-button primary @click="createNtf4">错误</c-button>

<script>
  export default {
    methods: {
      createNtf1 () {
        this.$notify({
          title: '《汉江临汎》',
          message: '楚塞三湘接，荆门九派通。',
          type: 'success'
        })
      },
      createNtf2 () {
        this.$notify({
          title: '《汉江临汎》',
          message: '江流天地外，山色有无中。',
          type: 'warning'
        })
      },
      createNtf3 () {
        this.$notify({
          title: '《汉江临汎》',
          message: '郡邑浮前浦，波澜动远空。',
          type: 'info'
        })
      },
      createNtf4 () {
        this.$notify({
          title: '《汉江临汎》',
          message: '襄阳好风日，留醉与山翁。',
          type: 'error'
        })
      }
    }
  }
</script>
```

### 指定偏移位置
可通过`offset`设置通知框的偏移量

```html
<c-button primary @click="createNtf">偏移100px</c-button>

<script>
  export default {
    methods: {
      createNtf () {
        this.$notify({
          title: '《拟行路难（其四）》',
          message: '心非木石岂无感，吞声踟蹰不敢言。',
          offset: 100
        })
      }
    }
  }
</script>
```

### 自定义HTML片段
将`dangerouslySetInnerHTML`设置为`true`，即可将`message`作为HTML片段。

默认右上角弹出，4.5秒后自动关闭。

```html
<c-button primary @click="createNtf">使用HTML片段</c-button>

<script>
  export default {
    methods: {
      createNtf () {
        this.$notify({
          title: '《玉楼春》',
          message: '<span style="color:chocolate">渐行渐远渐无书，水阔鱼沉何处问。</span>',
          dangerouslySetInnerHTML: true
        })
      }
    }
  }
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 | 可选值 |
|-----|------|-------|-----|-------|
| title | String | - | 标题 | - |
| message | String | - | 提醒内容 | - |
| duration | Number | 4000 | 显示时间 | - |
| position | String | topRight | 弹出位置 | topRight / topLeft / bottomRight / bottomLeft |
| type | String | - | 提示类型 | success / warning / info / error |
| offset | Number | 0 | 偏移位置 | - |
| dangerouslySetInnerHTML | Boolean | false | 是否将message作为HTML片段 | true / false |
