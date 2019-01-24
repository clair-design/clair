<template lang="pug">
.c-cascader(
  :class="{'is-open': isOpen}"
  @click="isOpen = true"
)
  .cascader-context
    c-input(
      :placeholder="placeholder"
      v-model="showValue"
      width="normal"
      :size="size"
      :disabled="disabled"
    )
    i.c-select__caret
  .cascader-dropmenu(
    :class="className"
    ref="dropmenu"
  )
    template(v-if="isOpen")
      c-cascader-menu(
        :parentMenu="parentMenu"
        :options="optionList"
        :labelKey="labelKey"
        :valueKey="valueKey"
        :childrenKey="childrenKey"
        :showAllLevel="showAllLevel"
        :changeOnSelect="changeOnSelect"
        :loadChildren="loadChildren"
      )
</template>

<script>
import './index.css'
import zIndexManager from '@util/zIndexManager.js'

import Menu from './menu.vue'
import Icon from '../icon/index.vue'
import Input from '../input/index.vue'

export default {
  name: 'c-cascader',
  components: {
    'c-cascader-menu': Menu,
    'c-icon': Icon,
    'c-input': Input
  },
  provide () {
    return {
      '$cascader': this
    }
  },
  props: {
    value: Array,
    placeholder: String,
    disabled: Boolean,
    separator: {
      type: String,
      default: '/'
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    showAllLevel: {
      type: Boolean,
      default: true
    },
    size: String,
    options: {
      type: Array,
      default () {
        return []
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    loadChildren: {
      type: Function,
      default: null
    }
  },
  computed: {
    className () {
      return this.size ? `is-${this.size}` : 'md'
    }
  },
  data () {
    return {
      parentMenu: {
        label: [],
        value: []
      },
      optionList: [],
      cascaderMenu: '',
      showValue: '',
      isOpen: false
    }
  },
  created () {
    this.optionList = [...this.options]
  },
  mounted () {
    this.cascaderMenu = this.$refs.dropmenu
    document.body.appendChild(this.cascaderMenu)
    this.resize()
    window.addEventListener('resize', this.resize, false)
  },
  beforeDestroy () {
    this.cascaderMenu.remove()
    window.removeEventListener('resize', this.resize, false)
  },
  watch: {
    options: {
      handler () {
        this.optionList = [...this.options]
      },
      deep: true
    },
    value (newVal) {
      const labels = this.getLabelWithValue(this.value)
      this.showValue = this.showAllLevel
        ? labels.join(this.separator)
        : labels[labels.length - 1]
    },
    isOpen () {
      if (this.isOpen) {
        this.resize()
        window.addEventListener('click', this.onBodyClick, true)
      } else {
        window.removeEventListener('click', this.onBodyClick, true)
      }
    }
  },
  methods: {
    close () {
      this.isOpen = false
    },
    onChange (selectMenu) {
      this.$emit('input', selectMenu.value)
      this.$emit('change', selectMenu)
    },
    getLabelWithValue (value) {
      const labels = []
      value.reduce((result, item) => {
        const resultTarget = result.find(data => data[this.valueKey] === item)
        const { label } = resultTarget
        const children = resultTarget[this.childrenKey]
        labels.push(label)
        if (children && children.length) {
          return children
        }
        return result
      }, this.optionList)
      return labels
    },
    onBodyClick (e) {
      const isInCascader = this.$el.contains(e.target)
      const isInCascaderMenu = this.cascaderMenu.contains(e.target)
      if (!isInCascader && !isInCascaderMenu) {
        this.close()
        this.$el.focus()
      }
    },
    getStyle () {
      const clientRect = this.$el.getBoundingClientRect()
      const windowH = window.innerHeight
      const marginTop = 2
      const scrollBarWidth = 20
      const scrollHeight =
        document.body.scrollWidth > window.innerWidth ? scrollBarWidth : 0
      const droplistHeight = this.cascaderMenu.clientHeight
      const defaultTop =
        clientRect.top + clientRect.height + marginTop + window.pageYOffset
      const clientHeight = clientRect.height + marginTop

      const clientY = clientRect.y
      const compTop = windowH - droplistHeight - scrollHeight
      const left = clientRect.left + window.pageXOffset
      const top =
        droplistHeight + clientHeight + clientY + scrollHeight > windowH
          ? compTop
          : defaultTop
      const zIndex = zIndexManager.next()
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: ${zIndex};
      `
    },
    resize () {
      this.$nextTick(() => {
        this.cascaderMenu.style.cssText = this.getStyle()
      })
    }
  }
}
</script>
