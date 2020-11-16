---
title: Loading 加载
group: Basic 基础
---

# Loading 加载

## 定义

用于页面和区块的加载中状态。

## 使用场景

页面局部处于等待异步数据或者正在渲染过程时，适合的加载动效会有效缓解用户的焦虑。

## 基本用法

区域加载，数据请求或状态切换时使用。

```html
<div
  style="height: 200px;width:100%;border:1px solid #ddd"
  v-loading="vLoading"
>
  区域加载内容...
</div>
<script>
  export default {
    data() {
      return {
        vLoading: true
      }
    }
  }
</script>
```

按钮加载。

```html
<c-button type="default" v-loading:[loadingArgs]="vLoading2">
  按钮加载
</c-button>
<script>
  export default {
    data() {
      return {
        vLoading2: true,
        loadingArgs: {
          size: 'small'
        }
      }
    }
  }
</script>
```

## <i></i>全屏加载

等待页面加载时使用。

```html
<c-button
  type="default"
  v-loading.fullscreen="vLoadingFullscreen"
  @click="showLoading"
>
  指令全屏
</c-button>
<c-button type="default" @click="showLoading1">服务全屏</c-button>
<script>
  export default {
    data() {
      return {
        vLoadingFullscreen: false
      }
    },
    methods: {
      showLoading() {
        this.vLoadingFullscreen = true
        setTimeout(() => {
          this.vLoadingFullscreen = false
        }, 3000)
      },
      showLoading1() {
        const sLoadingFullscreen = this.$loading({})
        setTimeout(() => {
          sLoadingFullscreen.close()
        }, 3000)
      }
    }
  }
</script>
```

## <i></i>指令自定义

使用指令调用可配置使用的各项参数。

```html
<div
  style="height: 100px;width:100%;border:1px solid #ddd;"
  v-loading:[loadingArgs]="vLoading3"
>
  自定义指令加载区域...
</div>

<script>
  export default {
    data() {
      return {
        vLoading3: true,
        loadingArgs: {
          text: '加载中...',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          customClass: 'loadingName',
          spinClass: 'spinName',
          size: 'normal'
        }
      }
    }
  }
</script>
```

## <i></i>服务调用

使用服务调用可配置使用的各项参数。

调用服务后，会返回一个对象：

```typescript
interface LoadingReturnObject {
  close(): void
}
```

通过调用 `close` 方法，可以停止 loading。

```html
<c-button type="default" @click="closeLoading" style="margin-bottom: 10px;">
  关闭加载
</c-button>
<div style="height: 200px;width:100%;border:1px solid #ddd;" id="loadingTest">
  自定义服务加载区域...
</div>
<script>
  export default {
    data() {
      return {
        loading1: null
      }
    },
    mounted() {
      this.loading1 = this.$loading({
        target: '#loadingTest',
        text: '自定义加载中...',
        size: 'normal',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        spinClass: 'loadingName',
        customClass: 'spinName'
      })
    },
    methods: {
      closeLoading() {
        this.loading1.close()
      }
    }
  }
</script>
```

## <i></i> Options(服务)

| Name            | Description                      | Type                                | Required | Default                    |
| --------------- | -------------------------------- | ----------------------------------- | -------- | -------------------------- |
| target          | 渲染的目标元素 例如: #dom .dom   | `string`                            | `false`  | `document.body`            |
| text            | 加载描述文字                     | `string`                            | `false`  | -                          |
| size            | 旋转图标尺寸                     | `'large'` \| `'normal'` \|`'small'` | `false`  | `large`                    |
| top             | loading 的 top 值，用于绝对定位  | `string`                            | `false`  | -                          |
| left            | loading 的 left 值，用于绝对定位 | `string`                            | `false`  | -                          |
| backgroundColor | 遮罩层背景颜色值                 | `string`                            | `false`  | `rgba(255, 255, 255, 0.7)` |
| spinClass       | 旋转容器添加自定义类名           | `string`                            | `false`  | -                          |
| customClass     | 添加 loading 自定义类名          | `string`                            | `false`  | -                          |

## <i></i> Options(指令)

| Name       | Description                                                                                               | Type      | Required | Default |
| ---------- | --------------------------------------------------------------------------------------------------------- | --------- | -------- | ------- |
| object     | 指令调用参数，自定义 object（v-loading:[object]），object 具体字段名及其含义，同 loading 服务中的 Options | `object`  | `false`  | -       |
| fullscreen | 指令全屏修饰符（v-loading.fullscreen），如需传参使用（v-loading:[object].fullscreen）                     | `boolean` | `false`  | `true`  |
