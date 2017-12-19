---
title: Card
layout: component
route: /component/card
---

# Card

## 基本用法

```html
<c-card>
  <h3 slot="title">卡片标题</h3>
  <div>这里是卡片介绍</div>
  <div slot="actions">
    <c-button flat primary icon="heart">加入收藏</c-button>
    <c-button flat icon="download">下载</c-button>
  </div>
</c-card>
```

## 带图片

```html
<c-card>
  <img src="https://p0.ssl.qhimg.com/dm/600_300_90/t019549f24fd684aeb8.jpg" slot="media" />
  <h3>这里是图片标题</h3>
  <div>这里是卡片介绍</div>
  <div slot="actions">
    <c-button flat primary icon="heart">加入收藏</c-button>
    <c-button flat icon="download">下载</c-button>
  </div>
</c-card>

<style>
  .c-card h3 {
    margin: 0 0 0.5em;
  }

  .c-card {
    max-width: 300px;
  }
</style>
```

## 横向排列

```html
<c-card horizontal>
  <img src="https://p0.ssl.qhimg.com/dm/100_100_90/t019549f24fd684aeb8.jpg" slot="media" />
  <div>云中温度低于0℃的许多小云滴在冰晶上互相碰撞凝结形成雪珠，小雪珠是由许多细白的冰粒聚集而成的。</div>
</c-card>
```

## 不同颜色

```html
<c-box>
  <c-box-item>
    <c-card class="is-bg-blue-7">
      <h3>平面设计</h3>
      <p>平面设计，定义泛指具有艺术性和专业性，以“视觉”作为沟通和表现的方式。透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。</p>
    </c-card>
  </c-box-item>
  <c-box-item>
    <c-card class="is-bg-pink-7">
      <h3>平面设计</h3>
      <p>平面设计，定义泛指具有艺术性和专业性，以“视觉”作为沟通和表现的方式。透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。</p>
    </c-card>
  </c-box-item>
  <c-box-item>
    <c-card class="is-bg-gray-7">
      <h3>平面设计</h3>
      <p>平面设计，定义泛指具有艺术性和专业性，以“视觉”作为沟通和表现的方式。透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。</p>
    </c-card>
  </c-box-item>
</c-box>
```




