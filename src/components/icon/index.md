---
title: Icon
layout: component
scrollTop: true
route: component/icon
---

# Icon

## Demo

```html
<template>
  <div class="wrapper">
    <div><c-icon type="address-book"/> address-book</div>
    <div><c-icon type="address-book-o"/> address-book-o</div>
    <div><c-icon type="address-card"/> address-card</div>
    <div><c-icon type="address-card-o"/> address-card-o</div>
    <div><c-icon type="bandcamp"/> bandcamp</div>
    <div><c-icon type="bath"/> bath</div>
    <div><c-icon type="bathtub"/> bathtub (alias)</div>
    <div><c-icon type="drivers-license"/> drivers-license (alias)</div>
    <div><c-icon type="drivers-license-o"/> drivers-license-o (alias)</div>
    <div><c-icon type="eercast"/> eercast</div>
    <div><c-icon type="envelope-open"/> envelope-open</div>
    <div><c-icon type="envelope-open-o"/> envelope-open-o</div>
    <div><c-icon type="etsy"/> etsy</div>
    <div><c-icon type="free-code-camp"/> free-code-camp</div>
    <div><c-icon type="grav"/> grav</div>
    <div><c-icon type="handshake-o"/> handshake-o</div>
    <div><c-icon type="id-badge"/> id-badge</div>
    <div><c-icon type="id-card"/> id-card</div>
    <div><c-icon type="id-card-o"/> id-card-o</div>
    <div><c-icon type="imdb"/> imdb</div>
    <div><c-icon type="linode"/> linode</div>
    <div><c-icon type="meetup"/> meetup</div>
    <div><c-icon type="microchip"/> microchip</div>
    <div><c-icon type="podcast"/> podcast</div>
    <div><c-icon type="quora"/> quora</div>
    <div><c-icon type="ravelry"/> ravelry</div>
    <div><c-icon type="s15"/> s15 (alias)</div>
    <div><c-icon type="shower"/> shower</div>
    <div><c-icon type="snowflake-o"/> snowflake-o</div>
    <div><c-icon type="superpowers"/> superpowers</div>
    <div><c-icon type="telegram"/> telegram</div>
    <div><c-icon type="thermometer"/> thermometer (alias)</div>
  </div>
</template>

<script>
export default {
  data () {
    console.log(222)
    return {
      icons: [
        "address-book",
        "address-book-o",
        "address-card",
        "address-card-o",
        "bandcamp",
        "bath",
        "bathtub",
        "drivers-license",
        "drivers-license-o"
      ]
    }
  }
}
</script>
<style>
  .wrapper {
    display: flex;
  }
  .wrapper > div {
    color: red
  }
</style>
```
