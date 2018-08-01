<script>
import { VueTypes } from '../../scripts/utils'

export default {
  props: {
    node: VueTypes.object.isRequired
  },
  inject: ['$tree'],
  render (h) {
    const { $tree, node } = this
    const $node = this.$parent
    if ($tree.$scopedSlots.label) {
      return $tree.$scopedSlots.label({ node, $node })
    }
    return h('div', node.label)
  }
}
</script>
