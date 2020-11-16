---
title: Color 颜色
group: Basic 基础
---

# Color 颜色

## 定义

定义平台、系统、应用使用的主色、辅色、点缀色。可有效避免视觉传达差异，为产品提供一致的外观视觉感受。

## 色彩选取

在基础色板中，选择色板从浅自深的第 6 个颜色作为主色，Hex 值为 `006BFF`，选择 1、5、7、8 颜色作为辅色。

```html
<template demo-only>
  <ul class="colors">
    <li v-for="c in colors" :style="{backgroundColor: `#${c.hex}`}">
      <h3 v-if="c.name">{{c.name}}</h3>
      <p>#{{c.hex}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        colors: [
          { hex: 'F2F7FF', name: 'Selected' },
          { hex: 'DAE9FF' },
          { hex: 'B5D4FF' },
          { hex: '8ABBFF' },
          { hex: '398CFF', name: 'Hover' },
          { hex: '1D7CFF' },
          { hex: '006BFF', name: 'Normal' },
          { hex: '005DDE', name: 'Active' },
          { hex: '0048A9' },
          { hex: '003379' }
        ]
      }
    }
  }
</script>

<style>
  .colors {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 0;
    padding-top: 30px;
    margin-bottom: -30px;
  }

  .colors li {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    height: 70px;
    min-width: 7em;
    padding: 1.2em 0;
    text-align: center;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .colors li::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 0;
    background-color: inherit;
    transition: all 0.3s;
  }

  .colors li:hover::after {
    top: -10px;
    height: 10px;
  }

  .colors li:nth-child(-n + 4) {
    color: #255bb0;
  }

  .colors h3 {
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    color: inherit;
    line-height: 1;
  }

  .colors h3::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: #f73e4f;
    top: -14px;
    left: 50%;
    margin-left: -3px;
    transition: all 0.3s;
  }

  .colors li:hover h3::after {
    top: -24px;
  }

  .colors p {
    margin-bottom: 0;
    line-height: 1;
  }
</style>
```

## 品牌色（主色）

以稳定、友好的蓝色作为品牌色，Hex 值为 `006BFF`。

```html
<template demo-only>
  <div class="primary-colors">
    <color-swatch name="Brand color" color="#006BFF" style="width: 100%" />
    <color-swatch name="Hover" color="#398CFF" />
    <color-swatch name="Click" color="#005DDE" />
    <color-swatch
      name="Selected background"
      color="#F2F7FF"
      style="color:#255bb0"
    />
  </div>
</template>

<style scoped>
  .primary-colors {
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
  }
  .primary-colors > div {
    flex-grow: 1;
  }
</style>
```

## 功能色

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。

```html
<template demo-only>
  <div class="colors">
    <div class="functional-color">
      <color-swatch name="Link" color="#006BFF" />
      <color-swatch name="Prompt (line)" color="#5285FE" />
      <color-swatch name="Prompt (bg)" color="#F0F5FF" style="color: #006BFF" />
    </div>
    <div class="functional-color">
      <color-swatch name="Success" color="#52B818" />
      <color-swatch name="Prompt (line)" color="#75C936" />
      <color-swatch name="Prompt (bg)" color="#F1F9EB" style="color: #52B818" />
    </div>
    <div class="functional-color">
      <color-swatch name="Warning" color="#FEA119" />
      <color-swatch name="Prompt (line)" color="#FFB409" />
      <color-swatch name="Prompt (bg)" color="#FFF7E6" style="color: #FEA119" />
    </div>
    <div class="functional-color">
      <color-swatch name="Danger" color="#F84E44" />
      <color-swatch name="Prompt (line)" color="#FE5A52" />
      <color-swatch name="Prompt (bg)" color="#FFF0EF" style="color: #F84E44" />
    </div>
  </div>
</template>
<style>
  .color-swatch {
    font-size: 13px;
  }
  .colors {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }
  .functional-color {
    display: flex;
    flex: 1 0 0;
    flex-wrap: wrap;
    min-width: 14em;
    margin: 10px;
  }
  .functional-color > div {
    flex-grow: 1;
    width: 50%;
  }
  .functional-color > div:first-child {
    width: 100%;
  }
</style>
```

## 中性色

中性色用于文本、背景边框和分割线颜色。通过运用不同的中性色，来表现层次结构。

```html
<template demo-only>
  <div class="neutral-colors">
    <div class="color">
      <color-swatch name="主要文字" color="#202020" />
      <color-swatch name="次要文字" color="#555555" />
      <color-swatch name="辅助文字" color="#999999" style="color: #000" />
      <color-swatch name="失效文字" color="#c7c7c7" style="color: #000" />
    </div>
    <div class="color">
      <color-swatch name="一级边框" color="#DDDDDD" style="color: #555" />
      <color-swatch name="二级边框" color="#EFF0F2" style="color: #555" />
      <color-swatch name="三级边框" color="#F6F7FB" style="color: #555" />
    </div>
    <div class="color">
      <color-swatch name="基础黑色" color="#000000" style="color: #CCC" />
      <color-swatch
        name="基础白色"
        color="#FFFFFF"
        style="color: #555;border:1px solid #eff0f2"
      />
      <color-swatch name="透明色" color="" class="transparent" />
    </div>
  </div>
</template>

<style>
  .neutral-colors {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }
  .neutral-colors > div {
    margin: 10px;
    min-width: 10em;
  }
  .neutral-colors > div > div {
    margin-bottom: 10px;
  }
  .neutral-colors .transparent {
    color: #333;
    background: url('data:image/svg+xml,\
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".05" >\
            <rect x="50" width="50" height="50" />\
            <rect y="50" width="50" height="50" />\
            </svg>');
    background-size: 20px;
  }
</style>
```

## 衍生色

```html
<template demo-only>
  <div class="rainbow-colors">
    <div class="swatch" v-for="swatch in rainbows">
      <div v-for="color in swatch" :style="{backgroundColor: color}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        baseColors: [
          '#EB2F97',
          '#F84E44',
          '#FA541C',
          '#FEA119',
          '#ECAD28',
          '#FADA15',
          '#9FD910',
          '#52B818',
          '#09B6D4',
          '#1D7CFF',
          '#3C49F7',
          '#722DD1'
        ]
      }
    },
    computed: {
      rainbows() {
        return this.baseColors.map(baseColor => {
          return new Array(10).fill(1).map((_, i) => {
            if (i === 5) return baseColor
            if (i < 5) {
              return this.$mixColor(baseColor, '#fff', (9 - 2 * i) / 10)
            } else {
              return this.$mixColor(baseColor, '#000', (2 * i - 11) / 10)
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .swatch {
    display: flex;
    height: 50px;
    margin-bottom: 20px;
  }
  .swatch > div {
    flex: 1;
  }
</style>
```
