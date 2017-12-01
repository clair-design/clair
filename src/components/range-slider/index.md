---
title: RangeSlider
layout: component
scrollTop: true
route: component/range-slider
---

# RangeSlider

```html
<c-range-slider v-model="value" />
<p>{{value}}</p>
<script>
  export default {
    data () {
      return {
        value: 22
      }
    }
  }
</script>
```

```html
<c-range-slider
  v-model="value"
  :min="50"
  :max="100"
  :step="5"
/>
<p>{{value}}</p>

<script>
  export default {
    data () {
      return {
        value: 20
      }
    },
    created () {
      setTimeout(() => {
        this.value = 80
      }, 500)
    }
  }
</script>
```

```html
<c-range-slider
  v-model="value"
  :min="-10"
  :max="10"
  :step="0.2"
/>
<p>{{value}}</p>

<script>
  export default {
    data () {
      return {
        value: 5
      }
    },
    created () {
      setTimeout(() => {
        this.value = -5
      }, 300)
    }
  }
</script>
```

```html
<c-range-slider
  v-model="value"
  :min="-10"
  :max="10"
  :step="2"
  vertical
/>
<p>{{value}}</p>

<script>
  export default {
    data () {
      return {
        value: 5
      }
    }
  }
</script>
```
