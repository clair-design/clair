const SIZE_TYPE = [Number, Object]

// TODO: extract functions to helper?

export const getGridStart = (start = 0) => {
  if (start === 0) {
    return ''
  }
  return `${start} / `
}

export const getGridSpan = (span = 1) => {
  return `span ${span}`
}

// style: grid-column
const getGridColumnStyle = (option = {}) => {
  const { start = 0, span } = option
  return {
    gridColumn: `${getGridStart(start)}${getGridSpan(span)}`
  }
}

// style: order
export const getOrderStyle = order => {
  if (isNaN(order)) {
    return {}
  }
  return {
    order
  }
}

// number -> object
export const convertUnionToValues = item => {
  if (typeof item === 'number') {
    return {
      span: item
    }
  }
  return item
}
export default {
  name: 'CCol',
  props: {
    span: {
      type: Number,
      default: 1
    },
    start: Number,
    order: Number,
    xs: SIZE_TYPE,
    sm: SIZE_TYPE,
    md: SIZE_TYPE,
    lg: SIZE_TYPE,
    xl: SIZE_TYPE,
    xxl: SIZE_TYPE
  },
  inject: {
    $row: {
      default: null
    }
  },
  computed: {
    size() {
      return this.$row?.size
    },
    sizeStringArray() {
      return this.$row?.sizeStringArray
    },
    size2Use() {
      return this.$row?.getClosestSize(
        this.sizeStringArray,
        this.size,
        size => this.$props[size]
      )
    }
  },
  render(h) {
    const { span, start, order } = this
    const classNames = ['c-grid__col']
    let style = {}
    // from data
    const { size2Use: size } = this
    // have set responsive props && match one of the responsive props
    // this[size] is the responsive props
    // e.g. this['lg']
    if (size) {
      const {
        span: responsiveSpan,
        start: responsiveStart,
        order: responsiveOrder
      } = convertUnionToValues(this[size])
      style = {
        ...getGridColumnStyle({
          span: responsiveSpan,
          start: responsiveStart
        }),
        ...getOrderStyle(responsiveOrder)
      }
    } else {
      style = {
        ...getGridColumnStyle({ span, start }),
        ...getOrderStyle(order)
      }
    }
    return (
      <div class={classNames} style={style}>
        {this.$scopedSlots.default?.()}
      </div>
    )
  }
}
