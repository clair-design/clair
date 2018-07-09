<template lang="pug">
  i(
    v-if="ligature",
    :class="iconType",
    :style="{ color: iconColor, fontSize: size, verticalAlign: valign }"
  ) {{ name }}
  span(v-else-if="isSvg", class="c-icon")
    component(
      :is="svgName",
      :style="{verticalAlign: valign}"
      :width="size",
      :height="size",
      :stroke="iconColor"
    )
  i(
    v-else
    class="c-icon",
    :class="classNames",
    :style="{ color: iconColor, fontSize: size, verticalAlign: valign }"
  )
</template>

<script>
import featherIcons from 'feather-vue'
import './index.css'

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

  components: featherIcons,

  data () {
    return {}
  },

  computed: {
    iconType () {
      if (!this.type) {
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
    svgName () {
      return this.isSvg ? `feather-${this.name}` : ''
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
