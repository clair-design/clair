const makeSvgComponent = (option = {}) => {
  const { name, template, ...rest } = option
  return {
    name: `${name}Svg`,
    props: {
      filledOnly: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      updateStrokeWidth() {
        // for certain icons, they are filled only
        // therefore, no need to update strokeWidth
        if (this.filledOnly === true) return
        const { $el } = this

        const svg = $el.querySelector('svg')
        const style = getComputedStyle($el)
        const getStyle = style => props =>
          props
            .map(propertyName => style.getPropertyValue(propertyName))
            .map(value => value.replace(/px$/, ''))
            .map(value => Number(value))
        const getElementStyle = getStyle(style)
        const [fontSize, strokeWidth] = getElementStyle([
          'font-size',
          'stroke-width'
        ])
        const { width } = $el.getBoundingClientRect()
        const { width: svgWidth } = svg.getBoundingClientRect()
        const zoomContainerOnPurpose = fontSize !== width
        // in case there is some scaling
        const widthRatio = zoomContainerOnPurpose ? 1 : svgWidth / width

        const viewBox = svg.getAttribute('viewBox')
        const size = Number(viewBox.split(' ').pop())
        svg.style.strokeWidth = strokeWidth * (size / (fontSize * widthRatio))
      }
    },
    mounted() {
      // in case there is bound style or class
      this.$nextTick(this.updateStrokeWidth)
    },
    render(h) {
      return (
        <i
          class="c-icon--svg"
          domProps={{ innerHTML: template }}
          on={this.$listeners}
        />
      )
    },
    ...rest
  }
}

export const makeIconComponent = (option = {}) => {
  // firstClassContext should have the interface of context.data
  // SEE https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
  const { name, ...firstClassContext } = option
  const SvgComponent = makeSvgComponent(option)
  const component = {
    name,
    render(h) {
      return <SvgComponent {...firstClassContext} on={this.$listeners} />
    }
  }
  // automatically install
  return registerIconComponent(component)
}

// if pass in a valid component
// install it
export const registerIconComponent = component => {
  component.install = Vue => Vue.component(component.name, component)
  return component
}
