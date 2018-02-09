<template lang="pug">
.c-cascader(
  @click="isOpen = true"
  )
  .cascader-context
    c-input(
      :placeholder="placeholder"
      v-model="showValue"
      width="normal"
      :disabled="disabled"
      )
    c-icon.c-cascader__icon(name="chevron-down")
  .cascader-dropmenu
    template(v-if="isOpen")
      Menu(
        :parentMenu="parentMenu"
        :options="optionList"
        :labelKey="labelKey"
        :valueKey="valueKey"
      )
</template>

<script>
import './index.css'
import Menu from './menu.vue'

export default {
  name: 'c-cascader',
  components: {
    Menu
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
    this.optionList = this.options
  },
  mounted () {
    if (typeof document === 'object') {
      this.cascaderMenu = document.querySelector('.cascader-dropmenu')
      document.body.appendChild(this.cascaderMenu)
      this.resize()
    }
    if (this.vaule) {
      this.showValue = this.getLabelWithValue(this.value).join('/')
    }
  },
  watch: {
    value (newVal) {
      this.showValue = this.getLabelWithValue(this.value).join('/')
    },
    isOpen () {
      if (this.isOpen) {
        this.resize()
        this.parentMenu = {
          label: [],
          value: []
        }
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
        const { children, label } = result.find(data => data[this.valueKey] === item)
        labels.push(label)
        if (children && children.length) {
          return children
        }
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
      const scrollHeight =
        document.body.scrollWidth > window.innerWidth ? 20 : 0
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
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 9;
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
