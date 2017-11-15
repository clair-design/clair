<template lang="pug">
  .c-box__item(:class="classNames" :style="style")
    slot
</template>

<script>
import { multiply } from './util.js'
import { breakpoints } from '../../js/config.js'

const props = breakpoints
  .map(bp => bp.name)
  .concat(['order'])

/**
 * get matched media
 * eg: 'md' => ['md', 'sm', 'xs']
 */
const getMatchedMedia = function (media) {
  const mediaList = []
  for (let i = 0; i < breakpoints.length; i++) {
    const { name } = breakpoints[i]
    mediaList.push(name)
    if (media === name) break
  }
  return mediaList.reverse()
}

const isWidth = v => /^(\d+|auto|flex)$/.test(v)
const isOffset = v => /^offset-\d+$/.test(v)
const isTextSize = v => /^text-(xxl|xl|lg|normal|sm|xs|xxs)$/.test(v)
const getClassName = (values, condition) => {
  const value = values.find(condition)
  return value ? `is-${value}` : ''
}

export default {
  name: 'c-box-item',
  props,
  computed: {

    /**
     * get class name list of the box item
     */
    classNames () {
      const { media } = this.$clair.responsive
      const matchedMedia = getMatchedMedia(media)
      let widthClass, offsetClass, textSizeClass
      matchedMedia.forEach(media => {
        const values = (this[media] || '').split(/\s+/)
        if (!widthClass) {
          const foundWidthClass = getClassName(values, isWidth)
          if (foundWidthClass) widthClass = foundWidthClass
        }
        if (!offsetClass) {
          const foundOffsetClass = getClassName(values, isOffset)
          if (foundOffsetClass) offsetClass = foundOffsetClass
        }
        if (!textSizeClass) {
          const foundSizeClass = getClassName(values, isTextSize)
          if (foundSizeClass) textSizeClass = foundSizeClass
        }
      })
      return [widthClass, offsetClass, textSizeClass]
    },

    /**
     * set gap of parent
     */
    padding () {
      return this.$parent.gap ? multiply(this.$parent.gap, 0.5) : ''
    },

    /**
     * set box item gap
     */
    style () {
      const style = {}
      if (this.padding) {
        style.paddingLeft = this.padding
        style.paddingRight = this.padding
      }
      if (this.order) {
        style.order = this.order
      }
      return style
    }

  },
  methods: {
  }
}
</script>
