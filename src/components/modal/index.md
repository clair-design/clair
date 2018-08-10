---
title: Modal
route: /component/modal
layout: component
---

# 模态框 - Modal

## 概述

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。

在 Clair 中，模态框的标签为 `<c-modal />`。

## 基础使用方法

```html
<c-button primary @click="visible = true">打开模态框</c-button>
<c-modal
  title="屈原列传"
  :visible="visible"
  width="40%"
  :center="false"
  @close="visible = false"
  @cancel="handleCancel"
  @confirm="handleConfirm"
>
  <div>屈平疾王听之不聪也，谗谄之蔽明也，邪曲之害公也，方正之不容也，故忧愁幽思而作《离骚》。“离骚”者，犹离忧也。夫天者，人之始也；父母者，人之本也。人穷则反本，故劳苦倦极，未尝不呼天也；疾痛惨怛，未尝不呼父母也。屈平正道直行，竭忠尽智，以事其君，谗人间之，可谓穷矣。信而见疑，忠而被谤，能无怨乎？</div>
</c-modal>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    },
    methods: {
      handleCancel () {
        if (window.confirm('确定要取消吗？')) {
          this.visible = false
        }
      },
      handleConfirm () {
        window.alert('完成确认！')
        this.visible = false
      }
    }
  }
</script>
```

### 属性

| 属性 | 类型  |  说明 | 默认值 |
|-----|-------|------|-------|
| title | String | 顶部标题 | |
| visible | Boolean| 控制模态框的显示、隐藏 | |
| top | String | 合法的 CSS 长度值，控制模态框纵向位置 | 15%|
| width | String | 合法的 CSS 长度值，控制模态框宽度 |
| center | String | 合法的 CSS 长度值，控制模态框是否居中显示 | false |
| closable | Boolean | 模态框是否可通过 `x` 图标发送 `close` 事件 | true |
| mask-closable | Boolean | 是否可通过点击半透明蒙版发送 `close` 事件 | true |
| destroy-after-close | Boolean | 关闭模态框后是否销毁 | fasle  |

### 事件
| 事件 |  说明 |
|-----|-------|
| close | 模态框关闭 |
| confirm | 点击“确定”按钮 |
| cancel | 点击“取消”按钮 |

### slot

可以通过 `header` 和 `footer` 两个 slot 即可自定义页头（替代默认的标题部分）、页脚（替代默认的按钮部分）。

```html
<c-button primary @click="visible = true">点击确认</c-button>

<c-modal
  width="420px"
  :visible="visible"
  @close="visible = false"
>
  <div slot="header">
    <c-icon type="fa" name="bookmark" size="1em" color="#d8a50e" />
    <span class="is-size-lg">屈原列传</span>
    （<span class="is-size-md">节选</span>）
  </div>

  <div>屈平之作《离骚》，盖自怨生也。上称帝喾，下道齐桓，中述汤、武，以刺世事。明道德之广崇，治乱之条贯，靡不毕见。其文约，其辞微，其志洁，其行廉。其称文小而其指极大，举类迩而见义远。其志洁，故其称物芳；其行廉，故死而不容。自疏濯淖污泥之中，蝉蜕于浊秽，以浮游尘埃之外，不获世之滋垢，皭然泥而不滓者也。推此志也，虽与日月争光可也。</div>

  <div slot="footer" style="text-align: center;">
    <c-button primary @click="visible = false">已读</c-button>
  </div>
</c-modal>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    }
  }
</script>
```

### destroy-after-close: 关闭时销毁

有时，在关闭模态框之后，希望将原有的 DOM 销毁掉。这时可以设置 `destroy-after-close` 属性。

常用的场景：模态框中使用表单，关闭后再次打开时希望重置掉所有内容。

```html
<div style="margin-bottom: 1em">
  <span>关闭时是否销毁</span>
  <c-radio-group :options="options" v-model="destroyAfterClose" />
</div>
<c-button primary @click="visible = true">打开模态框</c-button>
<c-modal
  title="输入编号"
  width="420px"
  :visible="visible"
  :destroy-after-close="destroyAfterClose"
  @close="visible = false"
  @confirm="visible = false"
  @cancel="visible = false"
>
  <c-form label-width="1em">
    <c-form-item>
      <c-icon name="globe" slot="label" />
      <c-input placeholder="公司地址" width="long" />
    </c-form-item>
    <c-form-item>
      <c-icon name="smartphone" slot="label" />
      <c-input placeholder="手机号码" width="long" />
    </c-form-item>
  </c-form>
</c-modal>

<script>
  export default {
    data () {
      return {
        visible: false,
        destroyAfterClose: false,
        options: [{ label: '是', value: true }, { label: '否', value: false }]
      }
    }
  }
</script>
```


## 便捷方法

为了方便比较短的消息提示，我们在 Vue 的原型上进行了拓展。


### 适用于普通消息提示的 alert

使用方法：`this.$alert(data)`

| 字段          |  类型  |说明 | 备注 |
|--------------|------|-------|-----|
| data.title   | String | 消息标题 | 默认值为“提示” |
| data.msg     | String 或 Function | 消息正文 | 函数签名 `msg(h): VNode` |

```html
<c-button primary @click="alert">点我</c-button>
<c-button primary @click="alert2">戳一下</c-button>
<script>
  export default {
    methods: {
      alert () {
        this.$alert({
          title: '渔父曰',
          msg: '子非三闾大夫与？何故至於斯！'
        })
        .then(_ => console.log('confirm'))
        .catch(_ => console.log('cancel'))
      },
      alert2 () {
        this.$alert({
          title: '屈原曰',
          msg (h) {
            return h('div',
              { style: { color: '#1c5ea0' } },
              '举世皆浊我独清，众人皆醉我独醒，是以见放。'
            )
          }
        })
        .then(_ => console.log('confirm'))
        .catch(_ => console.log('cancel'))
      }
    }
  }
</script>
```


### 类型消息弹窗

使用方法：`this.$message(data)`，参数 `data` 支持字符串，或结构为 `{ msg, title, type }` 的对象

| 字段          |  类型  |说明 | 备注 |
|--------------|------|-------|-----|
| data.title   | String | 消息标题 | |
| data.msg     | String 或 Function | 消息正文 | `msg(h):VNode` |
| data.type    | `success` `error` `info` `warning` | 消息类型 | 主要区别表现在使用了不同的 icon |

此外，还可以省略 `data.type` 而直接使用下面的便捷方法 ——

* `this.$info(data)`
* `this.$error(data)`
* `this.$success(data)`
* `this.$warning(data)`

```html
<c-button
  primary
  v-for="type in types"
  :key="type"
  @click="invoke(type)"
>
  {{type}}
</c-button>

<script>
  export default {
    data () {
      return {
        types: ['success', 'error', 'info', 'warning']
      }
    },
    methods: {
      invoke (type) {
        this[`$${type}`]({
          title: '渔父曰',
          msg: '世人皆浊，何不淈其泥而扬其波？众人皆醉，何不餔其糟而歠其酾？'
        })
        .then(_ => console.log('confirm'))
        .catch(_ => console.log('cancel'))
      }
    }
  }
</script>
```
