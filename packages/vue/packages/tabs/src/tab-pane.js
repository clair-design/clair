export default {
  name: 'CTabPane',

  props: {
    label: {
      type: [String, Object],
      default: 'new tag'
    },
    tabKey: {
      type: String,
      required: true
    },
    disabled: Boolean,
    closable: Boolean,
    lazy: Boolean
  },

  inject: {
    $tabs: { default: null },
    $paneProvider: { default: null }
  },

  computed: {
    index() {
      return this.$paneProvider.index
    }
  },

  watch: {
    index: {
      immediate: true,
      handler(_, oldValue) {
        this.delete(oldValue)
        this.update()
      }
    }
  },

  methods: {
    getLabel() {
      return this.$scopedSlots?.label?.() ?? this.label
    },
    update() {
      this.$tabs.updatePane(this.index, this)
    },
    delete(index = this.index) {
      this.$tabs.deletePane(index, this)
    }
  },

  beforeDestroy() {
    this.delete()
  },

  render(h) {
    const { tabKey, lazy } = this
    const className = ['c-tab-pane']
    const hidden = tabKey !== this.$tabs.currentKey
    const paneContent = (
      <div
        id={`panel-${tabKey}`}
        role="tabpanel"
        aria-labelledby={`tab-${tabKey}`}
        class={className}
        hidden={hidden}
      >
        {this.$scopedSlots.default?.()}
      </div>
    )

    return lazy && hidden ? null : paneContent
  }
}
