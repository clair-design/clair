const getPropertyInNumber = propertyName => $el =>
  Number(
    getComputedStyle($el).getPropertyValue(propertyName).replace(/px$/, '')
  )

const getStrokeWidth = /*@__PURE__*/ getPropertyInNumber('stroke-width')
const getFontSize = /*@__PURE__*/ getPropertyInNumber('font-size')

export const getUpdateRMixin = ({ selector = 'circle', baseR = 1 }) => {
  return {
    methods: {
      updateR() {
        const strokeWidthForDotElement = 2
        const elements = this.$el.querySelectorAll(selector)
        const strokeWidth = getStrokeWidth(this.$el)
        const fontSize = getFontSize(this.$el)
        const svg = this.$el.querySelector('svg')
        const viewBox = svg.getAttribute('viewBox')
        const size = Number(viewBox.split(' ').pop())
        elements.forEach(element => {
          element.setAttribute(
            'r',
            baseR * (strokeWidth / strokeWidthForDotElement) * (size / fontSize)
          )
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.updateR()
      })
    }
  }
}

export const lineAndDotMixins = [
  /*@__PURE__*/ getUpdateRMixin({
    selector: 'circle',
    baseR: 1
  })
]

const getRemoveStrokeMixin = ({ selector = ':not(circle)' } = {}) => {
  return {
    methods: {
      removeStroke() {
        const { $el } = this
        const strokeEls = $el.querySelectorAll(`${selector}[stroke]`)
        strokeEls.forEach(el => el.removeAttribute('stroke'))
      }
    },
    mounted() {
      this.removeStroke()
    }
  }
}

export const removeStrokeMixins = [/*@__PURE__*/ getRemoveStrokeMixin()]
