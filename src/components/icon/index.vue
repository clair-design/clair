<template lang="pug">
  i(
    v-if="ligature",
    :class="iconType",
    :style="{ color: iconColor, fontSize: size, verticalAlign: valign }"
  ) {{ name }}
  span(v-else-if="isSvg", class="c-icon")
    svg(
      :class="classNames",
      :style="{verticalAlign: valign}"
      :width="size",
      :height="size",
      :stroke="iconColor",
      v-html="svgContent"
      xmlns="http://www.w3.org/2000/svg",
      viewBox="0 0 24 24",
      fill="none",
      stroke-width=2,
      stroke-linecap="round",
      stroke-linejoin="round"
    )
  i(
    v-else
    class="c-icon",
    :class="classNames",
    :style="{ color: iconColor, fontSize: size, verticalAlign: valign }"
  )
</template>

<script>
import './index.css'
import featherIcons from 'feather-icons/dist/icons.json'

export default {
  name: 'c-icon',
  props: {
    type: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    size: {
      type: String,
      default: '1em'
    },
    valign: {
      type: String,
      default: 'baseline'
    },
    ligature: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {}
  },

  computed: {
    iconType () {
      if (this.type == null) {
        return this.$clair.icon || 'feather'
      }
      return this.type
    },
    isSvg () {
      return this.iconType === 'feather'
    },
    classNames () {
      const prefix = this.iconType !== '' ? `${this.iconType}-` : ''
      return `${this.iconType} ${prefix}${this.name}`
    },
    svgContent () {
      return this.isSvg ? featherIcons[this.name] : ''
    },
    iconColor () {
      if (!this.color) {
        return this.isSvg ? 'currentColor' : 'inherit'
      }

      return this.color
    }
  }
}
</script>
