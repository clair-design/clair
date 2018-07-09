<template lang="pug">
div
  ul.cascader-menu
    li.casecader-menu-item(v-for="item in optionList",
        :class="{'active': item.selected, 'disabled': item.disabled}"
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
      :labelKey="labelKey"
      :valueKey="valueKey"
      :childrenKey="childrenKey"
      :showAllLevel="showAllLevel"
      :changeOnSelect="changeOnSelect"
      :loadChildren="loadChildren"
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
    childrenKey: {
      type: String,
      default: 'children'
    },
    separator: {
      type: String,
      default: '/'
    },
    showAllLevel: {
      type: Boolean,
      default: true
    },
    changeOnSelect: {
      type: Boolean,
      default: false
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
    },
    loadChildren: {
      type: Function,
      default: null
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
    this.currentParentMenu = JSON.parse(JSON.stringify(this.parentMenu))
  },
  watch: {
    parentMenu () {
      this.childrenOptions = []
    },
    options: {
      handler () {
        this.resetOptionSelected()
        if (this.parentMenu.label.length) {
          this.$nextTick(_ => {
            const activeOption = this.optionList.find(
              option => option[this.labelKey] === this.parentMenu.label[0])
            if (!this.childrenOptions.length &&
              this.hasChildren(activeOption) &&
              activeOption[this.childrenKey]) {
              this.childrenOptions = activeOption[this.childrenKey]
            }
          })
        }
      },
      deep: true
    }
  },
  methods: {
    resetOptionSelected () {
      const options = JSON.parse(JSON.stringify(this.options))
      this.optionList = options.map(item => {
        this.$set(item, 'selected', false)
        return item
      })
      if (this.$cascader.value.length) {
        const selectedItem = this.optionList.find(
          option => option[this.valueKey] === this.$cascader.value[this.level])
        selectedItem && this.$set(selectedItem, 'selected', true)
        if (selectedItem && this.hasChildren(selectedItem)) {
          this.childrenOptions = selectedItem[this.childrenKey]
        }
      }
    },
    hasChildren (item) {
      return item && item.hasOwnProperty(this.childrenKey)
    },
    updateShowValue (item) {
      this.$cascader.showValue = this.showAllLevel
        ? this.currentParentMenu.label.join(this.separator)
        : item[this.labelKey]
      this.$cascader.onChange(JSON.parse(
        JSON.stringify(this.currentParentMenu)))
    },
    onMenuClick (item) {
      if (item.disabled) return
      this.optionList.map(item => {
        this.$set(item, 'selected', false)
        return item
      })
      const {label, value} = this.parentMenu
      label[this.level] = item[this.labelKey]
      value[this.level] = item[this.valueKey]
      this.currentParentMenu = {
        label: label.slice(0, this.level + 1),
        value: value.slice(0, this.level + 1)
      }
      this.$set(item, 'selected', true)
      if (this.hasChildren(item) &&
       !item[this.childrenKey].length && this.loadChildren) {
        this.loadChildren(item)
      } else {
        this.childrenOptions = item[this.childrenKey] || []
      }
      if (this.changeOnSelect) {
        this.updateShowValue(item)
      }
      if (!this.hasChildren(item)) {
        !this.changeOnSelect && this.updateShowValue(item)
        this.$cascader.isOpen = false
      }
    }
  }
}
</script>
<style scoped>

</style>
