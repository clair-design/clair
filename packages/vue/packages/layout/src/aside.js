import { IconMenuFold, IconMenuUnfold } from 'packages/icon'

const COLLAPSE_EVENT = 'collapse'

// use `px` for unitless value
const toCSSLength = value => {
  if (/\d+$/.test(value)) return `${value}px`
  return value
}

export default {
  name: 'CAside',

  model: {
    prop: 'collapsed',
    event: COLLAPSE_EVENT
  },

  props: {
    collapsible: Boolean,
    collapsed: Boolean,
    fixed: Boolean,
    width: {
      type: [String, Number],
      default: 200
    },
    collapsedWidth: {
      type: [String, Number],
      default: 60
    }
  },

  inject: ['$layout'],

  computed: {
    isAside: () => true,

    // class names of asides
    classNames() {
      const isSticky = this.fixed && !this.$layout.isScrollMain
      return {
        'c-layout__aside': true,
        'c-layout__aside--sticky': isSticky,
        'c-layout__aside--collapsed': this.collapsed,
        'c-layout__aside--has-trigger': this.hasTrigger
      }
    },

    // styles for aside
    styles() {
      const width = this.collapsed ? this.collapsedWidth : this.width
      return {
        width: toCSSLength(width)
      }
    },

    // collapse trigger customized in slots
    customTrigger() {
      return this.$scopedSlots.trigger?.(this)
    },

    // does collapse trigger exist in aside?
    hasTrigger() {
      // use <template v-slot:trigger/> (an empty slot) to hide default trigger
      const hideTrigger = this.$scopedSlots.trigger && !this.customTrigger
      return this.collapsible && !hideTrigger
    },

    // collapse trigger
    collapseTrigger() {
      const triggerIcon = this.collapsed ? IconMenuUnfold : IconMenuFold
      const defaultTrigger = <triggerIcon class="c-layout__trigger-icon" />
      const triggerNode = (
        <div class="c-layout__collapse-trigger" vOn:click={this.toggleCollapse}>
          {this.customTrigger || defaultTrigger}
        </div>
      )
      return this.hasTrigger ? triggerNode : null
    }
  },

  mounted() {
    this.$layout.addChild(this)
  },

  destroyed() {
    this.$layout.removeChild(this)
  },

  methods: {
    toggleCollapse() {
      this.$emit(COLLAPSE_EVENT, !this.collapsed)
    }
  },

  render(h) {
    return (
      <aside class={this.classNames} style={this.styles}>
        {this.$scopedSlots.default?.()}
        {this.collapseTrigger}
      </aside>
    )
  }
}
