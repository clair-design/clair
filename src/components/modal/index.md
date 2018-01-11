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

* 通过 `title` 属性（`String`）可以指定模态框的顶部标题。
* 通过 `visible` 属性（`Boolean`）控制模态框的显示、隐藏
* 通过 `top` 属性（合法的 CSS 长度值）控制模态框纵向位置
* 通过 `width` 属性（合法的 CSS 长度值）控制模态框宽度
* 通过 `center` 属性（合法的 CSS 长度值）控制模态框是否居中
* 通过 `closable` 属性（`Boolean`）控制模态框是否可通过 `x` 图标发送 `close` 事件
* 通过 `mask-closable` 属性（`Boolean`） 控制是否可通过点击半透明蒙版发送 `close` 事件
* 监听 `close` 事件，处理模态框关闭的行为
* 监听 `confirm` 事件，处理“确定”按钮的点击行为
* 监听 `cancel` 事件，处理“取消”按钮的点击行为

```html
<c-button primary @click="visible = true">点我！</c-button>
<c-modal
  title="屈原列传"
  :visible="visible"
  width="50%"
  center
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


### 提供 slot

可以通过 `header` 和 `footer` 两个 slot 即可自定义页头（替代默认的标题部分）、页脚（替代默认的按钮部分）。

```html
<c-button primary @click="visible = true">点我！</c-button>

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
    },
    methods: {}
  }
</script>
```

## 拓展 `Vue.prototype`

### Alert

`Vue.prototype.$alert({ msg, title })`

```html
<c-button primary @click="alert">Alert</c-button>
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
      }
    }
  }
</script>
```


### 弹窗提示

`Vue.prototype.$message({ msg, title, type })`

* `type`: `success | error | info | warning`
* 也可以直接调用 `this.$success({ msg, title })`，余者依此类推

```html
<c-button
  primary
  v-for="type in types"
  :key="type"
  @click="message(type)"
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
      message (type) {
        this.$message({
          type,
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
