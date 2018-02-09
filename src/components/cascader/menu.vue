<template lang="pug">
div
  ul.cascader-menu
    li.casecader-menu-item(v-for="item in optionList",
        :class="{'active': item.selected}"
        :title="item[showkey]"
        @click="onMenuClick(item)"
      )
      | {{item[labelKey]}}
      span.cascader-icon(v-if="hasChildren(item)")
        c-icon(name="chevron-right")
  .c-cascader__childmenu
    c-cascader-menu(
      v-if="childrenOptions.length > 0"
      :parentMenu="currentParentMenu"
      :options="childrenOptions"
      :labelKey="labelKey",
      :valueKey="valueKey"
      :level="level + 1"
    )
</template>
<script>
export default {
  name: 'c-cascader-menu',
  props: {
    level: {
      type: Number,
      default: 0
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    parentMenu: {
      type: Object,
      default () {
        return {
          label: [],
          value: []
        }
      }
    },
    options: {
      type: Array,
      default () {
        return []
      }
    }
  },
  inject: ['$cascader'],
  data () {
    return {
      optionList: [],
      childrenOptions: [],
      currentParentMenu: {
        label: [],
        value: []
      }
    }
  },
  created () {
    this.resetOptionSelected()
    if (this.$cascader.value.length) {
      const selectedItem = this.optionList.find(option => option[this.valueKey] === this.$cascader.value[this.level])
      selectedItem && this.$set(selectedItem, 'selected', true)
      if (selectedItem && this.hasChildren(selectedItem)) {
        this.childrenOptions = selectedItem.children
      }
    }
  },
  watch: {
    parentMenu () {
      this.childrenOptions = []
    },
    options () {
      this.resetOptionSelected()
    }
  },
  methods: {
    resetOptionSelected () {
      this.optionList = [...this.options].map(item => {
        this.$set(item, 'selected', false)
        return item
      })
    },
    hasChildren (item) {
      const { children } = item
      return children && children.length
    },
    onMenuClick (item) {
      this.optionList.map(item => {
        this.$set(item, 'selected', false)
      })
      const {label, value} = this.parentMenu
      label[this.level] = item[this.labelKey]
      value[this.level] = item[this.valueKey]
      this.currentParentMenu = {
        label,
        value
      }
      this.$set(item, 'selected', true)
      this.childrenOptions = item.children || []

      if (!this.hasChildren(item)) {
        this.$cascader.showValue = this.currentParentMenu.label.join('/')
        this.$cascader.onChange(JSON.parse(JSON.stringify(this.currentParentMenu)))
        this.$cascader.isOpen = false
      }
    }
  }
}
</script>
<style scoped>

</style>

