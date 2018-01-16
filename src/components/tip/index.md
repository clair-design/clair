---
title: Tip
route: /component/tip
layout: component
---

# Tip

文字提示气泡。通常用于鼠标 hover 在目标元素上，以展示某些提示信息。

## 基础示例

`content` 属性指定文字内容，`position` 属性指定位置。

```html
<c-tip content="甚矣吾衰矣" position="top">
  <c-button primary>上</c-button>
</c-tip>

<c-tip content="怅平生、交游零落，只今余几" position="bottom">
  <c-button primary>下</c-button>
</c-tip>

<c-tip content="白发空垂三千丈，一笑人间万事" position="left">
  <c-button primary>左</c-button>
</c-tip>

<c-tip content="我见青山多妩媚，料青山见我应如是" position="right">
  <c-button primary>右</c-button>
</c-tip>
```


## 自定义内容

可以通过 `<template slot="content">` 的形式自定义。

此外，还可通过 `max-width` 属性控制 tooltip 最大宽度。默认为 300px。

```html
<template>
  <c-tip position="top" max-width="500px">
    <a href="javascript:;">《摸鱼儿·更能消几番风雨》</a>
    <template slot="content">
      <article>
        更能消 几番风雨 匆匆春又归去<br>
        惜春长怕花开早 何况落红无数<br>
        春且住<br>
        见说道 天涯芳草无归路<br>
        怨春不语<br>
        算只有殷勤 画檐蛛网 尽日惹飞絮<br>
        <br>
        长门事 准拟佳期又误<br>
        蛾眉曾有人妒<br>
        千金纵买相如赋 脉脉此情谁诉<br>
        君莫舞<br>
        君不见 玉环飞燕皆尘土<br>
        闲愁最苦<br>
        休去倚危栏 斜阳正在 烟柳断肠处<br>
      </article>
    </template>
  </c-tip>
  是宋代大词人辛弃疾的作品。此词是一首忧时感世之作。
  上片描写抒情主人公对春光的无限留恋和珍惜之情；
  下片以比喻手法反映全词情调婉转凄恻，柔中寓刚。
  词中表层写的是美女伤春、蛾眉遭妒，实际上是作者借此抒发自己壮志难酬的愤慨和对国家命运的关切之情。
  全词托物起兴，借古伤今，融身世之悲和家国之痛于一炉，沉郁顿挫，寄托遥深。
</template>

<style>
  p { line-height: 2; }
</style>
```


## 禁用

设置 `disabled` 即可。

```html
<template>
  <c-tip disabled content="This will not show.">
    <c-button primary>禁用 tip ~</c-button>
  </c-tip>
</template>
```

## 设置延时

可以分别设置显示、隐藏两种状态时的延时时间（毫秒）。默认值均为 100 ms。

```html
<c-tip
  position="right"
  content="我见青山多妩媚，料青山见我应如是"
  :show-delay="300"
  :hide-delay="100"
>
  <c-button primary>延时</c-button>
</c-tip>
```

## 设置主题

可以通过 `theme` 属性修改主题。可选值为 `dark` 和 `light`，默认为 `dark`。

```html
<c-tip theme="light" position="top">
  <div slot="content">怨春不语，算只有殷勤画檐蛛网，尽日惹飞絮</div>
  <c-button primary>light</c-button>
</c-tip>

<c-tip theme="dark" position="right">
  <div slot="content">
    君莫舞<br>
    君不见 玉环飞燕皆尘土<br>
  </div>
  <c-button primary>dark</c-button>
</c-tip>
```

## 触发形式

通过 `trigger` 属性可以改变触发方式。可选值包括 `hover` `focus` `click`，默认值是 `hover`。


```html
<c-tip theme="light" position="top" trigger="hover">
  <div slot="content">怨春不语，算只有殷勤画檐蛛网，尽日惹飞絮</div>
  <c-button primary>hover (default)</c-button>
</c-tip>

<c-tip theme="light" position="top" trigger="focus">
  <div slot="content">怨春不语，算只有殷勤画檐蛛网，尽日惹飞絮</div>
  <c-button primary>focus</c-button>
</c-tip>

<c-tip theme="light" position="top" trigger="click">
  <div slot="content">怨春不语，算只有殷勤画檐蛛网，尽日惹飞絮</div>
  <c-button primary>click</c-button>
</c-tip>
```

## PopConfirm

下面是自己写的一个 PopConfirm 的例子。

```html
<style>
  .pop-confirm {
    font-size: 20px;
    margin: 10px;
  }
  .footer {
    text-align: right;
    margin-top: 1em;
  }
</style>
<template>
  <c-tip
  theme="light"
  position="top"
  trigger="click"
  max-width="600px"
  ref="tip"
>
    <div slot="content" class="pop-confirm">
      <div class="body">
        你真的确定要删除我吗？
      </div>
      <div class="footer">
        <c-button outline size="md" @click="$refs.tip.hide()">取消</c-button>
        <c-button primary size="md" @click="$refs.tip.hide()">确认</c-button>
      </div>
    </div>
    <c-button primary>删除</c-button>
  </c-tip>
</template>
```
