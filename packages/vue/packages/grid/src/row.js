import { mixin } from './mixin'

export default {
  name: 'CRow',
  props: {
    gutter: String,
    justify: String,
    align: String,
    xs: Object,
    sm: Object,
    md: Object,
    lg: Object,
    xl: Object,
    xxl: Object
  },
  mixins: [mixin],
  provide() {
    return {
      $row: this
    }
  },
  render(h) {
    const { size2Use: size, gutter, justify, align } = this
    const classNames = ['c-grid__row']
    let style = {}
    // have set responsive props && match one of the responsive props
    // this[size] is the responsive props
    // e.g. this['lg']
    if (size) {
      const {
        gutter: responsiveGutter,
        justify: responsiveJustify,
        align: responsiveAlign
      } = this[size]
      style = {
        gridGap: responsiveGutter,
        justifyContent: responsiveJustify,
        alignItems: responsiveAlign
      }
    } else {
      style = {
        gridGap: gutter,
        justifyContent: justify,
        alignItems: align
      }
    }
    return (
      <div class={classNames} style={style}>
        {this.$slots.default}
      </div>
    )
  }
}
